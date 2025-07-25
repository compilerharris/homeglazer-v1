import { useEffect } from 'react';
import { useRouter } from 'next/router';

const BasicIndexPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      router.replace('/colour-visualiser/basic/asian-paints');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ED276E] mx-auto mb-4"></div>
        <p className="text-gray-600">Loading color visualiser...</p>
      </div>
    </div>
  );
};

export default BasicIndexPage; 