import React from 'react';
import { FilterOptions, Brand } from '../../data/products';

interface ProductFiltersProps {
  filters: {
    sheenLevel?: string;
    surfaceType?: string;
    usage?: string;
    quantity?: string;
  };
  filterOptions: FilterOptions;
  onFilterChange: (filterType: 'sheenLevel' | 'surfaceType' | 'usage' | 'quantity', value: string) => void;
  onClearFilters: () => void;
  showHeader?: boolean;
  sticky?: boolean;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  filterOptions,
  onFilterChange,
  onClearFilters,
  showHeader = true,
  sticky = true
}) => {
  const FilterSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="mb-6">
      <h3 className="font-semibold text-gray-900 mb-3">{title}</h3>
      {children}
    </div>
  );

  const FilterCheckbox = ({ 
    label, 
    value, 
    checked, 
    onChange 
  }: { 
    label: string; 
    value: string; 
    checked: boolean; 
    onChange: (value: string) => void; 
  }) => (
    <label className="flex items-center mb-2 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onChange(value)}
        className="w-4 h-4 text-[#299dd7] bg-gray-100 border-gray-300 rounded focus:ring-[#299dd7] focus:ring-2"
      />
      <span className="ml-2 text-sm text-gray-700">{label}</span>
    </label>
  );

  const FilterRadio = ({ 
    label, 
    value, 
    checked, 
    onChange,
    name
  }: { 
    label: string; 
    value: string; 
    checked: boolean; 
    onChange: (value: string) => void;
    name: string;
  }) => (
    <label className="flex items-center mb-2 cursor-pointer">
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={() => onChange(value)}
        className="w-4 h-4 text-[#299dd7] bg-gray-100 border-gray-300 focus:ring-[#299dd7] focus:ring-2"
      />
      <span className="ml-2 text-sm text-gray-700">{label}</span>
    </label>
  );

  return (
    <div className={`bg-white rounded-xl border border-gray-200 p-6 ${sticky ? 'sticky top-24' : ''}`}>
      {showHeader && (
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Filters</h2>
          <button
            onClick={onClearFilters}
            className="text-sm text-[#299dd7] hover:underline"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Sheen Level Filter - Single select with radio buttons */}
      <FilterSection title="Sheen Level">
        <div className="space-y-2">
          <FilterRadio
            label="All Sheen Levels"
            value=""
            checked={!filters.sheenLevel}
            onChange={(value) => onFilterChange('sheenLevel', value)}
            name="sheenLevel"
          />
          {filterOptions.sheenLevels.map((sheen) => (
            <FilterRadio
              key={sheen}
              label={sheen}
              value={sheen}
              checked={filters.sheenLevel === sheen}
              onChange={(value) => onFilterChange('sheenLevel', value)}
              name="sheenLevel"
            />
          ))}
        </div>
      </FilterSection>

      {/* Surface Type Filter - Single select with radio buttons */}
      <FilterSection title="Surface Type">
        <div className="space-y-2">
          <FilterRadio
            label="All Surfaces"
            value=""
            checked={!filters.surfaceType}
            onChange={(value) => onFilterChange('surfaceType', value)}
            name="surfaceType"
          />
          {filterOptions.surfaceTypes.map((surface) => (
            <FilterRadio
              key={surface}
              label={surface}
              value={surface}
              checked={filters.surfaceType === surface}
              onChange={(value) => onFilterChange('surfaceType', value)}
              name="surfaceType"
            />
          ))}
        </div>
      </FilterSection>

      {/* Usage Filter - Single select with radio buttons */}
      <FilterSection title="Usage">
        <div className="space-y-2">
          <FilterRadio
            label="All Usage Types"
            value=""
            checked={!filters.usage}
            onChange={(value) => onFilterChange('usage', value)}
            name="usage"
          />
          {filterOptions.usageTypes.map((usage) => (
            <FilterRadio
              key={usage}
              label={usage}
              value={usage}
              checked={filters.usage === usage}
              onChange={(value) => onFilterChange('usage', value)}
              name="usage"
            />
          ))}
        </div>
      </FilterSection>

      {/* Quantity Options - Single select with radio buttons */}
      <FilterSection title="Quantity Options">
        <div className="space-y-2">
          <FilterRadio
            label="All Quantities"
            value=""
            checked={!filters.quantity}
            onChange={(value) => onFilterChange('quantity', value)}
            name="quantity"
          />
          {filterOptions.quantityOptions.map((quantity) => (
            <FilterRadio
              key={quantity}
              label={quantity}
              value={quantity}
              checked={filters.quantity === quantity}
              onChange={(value) => onFilterChange('quantity', value)}
              name="quantity"
            />
          ))}
        </div>
      </FilterSection>
    </div>
  );
};

export default ProductFilters; 