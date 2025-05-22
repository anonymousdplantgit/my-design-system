import { Component, Input, OnInit } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'ds-avatar',
  standalone: true,
  template: `
    <div
      [ngClass]="[
        'inline-flex items-center justify-center relative',
        rounded ? 'rounded-full' : 'rounded',
        getSizeClasses(),
        className,
      ]"
      [style.background-color]="bgColor"
    >
      <!-- Image avatar -->
      <img
        *ngIf="src"
        [src]="src"
        [alt]="alt || name"
        [ngClass]="[
          'object-cover w-full h-full',
          rounded ? 'rounded-full' : 'rounded',
        ]"
        (error)="onImageError()"
      />

      <!-- Text/Initials avatar -->
      <div
        *ngIf="!src || imageError"
        [ngClass]="[
          'flex items-center justify-center w-full h-full',
          getTextColorClass(),
        ]"
      >
        {{ displayText }}
      </div>

      <!-- Status indicator -->
      <span
        *ngIf="status"
        [ngClass]="[
          'absolute bottom-0 right-0 block rounded-full border-2 border-white',
          getStatusClass(),
          getStatusSizeClass(),
        ]"
      >
      </span>
    </div>
  `,
  imports: [NgClass, NgIf],
})
export class AvatarComponent implements OnInit {
  @Input() name: string = '';
  @Input() src?: string;
  @Input() alt?: string;
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Input() rounded: boolean = true;
  @Input() status?: 'online' | 'offline' | 'away' | 'busy';
  @Input() bgColor?: string;
  @Input() className: string = '';

  displayText: string = '';
  imageError: boolean = false;

  ngOnInit(): void {
    this.generateDisplayText();

    // Generate background color if not provided
    if (!this.bgColor && !this.src) {
      this.bgColor = this.generateColorFromName();
    }
  }

  generateDisplayText(): void {
    if (!this.name) {
      this.displayText = '';
      return;
    }

    // Generate initials from name
    const parts = this.name.trim().split(' ');

    if (parts.length === 1) {
      // Single name, use first two letters
      this.displayText = this.name.substring(0, 2).toUpperCase();
    } else {
      // Multi-part name, use first letter of first and last parts
      this.displayText = (
        parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
      ).toUpperCase();
    }
  }

  generateColorFromName(): string {
    if (!this.name) return '#6B7280'; // Default gray

    // Simple hash function to generate a consistent color for a name
    let hash = 0;
    for (let i = 0; i < this.name.length; i++) {
      hash = this.name.charCodeAt(i) + ((hash << 5) - hash);
    }

    // List of pleasant background colors
    const colors = [
      '#F9A8D4', // pink-300
      '#C4B5FD', // violet-300
      '#93C5FD', // blue-300
      '#6EE7B7', // emerald-300
      '#FCD34D', // amber-300
      '#FDA4AF', // rose-300
      '#A5B4FC', // indigo-300
      '#67E8F9', // cyan-300
      '#86EFAC', // green-300
      '#FDE68A', // yellow-300
    ];

    // Use hash to pick a color
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  }

  onImageError(): void {
    this.imageError = true;
    if (!this.bgColor) {
      this.bgColor = this.generateColorFromName();
    }
  }

  getSizeClasses(): string {
    switch (this.size) {
      case 'xs':
        return 'w-6 h-6 text-xs';
      case 'sm':
        return 'w-8 h-8 text-sm';
      case 'lg':
        return 'w-12 h-12 text-lg';
      case 'xl':
        return 'w-16 h-16 text-xl';
      default:
        return 'w-10 h-10 text-base'; // md
    }
  }

  getStatusClass(): string {
    switch (this.status) {
      case 'online':
        return 'bg-success-500';
      case 'offline':
        return 'bg-neutral-400';
      case 'away':
        return 'bg-warning-500';
      case 'busy':
        return 'bg-danger-500';
      default:
        return '';
    }
  }

  getStatusSizeClass(): string {
    switch (this.size) {
      case 'xs':
        return 'w-1.5 h-1.5';
      case 'sm':
        return 'w-2 h-2';
      case 'lg':
        return 'w-3 h-3';
      case 'xl':
        return 'w-3.5 h-3.5';
      default:
        return 'w-2.5 h-2.5'; // md
    }
  }

  getTextColorClass(): string {
    // For better contrast
    return 'text-white';
  }
}
