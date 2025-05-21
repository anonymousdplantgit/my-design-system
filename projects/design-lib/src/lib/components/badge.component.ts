import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'ds-badge',
  template: `
    <span
      [ngClass]="[
        'inline-flex items-center',
        rounded ? 'rounded-full' : 'rounded',
        getVariantClasses(),
        getSizeClasses(),
        className
      ]">
      <ng-content></ng-content>
    </span>
  `,
  standalone: true,
  imports: [NgClass]
})
export class BadgeComponent {
  @Input() variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() rounded: boolean = true;
  @Input() outlined: boolean = false;
  @Input() className: string = '';

  getVariantClasses(): string {
    if (this.outlined) {
      switch (this.variant) {
        case 'primary':
          return 'bg-transparent text-primary-600 border border-primary-500';
        case 'secondary':
          return 'bg-transparent text-neutral-600 border border-neutral-500';
        case 'success':
          return 'bg-transparent text-success-600 border border-success-500';
        case 'danger':
          return 'bg-transparent text-danger-600 border border-danger-500';
        case 'warning':
          return 'bg-transparent text-warning-600 border border-warning-500';
        case 'info':
          return 'bg-transparent text-blue-600 border border-blue-500';
        default:
          return 'bg-transparent text-primary-600 border border-primary-500';
      }
    }

    switch (this.variant) {
      case 'primary':
        return 'bg-primary-100 text-primary-800';
      case 'secondary':
        return 'bg-neutral-100 text-neutral-800';
      case 'success':
        return 'bg-success-100 text-success-800';
      case 'danger':
        return 'bg-danger-100 text-danger-800';
      case 'warning':
        return 'bg-warning-100 text-warning-800';
      case 'info':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-primary-100 text-primary-800';
    }
  }

  getSizeClasses(): string {
    switch (this.size) {
      case 'sm':
        return 'px-1.5 py-0.5 text-xs';
      case 'lg':
        return 'px-3 py-1 text-sm';
      default: // md
        return 'px-2.5 py-0.5 text-xs';
    }
  }
}
