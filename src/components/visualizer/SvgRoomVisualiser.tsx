'use client';

import React from 'react';

/**
 * SVG-based room visualiser. Uses img + SVG overlay with CSS blend modes
 * instead of canvas. Avoids mobile GPU issues (Path2D + multiply banding)
 * that affect CanvasRoomVisualiser on real devices.
 */
interface WallLayer {
  path: string;
  color: string;
}

interface SvgRoomVisualiserProps {
  imageSrc: string;
  wallPath: string;
  colorHex: string;
  roomLabel: string;
  /** Optional: different color per wall layer. When provided, overrides wallPath + colorHex. */
  wallLayers?: WallLayer[];
}

export default function SvgRoomVisualiser({
  imageSrc,
  wallPath,
  colorHex,
  roomLabel,
  wallLayers,
}: SvgRoomVisualiserProps) {
  const layers = wallLayers?.length
    ? wallLayers
    : wallPath
      ? [{ path: wallPath, color: colorHex }]
      : [];

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
      {layers.length > 0 && (
        <svg
          viewBox="0 0 1280 720"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ mixBlendMode: 'multiply' }}
          aria-hidden
        >
          {layers.map((layer, i) => (
            <path
              key={i}
              d={layer.path}
              fill={layer.color}
              style={{
                opacity: 0.7,
                transition: 'fill 0.1s ease-out',
              }}
            />
          ))}
        </svg>
      )}
    </div>
  );
}
