import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'ds-spinner',
  standalone: true,
  template: `
    <div
      [ngClass]="[
        'inline-block animate-spin rounded-full border-solid',
        getBorderClasses(),
        getSizeClasses(),
        className,
      ]"
      role="status"
      aria-label="Loading"
    >
      <span class="sr-only">Loading...</span>
    </div>
  `,
  imports: [NgClass],
})
export class SpinnerComponent {
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Input() variant:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light' = 'primary';
  @Input() thickness: 'thin' | 'medium' | 'thick' = 'medium';
  @Input() className: string = '';

  getSizeClasses(): string {
    switch (this.size) {
      case 'sm':
        return 'w-4 h-4';
      case 'lg':
        return 'w-8 h-8';
      case 'xl':
        return 'w-12 h-12';
      default:
        return 'w-6 h-6'; // md
    }
  }

  getBorderClasses(): string {
    const thicknessClass = this.getThicknessClass();

    switch (this.variant) {
      case 'primary':
        return `${thicknessClass} border-primary-500 border-r-transparent`;
      case 'secondary':
        return `${thicknessClass} border-neutral-500 border-r-transparent`;
      case 'success':
        return `${thicknessClass} border-success-500 border-r-transparent`;
      case 'danger':
        return `${thicknessClass} border-danger-500 border-r-transparent`;
      case 'warning':
        return `${thicknessClass} border-warning-500 border-r-transparent`;
      case 'info':
        return `${thicknessClass} border-blue-500 border-r-transparent`;
      case 'light':
        return `${thicknessClass} border-white border-r-transparent`;
      default:
        return `${thicknessClass} border-primary-500 border-r-transparent`;
    }
  }

  getThicknessClass(): string {
    switch (this.thickness) {
      case 'thin':
        return 'border-2';
      case 'thick':
        return 'border-4';
      default:
        return 'border-3'; // medium
    }
  }
}
