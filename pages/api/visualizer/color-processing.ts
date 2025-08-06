import type { NextApiRequest, NextApiResponse } from 'next';
import CryptoJS from 'crypto-js';

// Server-side only color processing algorithms (protected)
const COLOR_PROCESSING_ALGORITHMS = {
  // Advanced color harmony calculations
  generateHarmony: (baseColor: string, type: 'complementary' | 'triadic' | 'analogous') => {
    const hsl = hexToHsl(baseColor);
    if (!hsl) return [];

    switch (type) {
      case 'complementary':
        return [
          baseColor,
          hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l)
        ];
      case 'triadic':
        return [
          baseColor,
          hslToHex((hsl.h + 120) % 360, hsl.s, hsl.l),
          hslToHex((hsl.h + 240) % 360, hsl.s, hsl.l)
        ];
      case 'analogous':
        return [
          hslToHex((hsl.h - 30 + 360) % 360, hsl.s, hsl.l),
          baseColor,
          hslToHex((hsl.h + 30) % 360, hsl.s, hsl.l)
        ];
      default:
        return [baseColor];
    }
  },

  // Color temperature analysis
  analyzeTemperature: (color: string) => {
    const rgb = hexToRgb(color);
    if (!rgb) return 'neutral';
    
    const warmth = (rgb.r - rgb.b) / 255;
    if (warmth > 0.1) return 'warm';
    if (warmth < -0.1) return 'cool';
    return 'neutral';
  },

  // Advanced contrast calculations
  calculateWCAGContrast: (color1: string, color2: string) => {
    const lum1 = getRelativeLuminance(color1);
    const lum2 = getRelativeLuminance(color2);
    const lighter = Math.max(lum1, lum2);
    const darker = Math.min(lum1, lum2);
    return (lighter + 0.05) / (darker + 0.05);
  },

  // Color mood analysis
  analyzeMood: (colors: string[]) => {
    let totalSaturation = 0;
    let totalLightness = 0;
    let warmColors = 0;

    colors.forEach(color => {
      const hsl = hexToHsl(color);
      if (hsl) {
        totalSaturation += hsl.s;
        totalLightness += hsl.l;
        
        const temp = COLOR_PROCESSING_ALGORITHMS.analyzeTemperature(color);
        if (temp === 'warm') warmColors++;
      }
    });

    const avgSaturation = totalSaturation / colors.length;
    const avgLightness = totalLightness / colors.length;
    const warmRatio = warmColors / colors.length;

    // Determine mood
    if (avgSaturation > 70 && avgLightness < 50) return 'dramatic';
    if (avgSaturation < 30 && avgLightness > 70) return 'peaceful';
    if (warmRatio > 0.7) return 'energetic';
    if (warmRatio < 0.3) return 'calming';
    return 'balanced';
  }
};

// Helper functions (server-side only)
function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function hexToHsl(hex: string) {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;

  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const diff = max - min;
  const sum = max + min;
  const l = sum / 2;

  let h, s;

  if (diff === 0) {
    h = s = 0;
  } else {
    s = l > 0.5 ? diff / (2 - sum) : diff / sum;
    
    switch (max) {
      case r:
        h = (g - b) / diff + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / diff + 2;
        break;
      case b:
        h = (r - g) / diff + 4;
        break;
      default:
        h = 0;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

function hslToHex(h: number, s: number, l: number) {
  const hNorm = h / 360;
  const sNorm = s / 100;
  const lNorm = l / 100;

  const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm;
  const x = c * (1 - Math.abs((hNorm * 6) % 2 - 1));
  const m = lNorm - c / 2;

  let r, g, b;

  if (hNorm < 1/6) {
    [r, g, b] = [c, x, 0];
  } else if (hNorm < 2/6) {
    [r, g, b] = [x, c, 0];
  } else if (hNorm < 3/6) {
    [r, g, b] = [0, c, x];
  } else if (hNorm < 4/6) {
    [r, g, b] = [0, x, c];
  } else if (hNorm < 5/6) {
    [r, g, b] = [x, 0, c];
  } else {
    [r, g, b] = [c, 0, x];
  }

  const rHex = Math.round((r + m) * 255).toString(16).padStart(2, '0');
  const gHex = Math.round((g + m) * 255).toString(16).padStart(2, '0');
  const bHex = Math.round((b + m) * 255).toString(16).padStart(2, '0');

  return `#${rHex}${gHex}${bHex}`;
}

function getRelativeLuminance(color: string) {
  const rgb = hexToRgb(color);
  if (!rgb) return 0;

  const rsRGB = rgb.r / 255;
  const gsRGB = rgb.g / 255;
  const bsRGB = rgb.b / 255;

  const r = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
  const g = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
  const b = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// Encryption for sensitive data
const CRYPTO_SECRET = process.env.CRYPTO_SECRET || 'your-crypto-secret-key';

function encryptData(data: any) {
  const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), CRYPTO_SECRET).toString();
  return encrypted;
}

function decryptData(encryptedData: string) {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, CRYPTO_SECRET);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    return null;
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { operation, colors, baseColor, encrypted } = req.body;

    let inputColors = colors;

    // Handle encrypted input
    if (encrypted) {
      const decryptedData = decryptData(encrypted);
      if (!decryptedData) {
        return res.status(400).json({ error: 'Failed to decrypt data' });
      }
      inputColors = decryptedData.colors;
    }

    let result;

    switch (operation) {
      case 'harmony':
        if (!baseColor || !req.body.harmonyType) {
          return res.status(400).json({ error: 'Base color and harmony type required' });
        }
        result = COLOR_PROCESSING_ALGORITHMS.generateHarmony(baseColor, req.body.harmonyType);
        break;

      case 'temperature':
        if (!baseColor) {
          return res.status(400).json({ error: 'Base color required' });
        }
        result = COLOR_PROCESSING_ALGORITHMS.analyzeTemperature(baseColor);
        break;

      case 'contrast':
        if (!inputColors || inputColors.length < 2) {
          return res.status(400).json({ error: 'At least two colors required' });
        }
        result = COLOR_PROCESSING_ALGORITHMS.calculateWCAGContrast(inputColors[0], inputColors[1]);
        break;

      case 'mood':
        if (!inputColors || !Array.isArray(inputColors)) {
          return res.status(400).json({ error: 'Colors array required' });
        }
        result = COLOR_PROCESSING_ALGORITHMS.analyzeMood(inputColors);
        break;

      case 'process-palette':
        if (!inputColors || !Array.isArray(inputColors)) {
          return res.status(400).json({ error: 'Colors array required' });
        }
        
        // Comprehensive color analysis
        result = {
          colors: inputColors,
          mood: COLOR_PROCESSING_ALGORITHMS.analyzeMood(inputColors),
          temperatures: inputColors.map(color => ({
            color,
            temperature: COLOR_PROCESSING_ALGORITHMS.analyzeTemperature(color)
          })),
          contrasts: inputColors.length > 1 ? 
            COLOR_PROCESSING_ALGORITHMS.calculateWCAGContrast(inputColors[0], inputColors[1]) : null,
          harmonies: inputColors[0] ? {
            complementary: COLOR_PROCESSING_ALGORITHMS.generateHarmony(inputColors[0], 'complementary'),
            triadic: COLOR_PROCESSING_ALGORITHMS.generateHarmony(inputColors[0], 'triadic'),
            analogous: COLOR_PROCESSING_ALGORITHMS.generateHarmony(inputColors[0], 'analogous')
          } : null
        };
        break;

      default:
        return res.status(400).json({ error: 'Invalid operation' });
    }

    // Encrypt response if requested
    const responseData = req.body.encryptResponse ? 
      { encrypted: encryptData(result) } : 
      { data: result };

    res.status(200).json({
      success: true,
      operation,
      timestamp: Date.now(),
      ...responseData
    });

  } catch (error) {
    console.error('Color processing error:', error);
    res.status(500).json({ 
      error: 'Color processing failed',
      details: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : 'Unknown error') : undefined
    });
  }
}