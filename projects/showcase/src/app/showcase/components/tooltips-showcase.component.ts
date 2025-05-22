import {Component} from '@angular/core';
import {ButtonComponent, TooltipDirective,} from 'ng-design-system-lib';
import {ShowcaseSectionComponent} from '../shared/showcase-section.component';
import {ExampleBoxComponent} from '../shared/example-box.component';

@Component({
  selector: 'app-tooltips-showcase',
  standalone: true,
  imports: [
    ButtonComponent,
    TooltipDirective,
    ShowcaseSectionComponent,
    ExampleBoxComponent,
  ],
  template: `
    <app-showcase-section title="Feedback & Notifications">
      <!-- Tooltips -->
      <app-example-box
        title="Tooltips"
        description="Provide additional information on hover or click"
      >
        <div class="flex flex-wrap gap-4">
          <ds-button variant="secondary" dsTooltip="Default tooltip (top)">
            Hover me (Default)
          </ds-button>

          <ds-button
            variant="secondary"
            dsTooltip="Right side tooltip"
            dsTooltipPosition="right"
          >
            Hover me (Right)
          </ds-button>

          <ds-button
            variant="secondary"
            dsTooltip="Bottom tooltip"
            dsTooltipPosition="bottom"
          >
            Hover me (Bottom)
          </ds-button>

          <ds-button
            variant="secondary"
            dsTooltip="Left tooltip"
            dsTooltipPosition="left"
          >
            Hover me (Left)
          </ds-button>

          <ds-button
            variant="secondary"
            dsTooltip="Light tooltip theme"
            dsTooltipVariant="light"
          >
            Light variant
          </ds-button>

          <ds-button
            variant="secondary"
            dsTooltip="Click-triggered tooltip"
            dsTooltipTrigger="click"
          >
            Click me for tooltip
          </ds-button>
        </div>
      </app-example-box>

    </app-showcase-section>
  `,
})
export class TooltipsShowcaseComponent {
}
