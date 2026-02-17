import React, { useEffect, useState } from "react"
import Link from "next/link"
import { SECTION_CTA_CLASSES } from "./CTAButton"
import SectionCarousel from "./SectionCarousel"
import { CarouselItem } from "@/components/ui/carousel"

const testimonials = [
  { id: "1", src: "/media/testimonials/1.webp", alt: "Customer testimonial 1" },
  { id: "2", src: "/media/testimonials/2.webp", alt: "Customer testimonial 2" },
  { id: "3", src: "/media/testimonials/3.webp", alt: "Customer testimonial 3" },
  { id: "4", src: "/media/testimonials/4.webp", alt: "Customer testimonial 4" },
]

const TestimonialsSection: React.FC = () => {
  const [slidesToShow, setSlidesToShow] = useState(4)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const updateSlides = () => {
      const width = window.innerWidth
      const desktop = width >= 1024
      setIsDesktop(desktop)
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/21adcf91-15ca-4563-a889-6dc1018faf8e',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'TestimonialsSection.tsx:updateSlides',message:'Screen size and hideArrows',data:{width,desktop,hideArrows:desktop},timestamp:Date.now(),hypothesisId:'H1'})}).catch(()=>{});
      // #endregion
      if (width < 768) {
        setSlidesToShow(1)
      } else if (width < 1024) {
        setSlidesToShow(2)
      } else {
        setSlidesToShow(4)
      }
    }

    updateSlides()
    window.addEventListener("resize", updateSlides)
    return () => window.removeEventListener("resize", updateSlides)
  }, [])

  // #region agent log
  const sectionRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const overflowYElements: { tag: string; overflowY: string; scrollH: number; clientH: number }[] = [];
    const overflowXElements: { tag: string; overflowX: string; scrollW: number; clientW: number }[] = [];
    const walk = (node: Element) => {
      if (node.nodeType !== 1) return;
      const style = window.getComputedStyle(node);
      const elem = node as HTMLElement;
      if (elem.scrollHeight > elem.clientHeight && ['auto','scroll','overlay'].includes(style.overflowY)) {
        overflowYElements.push({ tag: node.tagName, overflowY: style.overflowY, scrollH: elem.scrollHeight, clientH: elem.clientHeight });
      }
      if (elem.scrollWidth > elem.clientWidth && ['auto','scroll','overlay'].includes(style.overflowX)) {
        overflowXElements.push({ tag: node.tagName, overflowX: style.overflowX, scrollW: elem.scrollWidth, clientW: elem.clientWidth });
      }
      for (let i = 0; i < node.children.length; i++) walk(node.children[i]);
    };
    walk(el);
    fetch('http://127.0.0.1:7242/ingest/21adcf91-15ca-4563-a889-6dc1018faf8e',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'TestimonialsSection.tsx:scrollbarSource',message:'Scrollbar source',data:{overflowYElements,overflowXElements,htmlOverflow:window.getComputedStyle(document.documentElement).overflow},timestamp:Date.now(),hypothesisId:'H6'})}).catch(()=>{});
  }, []);
  // #endregion

  return (
    <section ref={sectionRef} className="w-full bg-white mt-[50px] max-md:mt-10 pb-16 overflow-x-clip">
      <div className="container mx-auto px-4 lg:px-8 2xl:w-[1400px] max-w-full overflow-x-clip">
        <div className="text-center mb-10">
          <h2 className="text-[40px] font-medium leading-[150%]">
            Testimonials
          </h2>
          <p className="text-xl text-[rgba(89,89,89,1)] font-light mt-3">
            Heartfelt letters from clients who have experienced our painting
            services.
          </p>
        </div>

        <SectionCarousel
          slidesToShow={slidesToShow}
          loop
          showDots={false}
          hideArrows={isDesktop}
          testimonialsSection
        >
          {testimonials.map((testimonial) => (
            <CarouselItem
              key={testimonial.id}
              className="basis-full md:basis-1/2 lg:basis-1/4 flex justify-center"
            >
              <Link
                href="/testimonials"
                className="block w-full max-w-[240px] mx-auto rounded-2xl border border-[rgba(0,0,0,0.05)] bg-gray-50 hover:border-[#299dd7] hover:shadow-md transition-all duration-300 flex items-center justify-center p-4"
              >
                <img
                  src={testimonial.src}
                  alt={testimonial.alt}
                  className="w-full h-auto object-contain"
                />
              </Link>
            </CarouselItem>
          ))}
        </SectionCarousel>

        <div className="text-center mt-8">
          <Link href="/testimonials" className={SECTION_CTA_CLASSES}>
            View All Testimonials
          </Link>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
