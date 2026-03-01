
import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton: React.FC = () => {
  return (
    <a 
      href="https://wa.me/919717256514"
      className="fixed bottom-[100px] md:bottom-[80px] lg:bottom-[90px] right-[30px] z-40 lg:z-50"
      aria-label="Contact us on WhatsApp"
      target="_blank" 
      rel="noopener noreferrer"
    >
      <div className="relative flex items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-green-500/40 animate-ping" />
        <div className="relative bg-green-500 text-white rounded-full p-3 shadow-lg hover:bg-green-600 transition-all duration-300">
          <MessageCircle size={30} />
        </div>
      </div>
    </a>
  );
};

export default WhatsAppButton;
