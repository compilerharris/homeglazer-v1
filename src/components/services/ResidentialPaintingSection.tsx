import React from 'react';
import { getMediaUrl } from '@/lib/mediaUrl';

const ResidentialPaintingSection = () => {
  return (
    <section className="py-12 bg-white">
      <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
        <h2 className="text-[40px] font-medium text-center mb-8">
          Home Glazer at Residential painting
        </h2>
        
        <p className="text-[rgba(64,80,94,1)] text-base leading-relaxed mb-12 max-w-5xl mx-auto">
          In today's time everyone just dreams of their beautiful house. To find the correct contrast of colours for 
          your house and walk with the latest trends is a great deal. With the 'Home Glazer' this dream can be 
          accomplished easily. With over 35 years of experience, we are serving our customers with full dedication 
          and warmth. Whatever your friends, your neighbours suggest, you want your own taste because it's 
          your house where you live. It's going to be your 'dream home'. Since everyone will come to you with 
          your promises of work but ' Home Glazer 'just gives the proof in our first meeting. Not only Our house 
          painting services are known but our house painters are also well trained and experienced. We take pride 
          wherever we work
        </p>
        
        <h3 className="text-3xl font-medium text-center mb-8">
          Benefits Of Professional Painting Services
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Card 1 */}
          <div className="bg-white shadow-sm rounded-lg overflow-hidden flex flex-col h-full">
            <div className="h-48">
              <img 
                src={getMediaUrl("/uploads/painting-daunting-task.png")} 
                alt="Exterior Painting" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 flex-grow">
              <p className="text-gray-700 font-medium mb-3">
                Exterior painting can be a daunting task.
              </p>
              <p className="text-gray-600 text-sm">
                Professional painters have the knowledge and skills necessary to guarantee a good painting job. 
                A professional painter will also be able to help you select the right paint colors and finishes for your home.
              </p>
            </div>
          </div>
          
          {/* Card 2 */}
          <div className="bg-white shadow-sm rounded-lg overflow-hidden flex flex-col h-full">
            <div className="h-48">
              <img 
                src={getMediaUrl("/uploads/professional-painters.png")} 
                alt="Professional Painters Tools" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 flex-grow">
              <p className="text-gray-700 font-medium mb-3">
                Professional painters also have access to the best tools and supplies.
              </p>
              <p className="text-gray-600 text-sm">
                This means that you won't have to worry about buying expensive equipment or materials. 
                The Professional painters will take care of everything.
              </p>
            </div>
          </div>
          
          {/* Card 3 */}
          <div className="bg-white shadow-sm rounded-lg overflow-hidden flex flex-col h-full">
            <div className="h-48">
              <img 
                src={getMediaUrl("/uploads/painting-time-consuming.png")} 
                alt="Home Painting" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 flex-grow">
              <p className="text-gray-700 font-medium mb-3">
                Painting your home can be time-consuming, especially if you're not familiar with the best techniques.
              </p>
              <p className="text-gray-600 text-sm">
                Professional painters can do the job quickly and efficiently, so you can spend your time doing what's important to you.
              </p>
            </div>
          </div>
          
          {/* Card 4 */}
          <div className="bg-white shadow-sm rounded-lg overflow-hidden flex flex-col h-full">
            <div className="h-48">
              <img 
                src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-4.0.3" 
                alt="Well-painted Home" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 flex-grow">
              <p className="text-gray-700 font-medium mb-3">
                Studies have shown that our surroundings play a role in our mental health, which is especially true for our homes.
              </p>
              <p className="text-gray-600 text-sm">
                A well-painted home can boost your mood and make you feel happier, while a poorly painted home can have the opposite effect.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResidentialPaintingSection;
