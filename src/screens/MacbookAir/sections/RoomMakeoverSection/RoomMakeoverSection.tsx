import React from "react";

export const RoomMakeoverSection = (): JSX.Element => {
  return (
    <section className="flex flex-col w-full max-w-[522px] items-start gap-8 py-6">
      <h2 className="font-['Quicksand',Helvetica] font-medium text-[#ed276e] text-4xl">
        Get in Touch with Us
      </h2>

      <p className="font-['Quicksand',Helvetica] font-light text-[#595959] text-xl">
        Send us a message, and we'll respond soon!
      </p>

      <p className="font-['Quicksand',Helvetica] font-light text-[#595959] text-xl max-w-[340px]">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed elementum
        pulvinar lacus, a vestibulum massa venenatis eget. Ut nec aliquet dui,
        ac bibendum turpis.
      </p>
    </section>
  );
};
