import { Component } from '@angular/core';
import { ButtonComponent } from 'design-lib';
import { FormsModule } from '@angular/forms';
import { ShowcaseSectionComponent } from '../shared/showcase-section.component';
import { ExampleBoxComponent } from '../shared/example-box.component';

@Component({
  selector: 'app-buttons-showcase',
  standalone: true,
  imports: [
    ButtonComponent,
    FormsModule,
    ShowcaseSectionComponent,
    ExampleBoxComponent,
  ],
  template: `
    <app-showcase-section title="Button Components">
      <!-- Standard Buttons -->
      <app-example-box title="Button Variants">
        <div class="flex flex-wrap gap-4">
          <ds-button variant="primary">Primary</ds-button>
          <ds-button variant="secondary">Secondary</ds-button>
          <ds-button variant="success">Success</ds-button>
          <ds-button variant="danger">Danger</ds-button>
          <ds-button variant="warning">Warning</ds-button>
          <ds-button variant="info">Info</ds-button>
          <ds-button variant="link">Link</ds-button>
        </div>
      </app-example-box>

      <!-- Raised Buttons -->
      <app-example-box
        title="Raised Buttons"
        description="Buttons with elevation effect"
      >
        <div class="flex flex-wrap gap-4">
          <ds-button variant="primary" [raised]="true">Primary</ds-button>
          <ds-button variant="secondary" [raised]="true">Secondary</ds-button>
          <ds-button variant="success" [raised]="true">Success</ds-button>
          <ds-button variant="danger" [raised]="true">Danger</ds-button>
          <ds-button variant="warning" [raised]="true">Warning</ds-button>
          <ds-button variant="info" [raised]="true">Info</ds-button>
        </div>
      </app-example-box>

      <!-- Outline Buttons -->
      <app-example-box
        title="Outline Buttons"
        description="Buttons with transparent background and colored border"
      >
        <div class="flex flex-wrap gap-4">
          <ds-button variant="primary" [outline]="true">Primary</ds-button>
          <ds-button variant="secondary" [outline]="true">Secondary</ds-button>
          <ds-button variant="success" [outline]="true">Success</ds-button>
          <ds-button variant="danger" [outline]="true">Danger</ds-button>
          <ds-button variant="warning" [outline]="true">Warning</ds-button>
          <ds-button variant="info" [outline]="true">Info</ds-button>
        </div>
      </app-example-box>

      <!-- Raised Outline Buttons -->
      <app-example-box
        title="Raised Outline Buttons"
        description="Outline buttons with elevation effect"
      >
        <div class="flex flex-wrap gap-4">
          <ds-button variant="primary" [outline]="true" [raised]="true"
            >Primary</ds-button
          >
          <ds-button variant="secondary" [outline]="true" [raised]="true"
            >Secondary</ds-button
          >
          <ds-button variant="success" [outline]="true" [raised]="true"
            >Success</ds-button
          >
          <ds-button variant="danger" [outline]="true" [raised]="true"
            >Danger</ds-button
          >
          <ds-button variant="warning" [outline]="true" [raised]="true"
            >Warning</ds-button
          >
          <ds-button variant="info" [outline]="true" [raised]="true"
            >Info</ds-button
          >
        </div>
      </app-example-box>

      <!-- Flat Buttons -->
      <app-example-box
        title="Flat Buttons"
        description="Text-only buttons without background or border"
      >
        <div class="flex flex-wrap gap-4">
          <ds-button variant="primary" [flat]="true">Primary</ds-button>
          <ds-button variant="secondary" [flat]="true">Secondary</ds-button>
          <ds-button variant="success" [flat]="true">Success</ds-button>
          <ds-button variant="danger" [flat]="true">Danger</ds-button>
          <ds-button variant="warning" [flat]="true">Warning</ds-button>
          <ds-button variant="info" [flat]="true">Info</ds-button>
        </div>
      </app-example-box>

      <!-- Button Sizes -->
      <app-example-box
        title="Button Sizes"
        description="Available in different sizes"
      >
        <div class="flex flex-wrap items-center gap-4">
          <ds-button size="xs" variant="primary">Extra Small</ds-button>
          <ds-button size="sm" variant="primary">Small</ds-button>
          <ds-button size="md" variant="primary">Medium</ds-button>
          <ds-button size="lg" variant="primary">Large</ds-button>
        </div>
      </app-example-box>

      <!-- Button States -->
      <app-example-box
        title="Button States"
        description="Different button states and appearances"
      >
        <div class="flex flex-wrap gap-4">
          <ds-button variant="primary" [loading]="true">Loading</ds-button>
          <ds-button variant="primary" [disabled]="true">Disabled</ds-button>
          <ds-button variant="primary" [fullWidth]="true">Full Width</ds-button>
          <ds-button variant="primary" [rounded]="true">Rounded</ds-button>
        </div>
      </app-example-box>

      <!-- Icon Buttons -->
      <app-example-box title="Icon Buttons" description="Buttons with icons">
        <div class="flex flex-wrap gap-4">
          <ds-button variant="primary" iconLeft="fa-plus">Add Item</ds-button>
          <ds-button variant="danger" iconRight="fa-trash">Delete</ds-button>
          <ds-button
            variant="success"
            iconLeft="fa-check"
            iconRight="fa-arrow-right"
            >Confirm</ds-button
          >
        </div>
      </app-example-box>

      <!-- Raised Icon Buttons -->
      <app-example-box
        title="Raised Icon Buttons"
        description="Buttons with icons and elevation"
      >
        <div class="flex flex-wrap gap-4">
          <ds-button variant="primary" iconLeft="fa-plus" [raised]="true"
            >Add Item</ds-button
          >
          <ds-button variant="danger" iconRight="fa-trash" [raised]="true"
            >Delete</ds-button
          >
          <ds-button
            variant="success"
            iconLeft="fa-check"
            [raised]="true"
            [rounded]="true"
            >Confirm</ds-button
          >
        </div>
      </app-example-box>
    </app-showcase-section>
  `,
})
export class ButtonsShowcaseComponent {}
