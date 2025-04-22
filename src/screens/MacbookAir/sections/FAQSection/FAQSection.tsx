import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../../components/ui/accordion";

export const FAQSection = (): JSX.Element => {
  // FAQ data for mapping
  const faqItems = [
    {
      question: "How many people work on your painting crew?",
      answer:
        "The size of our crew strongly depends on the scope of work and timeline within the project needs to be completed. We usually utilise team of 2-6 professional painter to maximise the productivity.",
    },
    {
      question: "What are your working hours?",
      answer: "",
    },
    {
      question:
        "What is the difference between painting services of local painter and Home Glazer?",
      answer: "",
    },
    {
      question: "What are the prices? Is the price negotiable?",
      answer: "",
    },
    {
      question: "Will my house be cleaned after the painting job?",
      answer: "",
    },
  ];

  return (
    <section className="w-full max-w-[1100px] mx-auto my-8">
      <Accordion
        type="single"
        collapsible
        defaultValue="item-0"
        className="space-y-4"
      >
        {faqItems.map((item, index) => (
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
