import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl,
} from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'ds-textarea',
  standalone: true,
  template: `
    <textarea
      #textareaEl
      [id]="id"
      [name]="name"
      [placeholder]="placeholder"
      [required]="required"
      [disabled]="disabled"
      [readonly]="readonly"
      [rows]="rows"
      [cols]="cols"
      [attr.maxlength]="maxLength"
      [attr.minlength]="minLength"
      [value]="value"
      [ngClass]="[
        'block w-full border rounded-md transition-colors outline-none resize-none',
        getSizeClasses(),
        getVariantClasses(),
        focused
          ? 'ring-2 ring-primary-200 border-primary-500'
          : 'border-neutral-300 hover:border-neutral-400',
        disabled ? 'bg-neutral-100 cursor-not-allowed opacity-60' : 'bg-white',
        fluid ? 'w-full' : '',
        className,
      ]"
      [style.resize]="autoResize ? 'none' : 'vertical'"
      (input)="onInputChange($event)"
      (blur)="onBlur()"
      (focus)="onFocus()"
      (keydown)="onKeyDown($event)"
    ></textarea>
  `,
  imports: [NgClass],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true,
    },
  ],
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class TextareaComponent
  implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy
{
  @ViewChild('textareaEl') textareaElement!: ElementRef<HTMLTextAreaElement>;

  @Input() id?: string;
  @Input() name?: string;
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() rows: number = 3;
  @Input() cols?: number;
  @Input() maxLength?: number;
  @Input() minLength?: number;
  @Input() autoResize: boolean = false;
  @Input() variant: 'outlined' | 'filled' = 'outlined';
  @Input() fluid: boolean = false;
  @Input() pSize: 'small' | 'large' | null = null;
  @Input() className: string = '';
  @Input() value: string = ''; // Add value as an input property

  @Output() onResize = new EventEmitter<Event>();

  // Internal state
  focused: boolean = false;
  private ngControl: NgControl | null = null;
  private resizeObserver?: ResizeObserver;
  private initialHeight?: number;

  constructor(private injector: Injector) {}

  ngOnInit() {
    this.ngControl = this.injector.get(NgControl, null);

    if (this.ngControl) {
      this.ngControl.valueAccessor = this;

      if (this.ngControl.control) {
        this.disabled = this.ngControl.control.disabled;
      }
    }

    // Generate a unique id if not provided
    if (!this.id) {
      this.id = `ds-textarea-${Math.random().toString(36).substring(2, 11)}`;
    }
  }

  ngAfterViewInit() {
    if (this.autoResize) {
      this.setupAutoResize();
      // Set initial height
      this.adjustHeight();
    }
  }

  ngOnDestroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  // ControlValueAccessor interface methods
  writeValue(value: any): void {
    this.value = value || '';
    if (this.textareaElement && this.autoResize) {
      // Delay to ensure DOM is updated
      setTimeout(() => this.adjustHeight(), 0);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // Event handlers
  onInputChange(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.value = target.value;
    this.onChange(this.value);

    if (this.autoResize) {
      this.adjustHeight();
    }
  }

  onBlur(): void {
    this.focused = false;
    this.onTouched();
  }

  onFocus(): void {
    this.focused = true;
  }

  onKeyDown(event: KeyboardEvent): void {
    // Handle any special key combinations if needed
    // For now, just let the default behavior happen
  }

  // Styling methods
  getSizeClasses(): string {
    switch (this.pSize) {
      case 'small':
        return 'px-2 py-1 text-sm';
      case 'large':
        return 'px-4 py-3 text-lg';
      default:
        return 'px-3 py-2 text-base'; // default size
    }
  }

  getVariantClasses(): string {
    switch (this.variant) {
      case 'filled':
        return 'bg-neutral-100 border-neutral-100 focus-within:bg-white focus-within:border-primary-500';
      case 'outlined':
      default:
        return 'bg-white border-neutral-300';
    }
  }

  // Public methods
  focus(): void {
    if (this.textareaElement) {
      this.textareaElement.nativeElement.focus();
    }
  }

  blur(): void {
    if (this.textareaElement) {
      this.textareaElement.nativeElement.blur();
    }
  }

  select(): void {
    if (this.textareaElement) {
      this.textareaElement.nativeElement.select();
    }
  }

  setSelectionRange(start: number, end: number): void {
    if (this.textareaElement) {
      this.textareaElement.nativeElement.setSelectionRange(start, end);
    }
  }

  // Auto-resize functionality
  private setupAutoResize(): void {
    if (!this.textareaElement) return;

    const textarea = this.textareaElement.nativeElement;

    // Store initial height
    this.initialHeight = textarea.scrollHeight;

    // Set up ResizeObserver to detect when textarea is resized
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          this.onResize.emit(new Event('resize'));
        }
      });
      this.resizeObserver.observe(textarea);
    }
  }

  private adjustHeight(): void {
    if (!this.textareaElement || !this.autoResize) return;

    const textarea = this.textareaElement.nativeElement;

    // Reset height to auto to get the correct scrollHeight
    textarea.style.height = 'auto';

    // Calculate the new height based on content
    const newHeight = Math.max(
      textarea.scrollHeight,
      this.initialHeight || textarea.scrollHeight,
    );

    // Set the new height
    textarea.style.height = `${newHeight}px`;

    // Emit resize event
    this.onResize.emit(new Event('resize'));
  }

  // Private callback functions
  private onChange: any = () => {};
  private onTouched: any = () => {};
}
