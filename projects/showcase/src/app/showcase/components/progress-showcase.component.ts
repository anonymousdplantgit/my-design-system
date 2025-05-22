import {Component} from '@angular/core';
import {ProgressBarComponent, SpinnerComponent,} from 'ng-design-system-lib';
import {ShowcaseSectionComponent} from '../shared/showcase-section.component';
import {ExampleBoxComponent} from '../shared/example-box.component';

@Component({
  selector: 'app-progress-showcase',
  standalone: true,
  imports: [
    ProgressBarComponent,
    SpinnerComponent,
    ShowcaseSectionComponent,
    ExampleBoxComponent,
  ],
  template: `
    <app-showcase-section title="Feedback & Notifications">
      <!-- Progress indicators -->
      <app-example-box
        title="Progress Indicators"
        description="Show loading states or progress"
      >
        <div class="flex flex-col space-y-4">
          <div>
            <h4 class="font-medium mb-2">Progress Bars</h4>

            <div class="flex flex-col space-y-3">
              <ds-progress-bar
                [value]="25"
                label="25% Complete"
                [showPercentage]="true"
              ></ds-progress-bar>
              <ds-progress-bar
                [value]="50"
                variant="success"
                label="Success"
              ></ds-progress-bar>
              <ds-progress-bar
                [value]="75"
                variant="warning"
                label="Warning"
              ></ds-progress-bar>
              <ds-progress-bar
                [value]="90"
                variant="danger"
                label="Danger"
              ></ds-progress-bar>
              <ds-progress-bar
                [value]="60"
                variant="info"
                label="Info"
                [animated]="true"
              ></ds-progress-bar>
              <ds-progress-bar
                [value]="40"
                variant="primary"
                [rounded]="false"
                label="Not Rounded"
              ></ds-progress-bar>

              <div class="flex items-center space-x-4 mt-2">
                <span class="text-sm font-medium">Sizes:</span>
                <ds-progress-bar
                  [value]="50"
                  size="sm"
                  className="w-40"
                ></ds-progress-bar>
                <ds-progress-bar
                  [value]="50"
                  size="md"
                  className="w-40"
                ></ds-progress-bar>
                <ds-progress-bar
                  [value]="50"
                  size="lg"
                  className="w-40"
                ></ds-progress-bar>
              </div>
            </div>
          </div>

          <div>
            <h4 class="font-medium mb-2">Spinners</h4>

            <div class="flex flex-wrap items-center gap-6">
              <ds-spinner size="sm" variant="primary"></ds-spinner>
              <ds-spinner size="md" variant="secondary"></ds-spinner>
              <ds-spinner size="lg" variant="success"></ds-spinner>
              <ds-spinner size="xl" variant="danger"></ds-spinner>

              <ds-spinner variant="warning" thickness="thin"></ds-spinner>
              <ds-spinner variant="info" thickness="medium"></ds-spinner>
              <ds-spinner variant="primary" thickness="thick"></ds-spinner>

              <div class="bg-primary-500 p-3 rounded">
                <ds-spinner variant="light"></ds-spinner>
              </div>
            </div>
          </div>
        </div>
      </app-example-box>

    </app-showcase-section>
  `,
})
export class ProgressShowcaseComponent {
}
