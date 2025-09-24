import React from 'react';
import Link from 'next/link';
import Header from '../../src/components/home/Header';
import Footer from '../../src/components/home/Footer';
import { useVisualizer } from '../../src/hooks/useVisualizer';
import SurfaceSelection from '../../src/components/visualizer/SurfaceSelection';
import WallSelection from '../../src/components/visualizer/WallSelection';
import ProductSelection from '../../src/components/visualizer/ProductSelection';
import ColourSelection from '../../src/components/visualizer/ColourSelection';
import FinishSelection from '../../src/components/visualizer/FinishSelection';
import Breadcrumbs from '../../src/components/visualizer/Breadcrumbs';

const AdvancedVisualiser: React.FC = () => {
  const visualizer = useVisualizer();
  const breadcrumbs = visualizer.generateBreadcrumbs();

  const handleGeneratePDF = (clientName: string, dateOfDesign: string, roomPreviewRef: React.RefObject<HTMLDivElement>) => {
    visualizer.handleGeneratePDF(clientName, dateOfDesign, roomPreviewRef);
  };

  return (
    <>
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
      {visualizer.step === 5 && visualizer.selectedVariant && (
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
          backButtonText="Change Colours"
          breadcrumbs={breadcrumbs}
          onStepClick={visualizer.setStep}
          selectedBrandId={visualizer.selectedBrandId}
          // PDF generation props
          showPDFModal={visualizer.showPDFModal}
          isGeneratingPDF={visualizer.isGeneratingPDF}
          onGeneratePDF={handleGeneratePDF}
          onClosePDFModal={visualizer.closePDFModal}
        />
      )}
      
      {/* Mobile Action Buttons - Fixed at Bottom */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-50">
        <div className="flex gap-3">
          <Link href="/enquiry" className="flex-1 bg-[#ED276E] text-white py-3 px-4 rounded-lg font-medium text-center hover:bg-[#b81d5a] transition flex items-center justify-center text-[15px]">
            Enquire Now
          </Link>
          <Link href="/calculator" className="flex-1 bg-[#299dd7] text-white py-3 px-4 rounded-lg font-medium text-center hover:bg-[#237bb0] transition flex items-center justify-center text-[15px]">
            Budget Calculator
          </Link>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default AdvancedVisualiser; 