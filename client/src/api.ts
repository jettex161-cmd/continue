import axios from 'axios';

const STORAGE_KEY = 'webScraperApiBaseUrl';
const envBase = import.meta.env.VITE_API_BASE_URL?.trim();
const isCapacitorNative = typeof window !== 'undefined' && !!(window as any).Capacitor;
const isAndroid = typeof navigator !== 'undefined' && /android/i.test(navigator.userAgent);
const webBase = '/api';
const androidLocalBase = 'http://127.0.0.1:5000';
const androidEmulatorBase = 'http://10.0.2.2:5000';

function normalizeBaseUrl(value?: string): string | undefined {
  if (!value) {
    return undefined;
  }

  return value.trim().replace(/\/+$/, '');
}

function getSavedApiBaseUrl(): string | undefined {
  if (typeof window === 'undefined' || !window.localStorage) {
    return undefined;
  }

  return normalizeBaseUrl(window.localStorage.getItem(STORAGE_KEY) ?? undefined);
}

function resolveApiBaseUrl() {
  const savedBase = getSavedApiBaseUrl();
  if (savedBase) {
    return savedBase;
  }

  if (envBase) {
    return normalizeBaseUrl(envBase)!;
  }

  if (isCapacitorNative && isAndroid) {
    // Default to the local Android embedded backend host.
    // For an APK with a bundled backend, the server runs inside the device/emulator.
    return androidLocalBase;
  }

  return webBase;
}

export const api = axios.create({
  baseURL: resolveApiBaseUrl(),
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && !error.response) {
      const baseUrl = getApiBaseUrl();
      error.message = `Unable to reach backend at ${baseUrl}. Ensure the server is running and the endpoint is reachable from this device.`;
    }
    return Promise.reject(error);
  }
);

export function getApiBaseUrl() {
  return api.defaults.baseURL ?? '';
}

export function setApiBaseUrl(baseUrl: string) {
  const normalized = normalizeBaseUrl(baseUrl) ?? '';

  if (typeof window !== 'undefined' && window.localStorage) {
    if (normalized) {
      window.localStorage.setItem(STORAGE_KEY, normalized);
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }

  api.defaults.baseURL = normalized || webBase;
}
