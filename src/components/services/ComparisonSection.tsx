
import React from 'react';
import { Home, Users, Layers, Clock, LayoutGrid } from 'lucide-react';

const ComparisonSection = () => {
  return (
    <section className="py-12 bg-white">
      <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
        <h2 className="text-[rgba(237,39,110,1)] text-[40px] font-medium text-center mb-12">
          Residential Painting vs. Commercial Painting
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Item 1 */}
          <div className="bg-white shadow-sm rounded-lg p-6">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-[rgba(251,243,223,1)] p-4 rounded-lg">
                <Home size={32} className="text-[rgba(237,39,110,1)]" />
              </div>
            </div>
            <h3 className="text-gray-800 font-medium text-xl mb-2 text-center">1. Size of the Project</h3>
            <p className="text-gray-600 text-sm">
              The scope of a painting project is an indication of the type of painting service needed. Residential painting projects include houses, townhouses, condominiums, and other living spaces. The entire home can be painted, the exterior only, or a few interior spaces can be renovated. Commercial painting focuses on larger projects. The types of buildings range from retail shops and shopping malls to industrial buildings and airports.
            </p>
          </div>
          
          {/* Item 2 */}
          <div className="bg-white shadow-sm rounded-lg p-6">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-[rgba(251,243,223,1)] p-4 rounded-lg">
                <Users size={32} className="text-[rgba(237,39,110,1)]" />
              </div>
            </div>
            <h3 className="text-gray-800 font-medium text-xl mb-2 text-center">2. Number of Painters</h3>
            <p className="text-gray-600 text-sm">
              Larger commercial buildings require more painters to cover the area and meet deadlines. Commercial painting companies employ more people so that they can finish commercial painting projects on time. Residential painting projects are smaller in scope and thus does not require that many painters on site.
            </p>
          </div>
          
          {/* Item 3 */}
          <div className="bg-white shadow-sm rounded-lg p-6">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-[rgba(251,243,223,1)] p-4 rounded-lg">
                <Layers size={32} className="text-[rgba(237,39,110,1)]" />
              </div>
            </div>
            <h3 className="text-gray-800 font-medium text-xl mb-2 text-center">3. Materials and Equipment</h3>
            <p className="text-gray-600 text-sm">
              Residential painting contractors are focused solely on smaller residential projects. For this reason, the materials and equipment they use are not too different from paint supplies you can get on your own. Materials such as paintbrushes, rollers, painting trays, step ladders, drop cloths, and cleaning materials are typical of what a residential painter will use on the job.
            </p>
          </div>
          
          {/* Item 4 */}
          <div className="bg-white shadow-sm rounded-lg p-6">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-[rgba(251,243,223,1)] p-4 rounded-lg">
                <LayoutGrid size={32} className="text-[rgba(237,39,110,1)]" />
              </div>
            </div>
            <h3 className="text-gray-800 font-medium text-xl mb-2 text-center">4. Services Provided</h3>
            <p className="text-gray-600 text-sm">
              Commercial painting contractors usually offer additional services than residential painting contractors. Some services include industrial painting and coating, special surface preparation, metalizing, epoxy coatings, sandblasting, and various other services related to businesses.
            </p>
          </div>
          
          {/* Item 5 */}
          <div className="bg-white shadow-sm rounded-lg p-6">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-[rgba(251,243,223,1)] p-4 rounded-lg">
                <Clock size={32} className="text-[rgba(237,39,110,1)]" />
              </div>
            </div>
            <h3 className="text-gray-800 font-medium text-xl mb-2 text-center">5. Scheduling</h3>
            <p className="text-gray-600 text-sm">
              Commercial painting is done according to the schedule of business owners and operations. Scheduling can be quite challenging for businesses, as most want to stay open for the customers as their establishments go through a renovation project at the same time. Some commercial building owners request that painters work around these issues and not interfere with their working hours.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
