import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const CalculatorForm: React.FC = () => {
  return (
    <section className="w-[90%] lg:w-[80%] mx-auto my-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-[rgba(237,39,110,1)] text-[40px] font-medium mb-4">
            Calculate Your Estimate Cost For Painting & Wood Polishing For Free
          </h2>
          <p className="text-[rgba(64,80,94,1)] text-xl">
            We will understand your requirements and provide a close cost estimate
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mt-12">
          {/* Painting Estimate Card */}
          <div className="flex flex-col items-center text-center">
            <h3 className="text-3xl font-bold text-[#ED276E] mb-3">
              Painting Estimate
            </h3>
            <p className="text-gray-600 mb-6">
              Here Is What Makes Express Painting A Great Choice
            </p>
            <div className="relative w-full bg-gray-100 rounded-lg overflow-hidden mb-8" style={{ aspectRatio: '16/9' }}>
              <Image
                src="/assets/images/Paint-Calculator.webp"
                alt="Painting Estimate"
                fill
                className="object-cover"
              />
            </div>
            <Link 
              href="/calculator/painting" 
              className="group inline-flex items-center bg-[#ED276E] hover:bg-[#c91d5a] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              Go to Paint Calculator
              <svg className="ml-3 w-6 h-6 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          {/* Wood Polishing Estimate Card */}
          <div className="flex flex-col items-center text-center">
            <h3 className="text-3xl font-bold text-[#ED276E] mb-3">
              Wood Polishing Estimate
            </h3>
            <p className="text-gray-600 mb-6">
              Add charm and beauty to woods, It makes the wood strong.
            </p>
            <div className="relative w-full bg-gray-100 rounded-lg overflow-hidden mb-8" style={{ aspectRatio: '16/9' }}>
              <Image
                src="/assets/images/Wood-Polish-Calculator.webp"
                alt="Wood Polishing Estimate"
                fill
                className="object-cover"
              />
            </div>
            <Link 
              href="/calculator/wood-polishing" 
              className="group inline-flex items-center bg-[#299dd7] hover:bg-[#2080b8] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              Go to Wood Polishing Calculator
              <svg className="ml-3 w-6 h-6 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
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