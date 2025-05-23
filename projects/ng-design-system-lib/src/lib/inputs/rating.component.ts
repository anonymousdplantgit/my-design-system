import {
  Component,
  ContentChild,
  EventEmitter,
  forwardRef,
  Injector,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl,
} from '@angular/forms';
import {
  NgClass,
  NgFor,
  NgIf,
  NgStyle,
  NgTemplateOutlet,
} from '@angular/common';

// Custom event interfaces
export interface RatingRateEvent {
  originalEvent: Event;
  value: number;
}

@Component({
  selector: 'ds-rating',
  standalone: true,
  template: `
    <div
      class="inline-flex items-center"
      [class.opacity-50]="disabled"
      [attr.data-rating]="value"
      role="radiogroup"
      [attr.aria-label]="'Rating with ' + stars + ' stars'"
      [attr.aria-disabled]="disabled"
      [attr.aria-readonly]="readonly"
    >
      <!-- Cancel button (optional) -->
      <button
        *ngIf="cancel && value !== null && value !== undefined"
        type="button"
        class="flex items-center justify-center mr-1 p-1 rounded hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-200 transition-colors"
        [disabled]="disabled || readonly"
        (click)="onCancelClick($event)"
        (focus)="onFocus_($event)"
        (blur)="onBlur_($event)"
        [attr.aria-label]="'Cancel rating'"
      >
        <ng-container *ngIf="cancelIconTemplate; else defaultCancelIcon">
          <ng-container *ngTemplateOutlet="cancelIconTemplate"></ng-container>
        </ng-container>
        <ng-template #defaultCancelIcon>
          <svg
            class="w-4 h-4 text-neutral-400 hover:text-neutral-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </ng-template>
      </button>

      <!-- Star buttons -->
      <div class="flex items-center">
        <button
          *ngFor="let star of starArray; let i = index"
          type="button"
          class="flex items-center justify-center p-1 rounded hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-200 transition-all duration-150"
          [disabled]="disabled || readonly"
          [attr.aria-label]="'Rate ' + (i + 1) + ' out of ' + stars + ' stars'"
          [attr.aria-pressed]="(value || 0) > i"
          role="radio"
          [attr.tabindex]="getTabIndex(i)"
          (click)="onStarClick($event, i + 1)"
          (keydown)="onKeyDown($event, i + 1)"
          (mouseenter)="onStarHover(i + 1)"
          (mouseleave)="onStarLeave()"
          (focus)="onFocus_($event)"
          (blur)="onBlur_($event)"
        >
          <!-- Star icon -->
          <ng-container *ngIf="isStarActive(i + 1); else inactiveStar">
            <!-- Active star -->
            <ng-container *ngIf="onIconTemplate; else defaultActiveIcon">
              <ng-container *ngTemplateOutlet="onIconTemplate"></ng-container>
            </ng-container>
            <ng-template #defaultActiveIcon>
              <svg
                class="w-5 h-5 transition-colors"
                [ngClass]="iconOnClass || 'text-yellow-400'"
                [ngStyle]="iconOnStyle ? iconOnStyle(iconOnClass || '') : {}"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
            </ng-template>
          </ng-container>

          <ng-template #inactiveStar>
            <!-- Inactive star -->
            <ng-container *ngIf="offIconTemplate; else defaultInactiveIcon">
              <ng-container *ngTemplateOutlet="offIconTemplate"></ng-container>
            </ng-container>
            <ng-template #defaultInactiveIcon>
              <svg
                class="w-5 h-5 transition-colors"
                [ngClass]="
                  iconOffClass || 'text-neutral-300 hover:text-neutral-400'
                "
                [ngStyle]="iconOffStyle ? iconOffStyle(iconOffClass || '') : {}"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
            </ng-template>
          </ng-template>
        </button>
      </div>

      <!-- Rating display (optional) -->
      <span
        *ngIf="showValue && value !== null && value !== undefined"
        class="ml-2 text-sm text-neutral-600"
      >
        {{ value }}/{{ stars }}
      </span>
    </div>
  `,
  imports: [NgClass, NgFor, NgIf, NgTemplateOutlet, NgStyle],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RatingComponent),
      multi: true,
    },
  ],
  styles: [
    `
      :host {
        display: inline-block;
      }

      button:disabled {
        cursor: not-allowed;
      }

      button:not(:disabled):hover svg {
        transform: scale(1.1);
      }
    `,
  ],
})
export class RatingComponent implements ControlValueAccessor, OnInit {
  // Content templates
  @ContentChild('onicon') onIconTemplate?: TemplateRef<any>;
  @ContentChild('officon') offIconTemplate?: TemplateRef<any>;
  @ContentChild('cancelicon') cancelIconTemplate?: TemplateRef<any>;

  // Input properties
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() stars: number = 5;
  @Input() iconOnClass?: string;
  @Input() iconOnStyle?: (klass: string) => any;
  @Input() iconOffClass?: string;
  @Input() iconOffStyle?: (klass: string) => any;
  @Input() autofocus: boolean = false;
  @Input() cancel: boolean = false; // Allow canceling rating
  @Input() showValue: boolean = false; // Show current rating value
  @Input() value: number | null = null; // Add value as an input property

  // Output events
  @Output() onRate = new EventEmitter<RatingRateEvent>();
  @Output() onCancel = new EventEmitter<Event>();
  @Output() onFocus = new EventEmitter<FocusEvent>();
  @Output() onBlur = new EventEmitter<FocusEvent>();

  // Internal state
  hoverValue: number | null = null;
  starArray: number[] = [];
  private ngControl: NgControl | null = null;

  constructor(private injector: Injector) {}

  ngOnInit() {
    this.ngControl = this.injector.get(NgControl, null);

    if (this.ngControl) {
      this.ngControl.valueAccessor = this;

      if (this.ngControl.control) {
        this.disabled = this.ngControl.control.disabled;
      }
    }

    // Initialize star array
    this.starArray = Array.from({ length: this.stars }, (_, i) => i + 1);

    // Auto focus if needed
    if (this.autofocus) {
      setTimeout(() => {
        const firstStar = document.querySelector(
          'ds-rating button[role="radio"]',
        ) as HTMLElement;
        if (firstStar) {
          firstStar.focus();
        }
      });
    }
  }

  // ControlValueAccessor interface methods
  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // Event handlers
  onStarClick(event: Event, rating: number): void {
    if (this.disabled || this.readonly) return;

    event.preventDefault();
    event.stopPropagation();

    // If clicking the same rating, optionally clear it
    if (this.value === rating && this.cancel) {
      this.value = null;
    } else {
      this.value = rating;
    }

    this.onChange(this.value);
    this.onTouched();

    const rateEvent: RatingRateEvent = {
      originalEvent: event,
      value: this.value || 0,
    };
    this.onRate.emit(rateEvent);
  }

  onCancelClick(event: Event): void {
    if (this.disabled || this.readonly) return;

    event.preventDefault();
    event.stopPropagation();

    this.value = null;
    this.onChange(this.value);
    this.onTouched();

    this.onCancel.emit(event);

    const rateEvent: RatingRateEvent = {
      originalEvent: event,
      value: 0,
    };
    this.onRate.emit(rateEvent);
  }

  onStarHover(rating: number): void {
    if (this.disabled || this.readonly) return;
    this.hoverValue = rating;
  }

  onStarLeave(): void {
    if (this.disabled || this.readonly) return;
    this.hoverValue = null;
  }

  onKeyDown(event: KeyboardEvent, rating: number): void {
    if (this.disabled || this.readonly) return;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        event.preventDefault();
        this.focusNextStar(rating);
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        event.preventDefault();
        this.focusPreviousStar(rating);
        break;
      case 'Home':
        event.preventDefault();
        this.focusStar(1);
        break;
      case 'End':
        event.preventDefault();
        this.focusStar(this.stars);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.onStarClick(event, rating);
        break;
      case 'Escape':
        if (this.cancel) {
          event.preventDefault();
          this.onCancelClick(event);
        }
        break;
    }
  }

  onFocus_(event: FocusEvent): void {
    this.onFocus.emit(event);
  }

  onBlur_(event: FocusEvent): void {
    this.onTouched();
    this.onBlur.emit(event);
  }

  // Utility methods
  isStarActive(starIndex: number): boolean {
    const currentValue =
      this.hoverValue !== null ? this.hoverValue : this.value;
    return currentValue !== null && currentValue >= starIndex;
  }

  getTabIndex(index: number): number {
    // Only the first star or the currently selected star should be tabbable
    if (this.value === null) {
      return index === 0 ? 0 : -1;
    }
    return this.value === index + 1 ? 0 : -1;
  }

  // Public methods
  focus(): void {
    const focusIndex = this.value ? this.value - 1 : 0;
    this.focusStar(focusIndex + 1);
  }

  reset(): void {
    this.value = null;
    this.hoverValue = null;
    this.onChange(this.value);
  }

  // Focus management
  private focusNextStar(currentRating: number): void {
    const nextRating = Math.min(currentRating + 1, this.stars);
    this.focusStar(nextRating);
  }

  private focusPreviousStar(currentRating: number): void {
    const prevRating = Math.max(currentRating - 1, 1);
    this.focusStar(prevRating);
  }

  private focusStar(rating: number): void {
    const buttons = document.querySelectorAll(
      'ds-rating button[role="radio"]',
    ) as NodeListOf<HTMLElement>;
    const button = buttons[rating - 1];
    if (button) {
      button.focus();
    }
  }

  // Private callback functions
  private onChange: any = () => {};
  private onTouched: any = () => {};
}
