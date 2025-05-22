// app.component.ts - Example of how to use the layout as your main app shell
// dashboard.component.ts - Example dashboard page content
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {
  LayoutComponent,
  LayoutUser,
  MenuItem,
} from './layout/layout.component';
import { AvatarComponent } from 'ng-design-system-lib';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LayoutComponent, RouterOutlet, AvatarComponent],
  template: `
    <ds-layout
      [appName]="'Design System'"
      [currentUser]="currentUser"
      [menuItems]="menuItems"
      [collapsible]="true"
      [showNotifications]="true"
      [notificationCount]="notificationCount"
      (menuItemClick)="onMenuItemClick($event)"
      (profileClick)="onProfileClick($event)"
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
      <ng-template #headerRight>
        <div class="flex items-center space-x-3">
          <!-- Search Bar -->
          <div class="hidden md:block">
            <input
              type="search"
              placeholder="Search..."
              class="px-3 py-1 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-200"
            />
          </div>

          <!-- Theme Toggle -->
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

          <!-- Logout Button -->
          <button
            type="button"
            class="p-2 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-md"
            (click)="onLogout()"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
              />
            </svg>
          </button>

          <!-- User Menu -->
          <div class="flex items-center space-x-2">
            <img
              [src]="currentUser.avatar"
              [alt]="currentUser.name"
              class="w-8 h-8 rounded-full cursor-pointer"
              (click)="onProfileClick(currentUser)"
            />
            <div class="hidden md:block">
              <p class="text-sm font-medium text-neutral-800">
                {{ currentUser.name }}
              </p>
              <p class="text-xs text-neutral-500">
                {{ currentUser.role }}
              </p>
            </div>
          </div>
        </div>
      </ng-template>

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
      <div class="p-6">
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

  menuItems: MenuItem[] = [
    {
      active: true,
      label: 'Select',
      icon: 'fas fa-folder',
      route: '/selects',
    },

    {
      divider: true,
      label: 'Settings',
      icon: 'fas fa-cog',
      route: '/settings',
    },
    {
      label: 'Buttons',
      icon: 'fas fa-home',
      route: '/buttons',
    },
    {
      label: 'Tabs',
      icon: 'fas fa-question-circle',
      route: '/tabs',
    },
    {
      label: 'Badges',
      icon: 'fas fa-question-circle',
      route: '/badges',
    },
    {
      label: 'Tables',
      icon: 'fas fa-folder',
      route: '/tables',
      badge: '3',
    },
    {
      label: 'Alerts',
      icon: 'fas fa-users',
      route: '/alerts',
    },

    {
      label: 'Tooltips',
      icon: 'fas fa-chart-bar',
      route: '/tooltips',
    },
    {
      label: 'Modals',
      icon: 'fas fa-chart-bar',
      route: '/modals',
    },
    {
      label: 'Progress & spinners',
      icon: 'fas fa-file-alt',
      route: '/progress',
    },
    {
      label: 'Avatars',
      icon: 'fas fa-question-circle',
      route: '/avatars',
    },
    {
      label: 'Cards',
      icon: 'fas fa-question-circle',
      route: '/cards',
    },
    {
      label: 'Forms',
      icon: 'fas fa-question-circle',
      route: '/forms',
    },
    {
      label: 'Examples',
      icon: 'fas fa-question-circle',
      route: '/examples',
    },
  ];

  constructor(private router: Router) {}

  onMenuItemClick(item: MenuItem): void {
    console.log('Menu item clicked:', item);

    // Navigate to route if specified
    if (item.route) {
      this.router.navigate([item.route]);

      // Update active state
      this.menuItems.forEach((menuItem) => {
        menuItem.active = menuItem.route === item.route;
      });
    }

    // Execute custom action if provided
    if (item.action) {
      item.action();
    }
  }

  onProfileClick(user: LayoutUser): void {
    console.log('Profile clicked:', user);
    // Navigate to profile page or show profile modal
    this.router.navigate(['/profile']);
  }

  onLogout(): void {
    console.log('Logout clicked');
    // Implement logout logic
    // this.authService.logout();
    // this.router.navigate(['/login']);
  }

  onNotificationsClick(): void {
    console.log('Notifications clicked');
    // Show notifications panel or navigate to notifications page
    this.router.navigate(['/notifications']);
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
