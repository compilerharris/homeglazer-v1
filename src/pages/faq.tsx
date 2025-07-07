import React from 'react';
import Header from '../components/home/Header';
import Footer from '../components/home/Footer';
import FAQ from '../components/home/FAQ';

const FAQPage: React.FC = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 pt-12 pb-24">
        <FAQ />
      </main>
      <Footer />
    </>
  );
};

export default FAQPage; 