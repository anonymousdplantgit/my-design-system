import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  CheckboxComponent,
  DatepickerComponent,
  FormFieldComponent,
  InputComponent,
  RadioComponent,
  SelectComponent,
  SelectOption
} from 'design-lib';
import {ShowcaseSectionComponent} from '../shared/showcase-section.component';
import {ExampleBoxComponent} from '../shared/example-box.component';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-forms-showcase',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputComponent,
    SelectComponent,
    RadioComponent,
    CheckboxComponent,
    DatepickerComponent,
    FormFieldComponent,
    ShowcaseSectionComponent,
    ExampleBoxComponent,
    NgClass,
  ],
  template: `
    <app-showcase-section title="Form Controls">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Text Inputs -->
        <div>
          <app-example-box title="Text Inputs">
            <div class="space-y-4">
              <ds-form-field label="Standard Input" hint="This is a standard text input">
                <ds-input
                  type="text"
                  placeholder="Enter text here"
                ></ds-input>
              </ds-form-field>

              <ds-form-field label="Required Input" [required]="true">
                <ds-input
                  type="text"
                  placeholder="Required field"
                  [required]="true"
                ></ds-input>
              </ds-form-field>

              <ds-form-field label="Disabled Input">
                <ds-input
                  type="text"
                  placeholder="Disabled input"
                  [disabled]="true"
                  value="Disabled value"
                ></ds-input>
              </ds-form-field>

              <ds-form-field label="Email Input">
                <ds-input
                  type="email"
                  placeholder="example@email.com"
                ></ds-input>
              </ds-form-field>

              <ds-form-field label="Password Input">
                <ds-input
                  type="password"
                  placeholder="Enter password"
                ></ds-input>
              </ds-form-field>

              <ds-form-field label="Number Input">
                <ds-input
                  type="number"
                  placeholder="Enter number"
                  [min]="0"
                  [max]="100"
                ></ds-input>
              </ds-form-field>
            </div>
          </app-example-box>
        </div>

        <!-- Inputs with prefix/suffix -->
        <div>
          <app-example-box title="Inputs with Prefix/Suffix">
            <div class="space-y-4">
              <ds-form-field label="Price">
                <ds-input
                  type="number"
                  placeholder="0.00"
                  prefixText="$"
                ></ds-input>
              </ds-form-field>

              <ds-form-field label="Percentage">
                <ds-input
                  type="number"
                  placeholder="0"
                  suffixText="%"
                ></ds-input>
              </ds-form-field>

              <ds-form-field label="Website">
                <ds-input
                  type="text"
                  placeholder="example"
                  prefixText="https://"
                  suffixText=".com"
                ></ds-input>
              </ds-form-field>

              <ds-form-field label="Search">
                <ds-input
                  type="search"
                  placeholder="Search..."
                  prefixIcon="fa-search"
                ></ds-input>
              </ds-form-field>

              <ds-form-field label="Email">
                <ds-input
                  type="email"
                  placeholder="username"
                  suffixText="@example.com"
                ></ds-input>
              </ds-form-field>
            </div>
          </app-example-box>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
        <!-- Select -->
        <app-example-box title="Select Dropdowns">
          <div class="space-y-4">
            <ds-form-field label="Standard Select">
              <ds-select
                [options]="countries"
                placeholder="Select a country"
              ></ds-select>
            </ds-form-field>

            <ds-form-field label="Required Select" [required]="true">
              <ds-select
                [options]="countries"
                placeholder="Required selection"
                [required]="true"
              ></ds-select>
            </ds-form-field>

            <ds-form-field label="Disabled Select">
              <ds-select
                [options]="countries"
                placeholder="Disabled selection"
                [disabled]="true"
              ></ds-select>
            </ds-form-field>

            <ds-form-field label="Multiple Select">
              <ds-select
                [options]="countries"
                placeholder="Select multiple"
                [multiple]="true"
              ></ds-select>
            </ds-form-field>
          </div>
        </app-example-box>

        <!-- Radio & Checkbox -->
        <app-example-box title="Radio & Checkbox">
          <div class="space-y-4">
            <ds-form-field label="Radio Buttons (Vertical)">
              <ds-radio
                [options]="genderOptions"
                name="gender-demo"
              ></ds-radio>
            </ds-form-field>

            <ds-form-field label="Radio Buttons (Horizontal)">
              <ds-radio
                [options]="genderOptions"
                name="gender-horiz"
                direction="horizontal"
              ></ds-radio>
            </ds-form-field>

            <h4 class="font-medium mt-4 mb-2">Checkboxes</h4>

            <ds-checkbox
              label="Standard checkbox"
            ></ds-checkbox>

            <ds-checkbox
              label="Disabled checkbox"
              [disabled]="true"
            ></ds-checkbox>

            <ds-checkbox
              label="Checked checkbox"
              [checked]="true"
            ></ds-checkbox>
          </div>
        </app-example-box>
      </div>

      <!-- Date Picker -->
      <app-example-box title="Datepicker" class="mt-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ds-form-field label="Standard Datepicker">
            <ds-datepicker
              placeholder="YYYY-MM-DD"
            ></ds-datepicker>
          </ds-form-field>

          <ds-form-field label="Date with Min/Max">
            <ds-datepicker
              placeholder="YYYY-MM-DD"
              min="2023-01-01"
              max="2025-12-31"
            ></ds-datepicker>
          </ds-form-field>

          <ds-form-field label="Custom Format">
            <ds-datepicker
              placeholder="MM/DD/YYYY"
              dateFormat="MM/dd/yyyy"
            ></ds-datepicker>
          </ds-form-field>

          <ds-form-field label="Disabled Date">
            <ds-datepicker
              placeholder="YYYY-MM-DD"
              [disabled]="true"
            ></ds-datepicker>
          </ds-form-field>
        </div>
      </app-example-box>

      <!-- Complete Form Example -->
      <app-example-box title="Complete Form Example" class="mt-8">
        <form [formGroup]="sampleForm" (ngSubmit)="onSubmit()" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ds-form-field label="First Name" [required]="true" [control]="sampleForm.get('firstName')!">
              <ds-input
                type="text"
                placeholder="Enter first name"
                formControlName="firstName"
              ></ds-input>
            </ds-form-field>

            <ds-form-field label="Last Name" [required]="true" [control]="sampleForm.get('lastName')!">
              <ds-input
                type="text"
                placeholder="Enter last name"
                formControlName="lastName"
              ></ds-input>
            </ds-form-field>
          </div>

          <ds-form-field label="Email" [required]="true" [control]="sampleForm.get('email')!">
            <ds-input
              type="email"
              placeholder="Enter email address"
              formControlName="email"
            ></ds-input>
          </ds-form-field>

          <ds-form-field label="Country" [required]="true" [control]="sampleForm.get('country')!">
            <ds-select
              [options]="countries"
              placeholder="Select a country"
              formControlName="country"
            ></ds-select>
          </ds-form-field>

          <div class="space-y-2 pt-2">
            <ds-checkbox
              label="I agree to the terms and conditions"
              formControlName="terms"
            ></ds-checkbox>
          </div>

          <div class="pt-4">
            <button
              type="submit"
              class="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 transition-colors"
              [disabled]="sampleForm.invalid"
              [ngClass]="{'opacity-50 cursor-not-allowed': sampleForm.invalid}"
            >
              Submit Form
            </button>
          </div>
        </form>
      </app-example-box>
    </app-showcase-section>
  `
})
export class FormsShowcaseComponent {
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


  sampleForm: FormGroup
  constructor(private fb: FormBuilder) {
    // Sample form
    this.sampleForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      country: ['', [Validators.required]],
      terms: [false, [Validators.requiredTrue]]
    });
  }

  onSubmit() {
    if (this.sampleForm.valid) {
      console.log('Form submitted:', this.sampleForm.value);
      alert('Form submitted successfully!');
    } else {
      this.sampleForm.markAllAsTouched();
    }
  }
}
