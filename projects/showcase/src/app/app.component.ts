import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  CheckboxComponent, DatepickerComponent,
  FormFieldComponent,
  InputComponent,
  RadioComponent,
  SelectComponent,
  SelectOption
} from 'design-lib';
import {NgClass, NgForOf} from '@angular/common';

@Component({
  selector: 'app-root',
  template: `
    <div class="container mx-auto px-4 py-8">
      <header class="mb-8">
        <h1 class="text-3xl font-bold text-primary-700 mb-2">{{ title }}</h1>
        <p class="text-neutral-600">A collection of reusable form components styled with Tailwind CSS</p>
      </header>

      <div class="mb-8">
        <h2 class="text-xl font-semibold mb-4">Size Variants</h2>
        <div class="flex items-center gap-4 mb-4">
          <span class="text-sm text-neutral-600">Select size:</span>
          <label *ngFor="let size of sizeOptions" class="flex items-center">
            <input
              type="radio"
              name="size"
              [value]="size"
              [(ngModel)]="selectedSize"
              class="mr-1"
            />
            <span class="text-sm">{{ size }}</span>
          </label>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Form components showcase -->
        <section class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-semibold mb-4">Components Showcase</h2>

          <div class="space-y-6">
            <!-- Text Input -->
            <div>
              <h3 class="text-lg font-medium mb-2">Text Input</h3>
              <ds-form-field label="Standard Input" hint="This is a standard text input">
                <ds-input
                  type="text"
                  placeholder="Enter text here"
                  [size]="selectedSize"
                ></ds-input>
              </ds-form-field>
            </div>

            <!-- Input with prefix/suffix -->
            <div>
              <h3 class="text-lg font-medium mb-2">Input with Prefix/Suffix</h3>
              <ds-form-field label="Price">
                <ds-input
                  type="number"
                  placeholder="0.00"
                  prefixText="$"
                  [size]="selectedSize"
                ></ds-input>
              </ds-form-field>

              <div class="mt-3">
                <ds-form-field label="Email">
                  <ds-input
                    type="email"
                    placeholder="user@example.com"
                    suffixText="@example.com"
                    [size]="selectedSize"
                  ></ds-input>
                </ds-form-field>
              </div>
            </div>

            <!-- Select -->
            <div>
              <h3 class="text-lg font-medium mb-2">Select</h3>
              <ds-form-field label="Country">
                <ds-select
                  [options]="countries"
                  placeholder="Select a country"
                  [size]="selectedSize"
                ></ds-select>
              </ds-form-field>
            </div>

            <!-- Radio -->
            <div>
              <h3 class="text-lg font-medium mb-2">Radio Buttons</h3>
              <ds-form-field label="Gender">
                <ds-radio
                  [options]="genderOptions"
                  name="gender"
                  [size]="selectedSize"
                ></ds-radio>
              </ds-form-field>

              <div class="mt-3">
                <ds-form-field label="Direction">
                  <ds-radio
                    [options]="[
                  { value: 'horizontal', label: 'Horizontal' },
                  { value: 'vertical', label: 'Vertical' }
                ]"
                    name="direction"
                    direction="horizontal"
                    [size]="selectedSize"
                  ></ds-radio>
                </ds-form-field>
              </div>
            </div>

            <!-- Checkbox -->
            <div>
              <h3 class="text-lg font-medium mb-2">Checkbox</h3>
              <ds-checkbox
                label="I agree to the terms and conditions"
                [size]="selectedSize"
              ></ds-checkbox>
            </div>

            <!-- Datepicker -->
            <div>
              <h3 class="text-lg font-medium mb-2">Datepicker</h3>
              <ds-form-field label="Birth Date">
                <ds-datepicker
                  placeholder="YYYY-MM-DD"
                  [size]="selectedSize"
                ></ds-datepicker>
              </ds-form-field>
            </div>
          </div>
        </section>

        <!-- Complete Form Example -->
        <section class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-semibold mb-4">Form Example</h2>

          <form [formGroup]="basicForm" (ngSubmit)="onSubmit()" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ds-form-field label="First Name" [required]="true" formControlName="firstName">
                <ds-input
                  type="text"
                  placeholder="Enter first name"
                  [size]="selectedSize"
                  formControlName="firstName"
                ></ds-input>
              </ds-form-field>

              <ds-form-field label="Last Name" [required]="true" formControlName="lastName">
                <ds-input
                  type="text"
                  placeholder="Enter last name"
                  [size]="selectedSize"
                  formControlName="lastName"
                ></ds-input>
              </ds-form-field>
            </div>

            <ds-form-field label="Email" [required]="true" formControlName="email">
              <ds-input
                type="email"
                placeholder="Enter email address"
                [size]="selectedSize"
                formControlName="email"
              ></ds-input>
            </ds-form-field>

            <ds-form-field label="Country" [required]="true" formControlName="country">
              <ds-select
                [options]="countries"
                placeholder="Select a country"
                [size]="selectedSize"
                formControlName="country"
              ></ds-select>
            </ds-form-field>

            <ds-form-field label="Gender" [required]="true" formControlName="gender">
              <ds-radio
                [options]="genderOptions"
                name="gender-form"
                [size]="selectedSize"
                formControlName="gender"
              ></ds-radio>
            </ds-form-field>

            <ds-form-field label="Birth Date" formControlName="birthdate">
              <ds-datepicker
                placeholder="YYYY-MM-DD"
                [size]="selectedSize"
                formControlName="birthdate"
              ></ds-datepicker>
            </ds-form-field>

            <div class="space-y-2">
              <ds-checkbox
                label="Subscribe to newsletter"
                [size]="selectedSize"
                formControlName="subscribeNewsletter"
              ></ds-checkbox>

              <ds-checkbox
                label="I agree to the terms and conditions"
                [size]="selectedSize"
                formControlName="terms"
              ></ds-checkbox>
              <div *ngIf="basicForm.get('terms')?.invalid && basicForm.get('terms')?.touched"
                   class="text-sm text-danger-500">
                You must agree to the terms and conditions
              </div>
            </div>

            <div class="pt-4">
              <button
                type="submit"
                class="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 transition-colors"
                [disabled]="basicForm.invalid"
                [ngClass]="{'opacity-50 cursor-not-allowed': basicForm.invalid}"
              >
                Submit Form
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  `,
  imports: [
    FormsModule,
    NgForOf,
    FormFieldComponent,
    RadioComponent,
    SelectComponent,
    InputComponent,
    ReactiveFormsModule,
    CheckboxComponent,
    NgClass,
    DatepickerComponent
  ]
})
export class AppComponent implements OnInit {
  title = 'Design System Showcase';

  // Form examples
  basicForm!: FormGroup;

  // Options for select and radio
  countries: SelectOption[] = [
    { value: '', label: 'Select a country' },
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'fr', label: 'France' },
    { value: 'de', label: 'Germany' },
    { value: 'jp', label: 'Japan' }
  ];

  genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
    { value: 'prefer-not', label: 'Prefer not to say' }
  ];

  sizeOptions = ['sm', 'md', 'lg'];
  selectedSize :"sm" | "md" | "lg"  = 'md';

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForms();
  }

  initForms() {
    // Basic form
    this.basicForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      country: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      birthdate: [''],
      subscribeNewsletter: [false],
      terms: [false, [Validators.requiredTrue]]
    });
  }

  onSubmit() {
    if (this.basicForm.valid) {
      console.log('Form submitted:', this.basicForm.value);
      alert('Form submitted successfully!');
    } else {
      this.basicForm.markAllAsTouched();
    }
  }
}
