import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

// Define category data for mapping
const categories = [
  {
    id: 1,
    title: "Kids Room",
    image: "/assets/images/frame-3.png",
    gradientColor: "rgba(188,138,129,0.6)",
    className: "w-[23.5vw] rounded-[12.47px_12.47px_12.47px_40px]",
  },
  {
    id: 2,
    title: "Wall Decor",
    image: "/assets/images/frame-4.png",
    gradientColor: "rgba(75,56,41,0.6)",
    className: "w-[35.3vw] rounded-[12.47px]",
  },
  {
    id: 3,
    title: "Customised Painting",
    image: "/assets/images/frame-5.png",
    gradientColor: "rgba(70,67,38,0.6)",
    className: "w-[26vw] rounded-[12.47px_12.47px_40px_12.47px]",
  },
];

export const MainContentSection = (): JSX.Element => {
  return (
    <section className="flex flex-col w-full items-start gap-[10.39px] px-[5.19px] py-[10.39px]">
      <div className="flex items-start justify-center gap-[15.58px] relative w-full overflow-hidden">
        {categories.map((category) => (
          <Card
            key={category.id}
            className={`relative h-[18vw] overflow-hidden border-0 ${category.className}`}
            style={{
              background: `linear-gradient(180deg, rgba(0,0,0,0) 73%, ${category.gradientColor} 84%), url(${category.image}) 50% 50% / cover`,
            }}
          >
            <CardContent className="p-0">
              <div className="absolute bottom-5 left-[21px] [text-shadow:0px_8.31px_8.31px_#00000080] font-['Quicksand',Helvetica] font-normal text-white text-[33.2px] tracking-[0] leading-[normal]">
                {category.title}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
