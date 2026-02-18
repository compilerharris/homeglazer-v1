"use client"

import React, { useState } from "react"
import { ImageLightbox } from "./ImageLightbox"
import { testimonialsData } from "@/lib/testimonialsData"
import { getMediaUrl } from "@/lib/mediaUrl"

const TESTIMONIAL_IMAGES = testimonialsData.map((t) => getMediaUrl(t.src))

export function TestimonialsGrid() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {testimonialsData.map((testimonial, index) => (
          <div key={testimonial.id} className="flex flex-col">
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              className="relative aspect-[3/4] overflow-hidden rounded-lg border border-gray-200 bg-gray-50 hover:border-[#299dd7] hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#299dd7] focus:ring-offset-2"
            >
              <img
                src={getMediaUrl(testimonial.src)}
                alt={`Customer testimonial ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
            <p className="mt-3 text-sm font-medium text-[#299dd7] text-center">
              {testimonial.name}
            </p>
          </div>
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
