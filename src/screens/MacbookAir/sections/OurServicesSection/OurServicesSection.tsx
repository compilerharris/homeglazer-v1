import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

export const OurServicesSection = (): JSX.Element => {
  // Service card data for mapping
  const serviceCards = [
    {
      id: 1,
      title: "Residential",
      backgroundImage: "/assets/images/frame.png",
      gradient:
        "linear-gradient(180deg, rgba(0,0,0,0) 73%, rgba(6,58,56,0.6) 84%)",
      className: "w-[30vw] rounded-[40px_12.47px_12.47px_12.47px]",
    },
    {
      id: 2,
      title: "Commercial",
      backgroundImage: "/assets/images/frame-1.png",
      gradient:
        "linear-gradient(180deg, rgba(0,0,0,0) 73%, rgba(62,33,9,0.6) 84%)",
      className: "w-[35.3vw] rounded-[12.47px]",
    },
    {
      id: 3,
      title: "Wood Coating",
      backgroundImage: "/assets/images/frame-2.png",
      gradient:
        "linear-gradient(180deg, rgba(0,0,0,0) 73%, rgba(82,38,8,0.6) 84%)",
      className: "w-[19.6vw] rounded-[12.47px_40px_12.47px_12.47px]",
    },
  ];

  return (
    <div className="flex flex-col w-full items-start gap-[10.39px] px-[5.19px] py-[10.39px]">
      <div className="flex items-start justify-center gap-[15.58px] relative w-full overflow-hidden">
        {serviceCards.map((card) => (
          <Card
            key={card.id}
            className={`relative h-[18vw] overflow-hidden border-0 ${card.className}`}
            style={{
              background: `${card.gradient}, url(${card.backgroundImage}) 50% 50% / cover`,
            }}
          >
            <CardContent className="p-0">
              <div
                className="absolute bottom-5 left-[21px] [text-shadow:0px_8.31px_8.31px_#00000080] font-['Quicksand',Helvetica] font-normal text-white text-[33.2px] tracking-[0] leading-[normal]"
              >
                {card.title}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
