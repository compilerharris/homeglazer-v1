'use client';

import React from 'react';

/**
 * SVG-based room visualiser. Uses img + SVG overlay with CSS blend modes
 * instead of canvas. Avoids mobile GPU issues (Path2D + multiply banding)
 * that affect CanvasRoomVisualiser on real devices.
 */
interface SvgRoomVisualiserProps {
  imageSrc: string;
  wallPath: string;
  colorHex: string;
  roomLabel: string;
}

export default function SvgRoomVisualiser({
  imageSrc,
  wallPath,
  colorHex,
  roomLabel,
}: SvgRoomVisualiserProps) {
  return (
    <div
      className="relative w-full h-full select-none"
      onContextMenu={(e) => e.preventDefault()}
    >
      <img
        src={imageSrc}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />
      {wallPath && (
        <svg
          viewBox="0 0 1280 720"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ mixBlendMode: 'multiply' }}
          aria-hidden
        >
          <path
            d={wallPath}
            fill={colorHex}
            style={{
              opacity: 0.7,
              transition: 'fill 0.2s ease-out',
            }}
          />
        </svg>
      )}
    </div>
  );
}
