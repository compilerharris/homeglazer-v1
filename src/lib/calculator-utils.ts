import { carpetAreaOptions, buildupAreaOptions, paintOptions, brandMap, PaintOption } from './calculator-constants';

export const getDisplayArea = (
    area: number,
    areaTypes: { id: string; selected: boolean }[],
    samePaintForCeiling: boolean
): number => {
    if (!area || !areaTypes) return 0;
    if (samePaintForCeiling) {
        let firstNumber = 0;
        if (areaTypes.find(type => type.id === 'carpet')?.selected) {
            const selectedOption = carpetAreaOptions.find(option => option.value === area);
            if (selectedOption) {
                firstNumber = parseInt(selectedOption.label.split('-')[0].trim());
            }
        } else if (areaTypes.find(type => type.id === 'buildup')?.selected) {
            const selectedOption = buildupAreaOptions.find(option => option.value === area);
            if (selectedOption) {
                firstNumber = parseInt(selectedOption.label.split('-')[0].trim());
            }
        }
        return area - firstNumber;
    }
    return area;
};

export const calculateInteriorPrice = (
    area: number,
    paintType: string,
    areaTypes: { id: string; selected: boolean }[],
    samePaintForCeiling: boolean
): number => {
    if (!area || !paintType || !areaTypes) return 0;
    // If different paint for ceiling is selected, subtract the first number from the range
    if (samePaintForCeiling) {
        // Get the first number from the selected area range
        let firstNumber = 0;
        if (areaTypes.find(type => type.id === 'carpet')?.selected) {
            const selectedOption = carpetAreaOptions.find(option => option.value === area);
            if (selectedOption) {
                firstNumber = parseInt(selectedOption.label.split('-')[0].trim());
            }
        } else if (areaTypes.find(type => type.id === 'buildup')?.selected) {
            const selectedOption = buildupAreaOptions.find(option => option.value === area);
            if (selectedOption) {
                firstNumber = parseInt(selectedOption.label.split('-')[0].trim());
            }
        }
        // Calculate wall area by subtracting ceiling area (first number from range)
        const wallArea = area - firstNumber;
        return wallArea * Number(paintType);
    }
    return area * Number(paintType);
};

export const calculateCeilingPrice = (
    area: number,
    ceilingPaintType: string,
    areaTypes: { id: string; selected: boolean }[]
): number => {
    if (!area || !ceilingPaintType || !areaTypes) return 0;
    // When different paint for ceiling is selected, use the first number from the range
    let ceilingArea = 0;
    if (areaTypes.find(type => type.id === 'carpet')?.selected) {
        const selectedOption = carpetAreaOptions.find(option => option.value === area);
        if (selectedOption) {
            ceilingArea = parseInt(selectedOption.label.split('-')[0].trim());
        }
    } else if (areaTypes.find(type => type.id === 'buildup')?.selected) {
        const selectedOption = buildupAreaOptions.find(option => option.value === area);
        if (selectedOption) {
            ceilingArea = parseInt(selectedOption.label.split('-')[0].trim());
        }
    }
    return ceilingArea * Number(ceilingPaintType);
};

export const calculateExteriorPrice = (area: number, exteriorPaintType: string): number => {
    if (!area || !exteriorPaintType) return 0;
    return area * Number(exteriorPaintType);
};

export const calculateRoofPrice = (roofArea: number, roofPaintType: string): number => {
    if (!roofArea || !roofPaintType) return 0;
    return roofArea * Number(roofPaintType);
};

export const formatIndianCurrency = (number: number): string => {
    const numStr = number.toString();
    const lastThree = numStr.substring(numStr.length - 3);
    const otherNumbers = numStr.substring(0, numStr.length - 3);
    const formatted = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + (otherNumbers ? "," : "") + lastThree;
    return formatted;
};

export const getSelectedAreaType = (areaTypes: { id: string; label: string; selected: boolean }[]) => {
    if (!areaTypes) return '';
    const selectedType = areaTypes.find(type => type.selected);
    return selectedType ? selectedType.label : '';
};

export const getPaintName = (category: string, brand: string, typeValue: string) => {
    const paintList = paintOptions[category]?.[brand] || [];
    const selectedPaint = paintList.find((paint: PaintOption) => paint.value === typeValue);
    return selectedPaint?.name || '';
};

export const getBrandName = (brand: string) => {
    return brandMap[brand] || '';
};
export const calculateWoodPolishingEstimate = (
    inputMethod: 'area' | 'items',
    area: number,
    itemCounts: {
        doors: number;
        windows: number;
        wallPanels: number;
        furnitureArea: number;
    },
    finishValue: number
): number => {
    let totalArea = 0;

    if (inputMethod === 'area') {
        totalArea = area;
    } else if (inputMethod === 'items') {
        const doorArea = itemCounts.doors * 65;
        const windowArea = itemCounts.windows * 30;
        const wallPanelArea = itemCounts.wallPanels * 80;
        const furnitureAreaVal = itemCounts.furnitureArea;
        totalArea = doorArea + windowArea + wallPanelArea + furnitureAreaVal;
    }

    return totalArea * finishValue;
};
