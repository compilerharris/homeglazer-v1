import { useEffect } from 'react';
import { useRouter } from 'next/router';

const BRAND_CONFIG = [
  { id: 'asian-paints', name: 'Asian Paints', fileName: 'asian_paints_colors.json' },
  { id: 'nerolac', name: 'Nerolac', fileName: 'nerolac_colors.json' },
  { id: 'berger', name: 'Berger', fileName: 'berger_colors.json' },
  { id: 'jsw', name: 'JSW', fileName: 'jsw_colors.json' },
  { id: 'birla-opus', name: 'Birla Opus', fileName: 'birla_opus_colors.json' },
  { id: 'ral', name: 'RAL', fileName: 'ral_colors.json' },
  { id: 'ncs', name: 'NCS', fileName: 'ncs_colors.json' },
];

function toKebabCase(str: string): string {
  return str.toLowerCase().replace(/\s+/g, '-');
}

const BrandIndexPage: React.FC = () => {
  const router = useRouter();
  const { brand } = router.query;

  useEffect(() => {
    const redirectToFirstColor = async () => {
      if (!brand || typeof brand !== 'string') {
        router.replace('/colour-visualiser/basic/asian-paints');
        return;
      }

      const brandConfig = BRAND_CONFIG.find(b => b.id === brand);
      if (!brandConfig) {
        router.replace('/colour-visualiser/basic/asian-paints');
        return;
      }

      try {
        const colorData = await import(`@/data/colors/${brandConfig.fileName}`);
        const categories = Object.keys(colorData.default.colorTypes);
        if (categories.length > 0) {
          const firstCategory = categories[0];
          const colors = colorData.default.colorTypes[firstCategory];
          if (colors && colors.length > 0) {
            const firstColor = colors[0];
            const cleanColorCode = firstColor.colorCode.replace(/\s+/g, '-');
            const colorSlug = `${toKebabCase(firstColor.colorName)}-${cleanColorCode}`;
            router.replace(`/colour-visualiser/basic/${brand}/${firstCategory}/${colorSlug}`);
          }
        }
      } catch (error) {
        console.error('Error loading color data:', error);
        router.replace('/colour-visualiser/basic/asian-paints');
      }
    };

    if (router.isReady) {
      redirectToFirstColor();
    }
  }, [brand, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ED276E] mx-auto mb-4"></div>
        <p className="text-gray-600">Loading color visualiser...</p>
      </div>
    </div>
  );
};

export default BrandIndexPage; 