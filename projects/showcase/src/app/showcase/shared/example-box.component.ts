// Reusable Example Box Component
import { Component, Input } from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-example-box',
  standalone: true,
  imports: [
    NgIf
  ],
  template: `
    <div class="mb-6">
      <h3 class="text-lg font-medium mb-3">{{ title }}</h3>
      <div class="p-4 bg-white border border-neutral-200 rounded-md">
        <ng-content></ng-content>
      </div>
      <p *ngIf="description" class="mt-2 text-sm text-neutral-600">{{ description }}</p>
    </div>
  `
})
export class ExampleBoxComponent {
  @Input() title: string = '';
  @Input() description?: string;
}
