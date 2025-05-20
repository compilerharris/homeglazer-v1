import React, { useState } from 'react';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import WhatsAppButton from '@/components/home/WhatsAppButton';
import { MapPin, Phone, Mail, Clock, AlertCircle } from 'lucide-react';
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

const ContactPage: React.FC = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  
  // Validation state
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  
  // Success state
  const [submitted, setSubmitted] = useState(false);
  
  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    
    // Clear error when user types
    if (errors[id as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [id]: ''
      }));
    }
  };
  
  // Validate form
  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };
    
    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      valid = false;
    }
    
    // Validate phone
    const phoneRegex = /^[0-9+\- ]{10,15}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      valid = false;
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
      valid = false;
    }
    
    // Validate service
    if (!formData.service) {
      newErrors.service = 'Please select a service';
      valid = false;
    }
    
    // Validate message
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      valid = false;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message should be at least 10 characters';
      valid = false;
    }
    
    setErrors(newErrors);
    return valid;
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Here you would typically send the data to your backend
      console.log('Form submitted:', formData);
      setSubmitted(true);
      
      // Reset form after submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
    }
  };

  return (
    <div className="bg-white flex flex-col overflow-hidden items-center">
      <Header />
      
      {/* Breadcrumb */}
      <div className="w-[90%] lg:w-[80%] mx-auto pt-28">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/contact">Contact Us</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      {/* Hero Banner with Background Image */}
      <section className="w-full py-20 mt-6 relative">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 bg-cover bg-center z-0" 
             style={{ 
               backgroundImage: 'url("https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80")'
             }}>
          <div className="absolute inset-0 bg-[#ED276E] opacity-80"></div>
        </div>
        
        {/* Content */}
        <div className="w-[90%] lg:w-[80%] mx-auto text-center relative z-10">
          <h1 className="text-[40px] md:text-[48px] font-bold text-white mb-4">Contact Us</h1>
          <p className="text-lg md:text-xl text-white max-w-3xl mx-auto">
            We're here to help with all your painting and renovation needs. Reach out to our team for personalized assistance and expert advice.
          </p>
        </div>
      </section>
      
      {/* Branch Information and Contact Form */}
      <section className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Branch Information */}
          <div className="space-y-12">
            {/* Home Branch */}
            <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-semibold text-[#ED276E] mb-6">Home Branch</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-pink-100 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-[#ED276E]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Address</h3>
                    <p className="text-gray-600">123 Painting Avenue, Creative District, Mumbai, 400001</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-pink-100 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-[#ED276E]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Phone</h3>
                    <p className="text-gray-600">+91 98765 43210</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-pink-100 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-[#ED276E]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Email</h3>
                    <p className="text-gray-600">contact@homeglazer.in</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-pink-100 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-[#ED276E]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Hours</h3>
                    <p className="text-gray-600">Monday - Saturday: 9:00 AM - 7:00 PM</p>
                    <p className="text-gray-600">Sunday: 10:00 AM - 2:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Second Branch */}
            <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-semibold text-[#ED276E] mb-6">Delhi Branch</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-pink-100 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-[#ED276E]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Address</h3>
                    <p className="text-gray-600">456 Renovation Road, Modern Colony, Delhi, 110001</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-pink-100 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-[#ED276E]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Phone</h3>
                    <p className="text-gray-600">+91 91234 56789</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-pink-100 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-[#ED276E]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Email</h3>
                    <p className="text-gray-600">delhi@homeglazer.in</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-pink-100 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-[#ED276E]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Hours</h3>
                    <p className="text-gray-600">Monday - Saturday: 9:00 AM - 7:00 PM</p>
                    <p className="text-gray-600">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form with Validation */}
          <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-100 self-start">
            <h2 className="text-2xl font-semibold text-[#ED276E] mb-6">Send Us a Message</h2>
            
            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <svg 
                  className="w-16 h-16 text-green-500 mx-auto mb-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
                <h3 className="text-xl font-medium text-green-800 mb-2">Thank You!</h3>
                <p className="text-green-700">
                  Your message has been sent successfully. We'll get back to you shortly.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-4 bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>
                  <input 
                    type="text" 
                    id="name" 
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full p-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-[#ED276E] focus:border-[#ED276E] outline-none`} 
                    placeholder="Your name" 
                  />
                  {errors.name && (
                    <div className="flex items-center mt-1 text-red-500 text-sm">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      <span>{errors.name}</span>
                    </div>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address*</label>
                  <input 
                    type="email" 
                    id="email" 
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-[#ED276E] focus:border-[#ED276E] outline-none`} 
                    placeholder="your.email@example.com" 
                  />
                  {errors.email && (
                    <div className="flex items-center mt-1 text-red-500 text-sm">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      <span>{errors.email}</span>
                    </div>
                  )}
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number*</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full p-3 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-[#ED276E] focus:border-[#ED276E] outline-none`} 
                    placeholder="+91 12345 67890" 
                  />
                  {errors.phone && (
                    <div className="flex items-center mt-1 text-red-500 text-sm">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      <span>{errors.phone}</span>
                    </div>
                  )}
                </div>
                
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">Service Required*</label>
                  <select 
                    id="service" 
                    value={formData.service}
                    onChange={handleChange}
                    className={`w-full p-3 border ${errors.service ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-[#ED276E] focus:border-[#ED276E] outline-none`}
                  >
                    <option value="">Select a service</option>
                    <option value="interior">Interior Painting</option>
                    <option value="exterior">Exterior Painting</option>
                    <option value="texture">Texture Painting</option>
                    <option value="stencil">Stencil Painting</option>
                    <option value="wood-polish">Wood Polishing</option>
                    <option value="wood-coat">Wood Coating</option>
                    <option value="carpentry">Carpentry Services</option>
                  </select>
                  {errors.service && (
                    <div className="flex items-center mt-1 text-red-500 text-sm">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      <span>{errors.service}</span>
                    </div>
                  )}
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message*</label>
                  <textarea 
                    id="message" 
                    rows={5} 
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full p-3 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-[#ED276E] focus:border-[#ED276E] outline-none`} 
                    placeholder="Tell us about your project..."
                  ></textarea>
                  {errors.message && (
                    <div className="flex items-center mt-1 text-red-500 text-sm">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      <span>{errors.message}</span>
                    </div>
                  )}
                </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-[#ED276E] text-white font-semibold py-3 px-4 rounded-lg hover:bg-[#d51e5f] transition-colors"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
      
      {/* Google Maps Section */}
      <section className="w-full py-12 bg-[#F9F9F9]">
        <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
          <h2 className="text-3xl font-semibold text-[#ED276E] mb-8 text-center">Our Locations</h2>
          <div className="rounded-lg overflow-hidden shadow-lg h-[450px]">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30703867.071679905!2d64.40159368691856!3d20.04915895569306!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2sin!4v1663011868644!5m2!1sen!2sin" 
              width="100%" 
              height="450" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy"
              title="Homeglazer Locations"
            ></iframe>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] w-full">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-white text-[40px] font-medium mb-6">Ready to Transform Your Space?</h2>
          <p className="text-white text-xl mb-8 max-w-2xl mx-auto">
            Get in touch today for a free consultation and quote. Let our experts bring your vision to life.
          </p>
          <div className="inline-block">
            <a 
              href="/calculator" 
              className="bg-transparent border-2 border-white text-white hover:bg-[#0FA0CE] hover:border-[#0FA0CE] transition-colors duration-300 font-medium rounded-full px-8 py-4 text-lg"
            >
              Try Our Budget Calculator
            </a>
          </div>
        </div>
      </section>
      
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ContactPage; 