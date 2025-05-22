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
import { ButtonComponent } from './button.component';
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

@Component({
  selector: 'ds-layout',
  standalone: true,
  template: `
    <div class="min-h-screen bg-neutral-50 flex">
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
        ]"
      >
        <!-- Sidebar Header -->
        <div
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
        <!-- Top Bar -->
        <header
          class="bg-white border-b border-neutral-200 px-4 py-3 flex items-center justify-between"
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

            <!-- Custom Header Left Content -->
            <div *ngIf="headerLeftTemplate">
              <ng-container
                *ngTemplateOutlet="headerLeftTemplate"
              ></ng-container>
            </div>

            <!-- Page Title -->
            <h1
              *ngIf="pageTitle && !headerLeftTemplate"
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

              <!-- User Avatar -->
              <div id="avatar" class="flex items-center space-x-2">
                <ds-avatar
                  [name]="currentUser.name"
                  [src]="currentUser.avatar"
                  size="sm"
                  class="cursor-pointer"
                  (click)="onProfileClick()"
                ></ds-avatar>

                <!-- User Info (Hidden on mobile) -->
                <div class="hidden md:block">
                  <p class="text-sm font-medium text-neutral-800">
                    {{ currentUser.name }}
                  </p>
                  <p *ngIf="currentUser.role" class="text-xs text-neutral-500">
                    {{ currentUser.role }}
                  </p>
                </div>
              </div>

              <!-- Logout Button -->
              <ds-button
                variant="secondary"
                size="sm"
                (buttonClick)="onLogoutClick()"
                [attr.aria-label]="'Logout'"
              >
                <svg
                  class="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="hidden sm:inline">Logout</span>
              </ds-button>
            </div>
          </div>
        </header>

        <!-- Page Content -->
        <main class="flex-1 overflow-auto">
          <ng-content></ng-content>
        </main>

        <!-- Footer -->
        <footer
          *ngIf="footerTemplate"
          class="bg-white border-t border-neutral-200"
        >
          <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
        </footer>
      </div>
    </div>
  `,
  imports: [
    NgClass,
    NgIf,
    NgTemplateOutlet,
    ButtonComponent,
    ButtonComponent,
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
  @Input() collapsible: boolean = true;
  @Input() showNotifications: boolean = true;
  @Input() notificationCount?: number;

  // Events
  @Output() menuItemClick = new EventEmitter<MenuItem>();
  @Output() profileClick = new EventEmitter<LayoutUser>();
  @Output() logoutClick = new EventEmitter<void>();
  @Output() notificationsClick = new EventEmitter<void>();
  @Output() sidebarToggle = new EventEmitter<boolean>();
  @Output() sidebarCollapseToggle = new EventEmitter<boolean>();

  // Internal state
  sidebarOpen = false;
  sidebarCollapsed = false;
  isMobile = false;
  isDesktop = false;

  private resizeListener?: () => void;

  ngOnInit(): void {
    this.checkScreenSize();
    this.setupResizeListener();
  }

  ngOnDestroy(): void {
    if (this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
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

  onLogoutClick(): void {
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

  private checkScreenSize(): void {
    this.isMobile = window.innerWidth < 1024; // lg breakpoint
    this.isDesktop = window.innerWidth >= 1024;

    // Auto-close sidebar on mobile when screen becomes desktop
    if (this.isDesktop && this.sidebarOpen) {
      this.sidebarOpen = false;
    }
  }
}
