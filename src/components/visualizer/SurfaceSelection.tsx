import React from 'react';
import { RoomManifest } from '../../hooks/useVisualizer';

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
  <main className="min-h-screen bg-gray-50 pt-28 pb-8 flex flex-col items-center px-4 md:px-0">
          <h1 className="text-3xl font-bold text-[#ED276E] mb-6 text-center">Advanced Colour Visualiser</h1>
    <h2 className="text-xl font-semibold text-[#299dd7] mb-2 text-center">Step 1: Choose a Room Type</h2>
    <p className="mb-8 text-gray-600 text-center max-w-xl">Select the type of space you want to visualise. You can change this later.</p>
    {loading ? (
      <div className="text-gray-400">Loading...</div>
    ) : (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 w-full max-w-4xl">
        {rooms.map(room => (
          <button
            key={room.roomType}
            className={`flex flex-col items-center rounded-xl border-2 transition-all duration-200 p-3 bg-white shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#299dd7] ${selectedRoomType === room.roomType ? 'border-[#299dd7] ring-2 ring-[#299dd7]' : 'border-gray-200'}`}
            onClick={() => onSelectRoomType(room.roomType)}
            type="button"
          >
            <div className="w-28 h-20 md:w-32 md:h-24 rounded-lg overflow-hidden mb-2 bg-gray-100 flex items-center justify-center">
              {/* Use first variant's main image as thumbnail */}
              <img src={room.variants[0]?.mainImage} alt={room.label} className="object-cover w-full h-full" onError={e => (e.currentTarget.src = 'https://via.placeholder.com/160x100?text='+room.label)} />
            </div>
            <span className="text-base font-medium text-gray-700 text-center mt-1">{room.label}</span>
          </button>
        ))}
      </div>
    )}
  </main>
);

export default SurfaceSelection; 