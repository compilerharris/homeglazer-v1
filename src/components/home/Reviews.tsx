import React from 'react';
import SectionCarousel from './SectionCarousel';
import { CarouselItem } from "@/components/ui/carousel";
const Reviews: React.FC = () => {
  // Real Google reviews from verified customers
  const reviews = [{
    id: "review1",
    quoteIcon: "https://cdn.builder.io/api/v1/image/assets/ebe74153cda349e3ba80a6039bb1465f/ef8e250bd483959c2ece9169925a09e6ff84e36a?placeholderIfAbsent=true",
    text: "We are very pleased with the wonderful paint job your team completed. The color selection was perfect, and the application was smooth and even. The painters were very professional, punctual, and cleaned up thoroughly after the job. We highly recommend your company to anyone looking for high quality painting services.",
    name: "Ashwani Kumar",
    position: "Google Review",
    initials: "AK"
  }, {
    id: "review2",
    quoteIcon: "https://cdn.builder.io/api/v1/image/assets/ebe74153cda349e3ba80a6039bb1465f/26071b2435012144cf53a16107e61981d36120e4?placeholderIfAbsent=true",
    text: "Very Professional service. Mr. Vipin Gupta is well versed in knowledge of his field and painter also did a wonderful job. Happy with the services.",
    name: "Kunal Kapoor",
    position: "Local Guide",
    initials: "KK"
  }, {
    id: "review3",
    quoteIcon: "https://cdn.builder.io/api/v1/image/assets/ebe74153cda349e3ba80a6039bb1465f/ef8e250bd483959c2ece9169925a09e6ff84e36a?placeholderIfAbsent=true",
    text: "Home Glazer was a great choice for my home painting needs and I would gladly recommend them to anyone. The customer service was excellent, the quality of their work was impeccable, and the price was reasonable. They made the entire process seamless.",
    name: "Rajni Pal",
    position: "Google Review",
    initials: "RP"
  }, {
    id: "review4",
    quoteIcon: "https://cdn.builder.io/api/v1/image/assets/ebe74153cda349e3ba80a6039bb1465f/26071b2435012144cf53a16107e61981d36120e4?placeholderIfAbsent=true",
    text: "Not only was I impressed with the quality of their work, but I was also very pleased with the end result. My home looks better than ever and I am so happy with the transformation. I would highly recommend Home Glazer for any painting needs that you might have. They provided me with the best customer service and a top-notch job.",
    name: "Edward Masih",
    position: "Google Review",
    initials: "EM"
  }, {
    id: "review5",
    quoteIcon: "https://cdn.builder.io/api/v1/image/assets/ebe74153cda349e3ba80a6039bb1465f/ef8e250bd483959c2ece9169925a09e6ff84e36a?placeholderIfAbsent=true",
    text: "One of the most professional and clean painting services provider in Delhi NCR. Took their service for my office painting and they did a perfect job.",
    name: "Hitesh Kumar Verma",
    position: "Local Guide",
    initials: "HV"
  }];
  return <section className="w-full mt-[50px] py-0 max-md:mt-10">
      <div className="container mx-auto px-4 lg:px-8 flex flex-col lg:flex-row items-center gap-0 2xl:w-[1400px]">
        <div className="w-full lg:w-1/3 order-2 lg:order-1 my-auto">
          <div className="max-w-[354px] mx-auto">
            <img 
              src="/uploads/Google-Review-QR.jpeg" 
              alt="Scan to leave a Google Review" 
              className="w-32 h-32 object-contain mb-4 rounded-lg"
            />
            <h2 className="text-[rgba(237,39,110,1)] text-[40px] font-medium">
              Google Reviews
            </h2>
            <p className="text-xl text-[rgba(89,89,89,1)] font-light mt-[18px]">
              See why our clients love our services!
            </p>
            <a 
              href="https://www.google.com/search?gs_ssp=eJzj4tVP1zc0TE8zSM7NTjE0YLRSNagwtjRITjU0SEs2tUw2T0k1tTKoMLKwNEkySUm1tDBOTTUwNffizsjPTVVIz0msSi0CAH89E50&q=home+glazer&rlz=1C9BKJA_enIN1146IN1146&oq=home+glazer&hl=en-GB&sourceid=chrome-mobile&ie=UTF-8&sei=H450ac_NOJGf4-EPhvOZ6A8&dlnr=1#ebo=0&lrd=0x390ce10fc59c7de5:0x2894b4de983ee057,1,,,,"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#ED276E] hover:bg-[#299dd7] text-white flex min-h-[60px] w-60 max-w-full items-center gap-[13px] text-[21px] font-normal text-center justify-center mt-7 pl-[18px] pr-[11px] py-[13px] rounded-[35px] transition-colors"
            >
              <span className="self-stretch my-auto">View All Reviews</span>
              <img alt="Arrow Icon" className="aspect-[1] object-contain w-[34px] self-stretch shrink-0 my-auto brightness-0 invert" src="/uploads/12a32754-91eb-4743-b4c9-43258abcf89f.png" />
            </a>
          </div>
        </div>
        
        <div className="w-full lg:w-2/3 order-1 lg:order-2">
          <SectionCarousel reviewsSection={true}>
            {reviews.map(review => <CarouselItem key={review.id} className="basis-full md:basis-1/2">
                <div className="bg-white shadow-[0px_4px_9px_rgba(82,82,82,0.1)] w-full max-w-[500px] mx-auto p-7 rounded-[35px] min-h-[320px] flex flex-col justify-between mb-[30px]">
                  <img src={review.quoteIcon} alt="Quote Icon" className="aspect-[1.56] object-contain w-[53px]" />
                  <p className="text-[rgba(44,44,44,1)] text-sm font-normal leading-[19px] mt-3.5">
                    &quot;{review.text}&quot;
                  </p>
                  <div className="flex items-center gap-3.5 mt-3.5">
                    <div className="w-[53px] h-[53px] rounded-full bg-[#ED276E] flex items-center justify-center text-white font-semibold text-lg">
                      {review.initials}
                    </div>
                    <div className="flex flex-col">
                      <div className="text-[rgba(237,39,110,1)] text-lg font-semibold">
                        {review.name}
                      </div>
                      <div className="text-[rgba(119,119,119,1)] text-sm font-normal mt-1">
                        {review.position}
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>)}
          </SectionCarousel>
        </div>
      </div>
    </section>;
};
export default Reviews;