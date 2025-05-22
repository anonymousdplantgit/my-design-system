import {Component} from '@angular/core';
import {BadgeComponent,} from 'ng-design-system-lib';
import {ShowcaseSectionComponent} from '../shared/showcase-section.component';
import {ExampleBoxComponent} from '../shared/example-box.component';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  lastLogin: Date;
}

@Component({
  selector: 'app-badges-showcase',
  standalone: true,
  imports: [
    ShowcaseSectionComponent,
    ExampleBoxComponent,
    BadgeComponent,

  ],
  template: `
    <app-showcase-section title="Data Display Components">
      <!-- Badges -->
      <app-example-box title="Badges" description="Small status indicators">
        <div class="flex flex-col space-y-4">
          <div>
            <p class="text-sm text-neutral-600 mb-2">Badge Variants:</p>
            <div class="flex flex-wrap gap-3">
              <ds-badge variant="primary">Primary</ds-badge>
              <ds-badge variant="secondary">Secondary</ds-badge>
              <ds-badge variant="success">Success</ds-badge>
              <ds-badge variant="danger">Danger</ds-badge>
              <ds-badge variant="warning">Warning</ds-badge>
              <ds-badge variant="info">Info</ds-badge>
            </div>
          </div>

          <div>
            <p class="text-sm text-neutral-600 mb-2">Sizes:</p>
            <div class="flex flex-wrap items-center gap-3">
              <ds-badge variant="primary" size="sm">Small</ds-badge>
              <ds-badge variant="primary" size="md">Medium</ds-badge>
              <ds-badge variant="primary" size="lg">Large</ds-badge>
            </div>
          </div>

          <div>
            <p class="text-sm text-neutral-600 mb-2">Outlined Badges:</p>
            <div class="flex flex-wrap gap-3">
              <ds-badge variant="primary" [outlined]="true">Primary</ds-badge>
              <ds-badge variant="secondary" [outlined]="true"
                >Secondary</ds-badge
              >
              <ds-badge variant="success" [outlined]="true">Success</ds-badge>
              <ds-badge variant="danger" [outlined]="true">Danger</ds-badge>
              <ds-badge variant="warning" [outlined]="true">Warning</ds-badge>
              <ds-badge variant="info" [outlined]="true">Info</ds-badge>
            </div>
          </div>

          <div>
            <p class="text-sm text-neutral-600 mb-2">Shapes:</p>
            <div class="flex flex-wrap gap-3">
              <ds-badge variant="primary" [rounded]="true">Rounded</ds-badge>
              <ds-badge variant="primary" [rounded]="false">Square</ds-badge>
            </div>
          </div>

          <div>
            <p class="text-sm text-neutral-600 mb-2">With Content:</p>
            <div class="flex flex-wrap items-center gap-3">
              <ds-badge variant="success">+24%</ds-badge>
              <ds-badge variant="danger">-12%</ds-badge>
              <ds-badge variant="warning">3 days left</ds-badge>
              <ds-badge variant="info">New</ds-badge>
            </div>
          </div>
        </div>
      </app-example-box>
    </app-showcase-section>
  `,
})
export class BadgesShowcaseComponent {
}
