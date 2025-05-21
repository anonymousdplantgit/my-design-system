// Main Showcase Component - Container for all examples
import { Component } from '@angular/core';
import { TabComponent, TabsComponent } from 'design-lib';
import { LayoutShowcaseComponent } from './components/layout-showcase.component';
import { ButtonsShowcaseComponent } from './components/buttons-showcase.component';
import { FormsShowcaseComponent } from './components/forms-showcase.component';
import { FeedbackShowcaseComponent } from './components/feedback-showcase.component';
import { DataDisplayShowcaseComponent } from './components/data-display-showcase.component';
import { ExamplesShowcaseComponent } from './components/examples-showcase.component';

@Component({
  selector: 'app-showcase',
  standalone: true,
  imports: [
    TabsComponent,
    TabComponent,
    ButtonsShowcaseComponent,
    FormsShowcaseComponent,
    FeedbackShowcaseComponent,
    LayoutShowcaseComponent,
    DataDisplayShowcaseComponent,
    ExamplesShowcaseComponent
  ],
  template: `
    <div class="bg-neutral-50 min-h-screen pb-12">
      <header class="bg-white border-b border-neutral-200 py-4 px-6 mb-8">
        <div class="container mx-auto">
          <h1 class="text-2xl font-bold text-primary-700">Design System Showcase</h1>
          <p class="text-neutral-600 mt-1">Comprehensive component library</p>
        </div>
      </header>

      <div class="container mx-auto px-4">
        <ds-tabs variant="underline">
          <ds-tab title="Buttons">
            <app-buttons-showcase></app-buttons-showcase>
          </ds-tab>

          <ds-tab title="Form Controls">
            <app-forms-showcase></app-forms-showcase>
          </ds-tab>

          <ds-tab title="Data Display">
            <app-data-display-showcase></app-data-display-showcase>
          </ds-tab>

          <ds-tab title="Feedback & Alerts">
            <app-feedback-showcase></app-feedback-showcase>
          </ds-tab>

          <ds-tab title="Layout Components">
            <app-layout-showcase></app-layout-showcase>
          </ds-tab>

          <ds-tab title="Complete Examples">
            <app-examples-showcase></app-examples-showcase>
          </ds-tab>
        </ds-tabs>
      </div>
    </div>
  `
})
export class ShowcaseComponent {}
