import { Component } from '@angular/core';
import {
  BadgeComponent,
  TabComponent,
  TableColumnComponent,
  TableComponent,
  TabsComponent,
} from 'design-lib';
import { ShowcaseSectionComponent } from '../shared/showcase-section.component';
import { ExampleBoxComponent } from '../shared/example-box.component';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  lastLogin: Date;
}

@Component({
  selector: 'app-data-display-showcase',
  standalone: true,
  imports: [
    ShowcaseSectionComponent,
    ExampleBoxComponent,
    BadgeComponent,
    TableComponent,
    TableColumnComponent,
    TabsComponent,
    TabComponent,
    TableColumnComponent,
  ],
  template: `
    <app-showcase-section title="Data Display Components">
      <!-- Badges -->
      <app-example-box title="Badges" description="Small status indicators">
        <div class="flex flex-col space-y-4">
          <div>
            <p class="text-sm text-neutral-600 mb-2">Badge Variants:</p>
            <div class="flex flex-wrap gap-3">
              <ds-badge variant="primary">Primary</ds-badge>
              <ds-badge variant="secondary">Secondary</ds-badge>
              <ds-badge variant="success">Success</ds-badge>
              <ds-badge variant="danger">Danger</ds-badge>
              <ds-badge variant="warning">Warning</ds-badge>
              <ds-badge variant="info">Info</ds-badge>
            </div>
          </div>

          <div>
            <p class="text-sm text-neutral-600 mb-2">Sizes:</p>
            <div class="flex flex-wrap items-center gap-3">
              <ds-badge variant="primary" size="sm">Small</ds-badge>
              <ds-badge variant="primary" size="md">Medium</ds-badge>
              <ds-badge variant="primary" size="lg">Large</ds-badge>
            </div>
          </div>

          <div>
            <p class="text-sm text-neutral-600 mb-2">Outlined Badges:</p>
            <div class="flex flex-wrap gap-3">
              <ds-badge variant="primary" [outlined]="true">Primary</ds-badge>
              <ds-badge variant="secondary" [outlined]="true"
                >Secondary</ds-badge
              >
              <ds-badge variant="success" [outlined]="true">Success</ds-badge>
              <ds-badge variant="danger" [outlined]="true">Danger</ds-badge>
              <ds-badge variant="warning" [outlined]="true">Warning</ds-badge>
              <ds-badge variant="info" [outlined]="true">Info</ds-badge>
            </div>
          </div>

          <div>
            <p class="text-sm text-neutral-600 mb-2">Shapes:</p>
            <div class="flex flex-wrap gap-3">
              <ds-badge variant="primary" [rounded]="true">Rounded</ds-badge>
              <ds-badge variant="primary" [rounded]="false">Square</ds-badge>
            </div>
          </div>

          <div>
            <p class="text-sm text-neutral-600 mb-2">With Content:</p>
            <div class="flex flex-wrap items-center gap-3">
              <ds-badge variant="success">+24%</ds-badge>
              <ds-badge variant="danger">-12%</ds-badge>
              <ds-badge variant="warning">3 days left</ds-badge>
              <ds-badge variant="info">New</ds-badge>
            </div>
          </div>
        </div>
      </app-example-box>

      <!-- Tables -->
      <app-example-box
        title="Data Tables"
        description="For displaying tabular data"
      >
        <div class="flex flex-col space-y-6">
          <ds-table
            [data]="users"
            [filterable]="true"
            [sortable]="true"
            [paginated]="true"
            [selectable]="true"
          >
            <ds-table-column field="id" header="ID" [sortable]="true">
            </ds-table-column>
            <ds-table-column
              field="name"
              header="Name"
              [sortable]="true"
              [filterable]="true"
            >
            </ds-table-column>
            <ds-table-column
              field="email"
              header="Email"
              [sortable]="true"
              [filterable]="true"
            >
            </ds-table-column>
            <ds-table-column field="role" header="Role" [sortable]="true">
            </ds-table-column>
            <ds-table-column field="status" header="Status" [sortable]="true">
            </ds-table-column>
            <ds-table-column
              field="lastLogin"
              header="Last Login"
              [sortable]="true"
              [format]="formatDate"
            >
            </ds-table-column>
          </ds-table>
        </div>
      </app-example-box>

      <!-- Tabs -->
      <app-example-box
        title="Tabs"
        description="Organize content into separate views"
      >
        <div class="flex flex-col space-y-6">
          <div>
            <p class="text-sm text-neutral-600 mb-2">Default Tabs:</p>
            <ds-tabs>
              <ds-tab title="Profile">
                <div class="py-3">
                  <h3 class="font-medium">Profile Content</h3>
                  <p class="mt-1">This is the content for the profile tab.</p>
                </div>
              </ds-tab>
              <ds-tab title="Settings">
                <div class="py-3">
                  <h3 class="font-medium">Settings Content</h3>
                  <p class="mt-1">This is the content for the settings tab.</p>
                </div>
              </ds-tab>
              <ds-tab title="Notifications">
                <div class="py-3">
                  <h3 class="font-medium">Notifications Content</h3>
                  <p class="mt-1">
                    This is the content for the notifications tab.
                  </p>
                </div>
              </ds-tab>
            </ds-tabs>
          </div>

          <div>
            <p class="text-sm text-neutral-600 mb-2">Pills Variant:</p>
            <ds-tabs variant="pills">
              <ds-tab title="Day">
                <div class="py-3">
                  <p>Daily view content</p>
                </div>
              </ds-tab>
              <ds-tab title="Week">
                <div class="py-3">
                  <p>Weekly view content</p>
                </div>
              </ds-tab>
              <ds-tab title="Month">
                <div class="py-3">
                  <p>Monthly view content</p>
                </div>
              </ds-tab>
              <ds-tab title="Year">
                <div class="py-3">
                  <p>Yearly view content</p>
                </div>
              </ds-tab>
            </ds-tabs>
          </div>

          <div>
            <p class="text-sm text-neutral-600 mb-2">Underlined Tabs:</p>
            <ds-tabs variant="underline">
              <ds-tab title="Details">
                <div class="py-3">
                  <p>Details content</p>
                </div>
              </ds-tab>
              <ds-tab title="Documents">
                <div class="py-3">
                  <p>Documents content</p>
                </div>
              </ds-tab>
              <ds-tab title="Activity" [disabled]="true">
                <div class="py-3">
                  <p>Activity content</p>
                </div>
              </ds-tab>
              <ds-tab title="History">
                <div class="py-3">
                  <p>History content</p>
                </div>
              </ds-tab>
            </ds-tabs>
          </div>

          <div>
            <p class="text-sm text-neutral-600 mb-2">Full Width Tabs:</p>
            <ds-tabs [fullWidth]="true" [justified]="true">
              <ds-tab title="Tab 1">
                <div class="py-3">
                  <p>Content for tab 1</p>
                </div>
              </ds-tab>
              <ds-tab title="Tab 2">
                <div class="py-3">
                  <p>Content for tab 2</p>
                </div>
              </ds-tab>
              <ds-tab title="Tab 3">
                <div class="py-3">
                  <p>Content for tab 3</p>
                </div>
              </ds-tab>
            </ds-tabs>
          </div>
        </div>
      </app-example-box>
    </app-showcase-section>
  `,
})
export class DataDisplayShowcaseComponent {
  users: User[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'Admin',
      status: 'active',
      lastLogin: new Date('2023-01-10T08:30:00'),
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'Editor',
      status: 'active',
      lastLogin: new Date('2023-01-15T14:20:00'),
    },
    {
      id: 3,
      name: 'Robert Johnson',
      email: 'robert.j@example.com',
      role: 'Viewer',
      status: 'inactive',
      lastLogin: new Date('2022-12-25T10:15:00'),
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.d@example.com',
      role: 'Editor',
      status: 'active',
      lastLogin: new Date('2023-01-18T09:45:00'),
    },
    {
      id: 5,
      name: 'Michael Brown',
      email: 'michael.b@example.com',
      role: 'Viewer',
      status: 'pending',
      lastLogin: new Date('2023-01-05T16:30:00'),
    },
    {
      id: 6,
      name: 'Sarah Wilson',
      email: 'sarah.w@example.com',
      role: 'Editor',
      status: 'active',
      lastLogin: new Date('2023-01-17T11:20:00'),
    },
    {
      id: 7,
      name: 'David Lee',
      email: 'david.l@example.com',
      role: 'Admin',
      status: 'active',
      lastLogin: new Date('2023-01-19T08:10:00'),
    },
    {
      id: 8,
      name: 'Lisa Taylor',
      email: 'lisa.t@example.com',
      role: 'Viewer',
      status: 'inactive',
      lastLogin: new Date('2022-12-30T14:50:00'),
    },
    {
      id: 9,
      name: 'James Anderson',
      email: 'james.a@example.com',
      role: 'Editor',
      status: 'pending',
      lastLogin: new Date('2023-01-08T10:30:00'),
    },
    {
      id: 10,
      name: 'Jennifer Martin',
      email: 'jennifer.m@example.com',
      role: 'Viewer',
      status: 'active',
      lastLogin: new Date('2023-01-16T13:15:00'),
    },
  ];

  formatDate(value: Date): string {
    if (!value) return '';
    return value.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}
