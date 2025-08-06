import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Header from '../src/components/home/Header';
import Footer from '../src/components/home/Footer';
import DevToolsProtection from '../src/components/security/DevToolsProtection';

// Server-Side Protected Mini Room Visualizer Component
const ProtectedMiniRoomVisualizer: React.FC<{ 
  side: 'left' | 'right'; 
  isHovered: boolean; 
  currentColorIndex: number; 
  colors: string[] | Array<{ left: string; right: string; front: string }>;
}> = React.memo(({ side, isHovered, currentColorIndex, colors }) => {
  const [roomData, setRoomData] = useState<any>(null);
  const [processedHtml, setProcessedHtml] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch protected room data from server
  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await fetch('/api/visualizer/room-data?room=bedroom&walls=left,right,window');
        if (response.ok) {
          const data = await response.json();
          setRoomData(data);
        } else {
          console.error('Failed to load room data');
        }
      } catch (error) {
        console.error('Error loading room data:', error);
      }
    };

    fetchRoomData();
  }, []);

  // Fetch server-rendered HTML component
  useEffect(() => {
    if (!roomData) return;

    const fetchRenderedComponent = async () => {
      try {
        const currentColor = Array.isArray(colors) && colors.length > 0 
          ? typeof colors[currentColorIndex] === 'string' 
            ? colors[currentColorIndex]
            : colors[currentColorIndex]?.left || '#FF6B6B'
          : '#FF6B6B';

        const response = await fetch('/api/visualizer/render-component', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            componentType: 'mini-room-visualizer',
            props: {
              roomImage: roomData.image,
              svgPath: roomData.svgPath,
              currentColor,
              side,
              viewBox: "0 0 1280 720"
            },
            timestamp: Date.now()
          })
        });

        if (response.ok) {
          const data = await response.json();
          setProcessedHtml(data.html);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching rendered component:', error);
        setLoading(false);
      }
    };

    fetchRenderedComponent();
  }, [roomData, currentColorIndex, colors, side]);

  if (loading) {
    return (
      <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-gray-500">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden transition-all duration-600 ease-out"
      dangerouslySetInnerHTML={{ __html: processedHtml }}
    />
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
    { left: '#4FC3F7', right: '#42A5F5', front: '#1976D2' }, // Blues
    { left: '#81C784', right: '#66BB6A', front: '#388E3C' }, // Greens
    { left: '#BA68C8', right: '#AB47BC', front: '#7B1FA2' }, // Purples
    { left: '#4DB6AC', right: '#26A69A', front: '#00695C' }, // Teals
    { left: '#FFB74D', right: '#FFA726', front: '#F57C00' }, // Orange variation
    { left: '#F06292', right: '#EC407A', front: '#C2185B' }  // Pink variation
  ], []);

  // Synchronized color cycling
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
                background: `radial-gradient(circle at 50% 50%, ${warmColors[colorIndex % warmColors.length]}22 0%, transparent 50%)`
              }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 text-center max-w-md mx-auto">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
              Single Wall Visualiser
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Quickly preview popular colour combinations on sample rooms. Simple and fast!
            </p>
            
            {/* Protected Mini Room Visualizer */}
            <div className="mb-6">
              <ProtectedMiniRoomVisualizer
                side="left"
                isHovered={leftHovered}
                currentColorIndex={colorIndex % warmColors.length}
                colors={warmColors}
              />
            </div>
            
            <Link href="/colour-visualiser/basic" className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200">
              Try Single Wall Visualiser
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Right Side - Advanced Visualiser */}
        <div 
          className="relative w-full lg:w-1/2 lg:h-full flex flex-col items-center justify-center p-8 lg:p-12 pt-20 lg:pt-20"
          style={{
            background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)'
          }}
          onMouseEnter={() => setRightHovered(true)}
          onMouseLeave={() => setRightHovered(false)}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div 
              className="absolute inset-0 transition-all duration-600 ease-out" 
              style={{
                background: `radial-gradient(circle at 50% 50%, ${coolColorSets[colorIndex % coolColorSets.length]?.left || '#4FC3F7'}22 0%, transparent 50%)`
              }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 text-center max-w-md mx-auto">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
              Advanced Visualiser
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Choose different colours for each wall and roof across multiple room types.
            </p>
            
            {/* Protected Mini Room Visualizer */}
            <div className="mb-6">
              <ProtectedMiniRoomVisualizer
                side="right"
                isHovered={rightHovered}
                currentColorIndex={colorIndex % coolColorSets.length}
                colors={coolColorSets}
              />
            </div>
            
            <Link href="/colour-visualiser/advanced" className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200">
              Try Advanced Visualiser
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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