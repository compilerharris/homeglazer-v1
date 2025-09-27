'use client'
import { memo } from 'react'
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
  ReactCompareSliderHandle
} from 'react-compare-slider'

interface BeforeAfterSliderProps {
  beforeImage: string
  afterImage: string
  className?: string
}

const BeforeAfterSlider = memo(function BeforeAfterSlider({ 
  beforeImage, 
  afterImage, 
  className = '' 
}: BeforeAfterSliderProps) {
  return (
    <div className={`relative w-full h-96 md:h-[500px] overflow-hidden rounded-2xl shadow-2xl ${className}`}>
      <ReactCompareSlider
        itemOne={
          <ReactCompareSliderImage 
            src={beforeImage} 
            alt="Room Before Makeover" 
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        }
        itemTwo={
          <ReactCompareSliderImage 
            src={afterImage} 
            alt="Room After Makeover"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        }
        handle={
          <ReactCompareSliderHandle
            style={{
              width: '48px',
              height: '48px',
              backgroundColor: 'white',
              borderRadius: '50%',
              border: '2px solid #e5e7eb',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div className="flex space-x-0.5">
              <div className="w-0.5 h-4 bg-gray-400 rounded-full"></div>
              <div className="w-0.5 h-4 bg-gray-400 rounded-full"></div>
            </div>
          </ReactCompareSliderHandle>
        }
        position={50}
        style={{
          width: '100%',
          height: '100%'
        }}
      />
      
      {/* Custom Labels */}
      <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium z-10 pointer-events-none">
        Before
      </div>
      <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium z-10 pointer-events-none">
        After
      </div>
      
      {/* Instruction */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded-full text-sm font-medium z-10 pointer-events-none">
        Drag to compare
      </div>
    </div>
  )
})

export default BeforeAfterSlider