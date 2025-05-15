import React from 'react';
import Link from 'next/link';

const CalculatorForm: React.FC = () => {
  return (
    <section className="w-[90%] lg:w-[80%] mx-auto my-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-[rgba(237,39,110,1)] text-[40px] font-medium mb-4">
            Calculate Your Estimate Cost For Painting & Wood Polishing For Free
          </h2>
          <p className="text-[rgba(64,80,94,1)] text-xl mb-4">
            Painting is the most economical way to fully spruce up your space 😊
          </p>
          <p className="text-[rgba(64,80,94,1)] text-xl">
            We will understand your requirements and provide a close cost estimate 👌
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {/* Painting Estimate Card */}
          <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100">
            <div className="p-6 min-h-[250px] flex flex-col items-center justify-center">
              <h3 className="text-[rgba(237,39,110,1)] text-2xl font-medium mb-6 text-center">
                Painting Estimate
              </h3>
              <p className="text-center mb-8 text-[rgba(64,80,94,1)]">
                Here Is What Makes Express Painting A Great Choice
              </p>
            </div>
            <div className="bg-[#ED276E] py-4">
              <Link 
                href="/calculator/painting" 
                className="block w-full text-white text-center font-medium"
              >
                Calculate
              </Link>
            </div>
          </div>
          
          {/* Wood Polishing Estimate Card */}
          <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100">
            <div className="p-6 min-h-[250px] flex flex-col items-center justify-center">
              <h3 className="text-[rgba(237,39,110,1)] text-2xl font-medium mb-6 text-center">
                Wood Polishing Estimate
              </h3>
              <p className="text-center mb-8 text-[rgba(64,80,94,1)]">
                Add charm and beauty to woods, It makes the wood strong.
              </p>
            </div>
            <div className="bg-[#ED276E] py-4">
              <Link 
                href="/contact" 
                className="block w-full text-white text-center font-medium"
              >
                Calculate
              </Link>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 mb-6">Want a more accurate estimate? Contact us for a personalized quote.</p>
          <Link 
            href="/contact" 
            className="inline-flex items-center rounded-full bg-[#ED276E] px-6 py-3 text-white hover:bg-[#d51e5f] transition-colors"
          >
            Get a Personalized Quote
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CalculatorForm; 