import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../../../src/components/home/Header';
import Footer from '../../../src/components/home/Footer';
import { useVisualizer } from '../../../src/hooks/useVisualizer';
import SurfaceSelection from '../../../src/components/visualizer/SurfaceSelection';
import WallSelection from '../../../src/components/visualizer/WallSelection';
import ProductSelection from '../../../src/components/visualizer/ProductSelection';
import ColourSelection from '../../../src/components/visualizer/ColourSelection';
import FinishSelection from '../../../src/components/visualizer/FinishSelection';
import Breadcrumbs from '../../../src/components/visualizer/Breadcrumbs';

// Step name to step number mapping
const STEP_FROM_ROUTE: Record<string, number> = {
  'choose-a-room-type': 1,
  'choose-a-room-variant': 2,
  'choose-a-paint-brand': 3,
  'choose-colours': 4,
  'final-preview': 5,
};

// Step number to step name mapping
const STEP_ROUTES: Record<number, string> = {
  1: 'choose-a-room-type',
  2: 'choose-a-room-variant',
  3: 'choose-a-paint-brand',
  4: 'choose-colours',
  5: 'final-preview',
};

// Step name to page title mapping
const STEP_TITLES: Record<string, string> = {
  'choose-a-room-type': 'Choose a Room Type - Advanced Colour Visualiser',
  'choose-a-room-variant': 'Choose a Room Variant - Advanced Colour Visualiser',
  'choose-a-paint-brand': 'Choose a Paint Brand - Advanced Colour Visualiser',
  'choose-colours': 'Choose Colours - Advanced Colour Visualiser',
  'final-preview': 'Final Preview - Advanced Colour Visualiser',
};

const AdvancedVisualiserStep: React.FC = () => {
  const router = useRouter();
  const { step: stepParam } = router.query;
  const visualizer = useVisualizer();
  const breadcrumbs = visualizer.generateBreadcrumbs();

  // Get step number from URL
  const urlStep = stepParam && typeof stepParam === 'string' ? STEP_FROM_ROUTE[stepParam] : null;

  // Handle invalid step names - redirect to step 1
  useEffect(() => {
    if (!router.isReady) return;

    if (stepParam && typeof stepParam === 'string' && !STEP_FROM_ROUTE[stepParam]) {
      router.replace('/colour-visualiser/advanced/choose-a-room-type');
    }
  }, [router.isReady, stepParam]);

  // Track last processed URL step to prevent unnecessary re-runs
  const lastProcessedStepRef = React.useRef<number | null>(null);

  // Sync visualizer step with URL when URL changes (browser back/forward or direct navigation)
  // Only runs when URL actually changes, not on every state update
  useEffect(() => {
    if (!router.isReady || !urlStep) return;
    
    // Skip if we already processed this URL step
    if (lastProcessedStepRef.current === urlStep && visualizer.step === urlStep) {
      return;
    }

    // Validate prerequisites for each step
    let shouldRedirect = false;
    let redirectToStep = 1;

    if (urlStep === 2 && !visualizer.selectedRoomType) {
      shouldRedirect = true;
      redirectToStep = 1;
    } else if (urlStep === 3 && (!visualizer.selectedRoomType || !visualizer.selectedVariantName)) {
      shouldRedirect = true;
      redirectToStep = visualizer.selectedRoomType ? 2 : 1;
    } else if (urlStep === 4 && (!visualizer.selectedRoomType || !visualizer.selectedVariantName || !visualizer.selectedBrandId)) {
      shouldRedirect = true;
      if (!visualizer.selectedRoomType) {
        redirectToStep = 1;
      } else if (!visualizer.selectedVariantName) {
        redirectToStep = 2;
      } else {
        redirectToStep = 3;
      }
    } else if (urlStep === 5 && (!visualizer.selectedRoomType || !visualizer.selectedVariantName || !visualizer.selectedBrandId || visualizer.selectedColours.length === 0 || !visualizer.selectedVariant)) {
      shouldRedirect = true;
      if (!visualizer.selectedRoomType) {
        redirectToStep = 1;
      } else if (!visualizer.selectedVariantName) {
        redirectToStep = 2;
      } else if (!visualizer.selectedBrandId) {
        redirectToStep = 3;
      } else if (visualizer.selectedColours.length === 0) {
        redirectToStep = 4;
      } else {
        redirectToStep = 4; // Fallback to step 4 if variant is missing
      }
    }

    if (shouldRedirect) {
      const routeName = STEP_ROUTES[redirectToStep];
      if (routeName) {
        lastProcessedStepRef.current = null; // Reset to allow processing after redirect
        router.replace(`/colour-visualiser/advanced/${routeName}`);
        return;
      }
    }

    // Only update step if it's different and valid, and prerequisites are met
    if (urlStep !== visualizer.step && urlStep >= 1 && urlStep <= 5 && !shouldRedirect) {
      lastProcessedStepRef.current = urlStep;
      visualizer.setStep(urlStep);
    } else if (urlStep === visualizer.step) {
      lastProcessedStepRef.current = urlStep;
    }
  }, [router.isReady, urlStep]); // Only depend on urlStep to prevent flickering

  const handleGeneratePDF = (clientName: string, email: string, phone: string, roomPreviewRef: React.RefObject<HTMLDivElement>) => {
    visualizer.handleGeneratePDF(clientName, email, phone, roomPreviewRef);
  };

  // Get page title based on current step
  const pageTitle = stepParam && typeof stepParam === 'string' 
    ? STEP_TITLES[stepParam] || 'Advanced Colour Visualiser'
    : 'Advanced Colour Visualiser';

  return (
    <>
      <Head>
        <title>{pageTitle} | HomeGlazer</title>
        <meta name="description" content="Visualize paint colours on your walls with our advanced colour visualiser. Upload your room photo and try different colours before painting." />
        <meta name="keywords" content="colour visualiser, wall colour preview, paint visualiser, room colour simulator" />
        <meta property="og:title" content={`${pageTitle} | HomeGlazer`} />
        <meta property="og:description" content="Visualize paint colours on your walls with our advanced colour visualiser." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://homeglazer.com/uploads/living-room.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${pageTitle} | HomeGlazer`} />
        <meta name="twitter:description" content="Visualize paint colours on your walls before painting." />
        <meta name="twitter:image" content="https://homeglazer.com/uploads/living-room.jpg" />
      </Head>
      <Header />
      {visualizer.step === 1 && (
        <SurfaceSelection
          rooms={visualizer.manifest}
          selectedRoomType={visualizer.selectedRoomType}
          onSelectRoomType={visualizer.handleSelectRoomType}
          loading={visualizer.loading}
        />
      )}
      {visualizer.step === 2 && visualizer.selectedRoom && (
        <WallSelection
          variants={visualizer.selectedRoom.variants}
          selectedVariantName={visualizer.selectedVariantName}
          onSelectVariant={visualizer.handleSelectVariant}
          onBack={visualizer.prevStep}
          backButtonText="Change Room Type"
          breadcrumbs={breadcrumbs}
          onStepClick={visualizer.setStep}
        />
      )}
      {visualizer.step === 3 && (
        <ProductSelection
          selectedBrandId={visualizer.selectedBrandId}
          onSelectBrand={visualizer.handleSelectBrand}
          onBack={visualizer.prevStep}
          backButtonText="Change Room Variant"
          breadcrumbs={breadcrumbs}
          onStepClick={visualizer.setStep}
        />
      )}
      {visualizer.step === 4 && (
        <ColourSelection
          key={`color-selection-${visualizer.colorTypeRefreshKey}`}
          colorTypes={visualizer.colourTypes}
          selectedColorType={visualizer.selectedColourType}
          colorsForType={visualizer.coloursForType}
          selectedColors={visualizer.selectedColours}
          loadingBrandData={visualizer.loadingBrandData}
          onSelectColorType={visualizer.handleSelectColourType}
          onAddColor={visualizer.handleAddColour}
          onRemoveColor={visualizer.handleRemoveColour}
          onBack={visualizer.prevStep}
          onNext={visualizer.nextStep}
          backButtonText="Change Paint Brand"
          breadcrumbs={breadcrumbs}
          onStepClick={visualizer.setStep}
        />
      )}
      {visualizer.step === 5 && (
        <>
          {visualizer.selectedVariant ? (
            <FinishSelection
              variant={visualizer.selectedVariant}
              selectedColors={visualizer.selectedColours}
              assignments={visualizer.assignments}
              wallMasks={visualizer.wallMasks}
              loadingMasks={visualizer.loadingMasks}
              activeSide={visualizer.activeSide}
              showPalette={visualizer.showPalette}
              onOpenPalette={visualizer.handleOpenPalette}
              onAssignColor={visualizer.handleAssignColor}
              onBulkAssignColors={visualizer.handleBulkAssignColors}
              onClosePalette={visualizer.handleClosePalette}
              onBack={visualizer.prevStep}
              onDownload={visualizer.handleDownload}
              onResetAssignments={visualizer.handleResetAssignments}
              backButtonText="Change Colours"
              breadcrumbs={breadcrumbs}
              onStepClick={visualizer.setStep}
              selectedBrandId={visualizer.selectedBrandId}
              selectedRoomType={visualizer.selectedRoomType}
              // PDF generation props
              showPDFModal={visualizer.showPDFModal}
              isGeneratingPDF={visualizer.isGeneratingPDF}
              onGeneratePDF={handleGeneratePDF}
              onClosePDFModal={visualizer.closePDFModal}
            />
          ) : (
            <main className="min-h-screen bg-white pt-28 pb-8 flex flex-col items-center px-4 lg:px-0">
              <div className="text-center max-w-xl">
                <h2 className="text-xl font-semibold text-[#299dd7] mb-4">Missing Required Selections</h2>
                <p className="text-gray-600 mb-6">
                  Please complete the previous steps before viewing the final preview.
                </p>
                <div className="flex flex-col gap-3">
                  {!visualizer.selectedRoomType && (
                    <button
                      onClick={() => visualizer.setStep(1)}
                      className="px-6 py-3 bg-[#299dd7] text-white rounded-lg hover:bg-[#237bb0] transition-colors"
                    >
                      Choose a Room Type
                    </button>
                  )}
                  {visualizer.selectedRoomType && !visualizer.selectedVariantName && (
                    <button
                      onClick={() => visualizer.setStep(2)}
                      className="px-6 py-3 bg-[#299dd7] text-white rounded-lg hover:bg-[#237bb0] transition-colors"
                    >
                      Choose a Room Variant
                    </button>
                  )}
                  {visualizer.selectedRoomType && visualizer.selectedVariantName && !visualizer.selectedBrandId && (
                    <button
                      onClick={() => visualizer.setStep(3)}
                      className="px-6 py-3 bg-[#299dd7] text-white rounded-lg hover:bg-[#237bb0] transition-colors"
                    >
                      Choose a Paint Brand
                    </button>
                  )}
                  {visualizer.selectedRoomType && visualizer.selectedVariantName && visualizer.selectedBrandId && visualizer.selectedColours.length === 0 && (
                    <button
                      onClick={() => visualizer.setStep(4)}
                      className="px-6 py-3 bg-[#299dd7] text-white rounded-lg hover:bg-[#237bb0] transition-colors"
                    >
                      Choose Colours
                    </button>
                  )}
                </div>
              </div>
            </main>
          )}
        </>
      )}
      
      {/* Mobile Action Buttons - Fixed at Bottom */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-50">
        <div className="flex gap-3">
          <Link href="/enquiry" className="flex-1 bg-[#ED276E] text-white py-3 px-4 rounded-lg font-medium text-center hover:bg-[#b81d5a] transition flex items-center justify-center text-[15px]">
            Enquire Now
          </Link>
          <Link href="/paint-budget-calculator" className="flex-1 bg-[#299dd7] text-white py-3 px-4 rounded-lg font-medium text-center hover:bg-[#237bb0] transition flex items-center justify-center text-[15px]">
            Budget Calculator
          </Link>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default AdvancedVisualiserStep;

