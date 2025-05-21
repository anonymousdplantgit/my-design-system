import {
  Component,
  forwardRef,
  HostBinding,
  Injector,
  Input,
  OnInit,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl,
} from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'ds-input',
  standalone: true,
  template: ` <div
    class="flex rounded border transition-colors"
    [ngClass]="containerClasses"
  >
    <!-- Prefix -->
    <div
      *ngIf="prefixText || prefixIcon"
      class="flex items-center px-3 border-r border-neutral-200 bg-neutral-50 text-neutral-500"
    >
      <span *ngIf="prefixIcon" class="mr-1">
        <i [class]="prefixIcon"></i>
      </span>
      <span *ngIf="prefixText" class="text-sm">{{ prefixText }}</span>
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
      class="flex-1 outline-none bg-transparent"
      [ngClass]="inputClasses"
      (input)="onInputChange($event)"
      (blur)="onBlur()"
      (focus)="onFocus()"
    />

    <!-- Suffix -->
    <div
      *ngIf="suffixText || suffixIcon"
      class="flex items-center px-3 border-l border-neutral-200 bg-neutral-50 text-neutral-500"
    >
      <span *ngIf="suffixIcon" class="mr-1">
        <i [class]="suffixIcon"></i>
      </span>
      <span *ngIf="suffixText" class="text-sm">{{ suffixText }}</span>
    </div>
  </div>`,
  imports: [NgClass, NgIf],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class InputComponent implements ControlValueAccessor, OnInit {
  @Input() type:
    | 'text'
    | 'password'
    | 'email'
    | 'number'
    | 'tel'
    | 'url'
    | 'search' = 'text';
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

  constructor(private injector: Injector) {}

  @HostBinding('class.ds-input-disabled') get isDisabled() {
    return this.disabled;
  }

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

  private onChange: any = () => {};

  private onTouched: any = () => {};
}
