// app.component.ts - Example of how to use the layout as your main app shell
import { Component } from '@angular/core';
import { ButtonComponent, CardComponent } from 'ng-design-system-lib';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CardComponent, ButtonComponent],
  template: `
    <div class="space-y-6">
      <!-- Page Header -->
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-neutral-800">Dashboard</h1>
          <p class="text-neutral-600">
            Welcome back! Here's what's happening with your projects.
          </p>
        </div>
        <ds-button variant="primary">
          <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clip-rule="evenodd"
            />
          </svg>
          New Project
        </ds-button>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ds-card
          [noHeader]="true"
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white"
        >
          <div class="p-6">
            <div class="text-3xl font-bold">1,234</div>
            <p class="text-blue-100">Total Users</p>
            <p class="text-blue-100 text-sm mt-1">+12% from last month</p>
          </div>
        </ds-card>

        <ds-card
          [noHeader]="true"
          className="bg-gradient-to-r from-green-500 to-green-600 text-white"
        >
          <div class="p-6">
            <div class="text-3xl font-bold">$45.2K</div>
            <p class="text-green-100">Revenue</p>
            <p class="text-green-100 text-sm mt-1">+8% from last month</p>
          </div>
        </ds-card>

        <ds-card
          [noHeader]="true"
          className="bg-gradient-to-r from-purple-500 to-purple-600 text-white"
        >
          <div class="p-6">
            <div class="text-3xl font-bold">567</div>
            <p class="text-purple-100">Orders</p>
            <p class="text-purple-100 text-sm mt-1">+15% from last month</p>
          </div>
        </ds-card>

        <ds-card
          [noHeader]="true"
          className="bg-gradient-to-r from-orange-500 to-orange-600 text-white"
        >
          <div class="p-6">
            <div class="text-3xl font-bold">89%</div>
            <p class="text-orange-100">Satisfaction</p>
            <p class="text-orange-100 text-sm mt-1">+2% from last month</p>
          </div>
        </ds-card>
      </div>

      <!-- Main Content -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Charts Area -->
        <div class="lg:col-span-2">
          <ds-card title="Analytics Overview">
            <div
              class="h-64 flex items-center justify-center bg-neutral-50 rounded"
            >
              <p class="text-neutral-500">Chart component would go here</p>
            </div>
          </ds-card>
        </div>

        <!-- Recent Activity -->
        <div>
          <ds-card title="Recent Activity">
            <div class="space-y-4">
              <div class="flex items-center space-x-3">
                <div
                  class="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center"
                >
                  <svg
                    class="w-4 h-4 text-primary-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z"
                    />
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-medium">New user registered</p>
                  <p class="text-xs text-neutral-500">2 minutes ago</p>
                </div>
              </div>

              <div class="flex items-center space-x-3">
                <div
                  class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center"
                >
                  <svg
                    class="w-4 h-4 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-medium">Order completed</p>
                  <p class="text-xs text-neutral-500">5 minutes ago</p>
                </div>
              </div>

              <div class="flex items-center space-x-3">
                <div
                  class="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center"
                >
                  <svg
                    class="w-4 h-4 text-yellow-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-medium">Server maintenance</p>
                  <p class="text-xs text-neutral-500">10 minutes ago</p>
                </div>
              </div>
            </div>
          </ds-card>
        </div>
      </div>
    </div>
  `,
})
export class DashboardComponent {}
