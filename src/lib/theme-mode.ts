export type ThemeMode = 'default' | 'cyberpunk' | 'darkfantasy';

const STORAGE_KEY = 'app:theme-mode';

export function getStoredMode(): ThemeMode {
  if (typeof window === 'undefined') return 'default';
  const v = window.localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
  return v ?? 'default';
}

export function applyMode(mode: ThemeMode) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement; // <html>
  root.classList.remove('mode-cyberpunk', 'mode-darkfantasy');
  if (mode === 'cyberpunk') root.classList.add('mode-cyberpunk');
  if (mode === 'darkfantasy') root.classList.add('mode-darkfantasy');
}

export function setMode(mode: ThemeMode) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, mode);
  applyMode(mode);
}

