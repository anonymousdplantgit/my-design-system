import {Component} from '@angular/core';
import {AvatarComponent, BadgeComponent, ButtonComponent, CardComponent,} from 'ng-design-system-lib';
import {ShowcaseSectionComponent} from '../shared/showcase-section.component';
import {ExampleBoxComponent} from '../shared/example-box.component';

@Component({
  selector: 'app-cards-showcase',
  standalone: true,
  imports: [
    AvatarComponent,
    BadgeComponent,
    ButtonComponent,
    CardComponent,
    ShowcaseSectionComponent,
    ExampleBoxComponent,
  ],
  template: `
    <app-showcase-section title="Layout Components">
      <!-- Cards -->
      <app-example-box
        title="Cards"
        description="Containers for content and actions"
      >
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Basic Card -->
          <ds-card title="Basic Card" subtitle="Card subtitle">
            <p>This is a basic card with a title and subtitle.</p>
            <p class="mt-2">
              Cards are used to group related content and actions.
            </p>
          </ds-card>

          <!-- Card with Image -->
          <ds-card
            title="Card with Image"
            imgSrc="https://primefaces.org/cdn/primeng/images/card-ng.jpg"
            imgAlt="Card image"
          >
            <p>This card includes an image at the top.</p>
          </ds-card>

          <!-- Card with Footer -->
          <ds-card title="Card with Footer">
            <p>This card includes a footer section with actions.</p>

            <ng-template #footerTemplate>
              <div class="flex justify-end space-x-2">
                <ds-button variant="secondary" size="sm">Cancel</ds-button>
                <ds-button variant="primary" size="sm">Save</ds-button>
              </div>
            </ng-template>
          </ds-card>

          <!-- Borderless Card -->
          <ds-card title="Borderless Card" [bordered]="false">
            <p>This card doesn't have a border.</p>
          </ds-card>

          <!-- Hoverable Card -->
          <ds-card title="Hoverable Card" [hoverable]="true">
            <p>This card has a hover effect. Try hovering over it!</p>
          </ds-card>

          <!-- Custom Card -->
          <ds-card [noHeader]="true" bodyClass="p-0">
            <div class="p-4 bg-primary-500 text-white">
              <h3 class="text-lg font-medium">Custom Card</h3>
              <p class="text-sm opacity-80">With custom styling</p>
            </div>
            <div class="p-4">
              <p>This card uses custom styling.</p>
            </div>

            <ng-template #footerTemplate>
              <div class="flex justify-between items-center">
                <span class="text-xs text-neutral-500"
                  >Last updated: Today</span
                >
                <ds-button variant="link" size="sm">View details</ds-button>
              </div>
            </ng-template>
          </ds-card>
        </div>
      </app-example-box>


      <!-- Card Layouts -->
      <app-example-box
        title="Card Layout Examples"
        description="Common card layout patterns"
      >
        <div class="flex flex-col space-y-6">
          <!-- Simple Grid -->
          <div>
            <p class="text-sm text-neutral-600 mb-2">Grid Layout:</p>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <ds-card title="Card 1">
                <p>Grid layout card example.</p>
              </ds-card>
              <ds-card title="Card 2">
                <p>Grid layout card example.</p>
              </ds-card>
              <ds-card title="Card 3">
                <p>Grid layout card example.</p>
              </ds-card>
            </div>
          </div>

          <!-- Dashboard Layout -->
          <div>
            <p class="text-sm text-neutral-600 mb-2">Dashboard Layout:</p>
            <div class="grid grid-cols-6 gap-4">
              <!-- Main Content -->
              <div class="col-span-6 md:col-span-4">
                <ds-card title="Main Content">
                  <p>
                    This is the main content area that spans multiple columns.
                  </p>
                  <p class="mt-2">
                    It typically contains the primary information or data
                    visualization.
                  </p>
                </ds-card>
              </div>

              <!-- Sidebar -->
              <div class="col-span-6 md:col-span-2 flex flex-col space-y-4">
                <ds-card
                  title="Statistics"
                  [bordered]="false"
                  className="bg-neutral-50"
                >
                  <div class="flex justify-between">
                    <div>
                      <p class="text-sm text-neutral-500">Total Users</p>
                      <p class="text-2xl font-semibold">1,248</p>
                    </div>
                    <div>
                      <ds-badge variant="success">+12%</ds-badge>
                    </div>
                  </div>
                </ds-card>

                <ds-card title="Recent Activity">
                  <div class="flex flex-col space-y-3">
                    <div class="flex items-center">
                      <ds-avatar size="sm" name="JD"></ds-avatar>
                      <span class="ml-2 text-sm">John added a new comment</span>
                    </div>
                    <div class="flex items-center">
                      <ds-avatar size="sm" name="AS"></ds-avatar>
                      <span class="ml-2 text-sm"
                        >Alice updated her profile</span
                      >
                    </div>
                  </div>
                </ds-card>
              </div>
            </div>
          </div>

          <!-- List with Action Cards -->
          <div>
            <p class="text-sm text-neutral-600 mb-2">List with Actions:</p>
            <div class="flex flex-col space-y-3">
              <ds-card [bordered]="true">
                <div class="flex justify-between items-center">
                  <div>
                    <h3 class="font-medium">Project Alpha</h3>
                    <p class="text-sm text-neutral-500">Started 2 weeks ago</p>
                  </div>
                  <div>
                    <ds-button variant="primary" size="sm">View</ds-button>
                  </div>
                </div>
              </ds-card>

              <ds-card [bordered]="true">
                <div class="flex justify-between items-center">
                  <div>
                    <h3 class="font-medium">Project Beta</h3>
                    <p class="text-sm text-neutral-500">Started 5 days ago</p>
                  </div>
                  <div>
                    <ds-button variant="primary" size="sm">View</ds-button>
                  </div>
                </div>
              </ds-card>

              <ds-card [bordered]="true">
                <div class="flex justify-between items-center">
                  <div>
                    <h3 class="font-medium">Project Gamma</h3>
                    <p class="text-sm text-neutral-500">Started yesterday</p>
                  </div>
                  <div>
                    <ds-button variant="primary" size="sm">View</ds-button>
                  </div>
                </div>
              </ds-card>
            </div>
          </div>
        </div>
      </app-example-box>
    </app-showcase-section>
  `,
})
export class CardsShowcaseComponent {}
