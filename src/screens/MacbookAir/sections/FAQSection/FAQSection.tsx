import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../../components/ui/accordion";
import { faqItems } from "@/data/faq";

export const FAQSection = (): JSX.Element => {
  const homepageFaqs = faqItems.slice(0, 5);

  return (
    <section className="w-full max-w-[1100px] mx-auto my-8">
      <Accordion
        type="single"
        collapsible
        defaultValue="item-0"
        className="space-y-4"
      >
        {homepageFaqs.map((item, index) => (
          <AccordionItem
            key={`item-${index}`}
            value={`item-${index}`}
            className="bg-white rounded-[10px] border border-solid border-[#cfcfcf] overflow-hidden"
          >
            <AccordionTrigger className="px-8 py-6">
              <span className="text-left font-['Quicksand',Helvetica] font-semibold text-black text-[22px] leading-[22px]">
                {item.question}
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-8 pb-6">
              <p className="font-['Quicksand',Helvetica] font-normal text-black text-base tracking-[-0.32px] leading-[31px]">
                {item.answer}
              </p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
