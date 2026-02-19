import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { getMediaUrl, getAbsoluteMediaUrl } from '@/lib/mediaUrl';
import Header from '../src/components/home/Header';
import Footer from '../src/components/home/Footer';
import DevToolsProtection from '../src/components/security/DevToolsProtection';
import CanvasRoomVisualiser from '../src/components/visualizer/CanvasRoomVisualiser';
import CanvasAdvancedRoomVisualiser from '../src/components/visualizer/CanvasAdvancedRoomVisualiser';
import SvgRoomVisualiser from '../src/components/visualizer/SvgRoomVisualiser';
import SvgAdvancedRoomVisualiser from '../src/components/visualizer/SvgAdvancedRoomVisualiser';
import { useIsMobileDevice } from '@/hooks/useIsMobileDevice';
import { embeddedWallMasks } from '../src/data/embeddedWallMasks';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://homeglazer.com';

const ColourVisualiserPage: React.FC = () => {
  const isMobileDevice = useIsMobileDevice();
  const [colorIndex, setColorIndex] = useState(0);
  const wallMasks = embeddedWallMasks.bedroom6 ?? {};

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

  // Room assets - bedroom6 (masks embedded at build time)
  const roomImage = getMediaUrl('/assets/images/bedroom/bedroom6/bedroom6.jpg');
  const wallKeys = ['left', 'right', 'window'];

  // Synchronized color cycling every second non-stop
  useEffect(() => {
    let colorInterval: NodeJS.Timeout;
    const startInterval = () => {
      colorInterval = setInterval(() => {
        setColorIndex((prev) => (prev + 1) % Math.max(warmColors.length, coolColorSets.length));
      }, 1000);
    };

    const timeoutId = setTimeout(startInterval, 300);

    return () => {
      clearTimeout(timeoutId);
      if (colorInterval) clearInterval(colorInterval);
    };
  }, [warmColors.length, coolColorSets.length]);

  const combinedWallPath = wallKeys
    .map((k) => wallMasks[k])
    .filter(Boolean)
    .join(' ');

  return (
    <>
      <Head>
        <title>Colour Visualiser | HomeGlazer - See Colours on Your Walls</title>
        <meta name="description" content="Visualize paint colours on your walls before painting. Try HomeGlazer's free colour visualiser tool to find the perfect shade for your home." />
        <meta property="og:title" content="Colour Visualiser | HomeGlazer - See Colours on Your Walls" />
        <meta property="og:description" content="Visualize paint colours on your walls before painting. Find the perfect shade for your home." />
        <meta property="og:image" content={getAbsoluteMediaUrl("/uploads/living-room.jpg", SITE_URL)} />
        <meta name="twitter:title" content="Colour Visualiser | HomeGlazer" />
        <meta name="twitter:description" content="Visualize paint colours on your walls before painting." />
        <meta name="twitter:image" content={getAbsoluteMediaUrl("/uploads/living-room.jpg", SITE_URL)} />
      </Head>
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
          className="relative w-full lg:w-1/2 lg:h-full flex flex-col items-center justify-center p-8 lg:p-12 pt-28 lg:pt-28"
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
            {/* BIG PINK HEADING - smaller on 1366px and below */}
            <h2 className="max-[1366px]:text-3xl max-[1366px]:whitespace-nowrap min-[1367px]:text-4xl min-[1367px]:lg:text-5xl font-bold mb-6 leading-tight text-[var(--brand-pink)]">
              Single Wall Visualiser
            </h2>
            <p className="text-gray-700 mb-8 leading-relaxed text-lg">
              Quickly preview popular colour combinations on sample rooms. Simple and fast!
            </p>
            
            {/* Canvas/SVG Room Visualizer */}
            <div className="mb-8 relative w-full bg-gray-100 rounded-lg overflow-hidden" style={{ aspectRatio: '16/9' }}>
              {isMobileDevice ? (
                <SvgRoomVisualiser
                  imageSrc={roomImage}
                  wallPath={combinedWallPath}
                  colorHex={warmColors[colorIndex % warmColors.length]}
                  roomLabel="single wall"
                />
              ) : (
                <CanvasRoomVisualiser
                  imageSrc={roomImage}
                  wallPath={combinedWallPath}
                  colorHex={warmColors[colorIndex % warmColors.length]}
                  roomLabel="single wall"
                />
              )}
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
          className="relative w-full lg:w-1/2 lg:h-full flex flex-col items-center justify-center p-8 lg:p-12 pt-28 lg:pt-28"
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
            {/* BIG BLUE HEADING - smaller on 1366px and below */}
            <h2 className="max-[1366px]:text-3xl max-[1366px]:whitespace-nowrap min-[1367px]:text-4xl min-[1367px]:lg:text-5xl font-bold mb-6 leading-tight text-[#299dd7]">
              Advanced Visualiser
            </h2>
            <p className="text-gray-700 mb-8 leading-relaxed text-lg">
              Choose different colours for each wall and roof across multiple room types.
            </p>
            
            {/* Canvas/SVG Advanced Room Visualizer */}
            <div className="mb-8 relative w-full bg-gray-100 rounded-lg overflow-hidden" style={{ aspectRatio: '16/9' }}>
              {isMobileDevice ? (
                <SvgAdvancedRoomVisualiser
                  imageSrc={roomImage}
                  wallMasks={wallMasks}
                  assignments={coolColorSets[colorIndex % coolColorSets.length] ?? {}}
                  loadingMasks={false}
                />
              ) : (
                <CanvasAdvancedRoomVisualiser
                  imageSrc={roomImage}
                  wallMasks={wallMasks}
                  assignments={coolColorSets[colorIndex % coolColorSets.length] ?? {}}
                  loadingMasks={false}
                />
              )}
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
