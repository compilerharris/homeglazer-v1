
import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton: React.FC = () => {
  return (
    <a 
      href="https://wa.me/919717256514"
      className="fixed bottom-[100px] md:bottom-[30px] right-[30px] bg-green-500 text-white rounded-full p-3 shadow-lg z-50 hover:bg-green-600 transition-all duration-300"
      aria-label="Contact us on WhatsApp"
      target="_blank" 
      rel="noopener noreferrer"
    >
      <MessageCircle size={30} />
    </a>
  );
};

export default WhatsAppButton;
