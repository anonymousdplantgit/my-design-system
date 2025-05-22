import {Component, ViewChild} from '@angular/core';
import {
  AlertComponent,
  ButtonComponent,
  ModalComponent,
  ModalService,
  ProgressBarComponent,
  SpinnerComponent,
  TooltipDirective,
} from 'ng-design-system-lib';
import {ShowcaseSectionComponent} from '../shared/showcase-section.component';
import {ExampleBoxComponent} from '../shared/example-box.component';

@Component({
  selector: 'app-feedback-showcase',
  standalone: true,
  imports: [
    AlertComponent,
    ButtonComponent,
    ModalComponent,
    ProgressBarComponent,
    SpinnerComponent,
    TooltipDirective,
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

      <!-- Modals -->
      <app-example-box
        title="Modals"
        description="Display content that temporarily blocks interaction with the main view"
      >
        <div class="flex flex-wrap gap-3">
          <ds-button variant="primary" (buttonClick)="openBasicModal()">
            Basic Modal
          </ds-button>

          <ds-button variant="secondary" (buttonClick)="openSizeModal('sm')">
            Small Modal
          </ds-button>

          <ds-button variant="secondary" (buttonClick)="openSizeModal('lg')">
            Large Modal
          </ds-button>

          <ds-button variant="secondary" (buttonClick)="openSizeModal('xl')">
            Extra Large Modal
          </ds-button>

          <ds-button variant="success" (buttonClick)="openModalWithoutFooter()">
            No Footer
          </ds-button>

          <ds-button variant="danger" (buttonClick)="openServiceModal()">
            Service Modal
          </ds-button>
        </div>

        <ds-modal
          #basicModal
          title="Basic Modal"
          [isOpen]="false"
          (modalClose)="closeModal()"
        >
          <p>This is a basic modal dialog with default header and footer.</p>
          <p class="mt-2">You can put any content here.</p>

          <div footer>
            <ds-button variant="secondary" (buttonClick)="closeModal()"
              >Cancel</ds-button
            >
            <ds-button variant="primary" (buttonClick)="closeModal()"
              >Confirm</ds-button
            >
          </div>
        </ds-modal>

        <ds-modal
          #sizeModal
          title="Size Modal"
          [size]="currentModalSize"
          [isOpen]="false"
          (modalClose)="closeModal()"
        >
          <p>This modal demonstrates the {{ currentModalSize }} size option.</p>

          <div footer>
            <ds-button variant="secondary" (buttonClick)="closeModal()"
              >Cancel</ds-button
            >
            <ds-button variant="primary" (buttonClick)="closeModal()"
              >Confirm</ds-button
            >
          </div>
        </ds-modal>

        <ds-modal
          #noFooterModal
          title="Modal Without Footer"
          [isOpen]="false"
          [showFooter]="false"
          (modalClose)="closeModal()"
        >
          <p>This modal has no footer section.</p>
          <p class="mt-2">Notice there are no buttons at the bottom.</p>
        </ds-modal>
      </app-example-box>
    </app-showcase-section>
  `,
})
export class FeedbackShowcaseComponent {
  @ViewChild('basicModal') basicModal!: ModalComponent;
  @ViewChild('sizeModal') sizeModal!: ModalComponent;
  @ViewChild('noFooterModal') noFooterModal!: ModalComponent;

  currentModalSize: 'sm' | 'md' | 'lg' | 'xl' | 'full' = 'md';

  constructor(private modalService: ModalService) {}

  openBasicModal() {
    this.basicModal.isOpen = true;
  }

  openSizeModal(size: 'sm' | 'lg' | 'xl') {
    this.currentModalSize = size;
    this.sizeModal.isOpen = true;
  }

  openModalWithoutFooter() {
    this.noFooterModal.isOpen = true;
  }

  openServiceModal() {
    this.modalService.open({
      title: 'Service Modal',
      content:
        'This modal was created using the ModalService for imperative usage.',
      size: 'md',
      showFooter: true,
      footerAlign: 'right',
    });
  }

  closeModal() {
    this.basicModal.isOpen = false;
    this.sizeModal.isOpen = false;
    this.noFooterModal.isOpen = false;
  }
}
