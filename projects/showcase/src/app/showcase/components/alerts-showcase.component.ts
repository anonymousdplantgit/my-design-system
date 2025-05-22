import {Component} from '@angular/core';
import {AlertComponent,} from 'ng-design-system-lib';
import {ShowcaseSectionComponent} from '../shared/showcase-section.component';
import {ExampleBoxComponent} from '../shared/example-box.component';

@Component({
  selector: 'app-alerts-showcase',
  standalone: true,
  imports: [
    AlertComponent,
    ShowcaseSectionComponent,
    ExampleBoxComponent,
  ],
  template: `
    <app-showcase-section title="Feedback & Notifications">
      <!-- Alerts -->
      <app-example-box
        title="Alerts"
        description="Provide feedback messages for user actions or system status"
      >
        <div class="flex flex-col space-y-3">
          <ds-alert type="info" title="Information">
            This is an informational message with useful details.
          </ds-alert>

          <ds-alert type="success" title="Success">
            Your changes have been saved successfully.
          </ds-alert>

          <ds-alert type="warning" title="Warning">
            Please review your information before proceeding.
          </ds-alert>

          <ds-alert type="danger" title="Error" [dismissible]="true">
            There was an error processing your request.
          </ds-alert>

          <ds-alert type="info" [showIcon]="false">
            Alert without icon.
          </ds-alert>

          <ds-alert type="success" [dismissible]="true" [duration]="5000">
            This alert will auto-dismiss after 5 seconds.
          </ds-alert>
        </div>
      </app-example-box>

    </app-showcase-section>
  `,
})
export class AlertsShowcaseComponent {

}
