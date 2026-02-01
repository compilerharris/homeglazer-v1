import React, { useState } from 'react';
import Head from 'next/head';
import Header from '../src/components/home/Header';
import Footer from '../src/components/home/Footer';
import DevToolsProtection from '../src/components/security/DevToolsProtection';
import ProtectedVisualizer from '../src/components/visualizer/ProtectedVisualizer';

const AVAILABLE_COLORS = [
  { name: 'Warm Red', hex: '#FF6B6B' },
  { name: 'Ocean Blue', hex: '#4ECDC4' },
  { name: 'Sunny Yellow', hex: '#FFD93D' },
  { name: 'Forest Green', hex: '#00B894' },
  { name: 'Royal Purple', hex: '#6C5CE7' },
  { name: 'Coral Pink', hex: '#FF6B9D' },
  { name: 'Charcoal', hex: '#2D3436' },
  { name: 'Cream', hex: '#FFFDD0' }
];

const ROOM_TYPES = [
  { id: 'bedroom', name: 'Bedroom', description: 'Cozy bedroom space' },
  { id: 'living', name: 'Living Room', description: 'Spacious living area' },
  { id: 'kitchen', name: 'Kitchen', description: 'Modern kitchen design' }
];

const WALL_TYPES = {
  bedroom: ['left', 'right', 'window'],
  living: ['front', 'left', 'right'],
  kitchen: ['front', 'left', 'back']
};

const ProtectedVisualizerDemo: React.FC = () => {
  const [selectedRoom, setSelectedRoom] = useState('bedroom');
  const [selectedColors, setSelectedColors] = useState<Array<{ hex: string; wall: string }>>([
    { hex: '#FF6B6B', wall: 'left' }
  ]);
  const [colorAnalysis, setColorAnalysis] = useState<any>(null);
  const [processingColors, setProcessingColors] = useState(false);

  // Handle color selection for a specific wall
  const handleColorSelect = (colorHex: string, wallType: string) => {
    setSelectedColors(prev => {
      const existing = prev.find(c => c.wall === wallType);
      if (existing) {
        return prev.map(c => c.wall === wallType ? { ...c, hex: colorHex } : c);
      } else {
        return [...prev, { hex: colorHex, wall: wallType }];
      }
    });
  };

  // Remove color from a wall
  const handleColorRemove = (wallType: string) => {
    setSelectedColors(prev => prev.filter(c => c.wall !== wallType));
  };

  // Analyze color combination using protected API
  const analyzeColors = async () => {
    if (selectedColors.length === 0) return;

    setProcessingColors(true);
    try {
      const response = await fetch('/api/visualizer/color-processing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          operation: 'process-palette',
          colors: selectedColors.map(c => c.hex),
          encryptResponse: true
        })
      });

      const result = await response.json();
      if (result.success) {
        setColorAnalysis(result.data || result.encrypted);
      }
    } catch (error) {
      console.error('Color analysis failed:', error);
    } finally {
      setProcessingColors(false);
    }
  };

  const currentWalls = WALL_TYPES[selectedRoom as keyof typeof WALL_TYPES] || [];

  return (
    <>
      <DevToolsProtection />
      <Head>
        <title>Protected Visualizer Demo | Home Glazer</title>
        <meta name="description" content="Demonstration of server-side protected color visualizer" />
      </Head>
      <Header />

      <main className="min-h-screen bg-gray-50 pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Protected Visualizer Demo
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience our server-side protected color visualizer. All core logic and HTML rendering 
              happens on the server to protect intellectual property.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Controls */}
            <div className="lg:col-span-1 space-y-6">
              {/* Room Selection */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Select Room</h3>
                <div className="space-y-2">
                  {ROOM_TYPES.map(room => (
                    <label key={room.id} className="flex items-center">
                      <input
                        type="radio"
                        name="room"
                        value={room.id}
                        checked={selectedRoom === room.id}
                        onChange={(e) => setSelectedRoom(e.target.value)}
                        className="mr-3"
                      />
                      <div>
                        <div className="font-medium">{room.name}</div>
                        <div className="text-sm text-gray-500">{room.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Wall Colors */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Wall Colors</h3>
                
                {currentWalls.map(wall => {
                  const currentColor = selectedColors.find(c => c.wall === wall);
                  return (
                    <div key={wall} className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium capitalize">{wall} Wall</span>
                        {currentColor && (
                          <button
                            onClick={() => handleColorRemove(wall)}
                            className="text-red-500 text-sm hover:text-red-700"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      
                      {currentColor && (
                        <div className="flex items-center mb-2">
                          <div 
                            className="w-6 h-6 rounded border border-gray-300 mr-2"
                            style={{ backgroundColor: currentColor.hex }}
                          />
                          <span className="text-sm text-gray-600">{currentColor.hex}</span>
                        </div>
                      )}
                      
                      <div className="grid grid-cols-4 gap-2">
                        {AVAILABLE_COLORS.map(color => (
                          <button
                            key={`${wall}-${color.hex}`}
                            onClick={() => handleColorSelect(color.hex, wall)}
                            className={`w-8 h-8 rounded border-2 transition ${
                              currentColor?.hex === color.hex 
                                ? 'border-blue-500 shadow-md' 
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                            style={{ backgroundColor: color.hex }}
                            title={color.name}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}

                <button
                  onClick={analyzeColors}
                  disabled={selectedColors.length === 0 || processingColors}
                  className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {processingColors ? 'Analyzing...' : 'Analyze Colors'}
                </button>
              </div>

              {/* Color Analysis */}
              {colorAnalysis && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-4">Color Analysis</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Mood:</span> 
                      <span className="ml-2 capitalize">{colorAnalysis.mood}</span>
                    </div>
                    {colorAnalysis.contrasts && (
                      <div>
                        <span className="font-medium">Contrast Ratio:</span> 
                        <span className="ml-2">{colorAnalysis.contrasts.toFixed(2)}:1</span>
                      </div>
                    )}
                    <div className="text-xs text-gray-500 mt-2">
                      Analysis computed server-side for security
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Visualizer */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">
                  {ROOM_TYPES.find(r => r.id === selectedRoom)?.name} Visualizer
                </h3>
                
                <ProtectedVisualizer
                  roomType={selectedRoom}
                  selectedColors={selectedColors}
                  onColorChange={setSelectedColors}
                  className="w-full"
                />

                <div className="mt-4 text-sm text-gray-500">
                  <div className="bg-blue-50 border border-blue-200 rounded p-3">
                    <h4 className="font-medium text-blue-900 mb-1">🛡️ Security Features</h4>
                    <ul className="text-blue-800 space-y-1">
                      <li>• SVG paths and room data served from protected API</li>
                      <li>• HTML rendering happens server-side</li>
                      <li>• Color processing algorithms hidden from client</li>
                      <li>• JWT tokens for API access control</li>
                      <li>• Optional encryption for sensitive data</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ProtectedVisualizerDemo;