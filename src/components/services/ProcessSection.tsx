
import React from 'react';

const ProcessSection = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
        <h2 className="text-[rgba(237,39,110,1)] text-[40px] font-medium text-center mb-12">
          Seamless Process You Can Count On
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="h-56">
              <img 
                src="/uploads/consultation.png" 
                alt="Consultation" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-gray-800 font-medium text-xl mb-2">1. Consultation:</h3>
              <p className="text-gray-600">
                When you contact us then our representative will meet the client to discuss the project. The main aim of this is to find what type of taste has a client. What he wants in his dream house. Here we talk about trendy colours, the latest paints and discuss your ideas. Clients can ask anything in appointments so that they have nothing to worry about.
              </p>
            </div>
          </div>
          
          {/* Step 2 */}
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="h-56">
              <img 
                src="/uploads/scope-of-work.png" 
                alt="Scope of Work" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-gray-800 font-medium text-xl mb-2">2. Scope of work:</h3>
              <p className="text-gray-600">
                Before house winter comes to your house is a roadmap for good initiation. It contains the list of documentation warranty details which type of paint you want, primer, etc. The "Colour Schedule" lists the room colours and is prepared by a colour consultant or designer. Pricing can be for the entire job or broken down for different options. Except if the extent of work changes, the cost won't change without client approval.
              </p>
            </div>
          </div>
          
          {/* Step 3 */}
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="h-56">
              <img 
                src="/uploads/actual-residential-painting.png" 
                alt="Painting Work" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-gray-800 font-medium text-xl mb-2">3. The actual residential painting work:</h3>
              <p className="text-gray-600">
                When our house painters start the work they properly ensure that all your belongings are safe. If not, they first cover all the things with plastic or cloth. They always ask your preference like Which room you want to go to first. 
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
