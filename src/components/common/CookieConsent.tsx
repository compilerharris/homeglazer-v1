import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import {
  ConsentPreferences,
  ConsentCategory,
  useCookieConsent,
} from '@/hooks/useCookieConsent';

type CategoryCopy = {
  key: ConsentCategory;
  label: string;
  description: string;
};

const CATEGORY_COPY: CategoryCopy[] = [
  {
    key: 'analytics',
    label: 'Analytics',
    description: 'Help us understand site usage to improve performance and content.',
  },
  {
    key: 'functional',
    label: 'Functional',
    description: 'Remember your preferences for a smoother, more personalized experience.',
  },
  {
    key: 'marketing',
    label: 'Marketing',
    description: 'Allow personalized offers and measure the effectiveness of our campaigns.',
  },
];

const Toggle: React.FC<{
  id: string;
  checked: boolean;
  onChange: () => void;
}> = ({ id, checked, onChange }) => (
  <label
    htmlFor={id}
    className="relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full bg-gray-200 transition-colors duration-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#299dd7]/50"
  >
    <input
      id={id}
      type="checkbox"
      className="peer sr-only"
      checked={checked}
      onChange={onChange}
    />
    <span className="absolute inset-0 rounded-full bg-gray-200 peer-checked:bg-[#299dd7] transition-colors duration-200" />
    <span className="relative left-1 inline-block h-4 w-4 rounded-full bg-white transition-all duration-200 peer-checked:translate-x-[18px]" />
  </label>
);

const CookieConsent: React.FC = () => {
  const {
    isReady,
    preferences,
    showBanner,
    acceptAll,
    rejectAll,
    savePreferences,
  } = useCookieConsent();

  const [mounted, setMounted] = useState(false);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [customPrefs, setCustomPrefs] = useState<ConsentPreferences>(preferences);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setCustomPrefs(preferences);
  }, [preferences]);

  const handleCustomize = () => {
    setCustomPrefs(preferences);
    setIsCustomizeOpen(true);
  };

  const handleSave = () => {
    savePreferences(customPrefs);
    setIsCustomizeOpen(false);
  };

  const handleAcceptAll = () => {
    acceptAll();
    setIsCustomizeOpen(false);
  };

  const handleRejectAll = () => {
    rejectAll();
    setIsCustomizeOpen(false);
  };

  const updateCategory = (key: ConsentCategory, value: boolean) => {
    setCustomPrefs((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  if (!mounted || !isReady) {
    return null;
  }

  if (!showBanner && !isCustomizeOpen) {
    return null;
  }

  return (
    <>
      {showBanner && (
        <div className="fixed bottom-4 left-0 right-0 z-50 px-4">
          <div className="mx-auto max-w-5xl rounded-2xl border border-gray-200 bg-white/95 backdrop-blur shadow-2xl p-4 md:p-6 flex flex-col md:flex-row gap-4 md:items-center">
            <div className="flex-1 space-y-2">
              <p className="text-base font-semibold text-gray-900">We value your privacy</p>
              <p className="text-sm text-gray-600">
                We use cookies to enhance your experience, improve performance, and show relevant
                offers. You can accept all, reject non-essential, or customize your choices.
              </p>
              <Link
                href="/cookie-policy"
                className="text-sm font-semibold text-[#299dd7] hover:text-[#1f83b8]"
              >
                View Cookie Policy
              </Link>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button
                type="button"
                onClick={handleRejectAll}
                className="w-full sm:w-auto px-4 py-3 text-sm font-semibold text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Reject non-essential
              </button>
              <button
                type="button"
                onClick={handleCustomize}
                className="w-full sm:w-auto px-4 py-3 text-sm font-semibold text-[#0f6ea6] border border-[#299dd7] rounded-lg hover:bg-[#299dd7]/10 transition-colors"
              >
                Customize
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="w-full sm:w-auto px-4 py-3 text-sm font-semibold text-white bg-[#ED276E] rounded-lg hover:bg-[#c81f5a] transition-colors"
              >
                Accept all
              </button>
            </div>
          </div>
        </div>
      )}

      {isCustomizeOpen && (
        <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center px-4 py-6">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex items-start justify-between gap-3 p-5 md:p-6 border-b border-gray-200">
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">
                  Customize
                </p>
                <h3 className="text-xl font-semibold">Cookie preferences</h3>
                <p className="text-sm text-gray-600">
                  Choose which cookies we can use. Essential cookies are always on so the site works
                  properly.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsCustomizeOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="p-5 md:p-6 space-y-4 overflow-y-auto">
              <div className="flex items-start justify-between gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4">
                <div className="space-y-1">
                  <p className="font-semibold text-gray-900">Essential</p>
                  <p className="text-sm text-gray-600">
                    Required for core site functionality, security, and to remember your cookie
                    choices.
                  </p>
                </div>
                <span className="text-xs font-semibold text-green-800 bg-green-100 px-3 py-1 rounded-full">
                  Always on
                </span>
              </div>

              {CATEGORY_COPY.map((category) => (
                <div
                  key={category.key}
                  className="rounded-xl border border-gray-100 p-4 space-y-3 shadow-sm"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="space-y-1">
                      <p className="font-semibold text-gray-900">{category.label}</p>
                      <p className="text-sm text-gray-600">{category.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-700">
                        {customPrefs[category.key] ? 'Allow' : 'Disable'}
                      </span>
                      <Toggle
                        id={`${category.key}-toggle`}
                        checked={customPrefs[category.key]}
                        onChange={() => updateCategory(category.key, !customPrefs[category.key])}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 md:p-6 border-t border-gray-200 flex flex-col md:flex-row gap-3 md:justify-end">
              <button
                type="button"
                onClick={() => setIsCustomizeOpen(false)}
                className="w-full md:w-auto px-4 py-3 text-sm font-semibold text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleRejectAll}
                className="w-full md:w-auto px-4 py-3 text-sm font-semibold text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Reject non-essential
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="w-full md:w-auto px-4 py-3 text-sm font-semibold text-white bg-[#299dd7] rounded-lg hover:bg-[#1f83b8] transition-colors"
              >
                Save preferences
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="w-full md:w-auto px-4 py-3 text-sm font-semibold text-white bg-[#ED276E] rounded-lg hover:bg-[#c81f5a] transition-colors"
              >
                Accept all
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsent;
