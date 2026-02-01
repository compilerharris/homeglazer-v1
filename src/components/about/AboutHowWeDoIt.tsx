import React from 'react';
const AboutHowWeDoIt: React.FC = () => {
  const process = [{
    step: "01",
    subtext: "STEP",
    title: "Free Consultation",
    description: "Talk to our experts and share your vision—no charges, no pressure."
  }, {
    step: "02",
    subtext: "STEP",
    title: "Site Visit & Planning",
    description: "We visit your space and help you choose the perfect colors."
  }, {
    step: "03",
    subtext: "STEP",
    title: "Transparent Quote",
    description: "Get a clear, upfront quote with no hidden surprises."
  }, {
    step: "04",
    subtext: "STEP",
    title: "Execution",
    description: "Our skilled team gets to work—clean, quick, and precise."
  }];
  return <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-[40px] font-medium text-center mb-12">How do we do it?</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {process.map((item, index) => <div key={index} className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="absolute top-1/2 left-0 transform -translate-x-1.5 -translate-y-1/2 w-3 h-3 bg-pink-500 rounded-full border-2 border-white"></div>
                <div className="w-36 h-36 rounded-full bg-gradient-to-r from-blue-200 to-pink-200 flex items-center justify-center">
                  <div className="w-24 h-24 bg-white rounded-full flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold">{item.step}</span>
                    <span className="text-xs">{item.subtext}</span>
                  </div>
                </div>
                <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-pink-500 rounded-full border-2 border-white"></div>
              </div>
              <h3 className="font-bold text-xl mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm max-w-xs">{item.description}</p>
            </div>)}
        </div>
      </div>
    </section>;
};
export default AboutHowWeDoIt;