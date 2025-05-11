
import React from 'react';

const AboutHistory: React.FC = () => {
  const milestones = [
    {
      year: "2008",
      title: "Company Founded",
      description: "Homeglazer was established with a team of 3 painters."
    },
    {
      year: "2012",
      title: "Expansion",
      description: "Grew to a team of 25 professionals serving the entire Delhi NCR."
    },
    {
      year: "2015",
      title: "Service Innovation",
      description: "Introduced digital color visualization services."
    },
    {
      year: "2019",
      title: "Industry Recognition",
      description: "Received Best Home Service Provider award in Delhi."
    },
    {
      year: "2023",
      title: "Sustainable Practices",
      description: "Adopted eco-friendly painting solutions and materials."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-[rgba(237,39,110,1)] text-[40px] font-medium text-center mb-12">Our Journey</h2>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[rgba(237,39,110,0.3)]"></div>
          
          {/* Milestones */}
          <div className="relative z-10">
            {milestones.map((milestone, index) => (
              <div key={index} className={`flex flex-col md:flex-row items-center mb-16 ${index % 2 === 0 ? 'md:justify-start' : 'md:flex-row-reverse md:justify-end'}`}>
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8 text-right' : 'md:pl-8 text-left'}`}>
                  <h3 className="text-2xl font-bold text-[rgba(237,39,110,1)]">{milestone.year}</h3>
                  <h4 className="text-xl font-medium mt-2">{milestone.title}</h4>
                  <p className="text-gray-600 mt-2">{milestone.description}</p>
                </div>
                
                <div className="flex items-center justify-center bg-[rgba(237,39,110,1)] text-white rounded-full w-12 h-12 my-4 md:my-0 z-10">
                  {index + 1}
                </div>
                
                <div className="w-full md:w-5/12"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHistory;
