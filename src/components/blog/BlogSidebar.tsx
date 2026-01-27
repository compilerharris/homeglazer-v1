import React, { useState } from 'react';
import Link from 'next/link';
import { House, Building2, Brush, Palmtree, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

// Define the BlogPost type for sidebar
interface BlogPostData {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  readTime: string;
  coverImage: string;
  categories: string[];
  content?: string;
}

interface BlogSidebarProps {
  currentPostId: string;
  recentPosts?: BlogPostData[];
}

// Mini blog card for sidebar
const SidebarBlogCard: React.FC<{ 
  title: string; 
  date: string; 
  imageUrl: string;
  slug: string;
}> = ({ title, date, imageUrl, slug }) => {
  return (
    <Link href={`/blog/${slug}`} className="flex gap-3 mb-4 group">
      <div className="w-20 h-20 shrink-0">
        <img src={imageUrl} alt={title} className="w-full h-full object-cover rounded-md" />
      </div>
      <div className="flex flex-col">
        <h4 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-[#ED276E] transition-colors">
          {title}
        </h4>
        <p className="text-xs text-gray-500 mt-1">{date}</p>
      </div>
    </Link>
  );
};

// Service card for sidebar
const SidebarServiceCard: React.FC<{
  title: string;
  icon: React.ReactNode;
  path: string;
}> = ({ title, icon, path }) => {
  return (
    <Link href={path} className="flex items-center p-3 hover:bg-gray-50 rounded-lg group">
      <div className="mr-3 text-[#ED276E] group-hover:text-[#299dd7] transition-colors">
        {icon}
      </div>
      <h4 className="text-sm font-medium text-gray-900 group-hover:text-[#ED276E] transition-colors">
        {title}
      </h4>
    </Link>
  );
};

// Sidebar Enquiry Form with state management
const SidebarEnquiryForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    message: ''
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (submitError) {
      setSubmitError('');
    }
  };

  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Phone is required';
    } else if (!/^[0-9+\- ]{10,15}$/.test(formData.mobile.trim())) {
      newErrors.mobile = 'Please enter a valid phone number';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message should be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/homepage-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message');
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', mobile: '', message: '' });
    } catch (error: any) {
      setSubmitError(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-4">
        <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-3" />
        <h4 className="text-base font-medium text-gray-800 mb-2">Message Sent!</h4>
        <p className="text-sm text-gray-600 mb-4">
          We'll get back to you within 24 hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-sm text-[#ED276E] hover:text-[#299dd7] font-medium transition-colors"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {submitError && (
        <div className="flex items-start gap-2 p-2 mb-3 bg-red-50 border border-red-200 rounded-md">
          <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-red-700">{submitError}</p>
        </div>
      )}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={isSubmitting}
            className={`w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-200'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#ED276E]/20 focus:border-[#ED276E] disabled:opacity-50 disabled:cursor-not-allowed`}
            placeholder="Your name"
          />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={isSubmitting}
            className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#ED276E]/20 focus:border-[#ED276E] disabled:opacity-50 disabled:cursor-not-allowed`}
            placeholder="Your email"
          />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            disabled={isSubmitting}
            className={`w-full px-3 py-2 border ${errors.mobile ? 'border-red-500' : 'border-gray-200'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#ED276E]/20 focus:border-[#ED276E] disabled:opacity-50 disabled:cursor-not-allowed`}
            placeholder="Your phone number"
          />
          {errors.mobile && <p className="text-xs text-red-500 mt-1">{errors.mobile}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            disabled={isSubmitting}
            className={`w-full px-3 py-2 border ${errors.message ? 'border-red-500' : 'border-gray-200'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#ED276E]/20 focus:border-[#ED276E] resize-none disabled:opacity-50 disabled:cursor-not-allowed`}
            rows={3}
            placeholder="Tell us about your project"
          ></textarea>
          {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#ED276E] hover:bg-[#299dd7] text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            'Submit Enquiry'
          )}
        </button>
      </div>
    </form>
  );
};

const BlogSidebar: React.FC<BlogSidebarProps> = ({ currentPostId, recentPosts = [] }) => {
  // Use recent posts passed as props (already filtered and sorted from server)
  const displayRecentPosts = recentPosts.slice(0, 3);
  
  // For related posts, we can filter by category from the recentPosts if needed
  // For now, we'll show the next set of posts as related
  const relatedPosts = recentPosts.slice(3, 6);

  // Best services
  const services = [
    {
      title: "Residential Painting",
      icon: <House size={20} />,
      path: "/services/painting/residential"
    },
    {
      title: "Commercial Painting",
      icon: <Building2 size={20} />,
      path: "/services/painting/commercial"
    },
    {
      title: "Wood Coating",
      icon: <Brush size={20} />,
      path: "/services/wood/wood-coating"
    },
    {
      title: "Wall Decor",
      icon: <Palmtree size={20} />,
      path: "/services/wall-decor"
    }
  ];

  return (
    <aside className="space-y-8">
      {/* Recent Posts */}
      {displayRecentPosts.length > 0 && (
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Posts</h3>
          <div className="space-y-3">
            {displayRecentPosts.map((post) => (
              <SidebarBlogCard
                key={post.id}
                title={post.title}
                date={post.date}
                imageUrl={post.coverImage}
                slug={post.slug}
              />
            ))}
          </div>
        </div>
      )}

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Related Posts</h3>
          <div className="space-y-3">
            {relatedPosts.map((post) => (
              <SidebarBlogCard
                key={post.id}
                title={post.title}
                date={post.date}
                imageUrl={post.coverImage}
                slug={post.slug}
              />
            ))}
          </div>
        </div>
      )}

      {/* Best Services */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Our Services</h3>
        <div className="divide-y divide-gray-100">
          {services.map((service, index) => (
            <SidebarServiceCard
              key={index}
              title={service.title}
              icon={service.icon}
              path={service.path}
            />
          ))}
        </div>
      </div>

      {/* Enquiry Form */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Get a Quote</h3>
        <SidebarEnquiryForm />
      </div>
    </aside>
  );
};

export default BlogSidebar; 