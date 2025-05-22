import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SelectComponent } from 'ng-design-system-lib';
import { JsonPipe, NgIf } from '@angular/common';

interface Country {
  name: string;
  code: string;
  flag?: string;
}

interface City {
  name: string;
  country: string;
  population: number;
}

@Component({
  selector: 'app-selects-showcase',
  standalone: true,
  imports: [SelectComponent, ReactiveFormsModule, NgIf, FormsModule, JsonPipe],
  template: `
    <div class="p-6 space-y-8">
      <h1 class="text-2xl font-bold mb-6 text-neutral-800">
        Enhanced Select Component Examples
      </h1>

      <!-- Basic Select -->
      <div class="space-y-2">
        <h2 class="text-lg font-semibold">Basic Select</h2>
        <ds-select
          [options]="basicOptions"
          [(ngModel)]="selectedBasic"
          placeholder="Choose an option"
          class="w-full md:w-64"
        ></ds-select>
        <p class="text-sm text-gray-600">
          Selected: {{ selectedBasic || 'None' }}
        </p>
      </div>

      <!-- Custom Templates Example (like your provided example) -->
      <div class="space-y-2">
        <h2 class="text-lg font-semibold">Custom Templates (Countries)</h2>
        <ds-select
          [options]="countries"
          [(ngModel)]="selectedCountry"
          optionLabel="name"
          optionValue="code"
          placeholder="Select a country"
          class="w-full md:w-56"
          [showClear]="true"
          [filter]="true"
          filterPlaceholder="Search countries..."
        >
          <!-- Selected item template -->
          <ng-template #selectedItem let-selectedOption>
            <div class="flex items-center gap-2" *ngIf="selectedOption">
              <img
                src="https://flagcdn.com/16x12/{{
                  selectedOption.code.toLowerCase()
                }}.png"
                [alt]="selectedOption.name + ' flag'"
                class="w-4 h-3"
              />
              <div>{{ selectedOption.name }}</div>
            </div>
          </ng-template>

          <!-- Option item template -->
          <ng-template #item let-country>
            <div class="flex items-center gap-2">
              <img
                src="https://flagcdn.com/16x12/{{
                  country.code.toLowerCase()
                }}.png"
                [alt]="country.name + ' flag'"
                class="w-4 h-3"
              />
              <div>{{ country.name }}</div>
            </div>
          </ng-template>

          <!-- Custom dropdown icon -->
          <ng-template #dropdownicon>
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M10 2a6 6 0 00-6 6c0 1.887-.454 3.665-1.257 5.234a.75.75 0 00.515 1.076 32.91 32.91 0 003.256.508 3.5 3.5 0 006.972 0 32.903 32.903 0 003.256-.508.75.75 0 00.515-1.076A11.448 11.448 0 0116 8a6 6 0 00-6-6zM8.05 14.943a33.54 33.54 0 003.9 0 2 2 0 01-3.9 0z"
                clip-rule="evenodd"
              />
            </svg>
          </ng-template>

          <!-- Header template -->
          <ng-template #header>
            <div class="font-medium p-3 bg-gray-50 border-b">
              Available Countries
            </div>
          </ng-template>

          <!-- Footer template -->
          <ng-template #footer>
            <div class="p-3 border-t bg-gray-50">
              <button
                class="w-full px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded border border-blue-200"
                (click)="addNewCountry()"
              >
                + Add New Country
              </button>
            </div>
          </ng-template>
        </ds-select>
        <p class="text-sm text-gray-600">
          Selected Country: {{ selectedCountry || 'None' }}
        </p>
      </div>

      <!-- Grouped Options -->
      <div class="space-y-2">
        <h2 class="text-lg font-semibold">Grouped Options</h2>
        <ds-select
          [options]="groupedCities"
          [(ngModel)]="selectedCity"
          [group]="true"
          optionLabel="name"
          optionValue="name"
          optionGroupLabel="country"
          optionGroupChildren="cities"
          placeholder="Select a city"
          class="w-full md:w-64"
          [filter]="true"
        >
          <ng-template #item let-city>
            <div class="flex justify-between items-center w-full">
              <span>{{ city.name }}</span>
              <span class="text-xs text-gray-500">{{
                formatPopulation(city.population)
              }}</span>
            </div>
          </ng-template>
        </ds-select>
        <p class="text-sm text-gray-600">
          Selected City: {{ selectedCity || 'None' }}
        </p>
      </div>

      <!-- Different Sizes and Variants -->
      <div class="space-y-4">
        <h2 class="text-lg font-semibold">Sizes and Variants</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">Small Size</label>
            <ds-select
              [options]="basicOptions"
              [(ngModel)]="selectedSmall"
              size="small"
              placeholder="Small select"
              class="w-full"
            ></ds-select>
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium">Large Size</label>
            <ds-select
              [options]="basicOptions"
              [(ngModel)]="selectedLarge"
              size="large"
              placeholder="Large select"
              class="w-full"
            ></ds-select>
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium">Outlined (Default)</label>
            <ds-select
              [options]="basicOptions"
              [(ngModel)]="selectedOutlined"
              variant="outlined"
              placeholder="Outlined variant"
              class="w-full"
            ></ds-select>
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium">Filled Variant</label>
            <ds-select
              [options]="basicOptions"
              [(ngModel)]="selectedFilled"
              variant="filled"
              placeholder="Filled variant"
              class="w-full"
            ></ds-select>
          </div>
        </div>
      </div>

      <!-- Form Integration -->
      <div class="space-y-2">
        <h2 class="text-lg font-semibold">Form Integration</h2>
        <form [formGroup]="demoForm" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-2">
              <label class="text-sm font-medium">Country *</label>
              <ds-select
                [options]="countries"
                formControlName="country"
                optionLabel="name"
                optionValue="code"
                placeholder="Select country"
                class="w-full"
                [showClear]="true"
                [filter]="true"
              ></ds-select>
              <div
                *ngIf="
                  demoForm.get('country')?.invalid &&
                  demoForm.get('country')?.touched
                "
                class="text-sm text-red-600"
              >
                Country is required
              </div>
            </div>

            <div class="space-y-2">
              <label class="text-sm font-medium">Priority</label>
              <ds-select
                [options]="priorities"
                formControlName="priority"
                optionLabel="label"
                optionValue="value"
                placeholder="Select priority"
                class="w-full"
                [checkmark]="true"
              >
                <ng-template #item let-priority>
                  <div class="flex items-center gap-2">
                    <div
                      class="w-3 h-3 rounded-full"
                      [style.background-color]="priority.color"
                    ></div>
                    <span>{{ priority.label }}</span>
                  </div>
                </ng-template>
              </ds-select>
            </div>
          </div>

          <button
            type="submit"
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            [disabled]="demoForm.invalid"
            (click)="onSubmit()"
          >
            Submit Form
          </button>
        </form>

        <div class="mt-4 p-4 bg-gray-100 rounded">
          <h3 class="font-medium mb-2">Form Values:</h3>
          <pre>{{ demoForm.value | json }}</pre>
        </div>
      </div>

      <!-- Advanced Features -->
      <div class="space-y-2">
        <h2 class="text-lg font-semibold">Advanced Features</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">With Loading State</label>
            <ds-select
              [showClear]="true"
              [options]="loadingOptions"
              [(ngModel)]="selectedLoading"
              [loading]="isLoading"
              placeholder="Loading example"
              class="w-full"
            ></ds-select>
            <button
              class="text-sm text-blue-600 hover:underline"
              (click)="toggleLoading()"
            >
              Toggle Loading
            </button>
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium">Disabled State</label>
            <ds-select
              [options]="basicOptions"
              [(ngModel)]="selectedDisabled"
              [disabled]="true"
              placeholder="This is disabled"
              class="w-full"
            ></ds-select>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class SelectsShowcaseComponent {
  // Basic options
  basicOptions = [
    { label: 'Option 1', value: 'opt1' },
    { label: 'Option 2', value: 'opt2' },
    { label: 'Option 3', value: 'opt3' },
    { label: 'Disabled Option', value: 'opt4', disabled: true },
    { label: 'Option 5', value: 'opt5' },
  ];

  // Countries data
  countries: Country[] = [
    { name: 'United States', code: 'US' },
    { name: 'United Kingdom', code: 'GB' },
    { name: 'France', code: 'FR' },
    { name: 'Germany', code: 'DE' },
    { name: 'Japan', code: 'JP' },
    { name: 'Canada', code: 'CA' },
    { name: 'Australia', code: 'AU' },
    { name: 'Brazil', code: 'BR' },
    { name: 'India', code: 'IN' },
    { name: 'China', code: 'CN' },
  ];

  // Grouped cities
  groupedCities = [
    {
      country: 'United States',
      cities: [
        { name: 'New York', country: 'US', population: 8336817 },
        { name: 'Los Angeles', country: 'US', population: 3979576 },
        { name: 'Chicago', country: 'US', population: 2693976 },
      ],
    },
    {
      country: 'United Kingdom',
      cities: [
        { name: 'London', country: 'UK', population: 8982000 },
        { name: 'Birmingham', country: 'UK', population: 1141816 },
        { name: 'Manchester', country: 'UK', population: 547000 },
      ],
    },
    {
      country: 'France',
      cities: [
        { name: 'Paris', country: 'FR', population: 2161000 },
        { name: 'Marseille', country: 'FR', population: 861635 },
        { name: 'Lyon', country: 'FR', population: 513275 },
      ],
    },
  ];

  // Priority options with colors
  priorities = [
    { label: 'Low', value: 'low', color: '#10b981' },
    { label: 'Medium', value: 'medium', color: '#f59e0b' },
    { label: 'High', value: 'high', color: '#ef4444' },
    { label: 'Critical', value: 'critical', color: '#dc2626' },
  ];

  // Form values
  selectedBasic: any = null;
  selectedCountry: any = null;
  selectedCity: any = null;
  selectedSmall: any = null;
  selectedLarge: any = null;
  selectedOutlined: any = null;
  selectedFilled: any = null;
  selectedLoading: any = null;
  selectedDisabled: any = null;

  // Loading state
  isLoading = false;
  loadingOptions = [
    { label: 'Loaded Option 1', value: 'loaded1' },
    { label: 'Loaded Option 2', value: 'loaded2' },
    { label: 'Loaded Option 3', value: 'loaded3' },
  ];

  // Form
  demoForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.demoForm = this.fb.group({
      country: ['', Validators.required],
      priority: [''],
    });
  }

  formatPopulation(population: number): string {
    if (population >= 1000000) {
      return (population / 1000000).toFixed(1) + 'M';
    } else if (population >= 1000) {
      return (population / 1000).toFixed(0) + 'K';
    }
    return population.toString();
  }

  addNewCountry(): void {
    const newCountry = {
      name: 'New Country',
      code: 'NC',
    };
    this.countries = [...this.countries, newCountry];
    console.log('Added new country:', newCountry);
  }

  toggleLoading(): void {
    this.isLoading = !this.isLoading;
  }

  onSubmit(): void {
    if (this.demoForm.valid) {
      console.log('Form submitted:', this.demoForm.value);
      alert('Form submitted successfully!');
    } else {
      console.log('Form is invalid');
      this.demoForm.markAllAsTouched();
    }
  }
}
