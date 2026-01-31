import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface MiniKidsVisualizerProps {
  className?: string;
}

const MiniKidsVisualizer: React.FC<MiniKidsVisualizerProps> = ({ className = '' }) => {
  const [selectedColor, setSelectedColor] = useState<string>('#F9D07D');
  const [wallMasks, setWallMasks] = useState<Record<string, string>>({});
  const [loadingMasks, setLoadingMasks] = useState(true);
  const svgRef = useRef<SVGSVGElement>(null);

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

  // Use kidsroom2 assets (no roof mask)
  const roomImage = '/assets/images/kidsroom/kidsroom2/kidsroom2.jpg';
  const wallSvgs = {
    left: '/assets/images/kidsroom/kidsroom2/left-wall.svg',
    right: '/assets/images/kidsroom/kidsroom2/right-wall.svg',
    chair: '/assets/images/kidsroom/kidsroom2/chair.svg',
    curtain: '/assets/images/kidsroom/kidsroom2/curtain.svg',
    edge: '/assets/images/kidsroom/kidsroom2/edge.svg',
    shelf: '/assets/images/kidsroom/kidsroom2/shelf.svg',
    table: '/assets/images/kidsroom/kidsroom2/table.svg',
  };

  const wallKeys = ['left', 'right', 'chair', 'curtain', 'edge', 'shelf', 'table'];
  const wallLabels: Record<string, string> = {
    left: 'Left Wall', 
    right: 'Right Wall',
    chair: 'Chair',
    curtain: 'Curtain',
    edge: 'Edge',
    shelf: 'Shelf',
    table: 'Table',
  };

  // Load wall masks from existing bedroom1 assets
  useEffect(() => {
    const loadMasks = async () => {
      setLoadingMasks(true);
      
      const promises = Object.entries(wallSvgs).map(async ([key, url]) => {
        try {
          const res = await fetch(url);
          const svgText = await res.text();
          
          // Try DOMParser if available
          if (typeof window !== 'undefined' && 'DOMParser' in window) {
            try {
              const parser = new window.DOMParser();
              const doc = parser.parseFromString(svgText, 'image/svg+xml');
              const path = doc.querySelector('path');
              if (path && path.getAttribute('d')) {
                return { key, d: path.getAttribute('d') || '' };
              }
            } catch (e) {
              console.error('Error parsing SVG with DOMParser:', e);
            }
          }
          
          // Fallback: regex for d attribute
          const pathMatch = svgText.match(/<path[^>]*d=["']([^"']+)["'][^>]*>/i);
          if (pathMatch) {
            return { key, d: pathMatch[1] };
          }
          
          // Fallback: try to find all paths and use the first
          const allPaths = Array.from(svgText.matchAll(/<path[^>]*d=["']([^"']+)["'][^>]*>/gi));
          if (allPaths.length > 0) {
            return { key, d: allPaths[0][1] };
          }
          
          return { key, d: '' };
        } catch (err) {
          console.error(`Failed to fetch/parse SVG for ${key}:`, err);
          return { key, d: '' };
        }
      });

      Promise.all(promises).then(results => {
        const newWallMasks = results.reduce((acc, { key, d }) => {
          if (d) acc[key] = d;
          return acc;
        }, {} as Record<string, string>);
        setWallMasks(newWallMasks);
        setLoadingMasks(false);
      });
    };

    loadMasks();
  }, []);

  const handleColorClick = (color: string) => {
    setSelectedColor(color);
  };

  return (
    <div className={`${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Preview Image - Using existing bedroom1 image */}
        <div className="relative">
          <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden">
            <img
              src={roomImage}
              alt="Kids Room Preview"
              className="w-full h-full object-cover"
            />
            {/* SVG Overlay for wall masking - Using existing bedroom1 masks */}
            <svg
              ref={svgRef}
              className="svg-overlay absolute inset-0 w-full h-full pointer-events-none mix-blend-multiply"
              viewBox="0 0 1280 720"
              preserveAspectRatio="xMidYMid slice"
            >
              {wallKeys.map((wallKey) => {
                if (!wallMasks[wallKey]) return null;
                return (
                  <g key={wallKey}>
                    <defs>
                      <mask id={`wall-mask-${wallKey}`}>
                        <rect width="100%" height="100%" fill="black"/>
                        <path d={wallMasks[wallKey]} fill="white"/>
                      </mask>
                    </defs>
                    <rect 
                      width="100%" 
                      height="100%" 
                      fill={selectedColor || '#ffffff'} 
                      opacity="0.7"
                      mask={`url(#wall-mask-${wallKey})`}
                      className="wall-path"
                      data-wall={wallKey}
                    />
                  </g>
                );
              })}
            </svg>
            {loadingMasks && (
              <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center">
                <div className="text-gray-500">Loading masks...</div>
              </div>
            )}
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Click on a colour swatch to see it applied to the room
            </p>
          </div>
        </div>
        
        {/* Color Palette */}
        <div className="lg:pl-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
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
        <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
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