'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { X } from 'lucide-react';
import { getMediaUrl } from '@/lib/mediaUrl';
import { useIsMobileDevice } from '@/hooks/useIsMobileDevice';
import { embeddedWallMasks } from '@/data/embeddedWallMasks';
import CanvasRoomVisualiser from '@/components/visualizer/CanvasRoomVisualiser';
import SvgRoomVisualiser from '@/components/visualizer/SvgRoomVisualiser';

const STORAGE_KEY = 'homeglazer:colour-visualiser-popup-dismissed';
const POPUP_IMAGE_PATH = '/assets/images/outdoor/outdoor1/outdoor1.jpg';
const OUTDOOR1_WALL_KEYS = ['front', 'window', 'column', 'edge', 'roof'] as const;

const SHERWIN_WILLIAMS_COLORS = [
  '#e0e7da', // White Mint SW6441
  '#b7d7bf', // Reclining Green SW6744
  '#8ac1a1', // Lark Green SW6745
  '#348a5d', // Argyle SW6747
  '#2f5f3a', // Espalier SW6734
  '#245e36', // Derbyshire SW6741
];

const COLOR_CYCLE_MS = 1000;
const POPUP_DELAY_MS = 45000;

const ColorVisualiserPopup: React.FC = () => {
  const router = useRouter();
  const isMobileDevice = useIsMobileDevice();
  const [mounted, setMounted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;

    const dismissed = window.localStorage.getItem(STORAGE_KEY);
    if (dismissed) {
      setShowPopup(false);
      return;
    }

    setShowPopup(false);
    const timer = setTimeout(() => setShowPopup(true), POPUP_DELAY_MS);
    return () => clearTimeout(timer);
  }, [mounted, router.asPath]);

  // Auto-cycle colors every 1 second (like hero banner)
  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % SHERWIN_WILLIAMS_COLORS.length);
    }, COLOR_CYCLE_MS);
    return () => clearInterval(interval);
  }, []);

  const wallLayers = OUTDOOR1_WALL_KEYS.map((key) => {
    const path = embeddedWallMasks.outdoor1?.[key];
    if (!path) return null;
    const layerIndex = OUTDOOR1_WALL_KEYS.indexOf(key);
    const color = SHERWIN_WILLIAMS_COLORS[(colorIndex + layerIndex * 2) % SHERWIN_WILLIAMS_COLORS.length];
    return { path, color };
  }).filter((l): l is { path: string; color: string } => l !== null);

  const selectedColor = SHERWIN_WILLIAMS_COLORS[colorIndex];

  const dismissPermanently = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, 'true');
    }
    setShowPopup(false);
  };

  const dismissTemporarily = () => {
    setShowPopup(false);
  };

  if (!mounted || !showPopup || typeof document === 'undefined') {
    return null;
  }

  const popupContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Colour visualiser promotion"
    >
      {/* Backdrop - click to close temporarily, popup shows again on next page until X is clicked */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={dismissTemporarily}
        aria-hidden="true"
      />

      {/* Content - card with square image, heading, para, CTA - larger on tablet/desktop */}
      <div
        className="relative z-10 w-[320px] sm:w-[400px] md:w-[480px] lg:w-[560px] max-w-[90vw] bg-white rounded-xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={dismissPermanently}
          className="absolute top-2 right-2 z-10 p-2 md:p-2.5 rounded-full bg-white/90 hover:bg-gray-100 transition-colors shadow-sm"
          aria-label="Close"
        >
          <X className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
        </button>

        <Link
          href="/colour-visualiser/advanced"
          className="block relative aspect-square w-full overflow-hidden bg-gray-100"
        >
          <div className="absolute inset-0 w-full h-full">
            {isMobileDevice ? (
              <SvgRoomVisualiser
                imageSrc={getMediaUrl(POPUP_IMAGE_PATH)}
                wallPath=""
                colorHex={selectedColor}
                roomLabel="outdoor"
                wallLayers={wallLayers}
              />
            ) : (
              <CanvasRoomVisualiser
                imageSrc={getMediaUrl(POPUP_IMAGE_PATH)}
                wallPath=""
                colorHex={selectedColor}
                roomLabel="outdoor"
                wallLayers={wallLayers}
                transitionMs={100}
              />
            )}
          </div>
        </Link>

        <div className="p-5 md:p-6 lg:p-8 space-y-3 md:space-y-4">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900">
            Colour Visualiser
          </h3>
          <p className="text-sm md:text-base lg:text-lg text-gray-600">
            Try different paint colours on real room images. See how your space will look before you buy.
          </p>
          <Link
            href="/colour-visualiser/advanced"
            className="block w-full py-3 px-4 md:py-4 md:px-5 text-center text-sm md:text-base font-semibold text-white bg-[#ED276E] rounded-lg hover:bg-[#c81f5a] transition-colors"
          >
            Try it now
          </Link>
        </div>
      </div>
    </div>
  );

  return createPortal(popupContent, document.body);
};

export default ColorVisualiserPopup;
