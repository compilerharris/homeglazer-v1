import React from 'react';
import { RoomManifest } from '../../hooks/useVisualizer';
import { getMediaUrl } from '@/lib/mediaUrl';

interface SurfaceSelectionProps {
  rooms: RoomManifest[];
  selectedRoomType: string | null;
  onSelectRoomType: (roomType: string) => void;
  loading: boolean;
}

const SurfaceSelection: React.FC<SurfaceSelectionProps> = ({
  rooms,
  selectedRoomType,
  onSelectRoomType,
  loading,
}) => (
  <main className="min-h-screen bg-white pt-28 pb-8 flex flex-col items-center px-4 lg:px-0">
          <h1 className="text-3xl font-bold mb-6 text-center">Advanced Colour Visualiser</h1>
    <h2 className="text-xl font-semibold mb-2 text-center">Step 1: Choose a Room Type</h2>
    <p className="mb-8 text-gray-600 text-center max-w-xl">Select the type of space you want to visualise. You can change this later.</p>
    {loading ? (
      <div className="text-gray-400">Loading...</div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
        {rooms.map(room => (
          <div key={room.roomType} className="flex flex-col items-center">
            <button
              className="w-full focus:outline-none focus:ring-2 focus:ring-[#299dd7] rounded-xl overflow-hidden"
              onClick={() => onSelectRoomType(room.roomType)}
              type="button"
            >
                          <div className="w-full h-48 lg:h-56 bg-white border-2 border-gray-200 rounded-xl flex items-center justify-center overflow-hidden">
              {/* Use first variant's main image as thumbnail */}
              <img 
                src={getMediaUrl(room.variants[0]?.mainImage || '')} 
                alt={room.label} 
                className="object-cover w-full h-full rounded-lg" 
                onError={(e) => {
                  const img = e.currentTarget;
                  if (!img.dataset.errorHandled) {
                    img.dataset.errorHandled = 'true';
                    const label = encodeURIComponent(room.label);
                    img.src = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23e5e7eb" width="400" height="300"/%3E%3Ctext fill="%239ca3af" font-family="sans-serif" font-size="14" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3E${label}%3C/text%3E%3C/svg%3E`;
                    img.onerror = () => { img.style.display = 'none'; };
                  }
                }} 
              />
            </div>
            </button>
            <span className="text-lg font-semibold text-gray-800 text-center mt-3">{room.label}</span>
          </div>
        ))}
      </div>
    )}
  </main>
);

export default SurfaceSelection; 