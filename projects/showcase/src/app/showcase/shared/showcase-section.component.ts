import { Component, Input } from '@angular/core';
import { CardComponent } from 'design-lib';

@Component({
  selector: 'app-showcase-section',
  standalone: true,
  imports: [CardComponent],
  template: `
    <ds-card className="mb-8">
      <div class="p-6">
        <h2 class="text-xl font-semibold mb-6">{{ title }}</h2>
        <ng-content></ng-content>
      </div>
    </ds-card>
  `
})
export class ShowcaseSectionComponent {
  @Input() title: string = '';
}
