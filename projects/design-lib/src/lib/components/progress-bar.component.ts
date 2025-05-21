import { Component, Input } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'ds-progress-bar',
  template: `
    <div class="w-full">
      <!-- Label -->
      <div *ngIf="label || showPercentage" class="flex justify-between mb-1">
        <span *ngIf="label" class="text-sm font-medium text-neutral-700">{{ label }}</span>
        <span *ngIf="showPercentage" class="text-sm font-medium text-neutral-700">{{ progressValue }}%</span>
      </div>

      <!-- Progress bar container -->
      <div
        [ngClass]="[
          'w-full bg-neutral-200 overflow-hidden',
          rounded ? 'rounded-full' : '',
          getSizeClasses()
        ]">

        <!-- Progress bar fill -->
        <div
          [ngClass]="[
            'h-full transition-all duration-300 ease-in-out',
            getVariantClasses(),
            rounded ? 'rounded-full' : '',
            animated ? 'relative overflow-hidden' : ''
          ]"
          [style.width.%]="progressValue"
          role="progressbar"
          [attr.aria-valuenow]="progressValue"
          aria-valuemin="0"
          aria-valuemax="100">

          <!-- Animation effect for animated progress -->
          <div *ngIf="animated"
               class="absolute inset-0 overflow-hidden">
            <div class="absolute inset-0 -translate-x-full animate-shimmer bg-white bg-opacity-20"></div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes shimmer {
      100% {
        transform: translateX(100%);
      }
    }

    .animate-shimmer {
      animation: shimmer 2s infinite;
    }
  `],
  standalone: true,
  imports: [NgClass, NgIf]
})
export class ProgressBarComponent {
  @Input() value: number = 0;
  @Input() label?: string;
  @Input() showPercentage: boolean = false;
  @Input() animated: boolean = false;
  @Input() rounded: boolean = true;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' = 'primary';

  get progressValue(): number {
    return Math.min(100, Math.max(0, this.value));
  }

  getSizeClasses(): string {
    switch (this.size) {
      case 'sm': return 'h-1';
      case 'lg': return 'h-4';
      default: return 'h-2.5'; // md
    }
  }

  getVariantClasses(): string {
    switch (this.variant) {
      case 'primary': return 'bg-primary-500';
      case 'secondary': return 'bg-neutral-500';
      case 'success': return 'bg-success-500';
      case 'danger': return 'bg-danger-500';
      case 'warning': return 'bg-warning-500';
      case 'info': return 'bg-blue-500';
      default: return 'bg-primary-500';
    }
  }
}
