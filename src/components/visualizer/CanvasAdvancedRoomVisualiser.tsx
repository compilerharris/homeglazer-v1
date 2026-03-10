'use client';

import React, { useRef, useEffect, useCallback, useState, forwardRef, useImperativeHandle } from 'react';

const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 720;
const COLOR_TRANSITION_MS = 200;

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
    : { r: 255, g: 255, b: 255 };
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map((x) => Math.round(x).toString(16).padStart(2, '0')).join('');
}

export interface CanvasAdvancedRoomVisualiserProps {
  imageSrc: string;
  wallMasks: Record<string, string>;
  assignments: Record<string, string>;
  loadingMasks?: boolean;
  onHardFailure?: () => void;
}

export interface CanvasAdvancedRoomVisualiserRef {
  toDataURL: (type?: string) => string | null;
  isReady: () => boolean;
}

const CanvasAdvancedRoomVisualiser = forwardRef<CanvasAdvancedRoomVisualiserRef, CanvasAdvancedRoomVisualiserProps>(
  function CanvasAdvancedRoomVisualiser({ imageSrc, wallMasks, assignments, loadingMasks = false, onHardFailure }, ref) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imageRef = useRef<HTMLImageElement | null>(null);
    const prevAssignmentsRef = useRef<Record<string, string> | null>(null);
    const animationRef = useRef<number | null>(null);
    const [loadState, setLoadState] = useState<'loading' | 'loaded' | 'error'>('loading');
    const loadAttemptsRef = useRef<Record<string, number>>({});
    const loadTimeoutRef = useRef<number | null>(null);

    useImperativeHandle(ref, () => ({
      toDataURL: (type = 'image/png') => {
        const canvas = canvasRef.current;
        if (!canvas) {
          return null;
        }
        
        // Ensure image is loaded before capturing (critical for production S3 images)
        if (loadState !== 'loaded' || !imageRef.current || !imageRef.current.complete) {
          console.warn('[CanvasAdvancedRoomVisualiser] Canvas not ready for capture:', { loadState, hasImage: !!imageRef.current, imageComplete: imageRef.current?.complete });
          return null;
        }
        
        try {
          const dataUrl = canvas.toDataURL(type);
          return dataUrl;
        } catch (err) {
          console.error('[CanvasAdvancedRoomVisualiser] toDataURL error:', err);
          return null;
        }
      },
      isReady: () => {
        return loadState === 'loaded' && !!imageRef.current && imageRef.current.complete;
      },
    }), [loadState, imageSrc]);

    const draw = useCallback((assignmentsOverride?: Record<string, string>) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (!canvas || !ctx) return;

      const img = imageRef.current;
      if (!img || !img.complete || img.naturalWidth === 0) {
        ctx.fillStyle = '#e5e7eb';
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.fillStyle = '#6b7280';
        ctx.font = '16px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(loadState === 'error' ? 'Image unavailable' : 'Loading...', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
        return;
      }

      const imgWidth = img.naturalWidth;
      const imgHeight = img.naturalHeight;

      const scale = Math.max(CANVAS_WIDTH / imgWidth, CANVAS_HEIGHT / imgHeight);
      const drawWidth = imgWidth * scale;
      const drawHeight = imgHeight * scale;
      const x = (CANVAS_WIDTH - drawWidth) / 2;
      const y = (CANVAS_HEIGHT - drawHeight) / 2;

      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.drawImage(img, x, y, drawWidth, drawHeight);

      const currentAssignments = assignmentsOverride ?? assignments;
      const wallKeys = Object.keys(wallMasks);

      for (const wallKey of wallKeys) {
        const pathData = wallMasks[wallKey];
        const color = currentAssignments[wallKey];
        if (!pathData || !color) continue;

        ctx.save();
        try {
          const path = new Path2D(pathData);
          ctx.clip(path);
          ctx.globalCompositeOperation = 'multiply';
          ctx.globalAlpha = 0.7;
          ctx.fillStyle = color;
          ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        } finally {
          ctx.restore();
        }
      }
    }, [imageSrc, wallMasks, assignments, loadState]);

    const drawRef = useRef(draw);
    useEffect(() => {
      drawRef.current = draw;
    }, [draw]);

    useEffect(() => {
      setLoadState('loading');
      if (process.env.NODE_ENV !== 'production') {
        console.log('[CanvasAdvancedRoomVisualiser] Loading image:', imageSrc);
      }

      const isCrossOrigin = imageSrc.startsWith('http://') || imageSrc.startsWith('https://');
      const isS3Url = imageSrc.includes('s3');
      const maxAttempts = 2;

      if (!loadAttemptsRef.current[imageSrc]) {
        loadAttemptsRef.current[imageSrc] = 0;
      }

      const clearExistingTimeout = () => {
        if (loadTimeoutRef.current != null) {
          window.clearTimeout(loadTimeoutRef.current);
          loadTimeoutRef.current = null;
        }
      };

      const handleHardError = (context: unknown) => {
        clearExistingTimeout();
        imageRef.current = null;
        setLoadState('error');
        if (process.env.NODE_ENV !== 'production') {
          console.error('[CanvasAdvancedRoomVisualiser] Final image load error:', {
            imageSrc,
            isCrossOrigin,
            isS3Url,
            attempts: loadAttemptsRef.current[imageSrc],
            context,
          });
        }
        drawRef.current();
        if (onHardFailure) {
          onHardFailure();
        }
      };

      const attemptLoad = () => {
        const attempt = ++loadAttemptsRef.current[imageSrc];

        const startTimeout = () => {
          clearExistingTimeout();
          loadTimeoutRef.current = window.setTimeout(() => {
            if (loadState === 'loaded') return;
            if (process.env.NODE_ENV !== 'production') {
              console.warn('[CanvasAdvancedRoomVisualiser] Image load timeout:', { imageSrc, attempt });
            }
            if (attempt < maxAttempts) {
              attemptLoad();
            } else {
              handleHardError({ reason: 'timeout' });
            }
          }, 15000);
        };

        const loadViaBlob = () => {
          if (!isCrossOrigin || typeof window === 'undefined') {
            loadDirect();
            return;
          }
          const cacheBuster = `cb=${Date.now()}`;
          const fetchUrl = imageSrc.includes('?') ? `${imageSrc}&${cacheBuster}` : `${imageSrc}?${cacheBuster}`;

          fetch(fetchUrl, { mode: 'cors', credentials: 'omit', cache: 'no-cache' })
            .then((response) => {
              if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
              }
              return response.blob();
            })
            .then((blob) => {
              const blobUrl = URL.createObjectURL(blob);
              const img = new Image();
              img.onload = () => {
                clearExistingTimeout();
                if (process.env.NODE_ENV !== 'production') {
                  console.log('[CanvasAdvancedRoomVisualiser] Image loaded via blob URL:', imageSrc);
                }
                imageRef.current = img;
                setLoadState('loaded');
                prevAssignmentsRef.current = { ...assignments };
                const maybeDecode = (img as HTMLImageElement & { decode?: () => Promise<void> }).decode;
                if (maybeDecode) {
                  maybeDecode.call(img).catch(() => undefined).finally(() => {
                    drawRef.current();
                  });
                } else {
                  drawRef.current();
                }
                setTimeout(() => URL.revokeObjectURL(blobUrl), 60000);
              };
              img.onerror = (error) => {
                URL.revokeObjectURL(blobUrl);
                if (process.env.NODE_ENV !== 'production') {
                  console.warn('[CanvasAdvancedRoomVisualiser] Blob image load error, falling back to direct:', {
                    imageSrc,
                    error,
                  });
                }
                loadDirect();
              };
              startTimeout();
              img.src = blobUrl;
            })
            .catch((fetchErr) => {
              if (process.env.NODE_ENV !== 'production') {
                console.warn('[CanvasAdvancedRoomVisualiser] Fetch failed, trying direct Image load:', fetchErr);
              }
              loadDirect();
            });
        };

        const loadDirect = () => {
          const img = new Image();
          if (isCrossOrigin) {
            img.crossOrigin = 'anonymous';
          }

          img.onload = () => {
            clearExistingTimeout();
            if (process.env.NODE_ENV !== 'production') {
              console.log('[CanvasAdvancedRoomVisualiser] Image loaded successfully:', imageSrc, 'crossOrigin:', img.crossOrigin);
            }
            imageRef.current = img;
            setLoadState('loaded');
            prevAssignmentsRef.current = { ...assignments };
            const maybeDecode = (img as HTMLImageElement & { decode?: () => Promise<void> }).decode;
            if (maybeDecode) {
              maybeDecode.call(img).catch(() => undefined).finally(() => {
                drawRef.current();
              });
            } else {
              drawRef.current();
            }
          };

          img.onerror = (error) => {
            clearExistingTimeout();
            const errorEvent = error as ErrorEvent | Event;
            if (process.env.NODE_ENV !== 'production') {
              console.error('[CanvasAdvancedRoomVisualiser] Failed to load image:', imageSrc, 'crossOrigin:', img.crossOrigin);
              console.error('[CanvasAdvancedRoomVisualiser] Error details:', {
                imageSrc,
                error: error?.toString(),
                errorType: errorEvent?.type,
                errorMessage: errorEvent instanceof ErrorEvent ? errorEvent.message : undefined,
                crossOrigin: img.crossOrigin,
                isS3Url,
                isCrossOrigin,
                naturalWidth: img.naturalWidth,
                naturalHeight: img.naturalHeight,
                attempt,
              });
            }

            imageRef.current = null;
            if (attempt < maxAttempts) {
              setTimeout(() => {
                attemptLoad();
              }, 400);
            } else {
              handleHardError({ reason: 'error', error });
            }
          };

          startTimeout();
          img.src = imageSrc;
        };

        loadViaBlob();
      };

      attemptLoad();

      return () => {
        clearExistingTimeout();
        imageRef.current = null;
      };
    }, [imageSrc]);

    useEffect(() => {
      const prev = prevAssignmentsRef.current;
      const wallKeys = Object.keys(wallMasks);

      const needsTransition = prev && wallKeys.some((k) => prev[k] !== assignments[k]);

      if (!needsTransition) {
        prevAssignmentsRef.current = { ...assignments };
        draw(assignments);
        return;
      }

      if (animationRef.current) cancelAnimationFrame(animationRef.current);

      const start = performance.now();
      const prevAssignments = prev ?? assignments;

      const tick = () => {
        const elapsed = performance.now() - start;
        const t = Math.min(elapsed / COLOR_TRANSITION_MS, 1);
        const eased = t * (2 - t);

        const interpolated: Record<string, string> = {};
        for (const wallKey of wallKeys) {
          const fromHex = prevAssignments[wallKey];
          const toHex = assignments[wallKey];
          if (!toHex) continue;
          if (!fromHex || fromHex === toHex) {
            interpolated[wallKey] = toHex;
            continue;
          }
          const from = hexToRgb(fromHex);
          const to = hexToRgb(toHex);
          const r = from.r + (to.r - from.r) * eased;
          const g = from.g + (to.g - from.g) * eased;
          const b = from.b + (to.b - from.b) * eased;
          interpolated[wallKey] = rgbToHex(r, g, b);
        }

        draw(interpolated);

        if (t < 1) {
          animationRef.current = requestAnimationFrame(tick);
        } else {
          prevAssignmentsRef.current = { ...assignments };
          animationRef.current = null;
        }
      };

      animationRef.current = requestAnimationFrame(tick);
      return () => {
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
      };
    }, [draw, assignments, wallMasks]);

    return (
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className="absolute inset-0 w-full h-full object-cover"
        role="img"
        aria-label="Room preview with wall colours"
        onContextMenu={(e) => e.preventDefault()}
      />
    );
  }
);

export default CanvasAdvancedRoomVisualiser;
