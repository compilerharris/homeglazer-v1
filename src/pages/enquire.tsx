import React, { useState } from 'react';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import WhatsAppButton from '@/components/home/WhatsAppButton';
import { AlertCircle, Clock, CheckCircle2, BadgeCheck, ThumbsUp, HeartHandshake, Phone } from 'lucide-react';
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

const EnquirePage: React.FC = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    property: '',
    area: '',
    service: '',
    timeline: '',
    budget: '',
    message: ''
  });
  
  // Validation state
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    property: '',
    area: '',
    service: '',
    timeline: '',
    budget: '',
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
    
    // Required fields
    const requiredFields = ['name', 'email', 'phone', 'property', 'service'];
    requiredFields.forEach(field => {
      if (!formData[field as keyof typeof formData].trim()) {
        newErrors[field as keyof typeof errors] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
        valid = false;
      }
    });
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email.trim() && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      valid = false;
    }
    
    // Validate phone
    const phoneRegex = /^[0-9+\- ]{10,15}$/;
    if (formData.phone.trim() && !phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
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
      console.log('Enquiry form submitted:', formData);
      setSubmitted(true);
      
      // Reset form after submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        property: '',
        area: '',
        service: '',
        timeline: '',
        budget: '',
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
              <BreadcrumbLink href="/enquire">Enquire Now</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      {/* Hero Banner with Background Image */}
      <section className="w-full py-24 mt-6 relative">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 bg-cover bg-center z-0" 
             style={{ 
               backgroundImage: 'url("https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80")'
             }}>
          <div className="absolute inset-0 bg-gradient-to-r from-[#ED276E] to-[#299dd7] opacity-85"></div>
        </div>
        
        {/* Content */}
        <div className="w-[90%] lg:w-[80%] mx-auto text-center relative z-10">
          <h1 className="text-[40px] md:text-[56px] font-bold text-white mb-6">Get Your Custom Quote</h1>
          <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto">
            Tell us about your project and get a personalized estimate from our experts within 24 hours
          </p>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="w-full py-16 bg-gray-50">
        <div className="w-[90%] lg:w-[80%] mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#ED276E] mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-[#ED276E] text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Submit Enquiry</h3>
              <p className="text-gray-600">
                Fill out our detailed enquiry form with your project requirements and preferences.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-[#ED276E] text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Get a Quote</h3>
              <p className="text-gray-600">
                Our team will analyze your requirements and provide a detailed quote within 24 hours.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-[#ED276E] text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Schedule Service</h3>
              <p className="text-gray-600">
                Once you approve the quote, we'll schedule your service at a time that works for you.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Main Enquiry Form Section */}
      <section className="w-[90%] lg:w-[80%] mx-auto py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Enquiry Form */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-semibold text-[#ED276E] mb-6">Tell Us About Your Project</h2>
            
            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-medium text-green-800 mb-4">Thank You for Your Enquiry!</h3>
                <p className="text-green-700 text-lg mb-6">
                  We've received your project details and our team will get back to you with a detailed quote within 24 hours.
                </p>
                <p className="text-green-700 mb-8">
                  If you have any immediate questions, feel free to call us at +91 98765 43210.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="bg-[#ED276E] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#d51e5f] transition-colors"
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Personal Information */}
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
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Property Information */}
                  <div>
                    <label htmlFor="property" className="block text-sm font-medium text-gray-700 mb-1">Property Type*</label>
                    <select 
                      id="property" 
                      value={formData.property}
                      onChange={handleChange}
                      className={`w-full p-3 border ${errors.property ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-[#ED276E] focus:border-[#ED276E] outline-none`}
                    >
                      <option value="">Select property type</option>
                      <option value="apartment">Apartment</option>
                      <option value="house">House</option>
                      <option value="villa">Villa</option>
                      <option value="commercial">Commercial Space</option>
                      <option value="office">Office</option>
                      <option value="retail">Retail Shop</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.property && (
                      <div className="flex items-center mt-1 text-red-500 text-sm">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        <span>{errors.property}</span>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-1">Area (in sq.ft)</label>
                    <input 
                      type="text" 
                      id="area" 
                      value={formData.area}
                      onChange={handleChange}
                      className={`w-full p-3 border ${errors.area ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-[#ED276E] focus:border-[#ED276E] outline-none`} 
                      placeholder="Approximate area in square feet" 
                    />
                    {errors.area && (
                      <div className="flex items-center mt-1 text-red-500 text-sm">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        <span>{errors.area}</span>
                      </div>
                    )}
                  </div>
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
                    <option value="complete">Complete Renovation</option>
                  </select>
                  {errors.service && (
                    <div className="flex items-center mt-1 text-red-500 text-sm">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      <span>{errors.service}</span>
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Timeline and Budget */}
                  <div>
                    <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-1">Preferred Timeline</label>
                    <select 
                      id="timeline" 
                      value={formData.timeline}
                      onChange={handleChange}
                      className={`w-full p-3 border ${errors.timeline ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-[#ED276E] focus:border-[#ED276E] outline-none`}
                    >
                      <option value="">Select timeline</option>
                      <option value="urgent">Urgent (ASAP)</option>
                      <option value="1week">Within 1 week</option>
                      <option value="2weeks">Within 2 weeks</option>
                      <option value="1month">Within 1 month</option>
                      <option value="3months">Within 3 months</option>
                      <option value="flexible">Flexible</option>
                    </select>
                    {errors.timeline && (
                      <div className="flex items-center mt-1 text-red-500 text-sm">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        <span>{errors.timeline}</span>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">Budget Range</label>
                    <select 
                      id="budget" 
                      value={formData.budget}
                      onChange={handleChange}
                      className={`w-full p-3 border ${errors.budget ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-[#ED276E] focus:border-[#ED276E] outline-none`}
                    >
                      <option value="">Select budget range</option>
                      <option value="under25k">Under ₹25,000</option>
                      <option value="25-50k">₹25,000 - ₹50,000</option>
                      <option value="50-100k">₹50,000 - ₹1,00,000</option>
                      <option value="100-200k">₹1,00,000 - ₹2,00,000</option>
                      <option value="above200k">Above ₹2,00,000</option>
                      <option value="flexible">Flexible</option>
                    </select>
                    {errors.budget && (
                      <div className="flex items-center mt-1 text-red-500 text-sm">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        <span>{errors.budget}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Additional Details</label>
                  <textarea 
                    id="message" 
                    rows={5} 
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full p-3 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-[#ED276E] focus:border-[#ED276E] outline-none`} 
                    placeholder="Tell us more about your project, specific requirements, or any questions you have..."
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
                  Submit Enquiry
                </button>
              </form>
            )}
          </div>
          
          {/* Side Information */}
          <div className="space-y-8">
            {/* Why Choose Us */}
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
              <h3 className="text-xl font-semibold text-[#ED276E] mb-4">Why Choose Us</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-pink-100 p-2 rounded-full">
                    <BadgeCheck className="h-5 w-5 text-[#ED276E]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Expert Painters</h4>
                    <p className="text-gray-600 text-sm">Our team consists of highly skilled professionals with years of experience.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-pink-100 p-2 rounded-full">
                    <ThumbsUp className="h-5 w-5 text-[#ED276E]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Quality Materials</h4>
                    <p className="text-gray-600 text-sm">We use only premium paints and materials for lasting results.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-pink-100 p-2 rounded-full">
                    <Clock className="h-5 w-5 text-[#ED276E]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Timely Completion</h4>
                    <p className="text-gray-600 text-sm">We value your time and ensure projects are completed on schedule.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-pink-100 p-2 rounded-full">
                    <HeartHandshake className="h-5 w-5 text-[#ED276E]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Customer Satisfaction</h4>
                    <p className="text-gray-600 text-sm">Your satisfaction is our top priority, with a 100% satisfaction guarantee.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Testimonial */}
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
              <h3 className="text-xl font-semibold text-[#ED276E] mb-4">What Our Clients Say</h3>
              
              <div className="italic text-gray-600 mb-4">
                "Homeglazer transformed our living room with their expert painting. The attention to detail and professionalism was outstanding. Highly recommended!"
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
                <div>
                  <h4 className="font-medium text-gray-900">Priya Sharma</h4>
                  <p className="text-gray-500 text-sm">Mumbai</p>
                </div>
              </div>
            </div>
            
            {/* Need Help? */}
            <div className="bg-[#ED276E] text-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Need Help?</h3>
              <p className="mb-4">
                If you have any questions or need assistance with your enquiry, our team is here to help.
              </p>
              <div className="flex items-center mb-2">
                <Phone className="h-5 w-5 mr-2" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                <span>Mon-Sat: 9:00 AM - 7:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="w-full py-16 bg-gray-50">
        <div className="w-[90%] lg:w-[80%] mx-auto">
          <h2 className="text-3xl font-semibold text-[#ED276E] mb-10 text-center">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-2">How soon can you start the work?</h3>
              <p className="text-gray-600">
                Depending on our current schedule, we can typically start a project within 1-2 weeks of quote approval. For urgent requests, we do our best to accommodate your timeline.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Do you offer free consultations?</h3>
              <p className="text-gray-600">
                Yes, we offer free consultations and estimates for all our services. Our experts will visit your property to understand your requirements and provide a detailed quote.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-2">What brands of paint do you use?</h3>
              <p className="text-gray-600">
                We work with premium brands like Asian Paints, Berger, Nerolac, and Dulux. We can recommend the best option based on your needs and budget.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Do you provide a warranty for your work?</h3>
              <p className="text-gray-600">
                Yes, we offer a warranty of up to 3 years on our painting services, depending on the package you choose. This covers issues like peeling, fading, and cracking.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] w-full">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-white text-[40px] font-medium mb-6">Ready to Transform Your Space?</h2>
          <p className="text-white text-xl mb-8 max-w-2xl mx-auto">
            Try our budget calculator to get a quick estimate for your project
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

export default EnquirePage; 