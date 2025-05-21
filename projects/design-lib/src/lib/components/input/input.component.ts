import { Component, Input, forwardRef, OnInit, HostBinding, Optional, Self, ElementRef, Inject, Injector } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl, FormControl } from '@angular/forms';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'ds-input',
  template: `
    <div class="relative">
      <!-- Prefix -->
      <div *ngIf="prefixText || prefixIcon"
           class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
    <span *ngIf="prefixIcon" class="text-neutral-500">
      <!-- We would integrate with an icon library here -->
      <i [class]="prefixIcon"></i>
    </span>
        <span *ngIf="prefixText" class="text-neutral-500 text-sm">{{ prefixText }}</span>
      </div>

      <!-- Input -->
      <input
        [type]="type"
        [placeholder]="placeholder"
        [required]="required"
        [disabled]="disabled"
        [readonly]="readonly"
        [attr.min]="min !== null ? min : null"
        [attr.max]="max !== null ? max : null"
        [attr.minlength]="minlength !== null ? minlength : null"
        [attr.maxlength]="maxlength !== null ? maxlength : null"
        [autocomplete]="autocomplete"
        [value]="value"
        [ngClass]="inputClasses"
        (input)="onInputChange($event)"
        (blur)="onBlur()"
        (focus)="onFocus()"
      />

      <!-- Suffix -->
      <div *ngIf="suffixText || suffixIcon"
           class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
    <span *ngIf="suffixIcon" class="text-neutral-500">
      <!-- We would integrate with an icon library here -->
      <i [class]="suffixIcon"></i>
    </span>
        <span *ngIf="suffixText" class="text-neutral-500 text-sm">{{ suffixText }}</span>
      </div>
    </div>`,
  imports: [
    NgClass,
    NgIf
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor, OnInit {
  @Input() type: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search' = 'text';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() min: number | null = null;
  @Input() max: number | null = null;
  @Input() minlength: number | null = null;
  @Input() maxlength: number | null = null;
  @Input() autocomplete: string = 'on';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() prefixIcon?: string;
  @Input() suffixIcon?: string;
  @Input() prefixText?: string;
  @Input() suffixText?: string;

  value: any = '';
  focused: boolean = false;
  controlDir?: NgControl;
  private ngControl: NgControl | null = null;

  @HostBinding('class.ds-input-disabled') get isDisabled() { return this.disabled; }

  private onChange: any = () => {};
  private onTouched: any = () => {};

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

  onInputChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
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

  get inputClasses(): string {
    return `
      w-full rounded border outline-none transition-all duration-200
      ${this.sizeClasses}
      ${this.disabled ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed' : 'bg-white'}
      ${this.focused ? 'border-primary-500 shadow-focus' : 'border-neutral-300 hover:border-neutral-400'}
      ${this.ngControl?.invalid && this.ngControl?.touched ? 'border-danger-500' : ''}
      ${this.prefixText || this.prefixIcon ? 'pl-9' : ''}
      ${this.suffixText || this.suffixIcon ? 'pr-9' : ''}
    `;
  }
}
