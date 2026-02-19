import { useState, useEffect } from 'react';
import { detectDesktopEmulation } from '@/lib/detectDesktopEmulation';

function getIsMobileDevice(): boolean {
  if (typeof document === 'undefined') return false;
  const val = document.cookie
    .split('; ')
    .find((r) => r.startsWith('x-is-mobile-device='))
    ?.split('=')[1];
  const cookieSaysMobile = val === 'true';
  if (!cookieSaysMobile) return false;
  // Cookie says mobile - check for DevTools emulation (desktop GPU)
  if (detectDesktopEmulation()) return false;
  return true;
}

export function useIsMobileDevice() {
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  useEffect(() => {
    setIsMobileDevice(getIsMobileDevice());
  }, []);
  return isMobileDevice;
}
