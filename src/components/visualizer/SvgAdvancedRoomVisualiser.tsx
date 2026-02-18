'use client';

import React from 'react';

/**
 * SVG-based advanced room visualiser. Uses img + SVG overlay with multiple
 * paths (one per wall) and CSS blend modes. Avoids mobile GPU issues that
 * affect CanvasAdvancedRoomVisualiser on real devices.
 */
interface SvgAdvancedRoomVisualiserProps {
  imageSrc: string;
  wallMasks: Record<string, string>;
  assignments: Record<string, string>;
  loadingMasks?: boolean;
}

export default function SvgAdvancedRoomVisualiser({
  imageSrc,
  wallMasks,
  assignments,
  loadingMasks = false,
}: SvgAdvancedRoomVisualiserProps) {
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
      {!loadingMasks && Object.keys(wallMasks).length > 0 && (
        <svg
          viewBox="0 0 1280 720"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ mixBlendMode: 'multiply' }}
          aria-hidden
        >
          {Object.entries(wallMasks).map(([wallKey, pathData]) => {
            const color = assignments[wallKey];
            if (!pathData || !color) return null;
            return (
              <path
                key={wallKey}
                d={pathData}
                fill={color}
                style={{
                  opacity: 0.7,
                  transition: 'fill 0.2s ease-out',
                }}
              />
            );
          })}
        </svg>
      )}
    </div>
  );
}
