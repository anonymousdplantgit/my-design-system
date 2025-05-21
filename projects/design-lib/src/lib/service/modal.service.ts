import { Injectable, ComponentRef, Injector, ApplicationRef, EmbeddedViewRef, Type, ComponentFactoryResolver } from '@angular/core';
import { ModalComponent } from '../components/modal.component';

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

    // Add string content directly to body content if provided
    if (typeof options.content === 'string') {
      modal.bodyContent = options.content;
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

    // Set to open after DOM attachment
    modal.isOpen = true;

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
    // Use Angular's ComponentFactoryResolver to create components dynamically
    const componentFactoryResolver = this.injector.get(ComponentFactoryResolver);
    const factory = componentFactoryResolver.resolveComponentFactory(component);
    return factory.create(this.injector);
  }
}
