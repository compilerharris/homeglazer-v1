/**
 * Detects if we're on desktop Chrome/Firefox emulating mobile via DevTools.
 * WebGL reports the host GPU; DevTools does not override it.
 * Returns true if desktop/emulation detected (use Canvas), false if real mobile (use SVG).
 *
 * Uses a mobile GPU blacklist: we only treat as "real mobile" when the GPU matches
 * known mobile patterns. Unknown or desktop GPUs default to Canvas. This is dynamic:
 * new desktop GPUs don't need to be added; only new mobile GPU vendors need updates.
 */
const MOBILE_GPU_PATTERNS = [
  'qualcomm',
  'adreno', // Qualcomm mobile
  'mali', // ARM mobile
  'powervr', // Imagination mobile
  'videocore', // Broadcom (Raspberry Pi, some mobile)
];

/** Apple Silicon Mac reports "Apple M1/M2/M3" etc.; iPhone reports "Apple GPU" only. */
const MAC_APPLE_SILICON_PATTERNS = ['apple m1', 'apple m2', 'apple m3', 'apple m4'];

function isKnownMobileGpu(combined: string): boolean {
  if (MOBILE_GPU_PATTERNS.some((p) => combined.includes(p))) return true;
  // iPhone: "Apple GPU" without M1/M2/M3/M4
  if (combined.includes('apple gpu') && !MAC_APPLE_SILICON_PATTERNS.some((p) => combined.includes(p))) {
    return true;
  }
  return false;
}

export function detectDesktopEmulation(): boolean {
  if (typeof document === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return false;
    const ext = (gl as WebGLRenderingContext).getExtension('WEBGL_debug_renderer_info');
    if (!ext) return false;
    const vendor = (gl as WebGLRenderingContext).getParameter(ext.UNMASKED_VENDOR_WEBGL) || '';
    const renderer = (gl as WebGLRenderingContext).getParameter(ext.UNMASKED_RENDERER_WEBGL) || '';
    const combined = `${vendor} ${renderer}`.toLowerCase();
    // If we recognize it as a real mobile GPU, don't override (use SVG)
    if (isKnownMobileGpu(combined)) return false;
    // Desktop, unknown, or new GPU: treat as desktop (use Canvas)
    return true;
  } catch {
    return false;
  }
}
