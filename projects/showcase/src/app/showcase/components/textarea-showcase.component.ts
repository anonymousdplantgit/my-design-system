import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormFieldComponent, TextareaComponent } from 'ng-design-system-lib';
import { ShowcaseSectionComponent } from '../shared/showcase-section.component';
import { ExampleBoxComponent } from '../shared/example-box.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-textarea-showcase',
  standalone: true,
  imports: [
    TextareaComponent,
    FormFieldComponent,
    ReactiveFormsModule,
    FormsModule,
    NgClass,
    ShowcaseSectionComponent,
    ExampleBoxComponent,
  ],
  template: `
    <app-showcase-section title="Textarea Components">
      <!-- Basic Textarea -->
      <app-example-box title="Basic Textarea">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <ds-form-field label="Standard Textarea">
              <ds-textarea
                placeholder="Enter your message here..."
                [(ngModel)]="basicValue"
              ></ds-textarea>
            </ds-form-field>

            <ds-form-field label="With Custom Rows">
              <ds-textarea
                placeholder="Larger textarea with 5 rows"
                [rows]="5"
                [(ngModel)]="largeValue"
              ></ds-textarea>
            </ds-form-field>

            <ds-form-field label="Read-only Textarea">
              <ds-textarea
                [readonly]="true"
                [(ngModel)]="readonlyValue"
              ></ds-textarea>
            </ds-form-field>
          </div>

          <div class="space-y-4">
            <ds-form-field label="Auto-resize Textarea">
              <ds-textarea
                placeholder="Start typing... this textarea will grow automatically"
                [autoResize]="true"
                [(ngModel)]="autoResizeValue"
                (onResize)="onTextareaResize($event)"
              ></ds-textarea>
            </ds-form-field>

            <ds-form-field label="Disabled Textarea">
              <ds-textarea
                placeholder="This textarea is disabled"
                [disabled]="true"
                [(ngModel)]="disabledValue"
              ></ds-textarea>
            </ds-form-field>

            <ds-form-field label="Required Textarea" [required]="true">
              <ds-textarea
                placeholder="This field is required"
                [required]="true"
                [(ngModel)]="requiredValue"
              ></ds-textarea>
            </ds-form-field>
          </div>
        </div>
      </app-example-box>

      <!-- Variants -->
      <app-example-box title="Textarea Variants">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ds-form-field label="Outlined (Default)">
            <ds-textarea
              variant="outlined"
              placeholder="Outlined variant"
              [(ngModel)]="outlinedValue"
            ></ds-textarea>
          </ds-form-field>

          <ds-form-field label="Filled Variant">
            <ds-textarea
              variant="filled"
              placeholder="Filled variant"
              [(ngModel)]="filledValue"
            ></ds-textarea>
          </ds-form-field>
        </div>
      </app-example-box>

      <!-- Sizes -->
      <app-example-box title="Textarea Sizes">
        <div class="space-y-4">
          <ds-form-field label="Small Size">
            <ds-textarea
              pSize="small"
              placeholder="Small textarea"
              [(ngModel)]="smallValue"
            ></ds-textarea>
          </ds-form-field>

          <ds-form-field label="Default Size">
            <ds-textarea
              placeholder="Default size textarea"
              [(ngModel)]="defaultSizeValue"
            ></ds-textarea>
          </ds-form-field>

          <ds-form-field label="Large Size">
            <ds-textarea
              pSize="large"
              placeholder="Large textarea"
              [(ngModel)]="largeSizeValue"
            ></ds-textarea>
          </ds-form-field>
        </div>
      </app-example-box>

      <!-- Fluid Width -->
      <app-example-box title="Fluid Width">
        <ds-form-field label="Fluid Textarea (100% width)">
          <ds-textarea
            [fluid]="true"
            placeholder="This textarea spans the full width of its container"
            [(ngModel)]="fluidValue"
          ></ds-textarea>
        </ds-form-field>
      </app-example-box>

      <!-- Character Limits -->
      <app-example-box title="Character Limits">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ds-form-field label="Max Length (100 characters)">
            <ds-textarea
              [maxLength]="100"
              placeholder="Maximum 100 characters allowed"
              [(ngModel)]="maxLengthValue"
            ></ds-textarea>
            <p class="text-xs text-neutral-500 mt-1">
              Characters: {{ maxLengthValue.length || 0 }} / 100
            </p>
          </ds-form-field>

          <ds-form-field label="Min Length (10 characters)">
            <ds-textarea
              [minLength]="10"
              placeholder="Minimum 10 characters required"
              [(ngModel)]="minLengthValue"
            ></ds-textarea>
            <p class="text-xs text-neutral-500 mt-1">
              Characters: {{ minLengthValue.length || 0 }} (min: 10)
            </p>
          </ds-form-field>
        </div>
      </app-example-box>

      <!-- Form Integration -->
      <app-example-box title="Form Integration">
        <form
          [formGroup]="textareaForm"
          (ngSubmit)="onSubmit()"
          class="space-y-4"
        >
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ds-form-field
              label="Subject"
              [required]="true"
              [control]="textareaForm.get('subject')!"
            >
              <ds-textarea
                placeholder="Enter the subject"
                formControlName="subject"
                [rows]="2"
              ></ds-textarea>
            </ds-form-field>

            <ds-form-field
              label="Priority Level"
              [control]="textareaForm.get('priority')!"
            >
              <ds-textarea
                placeholder="Describe the priority level"
                formControlName="priority"
                pSize="small"
                [rows]="2"
              ></ds-textarea>
            </ds-form-field>
          </div>

          <ds-form-field
            label="Message"
            [required]="true"
            [control]="textareaForm.get('message')!"
            hint="Please provide detailed information"
          >
            <ds-textarea
              placeholder="Enter your detailed message here..."
              formControlName="message"
              [autoResize]="true"
              [maxLength]="500"
            ></ds-textarea>
          </ds-form-field>

          <ds-form-field
            label="Additional Notes"
            [control]="textareaForm.get('notes')!"
          >
            <ds-textarea
              placeholder="Any additional notes (optional)"
              formControlName="notes"
              variant="filled"
              [fluid]="true"
            ></ds-textarea>
          </ds-form-field>

          <div class="pt-4">
            <button
              type="submit"
              class="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 transition-colors"
              [disabled]="textareaForm.invalid"
              [ngClass]="{
                'opacity-50 cursor-not-allowed': textareaForm.invalid,
              }"
            >
              Submit Form
            </button>
          </div>
        </form>
      </app-example-box>

      <!-- Auto-resize Demo -->
      <app-example-box
        title="Auto-resize Demo"
        description="The textarea below demonstrates auto-resize functionality with resize event handling"
      >
        <ds-form-field label="Auto-resize with Event Handling">
          <ds-textarea
            placeholder="Start typing a long message to see the auto-resize in action..."
            [autoResize]="true"
            [(ngModel)]="autoResizeDemoValue"
            (onResize)="onAutoResizeDemo($event)"
          ></ds-textarea>
        </ds-form-field>

        <div class="mt-2 text-sm text-neutral-600">
          <p>Resize events triggered: {{ resizeCount }}</p>
          <p>
            Current content length:
            {{ autoResizeDemoValue.length || 0 }} characters
          </p>
        </div>
      </app-example-box>
    </app-showcase-section>
  `,
})
export class TextareaShowcaseComponent {
  // Basic values
  basicValue: string = '';
  largeValue: string = '';
  autoResizeValue: string = '';
  requiredValue: string = '';
  readonlyValue: string =
    'This is a read-only textarea with some preset content.';
  disabledValue: string = 'Disabled content';

  // Variant values
  outlinedValue: string = '';
  filledValue: string = '';

  // Size values
  smallValue: string = '';
  defaultSizeValue: string = '';
  largeSizeValue: string = '';

  // Other values
  fluidValue: string = '';
  maxLengthValue: string = '';
  minLengthValue: string = '';
  autoResizeDemoValue: string = '';

  // Counters
  resizeCount: number = 0;

  // Form
  textareaForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.textareaForm = this.fb.group({
      subject: ['', [Validators.required, Validators.minLength(5)]],
      priority: [''],
      message: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(500),
        ],
      ],
      notes: [''],
    });
  }

  onTextareaResize(event: Event): void {
    console.log('Textarea resized:', event);
  }

  onAutoResizeDemo(event: Event): void {
    this.resizeCount++;
    console.log('Auto-resize demo event:', event);
  }

  onSubmit(): void {
    if (this.textareaForm.valid) {
      console.log('Form submitted:', this.textareaForm.value);
      alert('Form submitted successfully!');
    } else {
      console.log('Form is invalid');
      this.textareaForm.markAllAsTouched();
    }
  }
}
