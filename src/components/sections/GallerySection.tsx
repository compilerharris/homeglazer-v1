import { memo } from 'react'
import BetterBeforeAfterSlider from './BetterBeforeAfterSlider'
import type { RoomCategory } from '@/lib/galleryData'

interface GallerySectionProps {
  category: RoomCategory
}

const GallerySection = memo(function GallerySection({ category }: GallerySectionProps) {
  return (
    <section className="pb-[31px] w-full mt-[50px] max-md:mt-10">
      <div className="container mx-auto px-4 lg:px-8 2xl:w-[1400px]">
        {/* Category Header */}
        <div className="text-center mb-12">
          <div className="mb-4">
            <h2 className="text-[40px] font-medium mb-2">
              {category.name}
            </h2>
            <p className="text-xl text-[rgba(89,89,89,1)] font-light">
              {category.description}
            </p>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {category.items.map((item) => (
            <div key={item.id} className="space-y-6">
              {/* Before/After Slider */}
              <BetterBeforeAfterSlider
                beforeImage={item.beforeImage}
                afterImage={item.afterImage}
                className="h-80 md:h-96"
              />
              
              {/* Project Details */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">
                  {item.title}
                </h3>
                <p className="text-[rgba(89,89,89,1)] font-light">
                  {item.description}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-[rgba(41,157,215,0.1)] text-[rgba(41,157,215,1)] text-sm rounded-full border border-[rgba(41,157,215,0.2)]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
})

export default GallerySection
