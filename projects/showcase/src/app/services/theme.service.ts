import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'light' | 'dark' | 'auto';

export interface ThemeConfig {
  theme: Theme;
  isDark: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly STORAGE_KEY = 'theme-preference';
  private readonly MEDIA_QUERY = '(prefers-color-scheme: dark)';

  private themeSubject = new BehaviorSubject<ThemeConfig>({
    theme: 'light',
    isDark: false,
  });

  public theme$ = this.themeSubject.asObservable();

  private mediaQueryList: MediaQueryList;

  constructor() {
    this.mediaQueryList = window.matchMedia(this.MEDIA_QUERY);
    this.initializeTheme();
    this.setupMediaQueryListener();
  }

  /**
   * Get current theme configuration
   */
  get currentTheme(): ThemeConfig {
    return this.themeSubject.value;
  }

  /**
   * Set theme preference
   */
  setTheme(theme: Theme): void {
    localStorage.setItem(this.STORAGE_KEY, theme);
    this.applyTheme(theme);
  }

  /**
   * Toggle between light and dark themes
   */
  toggleTheme(): void {
    const currentTheme = this.themeSubject.value.theme;
    const newTheme: Theme = currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  /**
   * Get theme preference from localStorage
   */
  getStoredTheme(): Theme {
    return (localStorage.getItem(this.STORAGE_KEY) as Theme) || 'auto';
  }

  /**
   * Check if system prefers dark mode
   */
  getSystemPreference(): boolean {
    return this.mediaQueryList.matches;
  }

  /**
   * Initialize theme from localStorage or system preference
   */
  private initializeTheme(): void {
    const savedTheme = localStorage.getItem(this.STORAGE_KEY) as Theme;
    const theme = savedTheme || 'auto';
    this.applyTheme(theme);
  }

  /**
   * Apply theme to document and update state
   */
  private applyTheme(theme: Theme): void {
    const isDark = this.resolveIsDark(theme);

    // Update document classes
    const documentElement = document.documentElement;
    documentElement.classList.remove('light', 'dark');
    documentElement.classList.add(isDark ? 'dark' : 'light');

    // Update theme-color meta tag for mobile browsers
    this.updateThemeColorMeta(isDark);

    // Update state
    this.themeSubject.next({ theme, isDark });
  }

  /**
   * Resolve if theme should be dark based on preference and system setting
   */
  private resolveIsDark(theme: Theme): boolean {
    switch (theme) {
      case 'dark':
        return true;
      case 'light':
        return false;
      case 'auto':
        return this.mediaQueryList.matches;
      default:
        return false;
    }
  }

  /**
   * Setup listener for system theme changes
   */
  private setupMediaQueryListener(): void {
    this.mediaQueryList.addEventListener('change', (e) => {
      const currentTheme = this.themeSubject.value.theme;
      if (currentTheme === 'auto') {
        this.applyTheme('auto');
      }
    });
  }

  /**
   * Update theme-color meta tag for mobile browser status bar
   */
  private updateThemeColorMeta(isDark: boolean): void {
    let themeColorMeta = document.querySelector(
      'meta[name="theme-color"]',
    ) as HTMLMetaElement;

    if (!themeColorMeta) {
      themeColorMeta = document.createElement('meta');
      themeColorMeta.name = 'theme-color';
      document.head.appendChild(themeColorMeta);
    }

    themeColorMeta.content = isDark ? '#1f2937' : '#ffffff';
  }
}
