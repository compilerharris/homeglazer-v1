import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function BasicRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/color-visualiser/basic/asian-paints/ivory-white');
  }, [router]);
  return null;
} 