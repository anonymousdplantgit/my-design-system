import {Component} from '@angular/core';
import {TableColumnComponent, TableComponent,} from 'ng-design-system-lib';
import {ShowcaseSectionComponent} from '../shared/showcase-section.component';
import {ExampleBoxComponent} from '../shared/example-box.component';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  lastLogin: Date;
}

@Component({
  selector: 'app-tables-showcase',
  standalone: true,
  imports: [
    ShowcaseSectionComponent,
    ExampleBoxComponent,
    TableComponent,
    TableColumnComponent,
    TableColumnComponent,
  ],
  template: `
    <app-showcase-section title="Data Display Components">
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

    </app-showcase-section>
  `,
})
export class TablesShowcaseComponent {
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
