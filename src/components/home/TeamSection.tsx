import React from 'react';
import SectionCarousel from './SectionCarousel';
import { CarouselItem } from "@/components/ui/carousel";

const TeamSection: React.FC = () => {
  // Sample data for team members with updated image
  const teamMembers = [{
    id: 1,
    name: "John Doe",
    position: "CEO & Founder",
    image: "/uploads/team-thumbnail1.png"
  }, {
    id: 2,
    name: "Jane Smith",
    position: "Head of Operations",
    image: "/uploads/team-thumbnail2.png"
  }, {
    id: 3,
    name: "Alex Johnson",
    position: "Lead Designer",
    image: "/uploads/team-thumbnail3.png"
  }, {
    id: 4,
    name: "Jane Smith",
    position: "Head of Operations",
    image: "/uploads/team-thumbnail2.png"
  }, {
    id: 5,
    name: "Alex Johnson",
    position: "Lead Designer",
    image: "/uploads/team-thumbnail3.png"
  }, {
    id: 6,
    name: "Emily Williams",
    position: "Project Manager",
    image: "/uploads/team-thumbnail2.png"
  }];

  return <section className="bg-[rgba(223,223,223,0.27)] w-full">
      <div className="container mx-auto px-4 lg:px-8 mt-[50px] max-md:mt-10 text-center py-0 lg:py-[50px] 2xl:w-[1400px]">
        <h2 className="text-[rgba(237,39,110,1)] text-[40px] font-medium mb-5 leading-[150%]">
          The Hands That Build
        </h2>
        <p className="text-xl text-[rgba(64,80,94,1)] font-light mb-10 max-w-2xl mx-auto">
          Our expert team of painters and designers is dedicated to bringing your vision to life.
        </p>

        <div className="w-full mx-auto flex justify-center">
          <SectionCarousel teamSection={true}>
            {teamMembers.map(member => <CarouselItem key={member.id} className="basis-full md:basis-1/3 lg:basis-1/4 flex justify-center">
                <div className="flex flex-col items-center p-4 text-center max-w-[300px]">
                  <div className="w-[200px] h-[200px] rounded-full overflow-hidden mb-4 bg-gray-100">
                    <img src={member.image} alt={`${member.name} photo`} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-xl font-semibold text-[rgba(237,39,110,1)]">{member.name}</h3>
                  <p className="text-[rgba(89,89,89,1)]">{member.position}</p>
                </div>
              </CarouselItem>)}
          </SectionCarousel>
        </div>
      </div>
    </section>;
};

export default TeamSection;