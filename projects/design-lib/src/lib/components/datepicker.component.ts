import {Component, Input, forwardRef, OnInit, Optional, Self, Injector} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { format, parse, isValid } from 'date-fns';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'ds-datepicker',
  template: `
    <div class="relative">
      <input
        type="text"
        [placeholder]="placeholder"
        [required]="required"
        [disabled]="disabled"
        [readonly]="readonly"
        [attr.min]="min"
        [attr.max]="max"
        [value]="displayValue"
        [ngClass]="inputClasses"
        (input)="onInputChange($event)"
        (blur)="onBlur()"
        (focus)="onFocus()"
      />

      <!-- Calendar icon -->
      <div *ngIf="showCalendarIcon" class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg class="w-5 h-5 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
        </svg>
      </div>
    </div>
  `,
  imports: [
    NgClass,
    NgIf
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerComponent),
      multi: true
    }
  ]
})
export class DatepickerComponent implements ControlValueAccessor, OnInit {
  @Input() placeholder: string = 'YYYY-MM-DD';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() min: string = '';  // YYYY-MM-DD format
  @Input() max: string = '';  // YYYY-MM-DD format
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() dateFormat: string = 'yyyy-MM-dd';
  @Input() showCalendarIcon: boolean = true;

  displayValue: string = '';
  value: Date | null = null;
  focused: boolean = false;
  controlDir?: NgControl;

  private onChange: any = () => {};
  private onTouched: any = () => {};

  private ngControl: NgControl | null = null;

  constructor(private injector: Injector) {}

  ngOnInit() {
    this.ngControl = this.injector.get(NgControl, null);

    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
      this.controlDir = this.ngControl;

      if (this.ngControl.control) {
        this.disabled = this.ngControl.control.disabled;
      }
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
        }
      } else if (value instanceof Date && isValid(value)) {
        this.value = value;
        this.displayValue = format(value, this.dateFormat);
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
  }

  onFocus(): void {
    this.focused = true;
  }

  get sizeClasses(): string {
    switch (this.size) {
      case 'sm': return 'px-2 py-1 text-sm';
      case 'lg': return 'px-4 py-3 text-lg';
      default: return 'px-3 py-2';
    }
  }

  get inputClasses(): string {
    return `
      w-full rounded border outline-none transition-all duration-200
      ${this.sizeClasses}
      ${this.disabled ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed' : 'bg-white'}
      ${this.focused ? 'border-primary-500 shadow-focus' : 'border-neutral-300 hover:border-neutral-400'}
      ${this.ngControl?.invalid && this.ngControl?.touched ? 'border-danger-500' : ''}
      ${this.showCalendarIcon ? 'pr-9' : ''}
    `;
  }
}
