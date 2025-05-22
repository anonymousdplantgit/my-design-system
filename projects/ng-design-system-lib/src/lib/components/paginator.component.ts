import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ds-paginator',
  standalone: true,
  template: `
    <div class="flex items-center justify-between">
      <!-- Page size selector -->
      <div class="flex items-center space-x-2">
        <select
          *ngIf="showPageSizeOptions"
          class="border border-neutral-300 rounded-md text-sm py-1 px-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          [(ngModel)]="pageSize"
          (change)="onPageSizeChange()"
        >
          <option *ngFor="let size of pageSizeOptions" [value]="size">
            {{ size }} per page
          </option>
        </select>

        <span class="text-sm text-neutral-600">
          {{ rangeLabel }}
        </span>
      </div>

      <!-- Page navigation -->
      <div class="flex items-center space-x-1">
        <!-- First page button -->
        <button
          *ngIf="showFirstLastButtons"
          class="relative inline-flex items-center px-2 py-1 border border-neutral-300 bg-white text-sm font-medium text-neutral-500 hover:bg-neutral-50 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
          [disabled]="currentPage === 1"
          [ngClass]="currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''"
          (click)="goToPage(1)"
        >
          <span class="sr-only">First Page</span>
          <svg
            class="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414z"
              clip-rule="evenodd"
            />
            <path
              fill-rule="evenodd"
              d="M7.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L3.414 10l4.293 4.293a1 1 0 010 1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>

        <!-- Previous page button -->
        <button
          class="relative inline-flex items-center px-2 py-1 border border-neutral-300 bg-white text-sm font-medium text-neutral-500 hover:bg-neutral-50 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
          [disabled]="currentPage === 1"
          [ngClass]="currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''"
          (click)="goToPage(currentPage - 1)"
        >
          <span class="sr-only">Previous</span>
          <svg
            class="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </button>

        <!-- Page numbers -->
        <span
          *ngFor="let page of visiblePages"
          class="relative inline-flex items-center px-3 py-1 border text-sm font-medium focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
          [ngClass]="
            page === currentPage
              ? 'bg-primary-500 text-white border-primary-500'
              : 'bg-white text-neutral-500 border-neutral-300 hover:bg-neutral-50 cursor-pointer'
          "
          (click)="goToPage(page)"
        >
          {{ page }}
        </span>

        <!-- Next page button -->
        <button
          class="relative inline-flex items-center px-2 py-1 border border-neutral-300 bg-white text-sm font-medium text-neutral-500 hover:bg-neutral-50 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
          [disabled]="currentPage === totalPages"
          [ngClass]="
            currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
          "
          (click)="goToPage(currentPage + 1)"
        >
          <span class="sr-only">Next</span>
          <svg
            class="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </button>

        <!-- Last page button -->
        <button
          *ngIf="showFirstLastButtons"
          class="relative inline-flex items-center px-2 py-1 border border-neutral-300 bg-white text-sm font-medium text-neutral-500 hover:bg-neutral-50 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
          [disabled]="currentPage === totalPages"
          [ngClass]="
            currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
          "
          (click)="goToPage(totalPages)"
        >
          <span class="sr-only">Last Page</span>
          <svg
            class="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 15.707a1 1 0 001.414 0l5-5a1 1 0 000-1.414l-5-5a1 1 0 00-1.414 1.414L8.586 10l-4.293 4.293a1 1 0 000 1.414z"
              clip-rule="evenodd"
            />
            <path
              fill-rule="evenodd"
              d="M12.293 15.707a1 1 0 001.414 0l5-5a1 1 0 000-1.414l-5-5a1 1 0 00-1.414 1.414L16.586 10l-4.293 4.293a1 1 0 000 1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  `,
  imports: [NgClass, NgForOf, NgIf, FormsModule],
})
export class PaginatorComponent implements OnChanges {
  @Input() length: number = 0;
  @Input() pageSize: number = 10;
  @Input() pageSizeOptions: number[] = [5, 10, 25, 50];
  @Input() showPageSizeOptions: boolean = true;
  @Input() showFirstLastButtons: boolean = true;
  @Input() disabled: boolean = false;
  @Input() maxVisiblePages: number = 5;

  @Output() page = new EventEmitter<{
    pageIndex: number;
    pageSize: number;
    length: number;
  }>();

  @Output() pageSizeChange = new EventEmitter<number>();

  currentPage: number = 1;
  totalPages: number = 1;

  get visiblePages(): number[] {
    const pages: number[] = [];

    if (this.totalPages <= this.maxVisiblePages) {
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

  get rangeLabel(): string {
    const start = (this.currentPage - 1) * this.pageSize + 1;
    const end = Math.min(this.currentPage * this.pageSize, this.length);

    return `Showing ${start} to ${end} of ${this.length} entries`;
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Recalculate when inputs change
    if (changes['length'] || changes['pageSize']) {
      this.updatePagination();
    }
  }

  updatePagination(): void {
    this.totalPages = Math.max(1, Math.ceil(this.length / this.pageSize));

    // Adjust current page if needed
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
  }

  goToPage(page: number): void {
    if (this.disabled || page === this.currentPage) return;

    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.emitPageEvent();
    }
  }

  onPageSizeChange(): void {
    this.currentPage = 1; // Reset to first page
    this.updatePagination();
    this.pageSizeChange.emit(this.pageSize);
    this.emitPageEvent();
  }

  emitPageEvent(): void {
    this.page.emit({
      pageIndex: this.currentPage - 1, // Convert to 0-based index
      pageSize: this.pageSize,
      length: this.length,
    });
  }
}
