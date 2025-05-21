import { Component, Input, forwardRef, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import {NgClass, NgForOf} from '@angular/common';

export interface RadioOption {
  value: any;
  label: string;
  disabled?: boolean;
}

@Component({
  selector: 'ds-radio',
  template: `
    <div [ngClass]="{
  'flex flex-col gap-2': direction === 'vertical',
  'flex gap-4': direction === 'horizontal'
}">
      <div *ngFor="let option of options"
           class="flex items-center"
           [class.opacity-50]="option.disabled || disabled">
        <input
          type="radio"
          [name]="name"
          [id]="name + '-' + option.value"
          [value]="option.value"
          [checked]="isChecked(option.value)"
          [required]="required"
          [disabled]="option.disabled || disabled"
          [ngClass]="[
        sizeClasses.radio,
        'appearance-none rounded-full border border-neutral-300 checked:border-primary-500 checked:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 transition-all duration-200'
      ]"
          (change)="onRadioChange(option.value)"
        />
        <label
          [for]="name + '-' + option.value"
          [ngClass]="[
        sizeClasses.label,
        'ml-2 cursor-pointer'
      ]"
        >
          {{ option.label }}
        </label>
      </div>
    </div>
  `,
  imports: [
    NgClass,
    NgForOf
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioComponent),
      multi: true
    }
  ]
})
export class RadioComponent implements ControlValueAccessor, OnInit {
  @Input() options: RadioOption[] = [];
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() direction: 'horizontal' | 'vertical' = 'vertical';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() name: string = '';

  value: any = null;
  controlDir?: NgControl;

  private onChange: any = () => {};
  private onTouched: any = () => {};

  constructor(@Optional() @Self() private ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
      this.controlDir = this.ngControl;
    }
  }

  ngOnInit() {
    if (this.ngControl && this.ngControl.control) {
      const control = this.ngControl.control;
      this.disabled = control.disabled;
    }

    // Generate a unique name if not provided
    if (!this.name) {
      this.name = `ds-radio-${Math.random().toString(36).substring(2, 11)}`;
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

  onRadioChange(value: any): void {
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }

  isChecked(value: any): boolean {
    return this.value === value;
  }

  get sizeClasses(): { radio: string, label: string } {
    switch (this.size) {
      case 'sm':
        return {
          radio: 'w-4 h-4',
          label: 'text-sm'
        };
      case 'lg':
        return {
          radio: 'w-6 h-6',
          label: 'text-lg'
        };
      default:
        return {
          radio: 'w-5 h-5',
          label: 'text-base'
        };
    }
  }
}
