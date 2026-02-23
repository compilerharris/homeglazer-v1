'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { X, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { getMediaUrl } from '@/lib/mediaUrl';
import { useContactForm } from '@/hooks/useContactForm';

const STORAGE_KEY = 'homeglazer:contact-form-popup-dismissed';
const POPUP_IMAGE_PATH = '/uploads/contact-popup.jpg';
const POPUP_DELAY_MS = 5000;

const ContactFormPopup: React.FC = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const {
    formData,
    errors,
    isSubmitting,
    submitted,
    submitError,
    handleChange,
    handleSubmit,
    resetForm,
  } = useContactForm();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;

    const dismissed = window.localStorage.getItem(STORAGE_KEY);
    if (dismissed) {
      setShowPopup(false);
      return;
    }

    setShowPopup(false);
    const timer = setTimeout(() => setShowPopup(true), POPUP_DELAY_MS);
    return () => clearTimeout(timer);
  }, [mounted, router.asPath]);

  const dismissPermanently = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, 'true');
    }
    setShowPopup(false);
  };

  const dismissTemporarily = () => {
    setShowPopup(false);
  };

  if (!mounted || !showPopup || typeof document === 'undefined') {
    return null;
  }

  const inputBaseClass =
    'border shadow-[0px_2px_2px_0px_rgba(0,0,0,0.05)] bg-white w-full min-h-9 text-sm text-[rgba(108,114,127,1)] font-light px-3 py-2 rounded-lg outline-none disabled:opacity-50 disabled:cursor-not-allowed';
  const inputErrorClass = 'border-red-500';
  const inputNormalClass = 'border-[#D2D5DA]';

  const popupContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Contact form"
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={dismissTemporarily}
        aria-hidden="true"
      />

      <div
        className="relative z-10 w-[320px] sm:w-[400px] md:w-[480px] lg:w-[560px] max-w-[90vw] max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={dismissPermanently}
          className="absolute top-2 right-2 z-10 p-2 md:p-2.5 rounded-full bg-white/90 hover:bg-gray-100 transition-colors shadow-sm"
          aria-label="Close"
        >
          <X className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
        </button>

        <div className="relative aspect-[640/427] w-full overflow-hidden">
          <Image
            src={getMediaUrl(POPUP_IMAGE_PATH)}
            alt="Get in touch - call us"
            fill
            sizes="(max-width: 640px) 320px, (max-width: 768px) 400px, (max-width: 1024px) 480px, 560px"
            quality={90}
            className="object-cover"
          />
        </div>

        <div className="p-4 md:p-5 lg:p-6 space-y-3">
          {submitted ? (
            <div className="text-center py-4">
              <div className="flex justify-center mb-3">
                <CheckCircle2 className="h-12 w-12 text-green-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Message Sent!</h3>
              <p className="text-gray-600 text-sm mb-4">
                Thank you for reaching out. We'll get back to you within 24 hours.
              </p>
              <button
                type="button"
                onClick={resetForm}
                className="bg-[#ED276E] hover:bg-[#c81f5a] text-white px-5 py-2 rounded-[26px] transition-all duration-250 text-sm font-medium"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <>
              <h3 className="text-lg md:text-xl font-semibold text-[#299dd7]">
                Get in Touch
              </h3>
              <p className="text-sm text-gray-600">
                Share your project details and we'll get back to you soon.
              </p>

              <form onSubmit={handleSubmit} className="space-y-3">
                {submitError && (
                  <div className="flex items-start gap-2 p-2 mb-2 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-red-700">{submitError}</p>
                  </div>
                )}

                <div className="relative">
                  <label className="absolute -top-2 left-3 bg-white px-2 text-xs font-semibold z-10">
                    Name <span className="text-[#F00]">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    disabled={isSubmitting}
                    className={`${inputBaseClass} ${errors.name ? inputErrorClass : inputNormalClass}`}
                    required
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                  )}
                </div>

                <div className="relative">
                  <label className="absolute -top-2 left-3 bg-white px-2 text-xs font-semibold z-10">
                    Email <span className="text-[#F00]">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email address"
                    disabled={isSubmitting}
                    className={`${inputBaseClass} ${errors.email ? inputErrorClass : inputNormalClass}`}
                    required
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                  )}
                </div>

                <div className="relative">
                  <label className="absolute -top-2 left-3 bg-white px-2 text-xs font-semibold z-10">
                    Mobile <span className="text-[#F00]">*</span>
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="Your mobile number"
                    disabled={isSubmitting}
                    className={`${inputBaseClass} ${errors.mobile ? inputErrorClass : inputNormalClass}`}
                    required
                  />
                  {errors.mobile && (
                    <p className="text-xs text-red-500 mt-1">{errors.mobile}</p>
                  )}
                </div>

                <div className="relative">
                  <label className="absolute -top-2 left-3 bg-white px-2 text-xs font-semibold z-10">
                    Message <span className="text-[#F00]">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message"
                    disabled={isSubmitting}
                    className={`${inputBaseClass} min-h-[80px] resize-none ${errors.message ? inputErrorClass : inputNormalClass}`}
                    required
                  />
                  {errors.message && (
                    <p className="text-xs text-red-500 mt-1">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#ED276E] hover:bg-[#c81f5a] text-white w-full min-h-9 text-sm font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(popupContent, document.body);
};

export default ContactFormPopup;
