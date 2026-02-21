'use client';

import React, { useState, useEffect, useRef } from 'react';
import CTAButton from './CTAButton';
import CanvasRoomVisualiser from '../visualizer/CanvasRoomVisualiser';
import SvgRoomVisualiser from '../visualizer/SvgRoomVisualiser';
import { useIsMobileDevice } from '@/hooks/useIsMobileDevice';
import { embeddedWallMasks } from '../../data/embeddedWallMasks';
import { getMediaUrl } from '@/lib/mediaUrl';

// Slide 1: home office 11 + Sherwin Williams colors (walls + furniture, no roof)
const HOMEOFFICE11_IMAGE = '/assets/images/homeoffice/homeoffice11/homeoffice11.jpg';
const HOMEOFFICE11_WALL_KEYS = ['front', 'right', 'window', 'table', 'cupboard', 'chair'] as const;

const SHERWIN_WILLIAMS_COLORS = [
  '#e0e7da', // White Mint SW6441
  '#b7d7bf', // Reclining Green SW6744
  '#8ac1a1', // Lark Green SW6745
  '#348a5d', // Argyle SW6747
  '#2f5f3a', // Espalier SW6734
  '#245e36', // Derbyshire SW6741
];

const SLIDE_INTERVAL_MS = 5000;
const COLOR_CYCLE_MS = 1000;
const SLIDE_COUNT = 3;
const BULLET_PAUSE_MS = 10000;

const Hero: React.FC = () => {
  const isMobileDevice = useIsMobileDevice();
  const heroRef = useRef<HTMLDivElement>(null);
  const slide1Ref = useRef<HTMLDivElement>(null);
  const slideIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedColor, setSelectedColor] = useState(SHERWIN_WILLIAMS_COLORS[0]);
  const [colorIndex, setColorIndex] = useState(0);

  const startAutoAdvance = React.useCallback(() => {
    if (slideIntervalRef.current) clearInterval(slideIntervalRef.current);
    slideIntervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDE_COUNT);
    }, SLIDE_INTERVAL_MS);
  }, []);

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    startAutoAdvance();
    return () => {
      if (slideIntervalRef.current) clearInterval(slideIntervalRef.current);
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, [startAutoAdvance]);

  const handleBulletClick = React.useCallback((i: number) => {
    if (slideIntervalRef.current) {
      clearInterval(slideIntervalRef.current);
      slideIntervalRef.current = null;
    }
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
      pauseTimeoutRef.current = null;
    }
    setCurrentSlide(i);
    pauseTimeoutRef.current = setTimeout(() => {
      pauseTimeoutRef.current = null;
      startAutoAdvance();
    }, BULLET_PAUSE_MS);
  }, [startAutoAdvance]);

  // Auto-cycle colors every 1 second (only when on slide 0 - colour visualiser)
  useEffect(() => {
    if (currentSlide !== 0) return;
    const interval = setInterval(() => {
      const nextIndex = (colorIndex + 1) % SHERWIN_WILLIAMS_COLORS.length;
      setColorIndex(nextIndex);
      setSelectedColor(SHERWIN_WILLIAMS_COLORS[nextIndex]);
    }, COLOR_CYCLE_MS);
    return () => clearInterval(interval);
  }, [currentSlide, colorIndex]);

  // #region agent log
  useEffect(() => {
    const measure = () => {
      const hero = heroRef.current;
      const slide1 = slide1Ref.current;
      const wrapper = slide1?.querySelector('[data-hero-visualiser]');
      const canvas = slide1?.querySelector('canvas');
      const img = slide1?.querySelector('img');
      const vizEl = canvas ?? img ?? wrapper;
      if (!hero || !slide1) return;
      const heroRect = hero.getBoundingClientRect();
      const slide1Rect = slide1.getBoundingClientRect();
      const vizRect = vizEl?.getBoundingClientRect();
      fetch('http://127.0.0.1:7242/ingest/21adcf91-15ca-4563-a889-6dc1018faf8e',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'d2c525'},body:JSON.stringify({sessionId:'d2c525',location:'Hero.tsx:measure',message:'Hero banner dimensions',data:{isMobileDevice,vizType:canvas?'canvas':'svg',heroW:heroRect.width,heroH:heroRect.height,slide1W:slide1Rect.width,slide1H:slide1Rect.height,vizW:vizRect?.width,vizH:vizRect?.height,innerWidth:typeof window!=='undefined'?window.innerWidth:0},timestamp:Date.now(),hypothesisId:'B,C'})}).catch(()=>{});
    };
    const t = setTimeout(measure, 100);
    const ro = new ResizeObserver(measure);
    const el = heroRef.current;
    if (el) ro.observe(el);
    return () => { clearTimeout(t); ro.disconnect(); };
  }, [isMobileDevice]);
  // #endregion

  // Different color per wall layer (front, right, window) - offsets for variation
  const wallLayers = HOMEOFFICE11_WALL_KEYS.map((key) => {
    const path = embeddedWallMasks.homeoffice11?.[key];
    if (!path) return null;
    const layerIndex = HOMEOFFICE11_WALL_KEYS.indexOf(key);
    const color = SHERWIN_WILLIAMS_COLORS[(colorIndex + layerIndex * 2) % SHERWIN_WILLIAMS_COLORS.length];
    return { path, color };
  }).filter((l): l is { path: string; color: string } => l !== null);

  return (
    <div ref={heroRef} className="w-full relative h-[60vh] lg:h-[80vh] text-center mt-0 py-[120px] max-md:py-[80px] overflow-hidden">
      {/* Slide 1: Colour visualiser banner */}
      <div
        ref={slide1Ref}
        className={`absolute inset-0 transition-opacity duration-500 ${
          currentSlide === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 w-full h-full" data-hero-visualiser>
          {isMobileDevice ? (
            <SvgRoomVisualiser
              imageSrc={getMediaUrl(HOMEOFFICE11_IMAGE)}
              wallPath=""
              colorHex={selectedColor}
              roomLabel="homeoffice"
              wallLayers={wallLayers}
            />
          ) : (
            <CanvasRoomVisualiser
              imageSrc={getMediaUrl(HOMEOFFICE11_IMAGE)}
              wallPath=""
              colorHex={selectedColor}
              roomLabel="homeoffice"
              wallLayers={wallLayers}
            />
          )}
        </div>
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto px-4 mt-0 2xl:mt-10 h-full justify-center">
          <h2 className="text-white text-[30px] lg:text-[56px] font-semibold max-md:text-[30px] leading-[150%] drop-shadow-lg">
            Visualise Your Room
          </h2>
          <p className="text-white/95 text-lg lg:text-xl font-light mt-4 max-md:mt-3 max-w-2xl drop-shadow-md">
            See how different colours transform your space
          </p>
          <CTAButton
            to="/colour-visualiser"
            className="min-h-[60px] flex items-center gap-[15px] text-[20px] lg:text-2xl font-normal justify-center mt-6 md:mt-7 pl-[24px] pr-5 py-[5px] lg:py-[11px] rounded-[39px] max-md:mt-5 max-md:pl-5 min-w-[240px] sm:min-w-[280px] text-black transition-all duration-250 whitespace-nowrap"
            style={{
              backgroundColor: selectedColor,
              color: '#000000',
            }}
          >
            <span className="self-stretch my-auto">Explore All Colour</span>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/ebe74153cda349e3ba80a6039bb1465f/bbec7bbdc40c35a19214d20ad0710ac73ff6069d?placeholderIfAbsent=true"
              alt="Arrow Icon"
              className="aspect-[1] object-contain w-[34px] self-stretch shrink-0 my-auto"
            />
          </CTAButton>
        </div>
      </div>

      {/* Slide 2: Budget calculator banner */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          currentSlide === 1 ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
        }`}
      >
        <img
          alt="Budget Calculator"
          src={getMediaUrl('/uploads/budegt-calculator.png')}
          className="absolute h-full w-full inset-0 object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto px-4 mt-0 2xl:mt-10 h-full justify-center">
          <h2 className="text-white text-[30px] lg:text-[56px] font-semibold max-md:text-[30px] leading-[150%] drop-shadow-lg">
            Plan Your Painting Budget
          </h2>
          <p className="text-white/95 text-lg lg:text-xl font-light mt-4 max-md:mt-3 max-w-2xl drop-shadow-md">
            Get an instant estimate for your next painting project
          </p>
          <CTAButton
            to="/paint-budget-calculator"
            isHeroButton={true}
            className="min-h-[60px] flex items-center gap-[15px] text-[20px] lg:text-2xl font-normal justify-center mt-6 md:mt-7 pl-[24px] pr-5 py-[5px] lg:py-[11px] rounded-[39px] max-md:mt-5 max-md:pl-5 min-w-[240px] sm:min-w-[280px] bg-[#ED276E] hover:bg-[#299dd7] text-white transition-all duration-250 whitespace-nowrap"
          >
            <span className="self-stretch my-auto">Try Budget Calculator</span>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/ebe74153cda349e3ba80a6039bb1465f/f1c36d400c5cf4300348e5b5cfdcb4501952ad14?placeholderIfAbsent=true"
              alt="Arrow Icon"
              className="aspect-[1] object-contain w-[39px] self-stretch shrink-0 my-auto brightness-0 invert"
            />
          </CTAButton>
        </div>
      </div>

      {/* Slide 3: Original hero */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          currentSlide === 2 ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
        }`}
      >
        <img
          alt="Hero Background"
          src={getMediaUrl('/uploads/hero-banner.png')}
          className="absolute h-full w-full inset-0 object-cover sm:object-scale-down md:object-fill"
        />
        <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto px-4 mt-0 2xl:mt-10 h-full justify-center">
          <h1 className="text-white text-[30px] lg:text-[56px] font-semibold max-md:text-[30px] leading-[150%]">
            Expert Painting for Every Space
          </h1>
          <CTAButton
            to="/contact"
            isHeroButton={true}
            className="min-h-[60px] flex items-center gap-[15px] text-[20px] lg:text-2xl font-normal justify-center mt-0 md:mt-5 pl-[21px] pr-3 py-[5px] lg:py-[11px] rounded-[39px] max-md:mt-5 max-md:pl-5 bg-[#ED276E] hover:bg-[#299dd7] text-white transition-all duration-250"
          >
            <span className="self-stretch w-[152px] my-auto">Get in touch</span>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/ebe74153cda349e3ba80a6039bb1465f/f1c36d400c5cf4300348e5b5cfdcb4501952ad14?placeholderIfAbsent=true"
              alt="Arrow Icon"
              className="aspect-[1] object-contain w-[39px] self-stretch shrink-0 my-auto brightness-0 invert"
            />
          </CTAButton>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3 items-center">
        {[0, 1, 2].map((i) => (
          <button
            key={i}
            onClick={() => handleBulletClick(i)}
            className={`rounded-full transition-all border-2 ${
              currentSlide === i ? 'w-5 h-5 bg-gray-700 border-white shadow-md' : 'w-[15px] h-[15px] bg-gray-500 border-white hover:bg-gray-600'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
