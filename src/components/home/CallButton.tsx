import React from 'react';
import { PhoneCall } from 'lucide-react';

const CallButton: React.FC = () => {
  return (
    <a
      href="tel:+919717256514"
      aria-label="Call us"
      className="fixed bottom-[160px] md:bottom-[140px] right-[30px] z-40 lg:hidden"
    >
      <div className="relative flex items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-[#299dd7]/40 animate-ping" />
        <div className="relative bg-[#299dd7] text-white rounded-full p-3 shadow-lg hover:bg-[#237bb0] transition-all duration-300">
          <PhoneCall size={28} />
        </div>
      </div>
    </a>
  );
};

export default CallButton;

