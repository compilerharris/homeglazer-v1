import React, { useState, useEffect, useRef } from 'react';

interface ProtectedVisualizerProps {
  roomType: string;
  selectedColors: Array<{ hex: string; wall: string }>;
  onColorChange?: (colors: Array<{ hex: string; wall: string }>) => void;
  className?: string;
}

interface RoomData {
  roomType: string;
  svgPath: string;
  image: string;
  wallMasks: Record<string, string>;
  processedColors: Array<{
    hex: string;
    rgb: { r: number; g: number; b: number } | null;
    contrast: number;
    luminance: number;
  }>;
  timestamp: number;
}

const ProtectedVisualizer: React.FC<ProtectedVisualizerProps> = ({
  roomType,
  selectedColors,
  onColorChange,
  className = ''
}) => {
  const [renderedHTML, setRenderedHTML] = useState<string>('');
  const [roomData, setRoomData] = useState<RoomData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const visualizerRef = useRef<HTMLDivElement>(null);

  // Load room data from protected API
  useEffect(() => {
    const loadRoomData = async () => {
      if (!roomType || selectedColors.length === 0) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/visualizer/room-data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            roomType,
            colors: selectedColors.map(c => c.hex),
            token: accessToken
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();
        
        if (result.success) {
          setRoomData(result.data);
          setAccessToken(result.nextToken);
        } else {
          throw new Error(result.error || 'Failed to load room data');
        }
      } catch (err) {
        console.error('Failed to load room data:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    loadRoomData();
  }, [roomType, selectedColors, accessToken]);

  // Render visualizer component from server
  useEffect(() => {
    const renderVisualizerComponent = async () => {
      if (!roomData) return;

      try {
        const response = await fetch('/api/visualizer/render-component', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            componentType: 'room-visualizer',
            props: {
              roomData,
              selectedColors
            },
            timestamp: Date.now()
          })
        });

        if (!response.ok) {
          throw new Error(`Render failed: ${response.status}`);
        }

        const result = await response.json();
        
        if (result.success) {
          setRenderedHTML(result.html);
        } else {
          throw new Error(result.error || 'Render failed');
        }
      } catch (err) {
        console.error('Failed to render component:', err);
        setError(err instanceof Error ? err.message : 'Render error');
      }
    };

    renderVisualizerComponent();
  }, [roomData, selectedColors]);

  // Handle color change interactions
  const handleColorChange = (newColors: Array<{ hex: string; wall: string }>) => {
    if (onColorChange) {
      onColorChange(newColors);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className={`flex items-center justify-center h-64 bg-gray-100 rounded-lg ${className}`}>
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#299dd7] mb-2"></div>
          <p className="text-gray-600 text-sm">Loading visualizer...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={`flex items-center justify-center h-64 bg-red-50 rounded-lg border border-red-200 ${className}`}>
        <div className="text-center p-4">
          <div className="text-red-500 mb-2">⚠️</div>
          <p className="text-red-700 text-sm font-medium">Failed to load visualizer</p>
          <p className="text-red-600 text-xs mt-1">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // No room data
  if (!roomData) {
    return (
      <div className={`flex items-center justify-center h-64 bg-gray-50 rounded-lg ${className}`}>
        <p className="text-gray-500">Select a room and colors to begin</p>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Server-rendered visualizer */}
      <div 
        ref={visualizerRef}
        className="w-full"
        dangerouslySetInnerHTML={{ __html: renderedHTML }}
        onClick={(e) => {
          // Handle wall clicks for color changes
          const target = e.target as HTMLElement;
          const wallElement = target.closest('[data-wall]');
          if (wallElement) {
            const wallType = wallElement.getAttribute('data-wall');
            if (wallType && onColorChange) {
              // You could implement color picker logic here
              console.log(`Clicked on ${wallType} wall`);
            }
          }
        }}
      />
      
      {/* Overlay controls (optional) */}
      {roomData && (
        <div className="absolute bottom-2 left-2 bg-white bg-opacity-90 rounded px-2 py-1 text-xs text-gray-600">
          {roomData.roomType} • {selectedColors.length} colors
        </div>
      )}
      
      {/* Debug info (development only) */}
      {process.env.NODE_ENV === 'development' && roomData && (
        <div className="mt-2 p-2 bg-gray-100 rounded text-xs text-gray-600">
          <details>
            <summary className="cursor-pointer">Debug Info</summary>
            <pre className="mt-1 text-xs overflow-auto">
              {JSON.stringify({
                roomType: roomData.roomType,
                colorsCount: selectedColors.length,
                timestamp: new Date(roomData.timestamp).toLocaleTimeString(),
                processedColors: roomData.processedColors.length
              }, null, 2)}
            </pre>
          </details>
        </div>
      )}
    </div>
  );
};

export default ProtectedVisualizer;