import {
  Component,
  Input,
  Output,
  EventEmitter,
  ContentChildren,
  QueryList,
  AfterContentInit, TemplateRef,
} from '@angular/core';
import { NgClass, NgForOf, NgIf, NgTemplateOutlet } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Column definition component
@Component({
  selector: 'ds-table-column',
  template: `<ng-content></ng-content>`,
  standalone: true
})
export class TableColumnComponent {
  @Input() field: string = '';
  @Input() header: string = '';
  @Input() sortable: boolean = false;
  @Input() filterable: boolean = false;
  @Input() width: string = '';
  @Input() cellClass: string = '';
  @Input() headerClass: string = '';
  @Input() align: 'left' | 'center' | 'right' = 'left';
  @Input() format?: (value: any, row: any) => string;

  // Custom templates for header and cell
  @Input() headerTemplate?: TemplateRef<any>;
  @Input() cellTemplate?: TemplateRef<any>;
}

@Component({
  selector: 'ds-table',
  template: `
    <div [ngClass]="wrapperClass" class="relative">
      <div *ngIf="loading" class="absolute inset-0 bg-white bg-opacity-60 flex items-center justify-center z-10">
        <div class="animate-spin rounded-full h-10 w-10 border-4 border-primary-500 border-t-transparent"></div>
      </div>

      <!-- Quick filter -->
      <div *ngIf="filterable" class="mb-4">
        <div class="flex items-center">
          <div class="relative flex-grow">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-neutral-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              class="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-md leading-5 bg-white placeholder-neutral-500 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              placeholder="Search..."
              [(ngModel)]="filterValue"
              (input)="applyFilter()"
            />
          </div>

          <button *ngIf="filterValue"
                  class="ml-2 p-2 text-neutral-400 hover:text-neutral-500"
                  (click)="clearFilter()">
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table [ngClass]="tableClass">
          <thead>
            <tr>
              <th *ngFor="let col of columns"
                  [ngClass]="[
                    getHeaderClasses(col),
                    col.sortable ? 'cursor-pointer select-none' : '',
                    'relative'
                  ]"
                  [style.width]="col.width"
                  (click)="col.sortable && sort(col.field)">

                <!-- Custom header template -->
                <ng-container *ngIf="col.headerTemplate; else defaultHeaderTemplate">
                  <ng-container *ngTemplateOutlet="col.headerTemplate; context: { $implicit: col }"></ng-container>
                </ng-container>

                <!-- Default header template -->
                <ng-template #defaultHeaderTemplate>
                  <div class="flex items-center">
                    <span>{{ col.header }}</span>

                    <!-- Sort icons -->
                    <span *ngIf="col.sortable" class="ml-1">
                      <svg *ngIf="sortField !== col.field" class="h-4 w-4 text-neutral-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" />
                        <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1z" clip-rule="evenodd" />
                      </svg>
                      <svg *ngIf="sortField === col.field && sortOrder === 'asc'" class="h-4 w-4 text-primary-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd" />
                      </svg>
                      <svg *ngIf="sortField === col.field && sortOrder === 'desc'" class="h-4 w-4 text-primary-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                      </svg>
                    </span>
                  </div>
                </ng-template>
              </th>
            </tr>
          </thead>

          <tbody>
            <tr *ngIf="loading || filteredData.length === 0">
              <td [attr.colspan]="columns.length" class="text-center py-4">
                <span *ngIf="loading">Loading...</span>
                <span *ngIf="!loading && filteredData.length === 0">No records found</span>
              </td>
            </tr>

            <ng-container *ngIf="!loading && filteredData.length > 0">
              <tr *ngFor="let row of paginatedData; let rowIndex = index"
                  [ngClass]="[
                    rowClass,
                    rowIndex % 2 === 0 ? 'bg-white' : 'bg-neutral-50',
                    selectable ? 'cursor-pointer hover:bg-neutral-100' : ''
                  ]"
                  (click)="selectable && onRowClick(row)">

                <td *ngFor="let col of columns"
                    [ngClass]="getCellClasses(col)">

                  <!-- Custom cell template -->
                  <ng-container *ngIf="col.cellTemplate; else defaultCellTemplate">
                    <ng-container *ngTemplateOutlet="col.cellTemplate; context: { $implicit: row, rowData: row, column: col }"></ng-container>
                  </ng-container>

                  <!-- Default cell template -->
                  <ng-template #defaultCellTemplate>
                    {{ getCellValue(row, col) }}
                  </ng-template>
                </td>
              </tr>
            </ng-container>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div *ngIf="paginated && filteredData.length > 0" class="mt-4 flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <select
            class="border border-neutral-300 rounded-md text-sm py-1 px-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            [(ngModel)]="pageSize"
            (change)="onPageSizeChange()">
            <option *ngFor="let size of pageSizeOptions" [value]="size">{{ size }} per page</option>
          </select>

          <span class="text-sm text-neutral-600">
            Showing {{ (currentPage - 1) * pageSize + 1 }} to {{ Math.min(currentPage * pageSize, filteredData.length) }} of {{ filteredData.length }} entries
          </span>
        </div>

        <div class="flex items-center space-x-1">
          <button
            class="relative inline-flex items-center px-2 py-1 border border-neutral-300 bg-white text-sm font-medium text-neutral-500 hover:bg-neutral-50 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            [disabled]="currentPage === 1"
            [ngClass]="currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''"
            (click)="goToPage(1)">
            <span class="sr-only">First Page</span>
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
              <path fill-rule="evenodd" d="M7.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L3.414 10l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
            </svg>
          </button>

          <button
            class="relative inline-flex items-center px-2 py-1 border border-neutral-300 bg-white text-sm font-medium text-neutral-500 hover:bg-neutral-50 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            [disabled]="currentPage === 1"
            [ngClass]="currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''"
            (click)="goToPage(currentPage - 1)">
            <span class="sr-only">Previous</span>
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </button>

          <span
            *ngFor="let page of visiblePages"
            class="relative inline-flex items-center px-3 py-1 border text-sm font-medium focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            [ngClass]="page === currentPage ? 'bg-primary-500 text-white border-primary-500' : 'bg-white text-neutral-500 border-neutral-300 hover:bg-neutral-50'"
            (click)="goToPage(page)">
            {{ page }}
          </span>

          <button
            class="relative inline-flex items-center px-2 py-1 border border-neutral-300 bg-white text-sm font-medium text-neutral-500 hover:bg-neutral-50 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            [disabled]="currentPage === totalPages"
            [ngClass]="currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''"
            (click)="goToPage(currentPage + 1)">
            <span class="sr-only">Next</span>
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
          </button>

          <button
            class="relative inline-flex items-center px-2 py-1 border border-neutral-300 bg-white text-sm font-medium text-neutral-500 hover:bg-neutral-50 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            [disabled]="currentPage === totalPages"
            [ngClass]="currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''"
            (click)="goToPage(totalPages)">
            <span class="sr-only">Last Page</span>
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 15.707a1 1 0 001.414 0l5-5a1 1 0 000-1.414l-5-5a1 1 0 00-1.414 1.414L8.586 10 4.293 14.293a1 1 0 000 1.414z" clip-rule="evenodd" />
              <path fill-rule="evenodd" d="M12.293 15.707a1 1 0 001.414 0l5-5a1 1 0 000-1.414l-5-5a1 1 0 00-1.414 1.414L16.586 10l-4.293 4.293a1 1 0 000 1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  `,
  imports: [NgClass, NgForOf, NgIf, NgTemplateOutlet, FormsModule],
  standalone: true
})
export class TableComponent<T = any> implements AfterContentInit {
  @ContentChildren(TableColumnComponent) columnComponents!: QueryList<TableColumnComponent>;

  @Input() data: T[] = [];
  @Input() loading: boolean = false;
  @Input() wrapperClass: string = '';
  @Input() tableClass: string = 'min-w-full divide-y divide-neutral-200 border-collapse';
  @Input() rowClass: string = '';
  @Input() selectable: boolean = false;

  // Filtering
  @Input() filterable: boolean = false;
  @Input() filterFields: string[] = [];
  @Input() defaultFilterValue: string = '';

  // Sorting
  @Input() sortable: boolean = true;
  @Input() defaultSortField: string = '';
  @Input() defaultSortOrder: 'asc' | 'desc' = 'asc';

  // Pagination
  @Input() paginated: boolean = false;
  @Input() pageSize: number = 10;
  @Input() pageSizeOptions: number[] = [5, 10, 25, 50];

  @Output() rowClick = new EventEmitter<T>();
  @Output() dataChange = new EventEmitter<T[]>();

  // Internal state
  columns: TableColumnComponent[] = [];
  filterValue: string = '';
  filteredData: T[] = [];
  sortField: string = '';
  sortOrder: 'asc' | 'desc' = 'asc';

  // Pagination state
  currentPage: number = 1;
  totalPages: number = 1;
  paginatedData: T[] = [];

  // For template access
  Math = Math;

  ngAfterContentInit(): void {
    // Initialize columns from content children
    this.columns = this.columnComponents.toArray();

    // Initialize default values
    this.filterValue = this.defaultFilterValue;
    this.sortField = this.defaultSortField;
    this.sortOrder = this.defaultSortOrder;

    // Initialize filter fields if not provided
    if (this.filterFields.length === 0) {
      this.filterFields = this.columns
        .filter(col => col.filterable)
        .map(col => col.field);
    }

    // Apply initial filtering and sorting
    this.processData();

    // Listen for column changes
    this.columnComponents.changes.subscribe(() => {
      this.columns = this.columnComponents.toArray();
      this.processData();
    });
  }

  // Data processing
  processData(): void {
    let processed = [...this.data];

    // Apply filter
    if (this.filterable && this.filterValue) {
      const filterValue = this.filterValue.toLowerCase();
      processed = processed.filter(row => {
        return this.filterFields.some(field => {
          const value = this.getNestedValue(row, field);
          return value !== undefined &&
            value !== null &&
            String(value).toLowerCase().includes(filterValue);
        });
      });
    }

    // Apply sort
    if (this.sortable && this.sortField) {
      processed = this.sortData(processed);
    }

    this.filteredData = processed;
    this.updatePagination();
    this.dataChange.emit(this.filteredData);
  }

  // Sorting
  sortData(data: T[]): T[] {
    return [...data].sort((a, b) => {
      const aValue = this.getNestedValue(a, this.sortField);
      const bValue = this.getNestedValue(b, this.sortField);

      if (aValue === undefined || aValue === null) return this.sortOrder === 'asc' ? -1 : 1;
      if (bValue === undefined || bValue === null) return this.sortOrder === 'asc' ? 1 : -1;

      // String comparison
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return this.sortOrder === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      // Number comparison
      return this.sortOrder === 'asc'
        ? (aValue < bValue ? -1 : aValue > bValue ? 1 : 0)
        : (bValue < aValue ? -1 : bValue > aValue ? 1 : 0);
    });
  }

  sort(field: string): void {
    if (field === this.sortField) {
      // Toggle sort order if clicking the same field
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      // New field, set default sort order
      this.sortField = field;
      this.sortOrder = 'asc';
    }

    this.processData();
  }

  // Filtering
  applyFilter(): void {
    this.currentPage = 1; // Reset to first page
    this.processData();
  }

  clearFilter(): void {
    this.filterValue = '';
    this.applyFilter();
  }

  // Pagination
  updatePagination(): void {
    this.totalPages = Math.max(1, Math.ceil(this.filteredData.length / this.pageSize));

    // Adjust current page if needed
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }

    // Get paginated data
    const start = (this.currentPage - 1) * this.pageSize;
    const end = Math.min(start + this.pageSize, this.filteredData.length);
    this.paginatedData = this.paginated
      ? this.filteredData.slice(start, end)
      : this.filteredData;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  onPageSizeChange(): void {
    this.currentPage = 1; // Reset to first page
    this.updatePagination();
  }

  get visiblePages(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5;

    if (this.totalPages <= maxVisiblePages) {
      // Show all pages
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show a subset of pages
      if (this.currentPage <= 3) {
        // Near the start
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push(this.totalPages);
      } else if (this.currentPage >= this.totalPages - 2) {
        // Near the end
        pages.push(1);
        for (let i = this.totalPages - 3; i <= this.totalPages; i++) {
          pages.push(i);
        }
      } else {
        // In the middle
        pages.push(1);
        for (let i = this.currentPage - 1; i <= this.currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push(this.totalPages);
      }
    }

    return pages;
  }

  // Event handlers
  onRowClick(row: T): void {
    this.rowClick.emit(row);
  }

  // Utility methods
  getNestedValue(obj: any, path: string): any {
    if (!obj || !path) return undefined;

    const keys = path.split('.');
    let value = obj;

    for (const key of keys) {
      if (value === undefined || value === null) return undefined;
      value = value[key];
    }

    return value;
  }

  getCellValue(row: T, col: TableColumnComponent): any {
    let value = this.getNestedValue(row, col.field);

    // Apply custom formatter if provided
    if (col.format && typeof col.format === 'function') {
      return col.format(value, row);
    }

    return value;
  }

  getHeaderClasses(col: TableColumnComponent): string {
    return `
      px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider
      ${col.align === 'center' ? 'text-center' : ''}
      ${col.align === 'right' ? 'text-right' : ''}
      ${col.headerClass || ''}
    `;
  }

  getCellClasses(col: TableColumnComponent): string {
    return `
      px-4 py-3 text-sm text-neutral-700
      ${col.align === 'center' ? 'text-center' : ''}
      ${col.align === 'right' ? 'text-right' : ''}
      ${col.cellClass || ''}
    `;
  }
}
