import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Header from '../src/components/home/Header';
import Footer from '../src/components/home/Footer';
import DevToolsProtection from '../src/components/security/DevToolsProtection';

// Mini Room Visualizer Component for Split Screen
const MiniRoomVisualizer: React.FC<{ 
  side: 'left' | 'right'; 
  currentColorIndex: number; 
  colors: string[] | Array<{ left: string; right: string; window: string }>;
  roomImage: string;
  wallSvgs: Record<string, string>;
}> = React.memo(({ side, currentColorIndex, colors, roomImage, wallSvgs }) => {
  const [wallMasks, setWallMasks] = useState<Record<string, string>>({});
  const [loadingMasks, setLoadingMasks] = useState(true);
  const svgRef = useRef<SVGSVGElement>(null);

  const wallKeys = ['left', 'right', 'window'];

  // Load wall masks
  useEffect(() => {
    const loadWallMasks = async () => {
      try {
        const promises = Object.entries(wallSvgs).map(async ([key, url]) => {
          try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`Failed to load ${url}`);
            const svgText = await res.text();
            
            // Extract path data
            const parser = new DOMParser();
            let pathData = '';
            
            try {
              const doc = parser.parseFromString(svgText, 'image/svg+xml');
              const pathElement = doc.querySelector('path');
              if (pathElement) {
                pathData = pathElement.getAttribute('d') || '';
              }
            } catch (e) {
              console.error('Error parsing SVG with DOMParser:', e);
              const pathMatch = svgText.match(/<path[^>]*d=["']([^"']+)["'][^>]*>/i);
              if (pathMatch && pathMatch[1]) {
                pathData = pathMatch[1];
              }
            }
            
            return [key, pathData];
          } catch (error) {
            console.error(`Error loading wall mask ${key}:`, error);
            return [key, ''];
          }
        });

        const results = await Promise.all(promises);
        const masks = Object.fromEntries(results);
        setWallMasks(masks);
        setLoadingMasks(false);
      } catch (error) {
        console.error('Error loading wall masks:', error);
        setLoadingMasks(false);
      }
    };

    if (Object.keys(wallSvgs).length > 0) {
      loadWallMasks();
    }
  }, [wallSvgs]);

  if (loadingMasks) {
    return (
      <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-gray-500">Loading...</div>
        </div>
      </div>
    );
  }

  // Handle different color modes for Single Wall vs Advanced
  const getWallColor = (wallKey: string) => {
    if (Array.isArray(colors) && colors.length > 0) {
      if (typeof colors[currentColorIndex] === 'string') {
        // Single wall - same color for all walls
        return colors[currentColorIndex];
      } else {
        // Advanced - different colors for different walls and window
        const colorSet = colors[currentColorIndex];
        if (wallKey === 'left') return colorSet?.left || '#FF6B6B';
        if (wallKey === 'right') return colorSet?.right || '#81C784';
        if (wallKey === 'window') return colorSet?.window || '#BA68C8'; // Window has its own color
        return colorSet?.left || '#FF6B6B';
      }
    }
    return '#FF6B6B';
  };

  return (
    <div 
      className="relative w-full bg-gray-100 rounded-lg overflow-hidden transition-all duration-600 ease-out"
      style={{
        aspectRatio: '16/9', // 1280x720 proportion
        backgroundImage: `url(${roomImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* SVG Overlay for wall masking */}
      <svg
        ref={svgRef}
        className="svg-overlay absolute inset-0 w-full h-full pointer-events-none mix-blend-multiply"
        viewBox="0 0 1280 720"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {wallKeys.map((wall) => (
            <mask key={`mask-${wall}`} id={`mask-${wall}-${side}`}>
              <rect width="100%" height="100%" fill="black" />
              {wallMasks[wall] && (
                <path 
                  d={wallMasks[wall]} 
                  fill="white"
                />
              )}
            </mask>
          ))}
        </defs>
        {wallKeys.map((wall, index) => (
          wallMasks[wall] && (
            <rect
              key={`wall-${wall}-${index}`}
              width="100%"
              height="100%"
              fill={getWallColor(wall)}
              opacity="0.7"
              mask={`url(#mask-${wall}-${side})`}
              className="wall-path"
              style={{
                transition: 'fill 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            />
          )
        ))}
      </svg>
    </div>
  );
});

const ColourVisualiserPage: React.FC = () => {
  const [colorIndex, setColorIndex] = useState(0);

  // Memoize color arrays to prevent re-creation
  const warmColors = React.useMemo(() => [
    '#FF6B6B', // Red
    '#FF8E53', // Orange  
    '#FFB74D', // Light Orange
    '#FFD54F', // Yellow
    '#FFAB91', // Coral
    '#F48FB1'  // Pink
  ], []);

  const coolColorSets = React.useMemo(() => [
    { left: '#4FC3F7', right: '#81C784', window: '#BA68C8' }, // Blue, Green, Purple
    { left: '#FF6B6B', right: '#FFB74D', window: '#4FC3F7' }, // Red, Orange, Blue
    { left: '#81C784', right: '#BA68C8', window: '#FF8E53' }, // Green, Purple, Orange
    { left: '#BA68C8', right: '#4FC3F7', window: '#81C784' }, // Purple, Blue, Green
    { left: '#FFB74D', right: '#FF6B6B', window: '#4DB6AC' }, // Orange, Red, Teal
    { left: '#F06292', right: '#81C784', window: '#4FC3F7' }  // Pink, Green, Blue
  ], []);

  // Room assets - same for both sides as requested
  const wallSvgs = React.useMemo(() => ({
    left: '/assets/images/bedroom/bedroom6/left-wall.svg',
    right: '/assets/images/bedroom/bedroom6/right-wall.svg',
    window: '/assets/images/bedroom/bedroom6/window.svg'
  }), []);

  // Synchronized color cycling every second non-stop
  useEffect(() => {
    let colorInterval: NodeJS.Timeout;
    const startInterval = () => {
      colorInterval = setInterval(() => {
        setColorIndex((prev) => (prev + 1) % Math.max(warmColors.length, coolColorSets.length));
      }, 1000); // Every second, non-stop
    };

    const timeoutId = setTimeout(startInterval, 300);

    return () => {
      clearTimeout(timeoutId);
      if (colorInterval) clearInterval(colorInterval);
    };
  }, [warmColors.length, coolColorSets.length]);

  return (
    <>
      <DevToolsProtection />
      <Header />
      
      {/* Main Split Screen Layout with Beautiful Background */}
      <main className="relative w-full flex flex-col lg:flex-row lg:h-screen">
        
        {/* Beautiful Center Fading Border */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent z-10 transform -translate-x-1/2"></div>
        <div className="hidden lg:block absolute left-1/2 top-0 h-20 w-px bg-gradient-to-b from-gray-300 to-transparent z-10 transform -translate-x-1/2"></div>
        <div className="hidden lg:block absolute left-1/2 bottom-0 h-20 w-px bg-gradient-to-t from-gray-300 to-transparent z-10 transform -translate-x-1/2"></div>
        
        {/* Left Side - Single Wall Visualiser */}
        <div 
          className="relative w-full lg:w-1/2 lg:h-full flex flex-col items-center justify-center p-8 lg:p-12 pt-20 lg:pt-20"
          style={{
            background: 'linear-gradient(135deg, #f8fafc 0%, #e8f4f8 50%, #f1f5f9 100%)'
          }}

        >
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-3">
            <div 
              className="absolute inset-0 transition-all duration-600 ease-out" 
              style={{
                background: `radial-gradient(circle at 30% 40%, ${warmColors[colorIndex % warmColors.length]}15 0%, transparent 70%)`
              }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 text-center max-w-lg mx-auto">
            {/* BIG PINK HEADING */}
            <h2 className="text-4xl lg:text-5xl font-bold text-[#ED276E] mb-6 leading-tight">
              Single Wall<br />Visualiser
            </h2>
            <p className="text-gray-700 mb-8 leading-relaxed text-lg">
              Quickly preview popular colour combinations on sample rooms. Simple and fast!
            </p>
            
            {/* Mini Room Visualizer */}
            <div className="mb-8">
              <MiniRoomVisualizer
                side="left"
                currentColorIndex={colorIndex % warmColors.length}
                colors={warmColors}
                roomImage="/lovable-uploads/bedroom6.jpg"
                wallSvgs={wallSvgs}
              />
            </div>
            
            {/* BIG PINK BUTTON with Hover Effects */}
            <Link 
              href="/colour-visualiser/basic" 
              className="group inline-flex items-center bg-[#ED276E] hover:bg-[#c91d5a] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              Try Single Wall Visualiser
              <svg className="ml-3 w-6 h-6 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Right Side - Advanced Visualiser */}
        <div 
          className="relative w-full lg:w-1/2 lg:h-full flex flex-col items-center justify-center p-8 lg:p-12 pt-20 lg:pt-20"
          style={{
            background: 'linear-gradient(135deg, #f1f5f9 0%, #e8f4f8 50%, #f8fafc 100%)'
          }}

        >
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-3">
            <div 
              className="absolute inset-0 transition-all duration-600 ease-out" 
              style={{
                background: `radial-gradient(circle at 70% 40%, ${coolColorSets[colorIndex % coolColorSets.length]?.left || '#4FC3F7'}15 0%, transparent 70%)`
              }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 text-center max-w-lg mx-auto">
            {/* BIG PINK HEADING */}
            <h2 className="text-4xl lg:text-5xl font-bold text-[#ED276E] mb-6 leading-tight">
              Advanced<br />Visualiser
            </h2>
            <p className="text-gray-700 mb-8 leading-relaxed text-lg">
              Choose different colours for each wall and roof across multiple room types.
            </p>
            
            {/* Mini Room Visualizer */}
            <div className="mb-8">
              <MiniRoomVisualizer
                side="right"
                currentColorIndex={colorIndex % coolColorSets.length}
                colors={coolColorSets}
                roomImage="/lovable-uploads/bedroom6.jpg"
                wallSvgs={wallSvgs}
              />
            </div>
            
            {/* BIG BLUE BUTTON with Hover Effects */}
            <Link 
              href="/colour-visualiser/advanced" 
              className="group inline-flex items-center bg-[#299dd7] hover:bg-[#2080b8] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              Try Advanced Visualiser
              <svg className="ml-3 w-6 h-6 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ColourVisualiserPage;