import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  isOpen: boolean;
}

const FAQ: React.FC = () => {
  const [faqItems, setFaqItems] = useState<FAQItem[]>([
    {
      question: "How many people work on your painting crew?",
      answer: "The size of our crew strongly depends on the scope of work and timeline within the project needs to be completed. We usually utilise team of 2-6 professional painter to maximise the productivity.",
      isOpen: true
    },
    {
      question: "What are your working hours?",
      answer: "Our standard working hours are Monday to Friday from 8:00 AM to 5:00 PM, and Saturday from 9:00 AM to 3:00 PM. However, we can accommodate special requests for after-hours or weekend work based on your needs.",
      isOpen: false
    },
    {
      question: "What is the difference between local painter and Home Glazer?",
      answer: "Home Glazer offers professional, insured, and quality-controlled painting services with trained experts, while local painters may vary in quality and reliability. We provide comprehensive services including color consultation, premium materials, and a satisfaction guarantee.",
      isOpen: false
    },
    {
      question: "What are the prices? Is the price negotiable?",
      answer: "Our pricing is based on the scope of work, materials required, and project complexity. We provide detailed, transparent quotes and offer competitive rates. While our prices reflect our quality standards, we're happy to discuss your budget constraints to find a solution that works for you.",
      isOpen: false
    },
    {
      question: "Will my house be cleaned after the painting job?",
      answer: "Absolutely! We take pride in our clean-up process. After completing the painting job, our team will thoroughly clean the area, remove all painting materials, and ensure your space is left in pristine condition, ready for you to enjoy.",
      isOpen: false
    }
  ]);

  const toggleFAQ = (index: number) => {
    setFaqItems(faqItems.map((item, i) => ({
      ...item,
      isOpen: i === index ? !item.isOpen : false
    })));
  };

  return (
    <section className="flex w-[1100px] max-w-full flex-col items-stretch text-black mt-[50px] max-md:mt-10">
      <h2 className="text-[rgba(237,39,110,1)] text-[40px] font-medium text-center self-center">
        FAQ
      </h2>
      <p className="text-[rgba(64,80,94,1)] text-[28px] font-light text-center self-center mt-[9px] max-md:max-w-full">
        Everything you need to know, answered!
      </p>
      
      {faqItems.map((item, index) => (
        <div 
          key={index}
          className={`bg-white border flex flex-col items-stretch ${index === 0 ? 'mt-10' : 'mt-[15px]'} pl-[34px] pr-10 py-[25px] rounded-[10px] border-[rgba(207,207,207,1)] border-solid max-md:max-w-full max-md:px-5 cursor-pointer`}
          onClick={() => toggleFAQ(index)}
        >
          <div className="flex justify-between items-center">
            <h3 className="text-[16px] lg:text-[22px] font-semibold leading-none max-md:max-w-full">
              {item.question}
            </h3>
            <ChevronDown 
              className={`w-6 h-6 text-[rgba(237,39,110,1)] transition-transform duration-300 ${item.isOpen ? 'rotate-180' : ''}`}
            />
          </div>
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${item.isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <p className="text-base font-normal leading-[31px] tracking-[-0.32px] mt-[23px] max-md:max-w-full">
              {item.answer}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default FAQ;