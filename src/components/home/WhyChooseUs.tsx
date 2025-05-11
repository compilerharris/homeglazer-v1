import React from 'react';
const WhyChooseUs: React.FC = () => {
  return <section className="w-[90%] lg:w-[80%] mx-auto flex max-w-full flex-col items-center mt-[50px] max-md:mt-10">
      <h2 className="text-[rgba(237,39,110,1)] text-[40px] font-medium text-center leading-[150%]">
        Why Choose Us?
      </h2>
      <p className="text-[rgba(64,80,94,1)] text-xl font-light text-center mt-2">
        Superior Quality & Exceptional Service
      </p>
      <div className="w-full flex gap-[27px] text-[rgba(89,89,89,1)] justify-center flex-wrap mt-[52px] max-md:mt-10">
        <div className="bg-gradient-to-br from-[#ED276E] to-[#299dd7] shadow-[0px_6px_6px_rgba(0,0,0,0.06)] grow shrink pl-8 pr-8 py-[22px] rounded-[23px] w-full md:w-1/3 lg:w-1/5">
          <img src="/lovable-uploads/trusted-expertiese.svg" alt="Trusted Expertise Icon" className="aspect-[1] object-contain w-[66px] text-[rgba(59,130,246,1)]" />
          <h3 className="text-[27px] font-medium mt-3 text-white text-white">
            Trusted Expertise
          </h3>
          <p className="text-[18px] font-light mt-3 text-white">
            35+ years delivering high-quality painting services.
          </p>
        </div>
        <div className="bg-gradient-to-br from-[#ED276E] to-[#299dd7] shadow-[0px_6px_6px_rgba(0,0,0,0.06)] grow shrink px-8 py-8 rounded-[23px] w-full md:w-1/3 lg:w-1/5">
          <img src="/lovable-uploads/skilled-experts.svg" alt="Skilled Experts Icon" className="aspect-[1] object-contain w-[66px] text-[rgba(59,130,246,1)]" />
          <h3 className="text-[27px] font-medium mt-3 text-white">
            Skilled Experts
          </h3>
          <p className="text-[18px] font-light mt-3 text-white">
            Trained and experienced painters at your service.
          </p>
        </div>
        <div className="bg-gradient-to-br from-[#ED276E] to-[#299dd7] shadow-[0px_6px_6px_rgba(0,0,0,0.06)] grow shrink px-8 py-8 rounded-[23px] w-full md:w-1/3 lg:w-1/5">
          <img src="/lovable-uploads/site-supervision.svg" alt="Free Site Visit Icon" className="aspect-[1] object-contain w-[66px] rounded-[0px_0px_0px_0px] text-[rgba(59,130,246,1)]" />
          <h3 className="text-[27px] font-medium mt-3 text-white">
            Free Site Visit
          </h3>
          <p className="text-[18px] font-light mt-3 text-white">
            No-cost consultation to help you decide.
          </p>
        </div>
        <div className="bg-gradient-to-br from-[#ED276E] to-[#299dd7] shadow-[0px_6px_6px_rgba(0,0,0,0.06)] grow shrink px-8 py-8 rounded-[23px] w-full md:w-1/3 lg:w-1/5">
          <img src="/lovable-uploads/free-site-visit.svg" alt="Site Supervision Icon" className="aspect-[1] object-contain w-[66px] text-[rgba(59,130,246,1)]" />
          <h3 className="text-[27px] font-medium mt-3 text-white">
            Site Supervision
          </h3>
          <p className="text-[18px] font-light mt-3 text-white">
            A dedicated expert to ensure smooth execution.
          </p>
        </div>
      </div>
    </section>;
};
export default WhyChooseUs;