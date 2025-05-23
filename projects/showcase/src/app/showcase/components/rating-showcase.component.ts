import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  FormFieldComponent,
  RatingComponent,
  RatingRateEvent,
} from 'ng-design-system-lib';
import { ShowcaseSectionComponent } from '../shared/showcase-section.component';
import { ExampleBoxComponent } from '../shared/example-box.component';
import { NgClass, NgForOf } from '@angular/common';

@Component({
  selector: 'app-rating-showcase',
  standalone: true,
  imports: [
    RatingComponent,
    FormFieldComponent,
    ReactiveFormsModule,
    FormsModule,
    NgClass,
    ShowcaseSectionComponent,
    ExampleBoxComponent,
    NgForOf,
  ],
  template: `
    <app-showcase-section title="Rating Components">
      <!-- Basic Rating -->
      <app-example-box title="Basic Rating">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <ds-form-field label="Standard Rating">
              <ds-rating
                [(ngModel)]="basicRating"
                (onRate)="onRatingChange($event)"
              ></ds-rating>
              <p class="text-sm text-neutral-600 mt-1">
                Current rating: {{ basicRating || 'None' }}
              </p>
            </ds-form-field>

            <ds-form-field label="Rating with Cancel">
              <ds-rating
                [(ngModel)]="cancelableRating"
                [cancel]="true"
                [showValue]="true"
                (onRate)="onRatingChange($event)"
                (onCancel)="onRatingCancel($event)"
              ></ds-rating>
            </ds-form-field>

            <ds-form-field label="10 Star Rating">
              <ds-rating
                [stars]="10"
                [(ngModel)]="tenStarRating"
                [showValue]="true"
              ></ds-rating>
            </ds-form-field>
          </div>

          <div class="space-y-4">
            <ds-form-field label="Read-only Rating">
              <ds-rating
                [readonly]="true"
                [value]="4"
                [showValue]="true"
              ></ds-rating>
            </ds-form-field>

            <ds-form-field label="Disabled Rating">
              <ds-rating
                [disabled]="true"
                [value]="3"
                [showValue]="true"
              ></ds-rating>
            </ds-form-field>

            <ds-form-field label="Auto-focus Rating">
              <ds-rating
                [autofocus]="false"
                [(ngModel)]="autoFocusRating"
                [cancel]="true"
              ></ds-rating>
              <button
                class="mt-2 px-3 py-1 bg-primary-500 text-white rounded text-sm hover:bg-primary-600"
                (click)="focusRating()"
              >
                Focus Rating
              </button>
            </ds-form-field>
          </div>
        </div>
      </app-example-box>

      <!-- Custom Styling -->
      <app-example-box title="Custom Styling">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <ds-form-field label="Custom Colors">
              <ds-rating
                [(ngModel)]="customColorRating"
                iconOnClass="text-red-500"
                iconOffClass="text-neutral-200 hover:text-red-300"
                [showValue]="true"
              ></ds-rating>
            </ds-form-field>

            <ds-form-field label="Green Rating">
              <ds-rating
                [(ngModel)]="greenRating"
                iconOnClass="text-green-500"
                iconOffClass="text-neutral-200 hover:text-green-300"
                [cancel]="true"
              ></ds-rating>
            </ds-form-field>

            <ds-form-field label="Blue Rating">
              <ds-rating
                [(ngModel)]="blueRating"
                iconOnClass="text-blue-500"
                iconOffClass="text-neutral-200 hover:text-blue-300"
                [stars]="7"
                [showValue]="true"
              ></ds-rating>
            </ds-form-field>
          </div>

          <div class="space-y-4">
            <ds-form-field label="Custom Size (Inline Styles)">
              <ds-rating
                [(ngModel)]="customSizeRating"
                [iconOnStyle]="getCustomStyle"
                [iconOffStyle]="getCustomStyle"
              ></ds-rating>
            </ds-form-field>

            <ds-form-field label="Gradient Rating">
              <ds-rating
                [(ngModel)]="gradientRating"
                iconOnClass="text-purple-500"
                iconOffClass="text-neutral-200 hover:text-purple-300"
                [cancel]="true"
                [showValue]="true"
              ></ds-rating>
            </ds-form-field>
          </div>
        </div>
      </app-example-box>

      <!-- Custom Templates -->
      <app-example-box title="Custom Icon Templates">
        <div class="space-y-6">
          <ds-form-field label="Heart Icons">
            <ds-rating
              [(ngModel)]="heartRating"
              [cancel]="true"
              [showValue]="true"
            >
              <ng-template #onicon>
                <svg
                  class="w-6 h-6 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clip-rule="evenodd"
                  />
                </svg>
              </ng-template>
              <ng-template #officon>
                <svg
                  class="w-6 h-6 text-neutral-300 hover:text-red-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </ng-template>
              <ng-template #cancelicon>
                <svg
                  class="w-4 h-4 text-red-400 hover:text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </ng-template>
            </ds-rating>
          </ds-form-field>

          <ds-form-field label="Thumbs Up/Down">
            <ds-rating [stars]="3" [(ngModel)]="thumbsRating" [cancel]="true">
              <ng-template #onicon>
                <svg
                  class="w-6 h-6 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"
                  />
                </svg>
              </ng-template>
              <ng-template #officon>
                <svg
                  class="w-6 h-6 text-neutral-300 hover:text-green-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                  />
                </svg>
              </ng-template>
            </ds-rating>
          </ds-form-field>
        </div>
      </app-example-box>

      <!-- Form Integration -->
      <app-example-box title="Form Integration">
        <form
          [formGroup]="ratingForm"
          (ngSubmit)="onSubmit()"
          class="space-y-6"
        >
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ds-form-field
              label="Overall Experience"
              [required]="true"
              [control]="ratingForm.get('overall')!"
            >
              <ds-rating
                formControlName="overall"
                [cancel]="true"
                [showValue]="true"
                (onRate)="onFormRatingChange('overall', $event)"
              ></ds-rating>
            </ds-form-field>

            <ds-form-field
              label="Service Quality"
              [required]="true"
              [control]="ratingForm.get('service')!"
            >
              <ds-rating
                formControlName="service"
                [stars]="10"
                iconOnClass="text-blue-500"
                iconOffClass="text-neutral-200 hover:text-blue-300"
                (onRate)="onFormRatingChange('service', $event)"
              ></ds-rating>
            </ds-form-field>

            <ds-form-field
              label="Product Quality"
              [control]="ratingForm.get('product')!"
            >
              <ds-rating
                formControlName="product"
                iconOnClass="text-green-500"
                iconOffClass="text-neutral-200 hover:text-green-300"
                [cancel]="true"
              ></ds-rating>
            </ds-form-field>

            <ds-form-field
              label="Value for Money"
              [control]="ratingForm.get('value')!"
            >
              <ds-rating
                formControlName="value"
                iconOnClass="text-yellow-500"
                iconOffClass="text-neutral-200 hover:text-yellow-300"
                [showValue]="true"
              ></ds-rating>
            </ds-form-field>
          </div>

          <div class="pt-4">
            <button
              type="submit"
              class="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 transition-colors"
              [disabled]="ratingForm.invalid"
              [ngClass]="{
                'opacity-50 cursor-not-allowed': ratingForm.invalid,
              }"
            >
              Submit Ratings
            </button>
          </div>
        </form>

        <div class="mt-6 p-4 bg-neutral-100 rounded">
          <h3 class="font-medium mb-2">Form Values:</h3>
          <pre class="text-sm">{{ getFormValues() }}</pre>
        </div>
      </app-example-box>

      <!-- Event Handling -->
      <app-example-box title="Event Handling">
        <div class="space-y-4">
          <ds-form-field label="Rating with Event Logging">
            <ds-rating
              [(ngModel)]="eventRating"
              [cancel]="true"
              [showValue]="true"
              (onRate)="onEventRating($event)"
              (onCancel)="onEventCancel($event)"
              (onFocus)="onEventFocus($event)"
              (onBlur)="onEventBlur($event)"
            ></ds-rating>
          </ds-form-field>

          <div class="mt-4 p-4 bg-neutral-100 rounded">
            <h4 class="font-medium mb-2">Event Log:</h4>
            <div class="max-h-40 overflow-y-auto">
              <div
                *ngFor="let event of eventLog"
                class="text-sm py-1 border-b border-neutral-200 last:border-b-0"
              >
                <span
                  class="font-medium text-{{
                    event.type === 'rate'
                      ? 'blue'
                      : event.type === 'cancel'
                        ? 'red'
                        : 'neutral'
                  }}-600"
                >
                  {{ event.type.toUpperCase() }}:
                </span>
                {{ event.message }}
                <span class="text-neutral-500">({{ event.timestamp }})</span>
              </div>
            </div>
            <button
              class="mt-2 px-3 py-1 bg-neutral-500 text-white rounded text-sm hover:bg-neutral-600"
              (click)="clearEventLog()"
            >
              Clear Log
            </button>
          </div>
        </div>
      </app-example-box>
    </app-showcase-section>
  `,
})
export class RatingShowcaseComponent {
  // Basic values
  basicRating: number | null = null;
  cancelableRating: number | null = null;
  tenStarRating: number | null = null;
  autoFocusRating: number | null = null;

  // Custom styling values
  customColorRating: number | null = null;
  greenRating: number | null = null;
  blueRating: number | null = null;
  customSizeRating: number | null = null;
  gradientRating: number | null = null;

  // Custom template values
  heartRating: number | null = null;
  thumbsRating: number | null = null;

  // Event handling
  eventRating: number | null = null;
  eventLog: Array<{ type: string; message: string; timestamp: string }> = [];

  // Form
  ratingForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.ratingForm = this.fb.group({
      overall: [null, [Validators.required]],
      service: [null, [Validators.required]],
      product: [null],
      value: [null],
    });
  }

  // Custom style function
  getCustomStyle = (klass: string) => {
    return {
      'font-size': '1.5rem',
      color: '#8B5CF6',
    };
  };

  // Event handlers
  onRatingChange(event: RatingRateEvent): void {
    console.log('Rating changed:', event);
  }

  onRatingCancel(event: Event): void {
    console.log('Rating cancelled:', event);
  }

  onFormRatingChange(field: string, event: RatingRateEvent): void {
    console.log(`${field} rating changed:`, event);
  }

  onEventRating(event: RatingRateEvent): void {
    this.addEventLog('rate', `Rating set to ${event.value} stars`);
  }

  onEventCancel(event: Event): void {
    this.addEventLog('cancel', 'Rating cancelled');
  }

  onEventFocus(event: FocusEvent): void {
    this.addEventLog('focus', 'Rating component focused');
  }

  onEventBlur(event: FocusEvent): void {
    this.addEventLog('blur', 'Rating component blurred');
  }

  // Utility methods
  focusRating(): void {
    // This would focus the rating component if we had a reference to it
    console.log('Focus rating triggered');
  }

  addEventLog(type: string, message: string): void {
    this.eventLog.unshift({
      type,
      message,
      timestamp: new Date().toLocaleTimeString(),
    });

    // Keep only last 10 events
    if (this.eventLog.length > 10) {
      this.eventLog = this.eventLog.slice(0, 10);
    }
  }

  clearEventLog(): void {
    this.eventLog = [];
  }

  getFormValues(): string {
    return JSON.stringify(this.ratingForm.value, null, 2);
  }

  onSubmit(): void {
    if (this.ratingForm.valid) {
      console.log('Form submitted:', this.ratingForm.value);
      alert('Rating form submitted successfully!');
    } else {
      console.log('Form is invalid');
      this.ratingForm.markAllAsTouched();
    }
  }
}
