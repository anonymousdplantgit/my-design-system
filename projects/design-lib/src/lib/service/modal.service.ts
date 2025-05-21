import { Injectable, ComponentRef, Injector, ApplicationRef, EmbeddedViewRef, Type } from '@angular/core';
import {ModalComponent} from 'design-lib';

export interface ModalOptions {
  title?: string;
  content?: string | Type<any>;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showFooter?: boolean;
  showHeader?: boolean;
  closeOnBackdrop?: boolean;
  data?: any;
  headerClass?: string;
  bodyClass?: string;
  footerClass?: string;
  footerAlign?: 'left' | 'center' | 'right';
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalRefs: ComponentRef<ModalComponent>[] = [];

  constructor(
    private injector: Injector,
    private appRef: ApplicationRef
  ) {}

  /**
   * Open a modal dialog
   * @param options Modal configuration options
   * @returns Reference to the created modal
   */
  open(options: ModalOptions = {}): ModalComponent {
    // Create modal component dynamically
    const modalComponentRef = this.createComponent(ModalComponent);
    this.modalRefs.push(modalComponentRef);

    // Set modal properties
    const modal = modalComponentRef.instance;
    modal.title = options.title || 'Modal';
    modal.size = options.size || 'md';
    modal.showFooter = options.showFooter !== undefined ? options.showFooter : true;
    modal.showHeader = options.showHeader !== undefined ? options.showHeader : true;
    modal.closeOnBackdrop = options.closeOnBackdrop !== undefined ? options.closeOnBackdrop : true;
    modal.isOpen = true;

    if (options.headerClass) {
      modal.headerClass = options.headerClass;
    }

    if (options.bodyClass) {
      modal.bodyClass = options.bodyClass;
    }

    if (options.footerClass) {
      modal.footerClass = options.footerClass;
    }

    if (options.footerAlign) {
      modal.footerAlign = options.footerAlign;
    }

    // Listen for close events
    const closeSubscription = modal.modalClose.subscribe(() => {
      this.close(modalComponentRef);
      closeSubscription.unsubscribe();
    });

    // Attach to DOM
    this.appRef.attachView(modalComponentRef.hostView);
    const domElem = (modalComponentRef.hostView as EmbeddedViewRef<any>).rootNodes[0];
    document.body.appendChild(domElem);

    // Handle content
    if (options.content) {
      if (typeof options.content === 'string') {
        // String content
        const contentElement = document.createElement('div');
        contentElement.innerHTML = options.content;
        modal.modalContent.nativeElement.querySelector('.modal-body').appendChild(contentElement);
      } else {
        // Component content
        const contentComponentRef = this.createComponent(options.content);

        // Pass data to component
        if (options.data && contentComponentRef.instance) {
          Object.assign(contentComponentRef.instance, options.data);
        }

        this.appRef.attachView(contentComponentRef.hostView);
        const contentElement = (contentComponentRef.hostView as EmbeddedViewRef<any>).rootNodes[0];
        modal.modalContent.nativeElement.querySelector('.modal-body').appendChild(contentElement);
      }
    }

    return modal;
  }

  /**
   * Close a specific modal
   * @param modalRef Reference to the modal to close
   */
  close(modalRef: ComponentRef<ModalComponent>): void {
    const index = this.modalRefs.indexOf(modalRef);
    if (index > -1) {
      this.appRef.detachView(modalRef.hostView);
      modalRef.destroy();
      this.modalRefs.splice(index, 1);
    }
  }

  /**
   * Close all open modals
   */
  closeAll(): void {
    this.modalRefs.forEach(modalRef => {
      this.appRef.detachView(modalRef.hostView);
      modalRef.destroy();
    });
    this.modalRefs = [];
  }

  /**
   * Helper method to create component
   */
  private createComponent<T>(component: Type<T>): ComponentRef<T> {
    // @ts-ignore
    return this.injector.get(ApplicationRef)
      .componentTypes.findIndex(c => c === component) === -1
      ? component['ɵfac'](this.injector)
      : this.injector.get(component as any);
  }
}
