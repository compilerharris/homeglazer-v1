"use client"

import React, { useState } from "react"
import { ImageLightbox } from "./ImageLightbox"

const TESTIMONIAL_IMAGES = Array.from({ length: 11 }, (_, i) => `/media/testimonials/${i + 1}.webp`)

export function TestimonialsGrid() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {TESTIMONIAL_IMAGES.map((src, index) => (
          <button
            key={src}
            type="button"
            onClick={() => setOpenIndex(index)}
            className="relative aspect-[3/4] overflow-hidden rounded-lg border border-gray-200 bg-gray-50 hover:border-[#299dd7] hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#299dd7] focus:ring-offset-2"
          >
            <img
              src={src}
              alt={`Customer testimonial ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
      <ImageLightbox
        images={TESTIMONIAL_IMAGES}
        openIndex={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={(index) => setOpenIndex(index)}
      />
    </>
  )
}
