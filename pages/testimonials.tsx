import React from "react"
import Head from "next/head"
import { getOgImageUrl } from "@/lib/mediaUrl"
import Link from "next/link"
import Header from "@/components/home/Header"
import Footer from "@/components/home/Footer"
import WhatsAppButton from "@/components/home/WhatsAppButton"
import { TestimonialsGrid } from "@/components/testimonials/TestimonialsGrid"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://homeglazer.com"

export default function TestimonialsPage() {
  return (
    <>
      <Head>
        <title>Customer Testimonials | HomeGlazer</title>
        <meta
          name="description"
          content="Read heartfelt testimonials and letters from our satisfied customers. See what homeowners say about HomeGlazer's painting services and quality workmanship."
        />
        <meta
          name="keywords"
          content="customer testimonials, painting reviews, HomeGlazer feedback, satisfied customers, painting company reviews"
        />
        <meta
          property="og:title"
          content="Customer Testimonials | HomeGlazer"
        />
        <meta
          property="og:description"
          content="Read heartfelt testimonials and letters from our satisfied customers about HomeGlazer's painting services."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={getOgImageUrl("/uploads/hero-banner.png", SITE_URL)} />
        <meta
          name="twitter:title"
          content="Customer Testimonials | HomeGlazer"
        />
        <meta
          name="twitter:description"
          content="Read heartfelt testimonials from our satisfied customers."
        />
        <meta name="twitter:image" content={getOgImageUrl("/uploads/hero-banner.png", SITE_URL)} />
      </Head>

      <div className="bg-white flex flex-col overflow-hidden items-center">
        <Header />

        {/* Breadcrumb */}
        <div className="w-[90%] lg:w-[80%] mx-auto pt-28">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/testimonials">Testimonials</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Main content - no hero banner */}
        <main className="w-[90%] lg:w-[80%] mx-auto pt-8 pb-24 text-center">
          <h1 className="text-[40px] font-medium mb-4">
            Customer Testimonials
          </h1>
          <p className="text-xl text-[rgba(89,89,89,1)] font-light mb-12 max-w-3xl mx-auto">
            We are grateful for the trust our customers place in us. Below are
            heartfelt letters and testimonials from clients who have
            experienced our painting services.
          </p>
          <TestimonialsGrid />
        </main>

        {/* Mobile Action Buttons - Fixed at Bottom */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-50">
          <div className="flex gap-3">
            <Link
              href="/enquiry"
              className="flex-1 bg-[#ED276E] text-white py-3 px-4 rounded-lg font-medium text-center hover:bg-[#b81d5a] transition flex items-center justify-center text-[15px]"
            >
              Enquire Now
            </Link>
            <Link
              href="/paint-budget-calculator"
              className="flex-1 bg-[#299dd7] text-white py-3 px-4 rounded-lg font-medium text-center hover:bg-[#237bb0] transition flex items-center justify-center text-[15px]"
            >
              Budget Calculator
            </Link>
          </div>
        </div>

        <Footer />
        <WhatsAppButton />
      </div>
    </>
  )
}
