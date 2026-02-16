"use client"

import React, { useEffect, useRef, useCallback } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"

const SWIPE_THRESHOLD = 50

interface ImageLightboxProps {
  images: string[]
  openIndex: number | null
  onClose: () => void
  onNavigate?: (index: number) => void
}

export function ImageLightbox({
  images,
  openIndex,
  onClose,
  onNavigate,
}: ImageLightboxProps) {
  const isOpen = openIndex !== null
  const currentImage = isOpen ? images[openIndex] : null
  const touchStartX = useRef<number>(0)
  const touchEndX = useRef<number>(0)

  const goToPrev = useCallback(() => {
    if (openIndex === null || !onNavigate) return
    const next = openIndex === 0 ? images.length - 1 : openIndex - 1
    onNavigate(next)
  }, [openIndex, onNavigate, images.length])

  const goToNext = useCallback(() => {
    if (openIndex === null || !onNavigate) return
    const next = openIndex === images.length - 1 ? 0 : openIndex + 1
    onNavigate(next)
  }, [openIndex, onNavigate, images.length])

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault()
        goToPrev()
      } else if (e.key === "ArrowRight") {
        e.preventDefault()
        goToNext()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, goToPrev, goToNext])

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX
    const diff = touchStartX.current - touchEndX.current
    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      if (diff > 0) goToNext()
      else goToPrev()
    }
  }

  const handlePrevClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    goToPrev()
  }
  const handleNextClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    goToNext()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="max-w-[95vw] max-h-[95vh] w-auto h-auto p-0 border-0 bg-transparent overflow-visible"
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">
          Testimonial image {openIndex !== null ? openIndex + 1 : 0} of{" "}
          {images.length}
        </DialogTitle>
        {currentImage && (
          <div
            className="relative flex items-center justify-center touch-pan-y select-none"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
              aria-label="Close lightbox"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Prev button */}
            {images.length > 1 && (
              <button
                onClick={handlePrevClick}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
            )}

            {/* Image */}
            <img
              src={currentImage}
              alt={`Testimonial ${openIndex !== null ? openIndex + 1 : ""}`}
              className="max-h-[90vh] max-w-[90vw] w-auto h-auto object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
              draggable={false}
            />

            {/* Next button */}
            {images.length > 1 && (
              <button
                onClick={handleNextClick}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
