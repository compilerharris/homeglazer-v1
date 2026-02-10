import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  mobile: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  mobile?: string;
  message?: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    mobile: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
    
    // Clear submit error when user makes changes
    if (submitError) {
      setSubmitError('');
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email';
    }

    // Mobile validation
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^[0-9+\- ]{10,15}$/.test(formData.mobile.trim())) {
      newErrors.mobile = 'Please enter a valid mobile number';
    }

    // Message validation
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
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/homepage-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message');
      }

      // Success
      setSubmitted(true);
      setFormData({ name: '', email: '', mobile: '', message: '' });
    } catch (error: any) {
      setSubmitError(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success state
  if (submitted) {
    return (
      <>
        <section className="bg-[rgba(246,246,246,1)] w-full mt-[50px] py-12 lg:py-16 max-md:mt-10 min-h-[550px] flex flex-col justify-center">
          <div className="w-[95%] lg:w-[90%] 2xl:w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_358px] gap-[40px] items-center">
            <div className="text-xl text-[rgba(89,89,89,1)] font-light min-w-0">
              <h2 className="text-[40px] font-medium leading-[150%]">
                Make Your Home Look Beautiful for Years to Come
              </h2>
              <p className="mt-[33px]">
                Every one love to spend time in a beautiful space. Painting is the most economical and fastest way to update overall look of your property especially when you are looking to accentuate the look of your home, office, shop, furniture.
              </p>
              <p className="mt-[33px]">
                Home Glazer is professionally perfect for making your house look fabulous. You can completely leave the painting services up to Home Glazer team, we are the one-stop solution for all painting services. Our services have made many clients happy over many years. We believe in quality workmanship and clients' satisfaction.
              </p>
            </div>
            <div className="bg-white shadow-[0px_5px_16px_rgba(8,15,52,0.06)] min-w-0 lg:w-[358px] pt-9 pb-5 px-[21px] rounded-xl">
              <div className="text-center py-8">
                <div className="flex justify-center mb-4">
                  <CheckCircle2 className="h-16 w-16 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                <p className="text-gray-600 mb-6">
                  Thank you for reaching out. We'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-[rgba(237,39,110,1)] hover:bg-[rgba(59,130,246,1)] text-white px-6 py-2 rounded-[26px] transition-all duration-250"
                >
                  Send Another Message
                </button>
              </div>
          </div>
        </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="bg-[rgba(246,246,246,1)] w-full mt-[50px] py-12 lg:py-16 max-md:mt-10 min-h-[550px] flex flex-col justify-center">
        <div className="w-[95%] lg:w-[90%] 2xl:w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_358px] gap-[40px] items-center">
          <div className="text-xl text-[rgba(89,89,89,1)] font-light min-w-0">
            <h2 className="text-[40px] font-medium leading-[150%]">
              Make Your Home Look Beautiful for Years to Come
            </h2>
            <p className="mt-[33px]">
              Every one love to spend time in a beautiful space. Painting is the most economical and fastest way to update overall look of your property especially when you are looking to accentuate the look of your home, office, shop, furniture.
            </p>
            <p className="mt-[33px]">
              Home Glazer is professionally perfect for making your house look fabulous. You can completely leave the painting services up to Home Glazer team, we are the one-stop solution for all painting services. Our services have made many clients happy over many years. We believe in quality workmanship and clients' satisfaction.
            </p>
          </div>
          <div className="bg-white shadow-[0px_5px_16px_rgba(8,15,52,0.06)] min-w-0 lg:w-[358px] pt-9 pb-5 px-[21px] rounded-xl">
            <form onSubmit={handleSubmit}>
              {/* Submit Error Alert */}
              {submitError && (
                <div className="flex items-start gap-2 p-3 mb-4 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{submitError}</p>
                </div>
              )}

              <div className="w-full">
                {/* Name Field */}
                <div className="flex min-h-10 w-full gap-[25px] mb-8">
                  <div className="min-w-60 w-full flex-1 shrink basis-[0%] relative">
                    <label className="absolute -top-2 left-4 bg-white px-2 text-xs font-semibold z-10">
                      First name <span className="text-[#F00]">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Name"
                      disabled={isSubmitting}
                      className={`border ${errors.name ? 'border-red-500' : 'border-[#D2D5DA]'} shadow-[0px_2px_2px_0px_rgba(0,0,0,0.05)] bg-white w-full min-h-10 text-sm text-[rgba(108,114,127,1)] font-light px-4 py-2 rounded-lg outline-none disabled:opacity-50 disabled:cursor-not-allowed`}
                      required
                    />
                    {errors.name && (
                      <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                    )}
                  </div>
                </div>

                {/* Email Field */}
                <div className="flex min-h-10 w-full gap-[25px] mb-8">
                  <div className="min-w-60 w-full flex-1 shrink basis-[0%] relative">
                    <label className="absolute -top-2 left-4 bg-white px-2 text-xs font-semibold z-10">
                      Email <span className="text-[#F00]">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email address"
                      disabled={isSubmitting}
                      className={`border ${errors.email ? 'border-red-500' : 'border-[#D2D5DA]'} shadow-[0px_2px_2px_0px_rgba(0,0,0,0.05)] bg-white w-full min-h-10 text-sm text-[rgba(108,114,127,1)] font-light px-4 py-2 rounded-lg outline-none disabled:opacity-50 disabled:cursor-not-allowed`}
                      required
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Mobile Field */}
                <div className="flex min-h-10 w-full gap-[25px] mb-8">
                  <div className="min-w-60 w-full flex-1 shrink basis-[0%] relative">
                    <label className="absolute -top-2 left-4 bg-white px-2 text-xs font-semibold z-10">
                      Mobile <span className="text-[#F00]">*</span>
                    </label>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="Your mobile number"
                      disabled={isSubmitting}
                      className={`border ${errors.mobile ? 'border-red-500' : 'border-[#D2D5DA]'} shadow-[0px_2px_2px_0px_rgba(0,0,0,0.05)] bg-white w-full min-h-10 text-sm text-[rgba(108,114,127,1)] font-light px-4 py-2 rounded-lg outline-none disabled:opacity-50 disabled:cursor-not-allowed`}
                      required
                    />
                    {errors.mobile && (
                      <p className="text-xs text-red-500 mt-1">{errors.mobile}</p>
                    )}
                  </div>
                </div>

                {/* Message Field */}
                <div className="min-h-[111px] w-full mb-6 relative">
                  <label className="absolute -top-2 left-4 bg-white px-2 text-xs font-semibold z-10">
                    Message <span className="text-[#F00]">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message"
                    disabled={isSubmitting}
                    className={`border ${errors.message ? 'border-red-500' : 'border-[#D2D5DA]'} shadow-[0px_2px_2px_0px_rgba(0,0,0,0.05)] bg-white w-full min-h-[100px] text-sm text-[rgba(108,114,127,1)] font-light px-4 py-2 rounded-lg outline-none resize-none disabled:opacity-50 disabled:cursor-not-allowed`}
                    required
                  ></textarea>
                  {errors.message && (
                    <p className="text-xs text-red-500 mt-1">{errors.message}</p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[rgba(237,39,110,1)] hover:bg-[rgba(59,130,246,1)] text-white w-full min-h-10 text-base font-normal text-center mt-[15px] py-2.5 rounded-[26px] transition-all duration-250 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Submit Enquiry'
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactForm;
