import React from 'react';
import { Info } from 'lucide-react';
const AboutWhoWeAre: React.FC = () => {
  return <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-[rgba(237,39,110,0.1)]">
              <Info size={30} className="text-[rgba(237,39,110,1)]" />
            </div>
          </div>
          <h2 className="text-[rgba(237,39,110,1)] text-[40px] font-medium mb-6">Who Are We?</h2>
          <p className="text-gray-700 text-lg mb-6">
            At Homeglazer, we are a team of passionate painting professionals dedicated to transforming spaces through the power of color and craftsmanship. Founded in 2008, we have grown from a small team to Delhi's premier painting service provider.
          </p>
          <p className="text-gray-700 text-lg">
            With over 15 years of experience in the industry, we've established ourselves as trusted experts who deliver high-quality painting solutions for residential and commercial properties across Delhi NCR. Our commitment to excellence and customer satisfaction has earned us a reputation for reliability and superior workmanship.
          </p>
        </div>
        
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          <img 
            src="/uploads/team-pic.png" 
            alt="Before and After Transformation" 
            className="rounded-lg shadow-lg w-full h-auto"
          />
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-medium text-[rgba(237,39,110,1)] mb-4">A Legacy of Excellence</h3>
            <p className="text-gray-700">
              Our journey began with a simple mission - to provide exceptional painting services that exceed client expectations. Today, we've completed over 5,000 projects, helping thousands of homeowners and businesses transform their spaces into environments they love.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="text-center">
                <p className="text-3xl font-bold text-[rgba(237,39,110,1)]">15+</p>
                <p className="text-gray-600">Years of Experience</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-[rgba(237,39,110,1)]">5,000+</p>
                <p className="text-gray-600">Projects Completed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default AboutWhoWeAre;