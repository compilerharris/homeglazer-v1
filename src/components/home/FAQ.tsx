import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faqItems as faqData, FAQItem } from '@/data/faq';

type FAQItemWithState = FAQItem & { isOpen: boolean };

interface FAQProps {
  limit?: number;
}

const FAQ: React.FC<FAQProps> = ({ limit }) => {
  const items = limit ? faqData.slice(0, limit) : faqData;

  const [faqItems, setFaqItems] = useState<FAQItemWithState[]>(
    items.map((item, index) => ({
      ...item,
      isOpen: index === 0,
    }))
  );

  const toggleFAQ = (index: number) => {
    setFaqItems(faqItems.map((item, i) => ({
      ...item,
      isOpen: i === index ? !item.isOpen : false
    })));
  };

  return (
    <section className="container flex w-[1100px] max-w-full flex-col items-stretch text-black mt-[50px] max-md:mt-10">
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