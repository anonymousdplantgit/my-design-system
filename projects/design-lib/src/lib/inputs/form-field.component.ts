import { Component, Input, ContentChild, AfterContentInit } from '@angular/core';
import {NgClass, NgIf} from '@angular/common';
import { FormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'ds-form-field',
  template: `
    <div [ngClass]="{
  'flex flex-col gap-1': direction === 'vertical',
  'flex items-center gap-4': direction === 'horizontal'
}">
      <label *ngIf="label"
             [ngClass]="{
           'text-sm font-medium text-neutral-700 mb-1': direction === 'vertical',
           'text-sm font-medium text-neutral-700 w-32': direction === 'horizontal'
         }">
        {{ label }}
        <span *ngIf="required" class="text-danger-500 ml-1">*</span>
      </label>

      <div class="flex-1 w-full">
        <ng-content></ng-content>

        <div *ngIf="hasError" class="mt-1 text-sm text-danger-500">
          {{ errorMessage }}
        </div>

        <div *ngIf="hint && !hasError" class="mt-1 text-xs text-neutral-500">
          {{ hint }}
        </div>
      </div>
    </div>`,
  imports: [
    NgIf,
    NgClass
  ]
})
export class FormFieldComponent implements AfterContentInit {
  @Input() label: string = '';
  @Input() required: boolean = false;
  @Input() control?: FormControl | AbstractControl | null; // Updated to accept null values
  @Input() hint?: string;
  @Input() direction: 'horizontal' | 'vertical' = 'vertical';

  @ContentChild('formElement') formElement: any;

  hasError = false;
  errorMessage = '';

  ngAfterContentInit() {
    if (this.control) {
      this.control.statusChanges.subscribe(() => {
        this.checkErrors();
      });
    }
  }

  private checkErrors() {
    if (!this.control) return;

    this.hasError = this.control.invalid && (this.control.dirty || this.control.touched);

    if (this.hasError) {
      const errors = this.control.errors;
      if (errors) {
        if (errors['required']) {
          this.errorMessage = 'This field is required';
        } else if (errors['email']) {
          this.errorMessage = 'Please enter a valid email';
        } else if (errors['minlength']) {
          this.errorMessage = `Minimum length is ${errors['minlength'].requiredLength}`;
        } else if (errors['maxlength']) {
          this.errorMessage = `Maximum length is ${errors['maxlength'].requiredLength}`;
        } else if (errors['pattern']) {
          this.errorMessage = 'Invalid format';
        } else if (errors['min']) {
          this.errorMessage = `Minimum value is ${errors['min'].min}`;
        } else if (errors['max']) {
          this.errorMessage = `Maximum value is ${errors['max'].max}`;
        } else {
          this.errorMessage = 'Invalid value';
        }
      }
    } else {
      this.errorMessage = '';
    }
  }
}
