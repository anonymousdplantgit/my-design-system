import { Component, Input, forwardRef, OnInit, Optional, Self, Injector } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'ds-checkbox',
  standalone: true,
  template: `
    <div class="flex items-center" [class.opacity-50]="disabled">
      <input
        type="checkbox"
        [id]="id"
        [checked]="checked"
        [required]="required"
        [disabled]="disabled"
        [ngClass]="[
      sizeClasses.checkbox,
      'appearance-none rounded border border-neutral-300 checked:border-primary-500 checked:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 transition-all duration-200'
    ]"
        (change)="onCheckboxChange($event)"
      />
      <label
        *ngIf="label"
        [for]="id"
        [ngClass]="[
      sizeClasses.label,
      'ml-2 cursor-pointer'
    ]"
      >
        {{ label }}
      </label>
    </div>`,
  imports: [
    NgClass,
    NgIf
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    }
  ]
})
export class CheckboxComponent implements ControlValueAccessor, OnInit {
  @Input() label: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() id: string = '';
  @Input() checked: boolean = false;

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

    // Generate a unique id if not provided
    if (!this.id) {
      this.id = `ds-checkbox-${Math.random().toString(36).substring(2, 11)}`;
    }
  }

  // ControlValueAccessor interface methods
  writeValue(value: boolean): void {
    this.checked = value;
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

  onCheckboxChange(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.checked = checked;
    this.onChange(checked);
    this.onTouched();
  }

  get sizeClasses(): { checkbox: string, label: string } {
    switch (this.size) {
      case 'sm':
        return {
          checkbox: 'w-4 h-4',
          label: 'text-sm'
        };
      case 'lg':
        return {
          checkbox: 'w-6 h-6',
          label: 'text-lg'
        };
      default:
        return {
          checkbox: 'w-5 h-5',
          label: 'text-base'
        };
    }
  }
}
