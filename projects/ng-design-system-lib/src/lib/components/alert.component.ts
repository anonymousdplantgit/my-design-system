import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'ds-alert',
  standalone: true,
  template: `
    <div
      *ngIf="visible"
      [ngClass]="[
        'p-4 rounded border',
        variantClasses,
        dismissible ? 'pr-12' : '',
        'relative',
      ]"
      role="alert"
    >
      <!-- Icon (if provided) -->
      <div *ngIf="showIcon" class="flex items-start">
        <div class="flex-shrink-0">
          <div [ngClass]="iconColor">
            <!-- Default icons based on type -->
            <svg
              *ngIf="type === 'info'"
              class="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"
              />
            </svg>
            <svg
              *ngIf="type === 'success'"
              class="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>
            <svg
              *ngIf="type === 'warning'"
              class="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
            <svg
              *ngIf="type === 'danger'"
              class="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>

        <div class="ml-3 flex-1">
          <h3 *ngIf="title" class="text-sm font-medium" [ngClass]="textColor">
            {{ title }}
          </h3>
          <div class="text-sm" [ngClass]="title ? 'mt-2' : ''">
            <ng-content></ng-content>
          </div>
        </div>
      </div>

      <!-- Content without icon -->
      <ng-container *ngIf="!showIcon">
        <h3 *ngIf="title" class="text-sm font-medium" [ngClass]="textColor">
          {{ title }}
        </h3>
        <div class="text-sm" [ngClass]="title ? 'mt-2' : ''">
          <ng-content></ng-content>
        </div>
      </ng-container>

      <!-- Dismiss button -->
      <button
        *ngIf="dismissible"
        type="button"
        class="absolute top-4 right-4 hover:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        [ngClass]="textColor"
        (click)="dismiss()"
      >
        <span class="sr-only">Dismiss</span>
        <svg
          class="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  `,
  imports: [NgClass, NgIf],
})
export class AlertComponent implements OnInit {
  @Input() type: 'info' | 'success' | 'warning' | 'danger' = 'info';
  @Input() title: string = '';
  @Input() dismissible: boolean = false;
  @Input() showIcon: boolean = true;
  @Input() visible: boolean = true;
  @Input() duration: number = 0; // Auto-dismiss in milliseconds (0 = no auto-dismiss)

  @Output() dismissed = new EventEmitter<void>();

  private autoDismissTimeout?: number;

  get variantClasses(): string {
    switch (this.type) {
      case 'info':
        return 'bg-blue-50 border-blue-200';
      case 'success':
        return 'bg-success-50 border-success-200';
      case 'warning':
        return 'bg-warning-50 border-warning-200';
      case 'danger':
        return 'bg-danger-50 border-danger-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  }

  get textColor(): string {
    switch (this.type) {
      case 'info':
        return 'text-blue-800';
      case 'success':
        return 'text-success-800';
      case 'warning':
        return 'text-warning-800';
      case 'danger':
        return 'text-danger-800';
      default:
        return 'text-blue-800';
    }
  }

  get iconColor(): string {
    switch (this.type) {
      case 'info':
        return 'text-blue-500';
      case 'success':
        return 'text-success-500';
      case 'warning':
        return 'text-warning-500';
      case 'danger':
        return 'text-danger-500';
      default:
        return 'text-blue-500';
    }
  }

  ngOnInit(): void {
    // Set auto-dismiss timer if duration is specified
    if (this.duration > 0) {
      this.autoDismissTimeout = window.setTimeout(() => {
        this.dismiss();
      }, this.duration);
    }
  }

  dismiss(): void {
    this.visible = false;
    this.dismissed.emit();

    // Clear timeout if it exists
    if (this.autoDismissTimeout) {
      clearTimeout(this.autoDismissTimeout);
    }
  }
}
