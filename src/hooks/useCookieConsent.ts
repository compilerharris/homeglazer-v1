import { useCallback, useEffect, useState } from 'react';

export type ConsentCategory = 'analytics' | 'marketing' | 'functional';

export type ConsentPreferences = {
  essential: true;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
};

export type ConsentStatus = 'unknown' | 'accepted_all' | 'rejected' | 'custom';

type StoredConsent = {
  preferences: ConsentPreferences;
  status: ConsentStatus;
  updatedAt: number;
  expiresAt: number;
};

const STORAGE_KEY = 'homeglazer:cookie-consent';
const TWELVE_MONTHS_MS = 1000 * 60 * 60 * 24 * 365;

const defaultPreferences: ConsentPreferences = {
  essential: true,
  analytics: false,
  marketing: false,
  functional: false,
};

const normalizePreferences = (prefs?: Partial<ConsentPreferences>): ConsentPreferences => ({
  ...defaultPreferences,
  ...prefs,
  essential: true,
});

const readStoredConsent = (): StoredConsent | null => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredConsent;
    if (!parsed?.preferences || !parsed.expiresAt || !parsed.status) return null;
    if (Date.now() > parsed.expiresAt) {
      window.localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return {
      ...parsed,
      preferences: normalizePreferences(parsed.preferences),
    };
  } catch (error) {
    console.error('Failed to read cookie consent', error);
    return null;
  }
};

const persistConsent = (preferences: ConsentPreferences, status: ConsentStatus) => {
  if (typeof window === 'undefined') return;
  const now = Date.now();
  const payload: StoredConsent = {
    preferences: normalizePreferences(preferences),
    status,
    updatedAt: now,
    expiresAt: now + TWELVE_MONTHS_MS,
  };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (error) {
    console.error('Failed to write cookie consent', error);
  }
};

export const useCookieConsent = () => {
  const [isReady, setIsReady] = useState(false);
  const [preferences, setPreferences] = useState<ConsentPreferences>(defaultPreferences);
  const [status, setStatus] = useState<ConsentStatus>('unknown');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = readStoredConsent();
    if (stored) {
      setPreferences(stored.preferences);
      setStatus(stored.status);
    }
    setIsReady(true);
  }, []);

  const updateConsent = useCallback((nextPrefs: ConsentPreferences, nextStatus: ConsentStatus) => {
    const normalized = normalizePreferences(nextPrefs);
    setPreferences(normalized);
    setStatus(nextStatus);
    persistConsent(normalized, nextStatus);
  }, []);

  const acceptAll = useCallback(() => {
    updateConsent(
      {
        essential: true,
        analytics: true,
        marketing: true,
        functional: true,
      },
      'accepted_all'
    );
  }, [updateConsent]);

  const rejectAll = useCallback(() => {
    updateConsent(defaultPreferences, 'rejected');
  }, [updateConsent]);

  const savePreferences = useCallback(
    (prefs: Partial<ConsentPreferences>) => {
      const normalized = normalizePreferences(prefs);
      const anyEnabled = normalized.analytics || normalized.marketing || normalized.functional;
      updateConsent(normalized, anyEnabled ? 'custom' : 'rejected');
    },
    [updateConsent]
  );

  const resetConsent = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(STORAGE_KEY);
    }
    setPreferences(defaultPreferences);
    setStatus('unknown');
  }, []);

  return {
    isReady,
    preferences,
    status,
    showBanner: isReady && status === 'unknown',
    acceptAll,
    rejectAll,
    savePreferences,
    resetConsent,
  };
};
