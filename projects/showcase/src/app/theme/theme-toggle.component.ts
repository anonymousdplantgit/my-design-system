import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { Theme, ThemeConfig, ThemeService } from '../services/theme.service';

@Component({
  selector: 'ds-theme-toggle',
  standalone: true,
  imports: [NgClass, NgIf],
  template: `
    <div class="relative">
      <!-- Theme Toggle Button -->
      <button
        type="button"
        class="flex items-center p-2 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-md transition-colors"
        (click)="toggleDropdown()"
        [attr.aria-label]="'Toggle theme'"
        [attr.aria-expanded]="dropdownOpen"
      >
        <!-- Sun Icon (Light Mode) -->
        <svg
          *ngIf="!currentTheme.isDark"
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>

        <!-- Moon Icon (Dark Mode) -->
        <svg
          *ngIf="currentTheme.isDark"
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>

        <!-- Dropdown Arrow -->
        <svg
          class="w-3 h-3 ml-1 transition-transform"
          [class.rotate-180]="dropdownOpen"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>

      <!-- Dropdown Menu -->
      <div
        *ngIf="dropdownOpen"
        class="absolute right-0 mt-2 w-48 bg-white border border-neutral-200 rounded-md shadow-lg z-50"
        role="menu"
      >
        <div class="py-1">
          <!-- Light Theme Option -->
          <button
            type="button"
            class="w-full flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 transition-colors"
            [ngClass]="{
              'bg-primary-50 text-primary-700': currentTheme.theme === 'light',
            }"
            (click)="setTheme('light')"
            role="menuitem"
          >
            <svg
              class="w-4 h-4 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <span class="flex-1 text-left">Light</span>
            <svg
              *ngIf="currentTheme.theme === 'light'"
              class="w-4 h-4 text-primary-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </button>

          <!-- Dark Theme Option -->
          <button
            type="button"
            class="w-full flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 transition-colors"
            [ngClass]="{
              'bg-primary-50 text-primary-700': currentTheme.theme === 'dark',
            }"
            (click)="setTheme('dark')"
            role="menuitem"
          >
            <svg
              class="w-4 h-4 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
            <span class="flex-1 text-left">Dark</span>
            <svg
              *ngIf="currentTheme.theme === 'dark'"
              class="w-4 h-4 text-primary-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </button>

          <!-- Auto Theme Option -->
          <button
            type="button"
            class="w-full flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 transition-colors"
            [ngClass]="{
              'bg-primary-50 text-primary-700': currentTheme.theme === 'auto',
            }"
            (click)="setTheme('auto')"
            role="menuitem"
          >
            <svg
              class="w-4 h-4 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span class="flex-1 text-left">System</span>
            <svg
              *ngIf="currentTheme.theme === 'auto'"
              class="w-4 h-4 text-primary-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  `,
})
export class ThemeToggleComponent implements OnInit, OnDestroy {
  currentTheme: ThemeConfig = { theme: 'light', isDark: false };
  dropdownOpen = false;

  private destroy$ = new Subject<void>();
  private clickOutsideListener?: (event: Event) => void;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    // Subscribe to theme changes
    this.themeService.theme$
      .pipe(takeUntil(this.destroy$))
      .subscribe((theme: any) => {
        this.currentTheme = theme;
      });

    // Setup click outside listener
    this.setupClickOutsideListener();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    if (this.clickOutsideListener) {
      document.removeEventListener('click', this.clickOutsideListener);
    }
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeDropdown(): void {
    this.dropdownOpen = false;
  }

  setTheme(theme: Theme): void {
    this.themeService.setTheme(theme);
    this.closeDropdown();
  }

  private setupClickOutsideListener(): void {
    this.clickOutsideListener = (event: Event) => {
      const target = event.target as HTMLElement;
      const component = target.closest('ds-theme-toggle');

      if (!component && this.dropdownOpen) {
        this.closeDropdown();
      }
    };

    document.addEventListener('click', this.clickOutsideListener);
  }
}
