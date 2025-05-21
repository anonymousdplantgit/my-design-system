import { Component, forwardRef, Injector, Input, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl,
} from '@angular/forms';
import {
  addMonths,
  addYears,
  format,
  getDaysInMonth,
  getMonth,
  getYear,
  isValid,
  parse,
  subMonths,
  subYears,
} from 'date-fns';
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'ds-datepicker',
  standalone: true,
  template: `
    <div class="relative">
      <div
        class="flex rounded border transition-colors"
        [ngClass]="containerClasses"
      >
        <!-- Calendar Icon -->
        <div
          *ngIf="showCalendarIcon"
          class="flex items-center px-3 border-r border-neutral-200 bg-neutral-50 text-neutral-500 cursor-pointer"
          (click)="toggleCalendar()"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>

        <!-- Input -->
        <input
          type="text"
          [placeholder]="placeholder"
          [required]="required"
          [disabled]="disabled"
          [readonly]="readonly"
          [attr.min]="min"
          [attr.max]="max"
          [value]="displayValue"
          class="flex-1 outline-none bg-transparent"
          [ngClass]="inputClasses"
          (input)="onInputChange($event)"
          (blur)="onBlur()"
          (focus)="onFocus()"
          (click)="toggleCalendar()"
        />
      </div>

      <!-- Calendar Popup -->
      <div
        *ngIf="isCalendarVisible"
        class="absolute z-50 mt-1 p-3 bg-white border border-neutral-200 rounded shadow-lg"
      >
        <div class="flex justify-between items-center mb-2">
          <!-- Year Navigation -->
          <button
            type="button"
            class="p-1 text-neutral-500 hover:text-neutral-700"
            (click)="navigateYear(-1)"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
              />
            </svg>
          </button>

          <!-- Month Navigation -->
          <div class="flex items-center">
            <button
              type="button"
              class="p-1 text-neutral-500 hover:text-neutral-700"
              (click)="navigateMonth(-1)"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <span class="mx-2 font-medium">{{
              format(currentMonth, 'MMMM yyyy')
            }}</span>

            <button
              type="button"
              class="p-1 text-neutral-500 hover:text-neutral-700"
              (click)="navigateMonth(1)"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          <button
            type="button"
            class="p-1 text-neutral-500 hover:text-neutral-700"
            (click)="navigateYear(1)"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 5l7 7-7 7M5 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        <!-- Days of week -->
        <div class="grid grid-cols-7 mb-1">
          <div
            *ngFor="let day of daysOfWeek"
            class="text-center text-xs font-medium text-neutral-500 py-1"
          >
            {{ day }}
          </div>
        </div>

        <!-- Calendar days -->
        <div class="grid grid-cols-7">
          <div *ngFor="let day of calendarDays" class="text-center py-1">
            <button
              *ngIf="day !== 0"
              type="button"
              [ngClass]="[
                'w-8 h-8 rounded-full text-sm focus:outline-none',
                isSelectedDate(day)
                  ? 'bg-primary-500 text-white'
                  : 'hover:bg-neutral-100',
              ]"
              (click)="selectDate(day)"
            >
              {{ day }}
            </button>
          </div>
        </div>

        <!-- Today button -->
        <div class="mt-2 text-right">
          <button
            type="button"
            class="text-sm text-primary-600 hover:text-primary-800 focus:outline-none"
            (click)="selectToday()"
          >
            Today
          </button>
        </div>
      </div>
    </div>
  `,
  imports: [NgClass, NgIf, NgFor],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerComponent),
      multi: true,
    },
  ],
  styles: [
    `
      :host {
        display: block;
      }

      .datepicker-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: transparent;
        z-index: 40;
      }
    `,
  ],
})
export class DatepickerComponent implements ControlValueAccessor, OnInit {
  @Input() placeholder: string = 'YYYY-MM-DD';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() min: string = ''; // YYYY-MM-DD format
  @Input() max: string = ''; // YYYY-MM-DD format
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() dateFormat: string = 'yyyy-MM-dd';
  @Input() showCalendarIcon: boolean = true;

  displayValue: string = '';
  value: Date | null = null;
  focused: boolean = false;
  controlDir?: NgControl;
  isCalendarVisible: boolean = false;
  currentMonth: Date = new Date();
  calendarDays: number[] = [];
  daysOfWeek: string[] = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  protected readonly format = format;
  private ngControl: NgControl | null = null;

  constructor(private injector: Injector) {}

  get containerClasses(): string {
    return `
      ${this.disabled ? 'bg-neutral-100 cursor-not-allowed' : ''}
      ${this.focused ? 'border-primary-500 shadow-focus' : 'border-neutral-300 hover:border-neutral-400'}
      ${this.ngControl?.invalid && this.ngControl?.touched ? 'border-danger-500' : ''}
    `;
  }

  get inputClasses(): string {
    switch (this.size) {
      case 'sm':
        return 'py-1 px-2 text-sm';
      case 'lg':
        return 'py-3 px-4 text-lg';
      default:
        return 'py-2 px-3'; // md
    }
  }

  ngOnInit() {
    this.ngControl = this.injector.get(NgControl, null);

    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
      this.controlDir = this.ngControl;

      if (this.ngControl.control) {
        this.disabled = this.ngControl.control.disabled;
      }
    }

    // Initialize calendar
    this.generateCalendarDays();

    // If there's a current value, set the display month to that date
    if (this.value) {
      this.currentMonth = this.value;
    }
  }

  // ControlValueAccessor interface methods
  writeValue(value: Date | string | null): void {
    if (value) {
      if (typeof value === 'string') {
        const parsedDate = parse(value, this.dateFormat, new Date());
        if (isValid(parsedDate)) {
          this.value = parsedDate;
          this.displayValue = format(parsedDate, this.dateFormat);

          // Update current month if calendar is open
          if (this.isCalendarVisible) {
            this.currentMonth = parsedDate;
            this.generateCalendarDays();
          }
        }
      } else if (value instanceof Date && isValid(value)) {
        this.value = value;
        this.displayValue = format(value, this.dateFormat);

        // Update current month if calendar is open
        if (this.isCalendarVisible) {
          this.currentMonth = value;
          this.generateCalendarDays();
        }
      }
    } else {
      this.value = null;
      this.displayValue = '';
    }
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

  onInputChange(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.displayValue = inputValue;

    if (!inputValue) {
      this.value = null;
      this.onChange(null);
      return;
    }

    const parsedDate = parse(inputValue, this.dateFormat, new Date());
    if (isValid(parsedDate)) {
      this.value = parsedDate;
      this.onChange(parsedDate);
    } else {
      this.onChange(null);
    }
  }

  onBlur(): void {
    this.focused = false;
    this.onTouched();

    // Format the display value properly when leaving the field
    if (this.value) {
      this.displayValue = format(this.value, this.dateFormat);
    }

    // Don't close the calendar here to allow clicks on the calendar
    // We'll handle click outside later
  }

  onFocus(): void {
    this.focused = true;
  }

  toggleCalendar(): void {
    if (this.disabled || this.readonly) return;

    this.isCalendarVisible = !this.isCalendarVisible;

    if (this.isCalendarVisible) {
      // Use current value or current date for the calendar
      if (this.value) {
        this.currentMonth = new Date(this.value);
      } else {
        this.currentMonth = new Date();
      }

      this.generateCalendarDays();

      // Add click outside listener
      setTimeout(() => {
        document.addEventListener('click', this.handleClickOutside);
      });
    }
  }

  generateCalendarDays(): void {
    const year = getYear(this.currentMonth);
    const month = getMonth(this.currentMonth);

    // Get number of days in the month
    const daysInMonth = getDaysInMonth(this.currentMonth);

    // Get the first day of the month
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    // Generate array of day numbers with leading zeros for proper alignment
    this.calendarDays = [];

    // Add empty days for alignment
    for (let i = 0; i < firstDayOfMonth; i++) {
      this.calendarDays.push(0);
    }

    // Add actual days
    for (let i = 1; i <= daysInMonth; i++) {
      this.calendarDays.push(i);
    }
  }

  navigateMonth(offset: number): void {
    if (offset > 0) {
      this.currentMonth = addMonths(this.currentMonth, offset);
    } else {
      this.currentMonth = subMonths(this.currentMonth, Math.abs(offset));
    }

    this.generateCalendarDays();
  }

  navigateYear(offset: number): void {
    if (offset > 0) {
      this.currentMonth = addYears(this.currentMonth, offset);
    } else {
      this.currentMonth = subYears(this.currentMonth, Math.abs(offset));
    }

    this.generateCalendarDays();
  }

  selectDate(day: number): void {
    const year = getYear(this.currentMonth);
    const month = getMonth(this.currentMonth);
    const selectedDate = new Date(year, month, day);

    this.value = selectedDate;
    this.displayValue = format(selectedDate, this.dateFormat);
    this.onChange(selectedDate);
    this.isCalendarVisible = false;

    document.removeEventListener('click', this.handleClickOutside);
  }

  selectToday(): void {
    const today = new Date();
    this.value = today;
    this.displayValue = format(today, this.dateFormat);
    this.onChange(today);
    this.isCalendarVisible = false;

    document.removeEventListener('click', this.handleClickOutside);
  }

  isSelectedDate(day: number): boolean {
    if (!this.value) return false;

    const year = getYear(this.currentMonth);
    const month = getMonth(this.currentMonth);

    return (
      getYear(this.value) === year &&
      getMonth(this.value) === month &&
      this.value.getDate() === day
    );
  }

  private onChange: any = () => {};

  private onTouched: any = () => {};

  // Handler for clicks outside the component
  private handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!this.isPartOfComponent(target)) {
      this.isCalendarVisible = false;
      document.removeEventListener('click', this.handleClickOutside);
    }
  };

  private isPartOfComponent(element: HTMLElement): boolean {
    let current: HTMLElement | null = element;

    while (current) {
      if (current.tagName === 'DS-DATEPICKER') {
        return true;
      }
      current = current.parentElement;
    }

    return false;
  }
}
