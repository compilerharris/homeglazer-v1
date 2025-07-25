import React from 'react';
import Header from '../../components/home/Header';
import Footer from '../../components/home/Footer';
import { useVisualizer } from '../../hooks/useVisualizer';
import SurfaceSelection from '../../components/visualizer/SurfaceSelection';
import WallSelection from '../../components/visualizer/WallSelection';
import ProductSelection from '../../components/visualizer/ProductSelection';
import ColourSelection from '../../components/visualizer/ColourSelection';
import FinishSelection from '../../components/visualizer/FinishSelection';

const AdvancedVisualiser: React.FC = () => {
  const visualizer = useVisualizer();

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
        />
      )}
      {visualizer.step === 3 && (
        <ProductSelection
          brands={visualizer.brands}
          selectedBrandId={visualizer.selectedBrandId}
          onSelectBrand={visualizer.handleSelectBrand}
          onBack={visualizer.prevStep}
        />
      )}
      {visualizer.step === 4 && visualizer.selectedBrand && (
        <ColourSelection
          palette={visualizer.palette}
          swatches={visualizer.swatches}
          maxPalette={6}
          onAddColor={visualizer.handleAddColor}
          onRemoveColor={visualizer.handleRemoveColor}
          onBack={visualizer.prevStep}
          onNext={visualizer.nextStep}
        />
      )}
      {visualizer.step === 5 && visualizer.selectedVariant && (
        <FinishSelection
          variant={visualizer.selectedVariant}
          palette={visualizer.palette}
          assignments={visualizer.assignments}
          wallMasks={visualizer.wallMasks}
          loadingMasks={visualizer.loadingMasks}
          activeSide={visualizer.activeSide}
          showPalette={visualizer.showPalette}
          onOpenPalette={visualizer.handleOpenPalette}
          onAssignColor={visualizer.handleAssignColor}
          onClosePalette={visualizer.handleClosePalette}
          onBack={visualizer.prevStep}
          onDownload={visualizer.handleDownload}
        />
      )}
      <Footer />
    </>
  );
};

export default AdvancedVisualiser; 