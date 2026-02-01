
import React from 'react';
import { Check } from 'lucide-react';

const AboutValues: React.FC = () => {
  const values = [
    {
      title: "Quality Craftsmanship",
      description: "We take pride in our work and use only the finest materials and techniques."
    },
    {
      title: "Customer Satisfaction",
      description: "Your happiness is our priority - we work until you're completely satisfied."
    },
    {
      title: "Timeliness",
      description: "We respect your time and complete projects according to schedule."
    },
    {
      title: "Attention to Detail",
      description: "Every corner, every edge receives our meticulous attention."
    },
    {
      title: "Professional Service",
      description: "From consultation to clean-up, we maintain the highest standards of professionalism."
    },
    {
      title: "Innovation",
      description: "We continuously explore new techniques and designs to offer you the best."
    }
  ];

  return (
    <section className="py-16 bg-[rgba(223,223,223,0.27)]">
      <div className="container mx-auto px-4">
        <h2 className="text-[40px] font-medium text-center mb-12">Our Values</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[rgba(237,39,110,1)] rounded-full p-1">
                  <Check size={20} color="white" />
                </div>
                <h3 className="font-semibold text-xl">{value.title}</h3>
              </div>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutValues;
