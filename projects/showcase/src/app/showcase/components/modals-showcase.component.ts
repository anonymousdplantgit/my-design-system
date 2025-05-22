import {Component, ViewChild} from '@angular/core';
import {ButtonComponent, ModalComponent, ModalService,} from 'ng-design-system-lib';
import {ShowcaseSectionComponent} from '../shared/showcase-section.component';
import {ExampleBoxComponent} from '../shared/example-box.component';

@Component({
  selector: 'app-modals-showcase',
  standalone: true,
  imports: [
    ButtonComponent,
    ModalComponent,
    ShowcaseSectionComponent,
    ExampleBoxComponent,
  ],
  template: `
    <app-showcase-section title="Feedback & Notifications">
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
export class ModalsShowcaseComponent {
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
