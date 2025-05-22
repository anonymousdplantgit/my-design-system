// app.component.ts - Updated to handle profile dropdown events
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import {
  AvatarComponent,
  LayoutComponent,
  LayoutUser,
  MenuItem,
  ProfileMenuItem,
} from 'ng-design-system-lib';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AvatarComponent, LayoutComponent],
  template: `
    <ds-layout
      [appName]="'Design System'"
      [currentUser]="currentUser"
      [menuItems]="menuItems"
      [profileMenuItems]="customProfileMenuItems"
      [collapsible]="true"
      [showNotifications]="true"
      [notificationCount]="notificationCount"
      (menuItemClick)="onMenuItemClick($event)"
      (profileClick)="onProfileClick($event)"
      (profileMenuItemClick)="onProfileMenuItemClick($event)"
      (logoutClick)="onLogout()"
      (notificationsClick)="onNotificationsClick()"
    >
      <!-- Custom Logo Template -->
      <ng-template #logo>
        <div class="flex items-center">
          <ds-avatar [name]="'DS'" [rounded]="false"></ds-avatar>
          <span class="ml-3 text-lg font-bold text-neutral-800">
            Design system
          </span>
        </div>
      </ng-template>

      <!-- Custom Header Right Content -->
      <!-- <ng-template #headerRight>
        <div class="flex items-center space-x-3">
          &lt;!&ndash; Search Bar &ndash;&gt;
          <div class="hidden md:block">
            <input
              type="search"
              placeholder="Search..."
              class="px-3 py-1 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-200"
            />
          </div>

          &lt;!&ndash; Theme Toggle &ndash;&gt;
          <button
            type="button"
            class="p-2 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-md"
            (click)="toggleTheme()"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
              />
            </svg>
          </button>
        </div>
      </ng-template>-->

      <!-- Sidebar Footer -->
      <ng-template #sidebarFooter>
        <div class="px-3 py-2 text-center">
          <p class="text-xs text-neutral-500">v1.0.0</p>
          <button
            class="text-xs text-primary-600 hover:text-primary-800"
            (click)="showHelp()"
          >
            Help & Support
          </button>
        </div>
      </ng-template>

      <!-- Main Content (Router Outlet) -->
      <div class="h-full">
        <router-outlet></router-outlet>
      </div>

      <!-- Footer -->
      <ng-template #footer>
        <div class="px-6 py-4 bg-neutral-50 border-t border-neutral-200">
          <div
            class="flex justify-between items-center text-sm text-neutral-600"
          >
            <div>© 2024 Your Company. All rights reserved.</div>
            <div class="flex space-x-4">
              <a href="/privacy" class="hover:text-neutral-800"
                >Privacy Policy</a
              >
              <a href="/terms" class="hover:text-neutral-800"
                >Terms of Service</a
              >
              <a href="/contact" class="hover:text-neutral-800">Contact</a>
            </div>
          </div>
        </div>
      </ng-template>
    </ds-layout>
  `,
})
export class AppComponent {
  currentUser: LayoutUser = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://i.pravatar.cc/150?img=1',
    role: 'Administrator',
  };

  notificationCount = 5;

  // Custom profile menu items
  customProfileMenuItems: ProfileMenuItem[] = [
    {
      label: 'View Profile',
      icon: 'fas fa-user',
      action: () => this.navigateToProfile(),
    },
    {
      label: 'Edit Profile',
      icon: 'fas fa-edit',
      action: () => this.editProfile(),
    },
    {
      label: 'Account Settings',
      icon: 'fas fa-cog',
      action: () => this.navigateToSettings(),
    },
    {
      label: 'Preferences',
      icon: 'fas fa-sliders-h',
      action: () => this.openPreferences(),
    },
    { divider: true, label: '' },
    {
      label: 'Billing',
      icon: 'fas fa-credit-card',
      action: () => this.navigateToBilling(),
    },
    {
      label: 'Help & Support',
      icon: 'fas fa-question-circle',
      action: () => this.showHelp(),
    },
    { divider: true, label: '' },
    {
      label: 'Sign Out',
      icon: 'fas fa-sign-out-alt',
      action: () => this.onLogout(),
    },
  ];

  menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'fas fa-tachometer-alt',
      route: '/dashboard',
      routerLinkActiveOptions: { exact: false },
    },
    {
      label: 'Select Components',
      icon: 'fas fa-list',
      route: '/selects',
      routerLinkActiveOptions: { exact: false },
    },
    {
      divider: true,
      label: 'UI Components',
      icon: 'fas fa-puzzle-piece',
      route: '/components',
      routerLinkActiveOptions: { exact: false },
    },
    {
      label: 'Buttons',
      icon: 'fas fa-mouse-pointer',
      route: '/buttons',
      routerLinkActiveOptions: { exact: false },
    },
    {
      label: 'Forms',
      icon: 'fas fa-edit',
      route: '/forms',
      routerLinkActiveOptions: { exact: false },
    },
    {
      label: 'Tables',
      icon: 'fas fa-table',
      route: '/tables',
      badge: '3',
      routerLinkActiveOptions: { exact: false },
    },
    {
      label: 'Cards',
      icon: 'fas fa-square',
      route: '/cards',
      routerLinkActiveOptions: { exact: false },
    },
    {
      label: 'Tabs',
      icon: 'fas fa-folder',
      route: '/tabs',
      routerLinkActiveOptions: { exact: false },
    },
    {
      label: 'Alerts',
      icon: 'fas fa-exclamation-triangle',
      route: '/alerts',
      routerLinkActiveOptions: { exact: false },
    },
    {
      label: 'Modals',
      icon: 'fas fa-window-restore',
      route: '/modals',
      routerLinkActiveOptions: { exact: false },
    },
    {
      label: 'Tooltips',
      icon: 'fas fa-comment',
      route: '/tooltips',
      routerLinkActiveOptions: { exact: false },
    },
    {
      label: 'Badges',
      icon: 'fas fa-tag',
      route: '/badges',
      routerLinkActiveOptions: { exact: false },
    },
    {
      label: 'Avatars',
      icon: 'fas fa-user-circle',
      route: '/avatars',
      routerLinkActiveOptions: { exact: false },
    },
    {
      label: 'Progress & Spinners',
      icon: 'fas fa-spinner',
      route: '/progress',
      routerLinkActiveOptions: { exact: false },
    },
    {
      divider: true,
      label: 'Examples',
      icon: 'fas fa-code',
      route: '/examples',
      routerLinkActiveOptions: { exact: false },
    },
  ];

  constructor(private router: Router) {}

  onMenuItemClick(item: MenuItem): void {
    console.log('Menu item clicked:', item);
    // Execute custom action if provided
    if (item.action) {
      item.action();
    }
  }

  onProfileClick(user: LayoutUser): void {
    console.log('Profile clicked:', user);
    // Navigate to profile page
    this.navigateToProfile();
  }

  onProfileMenuItemClick(item: ProfileMenuItem): void {
    console.log('Profile menu item clicked:', item);
    // The action is already executed in the item's action property
  }

  onLogout(): void {
    console.log('Logout clicked');
    // Implement logout logic
    if (confirm('Are you sure you want to sign out?')) {
      // Clear user session, redirect to login, etc.
      // this.authService.logout();
      // this.router.navigate(['/login']);
      alert('Logged out successfully!');
    }
  }

  onNotificationsClick(): void {
    console.log('Notifications clicked');
    // Show notifications panel or navigate to notifications page
    this.router.navigate(['/notifications']);
  }

  // Profile-related methods
  navigateToProfile(): void {
    console.log('Navigating to profile');
    this.router.navigate(['/profile']);
  }

  editProfile(): void {
    console.log('Opening edit profile');
    this.router.navigate(['/profile/edit']);
  }

  navigateToSettings(): void {
    console.log('Navigating to settings');
    this.router.navigate(['/settings']);
  }

  openPreferences(): void {
    console.log('Opening preferences');
    this.router.navigate(['/preferences']);
  }

  navigateToBilling(): void {
    console.log('Navigating to billing');
    this.router.navigate(['/billing']);
  }

  toggleTheme(): void {
    // Implement theme switching logic
    console.log('Theme toggle clicked');
  }

  showHelp(): void {
    // Show help modal or navigate to help page
    console.log('Help clicked');
    this.router.navigate(['/help']);
  }
}
