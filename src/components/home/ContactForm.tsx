import React, { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  mobile: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    mobile: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Form submitted:', formData);
    // Reset form after submission
    setFormData({ name: '', email: '', mobile: '', message: '' });
  };

  return (
    <section className="bg-[rgba(246,246,246,1)] w-full mt-[50px] py-[23px] max-md:mt-10">
      <div className="w-[80%] 2xl:w-[1400px] mx-auto flex items-center gap-[40px] justify-center flex-wrap">
        <div className="self-stretch min-w-60 text-xl text-[rgba(89,89,89,1)] font-light w-[398px] my-auto">
          <h2 className="text-[rgba(237,39,110,1)] text-[40px] font-medium leading-[150%]">
            Get in Touch with Us
          </h2>
          <p className="mt-[33px]">
            Send us a message, and we'll respond soon!
          </p>
          <p className="mt-[33px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            elementum pulvinar lacus, a vestibulum massa venenatis eget. Ut
            nec aliquet dui, ac bibendum turpis.
          </p>
        </div>
        <div className="bg-white shadow-[0px_5px_16px_rgba(8,15,52,0.06)] self-stretch min-w-60 w-[358px] my-auto pt-9 pb-5 px-[21px] rounded-xl">
          <form onSubmit={handleSubmit}>
            <div className="w-full">
              <div className="flex min-h-10 w-full gap-[25px] mb-8">
                <div className="min-w-60 h-10 w-full flex-1 shrink basis-[0%] relative">
                  <label className="absolute -top-2 left-4 bg-white px-2 text-xs font-semibold z-10">
                    First name <span className="text-[#F00]">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="border border-[#D2D5DA] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.05)] bg-white w-full min-h-10 text-sm text-[rgba(108,114,127,1)] font-light px-4 py-2 rounded-lg outline-none"
                    required
                  />
                </div>
              </div>
              <div className="flex min-h-10 w-full gap-[25px] mb-8">
                <div className="min-w-60 h-10 w-full flex-1 shrink basis-[0%] relative">
                  <label className="absolute -top-2 left-4 bg-white px-2 text-xs font-semibold z-10">
                    Email <span className="text-[#F00]">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email address"
                    className="border border-[#D2D5DA] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.05)] bg-white w-full min-h-10 text-sm text-[rgba(108,114,127,1)] font-light px-4 py-2 rounded-lg outline-none"
                    required
                  />
                </div>
              </div>
              <div className="flex min-h-10 w-full gap-[25px] mb-8">
                <div className="min-w-60 h-10 w-full flex-1 shrink basis-[0%] relative">
                  <label className="absolute -top-2 left-4 bg-white px-2 text-xs font-semibold z-10">
                    Mobile <span className="text-[#F00]">*</span>
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="Your mobile number"
                    className="border border-[#D2D5DA] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.05)] bg-white w-full min-h-10 text-sm text-[rgba(108,114,127,1)] font-light px-4 py-2 rounded-lg outline-none"
                    required
                  />
                </div>
              </div>
              <div className="min-h-[111px] w-full mb-6 relative">
                <label className="absolute -top-2 left-4 bg-white px-2 text-xs font-semibold z-10">
                  Message <span className="text-[#F00]">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message"
                  className="border border-[#D2D5DA] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.05)] bg-white w-full min-h-[100px] text-sm text-[rgba(108,114,127,1)] font-light px-4 py-2 rounded-lg outline-none resize-none"
                  required
                ></textarea>
              </div>
            </div>
            <button
              type="submit"
              className="bg-[rgba(237,39,110,1)] hover:bg-[rgba(59,130,246,1)] text-white w-full min-h-10 text-base font-normal text-center mt-[15px] py-2.5 rounded-[26px] transition-all duration-250"
            >
              Submit Enquiry
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
