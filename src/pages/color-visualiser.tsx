import React from 'react';
import Link from 'next/link';
import Header from '../components/home/Header';
import Footer from '../components/home/Footer';

const ColorVisualiserPage: React.FC = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 pt-16 pb-24 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-[#ED276E] mb-8 text-center">Color Visualiser</h1>
        <p className="text-lg text-gray-700 mb-12 text-center max-w-xl">Choose a visualiser mode to explore how different paint colors will look in your space. Start with the Basic Visualiser for quick previews, or try the Advanced Visualiser for more customization.</p>
        <div className="flex flex-col md:flex-row gap-8 w-full max-w-2xl justify-center items-center">
          <div className="bg-white rounded-xl shadow-lg p-8 flex-1 flex flex-col items-center hover:shadow-2xl transition cursor-pointer">
            <span className="text-2xl font-semibold text-[#299dd7] mb-4">Basic Visualiser</span>
            <p className="text-gray-600 text-center mb-4">Quickly preview popular color combinations on sample rooms. Simple and fast!</p>
            <Link href="/color-visualiser/basic" className="mt-auto px-6 py-2 rounded-full bg-[#299dd7] text-white font-medium hover:bg-[#237bb0] transition text-center w-full">Try Basic Visualiser</Link>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8 flex-1 flex flex-col items-center hover:shadow-2xl transition cursor-pointer">
            <span className="text-2xl font-semibold text-[#ED276E] mb-4">Advanced Visualiser</span>
            <p className="text-gray-600 text-center mb-4">Upload your own room photo, mask walls, and experiment with any color you want.</p>
            <Link href="/color-visualiser/advanced" className="mt-auto px-6 py-2 rounded-full bg-[#ED276E] text-white font-medium hover:bg-[#b81d5a] transition text-center w-full">Try Advanced Visualiser</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ColorVisualiserPage; 