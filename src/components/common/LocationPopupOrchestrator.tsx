'use client';

import React from 'react';
import { useRouter } from 'next/router';
import ContactFormPopup from '@/components/common/ContactFormPopup';
import ColorVisualiserPopup from '@/components/common/ColorVisualiserPopup';

const LocationPopupOrchestrator: React.FC = () => {
  const router = useRouter();
  const path = router.asPath.split('?')[0].split('#')[0];

  if (path.startsWith('/products')) {
    return <ColorVisualiserPopup />;
  }

  return <ContactFormPopup />;
};

export default LocationPopupOrchestrator;
