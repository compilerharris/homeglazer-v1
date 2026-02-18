'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { getMediaUrl } from '@/lib/mediaUrl';
import CanvasRoomVisualiser from './CanvasRoomVisualiser';
import SvgRoomVisualiser from './SvgRoomVisualiser';
import { useIsDesktop } from '@/hooks/useIsDesktop';
import { embeddedWallMasks } from '../../data/embeddedWallMasks';

const roomImage = '/assets/images/kidsroom/kidsroom10/kidsroom10.jpg';
const wallKeys = ['front', 'left', 'right'];
const combinedWallPath = wallKeys
  .map((k) => embeddedWallMasks.kidsroom10?.[k])
  .filter(Boolean)
  .join(' ');

interface MiniKidsVisualizerProps {
  className?: string;
}

const MiniKidsVisualizer: React.FC<MiniKidsVisualizerProps> = ({ className = '' }) => {
  const isDesktop = useIsDesktop();
  const [selectedColor, setSelectedColor] = useState<string>('#F9D07D');

  // Color options from different brands
  const colorOptions = [
    {
      name: "Sunny Yellow",
      color: "#F9D07D",
      hex: "#F9D07D",
      code: "2047",
      brand: "JSW"
    },
    {
      name: "Sky Blue",
      color: "#81D4FA",
      hex: "#81D4FA",
      code: "7830",
      brand: "Asian Paints"
    },
    {
      name: "Mint Green",
      color: "#A5D6A7",
      hex: "#A5D6A7",
      code: "4792",
      brand: "Nerolac"
    },
    {
      name: "Lavender",
      color: "#CE93D8",
      hex: "#CE93D8",
      code: "6D0307",
      brand: "Berger"
    },
    {
      name: "Coral Orange",
      color: "#FFAB91",
      hex: "#FFAB91",
      code: "4785",
      brand: "Nerolac"
    },
    {
      name: "Bubblegum Pink",
      color: "#F48FB1",
      hex: "#F48FB1",
      code: "2067",
      brand: "JSW"
    }
  ];

  const handleColorClick = (color: string) => {
    setSelectedColor(color);
  };

  return (
    <div className={`${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Preview Image - kidsroom10 with CanvasRoomVisualiser */}
        <div className="relative">
          <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden">
            <div className="relative w-full h-full">
              {isDesktop ? (
                <CanvasRoomVisualiser
                  imageSrc={getMediaUrl(roomImage)}
                  wallPath={combinedWallPath}
                  colorHex={selectedColor}
                  roomLabel="kids room"
                />
              ) : (
                <SvgRoomVisualiser
                  imageSrc={getMediaUrl(roomImage)}
                  wallPath={combinedWallPath}
                  colorHex={selectedColor}
                  roomLabel="kids room"
                />
              )}
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Click on a colour swatch to see it applied to the room
            </p>
          </div>
        </div>
        
        {/* Color Palette */}
        <div className="lg:pl-8">
          <h3 className="text-2xl font-bold mb-6">
            Popular Kids Room Colors
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {colorOptions.map((colorOption, index) => (
              <button
                key={index}
                className={`group relative bg-white rounded-xl p-2 shadow-md hover:shadow-lg transition-all duration-300 border-2 ${
                  selectedColor === colorOption.color 
                    ? 'border-[#ED276E]' 
                    : 'border-transparent hover:border-[#ED276E]'
                }`}
                onClick={() => handleColorClick(colorOption.color)}
              >
                <div 
                  className="w-full h-20 rounded-lg mb-3 border border-gray-200"
                  style={{ backgroundColor: colorOption.color }}
                ></div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    {colorOption.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {colorOption.brand} - {colorOption.code}
                  </p>
                </div>
              </button>
            ))}
          </div>
          
          <div className="mt-8 p-6 bg-gradient-to-r from-[#ED276E]/10 to-[#299dd7]/10 rounded-xl">
            <h4 className="text-lg font-semibold text-gray-900 mb-3">
              Color Psychology for Kids
            </h4>
            <div className="space-y-2 text-sm text-gray-600">
              <p><strong>Sunny Yellow:</strong> Promotes creativity, happiness, and energy</p>
              <p><strong>Sky Blue:</strong> Creates calm and peaceful environment</p>
              <p><strong>Mint Green:</strong> Promotes growth, learning, and harmony</p>
              <p><strong>Lavender:</strong> Encourages imagination and creativity</p>
              <p><strong>Coral Orange:</strong> Energizing and stimulates social interaction</p>
              <p><strong>Bubblegum Pink:</strong> Nurturing and comforting atmosphere</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Color Palette - Horizontal Scrollable */}
      <div className="lg:hidden mt-8">
        <h3 className="text-xl font-bold mb-4 text-center">
          Choose Your Color
        </h3>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {colorOptions.map((colorOption, index) => (
            <button
              key={index}
              className={`flex-shrink-0 group relative bg-white rounded-xl p-2 shadow-md hover:shadow-lg transition-all duration-300 border-2 min-w-[120px] ${
                selectedColor === colorOption.color 
                  ? 'border-[#ED276E]' 
                  : 'border-transparent hover:border-[#ED276E]'
              }`}
              onClick={() => handleColorClick(colorOption.color)}
            >
              <div 
                className="w-full h-12 rounded-lg mb-2 border border-gray-200"
                style={{ backgroundColor: colorOption.color }}
              ></div>
              <div className="text-center">
                <p className="text-xs font-medium text-gray-900 mb-1">
                  {colorOption.name}
                </p>
                <p className="text-xs text-gray-400">
                  {colorOption.brand} - {colorOption.code}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Visualiser Options */}
      <div className="mt-12 w-full bg-gradient-to-r from-[#ED276E] to-[#299dd7] py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            Want to Visualize More Colors?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Single Wall Visualiser Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <h4 className="text-xl font-bold text-[#299dd7] mb-3">
                Single Wall Visualiser
              </h4>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Quickly preview popular colour combinations on sample rooms. Simple and fast!
              </p>
              <Link 
                href="/colour-visualiser/basic"
                className="inline-block w-full bg-[#299dd7] text-white font-medium py-3 px-6 rounded-lg text-center flex justify-center items-center hover:bg-[#1e7bb8] transition-all duration-200"
              >
                Try Single Wall Visualiser
              </Link>
            </div>

            {/* Advanced Visualiser Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <h4 className="text-xl font-bold text-[#ED276E] mb-3">
                Advanced Visualiser
              </h4>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Choose different colours for each wall and roof across multiple room types.
              </p>
              <Link 
                href="/colour-visualiser/advanced"
                className="inline-block w-full bg-[#ED276E] text-white font-medium py-3 px-6 rounded-lg text-center flex justify-center items-center hover:bg-[#d61f5a] transition-all duration-200"
              >
                Try Advanced Visualiser
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniKidsVisualizer; 