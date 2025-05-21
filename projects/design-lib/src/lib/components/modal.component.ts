import { Component, Input, Output, EventEmitter, ElementRef, OnInit, OnDestroy, ViewChild, TemplateRef, ContentChild } from '@angular/core';
import {NgClass, NgIf, NgTemplateOutlet} from '@angular/common';

@Component({
  selector: 'ds-modal',
  template: `
    <div *ngIf="isOpen" class="fixed inset-0 z-50 overflow-auto bg-neutral-800 bg-opacity-75 flex items-center justify-center"
         (click)="backdropClick($event)"
         aria-modal="true"
         role="dialog">
      <!-- Modal dialog -->
      <div #modalContent
           [ngClass]="[
             'bg-white rounded-lg shadow-xl relative transition-all transform',
             sizeClass,
             animation ? 'animate-modal-open' : ''
           ]"
           (click)="$event.stopPropagation()">

        <!-- Header -->
        <div *ngIf="showHeader"
             [ngClass]="[
               'flex items-center justify-between p-4 border-b border-neutral-200',
               headerClass
             ]">
          <h3 class="text-lg font-medium text-neutral-900">{{ title }}</h3>
          <button *ngIf="showCloseButton"
                  type="button"
                  (click)="close()"
                  class="text-neutral-400 hover:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500">
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Body -->
        <div [ngClass]="[
          'p-4',
          bodyClass
        ]">
          <ng-content></ng-content>
          <ng-container *ngIf="bodyTemplate"
                        [ngTemplateOutlet]="bodyTemplate"></ng-container>
        </div>

        <!-- Footer -->
        <div *ngIf="showFooter"
             [ngClass]="[
               'p-4 border-t border-neutral-200 flex',
               footerAlign === 'left' ? 'justify-start' :
               footerAlign === 'right' ? 'justify-end' : 'justify-center',
               'space-x-2',
               footerClass
             ]">
          <ng-content select="[footer]"></ng-content>
          <ng-container *ngIf="footerTemplate"
                        [ngTemplateOutlet]="footerTemplate"></ng-container>

          <ng-container *ngIf="!footerTemplate && showDefaultFooter">
            <button type="button"
                    (click)="close()"
                    class="px-4 py-2 bg-neutral-200 hover:bg-neutral-300 text-neutral-700 rounded focus:outline-none focus:ring-2 focus:ring-neutral-500">
              Cancel
            </button>
            <button type="button"
                    (click)="confirm()"
                    class="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-primary-500">
              Confirm
            </button>
          </ng-container>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes modalOpen {
      from {
        opacity: 0;
        transform: scale(0.95);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    .animate-modal-open {
      animation: modalOpen 0.2s ease-out forwards;
    }
  `],
  imports: [NgClass, NgIf, NgTemplateOutlet]
})
export class ModalComponent implements OnInit, OnDestroy {
  @ViewChild('modalContent') modalContent!: ElementRef;
  @ContentChild('bodyTemplate') bodyTemplate?: TemplateRef<any>;
  @ContentChild('footerTemplate') footerTemplate?: TemplateRef<any>;

  @Input() title: string = 'Modal Title';
  @Input() isOpen: boolean = false;
  @Input() closeOnBackdrop: boolean = true;
  @Input() closeOnEscape: boolean = true;
  @Input() showCloseButton: boolean = true;
  @Input() showHeader: boolean = true;
  @Input() showFooter: boolean = true;
  @Input() showDefaultFooter: boolean = true;
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' | 'full' = 'md';
  @Input() headerClass: string = '';
  @Input() bodyClass: string = '';
  @Input() footerClass: string = '';
  @Input() footerAlign: 'left' | 'center' | 'right' = 'right';
  @Input() animation: boolean = true;

  @Output() modalClose = new EventEmitter<void>();
  @Output() modalConfirm = new EventEmitter<void>();

  private escapeListener: ((event: KeyboardEvent) => void) | null = null;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    // Add event listener for escape key
    if (this.closeOnEscape) {
      this.escapeListener = (event: KeyboardEvent) => {
        if (event.key === 'Escape' && this.isOpen) {
          this.close();
        }
      };
      document.addEventListener('keydown', this.escapeListener);
    }

    // Handle body scrolling
    this.updateBodyScroll();
  }

  ngOnDestroy(): void {
    // Remove event listener
    if (this.escapeListener) {
      document.removeEventListener('keydown', this.escapeListener);
    }

    // Restore body scrolling
    if (this.isOpen) {
      document.body.style.overflow = '';
    }
  }

  backdropClick(event: MouseEvent): void {
    if (this.closeOnBackdrop && event.target === event.currentTarget) {
      this.close();
    }
  }

  close(): void {
    this.isOpen = false;
    this.modalClose.emit();
    this.updateBodyScroll();
  }

  confirm(): void {
    this.modalConfirm.emit();
  }

  private updateBodyScroll(): void {
    // Prevent body scrolling when modal is open
    document.body.style.overflow = this.isOpen ? 'hidden' : '';
  }

  get sizeClass(): string {
    switch (this.size) {
      case 'sm': return 'max-w-sm w-full';
      case 'lg': return 'max-w-2xl w-full';
      case 'xl': return 'max-w-4xl w-full';
      case 'full': return 'max-w-full m-5 w-full';
      default: return 'max-w-lg w-full'; // md
    }
  }
}

// Modal Service for imperative opening
import { Injectable, ComponentRef, Injector, ApplicationRef, EmbeddedViewRef, ComponentFactoryResolver, Type } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalComponentRef: ComponentRef<ModalComponent> | null = null;

  constructor(
    private injector: Injector,
    private appRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  open(options: {
    title?: string;
    content?: string | Type<any>;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    showFooter?: boolean;
    showHeader?: boolean;
    closeOnBackdrop?: boolean;
    data?: any;
  }): ModalComponent {
    // Create modal component
    const factory = this.componentFactoryResolver.resolveComponentFactory(ModalComponent);
    this.modalComponentRef = factory.create(this.injector);

    // Set modal properties
    const modalComponent = this.modalComponentRef.instance;
    modalComponent.title = options.title || 'Modal';
    modalComponent.size = options.size || 'md';
    modalComponent.showFooter = options.showFooter !== undefined ? options.showFooter : true;
    modalComponent.showHeader = options.showHeader !== undefined ? options.showHeader : true;
    modalComponent.closeOnBackdrop = options.closeOnBackdrop !== undefined ? options.closeOnBackdrop : true;
    modalComponent.isOpen = true;

    // Listen for close events
    modalComponent.modalClose.subscribe(() => {
      this.close();
    });

    // Attach to DOM
    this.appRef.attachView(this.modalComponentRef.hostView);
    const domElem = (this.modalComponentRef.hostView as EmbeddedViewRef<any>).rootNodes[0];
    document.body.appendChild(domElem);

    // Handle content
    if (options.content) {
      if (typeof options.content === 'string') {
        // String content
        const contentElement = document.createElement('div');
        contentElement.innerHTML = options.content;
        modalComponent.modalContent.nativeElement.querySelector('.modal-body').appendChild(contentElement);
      } else {
        // Component content
        const contentFactory = this.componentFactoryResolver.resolveComponentFactory(options.content);
        const contentRef = contentFactory.create(this.injector);

        // Pass data to component
        if (options.data && contentRef.instance) {
          Object.assign(contentRef.instance, options.data);
        }

        this.appRef.attachView(contentRef.hostView);
        const contentElement = (contentRef.hostView as EmbeddedViewRef<any>).rootNodes[0];
        modalComponent.modalContent.nativeElement.querySelector('.modal-body').appendChild(contentElement);
      }
    }

    return modalComponent;
  }

  close(): void {
    if (this.modalComponentRef) {
      this.appRef.detachView(this.modalComponentRef.hostView);
      this.modalComponentRef.destroy();
      this.modalComponentRef = null;
    }
  }
}
