import React from 'react';

interface BreadcrumbItem {
  label: string;
  step: number;
  isActive?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onStepClick?: (step: number) => void;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, onStepClick }) => {
  return (
    <div className="w-full max-w-4xl mb-4">
      <nav className="flex items-center flex-wrap gap-2 text-sm">
        {items.map((item, index) => (
          <React.Fragment key={item.step}>
            <button
              className={`px-3 py-1 rounded-full font-medium transition-all duration-200 flex-shrink-0 ${
                item.isActive
                  ? 'bg-[#299dd7] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              } ${onStepClick ? 'cursor-pointer' : 'cursor-default'}`}
              onClick={() => onStepClick && onStepClick(item.step)}
              disabled={!onStepClick}
            >
              {item.label}
            </button>
            {index < items.length - 1 && (
              <span className="text-gray-400 flex-shrink-0">›</span>
            )}
          </React.Fragment>
        ))}
      </nav>
    </div>
  );
};

export default Breadcrumbs; 