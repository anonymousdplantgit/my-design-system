import { Component, Input, forwardRef, OnInit, HostBinding, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import {NgClass, NgForOf, NgIf} from '@angular/common';

export interface SelectOption {
  value: any;
  label: string;
  disabled?: boolean;
}

@Component({
  selector: 'ds-select',
  template: `
    <div class="relative">
      <select
        [required]="required"
        [disabled]="disabled"
        [multiple]="multiple"
        [ngClass]="selectClasses"
        [value]="value"
        (change)="onSelectChange($event)"
        (blur)="onBlur()"
        (focus)="onFocus()"
      >
        <option *ngIf="placeholder && !value" value="" disabled selected>{{ placeholder }}</option>
        <option *ngFor="let option of options"
                [value]="option.value"
                [disabled]="option.disabled">
          {{ option.label }}
        </option>
      </select>

      <!-- Custom dropdown arrow -->
      <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg class="w-4 h-4 text-neutral-500" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"/>
        </svg>
      </div>
    </div>`,
  imports: [
    NgClass,
    NgIf,
    NgForOf
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent implements ControlValueAccessor, OnInit {
  @Input() options: SelectOption[] = [];
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() multiple: boolean = false;

  value: any = '';
  focused: boolean = false;
  controlDir?: NgControl;

  @HostBinding('class.ds-select-disabled') get isDisabled() { return this.disabled; }

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

  onSelectChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.value = value;
    this.onChange(value);
  }

  onBlur(): void {
    this.focused = false;
    this.onTouched();
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

  get selectClasses(): string {
    return `
      w-full rounded border appearance-none bg-white pr-8 outline-none transition-all duration-200
      ${this.sizeClasses}
      ${this.disabled ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed' : 'bg-white'}
      ${this.focused ? 'border-primary-500 shadow-focus' : 'border-neutral-300 hover:border-neutral-400'}
      ${this.ngControl?.invalid && this.ngControl?.touched ? 'border-danger-500' : ''}
    `;
  }
}
