import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

export const WhyChooseUsSection = (): JSX.Element => {
  // Data for the cards to enable mapping
  const featureCards = [
    {
      id: 1,
      title: "Trusted Expertise",
      description: "35+ years delivering high-quality painting services.",
      icon: "/assets/images/star-svgrepo-com.svg",
      alt: "Star svgrepo com",
    },
    {
      id: 2,
      title: "Skilled Experts",
      description: "Trained and experienced painters at your service.",
      icon: "/assets/images/painter-svgrepo-com-1.svg",
      alt: "Painter svgrepo com",
    },
    {
      id: 3,
      title: "Free Site Visit",
      description: "No-cost consultation to help you decide.",
      icon: "/assets/images/painter-svgrepo-com-1.svg",
      isSpecialIcon: true,
    },
    {
      id: 4,
      title: "Site Supervision",
      description: "A dedicated expert to ensure smooth execution.",
      icon: "/assets/images/group-1.png",
      alt: "Group",
    },
  ];

  return (
    <section className="flex flex-wrap justify-center gap-[27px] w-full py-6">
      {featureCards.map((card) => (
        <Card
          key={card.id}
          className="w-[23%] h-[219px] bg-[#d8d8d880] rounded-[22.5px] shadow-[0px_6px_6px_#0000000f] relative"
        >
          <CardContent className="p-0">
            {card.id === 3 ? (
              <div className="absolute w-[66px] h-[66px] top-[18px] left-3 bg-[url(/assets/images/date-svgrepo-com-1.svg)] bg-[100%_100%]">
                <div className="relative w-[39px] h-[22px] top-[33px] left-3.5 bg-[#bfb0c1] rounded-[1.5px]" />
              </div>
            ) : (
              <img
                className="absolute w-[66px] h-[66px] top-[18px] left-[18px]"
                alt={card.alt}
                src={card.icon}
              />
            )}

            <div className="absolute w-[260px] top-[98px] left-[18px] [font-family:'Quicksand',Helvetica] font-medium text-[#595959] text-[27px] tracking-[0] leading-[normal]">
              {card.title}
            </div>

            <div className="absolute w-[248px] top-[141px] left-[18px] [font-family:'Quicksand',Helvetica] font-light text-[#595959] text-[21px] tracking-[0] leading-[normal]">
              {card.description}
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
};
