import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'ds-button',
  template: `
    <button
      [type]="type"
      [ngClass]="computedClasses"
      [disabled]="disabled || loading"
      (click)="onClick($event)"
    >
      <!-- Loading spinner -->
      <span *ngIf="loading" class="inline-block animate-spin mr-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25" stroke="currentColor" />
          <path d="M12 2C6.5 2 2 6.5 2 12" />
        </svg>
      </span>

      <!-- Left icon -->
      <span *ngIf="iconLeft && !loading" class="mr-2">
        <!-- Note: We're using a placeholder for the icon. In actual implementation, you'd integrate with an icon library -->
        <i [class]="iconLeft"></i>
      </span>

      <!-- Button text -->
      <ng-content></ng-content>

      <!-- Right icon -->
      <span *ngIf="iconRight" class="ml-2">
        <!-- Note: We're using a placeholder for the icon. In actual implementation, you'd integrate with an icon library -->
        <i [class]="iconRight"></i>
      </span>
    </button>
  `,
  imports: [NgClass]
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'link' = 'primary';
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' = 'md';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() fullWidth: boolean = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() iconLeft?: string;
  @Input() iconRight?: string;
  @Input() rounded: boolean = false;
  @Input() outline: boolean = false;
  @Input() flat: boolean = false;

  @Output() buttonClick = new EventEmitter<MouseEvent>();

  onClick(event: MouseEvent): void {
    this.buttonClick.emit(event);
  }

  get computedClasses(): string {
    let classes = 'inline-flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

    // Add size classes
    classes += ' ' + this.sizeClasses;

    // Add variant classes
    classes += ' ' + this.variantClasses;

    // Add width classes
    if (this.fullWidth) {
      classes += ' w-full';
    }

    // Add rounded classes
    if (this.rounded) {
      classes += ' rounded-full';
    } else {
      classes += ' rounded';
    }

    // Add disabled classes
    if (this.disabled || this.loading) {
      classes += ' opacity-60 cursor-not-allowed';
    }

    return classes;
  }

  get sizeClasses(): string {
    switch (this.size) {
      case 'xs': return 'px-2 py-1 text-xs';
      case 'sm': return 'px-3 py-1.5 text-sm';
      case 'lg': return 'px-5 py-3 text-lg';
      default: return 'px-4 py-2 text-base'; // md
    }
  }

  get variantClasses(): string {
    const outlinePrefix = this.outline ? 'bg-transparent border ' : '';
    const flatPrefix = this.flat ? 'bg-transparent shadow-none ' : '';

    if (this.flat) {
      switch (this.variant) {
        case 'primary': return 'text-primary-600 hover:bg-primary-50 focus:ring-primary-500';
        case 'secondary': return 'text-neutral-600 hover:bg-neutral-50 focus:ring-neutral-500';
        case 'success': return 'text-success-600 hover:bg-success-50 focus:ring-success-500';
        case 'danger': return 'text-danger-600 hover:bg-danger-50 focus:ring-danger-500';
        case 'warning': return 'text-warning-600 hover:bg-warning-50 focus:ring-warning-500';
        case 'info': return 'text-blue-600 hover:bg-blue-50 focus:ring-blue-500';
        case 'link': return 'text-primary-600 hover:underline focus:ring-primary-500 shadow-none';
        default: return 'text-primary-600 hover:bg-primary-50 focus:ring-primary-500';
      }
    }

    if (this.outline) {
      switch (this.variant) {
        case 'primary': return outlinePrefix + 'border-primary-500 text-primary-600 hover:bg-primary-50 focus:ring-primary-500';
        case 'secondary': return outlinePrefix + 'border-neutral-300 text-neutral-700 hover:bg-neutral-50 focus:ring-neutral-500';
        case 'success': return outlinePrefix + 'border-success-500 text-success-600 hover:bg-success-50 focus:ring-success-500';
        case 'danger': return outlinePrefix + 'border-danger-500 text-danger-600 hover:bg-danger-50 focus:ring-danger-500';
        case 'warning': return outlinePrefix + 'border-warning-500 text-warning-600 hover:bg-warning-50 focus:ring-warning-500';
        case 'info': return outlinePrefix + 'border-blue-500 text-blue-600 hover:bg-blue-50 focus:ring-blue-500';
        case 'link': return 'text-primary-600 hover:underline focus:ring-primary-500 shadow-none';
        default: return outlinePrefix + 'border-primary-500 text-primary-600 hover:bg-primary-50 focus:ring-primary-500';
      }
    }

    // Default filled buttons
    switch (this.variant) {
      case 'primary': return 'bg-primary-500 hover:bg-primary-600 text-white focus:ring-primary-500';
      case 'secondary': return 'bg-neutral-200 hover:bg-neutral-300 text-neutral-700 focus:ring-neutral-500';
      case 'success': return 'bg-success-500 hover:bg-success-600 text-white focus:ring-success-500';
      case 'danger': return 'bg-danger-500 hover:bg-danger-600 text-white focus:ring-danger-500';
      case 'warning': return 'bg-warning-500 hover:bg-warning-600 text-neutral-900 focus:ring-warning-500';
      case 'info': return 'bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500';
      case 'link': return 'text-primary-600 hover:underline focus:ring-primary-500 shadow-none';
      default: return 'bg-primary-500 hover:bg-primary-600 text-white focus:ring-primary-500';
    }
  }
}
