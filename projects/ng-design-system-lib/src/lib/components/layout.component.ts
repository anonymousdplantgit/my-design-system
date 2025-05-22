import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { NgClass, NgForOf, NgIf, NgTemplateOutlet } from '@angular/common';
import { AvatarComponent } from './avatar.component';
import { RouterLink, RouterLinkActive } from '@angular/router';

export interface LayoutUser {
  name: string;
  email?: string;
  avatar?: string;
  role?: string;
}

export interface MenuItem {
  label: string;
  icon?: string;
  route?: string;
  action?: () => void;
  children?: MenuItem[];
  disabled?: boolean;
  badge?: string | number;
  divider?: boolean;
  routerLinkActiveOptions?: { exact: boolean };
  queryParams?: any;
  fragment?: string;
}

export interface ProfileMenuItem {
  label: string;
  icon?: string;
  action?: () => void;
  divider?: boolean;
}

@Component({
  selector: 'ds-layout',
  standalone: true,
  template: `
    <div class="h-screen bg-neutral-50 flex flex-col">
      <!-- Top Bar - Fixed -->
      <header
        class="bg-white border-b border-neutral-200 px-4 py-3 flex items-center justify-between flex-shrink-0 z-30"
      >
        <!-- Left Section -->
        <div class="flex items-center">
          <!-- Mobile Menu Button -->
          <button
            *ngIf="isMobile"
            type="button"
            class="mr-3 p-2 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-md lg:hidden"
            (click)="toggleSidebar()"
            [attr.aria-label]="sidebarOpen ? 'Close menu' : 'Open menu'"
          >
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path
                *ngIf="!sidebarOpen"
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              />
              <path
                *ngIf="sidebarOpen"
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>

          <!-- Desktop Collapse Button -->
          <button
            *ngIf="isDesktop && collapsible"
            type="button"
            class="mr-3 p-2 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-md"
            (click)="toggleSidebarCollapse()"
            [attr.aria-label]="
              sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'
            "
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              />
            </svg>
          </button>

          <!-- Logo Section for Desktop -->
          <div *ngIf="isDesktop" class="flex items-center">
            <ng-container *ngIf="logoTemplate; else defaultLogo">
              <ng-container *ngTemplateOutlet="logoTemplate"></ng-container>
            </ng-container>
            <ng-template #defaultLogo>
              <div class="flex items-center">
                <div
                  class="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center text-white font-bold"
                >
                  {{ appName.charAt(0) }}
                </div>
                <span class="ml-2 text-lg font-semibold text-neutral-800">{{
                  appName
                }}</span>
              </div>
            </ng-template>
          </div>

          <!-- Custom Header Left Content -->
          <div *ngIf="headerLeftTemplate">
            <ng-container *ngTemplateOutlet="headerLeftTemplate"></ng-container>
          </div>

          <!-- Page Title -->
          <h1
            *ngIf="pageTitle && !headerLeftTemplate && !isDesktop"
            class="text-lg font-semibold text-neutral-800"
          >
            {{ pageTitle }}
          </h1>
        </div>

        <!-- Right Section -->
        <div class="flex items-center space-x-3">
          <!-- Custom Header Right Content -->
          <div *ngIf="headerRightTemplate">
            <ng-container
              *ngTemplateOutlet="headerRightTemplate"
            ></ng-container>
          </div>

          <!-- Default User Actions -->
          <div
            *ngIf="!headerRightTemplate && currentUser"
            class="flex items-center space-x-3"
          >
            <!-- Notifications Button -->
            <button
              id="notifications"
              *ngIf="showNotifications"
              type="button"
              class="p-2 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-md relative"
              (click)="onNotificationsClick()"
              [attr.aria-label]="'Notifications'"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M10 2C7.8 2 6 3.8 6 6c0 1.9-.45 3.7-1.26 5.2a.75.75 0 00.52 1.08c1.09.17 2.17.32 3.26.51a3.5 3.5 0 006.96 0c1.09-.19 2.17-.34 3.26-.51a.75.75 0 00.52-1.08C18.45 9.7 18 7.9 18 6c0-2.2-1.8-4-4-4H10z"
                />
              </svg>
              <!-- Notification Badge -->
              <span
                *ngIf="notificationCount && notificationCount > 0"
                class="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-danger-500 rounded-full"
              >
                {{ notificationCount > 99 ? '99+' : notificationCount }}
              </span>
            </button>
            <button
              type="button"
              class="p-2 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-md"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
                />
              </svg>
            </button>
            <!-- User Profile Dropdown -->
            <div class="relative" id="profile-dropdown">
              <button
                type="button"
                class="flex items-center space-x-2 p-1 rounded-md hover:bg-neutral-100 transition-colors"
                (click)="toggleProfileDropdown()"
                [attr.aria-expanded]="profileDropdownOpen"
                aria-haspopup="true"
              >
                <ds-avatar
                  [name]="currentUser.name"
                  [src]="currentUser.avatar"
                  size="sm"
                ></ds-avatar>

                <!-- User Info (Hidden on mobile) -->
                <div class="hidden md:block text-left">
                  <p class="text-sm font-medium text-neutral-800">
                    {{ currentUser.name }}
                  </p>
                  <p *ngIf="currentUser.role" class="text-xs text-neutral-500">
                    {{ currentUser.role }}
                  </p>
                </div>

                <!-- Dropdown Arrow -->
                <svg
                  class="w-4 h-4 text-neutral-500 transition-transform"
                  [class.rotate-180]="profileDropdownOpen"
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

              <!-- Profile Dropdown Menu -->
              <div
                *ngIf="profileDropdownOpen"
                class="absolute right-0 mt-2 w-56 bg-white border border-neutral-200 rounded-md shadow-lg z-50"
                role="menu"
                aria-orientation="vertical"
              >
                <!-- User Info Header -->
                <div class="px-4 py-3 border-b border-neutral-200">
                  <p class="text-sm font-medium text-neutral-800">
                    {{ currentUser.name }}
                  </p>
                  <p class="text-sm text-neutral-500">
                    {{ currentUser.email }}
                  </p>
                </div>

                <!-- Profile Menu Items -->
                <div class="py-1">
                  <ng-container *ngFor="let item of profileMenuItems">
                    <!-- Divider -->
                    <div
                      *ngIf="item.divider"
                      class="border-t border-neutral-200 my-1"
                    ></div>

                    <!-- Menu Item -->
                    <button
                      *ngIf="!item.divider"
                      type="button"
                      class="w-full flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 transition-colors text-left"
                      (click)="onProfileMenuItemClick(item)"
                      role="menuitem"
                    >
                      <span *ngIf="item.icon" class="mr-3 flex-shrink-0">
                        <i [class]="item.icon + ' w-4 h-4'"></i>
                      </span>
                      {{ item.label }}
                    </button>
                  </ng-container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Main Layout Container -->
      <div class="flex-1 flex min-h-0">
        <!-- Sidebar Overlay (Mobile) -->
        <div
          *ngIf="sidebarOpen && !isDesktop"
          class="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          (click)="closeSidebar()"
        ></div>

        <!-- Sidebar -->
        <aside
          [ngClass]="[
            'fixed lg:relative inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out',
            'bg-white border-r border-neutral-200 flex flex-col',
            sidebarCollapsed ? 'w-16' : 'w-64',
            sidebarOpen || isDesktop
              ? 'translate-x-0'
              : '-translate-x-full lg:translate-x-0',
            'top-0 lg:top-0',
          ]"
          [style.height]="'100vh'"
          [style.paddingTop]="isDesktop ? '0' : '72px'"
        >
          <!-- Sidebar Header (Only on Mobile) -->
          <div
            *ngIf="isMobile"
            [ngClass]="[
              'flex items-center justify-between p-4 border-b border-neutral-200',
              sidebarCollapsed ? 'px-3' : 'px-4',
            ]"
          >
            <!-- Logo -->
            <div
              *ngIf="!sidebarCollapsed"
              class="flex items-center transition-opacity duration-200"
            >
              <ng-container *ngIf="logoTemplate; else defaultMobileLogo">
                <ng-container *ngTemplateOutlet="logoTemplate"></ng-container>
              </ng-container>
              <ng-template #defaultMobileLogo>
                <div class="flex items-center">
                  <div
                    class="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center text-white font-bold"
                  >
                    {{ appName.charAt(0) }}
                  </div>
                  <span class="ml-2 text-lg font-semibold text-neutral-800">{{
                    appName
                  }}</span>
                </div>
              </ng-template>
            </div>

            <!-- Collapsed Logo -->
            <div
              *ngIf="sidebarCollapsed"
              class="flex items-center justify-center w-full"
            >
              <div
                class="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center text-white font-bold"
              >
                {{ appName.charAt(0) }}
              </div>
            </div>
          </div>

          <!-- Sidebar Content -->
          <div class="flex-1 overflow-y-auto">
            <nav class="p-2 space-y-1">
              <ng-container *ngIf="menuTemplate; else defaultMenu">
                <ng-container *ngTemplateOutlet="menuTemplate"></ng-container>
              </ng-container>

              <ng-template #defaultMenu>
                <div
                  *ngFor="let item of menuItems; trackBy: trackByFn"
                  [ngClass]="{
                    'border-t border-neutral-200 pt-2 mt-2': item.divider,
                  }"
                >
                  <!-- Router Link Item -->
                  <a
                    *ngIf="!item.divider && item.route && !item.action"
                    [routerLink]="item.route"
                    [queryParams]="item.queryParams"
                    [fragment]="item.fragment"
                    routerLinkActive="router-link-active"
                    [routerLinkActiveOptions]="
                      item.routerLinkActiveOptions || { exact: false }
                    "
                    #rla="routerLinkActive"
                    [ngClass]="[
                      'w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150 no-underline',
                      rla.isActive
                        ? 'bg-primary-100 text-primary-700 border-r-2 border-primary-500'
                        : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-800',
                      item.disabled
                        ? 'opacity-50 cursor-not-allowed pointer-events-none'
                        : 'cursor-pointer',
                      sidebarCollapsed ? 'justify-center px-2' : '',
                    ]"
                    [attr.title]="sidebarCollapsed ? item.label : null"
                    (click)="onMenuItemClick(item)"
                  >
                    <!-- Icon -->
                    <span
                      *ngIf="item.icon"
                      [ngClass]="[
                        'flex-shrink-0',
                        sidebarCollapsed ? '' : 'mr-3',
                      ]"
                    >
                      <i [class]="item.icon + ' w-5 h-5'"></i>
                    </span>

                    <!-- Label -->
                    <span
                      *ngIf="!sidebarCollapsed"
                      class="flex-1 text-left truncate"
                      >{{ item.label }}</span
                    >

                    <!-- Badge -->
                    <span
                      *ngIf="item.badge && !sidebarCollapsed"
                      class="ml-auto inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                    >
                      {{ item.badge }}
                    </span>
                  </a>

                  <!-- Action Button Item (no route) -->
                  <button
                    *ngIf="!item.divider && (!item.route || item.action)"
                    type="button"
                    [ngClass]="[
                      'w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150',
                      'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-800',
                      item.disabled
                        ? 'opacity-50 cursor-not-allowed'
                        : 'cursor-pointer',
                      sidebarCollapsed ? 'justify-center px-2' : '',
                    ]"
                    [disabled]="item.disabled"
                    (click)="onMenuItemClick(item)"
                    [attr.title]="sidebarCollapsed ? item.label : null"
                  >
                    <!-- Icon -->
                    <span
                      *ngIf="item.icon"
                      [ngClass]="[
                        'flex-shrink-0',
                        sidebarCollapsed ? '' : 'mr-3',
                      ]"
                    >
                      <i [class]="item.icon + ' w-5 h-5'"></i>
                    </span>

                    <!-- Label -->
                    <span
                      *ngIf="!sidebarCollapsed"
                      class="flex-1 text-left truncate"
                      >{{ item.label }}</span
                    >

                    <!-- Badge -->
                    <span
                      *ngIf="item.badge && !sidebarCollapsed"
                      class="ml-auto inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                    >
                      {{ item.badge }}
                    </span>
                  </button>
                </div>
              </ng-template>
            </nav>
          </div>

          <!-- Sidebar Footer -->
          <div
            *ngIf="sidebarFooterTemplate"
            [ngClass]="[
              'p-4 border-t border-neutral-200',
              sidebarCollapsed ? 'px-2' : 'px-4',
            ]"
          >
            <ng-container
              *ngTemplateOutlet="sidebarFooterTemplate"
            ></ng-container>
          </div>
        </aside>

        <!-- Main Content Area -->
        <div class="flex-1 flex flex-col min-w-0">
          <!-- Page Content - Scrollable -->
          <main class="flex-1 overflow-auto bg-neutral-50">
            <ng-content></ng-content>
          </main>

          <!-- Footer -->
          <footer
            *ngIf="footerTemplate"
            class="bg-white border-t border-neutral-200 flex-shrink-0"
          >
            <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
          </footer>
        </div>
      </div>
    </div>
  `,
  imports: [
    NgClass,
    NgIf,
    NgTemplateOutlet,
    AvatarComponent,
    NgForOf,
    RouterLinkActive,
    RouterLink,
  ],
})
export class LayoutComponent implements OnInit, OnDestroy {
  // Content templates
  @ContentChild('logo') logoTemplate?: TemplateRef<any>;
  @ContentChild('menu') menuTemplate?: TemplateRef<any>;
  @ContentChild('headerLeft') headerLeftTemplate?: TemplateRef<any>;
  @ContentChild('headerRight') headerRightTemplate?: TemplateRef<any>;
  @ContentChild('sidebarFooter') sidebarFooterTemplate?: TemplateRef<any>;
  @ContentChild('footer') footerTemplate?: TemplateRef<any>;

  // Configuration
  @Input() appName: string = 'Design system';
  @Input() pageTitle?: string;
  @Input() currentUser?: LayoutUser;
  @Input() menuItems: MenuItem[] = [];
  @Input() profileMenuItems: ProfileMenuItem[] = [
    {
      label: 'View Profile',
      icon: 'fas fa-user',
      action: () => this.onProfileMenuAction('profile'),
    },
    {
      label: 'Account Settings',
      icon: 'fas fa-cog',
      action: () => this.onProfileMenuAction('settings'),
    },
    {
      label: 'Preferences',
      icon: 'fas fa-sliders-h',
      action: () => this.onProfileMenuAction('preferences'),
    },
    { divider: true, label: '' },
    {
      label: 'Help & Support',
      icon: 'fas fa-question-circle',
      action: () => this.onProfileMenuAction('help'),
    },
    {
      label: 'Sign Out',
      icon: 'fas fa-sign-out-alt',
      action: () => this.onLogoutClick(),
    },
  ];
  @Input() collapsible: boolean = true;
  @Input() showNotifications: boolean = true;
  @Input() notificationCount?: number;

  // Events
  @Output() menuItemClick = new EventEmitter<MenuItem>();
  @Output() profileClick = new EventEmitter<LayoutUser>();
  @Output() profileMenuItemClick = new EventEmitter<ProfileMenuItem>();
  @Output() logoutClick = new EventEmitter<void>();
  @Output() notificationsClick = new EventEmitter<void>();
  @Output() sidebarToggle = new EventEmitter<boolean>();
  @Output() sidebarCollapseToggle = new EventEmitter<boolean>();

  // Internal state
  sidebarOpen = false;
  sidebarCollapsed = false;
  profileDropdownOpen = false;
  isMobile = false;
  isDesktop = false;

  private resizeListener?: () => void;
  private clickOutsideListener?: (event: Event) => void;

  ngOnInit(): void {
    this.checkScreenSize();
    this.setupResizeListener();
    this.setupClickOutsideListener();
  }

  ngOnDestroy(): void {
    if (this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
    }
    if (this.clickOutsideListener) {
      document.removeEventListener('click', this.clickOutsideListener);
    }
  }

  trackByFn(index: number, item: MenuItem): string {
    return item.label!;
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
    this.sidebarToggle.emit(this.sidebarOpen);
  }

  closeSidebar(): void {
    this.sidebarOpen = false;
    this.sidebarToggle.emit(this.sidebarOpen);
  }

  toggleSidebarCollapse(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
    this.sidebarCollapseToggle.emit(this.sidebarCollapsed);
  }

  toggleProfileDropdown(): void {
    this.profileDropdownOpen = !this.profileDropdownOpen;
  }

  closeProfileDropdown(): void {
    this.profileDropdownOpen = false;
  }

  onMenuItemClick(item: MenuItem): void {
    if (item.disabled) return;

    // Close mobile sidebar after clicking menu item
    if (this.isMobile) {
      this.closeSidebar();
    }

    // Execute custom action if provided
    if (item.action) {
      item.action();
    }

    this.menuItemClick.emit(item);
  }

  onProfileClick(): void {
    if (this.currentUser) {
      this.profileClick.emit(this.currentUser);
    }
  }

  onProfileMenuItemClick(item: ProfileMenuItem): void {
    this.closeProfileDropdown();

    if (item.action) {
      item.action();
    }

    this.profileMenuItemClick.emit(item);
  }

  onProfileMenuAction(action: string): void {
    console.log('Profile menu action:', action);
    // These will emit the corresponding events that the parent can handle
    if (action === 'profile') {
      this.onProfileClick();
    }
  }

  onLogoutClick(): void {
    this.closeProfileDropdown();
    this.logoutClick.emit();
  }

  onNotificationsClick(): void {
    this.notificationsClick.emit();
  }

  private setupResizeListener(): void {
    this.resizeListener = () => {
      this.checkScreenSize();
    };
    window.addEventListener('resize', this.resizeListener);
  }

  private setupClickOutsideListener(): void {
    this.clickOutsideListener = (event: Event) => {
      const target = event.target as HTMLElement;
      const profileDropdown = document.getElementById('profile-dropdown');

      if (
        this.profileDropdownOpen &&
        profileDropdown &&
        !profileDropdown.contains(target)
      ) {
        this.closeProfileDropdown();
      }
    };
    document.addEventListener('click', this.clickOutsideListener);
  }

  private checkScreenSize(): void {
    this.isMobile = window.innerWidth < 1024; // lg breakpoint
    this.isDesktop = window.innerWidth >= 1024;

    // Auto-close sidebar on mobile when screen becomes desktop
    if (this.isDesktop && this.sidebarOpen) {
      this.sidebarOpen = false;
    }

    // Auto-close profile dropdown on resize
    if (this.profileDropdownOpen) {
      this.closeProfileDropdown();
    }
  }
}
