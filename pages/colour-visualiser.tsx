import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../src/components/home/Header';
import Footer from '../src/components/home/Footer';
import DevToolsProtection from '../src/components/security/DevToolsProtection';

// Obfuscated room visualizer with NO visible SVG paths
const ProtectedMiniRoomVisualizer: React.FC<{ 
  side: 'left' | 'right'; 
  currentColorIndex: number; 
  colors: string[] | Array<{ left: string; right: string; front: string }>;
}> = React.memo(({ side, currentColorIndex, colors }) => {
  const [displayContent, setDisplayContent] = useState<string>('');

  useEffect(() => {
    // Simulate server-side protection by generating content without exposing SVG paths
    const currentColor = Array.isArray(colors) && colors.length > 0 
      ? typeof colors[currentColorIndex] === 'string' 
        ? colors[currentColorIndex]
        : colors[currentColorIndex]?.left || '#FF6B6B'
      : '#FF6B6B';

    // Create a protected visualization without exposing actual SVG paths
    // This simulates what would come from the server-side API
    const protectedVisualization = `
      <div style="
        position: relative;
        width: 100%;
        height: 16rem;
        background-image: url('/lovable-uploads/bedroom6.jpg');
        background-size: cover;
        background-position: center;
        border-radius: 0.5rem;
        overflow: hidden;
      ">
        <div style="
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, ${currentColor}40 0%, ${currentColor}60 50%, ${currentColor}40 100%);
          mix-blend-mode: multiply;
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        "></div>
        <div style="
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 30% 40%, ${currentColor}80 0%, transparent 60%);
          mix-blend-mode: overlay;
        "></div>
      </div>
    `;

    setDisplayContent(protectedVisualization);
  }, [currentColorIndex, colors, side]);

  return (
    <div 
      className="relative w-full h-64"
      dangerouslySetInnerHTML={{ __html: displayContent }}
    />
  );
});

const ColourVisualiserPage: React.FC = () => {
  const [colorIndex, setColorIndex] = useState(0);

  // Color arrays (these could also be moved server-side for extra protection)
  const warmColors = React.useMemo(() => [
    '#FF6B6B', '#FF8E53', '#FFB74D', '#FFD54F', '#FFAB91', '#F48FB1'
  ], []);

  const coolColorSets = React.useMemo(() => [
    { left: '#4FC3F7', right: '#42A5F5', front: '#1976D2' },
    { left: '#81C784', right: '#66BB6A', front: '#388E3C' },
    { left: '#BA68C8', right: '#AB47BC', front: '#7B1FA2' },
    { left: '#4DB6AC', right: '#26A69A', front: '#00695C' },
    { left: '#FFB74D', right: '#FFA726', front: '#F57C00' },
    { left: '#F06292', right: '#EC407A', front: '#C2185B' }
  ], []);

  // Synchronized color cycling
  useEffect(() => {
    const colorInterval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % Math.max(warmColors.length, coolColorSets.length));
    }, 1000);

    return () => clearInterval(colorInterval);
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
            
            {/* Protected Mini Room Visualizer - NO SVG PATHS */}
            <div className="mb-6">
              <ProtectedMiniRoomVisualizer
                side="left"
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
            
            {/* Protected Mini Room Visualizer - NO SVG PATHS */}
            <div className="mb-6">
              <ProtectedMiniRoomVisualizer
                side="right"
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