import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Header from '../../../../../components/home/Header';
import Footer from '../../../../../components/home/Footer';
import Head from 'next/head';

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
const LIVING_ROOM_PATH = "M21.93,0h1258.07v159.18l-1.94,5.32-5.07,7.49-6.04,3.62-.72,8.46,2.17,9.18-2.17,28.99-.48,22.47,7.01,7.25-.48,7.73-2.17,9.91,2.42,5.56,2.9,8.21,4.59.72v372.32l-141.34-67.17h-23.19l-2.9-9.66-1.93-12.08,2.17-7.97,3.62-9.91-1.45-8.94-3.14-3.62-4.59,1.45-3.62,6.28-2.9,7.73-2.66-1.93-.48-222.76,36.97.24,19.09-3.62v-56.3l-9.18-2.42-37.93-.24-31.41.97-36.48,3.87.48,54.6.48,2.9,51.46.24v221.07s-4.83,3.38-4.83,3.38l-7.25-.48-21.02-1.21-18.85,1.45-4.11-8.94-3.87-5.56-4.35-1.21-2.17,4.35,1.21,8.21,3.14,7.97,2.17,7.25-1.69,5.32-5.32,13.29-2.66,5.32h-17.64l1.69-109.45-43.25-16.19-16.67.97-9.42-9.42,6.77-17.15-14.5,3.38-27.06,4.11h-22.47l-14.26-2.17-12.56-4.59-13.05-5.56v16.91l-34.79.48-10.15-3.87v-7.25l-40.35-.24-4.59,3.38-10.63-3.38-12.81.97-3.87-3.62-3.87,1.93-8.21.72-5.56-2.9-6.04-1.69-5.56,4.59-16.19.72-4.35,7.73-24.16-.24-5.07-15.95-14.26,7.49-30.68,2.66-24.16.97v-8.7l-3.38.24-12.08,5.8-12.32-3.38-6.28-2.42,3.87,11.84h-12.81l-22.23-1.45-29.48-5.32h-3.62l7.01,20.3-28.27,1.69-37.21,17.64,4.59,108.48h-53.64l-1.21-118.15-2.42-1.69,2.66-7.01,3.38-6.52,6.04,6.77-.48-8.7,6.28-7.97,5.56-10.39,12.08-7.97,6.52-8.94,6.04-5.56-.97-12.56,5.8-4.83,6.04-6.52,3.38-3.38-.97-5.32,3.62-2.17,1.93-4.35.48-9.18,4.11-4.35,4.83-4.11.97-2.66-5.8-3.14-6.04-.72,2.66-7.49-.24-7.01-14.98,11.11-6.52,7.97-7.01,3.87,2.17-9.66,5.07-9.18-.48-8.94-4.59-3.62-2.66,5.32-3.62,7.73-4.35,13.53-13.05,19.33-2.42-7.25-.48-8.21,2.66-7.01,4.35-2.66-3.14-10.39,4.11-3.38,2.66-4.35-4.83-1.21,1.21-8.21,1.45-7.25,5.07-4.11-2.42-1.93-5.32.97.72-4.35-8.94-5.32,1.21-5.8-8.46,7.25-4.35,7.25-6.04,10.39-2.9-4.59-1.45-6.28,2.66-8.46-2.17-8.21.72-6.77-3.62,1.93-3.87,5.07-1.69,10.87-1.69,3.62-.72,10.15-6.77,1.21-3.62,3.62-4.11-1.45-.24-8.46-2.42-13.05-2.17-12.08-4.59-7.73.72,7.73-4.11,6.04,3.14,9.66-4.59,1.21v4.11l5.32,5.32.97,4.35-2.66,6.28-9.42-11.36v-7.49l-5.32-7.25-.24-5.56-12.56-8.94-3.14,3.38,3.38,4.35-5.32,4.11-3.87-2.17-4.83-1.21-5.56,6.04-1.21,4.35,7.97,7.01h3.38l2.42,3.62-1.93,3.62,4.11,13.05-5.56-2.9-4.83-1.21-6.52.72,6.28,6.77-5.32,2.17-2.17-.97-5.07-2.42-3.87-.72-3.38,5.56v9.18l9.42,9.66-.72,4.83,1.45,7.01,3.38,2.17,5.07,5.32-6.77,4.59,11.36,4.59,5.32,3.38-5.56,2.42-2.17,3.62,9.91-1.93v6.04l3.14,1.21,4.83,5.07-2.17,1.69-6.04,2.42-3.87,4.59.48,6.04,10.63-4.59,6.52-4.83,2.9,2.9-7.25,6.04-.48,7.25-11.6.97-5.32,4.83h10.63l9.91,6.04,7.25,12.56,7.97,8.21,1.93,6.28-4.59,9.42-1.21,57.74-60.4-7.73-1.21-6.28-2.66-7.97-4.35-5.32-7.25-7.25-7.73-5.4-7.97-.89h-20.54v-2.42l-4.35-4.83-8.21-6.04-7.01-3.38-10.15-2.66-14.01-3.62-15.14-2.58-22.87-.64-24.48,1.93-19.65,3.87-12.89,2.9-9.34,2.9-17.07,7.73-12.56,7.73L21.93,0M283.6,341.03l11.36,11.84h5.8l-2.66-5.92-14.5-5.92ZM352.21,459.18l3.87-7.25-3.38-8.7-3.62,5.32-5.56,2.17-2.17,7.25,3.62,8.7h7.73l-.48-7.49ZM1112.08,541.45h-2.9l-2.9,4.47-3.26,7.25-.97,3.62,8.58,5.44,1.45-8.82v-11.96ZM1030.05,541.45h-2.17v8.58l3.99,6.4,5.68,3.38h1.81l-1.21-4.23-3.74-8.7-4.35-5.44ZM789.17,90.36c-56.84,0-102.93,46.08-102.93,102.93s46.08,102.93,102.93,102.93,102.93-46.08,102.93-102.93-46.08-102.93-102.93-102.93ZM610.86,190.87c-56.84,0-102.93,46.08-102.93,102.93s46.08,102.93,102.93,102.93,102.93-46.08,102.93-102.93-46.08-102.93-102.93-102.93Z";
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

const BasicVisualiserPage: React.FC = () => {
  const router = useRouter();
  const { brand: brandParam, category: categoryParam, color: colorParam } = router.query;
  const [colorDatabase, setColorDatabase] = useState<any>(null);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedColor, setSelectedColor] = useState<any>(null);
  const [colorPage, setColorPage] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);

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
  const handleBrandClick = (id: string) => {
    router.push(`/colour-visualiser/basic/${id}`, undefined, { scroll: false });
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

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content="Visualise wall paint colors by brand, category, and shade. Try Home Glazer's Basic Color Visualiser for Asian Paints, Nerolac, Berger, JSW and more." />
      </Head>
      <Header />
      <main className="min-h-screen bg-gray-50 pt-4 md:pt-16 pb-20 md:pb-2 flex flex-col items-center px-4 md:px-0">
        <h1 className="mt-20 md:mt-12 text-3xl font-bold text-[#ED276E] mb-4 text-center">
          {selectedColor ? `${toSentenceCase(selectedColor.colorName)} | Colour Code ${selectedColor.colorCode} | ${toSentenceCase(BRAND_CONFIG.find(b => b.id === selectedBrand)?.name || '')} | Home Glazer` : 'Basic Color Visualiser'}
        </h1>
        {/* Brand Tabs - Desktop Only */}
        <div className="hidden md:flex w-full justify-center mb-2">
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
          <div className="hidden md:block w-[90%] max-w-[90%] mx-auto flex items-center justify-center mb-4 relative">
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
              <div className="flex gap-4 flex-nowrap justify-center px-2 w-full">
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
        <div className="flex flex-col md:flex-row gap-0 w-full max-w-screen-xl">
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
                <span className="text-base font-medium text-gray-700 mb-2 text-center w-full">{label.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())}</span>
              </div>
            ))}
          </div>
          
          {/* Desktop Swatch palette on right */}
          <div className="hidden md:flex flex-1 md:flex-[1] flex flex-col items-center">
            {selectedCategory && selectedColor && (
              <div className="sticky top-24 w-full flex flex-col items-center min-h-[600px]">
                <h2 className="text-xl font-semibold text-[#299dd7] mb-2">{colorDatabase?.brand}</h2>
                <div className="grid w-full max-w-[400px] grid-cols-2 gap-4 md:gap-4 overflow-x-hidden flex-wrap">
                  {paginatedColors.map((color: any, idx: number) => (
                    <button
                      key={color.colorName+color.colorCode+idx}
                      className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all duration-200 min-w-[180px] ${selectedColor && selectedColor.colorName === color.colorName && selectedColor.colorCode === color.colorCode ? 'border-[#299dd7] bg-blue-50' : 'border-gray-200 bg-white'}`}
                      onClick={() => handleColorClick(color)}
                    >
                      <div className="w-12 h-12 rounded-lg border-2 border-gray-200 flex-shrink-0" style={{ background: color.colorHex }} />
                      <div className="flex flex-col items-center">
                        <span className="text-sm text-gray-600 text-center font-medium">{toSentenceCase(color.colorName)}</span>
                        <span className="text-xs text-gray-400 text-center">{color.colorCode}</span>
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
        
        {/* Mobile Dynamic Bottom Section (Palette + Category Types + Brand Selector) */}
        <div className={`md:hidden bg-white border-t border-gray-200 z-50 transition-all duration-300 ${
          isMobileLayoutFixed ? 'fixed left-0 right-0 bottom-[68px]' : 'static mt-4 w-full max-w-screen-xl mx-auto px-4'
        }`}>
          {/* Color Swatches Carousel */}
          {colorDatabase && selectedCategory && (
            <div className={`py-3 border-b border-gray-100 ${isMobileLayoutFixed ? 'px-4' : 'px-0'}`}>
              <div className="overflow-x-auto scrollbar-hide">
                <div className="flex gap-3 min-w-max">
                  {colors.map((color: any, idx: number) => (
                    <button
                      key={color.colorName+color.colorCode+idx}
                      className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all duration-200 min-w-[120px] flex-shrink-0 ${selectedColor && selectedColor.colorName === color.colorName && selectedColor.colorCode === color.colorCode ? 'border-[#299dd7] bg-blue-50' : 'border-gray-200 bg-white'}`}
                      onClick={() => handleColorClick(color)}
                    >
                      <div className="w-10 h-10 rounded-lg border-2 border-gray-200 flex-shrink-0" style={{ background: color.colorHex }} />
                      <div className="flex flex-col items-center">
                        <span className="text-xs text-gray-600 text-center font-medium">{toSentenceCase(color.colorName)}</span>
                        <span className="text-xs text-gray-400 text-center">{color.colorCode}</span>
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
                <div className="flex gap-3 min-w-max">
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
      <div className="flex gap-3 min-w-max">
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

{/* Action Buttons - Always Fixed */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-50">
          <div className="flex gap-3">
            <Link href="/enquiry" className="flex-1 bg-[#ED276E] text-white py-3 px-4 rounded-lg font-medium text-center hover:bg-[#b81d5a] transition flex items-center justify-center text-[15px]">
              Enquire Now
            </Link>
            <Link href="/calculator" className="flex-1 bg-[#299dd7] text-white py-3 px-4 rounded-lg font-medium text-center hover:bg-[#237bb0] transition flex items-center justify-center text-[15px]">
              Budget Calculator
            </Link>
          </div>
        </div>
        
        {/* Advanced Visualiser and Enquiry Tiles */}
        <div className="w-full max-w-screen-xl mt-16 mb-8">
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
            {/* Advanced Visualiser Tile */}
            <div className="bg-white rounded-xl shadow-lg p-8 flex-1 max-w-md flex flex-col items-center hover:shadow-2xl transition cursor-pointer">
              <span className="text-2xl font-semibold text-[#ED276E] mb-4">Advanced Visualiser</span>
              <p className="text-gray-600 text-center mb-4">Choose different colors for each wall and roof<br />across multiple room types.</p>
              <Link href="/colour-visualiser/advanced" className="mt-auto px-6 py-2 rounded-full bg-[#ED276E] text-white font-medium hover:bg-[#b81d5a] transition text-center w-full">Try Advanced Visualiser</Link>
            </div>
            
            {/* Enquiry Tile */}
            <div className="bg-white rounded-xl shadow-lg p-8 flex-1 max-w-md flex flex-col items-center hover:shadow-2xl transition cursor-pointer">
              <span className="text-2xl font-semibold text-[#299dd7] mb-4">Get Free Quote</span>
              <p className="text-gray-600 text-center mb-4">Ready to transform your space? Get a free consultation and quote from our experts.</p>
              <Link href="/enquiry" className="mt-auto px-6 py-2 rounded-full bg-[#299dd7] text-white font-medium hover:bg-[#237bb0] transition text-center w-full">Enquire Now</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BasicVisualiserPage; 