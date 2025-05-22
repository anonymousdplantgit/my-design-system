import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
  ViewContainerRef,
} from '@angular/core';
import { TooltipComponent } from '../components/tooltip.component';

@Directive({
  selector: '[dsTooltip]',
  standalone: true,
})
export class TooltipDirective {
  @Input('dsTooltip') content: string = '';
  @Input('dsTooltipPosition') position: 'top' | 'bottom' | 'left' | 'right' =
    'top';
  @Input('dsTooltipVariant') variant: 'dark' | 'light' = 'dark';
  @Input('dsTooltipTrigger') trigger: 'hover' | 'click' | 'both' = 'hover';
  @Input('dsTooltipOffset') offset: number = 8;
  @Input('dsTooltipDelay') delay: number = 0;
  @Input('dsTooltipShowArrow') showArrow: boolean = true;
  @Input('dsTooltipMaxWidth') maxWidth: string = '200px';

  private tooltipRef: ComponentRef<TooltipComponent> | null = null;

  constructor(
    private vcr: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
    private renderer: Renderer2,
    private el: ElementRef,
  ) {}

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this.trigger === 'hover' || this.trigger === 'both') {
      this.show();
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (this.trigger === 'hover' || this.trigger === 'both') {
      this.hide();
    }
  }

  @HostListener('click')
  onClick(): void {
    if (this.trigger === 'click' || this.trigger === 'both') {
      if (this.tooltipRef) {
        this.hide();
      } else {
        this.show();
      }
    }
  }

  private show(): void {
    if (this.tooltipRef) return;

    // Create tooltip
    const factory = this.resolver.resolveComponentFactory(TooltipComponent);
    this.tooltipRef = this.vcr.createComponent(factory);

    // Set tooltip properties
    const instance = this.tooltipRef.instance;
    instance.content = this.content;
    instance.position = this.position;
    instance.variant = this.variant;
    instance.trigger = this.trigger;
    instance.offset = this.offset;
    instance.delay = this.delay;
    instance.showArrow = this.showArrow;
    instance.maxWidth = this.maxWidth;

    // Show tooltip
    instance.show();

    // Add document click listener to close tooltip
    if (this.trigger === 'click' || this.trigger === 'both') {
      setTimeout(() => {
        this.renderer.listen('document', 'click', (event: MouseEvent) => {
          if (
            !this.el.nativeElement.contains(event.target) &&
            this.tooltipRef
          ) {
            this.hide();
          }
        });
      });
    }
  }

  private hide(): void {
    if (this.tooltipRef) {
      this.tooltipRef.instance.hide();

      setTimeout(() => {
        if (this.tooltipRef) {
          this.vcr.remove(this.vcr.indexOf(this.tooltipRef.hostView));
          this.tooltipRef = null;
        }
      }, 150);
    }
  }
}
