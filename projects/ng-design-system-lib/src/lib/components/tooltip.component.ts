import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'ds-tooltip',
  standalone: true,
  template: `
    <div class="inline-block relative">
      <!-- Content that triggers tooltip -->
      <div
        (mouseenter)="show()"
        (mouseleave)="hide()"
        (click)="toggleOnClick && toggle()"
      >
        <ng-content></ng-content>
      </div>

      <!-- Tooltip element -->
      <div
        #tooltip
        *ngIf="isVisible"
        [ngClass]="tooltipClasses"
        role="tooltip"
        [style.transition]="'opacity 150ms, transform 150ms'"
        [style.pointer-events]="'none'"
      >
        <!-- Arrow element -->
        <div
          #arrow
          class="absolute w-3 h-3 transform rotate-45"
          [ngClass]="arrowClasses"
        ></div>

        <div class="relative z-10 px-3 py-2 text-sm">
          {{ content }}
          <ng-container *ngIf="contentTemplate">
            <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
          </ng-container>
        </div>
      </div>
    </div>
  `,
  imports: [NgClass, NgIf],
})
export class TooltipComponent implements AfterViewInit, OnDestroy {
  @ViewChild('tooltip') tooltipElement?: ElementRef;
  @ViewChild('arrow') arrowElement?: ElementRef;

  @Input() content: string = '';
  @Input() contentTemplate?: any;
  @Input() position: 'top' | 'bottom' | 'left' | 'right' = 'top';
  @Input() variant: 'dark' | 'light' = 'dark';
  @Input() trigger: 'hover' | 'click' | 'both' = 'hover';
  @Input() offset: number = 8;
  @Input() delay: number = 0;
  @Input() showArrow: boolean = true;
  @Input() maxWidth: string = '200px';

  isVisible: boolean = false;
  private showTimeout?: number;
  private hideTimeout?: number;
  private resizeObserver?: ResizeObserver;

  constructor(
    private renderer: Renderer2,
    private cd: ChangeDetectorRef,
  ) {}

  get toggleOnClick(): boolean {
    return this.trigger === 'click' || this.trigger === 'both';
  }

  get tooltipClasses(): string {
    const variantClass =
      this.variant === 'dark'
        ? 'bg-neutral-800 text-white'
        : 'bg-white text-neutral-800 border border-neutral-200 shadow-sm';

    return `
      absolute z-50 rounded max-w-xs
      ${variantClass}
      opacity-0
      transform scale-95
      ${this.isVisible ? 'opacity-100 scale-100' : ''}
    `;
  }

  get arrowClasses(): string {
    const variantClass =
      this.variant === 'dark'
        ? 'bg-neutral-800'
        : 'bg-white border border-neutral-200';

    return `${variantClass}`;
  }

  ngAfterViewInit(): void {
    if (this.tooltipElement) {
      this.renderer.setStyle(
        this.tooltipElement.nativeElement,
        'max-width',
        this.maxWidth,
      );
    }

    // Set up resize observer to update position when content changes
    if (typeof ResizeObserver !== 'undefined' && this.tooltipElement) {
      this.resizeObserver = new ResizeObserver(() => {
        if (this.isVisible) {
          this.updatePosition();
        }
      });
      this.resizeObserver.observe(this.tooltipElement.nativeElement);
    }
  }

  ngOnDestroy(): void {
    // Clean up timers
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
    }
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
    }

    // Clean up resize observer
    if (this.resizeObserver && this.tooltipElement) {
      this.resizeObserver.unobserve(this.tooltipElement.nativeElement);
      this.resizeObserver.disconnect();
    }
  }

  show(): void {
    if (this.trigger === 'click') return;

    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
    }

    if (this.delay > 0) {
      this.showTimeout = window.setTimeout(() => {
        this.isVisible = true;
        this.cd.detectChanges();
        this.updatePosition();
      }, this.delay);
    } else {
      this.isVisible = true;
      this.cd.detectChanges();
      this.updatePosition();
    }
  }

  hide(): void {
    if (this.trigger === 'click') return;

    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
    }

    this.hideTimeout = window.setTimeout(() => {
      this.isVisible = false;
      this.cd.detectChanges();
    }, 100);
  }

  toggle(): void {
    this.isVisible = !this.isVisible;
    this.cd.detectChanges();

    if (this.isVisible) {
      this.updatePosition();
    }
  }

  private updatePosition(): void {
    if (!this.tooltipElement) return;

    const tooltip = this.tooltipElement.nativeElement;
    const parent = tooltip.parentElement;
    const parentRect = parent.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();

    // Calculate positions
    const positions = {
      top: {
        top: -(tooltipRect.height + this.offset),
        left: (parentRect.width - tooltipRect.width) / 2,
      },
      bottom: {
        top: parentRect.height + this.offset,
        left: (parentRect.width - tooltipRect.width) / 2,
      },
      left: {
        top: (parentRect.height - tooltipRect.height) / 2,
        left: -(tooltipRect.width + this.offset),
      },
      right: {
        top: (parentRect.height - tooltipRect.height) / 2,
        left: parentRect.width + this.offset,
      },
    };

    // Get current position
    const pos = positions[this.position];

    // Set position
    this.renderer.setStyle(tooltip, 'top', `${pos.top}px`);
    this.renderer.setStyle(tooltip, 'left', `${pos.left}px`);

    // Position arrow
    if (this.showArrow && this.arrowElement) {
      const arrow = this.arrowElement.nativeElement;

      // Arrow positions
      const arrowPos = {
        top: {
          bottom: '-4px',
          left: '50%',
          transform: 'translateX(-50%) rotate(45deg)',
        },
        bottom: {
          top: '-4px',
          left: '50%',
          transform: 'translateX(-50%) rotate(45deg)',
        },
        left: {
          right: '-4px',
          top: '50%',
          transform: 'translateY(-50%) rotate(45deg)',
        },
        right: {
          left: '-4px',
          top: '50%',
          transform: 'translateY(-50%) rotate(45deg)',
        },
      };

      const arrowPosition = arrowPos[this.position];

      // Apply arrow position
      Object.keys(arrowPosition).forEach((key) => {
        // @ts-ignore
        this.renderer.setStyle(arrow, key, arrowPosition[key]);
      });
    }
  }
}
