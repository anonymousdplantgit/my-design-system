import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { NgClass, NgIf, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'ds-card',
  standalone: true,
  template: `
    <div
      [ngClass]="[
        'rounded-md shadow overflow-hidden',
        bordered ? 'border border-neutral-200' : '',
        hoverable ? 'transition-shadow hover:shadow-lg' : '',
        className,
      ]"
      [style.width]="width"
    >
      <!-- Card image -->
      <div *ngIf="imgSrc || headerTemplate" [ngClass]="imgClass">
        <ng-container *ngIf="headerTemplate; else defaultImageTemplate">
          <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
        </ng-container>

        <ng-template #defaultImageTemplate>
          <img
            *ngIf="imgSrc"
            [src]="imgSrc"
            [alt]="imgAlt || ''"
            class="w-full h-full object-cover"
          />
        </ng-template>
      </div>

      <!-- Card header -->
      <div
        *ngIf="(title || subtitle) && !noHeader"
        [ngClass]="[
          'px-4 py-3',
          headerDivider ? 'border-b border-neutral-200' : '',
        ]"
      >
        <h3 *ngIf="title" [ngClass]="['font-medium', titleClass]">
          {{ title }}
        </h3>
        <p
          *ngIf="subtitle"
          [ngClass]="['text-sm text-neutral-500', subtitleClass]"
        >
          {{ subtitle }}
        </p>
      </div>

      <!-- Card content -->
      <div [ngClass]="bodyClass">
        <ng-content></ng-content>
      </div>

      <!-- Card footer -->
      <div
        *ngIf="footerTemplate"
        [ngClass]="[
          'px-4 py-3',
          footerDivider ? 'border-t border-neutral-200' : '',
          footerClass,
        ]"
      >
        <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
      </div>
    </div>
  `,
  imports: [NgClass, NgIf, NgTemplateOutlet],
})
export class CardComponent {
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() imgSrc?: string;
  @Input() imgAlt?: string;
  @Input() imgClass: string = 'h-48';
  @Input() bordered: boolean = true;
  @Input() hoverable: boolean = false;
  @Input() width: string = '100%';
  @Input() headerDivider: boolean = true;
  @Input() footerDivider: boolean = true;
  @Input() noHeader: boolean = false;
  @Input() bodyClass: string = 'px-4 py-3';
  @Input() titleClass: string = 'text-base';
  @Input() subtitleClass: string = '';
  @Input() footerClass: string = '';
  @Input() className: string = '';

  @ContentChild('headerTemplate') headerTemplate?: TemplateRef<any>;
  @ContentChild('footerTemplate') footerTemplate?: TemplateRef<any>;
}
