import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Header from '../components/home/Header';
import Footer from '../components/home/Footer';
import DevToolsProtection from '../components/security/DevToolsProtection';

// Mini Room Visualizer Component for Split Screen
const MiniRoomVisualizer: React.FC<{ 
  side: 'left' | 'right'; 
  isHovered: boolean; 
  currentColorIndex: number; 
  colors: string[] | Array<{ left: string; right: string; front: string }>;
  roomImage: string;
  wallSvgs: Record<string, string>;
}> = React.memo(({ side, isHovered, currentColorIndex, colors, roomImage, wallSvgs }) => {
  const [wallMasks, setWallMasks] = useState<Record<string, string>>({});
  const [loadingMasks, setLoadingMasks] = useState(true);
  const svgRef = useRef<SVGSVGElement>(null);

  const wallKeys = side === 'left' ? ['left', 'right', 'window'] : ['left', 'right', 'front'];
  const currentColor = Array.isArray(colors[0]) || typeof colors[0] === 'string' 
    ? (colors as string[])[currentColorIndex] 
    : (colors as Array<{ left: string; right: string; front: string }>)[currentColorIndex];

  // Load wall masks - Only load once
  useEffect(() => {
    const loadMasks = async () => {
      if (Object.keys(wallMasks).length > 0) return; // Already loaded
      
      setLoadingMasks(true);
      
      const promises = Object.entries(wallSvgs).map(async ([key, url]) => {
        try {
          const res = await fetch(url);
          const svgText = await res.text();
          
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
          
          const pathMatch = svgText.match(/<path[^>]*d=["']([^"']+)["'][^>]*>/i);
          if (pathMatch && pathMatch[1]) {
            return { key, d: pathMatch[1] };
          }
          
          return null;
        } catch (error) {
          console.error(`Error loading mask for ${key}:`, error);
          return null;
        }
      });

      const results = await Promise.all(promises);
      const newMasks: Record<string, string> = {};
      
      results.forEach(result => {
        if (result) {
          newMasks[result.key] = result.d;
        }
      });
      
      setWallMasks(newMasks);
      setLoadingMasks(false);
    };

    loadMasks();
  }, [wallSvgs, wallMasks]);

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
      <img
        src={roomImage}
        alt="Room Preview"
        className="w-full h-full object-cover"
      />
      
             {/* Color overlay for smooth transitions */}
       <div 
         className="absolute inset-0 transition-all duration-600 ease-out"
         style={{
           background: side === 'left' 
             ? `linear-gradient(45deg, ${currentColor as string}20, transparent)`
             : `linear-gradient(45deg, ${(currentColor as { left: string; right: string; front: string }).left}20, transparent)`
         }}
       />
      
      {/* SVG Overlay for wall masking */}
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
                <mask id={`wall-mask-${side}-${wallKey}`}>
                  <rect width="100%" height="100%" fill="black"/>
                  <path d={wallMasks[wallKey]} fill="white"/>
                </mask>
              </defs>
              <rect 
                width="100%" 
                height="100%" 
                fill={side === 'left' 
                  ? (currentColor as string)
                  : (currentColor as { left: string; right: string; front: string })[wallKey as keyof typeof currentColor]
                } 
                opacity="0.7"
                mask={`url(#wall-mask-${side}-${wallKey})`}
                className="wall-path"
                style={{
                  transition: 'fill 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                  filter: 'blur(0.3px)'
                }}
                data-wall={wallKey}
              />
            </g>
          );
        })}
      </svg>
      
      {loadingMasks && (
        <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center">
          <div className="text-gray-500">Loading...</div>
        </div>
      )}
      
      {/* Color indicator dots removed as requested */}
    </div>
  );
});

const ColourVisualiserPage: React.FC = () => {
  const [colorIndex, setColorIndex] = useState(0);
  const [leftHovered, setLeftHovered] = useState(false);
  const [rightHovered, setRightHovered] = useState(false);

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
    { left: '#4ECDC4', right: '#45B7D1', front: '#42A5F5' }, // Teal, Blue, Light Blue
    { left: '#7C4DFF', right: '#66BB6A', front: '#26A69A' }, // Purple, Green, Dark Teal
    { left: '#FF6B9D', right: '#4ECDC4', front: '#FFD93D' }, // Pink, Teal, Yellow
    { left: '#6C5CE7', right: '#A29BFE', front: '#FD79A8' }, // Purple, Light Purple, Pink
    { left: '#00B894', right: '#00CEC9', front: '#74B9FF' }, // Green, Cyan, Blue
    { left: '#FDCB6E', right: '#E17055', front: '#6C5CE7' }  // Yellow, Orange, Purple
  ], []);

  // Memoize room assets - Use same room for both visualizers
  const roomImage = React.useMemo(() => '/assets/images/bedroom/bedroom6/bedroom6.jpg', []);
  
  const wallSvgs = React.useMemo(() => ({
    left: '/assets/images/bedroom/bedroom6/left-wall.svg',
    right: '/assets/images/bedroom/bedroom6/right-wall.svg',
    window: '/assets/images/bedroom/bedroom6/window.svg'
  }), []);



  // Auto-advance colors every second non-stop - synchronized
  useEffect(() => {
    let colorInterval: NodeJS.Timeout;

    // Start interval with a slight delay to prevent immediate flickering
    const startInterval = () => {
      colorInterval = setInterval(() => {
        setColorIndex((prev) => (prev + 1) % Math.max(warmColors.length, coolColorSets.length));
      }, 1000);
    };

    // Delay start to prevent initial flickering
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
      
      {/* Main Split Screen Layout */}
      <main className="relative w-full flex flex-col lg:flex-row lg:h-screen">
        
        {/* Left Side - Single Wall Visualiser */}
        <div 
          className="relative w-full lg:w-1/2 lg:h-full flex flex-col items-center justify-center p-8 lg:p-12 pt-20 lg:pt-20"
          style={{
            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
          }}
          onMouseEnter={() => setLeftHovered(true)}
          onMouseLeave={() => setLeftHovered(false)}
        >
                     {/* Background Pattern */}
           <div className="absolute inset-0 opacity-5">
             <div 
               className="absolute inset-0 transition-all duration-600 ease-out" 
               style={{
                 backgroundImage: `radial-gradient(circle at 25% 25%, ${warmColors[colorIndex % warmColors.length]} 0%, transparent 50%)`
               }} 
             />
           </div>
          
          {/* Content */}
          <div className="relative z-10 text-center max-w-md mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#299dd7] mb-6 leading-tight">
              Single Wall Visualiser
            </h2>
            <p className="text-lg lg:text-xl text-gray-700 mb-8 leading-relaxed">
              Quickly preview popular colour combinations on sample rooms. Simple and fast!
            </p>
            
                         {/* Mini Room Visualizer */}
             <div className="w-full h-48 lg:h-64 mb-8">
               <MiniRoomVisualizer
                 key="left-visualizer"
                 side="left"
                 isHovered={leftHovered}
                 currentColorIndex={colorIndex % warmColors.length}
                 colors={warmColors}
                 roomImage={roomImage}
                 wallSvgs={wallSvgs}
               />
             </div>
            
            {/* CTA Button */}
            <Link 
              href="/colour-visualiser/basic" 
              className="inline-flex items-center justify-center px-8 py-4 bg-[#299dd7] text-white font-semibold rounded-full text-lg hover:bg-[#237bb0] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Try Single Wall Visualiser
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
          
                               {/* Decorative Elements */}
          <div className="absolute top-8 right-8 opacity-20">
            <div 
              className="w-16 h-16 rounded-full transition-all duration-600 ease-out" 
              style={{ backgroundColor: warmColors[colorIndex % warmColors.length] }} 
            />
          </div>
        </div>

        {/* Right Side - Advanced Visualiser */}
        <div 
          className="relative w-full lg:w-1/2 lg:h-full flex flex-col items-center justify-center p-8 lg:p-12 pt-20 lg:pt-20"
          style={{
            background: 'linear-gradient(135deg, #f1f5f9 0%, #cbd5e1 100%)'
          }}
          onMouseEnter={() => setRightHovered(true)}
          onMouseLeave={() => setRightHovered(false)}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div 
              className="absolute inset-0 transition-all duration-600 ease-out" 
              style={{
                backgroundImage: `radial-gradient(circle at 75% 75%, ${coolColorSets[colorIndex % coolColorSets.length].left} 0%, transparent 50%)`
              }} 
            />
          </div>
          
          {/* Content */}
          <div className="relative z-10 text-center max-w-md mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#ED276E] mb-6 leading-tight">
              Advanced Visualiser
            </h2>
            <p className="text-lg lg:text-xl text-gray-700 mb-8 leading-relaxed">
              Choose different colours for each wall and roof across multiple room types.
            </p>
            
            {/* Mini Room Visualizer */}
            <div className="w-full h-48 lg:h-64 mb-8">
                                                           <MiniRoomVisualizer
                 key="right-visualizer"
                 side="right"
                 isHovered={rightHovered}
                 currentColorIndex={colorIndex % coolColorSets.length}
                 colors={coolColorSets}
                 roomImage={roomImage}
                 wallSvgs={wallSvgs}
               />
            </div>
            
            {/* CTA Button */}
            <Link 
              href="/colour-visualiser/advanced" 
              className="inline-flex items-center justify-center px-8 py-4 bg-[#ED276E] text-white font-semibold rounded-full text-lg hover:bg-[#b81d5a] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Try Advanced Visualiser
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-8 left-8 opacity-20">
            <div 
              className="w-16 h-16 rounded-full transition-all duration-600 ease-out" 
              style={{ backgroundColor: coolColorSets[colorIndex % coolColorSets.length].left }} 
            />
          </div>
        </div>

        {/* Center Divider (Desktop Only) */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent" />
      </main>
      
      {/* Mobile Action Buttons - Fixed at Bottom */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-50">
        <div className="flex gap-3">
          <Link href="/enquiry" className="flex-1 bg-[#ED276E] text-white py-3 px-3 rounded-lg font-medium text-center hover:bg-[#b81d5a] transition flex items-center justify-center text-[15px] whitespace-nowrap">
            Enquire Now
          </Link>
          <Link href="/calculator" className="flex-1 bg-[#299dd7] text-white py-3 px-3 rounded-lg font-medium text-center hover:bg-[#237bb0] transition flex items-center justify-center text-[15px] whitespace-nowrap">
            Budget Calculator
          </Link>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default ColourVisualiserPage; 