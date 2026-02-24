import React from 'react';
import { PhoneCall } from 'lucide-react';

const CallButton: React.FC = () => {
  return (
    <a
      href="tel:+919717256514"
      aria-label="Call us"
      className="fixed bottom-[160px] md:bottom-[90px] right-[30px] bg-[#299dd7] text-white rounded-full p-3 shadow-lg z-50 hover:bg-[#237bb0] transition-all duration-300 lg:hidden"
    >
      <PhoneCall size={28} />
    </a>
  );
};

export default CallButton;

