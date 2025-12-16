import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const AdvancedVisualiser: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the first step route
    router.replace('/colour-visualiser/advanced/choose-a-room-type');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ED276E] mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting...</p>
      </div>
    </div>
  );
};

export default AdvancedVisualiser; 