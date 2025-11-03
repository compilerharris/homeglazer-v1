import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Header from '../../../../../src/components/home/Header';
import Footer from '../../../../../src/components/home/Footer';
import Head from 'next/head';
import DevToolsProtection from '../../../../../src/components/security/DevToolsProtection';

const BRAND_CONFIG = [
  { id: 'asian-paints', name: 'Asian Paints', fileName: 'asian_paints_colors.json' },
  { id: 'nerolac', name: 'Nerolac', fileName: 'nerolac_colors.json' },
  { id: 'berger', name: 'Berger', fileName: 'berger_colors.json' },
  { id: 'jsw', name: 'JSW', fileName: 'jsw_colors.json' },
  { id: 'birla-opus', name: 'Birla Opus', fileName: 'birla_opus_colors.json' },
  { id: 'ral', name: 'RAL', fileName: 'ral_colors.json' },
  { id: 'ncs', name: 'NCS', fileName: 'ncs_colors.json' },
];

const ROOM_IMAGES = {
  bedroom: "/lovable-uploads/bedroom6.jpg",
  living: "/lovable-uploads/living-room.jpg",
  kitchen: "/lovable-uploads/kitchen.jpg",
};

const BEDROOM_POLYLINE_PATH = "M1256.66,472.47l8.58.42.13-100.16-8.85-.14.14,99.88ZM1278.79,372.45l-11.06.14v100.3l10.92.97v-12.32h1.11v-78.02l-.97-.28v-10.79ZM1224.3,372.41l1.08-2.16v-46.54l-.27-14.07-.54-2.44,22.19-.27,33.28-1.35-.07-80.83c-3.76,5.01-11.14,10.59-26.11,16.05-18.76,6.84-31.66,3.32-43.2-2.15-11.53-5.47-23.46-16.81-26.39-33.42s2.54-29.32,9.77-40.27c7.23-10.95,17.01-17.01,28.15-22.48s22.09-4.3,35.57-2.35c10.8,1.56,19.21,9.14,22.14,12.1l-.13-152.12-63.23.76-542.05,93.55v226.7l33.36-1.25.41-5.36,3.71.82.21,4.12,40.62,1.24-.62,2.68v46.39h-18.76l-.2,59.84,6.23-.64h11.9l12.72-.27,7.03,1.35,5.14.54.27-37.07.27-24.35.81-9.47,1.35-5.14s2.98-7.31,10.28-7.03c7.31.27,118.78-.81,118.78-.81l216.72-1.89,67.91-.27s5.41-.27,5.14,7.58c-.27,7.85-.54,74.68-.54,74.68l.27,48.7,19.75-4.33s-.81-5.68.81-5.68,23.81-.81,28.95,1.08c5.14,1.89,1.62,4.87,1.62,4.87l5.14.54-.27-100.11-29.22.54h.02,0ZM790.57,259.27l-1.43.1-34.63,2.04-2.45-.31.1-43.42,3.68-.41,32.28-2.86,2.45.82v44.03h0ZM1077.89,137.09s5.4-21.36,34.86-24.3c29.46-2.95,46.64,55.48-6.38,65.05,0,0-16.69,1.47-26.76-13.75,0,0-7.36-9.57-1.72-27ZM971.79,154.19s12.61-1.96,13.31,16.12-28.31,19.76-28.73.56c0,0-1.26-14.71,15.42-16.68ZM807.22,176.92l30.34-3.27,1.84.82.1,45.67-30.45,2.55-1.94-1.12.1-44.65h.01ZM842.98,286.75l-.31,2.15-3.06.31-10.83.1-23.29,1.33-3.27-.82v-52.62l32.9-2.35h7.15l.72,1.33-.1,9.6.1,40.97h-.01ZM942.28,224.05l-22.25,1.9-40.99,3.07-7.03.59-6.59-.44-.15-43.92-.29-34.55.29-5.42,6.29-1.02,33.96-4.25,5.27-.29,5.56-.88,15.08-1.9,10.1-1.17,1.76,2.05v56.07l.15,29.13-1.17,1.02h.01ZM991.07,250.66l-31.39,2.44-6.22-.81v-49.51l36.17-3.04,1.86.66.22,49.26-.64,1.02v-.02h0ZM1060.87,225.77l-51.95,3.79-3.79-1.08.27-65.21,53.57-5.68,1.89,1.35v66.83h.01ZM1171.26,290.43l-81.44,2.98h-11.09l-4.6-.81v-93.35l94.7-8.12,2.71,1.08.27,94.7-.54,3.52h-.01ZM689.49,369.98l-.2,70.01,6.05-2.37,8.12-3.25,1.89.82h.01l-.41-65.21h-15.46ZM674.48,369.43v63.32l5.17.81,1.08,5.95,6.49.42-.2-70.37-12.54-.13h0ZM715.88,369.77l.2,61.61,10.1-.79,5.42-.82.33-.03-.58-60.38-15.47.41ZM418.21,519.42l-10.9.59,3.79,22.5,10.48,1.49-3.37-24.58h0ZM390.66,539.61l7.46,1.06,1.27-20.8-6.13.14-2.6,19.6h0ZM378.92,488.04h-1.5l-.44,27.04-.13,22.57,9.01,1.28,2.77-18.92-5.23-1.04-2.24-1.2-.75-2.39-.74-7.02v-17.18l-.75-3.14h0ZM367.86,382.56l5.68,18.38.6-19.58.59-7.02-7.9-23.49-.42,40.66,4.74,13.01-3.29-21.96h0ZM371.45,488.34h-6.04l-.51,49.94,4.99-.55,1.56-49.39h0ZM669.76,322.12l4.73-.99V94.42l-226.06-54.61-75.35,17.97L111.79.57.13.11v611.71l66.16-9.65.15-55.61-.6-94.19.45-84.55V33.87c.6-1.96,1.36-.15,3.01-.45s1.66,1.81,5.12.9c3.47-.9,4.67,3.77,7.23,2.26,2.56-1.51,1.96,1.36,4.07.45,2.11-.9,3.92,1.51,6.18.9,2.26-.6,1.21,4.52,4.67,1.81,3.47-2.71,3.01.15,3.77.3.75.15,1.66.9,3.32,0,1.66-.9,2.11,1.66,4.07,1.05,1.96-.6,3.16,1.81,5.43,1.05,2.26-.75,3.16,3.01,4.67,1.81,1.51-1.21,2.71.75,3.32.15.6-.6,1.96.6,2.86,1.36.9.75,3.84.62,5.97.27,2.13-.36,2.13,4.98.36,10.32-1.78,5.34-.71,20.99-.71,20.99l170.02,29.52v-9.96s-1.6-15.04-.03-17.4,4.56.47,6.3,0c1.73-.47,4.09,2.52,5.98,1.57,1.89-.94,3.78,2.52,4.56.79s3.78.63,8.5.47c4.72-.16,4.72,4.41,7.87,2.83s4.72,1.89,8.03,1.26,3.31,2.83,5.19,1.73c1.89-1.1,3.62.63,6.61.63s3.31,2.36,5.51,1.42,2.83,2.36,5.19,1.26c2.36-1.1,4.88,1.57,4.88,1.57l4.09.94c1.1-2.2,3.31-.31,3.31-.31,2.99,0,5.67.47,4.56,4.72-1.1,4.25-5.78,3.06-5.78,3.06l-6.46-2.04-1.36,8.5.68,62.59v136.41l-.44,42.83,8.64,20.85,5.98-17.78-3.29,18.38,4.33,10.76.75-3.14.6-18.53.45,13.75,4.93-17.78-1.05,28.09.9-3.44,1.94-27.04-.3,21.37,3.88-13.9-.15,9.26,3.14-15.84-2.09,17.33,13.9-46.76-.6,6.13,2.24-6.57c-1.64,15.54-10.76,53.64-10.76,53.64l2.84-6.28-5.68,25.7,7.02-7.77-5.08,8.96,7.62-3.14c-1.34,2.24-7.02,5.53-7.02,5.53,0,0-4.03,1.79-5.08,8.22-1.05,6.42-5.68,18.38-5.68,18.38,14.04-.75,19.57.75,19.57.75l1.64.9-.15,18.97c18.23-15.09,24.5,1.2,24.5,1.2-10.76-11.36-15.24-2.39-15.24-2.39l3.44,1.49c15.39-3.59,21.07,16.14,21.07,16.14-8.82-16.29-17.78-14.04-17.78-14.04,5.83,3.29,13.9,14.64,13.9,14.64,0,0-5.98-5.53-8.37-6.87-2.39-1.34-3.14-4.63-7.47-6.42s-8.07,4.78-8.07,4.78c8.52-3.59,13.45,10.31,13.45,10.31l3.59,2.69-2.69-.3c5.08,21.81,1.34,30.03,1.34,30.03,0-10.24-1.37-17.76-2.86-22.91-.09,8-.42,32.88-1.17,37.26-.9,5.23-5.38,4.78-5.38,4.78l4.23,25.92,11.99,1.7c.46-5.21,1.07-6.59,1.07-6.59,3.37-1.23,28.49-5.51,28.49-5.51,0,0,.61-.92.61-3.52s.46-5.05,1.68-7.81c1.23-2.76,9.04-19.3,9.04-19.3,0,0,5.51-13.94,15.16-25.42,9.65-11.49,22.82-13.63,24.81-13.63s5.67-1.84,5.67-1.84c0,0,2.3-2.14,5.51-2.76,3.22-.61,12.56-2.91,15.93-3.83,3.37-.92,7.2-.46,10.57-1.38s6.59.15,9.04-.92c2.45-1.07,6.59.61,9.04-.77s8.58.31,11.49-1.38c2.91-1.68,7.81-2.45,7.81-2.45,5.36-3.22,7.81-1.07,7.81-1.07,3.22-1.53,5.67-.15,5.67-.15,4.44-1.68,6.43.15,6.43.15,3.68-.92,7.05-.15,10.26-.15s14.09-.15,23.43-4.59c9.34-4.44,17.21-2.64,17.21-2.64l.77-6.58c1.16-1.55,8.21-1.54,8.21-1.54v-63.32l-5.11-.12.39-47.19h0ZM609.83,377.23l-5.04.76-85.43,1.26.25-179.17,1.76-1.01,88.45,11.84v166.32h0ZM402.92,541.35l1.42.2-1.22-5.55-.2,5.35ZM427.18,472.8l.83.64c-1.39-3.81-2.62-5.57-2.62-5.57l-4.18-1.34,1.64,6.42,4.33-.15h0ZM295.74,534.66l.08,12.28-4.77.47.16-12.04,4.54-.7h-.01ZM286.82,535.83l-.16,12.12-15.33,1.8v-12.2l15.49-1.72ZM266.8,538.18v12.2l-16.81,2.5s4.93-1.96,5.94-13.61l10.87-1.09Z";
const LIVING_ROOM_PATH = "M535.19,539.81l5.64,3.13v8.46l-42.64-.63.31-5.33-.94-5.64-3.13-.31-1.25,4.08h-3.76l-.31-99.38,5.64,3.13,3.76,1.25,3.76-3.45v-5.02s-2.82-6.27-9.48-1.74l-2.4-.53-2-3.2-353.69.48-1.93,2.9.24,32.4h-40.37l-3.38-15.71-1.45-10.64-2.18-7.01-5.08-5.56-12.57-2.42,1.69-42.79,6.29-39.65,3.63-47.63,3.14-53.91-.48-66.24-.82-79.53,454,1.99,1.78,12.75-1.03,36.68-3.1,22.22-397.31-2.58-1.03,245.93-40.82,1.55,4.65,7.23,415.3,1.55,4.7,5.64.63-5.02,3.45-.94,15.99.63.94,31.04s-6.9,2.19-9.09,15.99-6.27,32.6-6.27,32.6l-4.7,5.33-2.19,2.51,3.13,2.19s-10.97,15.36,6.58,16.93l8.15,6.27ZM81.41,99.32h.02s0-.02,0-.02l-.02.02ZM777.83,82.61l-9.24.3,3.45,108.36,5.97,167.72-.18-276.38ZM1284.78,220.23l-202.36,45.82.55,244.36,189.27,37.09-7.64,10.91-241.01-47.17.64-8.9s14.44-5.17.65-12.72v-22.42s4.53,1.08,4.96-3.02,0-65.1,0-65.1l-4.1-5.17-1.08-3.88-2.16.43-2.16,5.39-2.8,3.66-.43,63.81s.65,3.88,4.53,3.88l-.22,22.2s-7.76.86-6.68,6.68c1.08,5.82,6.47,5.6,6.47,5.6l-.13,9.06-75.19-14.72-.13-3.18s8.62-3.88-.43-10.78l-.22-19.19s4.74,1.72,3.66-9.92l-.43-53.46-2.8-3.23-1.08-8.62-1.51-1.29-3.66,11.64-1.72,1.29.43,61.87,4.74,2.37.43,18.97s-7.76-1.29-6.04,5.39c0,0-.65,4.31,6.25,5.17l.22,2.51-48.01-9.4.5-19.4-5.29-4.03h-10.08l3.78-11.84,8.31,10.33,5.54,4.79,5.54.25,8.31,6.8,4.28-3.78-8.06-11.59,9.82,6.3v-8.31l-6.05-11.84,4.03,1.76,1.76,5.79,8.31,5.04-2.77-5.54-4.03-16.37-6.3-4.79,4.79-8.56-2.27-.25-11.84-11.08-5.54-.25-6.05,5.79-1.01,6.8,3.78,5.04-4.03.5v2.77l-6.05-1.01-3.27-3.78-4.53-7.05,4.53-2.52v5.54l1.76-3.53,3.53-8.06,4.03-1.76,10.08-7.31,2.27-3.78,4.28-1.01,3.78,2.77-1.51-5.54-7.31.25-16.12,13.35-7.31,1.76-2.27,5.79-2.27-3.27-1.26-6.05,5.54-9.57,5.29-6.3s-10.33,8.06-16.12,9.82c-5.79,1.76-13.1,13.6-13.1,13.6-1.62-.61-3.08-.61-4.37-.23l-6.21-5.06c-3.78-5.29-9.82,1.01-9.82,1.01l-6.05,3.02-7.31,7.81-6.8,8.06-4.28-2.52c.25-12.34,14.11-14.11,14.11-14.11-3.27-5.29-11.84-1.01-11.84-1.01l-.25,3.78-2.02,3.02-2.02,5.79.76,5.79,3.78,1.51,2.02,2.02-5.04,3.02-5.79,7.05-1.01,8.31,4.79-3.53v-5.04l2.02-2.77.5,4.03,5.04,1.76,6.3-5.54,1.26-4.79,2.27.76,7.31-9.82,4.75,2.05-2.84,4.93-4.18.45-5.08,5.08-4.18,4.63,1.49,7.76-4.48,11.5.15,5.97-2.09,4.93-19.98-4.66,9.33-48.96-.74-1.86h-14.33l4.65-5.58,10.61-6.33,13.03-1.12.93-4.65-8.93-.93,5.03-3.54-8.38.56,3.54-2.05-5.58-.56,12.66-4.09,19.92.19,11.54,3.35-5.58-4.28,5.77.56-3.16-1.68-14.52-2.42-15.08.19,22.52-9.86-20.1,3.16-14.33,5.96-6.14-3.91-3.35-7.82,14.33-.37-15.26-3.72,18.61-5.58-15.26.74,4.47-4.09,15.26-9.31,14.7-4.28-4.47-.37-11.17,2.61,11.91-6.89-16.19,1.3-10.8,6.7,2.79-4.84-5.21,4.09-6.33,6.89,1.12-8.93-2.05,1.68-2.61,6.7-2.05-5.96-1.86,7.63-2.79-2.79-.74,7.44-3.62-1.82-.18-276.38L858.29-6.2l427.03.07-.55,226.36ZM846.04,439.49l-3.39-2.32-9.64,8.21-3.03,3.21-4.46,2.86-.36,2.5,5.53.18-.89,3.57-3.93,2.32h-2.86l-1.96,4.11.18,9.61,20.53,3.77-.89-17.13,3.03-.54.89-9.46-.71-3.93,4.28-3.03-2.32-3.93Z";
const KITCHEN_PATH = "M0,32.99V0h260.07l167.99,183.28,590.7,3.29,31.84-16.47,229.4-1.1v310.65l-18.83,1.45,3.38-281.88-142.71-1.29-4.19,305.4,52.19.64,2.26,5.15,4.51,6.77,6.44,4.51,1.29,5.48h-139.81l-20.94-7.09-2.58-53.48,2.58-27.06v-9.5l-42.64-3.5-86.38-.36v-31.65h-24.16v6.77l-6.52.48v24.4l-5.32,1.21v-3.14l2.17-.48.97-3.14-1.21-3.38-3.14-1.93v-13.53l-12.56.24v12.32l-2.66-2.66-3.14-.48-3.38,2.66-2.66-2.42-4.11,1.69-1.93,4.11,1.45,4.59,4.59,4.11h-145.69l-35.28-.48-1.21-39.87v-14.01l-4.11-11.6-3.38-6.28-6.04-3.38-5.56,1.21-4.83,4.83-3.87,9.18-1.69,14.74v34.07l-.48,7.25,2.9.72.97-2.17.24-16.43,21.74.97v21.5l-51.46.24-8.21.24-160.43.24,3.14-3.62,1.93-3.62-4.59-3.87-2.42-2.66-6.77.97-2.17,2.66-6.04.72-.48,4.59,5.32,5.07h-126.12l-27.06,2.9-3.38-251.76L0,32.99M646.92,400.97v-30.6l-2.26-8.7-3.22-6.44-3.87-2.26h-3.54l-3.54,3.7-3.38,5.8-2.26,5.48v32.38l22.07.64ZM793.98,183.39v40.11l-10.31,2.58v5.41l24.6.05-.28-5.94-2.58-2.9h-8.38v-39.3h-3.06ZM702.97,183.39l-.32,39.46-9.66,2.74-.13,5.64,24.12.11-.15-6.23-2.74-2.09h-8.21v-39.62h-2.9ZM611.16,183.39l-.16,39.3-8.7.16-2.42,2.42-.06,5.26,24.08.18-.17-5.28-3.06-2.26-6.93-.81v-38.98h-2.58ZM267.99,228.01l1.21,141.83,1.81,1.81h300.68v-36.93l130.15-1.61,1.61,38.54h297.99l1.61-139.69-299.92-.64-435.14-3.3ZM1023.83,527.36v11.11l19.17,7.73h149.64s2.42-3.7,2.42-3.7v-2.42l-8.21-1.13-4.67-2.9-2.9-2.42-136.75.32-18.68-6.6ZM1202.3,546.21h8.86l-3.06-3.06h-5.15l-.64,3.06ZM260.53,370.48h-108.59v58.95l109.37-.68-.78-58.27Z";
const WALL_SIDES = ["front", "left", "right", "back"];
const WALL_MASKS: Record<string, Record<string, string>> = {
  bedroom: {
    front: BEDROOM_POLYLINE_PATH,
    left: BEDROOM_POLYLINE_PATH,
    right: BEDROOM_POLYLINE_PATH,
    back: BEDROOM_POLYLINE_PATH,
  },
  living: {
    front: LIVING_ROOM_PATH,
    left: LIVING_ROOM_PATH,
    right: LIVING_ROOM_PATH,
    back: LIVING_ROOM_PATH,
  },
  kitchen: {
    front: KITCHEN_PATH,
    left: KITCHEN_PATH,
    right: KITCHEN_PATH,
    back: KITCHEN_PATH,
  },
};

const PAGE_SIZE = 8;

const CATEGORY_COLORS: Record<string, string> = {
  'Greys': '#808080',
  'Grays': '#808080',
  'Blues': '#0066CC',
  'Browns': '#8B4513',
  'Reds': '#FF0000',
  'Oranges': '#FF6600',
  'Yellows': '#FFD700',
  'Greens': '#228B22',
  'Purples': '#800080',
  'Violets': '#800080',
  'Pinks': '#FF69B4',
  'Neutrals': '#D3D3D3',
  'Whites': '#FFFFFF',
  'Blacks': '#000000',
  'Metallics': '#C0C0C0',
  'Pastels': '#FFB6C1',
  'Earth Tones': '#8B4513',
  'Classic Neutrals': '#D3D3D3',
  'Creams': '#FFFDD0',
  'Beige': '#F5F5DC',
  'Violet': '#800080',
};

function toKebabCase(str: string): string {
  return str.toLowerCase().replace(/\s+/g, '-');
}
function fromKebabCase(str: string): string {
  return str.replace(/-/g, ' ');
}
function toSentenceCase(str: string): string {
  if (!str) return '';
  return str.split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ');
}

// 1. Category science content map
const COLOR_TYPE_SCIENCE: Record<string, { title: string; description: string; examples: string }> = {
  Greys: {
    title: 'The Science & Mood of Greys',
    description: 'Grey tones evoke calmness, sophistication, and neutrality, making them excellent at balancing bold colors or providing a modern, minimalist look. Greys are remarkably versatile, harmonizing with almost any color palette while reducing visual clutter.',
    examples: 'Recommended for: Living rooms, offices, bedrooms, and contemporary spaces. Benefits: Promotes focus, flexibility in décor, and a timeless elegance.'
  },
  Grays: {
    title: 'About Grays',
    description: 'Gray is commonly used for its modern aesthetic and adaptability. It offers a neutral backdrop, reduces overstimulation, and helps other colors stand out in your décor.',
    examples: 'Recommended for: Any room, particularly living rooms, offices, kitchens. Benefits: Adds sophistication, balance, and versatility.'
  },
  Blues: {
    title: 'Why Choose Blues?',
    description: 'Blue shades are known to create a feeling of tranquillity, spaciousness, and a cooling effect. They lower stress, support sleep, and inspire calm reflection, making them a favorite for interior designers globally.',
    examples: 'Recommended for: Bedrooms, bathrooms, study rooms. Benefits: Aids relaxation, encourages productivity, and enhances sleep quality.'
  },
  Browns: {
    title: 'Bring Nature Home with Browns',
    description: 'Brown colors draw on earth tones and bring warmth and security to a space. They feel comforting, stable, and rooted, and pair beautifully with natural materials and textures.',
    examples: 'Recommended for: Living rooms, dens, reading nooks. Benefits: Grounds the space, creates comfort, aligns with rustic or classic décor.'
  },
  Reds: {
    title: 'Embracing Energy with Reds',
    description: 'Red is stimulating, energetic, and bold. It increases excitement and appetite—making red ideal for spaces where you entertain or dine—but should be balanced to avoid overwhelming the senses.',
    examples: 'Recommended for: Dining areas, accent walls, creative studios. Benefits: Inspires passion, conversation, and appetite.'
  },
  Yellows: {
    title: 'The Uplifting Power of Yellows',
    description: 'Yellow evokes happiness, positivity, and energy. It mimics the warmth of sunlight and can make rooms feel more inviting and bright.',
    examples: 'Recommended for: Kitchens, children\'s rooms, hallways. Benefits: Boosts energy, creativity, and feelings of optimism.'
  },
  Oranges: {
    title: 'The Vibrance of Oranges',
    description: 'Orange energizes spaces, spurring sociability and excitement. It\'s perfect for creating a warm, welcoming environment and works well as an accent.',
    examples: 'Recommended for: Playrooms, exercise spaces, kitchens. Benefits: Stimulates conversation, appetite, and movement.'
  },
  Greens: {
    title: 'The Restorative Qualities of Greens',
    description: 'Green represents harmony and is associated with nature, renewal, and well-being. It has a calming and refreshing effect, helping to reduce stress.',
    examples: 'Recommended for: Bedrooms, living spaces, home offices. Benefits: Reduces anxiety, enhances concentration, creates balance.'
  },
  Purples: {
    title: 'The Creative Power of Purples',
    description: 'Purple hues are historically linked to creativity, luxury, and spirituality. Lighter purples soothe and support creative thought, while darker shades add drama and elegance.',
    examples: 'Recommended for: Bathrooms, bedrooms, meditation rooms. Benefits: Evokes creativity, luxury, and introspection.'
  },
  Violets: {
    title: 'Violets for Serenity and Imagination',
    description: 'Violet combines the calm of blue with the energy of red, promoting imagination and mystery. It\'s unique and brings a sense of inspiration and tranquility.',
    examples: 'Recommended for: Kid\'s rooms, creative corners, bathrooms. Benefits: Nourishes imagination, supports calm sleep.'
  },
  Violet: {
    title: 'Violet Spaces',
    description: 'Violet helps to integrate stability and calm with energy and vibrancy. It can transform rooms into places of creativity and peace.',
    examples: 'Recommended for: Bedrooms, spas, meditation rooms. Benefits: Soothes and inspires.'
  },
  Beige: {
    title: 'Classic Comfort: Beiges',
    description: 'Beige provides a warm neutral background that works with almost all color schemes. It gives a soft, inviting elegance to a room.',
    examples: 'Recommended for: Living rooms, bedrooms, dining rooms. Benefits: Timeless warmth, flexibility, and coziness.'
  },
  Beiges: {
    title: 'Classic Comfort: Beiges',
    description: 'Beige and beiges offer a warm, understated backdrop that integrates easily with most palettes. They soften a room and add familiar comfort without overwhelming.',
    examples: 'Recommended for: Living rooms, bedrooms, common areas. Benefits: Versatility, cozy elegance, pairs with light or dark accents.'
  },
  'Blue-Greens': {
    title: 'Balanced Calm: Blue‑Greens',
    description: 'Blue‑green hues blend the calm of blue with the freshness of green, evoking sea and forest tones. They feel restorative yet lively, great for modern natural themes.',
    examples: 'Recommended for: Bedrooms, living rooms, studies. Benefits: Calms the mind, refreshes the space, supports focus and relaxation.'
  },
  'Yellow-Greens': {
    title: 'Fresh Energy: Yellow‑Greens',
    description: 'Yellow‑greens are uplifting and botanical, bringing outdoor vitality indoors. They feel sunny and organic, ideal for brightening low‑light rooms.',
    examples: 'Recommended for: Kitchens, breakfast nooks, kid spaces. Benefits: Boosts energy, adds freshness, complements plants and wood.'
  },
  'Neutrals: Browns & Greys': {
    title: 'Grounded Neutrals: Browns & Greys',
    description: 'This neutral spectrum combines the warmth of browns with the sophistication of greys, yielding a balanced canvas that suits contemporary to classic interiors.',
    examples: 'Recommended for: Living rooms, hallways, multifunction spaces. Benefits: Balanced warmth and calm, easy coordination, long‑lasting appeal.'
  },
  Golds: {
    title: 'Radiant Warmth: Golds',
    description: 'Gold tones deliver a luxe, sun‑kissed glow. Used thoughtfully, they elevate a room with warmth and refinement while reflecting light beautifully.',
    examples: 'Recommended for: Feature walls, dining rooms, accents. Benefits: Adds glamour, warmth, and visual richness.'
  },
  Neutrals: {
    title: 'Timeless Versatility of Neutrals',
    description: 'Neutrals (like taupe, ivory, sand) provide balance, subtlety, and effortless coordination. They create a calming backdrop that adapts with changing décor.',
    examples: 'Recommended for: Any room. Benefits: Flexibility for décor changes and a clean, soothing effect.'
  },
  Whites: {
    title: 'Freshness & Light: Whites',
    description: 'White paint reflects light, enlarges a space visually, and delivers crispness and simplicity. It feels rejuvenating and allows other elements to pop.',
    examples: 'Recommended for: Small spaces, ceilings, kitchens, bathrooms. Benefits: Expands visual space, boosts brightness.'
  },
  Blacks: {
    title: 'Chic Drama: Blacks',
    description: 'Black adds instant drama and sophistication. Used in moderation, it creates striking contrast, grounds bold palettes, and conveys authority.',
    examples: 'Recommended for: Accent walls, details, ultra-modern spaces. Benefits: Defines, dramatizes, and accentuates.'
  },
  Metallics: {
    title: 'Shimmer & Glamour: Metallics',
    description: 'Metallic paints (silver, gold, bronze) catch the light and add luxury and excitement to your walls. They work well as highlights or special effects.',
    examples: 'Recommended for: Feature walls, trim, contemporary designs. Benefits: Adds opulence, visual interest.'
  },
  Pastels: {
    title: 'Soft Touch: Pastels',
    description: 'Pastel colors feel gentle and nurturing. They create a sense of peace and happiness, making any space more playful and light-hearted.',
    examples: 'Recommended for: Nurseries, bedrooms, relaxing nooks. Benefits: Uplifts mood, encourages peace.'
  },
  'Earth Tones': {
    title: 'Warmth & Grounding: Earth Tones',
    description: 'Earth tones (terracotta, ochres, olive) bring the outdoors in and create feelings of warmth and security. They make spaces feel grounded and protected.',
    examples: 'Recommended for: Living rooms, kitchens, entryways. Benefits: Comfort, coziness, stability.'
  },
  'Classic Neutrals': {
    title: 'Classic Neutrals',
    description: 'Classic neutrals deliver elegance and flexibility while allowing you to easily change your décor style over time.',
    examples: 'Recommended for: Any room. Benefits: Timelessness and balance.'
  },
  Creams: {
    title: 'Creams: Subtle Sophistication',
    description: 'Cream shades offer a gentle warmth and elegance. They soften a room\'s aesthetic and pair beautifully with both light and dark accents.',
    examples: 'Recommended for: Living rooms, bedrooms, kitchens. Benefits: Coziness, classic appeal.'
  },
  Pinks: {
    title: 'The Joy of Pinks',
    description: 'Pink shades evoke connection, warmth, and playfulness. Lighter pinks are calming, while brighter pinks add fun and vibrancy.',
    examples: 'Recommended for: Children\'s bedrooms, creative spaces, bathrooms. Benefits: Inspires happiness and nurturing.'
  },
  Lilac: {
    title: 'Lilac: Gentle Inspiration',
    description: 'Lilac blends the calm of blue and energy of red, much like violet, but with a softer, lighter feel. It inspires, soothes, and beautifully complements a range of palettes.',
    examples: 'Recommended for: Bedrooms, bathrooms, creative rooms. Benefits: Cheerful and tranquil.'
  },
  Peaches: {
    title: 'Peaches: Welcoming & Soft',
    description: 'Peach creates an inviting, restful mood that also feels fresh and unique. It warms up spaces without overpowering, making rooms cozy and stylish.',
    examples: 'Recommended for: Living rooms, kitchens, nurseries. Benefits: Feels fresh, nurturing, and light.'
  },
};

// Enhanced category explanation component props
const getDetailsFromExamples = (examples: string) => {
  // Split "Recommended for:" and "Benefits:" out
  let recommendedFor = '';
  let benefits = '';
  const recMatch = examples.match(/Recommended for:\s*(.*?)\.?\s*Benefits:/i);
  if (recMatch) {
    recommendedFor = recMatch[1];
    const benMatch = examples.match(/Benefits:\s*(.*)/i);
    if (benMatch) benefits = benMatch[1];
  } else {
    // fallback: use the full string as recommended for
    recommendedFor = examples;
  }
  return { recommendedFor, benefits };
};

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const cleaned = hex.replace('#', '');
  if (cleaned.length === 3) {
    const r = parseInt(cleaned[0] + cleaned[0], 16);
    const g = parseInt(cleaned[1] + cleaned[1], 16);
    const b = parseInt(cleaned[2] + cleaned[2], 16);
    return { r, g, b };
  }
  if (cleaned.length === 6) {
    const r = parseInt(cleaned.slice(0, 2), 16);
    const g = parseInt(cleaned.slice(2, 4), 16);
    const b = parseInt(cleaned.slice(4, 6), 16);
    return { r, g, b };
  }
  return null;
}
function getRelativeLuminance(hex: string): number {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;
  const srgb = [rgb.r / 255, rgb.g / 255, rgb.b / 255].map((v) =>
    v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  );
  return 0.2126 * (srgb[0] as number) + 0.7152 * (srgb[1] as number) + 0.0722 * (srgb[2] as number);
}
function isLightColor(hex: string): boolean {
  try {
    return getRelativeLuminance(hex) > 0.6; // threshold for light backgrounds
  } catch {
    return false;
  }
}

// Replace color type references with specific color name
function personalizeContent(text: string, colorName: string, colorType: string): string {
  if (!text || !colorName) return text;
  
  // Create a personalized version by replacing common patterns
  let personalized = text;
  
  // Get singular form (remove 's' from plural)
  const singularType = colorType.replace(/s$/, '');
  const lowerSingular = singularType.toLowerCase();
  const upperSingular = singularType.charAt(0).toUpperCase() + singularType.slice(1).toLowerCase();
  
  // Replace plural color types (e.g., "Reds", "Blues") with color name
  const pluralPattern = new RegExp(`\\b${colorType}\\b`, 'gi');
  personalized = personalized.replace(pluralPattern, colorName);
  
  // Replace capitalized singular forms (e.g., "Red", "Blue") with color name
  const upperSingularPattern = new RegExp(`\\b${upperSingular}\\b`, 'g');
  personalized = personalized.replace(upperSingularPattern, colorName);
  
  // Replace lowercase singular forms (e.g., "red", "blue") with color name
  const lowerSingularPattern = new RegExp(`\\b${lowerSingular}\\b`, 'g');
  personalized = personalized.replace(lowerSingularPattern, colorName);
  
  return personalized;
}

// Additional tips/pairings/finishes per category with sensible defaults
const CATEGORY_TIPS: Record<string, { tips: string[]; pairings: string[]; finishes: string[]; pairingCategories?: string[] }> = {
  DEFAULT: {
    tips: [
      'Test a sample on two walls to see how daylight and artificial light change the tone.',
      'Balance saturation by mixing one bold wall with three calmer walls for harmony.',
      'Use larger swatches on the wall to evaluate undertones throughout the day.'
    ],
    pairings: ['Crisp whites', 'Warm woods', 'Matte black accents'],
    finishes: ['Matte for walls', 'Eggshell for easy cleaning', 'Satin for kitchens/baths'],
    pairingCategories: ['Whites', 'Greys']
  },
  Greys: {
    tips: ['Warm greys soften contemporary spaces.', 'Layer textures (linen, wool) to avoid a flat look.'],
    pairings: ['Soft whites', 'Natural oak', 'Brushed nickel'],
    finishes: ['Matte or eggshell walls', 'Satin on trims'],
    pairingCategories: ['Reds', 'Yellows', 'Oranges', 'Blues']
  },
  Blues: {
    tips: ['Lighter blues enlarge small rooms visually.', 'Use deeper blues as an accent behind shelving or headboards.'],
    pairings: ['Bright white', 'Tan leather', 'Polished brass'],
    finishes: ['Matte for bedrooms', 'Satin in baths'],
    pairingCategories: ['Yellows', 'Oranges', 'Reds', 'Blacks']
  },
  Browns: {
    tips: ['Keep ceilings and trims light to prevent heaviness.', 'Combine with natural fibers for a grounded look.'],
    pairings: ['Creams', 'Olive greens', 'Aged brass'],
    finishes: ['Eggshell walls', 'Semi‑gloss trims'],
    pairingCategories: ['Blues', 'Greens', 'Purples', 'Blacks']
  },
  Reds: {
    tips: ['Use on a feature wall to energize without overpowering.', 'Dimmer switches help control intensity for evenings.'],
    pairings: ['Warm neutrals', 'Charcoal', 'Antique gold'],
    finishes: ['Eggshell walls', 'Satin for dining areas'],
    pairingCategories: ['Greens', 'Blues', 'Purples', 'Blacks']
  },
  Oranges: {
    tips: ['Great for social zones and playful nooks.', 'Balance with cool neutrals to avoid too much warmth.'],
    pairings: ['Soft grey', 'Off‑white', 'Natural cane'],
    finishes: ['Eggshell walls', 'Satin in kitchens'],
    pairingCategories: ['Blues', 'Purples', 'Greens', 'Blacks']
  },
  Yellows: {
    tips: ['Brighter yellows suit daylight rooms; choose buttery tones for low‑light spaces.', 'Pair with cooler trims to keep it fresh.'],
    pairings: ['Cool white', 'Mid‑grey', 'Light oak'],
    finishes: ['Matte in living spaces', 'Satin for kitchens'],
    pairingCategories: ['Purples', 'Blues', 'Greens', 'Blacks']
  },
  Greens: {
    tips: ['Olive and sage are calming for work areas.', 'Add indoor plants to echo the hue and enrich the scheme.'],
    pairings: ['Creams', 'Walnut', 'Matte black'],
    finishes: ['Matte/eggshell walls', 'Satin trims'],
    pairingCategories: ['Reds', 'Pinks', 'Oranges', 'Blacks']
  },
  Purples: {
    tips: ['Desaturate with neutrals to keep it sophisticated.', 'Lighter tints are spa‑like and restful.'],
    pairings: ['Soft grey', 'Warm beige', 'Brushed gold'],
    finishes: ['Matte in bedrooms', 'Satin accents'],
    pairingCategories: ['Yellows', 'Oranges', 'Greens', 'Blacks']
  },
  Pinks: {
    tips: ['Use earthy pinks for mature spaces; bright pinks for playful energy.', 'Pair with deep greens for modern contrast.'],
    pairings: ['Deep green', 'Cream', 'Light wood'],
    finishes: ['Matte walls', 'Eggshell hallways'],
    pairingCategories: ['Greens', 'Blues', 'Blacks', 'Yellows']
  },
  Beige: {
    tips: ['Match undertone (pink/green/grey) with floors and fabrics.', 'Introduce contrast through darker doors or trims.'],
    pairings: ['Charcoal', 'Crisp white', 'Warm wood'],
    finishes: ['Eggshell walls', 'Semi‑gloss trims'],
    pairingCategories: ['Blues', 'Greens', 'Purples', 'Reds']
  },
  Beiges: {
    tips: ['Keep ceilings bright to maintain airiness.', 'Mix textures (rattan, boucle) for depth.'],
    pairings: ['Off‑white', 'Black accents', 'Oak'],
    finishes: ['Eggshell walls', 'Semi‑gloss trims'],
    pairingCategories: ['Blues', 'Greens', 'Purples', 'Reds']
  },
  Neutrals: {
    tips: ['Layer two neighboring tones for subtle dimension.', 'Use art and textiles for color pops.'],
    pairings: ['Any accent color', 'Natural fibers', 'Stone'],
    finishes: ['Matte living areas', 'Satin for high‑touch zones'],
    pairingCategories: ['Blues', 'Greens', 'Purples', 'Reds']
  },
  Whites: {
    tips: ['Assess undertones (warm/cool) against your fixed elements.', 'Warmer whites feel cozy; cooler whites feel crisp.'],
    pairings: ['Soft greys', 'Light woods', 'Matte black'],
    finishes: ['Matte ceilings', 'Semi‑gloss trims'],
    pairingCategories: ['Blues', 'Greens', 'Purples', 'Reds']
  },
  Blacks: {
    tips: ['Balance with ample light and light furnishings.', 'Great for doors and accent walls to ground schemes.'],
    pairings: ['Warm white', 'Oak', 'Brass'],
    finishes: ['Matte walls for depth', 'High‑gloss accents'],
    pairingCategories: ['Whites', 'Yellows', 'Oranges', 'Reds']
  },
  Metallics: {
    tips: ['Use sparingly on feature areas for sparkle.', 'Coordinate metal tones across hardware and lighting.'],
    pairings: ['Charcoal', 'Deep navy', 'Ivory'],
    finishes: ['Special effect coats', 'Satin trims'],
    pairingCategories: ['Greys', 'Blues', 'Whites']
  },
  'Earth Tones': {
    tips: ['Terracotta pairs well with textured plaster.', 'Keep trims neutral for a natural feel.'],
    pairings: ['Creams', 'Olives', 'Muted blues'],
    finishes: ['Eggshell walls', 'Satin doors'],
    pairingCategories: ['Creams', 'Greens', 'Blues']
  },
  Creams: {
    tips: ['Use with north‑facing rooms to add warmth.', 'Contrast with darker metals for definition.'],
    pairings: ['Bronze', 'Dark wood', 'Deep green'],
    finishes: ['Eggshell walls', 'Semi‑gloss trims'],
    pairingCategories: ['Blues', 'Greens', 'Purples', 'Reds']
  },
  Violet: {
    tips: ['Anchor with neutrals to avoid over‑sweetness.', 'Great for calm corners and reading nooks.'],
    pairings: ['Grey', 'Cream', 'Walnut'],
    finishes: ['Matte walls', 'Satin accents'],
    pairingCategories: ['Yellows', 'Oranges', 'Greens', 'Blacks']
  },
  Violets: {
    tips: ['Use mid‑tones for creative zones; pale tints for serenity.', 'Pair with metallics to elevate.'],
    pairings: ['Brass', 'Ivory', 'Charcoal'],
    finishes: ['Matte/eggshell walls'],
    pairingCategories: ['Yellows', 'Oranges', 'Greens', 'Blues']
  },
  Lilac: {
    tips: ['Works beautifully with natural light.', 'Add deeper plums for contrast.'],
    pairings: ['Soft grey', 'Warm white', 'Blush'],
    finishes: ['Matte bedrooms', 'Satin baths'],
    pairingCategories: ['Greens', 'Yellows', 'Oranges', 'Blacks']
  },
  Peaches: {
    tips: ['Keep trims white for a fresh feel.', 'Great for cozy dining corners.'],
    pairings: ['Cream', 'Warm grey', 'Light oak'],
    finishes: ['Eggshell walls'],
    pairingCategories: ['Blues', 'Greens', 'Purples', 'Blacks']
  },
  'Blue-Greens': {
    tips: ['Ideal for biophilic schemes with plants.', 'Use lighter tints for coastal moods.'],
    pairings: ['Sand beige', 'Warm white', 'Natural rattan'],
    finishes: ['Matte/eggshell walls'],
    pairingCategories: ['Reds', 'Oranges', 'Yellows', 'Blacks']
  },
  'Yellow-Greens': {
    tips: ['Balance vibrancy with neutral floors.', 'Excellent for energizing entryways.'],
    pairings: ['Soft grey', 'White oak', 'Black accents'],
    finishes: ['Eggshell walls'],
    pairingCategories: ['Reds', 'Purples', 'Blacks', 'Blues']
  },
  'Neutrals: Browns & Greys': {
    tips: ['Mix both families to achieve balance (warm + cool).', 'Use textiles to bridge undertones.'],
    pairings: ['Beige', 'Slate', 'Warm wood'],
    finishes: ['Matte walls', 'Semi‑gloss trims'],
    pairingCategories: ['Blues', 'Greens', 'Purples', 'Reds']
  },
  Golds: {
    tips: ['Use on smaller walls or details for luxe impact.', 'Balance with matte textures to avoid glare.'],
    pairings: ['Deep green', 'Charcoal', 'Ivory'],
    finishes: ['Special effect metallic', 'Satin trims'],
    pairingCategories: ['Blues', 'Purples', 'Blacks', 'Reds']
  }
};

// FAQ content per category
// Brand information content
const BRAND_INFO: Record<string, { intro: string; sections: Array<{ heading: string; content: string }> }> = {
  'asian-paints': {
    intro: 'Asian Paints is India\'s largest and most trusted paint company, offering an extensive palette of over 1,800 shades and innovative color solutions for every space.',
    sections: [
      {
        heading: 'Heritage of Excellence',
        content: 'Founded in 1942, Asian Paints has been at the forefront of India\'s paint industry for over eight decades. With a presence in 15 countries and a commitment to innovation, Asian Paints delivers world-class quality, durability, and an unmatched range of colors that transform homes and commercial spaces alike.'
      },
      {
        heading: 'Comprehensive Shade Range',
        content: 'Asian Paints offers one of the most diverse color portfolios in the industry, spanning from timeless neutrals to bold statement hues. Their scientifically developed shades are categorized into families—Greys, Blues, Greens, Reds, Yellows, Oranges, Browns, Purples, and Pinks—ensuring you find the perfect match for every room, mood, and design vision.'
      },
      {
        heading: 'Premium Product Lines',
        content: 'Asian Paints features multiple product ranges tailored to different needs: Royale for luxury interiors with silk and matt finishes, Apcolite for long-lasting protection, Tractor Emulsion for economical coverage, and specialized products like Apex Ultima for weather-resistant exteriors. Each line is backed by rigorous testing and eco-friendly formulations.'
      },
      {
        heading: 'Innovation & Technology',
        content: 'Asian Paints invests heavily in R&D, creating low-VOC, washable, and anti-bacterial paints. Their Color Next forecast predicts global color trends, helping homeowners stay ahead. With digital tools like the Asian Paints Color Visualizer and in-store tinting services, choosing and customizing your perfect shade has never been easier.'
      },
      {
        heading: 'Trusted by Millions',
        content: 'Asian Paints is the preferred choice for millions of Indian households and leading architects. Their paints are known for superior coverage, fade resistance, and vibrant color retention. Whether you\'re repainting a single room or undertaking a full home makeover, Asian Paints delivers reliability, beauty, and lasting value.'
      }
    ]
  },
  'nerolac': {
    intro: 'Nerolac Paints, a trusted name since 1920, offers premium quality paints with cutting-edge technology and a vibrant range of over 1,500 shades for every aesthetic.',
    sections: [
      {
        heading: 'A Legacy of Trust',
        content: 'Kansai Nerolac Paints Limited has been a household name in India for over a century. With a strong focus on innovation, quality, and customer satisfaction, Nerolac has earned the trust of millions, becoming synonymous with durability, finish quality, and a stunning spectrum of colors.'
      },
      {
        heading: 'Diverse Color Palette',
        content: 'Nerolac\'s extensive shade card features over 1,500 colors across categories like Reds, Blues, Greens, Yellows, Purples, Pinks, Golds, Neutrals, and more. From sophisticated neutrals to bold statement shades, Nerolac ensures every customer finds their perfect hue for residential, commercial, and industrial applications.'
      },
      {
        heading: 'Advanced Product Offerings',
        content: 'Nerolac offers premium ranges including Beauty Gold for washable luxury finishes, Excel Total for all-weather protection, Impressions for designer effects, and Suraksha Shaktee for anti-bacterial properties. Their specialized wood finishes and waterproofing solutions ensure comprehensive coverage for all surfaces.'
      },
      {
        heading: 'Sustainability & Safety',
        content: 'Nerolac is committed to eco-friendly practices with low-VOC formulations, lead-free paints, and sustainable manufacturing. Their products meet international safety standards while delivering exceptional performance, ensuring homes are beautiful, safe, and environmentally responsible.'
      },
      {
        heading: 'Customer-Centric Innovation',
        content: 'Nerolac provides expert color consultation, in-store shade matching, and digital visualization tools to help customers make confident decisions. With nationwide availability, professional-grade quality, and a reputation built over generations, Nerolac continues to set benchmarks in the Indian paint industry.'
      }
    ]
  },
  'berger': {
    intro: 'Berger Paints, established in 1760, is one of the world\'s oldest paint companies, delivering premium quality and a stunning range of over 1,200 shades with unmatched expertise.',
    sections: [
      {
        heading: 'Global Heritage, Local Expertise',
        content: 'Berger Paints has over 260 years of global experience and has been a trusted name in India since 1923. Combining international standards with local insights, Berger offers paints that withstand India\'s diverse climatic conditions while delivering world-class aesthetics and durability.'
      },
      {
        heading: 'Extensive Shade Selection',
        content: 'Berger\'s color palette spans over 1,200 shades, organized into categories like Reds, Blues, Greens, Yellows, Violets, Earth Tones, Greys, Browns, and Whites. Their scientifically curated collections ensure seamless coordination and inspire creativity for every interior and exterior project.'
      },
      {
        heading: 'Premium & Specialized Products',
        content: 'Berger offers diverse product lines including Silk Luxury Emulsion for elegant interiors, WeatherCoat for long-lasting exterior protection, Easy Clean for stain-resistant walls, and Berger Express Painting for quick, professional finishes. Their wood and metal coatings provide comprehensive solutions for all surfaces.'
      },
      {
        heading: 'Innovation & Quality Assurance',
        content: 'Berger invests in advanced research, creating low-odor, quick-dry, and anti-fungal formulations. Their paints undergo stringent quality checks and are tested for color fastness, coverage, and longevity. Berger\'s commitment to excellence ensures every can delivers consistent, superior results.'
      },
      {
        heading: 'Trusted Nationwide',
        content: 'With a vast dealer network, expert color consultants, and professional painting services, Berger Paints makes home transformation accessible and hassle-free. Millions of satisfied customers across India trust Berger for projects ranging from residential repaints to large-scale commercial developments.'
      }
    ]
  },
  'jsw': {
    intro: 'JSW Paints brings the trusted JSW Group legacy to the paint industry, offering eco-friendly, high-performance coatings with a curated range of beautiful shades.',
    sections: [
      {
        heading: 'A New Standard in Paints',
        content: 'Launched by the renowned JSW Group, JSW Paints represents a fresh, innovative approach to the Indian paint market. Backed by decades of manufacturing excellence, JSW Paints combines cutting-edge technology with sustainability, delivering premium-quality paints that are safe, durable, and beautiful.'
      },
      {
        heading: 'Thoughtfully Curated Colors',
        content: 'JSW Paints offers a carefully selected palette of over 1,200 shades across categories including Oranges, Blues, Whites, Creams, Reds, Yellows, Greens, Neutrals, Pinks, and Greys. Each color is designed to complement modern Indian homes, blending international trends with local sensibilities for timeless appeal.'
      },
      {
        heading: 'Eco-Friendly & Safe',
        content: 'JSW Paints is India\'s most environmentally responsible paint brand, offering low-VOC, lead-free, and heavy-metal-free formulations. Their manufacturing processes prioritize sustainability without compromising on performance, ensuring your home is healthy, safe, and beautiful.'
      },
      {
        heading: 'High-Performance Products',
        content: 'JSW offers premium ranges like JSW Shyne for superior sheen and durability, JSW Primer for excellent adhesion, and specialized exterior coatings for all-weather protection. Their paints are engineered for superior coverage, washability, and fade resistance, ensuring long-lasting brilliance.'
      },
      {
        heading: 'Future-Ready Innovation',
        content: 'JSW Paints leverages AI-driven color matching, digital visualization tools, and expert consultation services to simplify color selection. With a growing pan-India network and a customer-first approach, JSW Paints is redefining the painting experience for the modern homeowner.'
      }
    ]
  },
  'birla-opus': {
    intro: 'Birla Opus by Birla White offers premium, curated paint shades with exceptional finish quality, backed by the trusted Aditya Birla Group legacy.',
    sections: [
      {
        heading: 'Trusted Legacy',
        content: 'Birla Opus is part of the prestigious Aditya Birla Group, known for world-class building materials. Leveraging decades of expertise in construction and surface solutions, Birla Opus delivers paints that combine aesthetic beauty with structural integrity and lasting performance.'
      },
      {
        heading: 'Curated Color Collections',
        content: 'Birla Opus features a refined palette of over 1,000 shades across categories like Whites, Yellows, Oranges, Reds, Purples, Blues, Blue-Greens, Greens, and Yellow-Greens. Each shade is thoughtfully developed to harmonize with modern architecture and interior design trends, ensuring spaces feel cohesive and inspiring.'
      },
      {
        heading: 'Superior Finish Quality',
        content: 'Birla Opus paints are formulated for exceptional smoothness, coverage, and sheen consistency. Their products include premium emulsions, luxury matt finishes, and specialized coatings that deliver flawless results with minimal effort, making professional-quality painting accessible to all.'
      },
      {
        heading: 'Innovation & Sustainability',
        content: 'Birla Opus prioritizes eco-conscious manufacturing with low-emission formulas and sustainable practices. Their paints are tested for safety, indoor air quality, and environmental impact, ensuring your home is not only beautiful but also healthy and responsible.'
      },
      {
        heading: 'Expert Support',
        content: 'Birla Opus provides comprehensive support through color consultants, application guides, and digital tools. Their nationwide network ensures easy access to products and professional services, making your painting project smooth from selection to final finish.'
      }
    ]
  },
  'ral': {
    intro: 'RAL is the international standard for color matching, offering a precise, universally recognized palette used by designers, architects, and industries worldwide.',
    sections: [
      {
        heading: 'Global Color Standard',
        content: 'RAL (Reichs-Ausschuss für Lieferbedingungen) has been the global benchmark for color specification since 1927. With consistent, standardized shades, RAL ensures exact color matching across materials, industries, and borders, making it the preferred choice for professionals worldwide.'
      },
      {
        heading: 'Comprehensive Shade System',
        content: 'The RAL Classic collection features over 200 precisely defined shades across Yellows, Oranges, Reds, Pinks, Purples, Blues, Greens, Browns, Greys, Beiges, Whites, and Blacks. Each color is assigned a unique four-digit code (e.g., RAL 1002), ensuring accurate communication and reproduction anywhere in the world.'
      },
      {
        heading: 'Versatility Across Industries',
        content: 'RAL colors are used in architecture, automotive, manufacturing, signage, and industrial design. From powder coating to paint matching, RAL ensures consistency and reliability, making it indispensable for projects requiring precise color coordination across multiple suppliers and materials.'
      },
      {
        heading: 'Trusted Precision',
        content: 'RAL shades are rigorously tested and documented, with standardized formulations that ensure the same color looks identical whether applied in Mumbai or Munich. This precision eliminates guesswork, reduces errors, and streamlines large-scale projects with multiple stakeholders.'
      },
      {
        heading: 'Ideal for Professional Projects',
        content: 'Architects, designers, and contractors rely on RAL for its unambiguous color specification. Whether you\'re matching corporate branding, coordinating building exteriors, or selecting feature wall colors, RAL provides the clarity, consistency, and professionalism your project demands.'
      }
    ]
  },
  'ncs': {
    intro: 'NCS (Natural Color System) is a scientifically based color system used globally for precise color definition, communication, and matching across all industries.',
    sections: [
      {
        heading: 'Science-Based Color System',
        content: 'The Natural Color System (NCS) is built on how the human eye perceives color, making it intuitive and universally applicable. Developed in Sweden and adopted worldwide, NCS describes colors based on their resemblance to six elementary colors: white, black, yellow, red, blue, and green.'
      },
      {
        heading: 'Extensive Color Range',
        content: 'NCS offers over 1,950 standardized shades spanning Greys, Blues, Greens, Reds, Oranges, Yellows, Purples, Pinks, and Browns. Each color is defined by a unique notation (e.g., NCS S 2020-B10G), ensuring exact specification and matching across paints, textiles, plastics, and digital media.'
      },
      {
        heading: 'Universal Application',
        content: 'NCS is used by designers, architects, and manufacturers worldwide for interior design, product development, and industrial applications. Its logical structure allows seamless communication between creative professionals and manufacturers, ensuring vision becomes reality without color discrepancies.'
      },
      {
        heading: 'Precision & Consistency',
        content: 'Every NCS color is defined by its blackness, chromaticness, and hue, creating a three-dimensional color space that\'s scientifically accurate. This precision ensures the same NCS code produces identical colors whether specified in paint, fabric, or digital design software.'
      },
      {
        heading: 'Professional Standard',
        content: 'NCS is the go-to system for high-stakes projects requiring exact color coordination across multiple materials and suppliers. From luxury hotels to corporate branding, NCS delivers the accuracy, reliability, and international recognition that professionals demand.'
      }
    ]
  }
};

const CATEGORY_FAQS: Record<string, Array<{ q: string; a: string }>> = {
  DEFAULT: [
    { q: 'How do I choose the right paint finish?', a: 'The finish depends on the room and traffic. Matte works for low-traffic areas like bedrooms, eggshell for living rooms, and satin or semi-gloss for kitchens and bathrooms where cleaning is frequent.' },
    { q: 'Will this color look different in my room?', a: 'Yes. Lighting (natural vs artificial), surrounding colors, and room size all affect how a paint color appears. Always test a sample on multiple walls before committing.' },
    { q: 'How many coats will I need?', a: 'Typically 2 coats provide full coverage. Darker or bold colors may need a primer and 2-3 coats for even results.' },
    { q: 'Can I use this color on all walls?', a: 'You can, but consider balance. Using one color on all walls creates cohesion, while an accent wall adds visual interest. Test and see what feels right for your space.' },
    { q: 'How do I maintain painted walls?', a: 'Dust regularly with a soft cloth. For marks, use a damp sponge with mild soap. Avoid abrasive cleaners, especially on matte finishes.' }
  ],
  Greys: [
    { q: 'Do grey walls make a room feel cold?', a: 'Not necessarily. Warm greys with beige or taupe undertones feel cozy, while cool greys suit modern styles. Layer textures like wool and linen to add warmth.' },
    { q: 'What colors pair well with grey walls?', a: 'Whites, blues, browns, and blush pinks work beautifully. Grey is a versatile neutral that complements almost any accent color.' },
    { q: 'Is grey suitable for small rooms?', a: 'Yes! Light to mid-tone greys can make small rooms feel larger and more open, especially when paired with good lighting.' },
    { q: 'How do I avoid grey looking flat?', a: 'Add depth with varied textures (velvet, wood, metal) and layered lighting. Mix warm and cool tones for dimension.' },
    { q: 'Which grey finish is best for living rooms?', a: 'Eggshell or matte finishes work well. They hide imperfections while still being easy to clean.' }
  ],
  Blues: [
    { q: 'Are blue walls calming?', a: 'Yes, blues are psychologically calming and help reduce stress. Light blues are especially soothing in bedrooms and bathrooms.' },
    { q: 'Will blue make my room look smaller?', a: 'Light blues can actually make rooms feel more spacious. Darker blues create coziness, ideal for accent walls or larger rooms.' },
    { q: 'What trim color works with blue walls?', a: 'Crisp white trim creates a fresh, coastal look. Cream or off-white softens the contrast for a more traditional feel.' },
    { q: 'Can I use blue in north-facing rooms?', a: 'Yes, but choose warmer blues with grey or green undertones to counteract the cool natural light.' },
    { q: 'Which rooms suit blue paint?', a: 'Blue is ideal for bedrooms (promotes sleep), bathrooms (spa-like), studies (aids focus), and living rooms (calming).' }
  ],
  Browns: [
    { q: 'Do brown walls make rooms feel dark?', a: 'They can if the room lacks light. Balance brown walls with light ceilings, white trim, and ample lighting to keep the space bright.' },
    { q: 'What colors complement brown walls?', a: 'Creams, beiges, olives, and soft blues pair well. Metallics like brass and copper add warmth and elegance.' },
    { q: 'Is brown good for modern interiors?', a: 'Absolutely! Warm browns, taupes, and chocolate tones add sophistication to contemporary spaces when paired with clean lines.' },
    { q: 'Which rooms work best with brown?', a: 'Living rooms, dens, home offices, and dining areas benefit from brown\'s grounding, cozy qualities.' },
    { q: 'How do I style brown walls?', a: 'Use natural materials (wood, leather, linen), indoor plants, and warm lighting to enhance the earthy, organic feel.' }
  ],
  Reds: [
    { q: 'Is red too bold for walls?', a: 'Red can be bold, but used strategically (accent wall, dining room) it energizes and inspires conversation. Balance with neutral furnishings.' },
    { q: 'Does red paint increase energy levels?', a: 'Yes, red is stimulating and can increase heart rate and appetite—ideal for dining and social spaces but less so for bedrooms.' },
    { q: 'What colors tone down red walls?', a: 'Pair with warm neutrals (beige, cream), charcoal, or soft whites to balance intensity.' },
    { q: 'Can red work in small spaces?', a: 'Yes, as an accent wall. Full red in small rooms can feel overwhelming; use sparingly for impact.' },
    { q: 'Which finish is best for red walls?', a: 'Eggshell or satin finishes. They highlight the richness without glare and are easier to maintain.' }
  ],
  Oranges: [
    { q: 'Is orange paint too bright?', a: 'Softer oranges (peach, terracotta) are versatile and warm. Bright oranges suit playful, creative spaces like kids\' rooms or studios.' },
    { q: 'What rooms suit orange walls?', a: 'Kitchens, playrooms, creative studios, and social areas. Orange stimulates conversation and appetite.' },
    { q: 'How do I balance orange walls?', a: 'Use cool neutrals (soft grey, white) and natural materials to prevent the space from feeling too warm.' },
    { q: 'Does orange go out of style?', a: 'Softer, earthy oranges (terracotta, rust) are timeless. Bright neon tones trend in and out, so use them as accents.' },
    { q: 'Can I use orange in north-facing rooms?', a: 'Yes! Orange adds warmth to cool, north-facing spaces and counteracts the lack of direct sunlight.' }
  ],
  Yellows: [
    { q: 'Do yellow walls make rooms feel bigger?', a: 'Light, buttery yellows reflect light and can make small rooms feel more open and airy.' },
    { q: 'Is yellow good for dark rooms?', a: 'Yes! Yellow brightens dim spaces and mimics natural sunlight, making them feel more inviting.' },
    { q: 'What colors pair with yellow walls?', a: 'Cool greys, whites, and soft blues balance yellow\'s warmth. Navy or charcoal adds modern contrast.' },
    { q: 'Can yellow walls be calming?', a: 'Soft, muted yellows can be calming. Bright yellows are energizing, so choose the tone based on room purpose.' },
    { q: 'Which rooms suit yellow?', a: 'Kitchens, breakfast nooks, children\'s rooms, and hallways. It\'s uplifting and welcoming.' }
  ],
  Greens: [
    { q: 'Are green walls relaxing?', a: 'Yes, green is associated with nature and tranquility. It reduces stress and promotes focus, ideal for bedrooms and offices.' },
    { q: 'What shades of green work for interiors?', a: 'Sage, olive, and forest greens are versatile. Bright greens energize; soft greens soothe.' },
    { q: 'Can I use green in bathrooms?', a: 'Absolutely. Green with white fixtures creates a spa-like, fresh feel. Use satin finishes for moisture resistance.' },
    { q: 'What colors complement green walls?', a: 'Creams, beiges, warm woods, and matte blacks. Blush pink or terracotta adds warmth.' },
    { q: 'Is green suitable for modern homes?', a: 'Yes! Deep greens (emerald, forest) add luxury and sophistication to contemporary interiors.' }
  ],
  Purples: [
    { q: 'Do purple walls suit adults?', a: 'Yes! Muted purples (lavender, mauve) are calming and sophisticated. Deep purples add drama to dining or accent walls.' },
    { q: 'Is purple good for creativity?', a: 'Purple is linked to creativity and introspection, making it ideal for studios, meditation rooms, and bedrooms.' },
    { q: 'What colors pair with purple walls?', a: 'Soft greys, creams, gold accents, and whites. Charcoal or black adds modern contrast.' },
    { q: 'Can purple make a room feel smaller?', a: 'Dark purples can, but light lavenders and lilacs open up spaces and feel airy.' },
    { q: 'Which finish works for purple walls?', a: 'Matte for bedrooms, satin for bathrooms. Avoid high gloss unless you want a bold, reflective look.' }
  ],
  Pinks: [
    { q: 'Is pink paint only for kids\' rooms?', a: 'Not at all! Earthy, muted pinks (blush, dusty rose) are sophisticated and work beautifully in adult bedrooms and living spaces.' },
    { q: 'What colors go with pink walls?', a: 'Deep greens, greys, creams, and warm woods. Navy or charcoal adds modern contrast.' },
    { q: 'Can pink walls feel calming?', a: 'Yes, soft pinks are nurturing and calming, ideal for bedrooms. Bright pinks are playful and energizing.' },
    { q: 'How do I style pink walls for adults?', a: 'Pair with natural textures (linen, wood, rattan) and muted tones to keep it sophisticated and grounded.' },
    { q: 'Which rooms suit pink?', a: 'Bedrooms, bathrooms, dressing rooms, and creative spaces. It adds warmth and a touch of whimsy.' }
  ],
  Beige: [
    { q: 'Is beige boring?', a: 'Not when styled well! Beige provides a warm, timeless backdrop that lets furniture, art, and textures shine.' },
    { q: 'What undertones should I look for in beige?', a: 'Match beige undertones (pink, green, grey) with your flooring and fixed elements for harmony.' },
    { q: 'Can beige work in modern homes?', a: 'Yes! Pair with black, charcoal, or brass accents for a contemporary, elevated look.' },
    { q: 'What colors pair with beige walls?', a: 'Whites, greys, warm woods, and deep greens. Almost any accent color works with beige.' },
    { q: 'Which rooms suit beige?', a: 'Any room! It\'s universally versatile—living rooms, bedrooms, dining rooms, and offices.' }
  ],
  Beiges: [
    { q: 'How do I keep beige walls from looking flat?', a: 'Layer textures (boucle, rattan, velvet) and add contrast with darker furniture or trims.' },
    { q: 'Is beige still trendy?', a: 'Yes, warm neutrals are timeless. Beige provides flexibility and longevity compared to trend-driven colors.' },
    { q: 'What lighting works with beige?', a: 'Warm LED bulbs enhance beige\'s coziness. Avoid cool white light, which can make beige look dull.' },
    { q: 'Can I use beige in small rooms?', a: 'Yes! Light beiges reflect light and make small spaces feel larger and more open.' },
    { q: 'What finish is best for beige walls?', a: 'Eggshell or satin. They\'re forgiving, easy to clean, and don\'t highlight imperfections.' }
  ],
  Neutrals: [
    { q: 'What defines a neutral color?', a: 'Neutrals include whites, beiges, greys, taupes, and soft browns—colors that provide a calm backdrop for other elements.' },
    { q: 'Are neutrals boring?', a: 'Not at all! Neutrals create a sophisticated, timeless canvas that adapts to changing décor and trends.' },
    { q: 'Can I mix warm and cool neutrals?', a: 'Yes, but balance them carefully. Use textiles and accessories to bridge warm and cool tones harmoniously.' },
    { q: 'What rooms suit neutral walls?', a: 'Any room! Neutrals are universally versatile and work in living rooms, bedrooms, kitchens, and offices.' },
    { q: 'How do I add interest to neutral walls?', a: 'Use varied textures (wood, metal, fabric), layered lighting, and bold artwork or statement furniture.' }
  ],
  Whites: [
    { q: 'Will white walls look sterile?', a: 'Not if you choose the right undertone (warm, cool, or neutral) and layer textures and colors through décor.' },
    { q: 'How do I choose the right white?', a: 'Test samples in your lighting. Warm whites feel cozy; cool whites feel crisp. Match to your fixed elements.' },
    { q: 'Are white walls hard to maintain?', a: 'They show marks more, but wipeable finishes (eggshell, satin) make cleaning easier. Touch-ups are simple.' },
    { q: 'Do white walls make rooms look bigger?', a: 'Yes! White reflects light and visually expands small spaces, making them feel airy and open.' },
    { q: 'Which rooms suit white walls?', a: 'Any room! White is timeless and versatile—kitchens, bathrooms, bedrooms, living rooms, and offices.' }
  ],
  Creams: [
    { q: 'Is cream warmer than white?', a: 'Yes, cream has warm undertones that create a cozy, inviting feel compared to crisp whites.' },
    { q: 'Can cream walls look dated?', a: 'Not if styled with modern furnishings and good lighting. Cream is timeless and pairs with current trends.' },
    { q: 'What colors complement cream walls?', a: 'Deep greens, bronzes, warm woods, and charcoal. Almost any accent color works with cream.' },
    { q: 'Which rooms suit cream?', a: 'Any room—living rooms, bedrooms, kitchens, and offices. It\'s universally flattering.' },
    { q: 'How do I prevent cream from looking yellow?', a: 'Choose creams with neutral undertones and use warm LED lighting (not overly yellow bulbs).' }
  ],
  Golds: [
    { q: 'Are gold walls too bold?', a: 'Gold is luxurious but best used sparingly—on feature walls, accents, or small powder rooms for maximum impact.' },
    { q: 'What rooms suit gold walls?', a: 'Dining rooms, powder rooms, feature walls in living rooms, or entryways for a grand statement.' },
    { q: 'What colors pair with gold walls?', a: 'Deep greens, charcoals, ivories, and blacks. Keep surrounding tones muted to let gold shine.' },
    { q: 'Which finish works for gold walls?', a: 'Metallic or satin finishes enhance the shimmer. Avoid matte, which dulls the effect.' },
    { q: 'Can gold go out of style?', a: 'Gold has been used for centuries and remains a symbol of luxury. Use thoughtfully for lasting appeal.' }
  ]
};

const BasicVisualiserPage: React.FC = () => {
  const router = useRouter();
  const { brand: brandParam, category: categoryParam, color: colorParam } = router.query;
  const [colorDatabase, setColorDatabase] = useState<any>(null);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedColor, setSelectedColor] = useState<any>(null);
  const [colorPage, setColorPage] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [pairingColorsSeed, setPairingColorsSeed] = useState<number>(Date.now());

  // For category scroll arrows
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const [showPrevArrow, setShowPrevArrow] = useState(false);
  const [showNextArrow, setShowNextArrow] = useState(false);

  // For brand scroll arrows
  const brandScrollRef = useRef<HTMLDivElement>(null);
  const [showBrandPrevArrow, setShowBrandPrevArrow] = useState(false);
  const [showBrandNextArrow, setShowBrandNextArrow] = useState(false);

  // For dynamic mobile layout
  const kitchenRef = useRef<HTMLDivElement>(null);
  const [isMobileLayoutFixed, setIsMobileLayoutFixed] = useState(true);

  // Load brand JSON dynamically
  useEffect(() => {
    const loadBrand = async () => {
      const brandId = typeof brandParam === 'string' && BRAND_CONFIG.some(b => b.id === brandParam) ? brandParam : BRAND_CONFIG[0].id;
      setSelectedBrand(brandId);
      const brandConfig = BRAND_CONFIG.find(b => b.id === brandId);
      if (!brandConfig) return;
      try {
        const colorData = await import(`@/data/colors/${brandConfig.fileName}`);
        setColorDatabase(colorData.default);
      } catch (e) {
        setColorDatabase(null);
      }
    };
    loadBrand();
  }, [brandParam]);

  // Set category and color from URL or fallback
  useEffect(() => {
    if (!colorDatabase) return;
    const categories = Object.keys(colorDatabase.colorTypes);
    const cat = typeof categoryParam === 'string' && categories.includes(categoryParam) ? categoryParam : categories[0];
    
    // Only reset page if category changes
    const categoryChanged = selectedCategory !== cat;
    if (categoryChanged) {
      setColorPage(0);
      setPairingColorsSeed(Date.now()); // Reset pairing colors when category changes
    }
    
    setSelectedCategory(cat);
    const colors = colorDatabase.colorTypes[cat] || [];
    let colorObj = null;
    if (typeof colorParam === 'string') {
      // Find the color by matching the pattern: colorName-colorCode
      // We need to find where the color name ends and color code begins
      for (const color of colors) {
        const expectedSlug = `${toKebabCase(color.colorName)}-${color.colorCode.replace(/\s+/g, '-')}`;
        if (colorParam === expectedSlug) {
          colorObj = color;
          break;
        }
      }
    }
    if (!colorObj) colorObj = colors[0];
    setSelectedColor(colorObj);
  }, [colorDatabase, categoryParam, colorParam, brandParam, selectedBrand, selectedCategory]);

  // Handle brand/category/color selection
  const handleBrandClick = async (id: string) => {
    if (id === selectedBrand) return; // Don't switch if already selected
    
    // Load the new brand data
    const brandConfig = BRAND_CONFIG.find(b => b.id === id);
    if (!brandConfig) return;
    
    try {
      const colorData = await import(`@/data/colors/${brandConfig.fileName}`);
      const newColorDatabase = colorData.default;
      const categories = Object.keys(newColorDatabase.colorTypes);
      if (categories.length > 0) {
        const firstCategory = categories[0];
        const colors = newColorDatabase.colorTypes[firstCategory];
        if (colors && colors.length > 0) {
          const firstColor = colors[0];
          const cleanColorCode = firstColor.colorCode.replace(/\s+/g, '-');
          const colorSlug = `${toKebabCase(firstColor.colorName)}-${cleanColorCode}`;
          router.push(`/colour-visualiser/basic/${id}/${firstCategory}/${colorSlug}`, undefined, { scroll: false });
        }
      }
    } catch (error) {
      console.error('Error loading brand data:', error);
    }
  };
  const handleCategoryClick = (cat: string) => {
    if (!colorDatabase) return;
    const colors = colorDatabase.colorTypes[cat] || [];
    if (colors.length > 0) {
      const cleanColorCode = colors[0].colorCode.replace(/\s+/g, '-');
      router.push(`/colour-visualiser/basic/${selectedBrand}/${cat}/${toKebabCase(colors[0].colorName)}-${cleanColorCode}`, undefined, { scroll: false });
    }
  };
  const handleColorClick = (color: any) => {
    const cleanColorCode = color.colorCode.replace(/\s+/g, '-');
    router.push(`/colour-visualiser/basic/${selectedBrand}/${selectedCategory}/${toKebabCase(color.colorName)}-${cleanColorCode}`, undefined, { scroll: false });
  };
  // Pagination
  const colors = colorDatabase && selectedCategory ? colorDatabase.colorTypes[selectedCategory] || [] : [];
  const totalPages = Math.ceil(colors.length / PAGE_SIZE);
  const paginatedColors = colors.slice(colorPage * PAGE_SIZE, (colorPage + 1) * PAGE_SIZE);
  const handleNextPage = () => { if (colorPage < totalPages - 1) setColorPage(colorPage + 1); };
  const handlePrevPage = () => { if (colorPage > 0) setColorPage(colorPage - 1); };

  // Apply color to room images using SVG masks
  useEffect(() => {
    if (!selectedColor) return;
    
    // Update SVG overlays for each room
    Object.entries(ROOM_IMAGES).forEach(([roomType, imageSrc]) => {
      const roomContainer = document.querySelector(`[data-room="${roomType}"]`);
      if (roomContainer) {
        const svgOverlay = roomContainer.querySelector('.svg-overlay');
        if (svgOverlay) {
          const wallPath = svgOverlay.querySelector('.wall-path');
          if (wallPath) {
            wallPath.setAttribute('fill', selectedColor.colorHex);
          }
        }
      }
    });
  }, [selectedColor]);

  // Generate title and h1
  const pageTitle = selectedColor && selectedBrand 
    ? `${toSentenceCase(selectedColor.colorName)} | Colour Code ${selectedColor.colorCode} | ${toSentenceCase(BRAND_CONFIG.find(b => b.id === selectedBrand)?.name || '')} | Home Glazer`
    : 'Basic Color Visualiser | Home Glazer';

  // Check for overflow in category scroll
  useEffect(() => {
    const checkOverflow = () => {
      const el = categoryScrollRef.current;
      if (el) {
        setShowPrevArrow(el.scrollLeft > 0);
        setShowNextArrow(el.scrollWidth > el.clientWidth + el.scrollLeft + 1);
      }
    };
    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    if (categoryScrollRef.current) {
      categoryScrollRef.current.addEventListener('scroll', checkOverflow);
    }
    return () => {
      window.removeEventListener('resize', checkOverflow);
      if (categoryScrollRef.current) {
        categoryScrollRef.current.removeEventListener('scroll', checkOverflow);
      }
    };
  }, [colorDatabase, selectedBrand]);

  // Check for overflow in brand scroll
  useEffect(() => {
    const checkBrandOverflow = () => {
      const el = brandScrollRef.current;
      if (el) {
        setShowBrandPrevArrow(el.scrollLeft > 0);
        setShowBrandNextArrow(el.scrollWidth > el.clientWidth + el.scrollLeft + 1);
      }
    };
    checkBrandOverflow();
    window.addEventListener('resize', checkBrandOverflow);
    if (brandScrollRef.current) {
      brandScrollRef.current.addEventListener('scroll', checkBrandOverflow);
    }
    return () => {
      window.removeEventListener('resize', checkBrandOverflow);
      if (brandScrollRef.current) {
        brandScrollRef.current.removeEventListener('scroll', checkBrandOverflow);
      }
    };
  }, []);

  // Handle dynamic mobile layout based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth > 768) return; // Only for mobile/tablet
      
      const kitchenElement = kitchenRef.current;
      if (!kitchenElement) return;

      const kitchenRect = kitchenElement.getBoundingClientRect();
      const kitchenTop = kitchenRect.top + window.scrollY;
      const kitchenBottom = kitchenRect.bottom + window.scrollY;
      const currentScrollY = window.scrollY;
      
      // Switch to static only when kitchen image is fully visible (top of kitchen is at or above viewport top)
      // This ensures palette stays fixed while viewing living room
      setIsMobileLayoutFixed(kitchenRect.top > 0);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const scrollCategory = (dir: 'left' | 'right') => {
    const el = categoryScrollRef.current;
    if (el) {
      const scrollAmount = 150;
      el.scrollBy({ left: dir === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollBrand = (dir: 'left' | 'right') => {
    const el = brandScrollRef.current;
    if (el) {
      const scrollAmount = 150;
      el.scrollBy({ left: dir === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  // Memoize pairing colors to prevent reshuffling on FAQ clicks
  const pairingColors = useMemo(() => {
    if (!colorDatabase || !selectedCategory || !colors || colors.length === 0) return [];
    
    const catTips = CATEGORY_TIPS[selectedCategory] || CATEGORY_TIPS.DEFAULT;
    const targetCats = (catTips.pairingCategories && catTips.pairingCategories.length > 0)
      ? catTips.pairingCategories
      : ['Whites', 'Greys'];
    
    // Collect all colors from contrasting categories with category labels
    const allContrastingColors: any[] = [];
    targetCats.forEach((cat) => {
      const arr = colorDatabase.colorTypes[cat] || [];
      arr.forEach((c: any) => {
        allContrastingColors.push({ ...c, __cat: cat });
      });
    });
    
    // Fallback to any non-current category if not enough
    if (allContrastingColors.length < 8) {
      const excludeCats = [selectedCategory, ...targetCats];
      const allCats = Object.keys(colorDatabase.colorTypes);
      const contrastingCats = allCats.filter(cat => !excludeCats.includes(cat));
      
      contrastingCats.forEach((cat) => {
        const arr = colorDatabase.colorTypes[cat] || [];
        arr.forEach((c: any) => {
          if (allContrastingColors.length < 50) {
            allContrastingColors.push({ ...c, __cat: cat });
          }
        });
      });
    }
    
    // Deterministic selection using seed
    const seededRandom = (seed: number, index: number) => {
      const x = Math.sin(seed + index) * 10000;
      return x - Math.floor(x);
    };
    
    // Select 8 diverse colors deterministically
    const suggestionColors: any[] = [];
    const colorsPerCat = Math.ceil(8 / Math.min(targetCats.length, 4));
    let attempts = 0;
    
    while (suggestionColors.length < 8 && attempts < 1000) {
      for (const cat of targetCats) {
        if (suggestionColors.length >= 8) break;
        
        const colorsFromCat = suggestionColors.filter(c => c.__cat === cat).length;
        if (colorsFromCat < colorsPerCat) {
          const availableFromCat = allContrastingColors.filter(
            c => c.__cat === cat && !suggestionColors.some(s => s.colorName === c.colorName && s.colorCode === c.colorCode)
          );
          if (availableFromCat.length > 0) {
            const idx = Math.floor(seededRandom(pairingColorsSeed, attempts) * availableFromCat.length);
            suggestionColors.push(availableFromCat[idx]);
          }
        }
      }
      
      if (suggestionColors.length < 8) {
        const remaining = allContrastingColors.filter(
          c => !suggestionColors.some(s => s.colorName === c.colorName && s.colorCode === c.colorCode)
        );
        if (remaining.length > 0) {
          const idx = Math.floor(seededRandom(pairingColorsSeed, attempts + 100) * remaining.length);
          suggestionColors.push(remaining[idx]);
        } else {
          break;
        }
      }
      attempts++;
    }
    
    return suggestionColors.slice(0, 8);
  }, [colorDatabase, selectedCategory, colors, pairingColorsSeed]);

  return (
    <>
      <DevToolsProtection />
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content="Visualise wall paint colors by brand, category, and shade. Try Home Glazer\'s Basic Color Visualiser for Asian Paints, Nerolac, Berger, JSW and more." />
      </Head>
      <Header />
      <main className="min-h-screen bg-white pt-4 lg:pt-16 pb-20 lg:pb-2 flex flex-col items-center px-4 lg:px-0">
        <h1 className="mt-20 lg:mt-12 text-3xl font-bold text-[#ED276E] mb-4 text-center">
          {selectedColor ? `${toSentenceCase(selectedColor.colorName)} | Colour Code ${selectedColor.colorCode} | ${toSentenceCase(BRAND_CONFIG.find(b => b.id === selectedBrand)?.name || '')} | Home Glazer` : 'Basic Color Visualiser'}
        </h1>
        {/* Brand Tabs - Desktop Only */}
        <div className="hidden lg:flex w-full justify-center mb-2">
          <div className="flex items-center justify-center mb-4 relative w-full max-w-2xl mx-auto">
            {showBrandPrevArrow && (
              <button
                className="absolute left-0 z-10 bg-white border border-gray-300 rounded-full w-8 h-8 flex items-center justify-center shadow hover:bg-gray-100 transition disabled:opacity-30"
                style={{ top: '50%', transform: 'translateY(-50%)' }}
                onClick={() => scrollBrand('left')}
                aria-label="Scroll left"
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M13 15l-5-5 5-5" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            )}
            <div
              className="overflow-x-auto w-full scrollbar-hide"
              ref={brandScrollRef}
              style={{ 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch',
                scrollBehavior: 'smooth'
              }}
            >
              <div className="flex gap-4 flex-nowrap justify-start px-4 w-full min-w-max">
                {BRAND_CONFIG.map((brand) => (
                  <button
                    key={brand.id}
                    className={`sm:px-6 px-3 sm:py-2 py-1 rounded-full font-medium border transition-all duration-200 whitespace-nowrap sm:text-base text-sm flex-shrink-0 ${selectedBrand === brand.id ? 'bg-[#299dd7] text-white border-[#299dd7]' : 'bg-white text-[#299dd7] border-[#299dd7] hover:bg-[#e6f2fa]'}`}
                    onClick={() => handleBrandClick(brand.id)}
                  >
                    {brand.name}
                  </button>
                ))}
              </div>
            </div>
            {showBrandNextArrow && (
              <button
                className="absolute right-0 z-10 bg-white border border-gray-300 rounded-full w-8 h-8 flex items-center justify-center shadow hover:bg-gray-100 transition disabled:opacity-30"
                style={{ top: '50%', transform: 'translateY(-50%)' }}
                onClick={() => scrollBrand('right')}
                aria-label="Scroll right"
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M7 5l5 5-5 5" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            )}
          </div>
        </div>
        {/* Category Tabs - Desktop Only */}
        {colorDatabase && (
          <div className="hidden lg:block w-[90%] max-w-[90%] mx-auto flex items-center justify-center mb-4 relative">
            {showPrevArrow && (
              <button
                className="absolute left-0 z-10 bg-white border border-gray-300 rounded-full w-8 h-8 flex items-center justify-center shadow hover:bg-gray-100 transition disabled:opacity-30"
                style={{ top: '50%', transform: 'translateY(-50%)' }}
                onClick={() => scrollCategory('left')}
                aria-label="Scroll left"
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M13 15l-5-5 5-5" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            )}
            <div
              className="overflow-x-auto w-full scrollbar-hide"
              ref={categoryScrollRef}
            >
              <div className={`flex gap-4 flex-nowrap px-2 w-full ${(showPrevArrow || showNextArrow) ? 'justify-start' : 'justify-center'}`}>
                {Object.keys(colorDatabase.colorTypes).map((cat: string) => {
                  const categoryColor = CATEGORY_COLORS[cat] || '#ED276E';
                  return (
                    <button
                      key={cat}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap text-sm flex-shrink-0 ${
                        selectedCategory === cat 
                          ? 'bg-white shadow-md border-2' 
                          : 'bg-white hover:bg-gray-50 border-2'
                      }`}
                      style={{
                        borderColor: selectedCategory === cat ? categoryColor : '#e5e7eb',
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        handleCategoryClick(cat);
                      }}
                    >
                      <div 
                        className="w-4 h-4 rounded-full flex-shrink-0"
                        style={{ backgroundColor: categoryColor }}
                      />
                      <span className="text-gray-700 font-semibold tracking-wide">
                        {cat.toUpperCase()}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
            {showNextArrow && (
              <button
                className="absolute right-0 z-10 bg-white border border-gray-300 rounded-full w-8 h-8 flex items-center justify-center shadow hover:bg-gray-100 transition disabled:opacity-30"
                style={{ top: '50%', transform: 'translateY(-50%)' }}
                onClick={() => scrollCategory('right')}
                aria-label="Scroll right"
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M7 5l5 5-5 5" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            )}
          </div>
        )}
        {/* 2-column layout: left = images, right = swatches */}
        <div className="flex flex-col lg:flex-row gap-0 w-full max-w-screen-xl">
          {/* Images */}
          <div className="flex-1 flex flex-col gap-8 relative">
            {Object.entries(ROOM_IMAGES).map(([label, src]: [string, string]) => (
              <div
                key={label}
                data-room={label}
                ref={label === 'kitchen' ? kitchenRef : null}
                className="w-full flex flex-col border-2 rounded-lg transition-all duration-200"
              >
                <div className="w-full aspect-[16/9] bg-gray-200 rounded-lg overflow-hidden mb-2 flex items-center justify-center relative">
                  <img 
                    src={src} 
                    alt={label} 
                    className="object-cover w-full h-full room-image" 
                    onError={e => (e.currentTarget.src = 'https://via.placeholder.com/1280x720?text='+label)}
                  />
                  {/* SVG Overlay for wall masking */}
                  <svg 
                    className="svg-overlay absolute inset-0 w-full h-full pointer-events-none mix-blend-multiply"
                    viewBox="0 0 1280 720"
                    preserveAspectRatio="xMidYMid slice"
                  >
                    <defs>
                      <mask id={`mask-${label}`}>
                        <rect width="100%" height="100%" fill="black"/>
                        <path d={WALL_MASKS[label]?.front || ""} fill="white"/>
                      </mask>
                    </defs>
                    <rect 
                      width="100%" 
                      height="100%" 
                      fill={selectedColor?.colorHex || "#ffffff"} 
                      opacity="0.7"
                      mask={`url(#mask-${label})`}
                      className="wall-path"
                    />
                  </svg>
                </div>
                <span className="text-base font-medium text-gray-700 mb-2 text-center w-full">
                  {label === 'living' ? 'Living Room' : label.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())}
                </span>
              </div>
            ))}
          </div>
          
          {/* Desktop Swatch palette on right */}
          <div className="hidden lg:flex flex-1 lg:flex-[1] flex flex-col items-center">
            {selectedCategory && selectedColor && (
              <div className="sticky top-24 w-full flex flex-col items-center min-h-[500px]">
                <h2 className="text-xl font-semibold text-[#299dd7] mb-2">{colorDatabase?.brand}</h2>
                <div className="grid w-full max-w-[400px] grid-cols-2 gap-3 md:gap-3 overflow-x-hidden flex-wrap max-h-[450px]">
                  {paginatedColors.map((color: any, idx: number) => (
                    <button
                      key={color.colorName+color.colorCode+idx}
                      className={`flex items-center gap-3 p-2 rounded-lg transition-all duration-200 w-full ${selectedColor && selectedColor.colorName === color.colorName && selectedColor.colorCode === color.colorCode ? 'border-2 border-[#299dd7]' : 'border-2 border-transparent'}`}
                      onClick={() => handleColorClick(color)}
                    >
                      <div className="w-16 h-16 rounded-lg flex-shrink-0" style={{ background: color.colorHex }} />
                      <div className="flex flex-col items-start flex-1">
                        <span className="text-sm text-gray-800 font-medium text-left">{toSentenceCase(color.colorName)}</span>
                        <span className="text-xs text-gray-500 text-left">{color.colorCode}</span>
                      </div>
                    </button>
                  ))}
                </div>
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-4">
                    <button
                      onClick={handlePrevPage}
                      disabled={colorPage === 0}
                      className={`px-4 py-2 text-sm rounded-md font-medium transition-all duration-200 ${
                        colorPage === 0 
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                          : 'bg-[#299dd7] text-white border-[#299dd7] hover:bg-[#1e7bb3] shadow-md'
                      }`}
                    >
                      Previous
                    </button>
                    <span className="text-gray-600 font-medium">Page {colorPage + 1} of {totalPages}</span>
                    <button
                      onClick={handleNextPage}
                      disabled={colorPage === totalPages - 1}
                      className={`px-4 py-2 text-sm rounded-md font-medium transition-all duration-200 ${
                        colorPage === totalPages - 1 
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                          : 'bg-[#299dd7] text-white border-[#299dd7] hover:bg-[#1e7bb3] shadow-md'
                      }`}
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Mobile & Tablet Dynamic Bottom Section (Palette + Category Types + Brand Selector) */}
        <div className={`lg:hidden bg-white border-t border-gray-200 z-40 transition-all duration-300 ${
          isMobileLayoutFixed ? 'fixed left-0 right-0 bottom-[68px]' : 'static mt-4 w-full max-w-screen-xl mx-auto px-4'
        }`}>
          {/* Color Swatches Carousel */}
          {colorDatabase && selectedCategory && (
            <div className={`py-3 border-b border-gray-100 ${isMobileLayoutFixed ? 'px-4' : 'px-0'}`}>
              <div className="overflow-x-auto scrollbar-hide">
                <div className="flex gap-1 lg:gap-3 min-w-max">
                  {colors.map((color: any, idx: number) => (
                    <button
                      key={color.colorName+color.colorCode+idx}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 flex-shrink-0 ${selectedColor && selectedColor.colorName === color.colorName && selectedColor.colorCode === color.colorCode ? 'border-2 border-[#299dd7]' : 'border-2 border-transparent'}`}
                      onClick={() => handleColorClick(color)}
                    >
                      <div className="w-9 h-9 rounded-lg flex-shrink-0" style={{ background: color.colorHex }} />
                      <div className="flex flex-col items-start flex-1">
                        <span className="text-sm text-gray-800 font-medium text-left">{toSentenceCase(color.colorName)}</span>
                        <span className="text-xs text-gray-500 text-left">{color.colorCode}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
          {/* Category Selector */}
          {colorDatabase && (
            <div className={`py-3 border-b border-gray-100 ${isMobileLayoutFixed ? 'px-4' : 'px-0'}`}>
              <div className="overflow-x-auto scrollbar-hide">
                <div className="flex gap-1 lg:gap-3 min-w-max">
                  {Object.keys(colorDatabase.colorTypes).map((cat: string) => {
                    const categoryColor = CATEGORY_COLORS[cat] || '#ED276E';
                    return (
                      <button
                        key={cat}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-200 whitespace-nowrap text-sm flex-shrink-0 ${
                          selectedCategory === cat 
                            ? 'bg-white shadow-md border-2' 
                            : 'bg-white hover:bg-gray-50 border-2'
                        }`}
                        style={{
                          borderColor: selectedCategory === cat ? categoryColor : '#e5e7eb',
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          handleCategoryClick(cat);
                        }}
                      >
                        <div 
                          className="w-3 h-3 rounded-full flex-shrink-0"
                          style={{ backgroundColor: categoryColor }}
                        />
                        <span className="text-gray-700 font-semibold tracking-wide">
                          {cat.toUpperCase()}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
  
          {/* Brand Selector - Mobile Only */}
          <div className={`py-3 border-b border-gray-100 ${isMobileLayoutFixed ? 'px-4' : 'px-0'}`}>
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-1 lg:gap-3 min-w-max">
                {BRAND_CONFIG.map((brand) => (
                  <button
                    key={brand.id}
                    className={`sm:px-4 px-3 sm:py-2 py-1 rounded-full font-medium border transition-all duration-200 whitespace-nowrap text-sm flex-shrink-0 ${selectedBrand === brand.id ? 'bg-[#299dd7] text-white border-[#299dd7]' : 'bg-white text-[#299dd7] border-[#299dd7] hover:bg-[#e6f2fa]'}`}
                    onClick={() => handleBrandClick(brand.id)}
                  >
                    {brand.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SPLIT SCREEN COLOR SCIENCE/INFO SECTION */}
        {!!selectedCategory && COLOR_TYPE_SCIENCE[selectedCategory] && (
          <section
            className="w-full max-w-5xl flex flex-col lg:flex-row items-stretch gap-8 my-12"
          >
            {/* LEFT: Category Color Block - Mobile Version */}
            <div className="lg:hidden w-full mb-6">
              {(() => {
                const bg = selectedColor?.colorHex || CATEGORY_COLORS[selectedCategory] || '#ED276E';
                const light = isLightColor(bg);
                const textColor = light ? '#1f2937' : '#ffffff';
                const shadowClass = light ? '' : ' drop-shadow-lg';
                return (
                  <div
                    className="w-full h-40 rounded-2xl flex flex-col items-end justify-end shadow-inner relative"
                    style={{ background: bg, transition: 'background 0.3s' }}
                  >
                    <div className="w-full flex flex-col items-center justify-center absolute top-4 left-1/2 px-4" style={{ transform: 'translateX(-50%)' }}>
                      <span className={`text-xl font-bold uppercase tracking-wide${shadowClass} text-center`} style={{ color: textColor }}>
                        {selectedCategory}
                      </span>
                    </div>
                    <div className="w-full flex flex-col items-center mb-4 px-4 text-center">
                      <div className="flex items-center justify-center">
                        <span className={`text-base font-medium${shadowClass}`} style={{ color: textColor }}>
                          {selectedColor?.colorCode || bg}
                        </span>
                      </div>
                      {selectedColor?.colorName && (
                        <span className={`text-xs font-semibold mt-1${shadowClass}`} style={{ color: textColor }}>
                          {toSentenceCase(selectedColor.colorName)}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })()}
            </div>
            
            {/* LEFT: Category Color Block - Desktop Version */}
            <div className="hidden lg:block flex-1 flex flex-col items-center justify-center w-full lg:max-w-[340px]">
              {(() => {
                const bg = selectedColor?.colorHex || CATEGORY_COLORS[selectedCategory] || '#ED276E';
                const light = isLightColor(bg);
                const textColor = light ? '#1f2937' : '#ffffff'; // gray-800 or white
                const shadowClass = light ? '' : ' drop-shadow-lg';
                return (
                  <div className="sticky top-24 w-full">
                    <div
                      className="w-full h-44 lg:h-60 rounded-2xl flex flex-col items-end justify-end shadow-inner relative"
                      style={{ background: bg, transition: 'background 0.3s' }}
                    >
                      <div className="w-full flex flex-col items-center justify-center absolute top-6 left-1/2 px-4" style={{ transform: 'translateX(-50%)' }}>
                        <span className={`text-2xl font-bold uppercase tracking-wide${shadowClass} text-center`} style={{ color: textColor }}>
                          {selectedCategory}
                        </span>
                      </div>
                      <div className="w-full flex flex-col items-center mb-6 px-4 text-center">
                        <div className="flex items-center justify-center">
                          <span className={`text-base font-medium${shadowClass}`} style={{ color: textColor }}>
                            {selectedColor?.colorCode || bg}
                          </span>
                        </div>
                        {selectedColor?.colorName && (
                          <span className={`text-xs font-semibold mt-1${shadowClass}`} style={{ color: textColor }}>
                            {toSentenceCase(selectedColor.colorName)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
            {/* RIGHT: Explanation Info */}
            <div className="flex-1 flex flex-col justify-center">
              {(() => {
                const colorName = selectedColor ? toSentenceCase(selectedColor.colorName) : '';
                const title = personalizeContent(COLOR_TYPE_SCIENCE[selectedCategory].title, colorName, selectedCategory);
                const description = personalizeContent(COLOR_TYPE_SCIENCE[selectedCategory].description, colorName, selectedCategory);
                const examples = personalizeContent(COLOR_TYPE_SCIENCE[selectedCategory].examples, colorName, selectedCategory);
                const d = getDetailsFromExamples(examples);
                const tipsConfig = CATEGORY_TIPS[selectedCategory] || CATEGORY_TIPS.DEFAULT;
                
                return (
                  <>
                    <h3 className="text-2xl lg:text-3xl font-bold mb-2 text-[#299dd7] text-left">
                      {title}
                    </h3>
                    <p className="text-gray-700 text-lg mb-5 text-left">
                      {description}
                    </p>
                    {/* SEO paragraph referencing the selected color */}
                    <p className="text-gray-700 text-base mb-5 text-left">
                      Explore {selectedColor ? `${colorName}—part of the ` : ''}the {selectedCategory.toUpperCase()} colour family—an excellent choice with {examples.replace('Recommended for: ', '').split('Benefits:')[0].trim()}.
                    </p>
                    {/* Parse examples string into split sections */}
                    {d.recommendedFor && (
                      <div className="mb-2">
                        <span className="block font-semibold text-gray-900">Recommended for:</span>
                        <p className="text-gray-700">{d.recommendedFor}</p>
                      </div>
                    )}
                    {d.benefits && (
                      <div className="mb-4">
                        <span className="block font-semibold text-gray-900">Benefits:</span>
                        <p className="text-gray-700">{d.benefits}</p>
                      </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                      <div>
                        <span className="block font-semibold text-gray-900 mb-1">Design tips:</span>
                        <ul className="list-disc pl-5 text-gray-700 space-y-1">
                          {tipsConfig.tips.map((t, i) => (<li key={`tip-${i}`}>{t}</li>))}
                        </ul>
                      </div>
                      <div>
                        <span className="block font-semibold text-gray-900 mb-1">Best finishes:</span>
                        <ul className="list-disc pl-5 text-gray-700 space-y-1">
                          {tipsConfig.finishes.map((t, i) => (<li key={`finish-${i}`}>{t}</li>))}
                        </ul>
                      </div>
                    </div>

                    {/* Visual Works well with (clickable thumbnails) */}
                    {colorDatabase && Array.isArray(colors) && colors.length > 0 && pairingColors.length > 0 && (
                      <div className="mt-6">
                        <span className="block font-semibold text-gray-900 mb-3">Works well with:</span>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                          {pairingColors.map((c: any, i: number) => (
                              <button
                                key={`${c.__cat || selectedCategory}-${c.colorName}-${c.colorCode}-${i}`}
                                onClick={() => {
                                  const cleanColorCode = c.colorCode.replace(/\s+/g, '-');
                                  router.push(`/colour-visualiser/basic/${selectedBrand}/${c.__cat || selectedCategory}/${toKebabCase(c.colorName)}-${cleanColorCode}`, undefined, { scroll: false });
                                }}
                                className="flex items-center gap-2 p-2 rounded-lg border hover:shadow-sm transition bg-white min-w-0"
                                aria-label={`Switch to ${toSentenceCase(c.colorName)} ${c.colorCode}`}
                              >
                                <div className="w-16 h-16 rounded-lg flex-shrink-0" style={{ background: c.colorHex }} />
                                <div className="flex flex-col items-start flex-1 min-w-0">
                                  <span className="text-sm text-gray-800 font-medium text-left truncate w-full">{toSentenceCase(c.colorName)}</span>
                                  <span className="text-xs text-gray-500 text-left truncate w-full">{c.colorCode}</span>
                                </div>
                              </button>
                            ))}
                        </div>
                      </div>
                    )}

                    {/* FAQ Accordion */}
                    {(() => {
                      const baseFaqs = CATEGORY_FAQS[selectedCategory] || CATEGORY_FAQS.DEFAULT;
                      const colorName = selectedColor?.colorName ? toSentenceCase(selectedColor.colorName) : selectedCategory.toLowerCase();
                      const isLightColorSelected = selectedColor?.colorHex ? isLightColor(selectedColor.colorHex) : false;
                      
                      // Generate contextual FAQs based on selected color properties
                      const faqs = baseFaqs.map((faq, idx) => {
                        let q = faq.q;
                        let a = faq.a;
                        
                        // Personalize based on color lightness
                        if (idx === 0 && q.includes('too bright') && isLightColorSelected) {
                          q = `Is ${colorName} suitable for larger spaces?`;
                          a = `Yes! ${colorName} is a soft, versatile shade that works beautifully in larger spaces. Its subtle tone won't overwhelm and creates an inviting, spacious feel. Pair with neutral furnishings for balance.`;
                        } else if (idx === 0 && q.includes('too bold')) {
                          q = `Will ${colorName} work in my space?`;
                          a = `${colorName} is a ${isLightColorSelected ? 'soft' : 'bold'} choice that ${isLightColorSelected ? 'adds subtle warmth' : 'creates impact'}. ${isLightColorSelected ? 'It works beautifully in most rooms and is easy to style with various décor.' : 'Consider using it on accent walls or smaller spaces for maximum effect without overwhelming.'}`;
                        }
                        
                        // Replace generic color references with selected color name
                        const categoryLower = selectedCategory.toLowerCase().replace(/s$/, '');
                        q = q.replace(new RegExp(`\\b${categoryLower}\\s+(walls|paint)`, 'gi'), colorName);
                        q = q.replace(new RegExp(`\\b${categoryLower}\\b`, 'gi'), colorName);
                        a = a.replace(new RegExp(`\\b${categoryLower}\\s+(walls|paint)`, 'gi'), colorName);
                        a = a.replace(new RegExp(`\\b${categoryLower}\\b`, 'gi'), colorName);
                        
                        return { q, a };
                      });
                      
                      return (
                        <div className="mt-8">
                          <h4 className="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h4>
                          <div className="space-y-3">
                            {faqs.map((faq, index) => (
                              <div key={`faq-${index}`} className="border border-gray-200 rounded-lg overflow-hidden">
                                <button
                                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                                  className="w-full text-left px-4 py-3 bg-white hover:bg-gray-50 transition flex justify-between items-center"
                                  aria-expanded={activeFaq === index}
                                >
                                  <span className="font-semibold text-gray-900 pr-4">{faq.q}</span>
                                  <svg
                                    className={`w-5 h-5 text-gray-500 transition-transform flex-shrink-0 ${activeFaq === index ? 'rotate-180' : ''}`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                  </svg>
                                </button>
                                {activeFaq === index && (
                                  <div className="px-4 py-3 bg-gray-50 text-gray-700 border-t border-gray-200">
                                    {faq.a}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })()}
                  </>
                );
              })()}
            </div>
          </section>
        )}

        {/* Brand Information Section */}
        {selectedBrand && BRAND_INFO[selectedBrand] && (
          <section className="w-full max-w-4xl mt-12 mb-8 px-4">
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-sm border border-gray-100 p-8 lg:p-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#299dd7] mb-4 text-center">
                About {BRAND_CONFIG.find(b => b.id === selectedBrand)?.name}
              </h2>
              <p className="text-gray-700 text-lg mb-8 text-center leading-relaxed">
                {BRAND_INFO[selectedBrand].intro}
              </p>
              <div className="space-y-6">
                {BRAND_INFO[selectedBrand].sections.map((section, idx) => (
                  <div key={`brand-section-${idx}`}>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{section.heading}</h3>
                    <p className="text-gray-700 leading-relaxed">{section.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
      
      {/* Mobile Action Buttons - Fixed at Bottom */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-50">
        <div className="flex gap-3">
          <Link href="/enquiry" className="flex-1 bg-[#ED276E] text-white py-3 px-4 rounded-lg font-medium text-center hover:bg-[#b81d5a] transition flex items-center justify-center text-[15px]">
            Enquire Now
          </Link>
          <Link href="/calculator" className="flex-1 bg-[#299dd7] text-white py-3 px-4 rounded-lg font-medium text-center hover:bg-[#237bb0] transition flex items-center justify-center text-[15px]">
            Budget Calculator
          </Link>
        </div>
      </div>
    </>
  );
};

export default BasicVisualiserPage;