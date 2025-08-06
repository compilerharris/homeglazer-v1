import type { NextApiRequest, NextApiResponse } from 'next';
import { renderToString } from 'react-dom/server';
import React from 'react';

// Server-side component rendering (protected from client)
function createVisualizerSVG(props: {
  svgPath: string;
  colors: Array<{ hex: string; wall: string }>;
  roomType: string;
  wallMasks: Record<string, string>;
}) {
  const { svgPath, colors, roomType, wallMasks } = props;
  
  // Generate SVG with applied colors (server-side logic)
  const svgElement = React.createElement('svg', {
    width: '100%',
    height: '100%',
    viewBox: '0 0 1280 650',
    className: 'w-full h-full'
  }, [
    // Background image
    React.createElement('defs', { key: 'defs' }, [
      React.createElement('pattern', {
        key: 'bg-pattern',
        id: 'room-background',
        patternUnits: 'userSpaceOnUse',
        width: '1280',
        height: '650'
      }, [
        React.createElement('image', {
          key: 'bg-image',
          href: `/lovable-uploads/${roomType}.jpg`,
          width: '1280',
          height: '650'
        })
      ]),
      // Wall masks
      ...Object.entries(wallMasks).map(([wall, maskPath], index) => 
        React.createElement('mask', {
          key: `mask-${wall}`,
          id: `wall-mask-${wall}`
        }, [
          React.createElement('rect', {
            key: `mask-bg-${wall}`,
            width: '100%',
            height: '100%',
            fill: 'black'
          }),
          React.createElement('path', {
            key: `mask-path-${wall}`,
            d: svgPath,
            fill: 'white'
          })
        ])
      )
    ]),
    
    // Background
    React.createElement('rect', {
      key: 'background',
      width: '100%',
      height: '100%',
      fill: 'url(#room-background)'
    }),
    
    // Colored walls
    ...colors.map((colorData, index) => 
      React.createElement('rect', {
        key: `wall-${colorData.wall}-${index}`,
        width: '100%',
        height: '100%',
        fill: colorData.hex,
        opacity: '0.7',
        mask: `url(#wall-mask-${colorData.wall})`,
        className: 'wall-path',
        style: {
          transition: 'fill 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          filter: 'blur(0.3px)'
        }
      })
    )
  ]);

  return svgElement;
}

// Create room visualizer component
function createRoomVisualizer(props: {
  roomData: any;
  selectedColors: Array<{ hex: string; wall: string }>;
}) {
  const { roomData, selectedColors } = props;
  
  const visualizerDiv = React.createElement('div', {
    className: 'relative w-full h-64 rounded-lg overflow-hidden shadow-lg bg-gray-100',
    style: { aspectRatio: '16/9' }
  }, [
    createVisualizerSVG({
      svgPath: roomData.svgPath,
      colors: selectedColors,
      roomType: roomData.roomType,
      wallMasks: roomData.wallMasks
    })
  ]);

  return visualizerDiv;
}

// Create color palette component
function createColorPalette(colors: string[]) {
  const paletteDiv = React.createElement('div', {
    className: 'flex gap-2 p-4 bg-white rounded-lg shadow-sm'
  }, colors.map((color, index) => 
    React.createElement('div', {
      key: `color-${index}`,
      className: 'w-8 h-8 rounded-full border-2 border-gray-200',
      style: { backgroundColor: color }
    })
  ));

  return paletteDiv;
}

// Create mini room visualizer for split-screen layout
function createMiniRoomVisualizer(props: {
  roomImage: string;
  svgPath: string;
  currentColor: string;
  side: string;
  viewBox?: string;
}) {
  const { roomImage, svgPath, currentColor, side, viewBox } = props;
  
  const visualizerDiv = React.createElement('div', {
    className: 'relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden',
    style: {
      backgroundImage: `url(${roomImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }
  }, [
    // SVG Overlay for wall masking
    React.createElement('svg', {
      key: 'svg-overlay',
      className: 'svg-overlay absolute inset-0 w-full h-full pointer-events-none mix-blend-multiply',
      viewBox: viewBox || '0 0 1280 720',
      preserveAspectRatio: 'xMidYMid slice'
    }, [
      // Defs with mask
      React.createElement('defs', {
        key: 'defs'
      }, [
        React.createElement('mask', {
          key: 'mask-bedroom',
          id: 'mask-bedroom'
        }, [
          React.createElement('rect', {
            key: 'mask-bg',
            width: '100%',
            height: '100%',
            fill: 'black'
          }),
          React.createElement('path', {
            key: 'mask-path',
            d: svgPath,
            fill: 'white'
          })
        ])
      ]),
      
      // Colored wall
      React.createElement('rect', {
        key: 'wall-rect',
        width: '100%',
        height: '100%',
        fill: currentColor,
        opacity: '0.7',
        mask: 'url(#mask-bedroom)',
        className: 'wall-path',
        style: {
          transition: 'fill 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
        }
      })
    ])
  ]);

  return visualizerDiv;
}

// Component factory (server-side only)
const COMPONENT_FACTORY = {
  'room-visualizer': createRoomVisualizer,
  'color-palette': createColorPalette,
  'visualizer-svg': createVisualizerSVG,
  'mini-room-visualizer': createMiniRoomVisualizer
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { componentType, props, timestamp } = req.body;

    // Validate component type
    if (!COMPONENT_FACTORY[componentType as keyof typeof COMPONENT_FACTORY]) {
      return res.status(400).json({ error: 'Invalid component type' });
    }

    // Validate timestamp (prevent replay attacks)
    const currentTime = Date.now();
    if (timestamp && (currentTime - timestamp > 300000)) { // 5 minutes
      return res.status(400).json({ error: 'Request expired' });
    }

    // Create component
    const componentFactory = COMPONENT_FACTORY[componentType as keyof typeof COMPONENT_FACTORY];
    const component = componentFactory(props);

    // Render to HTML string
    const htmlString = renderToString(component);

    // Add cache headers for performance
    res.setHeader('Cache-Control', 'public, max-age=60');
    
    res.status(200).json({
      success: true,
      html: htmlString,
      timestamp: currentTime,
      componentType
    });

  } catch (error) {
    console.error('Component render error:', error);
    res.status(500).json({ 
      error: 'Failed to render component',
      details: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : 'Unknown error') : undefined
    });
  }
}