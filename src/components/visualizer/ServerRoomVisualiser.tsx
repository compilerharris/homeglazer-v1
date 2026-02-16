'use client';

import React, { useState, useEffect, useRef } from 'react';

const TRANSITION_MS = 200;

interface ServerRoomVisualiserProps {
  variant: string;
  colorHex: string;
  roomLabel: string;
  /** Optional: only use these walls for single-color mode (e.g. exclude roof) */
  wallKeys?: string[];
}

export default function ServerRoomVisualiser({
  variant,
  colorHex,
  roomLabel,
  wallKeys,
}: ServerRoomVisualiserProps) {
  const [displaySrc, setDisplaySrc] = useState<string | null>(null);
  const [overlaySrc, setOverlaySrc] = useState<string | null>(null);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    setError(false);

    if (abortRef.current) {
      abortRef.current.abort();
    }
    abortRef.current = new AbortController();

    fetch('/api/visualizer/render-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        variant,
        mode: 'single',
        color: colorHex,
        ...(wallKeys && wallKeys.length > 0 && { wallKeys }),
      }),
      signal: abortRef.current.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error('Render failed');
        return res.blob();
      })
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        if (displaySrc) {
          setOverlaySrc(url);
          setOverlayVisible(false);
        } else {
          setDisplaySrc(url);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setError(true);
        setLoading(false);
      });

    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
  }, [variant, colorHex, wallKeys]);

  useEffect(() => {
    if (!overlaySrc) return;
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setOverlayVisible(true));
    });
    return () => cancelAnimationFrame(id);
  }, [overlaySrc]);

  useEffect(() => {
    if (!overlayVisible || !overlaySrc) return;
    const t = setTimeout(() => {
      if (displaySrc) URL.revokeObjectURL(displaySrc);
      setDisplaySrc(overlaySrc);
      setOverlaySrc(null);
      setOverlayVisible(false);
    }, TRANSITION_MS);
    return () => clearTimeout(t);
  }, [overlayVisible, overlaySrc]);

  if (loading && !displaySrc) {
    return (
      <div
        className="w-full h-full flex items-center justify-center bg-gray-100"
        style={{ aspectRatio: '16/9' }}
      >
        <div className="text-gray-500 text-sm">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="w-full h-full flex items-center justify-center bg-gray-100"
        style={{ aspectRatio: '16/9' }}
      >
        <div className="text-gray-500 text-sm">Preview unavailable</div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden" style={{ aspectRatio: '16/9' }}>
      {displaySrc && (
        <img
          src={displaySrc}
          alt={`${roomLabel} room with wall color preview`}
          className="absolute inset-0 w-full h-full object-cover select-none"
          onContextMenu={(e) => e.preventDefault()}
          draggable={false}
        />
      )}
      {overlaySrc && (
        <img
          src={overlaySrc}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover ease-out select-none"
          style={{
            opacity: overlayVisible ? 1 : 0,
            transition: `opacity ${TRANSITION_MS}ms ease-out`,
          }}
          onContextMenu={(e) => e.preventDefault()}
          draggable={false}
        />
      )}
    </div>
  );
}
