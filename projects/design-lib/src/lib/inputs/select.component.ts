import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  forwardRef,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  NgControl,
} from '@angular/forms';
import { NgClass, NgForOf, NgIf, NgTemplateOutlet } from '@angular/common';

export interface SelectOption {
  [key: string]: any;
}

export interface SelectChangeEvent {
  originalEvent: Event;
  value: any;
}

export interface SelectFilterEvent {
  originalEvent: Event;
  filter: any;
}

export interface SelectLazyLoadEvent {
  first: number;
  last: number;
}

export interface SelectFilterOptions {
  filter: (value?: any) => void;
  reset: () => void;
}

export interface OverlayOptions {
  [key: string]: any;
}

export interface ScrollerOptions {
  [key: string]: any;
}

@Component({
  selector: 'ds-select',
  standalone: true,
  template: `
    <div
      class="relative"
      [ngClass]="(styleClass || '').split(' ').filter(Boolean)"
      [style]="style"
      (click)="onContainerClick($event)"
    >
      <!-- Main select input -->
      <div
        #containerEl
        [ngClass]="
          [
            'flex items-center justify-between w-full border rounded-md transition-colors cursor-pointer',
            getSizeClasses(),
            getVariantClasses(),
            focused
              ? 'ring-2 ring-primary-200 border-primary-500'
              : 'border-neutral-300 hover:border-neutral-400',
            disabled
              ? 'bg-neutral-100 cursor-not-allowed opacity-60'
              : 'bg-white',
            fluid ? 'w-full' : '',
            styleClass || '',
          ]
            .filter(Boolean)
            .join(' ')
        "
        [attr.tabindex]="disabled ? -1 : tabindex || 0"
        [attr.aria-expanded]="overlayVisible"
        [attr.aria-haspopup]="true"
        [attr.role]="'combobox'"
        [attr.aria-label]="ariaLabel"
        [attr.aria-labelledby]="ariaLabelledBy"
        [attr.aria-describedby]="inputId + '_help'"
        [attr.aria-controls]="overlayVisible ? inputId + '_list' : null"
        [attr.id]="inputId"
        (focus)="onFocus_($event)"
        (blur)="onBlur_($event)"
        (keydown)="onKeyDown($event)"
      >
        <!-- Selected item display -->
        <div class="flex-1 min-w-0">
          <ng-container
            *ngIf="
              selectedItem && !isEmptySelection();
              else placeholderTemplate
            "
          >
            <ng-container
              *ngIf="selectedItemTemplate; else defaultSelectedTemplate"
            >
              <ng-container
                *ngTemplateOutlet="
                  selectedItemTemplate;
                  context: { $implicit: selectedItem }
                "
              ></ng-container>
            </ng-container>
            <ng-template #defaultSelectedTemplate>
              <span class="block truncate">{{
                getOptionLabel(selectedItem)
              }}</span>
            </ng-template>
          </ng-container>

          <ng-template #placeholderTemplate>
            <span class="block truncate text-neutral-500">{{
              placeholder || 'Select an option'
            }}</span>
          </ng-template>
        </div>

        <!-- Icons -->
        <div class="flex items-center ml-2 space-x-1">
          <!-- Clear button -->
          <button
            *ngIf="showClear && !isEmptySelection() && !disabled"
            type="button"
            class="flex items-center justify-center w-5 h-5 text-neutral-400 hover:text-neutral-600 focus:outline-none"
            (click)="clear($event)"
            [attr.aria-label]="'Clear selection'"
          >
            <ng-container *ngIf="clearIconTemplate; else defaultClearIcon">
              <ng-container
                *ngTemplateOutlet="clearIconTemplate"
              ></ng-container>
            </ng-container>
            <ng-template #defaultClearIcon>
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </ng-template>
          </button>

          <!-- Loading spinner -->
          <div *ngIf="loading" class="flex items-center justify-center w-5 h-5">
            <svg
              class="w-4 h-4 animate-spin text-neutral-400"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>

          <!-- Dropdown icon -->
          <div
            class="flex items-center justify-center w-5 h-5 text-neutral-400"
          >
            <ng-container
              *ngIf="dropdownIconTemplate; else defaultDropdownIcon"
            >
              <ng-container
                *ngTemplateOutlet="dropdownIconTemplate"
              ></ng-container>
            </ng-container>
            <ng-template #defaultDropdownIcon>
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </ng-template>
          </div>
        </div>
      </div>

      <!-- Overlay panel -->
      <div
        *ngIf="overlayVisible"
        #overlay
        [ngClass]="
          [
            'absolute z-50 mt-1 bg-white border border-neutral-200 rounded-md shadow-lg overflow-hidden',
            panelStyleClass || '',
          ]
            .filter(Boolean)
            .join(' ')
        "
        [style]="panelStyle"
        [style.max-height]="scrollHeight"
        [style.min-width.px]="containerEl?.offsetWidth || 200"
        [attr.id]="inputId + '_panel'"
        role="listbox"
        [attr.aria-label]="'Options'"
        (click)="$event.stopPropagation()"
      >
        <!-- Header template -->
        <div *ngIf="headerTemplate" class="border-b border-neutral-200">
          <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
        </div>

        <!-- Filter input -->
        <div *ngIf="filter" class="p-3 border-b border-neutral-200">
          <div class="relative">
            <ng-container *ngIf="filterTemplate; else defaultFilterTemplate">
              <ng-container
                *ngTemplateOutlet="
                  filterTemplate;
                  context: { options: filterOptions }
                "
              ></ng-container>
            </ng-container>
            <ng-template #defaultFilterTemplate>
              <div class="relative">
                <input
                  #filterInput
                  type="text"
                  class="w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-500"
                  [placeholder]="filterPlaceholder || 'Search...'"
                  [value]="filterValue || ''"
                  (input)="onFilterInputChange($event)"
                  [attr.maxlength]="maxlength"
                  [attr.aria-label]="ariaFilterLabel || 'Filter options'"
                />
                <div
                  class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                >
                  <ng-container
                    *ngIf="filterIconTemplate; else defaultFilterIcon"
                  >
                    <ng-container
                      *ngTemplateOutlet="filterIconTemplate"
                    ></ng-container>
                  </ng-container>
                  <ng-template #defaultFilterIcon>
                    <svg
                      class="w-4 h-4 text-neutral-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                  </ng-template>
                </div>
              </div>
            </ng-template>
          </div>
        </div>

        <!-- Options list -->
        <div class="overflow-auto" [style.max-height]="scrollHeight">
          <ng-container
            *ngIf="!loading && filteredOptions.length > 0; else emptyTemplate"
          >
            <ng-container *ngFor="let option of filteredOptions; let i = index">
              <!-- Group header -->
              <div
                *ngIf="group && isOptionGroup(option)"
                class="px-3 py-2 text-sm font-semibold text-neutral-600 bg-neutral-50"
              >
                <ng-container *ngIf="groupTemplate; else defaultGroupTemplate">
                  <ng-container
                    *ngTemplateOutlet="
                      groupTemplate;
                      context: { $implicit: option }
                    "
                  ></ng-container>
                </ng-container>
                <ng-template #defaultGroupTemplate>
                  {{ getOptionGroupLabel(option) }}
                </ng-template>
              </div>

              <!-- Group options -->
              <ng-container *ngIf="group && isOptionGroup(option)">
                <div
                  *ngFor="
                    let childOption of getOptionGroupChildren(option);
                    let j = index
                  "
                  class="px-3 py-2 cursor-pointer hover:bg-neutral-50 flex items-center justify-between"
                  [ngClass]="{
                    'bg-primary-50 text-primary-600': isSelected(childOption),
                    'opacity-50 cursor-not-allowed':
                      isOptionDisabled(childOption),
                  }"
                  (click)="
                    !isOptionDisabled(childOption) &&
                      onOptionSelect($event, childOption)
                  "
                  [attr.aria-selected]="isSelected(childOption)"
                  [attr.role]="'option'"
                >
                  <div class="flex-1">
                    <ng-container
                      *ngIf="itemTemplate; else defaultItemTemplate"
                    >
                      <ng-container
                        *ngTemplateOutlet="
                          itemTemplate;
                          context: { $implicit: childOption }
                        "
                      ></ng-container>
                    </ng-container>
                    <ng-template #defaultItemTemplate>
                      {{ getOptionLabel(childOption) }}
                    </ng-template>
                  </div>
                  <div
                    *ngIf="checkmark && isSelected(childOption)"
                    class="ml-2"
                  >
                    <svg
                      class="w-4 h-4 text-primary-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </div>
              </ng-container>

              <!-- Regular option -->
              <div
                *ngIf="!group || !isOptionGroup(option)"
                class="px-3 py-2 cursor-pointer hover:bg-neutral-50 flex items-center justify-between"
                [ngClass]="{
                  'bg-primary-50 text-primary-600': isSelected(option),
                  'opacity-50 cursor-not-allowed': isOptionDisabled(option),
                }"
                (click)="
                  !isOptionDisabled(option) && onOptionSelect($event, option)
                "
                [attr.aria-selected]="isSelected(option)"
                [attr.role]="'option'"
              >
                <div class="flex-1">
                  <ng-container *ngIf="itemTemplate; else defaultItemTemplate">
                    <ng-container
                      *ngTemplateOutlet="
                        itemTemplate;
                        context: { $implicit: option }
                      "
                    ></ng-container>
                  </ng-container>
                  <ng-template #defaultItemTemplate>
                    {{ getOptionLabel(option) }}
                  </ng-template>
                </div>
                <div *ngIf="checkmark && isSelected(option)" class="ml-2">
                  <svg
                    class="w-4 h-4 text-primary-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
            </ng-container>
          </ng-container>

          <!-- Empty state -->
          <ng-template #emptyTemplate>
            <div class="px-3 py-4 text-sm text-neutral-500 text-center">
              <ng-container *ngIf="loading; else noDataTemplate">
                <div class="flex items-center justify-center">
                  <svg
                    class="w-4 h-4 animate-spin mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Loading...
                </div>
              </ng-container>

              <ng-template #noDataTemplate>
                <ng-container
                  *ngIf="
                    filterValue && emptyFilterTemplate;
                    else regularEmptyTemplate
                  "
                >
                  <ng-container
                    *ngTemplateOutlet="emptyFilterTemplate"
                  ></ng-container>
                </ng-container>
                <ng-template #regularEmptyTemplate>
                  <ng-container *ngIf="emptyTemplate; else defaultEmptyMessage">
                    <ng-container
                      *ngTemplateOutlet="emptyTemplate"
                    ></ng-container>
                  </ng-container>
                  <ng-template #defaultEmptyMessage>
                    {{
                      filterValue
                        ? emptyFilterMessage || 'No results found'
                        : emptyMessage || 'No data available'
                    }}
                  </ng-template>
                </ng-template>
              </ng-template>
            </div>
          </ng-template>
        </div>

        <!-- Footer template -->
        <div *ngIf="footerTemplate" class="border-t border-neutral-200">
          <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
        </div>
      </div>
    </div>
  `,
  imports: [NgClass, NgForOf, NgIf, NgTemplateOutlet, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent
  implements ControlValueAccessor, OnInit, OnChanges, OnDestroy, AfterViewInit
{
  @ViewChild('container') containerEl!: ElementRef;
  @ViewChild('overlay') overlayEl!: ElementRef;
  @ViewChild('filterInput') filterInputEl!: ElementRef;

  // Content templates
  @ContentChild('item') itemTemplate?: TemplateRef<any>;
  @ContentChild('selectedItem') selectedItemTemplate?: TemplateRef<any>;
  @ContentChild('header') headerTemplate?: TemplateRef<any>;
  @ContentChild('footer') footerTemplate?: TemplateRef<any>;
  @ContentChild('filter') filterTemplate?: TemplateRef<any>;
  @ContentChild('empty') emptyTemplate?: TemplateRef<any>;
  @ContentChild('emptyfilter') emptyFilterTemplate?: TemplateRef<any>;
  @ContentChild('group') groupTemplate?: TemplateRef<any>;
  @ContentChild('loader') loaderTemplate?: TemplateRef<any>;
  @ContentChild('dropdownicon') dropdownIconTemplate?: TemplateRef<any>;
  @ContentChild('clearicon') clearIconTemplate?: TemplateRef<any>;
  @ContentChild('filtericon') filterIconTemplate?: TemplateRef<any>;

  // Properties from documentation
  @Input() id?: string;
  @Input() scrollHeight: string = '800px';
  @Input() filter: boolean = false;
  @Input() name?: string;
  @Input() style?: any;
  @Input() panelStyle?: any;
  @Input() styleClass?: string;
  @Input() panelStyleClass?: string;
  @Input() readonly: boolean = false;
  @Input() required: boolean = false;
  @Input() editable: boolean = false;
  @Input() appendTo?: any;
  @Input() tabindex?: number = 0;
  @Input() placeholder: string = 'Select an option';
  @Input() loadingIcon?: string;
  @Input() filterPlaceholder?: string;
  @Input() filterLocale?: string;
  @Input() variant: 'outlined' | 'filled' = 'outlined';
  @Input() inputId?: string;
  @Input() dataKey?: string;
  @Input() filterBy?: string;
  @Input() filterFields?: any[];
  @Input() autofocus: boolean = false;
  @Input() resetFilterOnHide: boolean = false;
  @Input() checkmark: boolean = false;
  @Input() dropdownIcon?: string;
  @Input() loading: boolean = false;
  @Input() optionLabel?: string = 'label';
  @Input() optionValue?: string = 'value';
  @Input() optionDisabled?: string = 'disabled';
  @Input() optionGroupLabel: string = 'label';
  @Input() optionGroupChildren: string = 'items';
  @Input() autoDisplayFirst: boolean = true;
  @Input() group: boolean = false;
  @Input() showClear: boolean = false;
  @Input() emptyFilterMessage?: string;
  @Input() emptyMessage?: string;
  @Input() lazy: boolean = false;
  @Input() virtualScroll: boolean = false;
  @Input() virtualScrollItemSize?: number;
  @Input() virtualScrollOptions?: ScrollerOptions;
  @Input() size?: 'small' | 'large';
  @Input() overlayOptions?: OverlayOptions;
  @Input() ariaFilterLabel?: string;
  @Input() ariaLabel?: string;
  @Input() ariaLabelledBy?: string;
  @Input() filterMatchMode:
    | 'gt'
    | 'lt'
    | 'in'
    | 'startsWith'
    | 'contains'
    | 'endsWith'
    | 'equals'
    | 'notEquals'
    | 'lte'
    | 'gte' = 'contains';
  @Input() maxlength?: number;
  @Input() tooltip?: string;
  @Input() tooltipPosition: 'right' | 'left' | 'top' | 'bottom' = 'right';
  @Input() tooltipPositionStyle: string = 'absolute';
  @Input() tooltipStyleClass?: string;
  @Input() focusOnHover: boolean = true;
  @Input() selectOnFocus: boolean = false;
  @Input() autoOptionFocus: boolean = false;
  @Input() autofocusFilter: boolean = true;
  @Input() fluid: boolean = false;
  @Input() disabled: boolean = false;
  @Input() itemSize?: number;
  @Input() autoZIndex?: boolean;
  @Input() baseZIndex?: number;
  @Input() showTransitionOptions?: string;
  @Input() hideTransitionOptions?: string;
  @Input() filterValue?: string;
  @Input() options: any[] = [];

  // Events
  @Output() onChange = new EventEmitter<SelectChangeEvent>();
  @Output() onFilter = new EventEmitter<SelectFilterEvent>();
  @Output() onFocus = new EventEmitter<Event>();
  @Output() onBlur = new EventEmitter<Event>();
  @Output() onClick = new EventEmitter<MouseEvent>();
  @Output() onShow = new EventEmitter<any>();
  @Output() onHide = new EventEmitter<any>();
  @Output() onClear = new EventEmitter<Event>();
  @Output() onLazyLoad = new EventEmitter<SelectLazyLoadEvent>();

  // Internal state
  value: any = null;
  selectedItem: any = null;
  overlayVisible: boolean = false;
  focused: boolean = false;
  filteredOptions: any[] = [];
  filterOptions: SelectFilterOptions;
  protected readonly Boolean = Boolean;
  private ngControl: NgControl | null = null;
  private clickOutsideListener?: (event: Event) => void;

  constructor(
    private injector: Injector,
    private cdr: ChangeDetectorRef,
    private el: ElementRef,
  ) {
    this.filterOptions = {
      filter: (value?: any) => this.filterOptionsArray(value),
      reset: () => this.resetFilter(),
    };
  }

  ngOnInit() {
    this.ngControl = this.injector.get(NgControl, null);
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }

    if (!this.inputId) {
      this.inputId = `ds-select-${Math.random().toString(36).substr(2, 9)}`;
    }

    this.updateFilteredOptions();
    this.updateSelectedItem();
  }

  ngOnChanges(changes: any) {
    if (changes.options) {
      this.updateFilteredOptions();
      this.updateSelectedItem();
    }
  }

  ngAfterViewInit() {
    if (this.autofocus) {
      this.focus();
    }
  }

  ngOnDestroy() {
    this.removeClickOutsideListener();
  }

  // ControlValueAccessor implementation
  writeValue(value: any): void {
    this.value = value;
    this.updateSelectedItem();
    this.cdr.markForCheck();
  }

  registerOnChange(fn: any): void {
    this.onChange_ = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched_ = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }

  // Public methods
  show(isFocus?: any): void {
    if (this.disabled || this.readonly) return;

    this.overlayVisible = true;
    this.cdr.detectChanges();
    this.onShow.emit();
    this.addClickOutsideListener();

    if (this.filter && this.autofocusFilter) {
      setTimeout(() => {
        if (this.filterInputEl) {
          this.filterInputEl.nativeElement.focus();
        }
      });
    }
  }

  hide(isFocus?: any): void {
    this.overlayVisible = false;
    this.cdr.detectChanges();
    this.onHide.emit();
    this.removeClickOutsideListener();

    if (this.resetFilterOnHide) {
      this.resetFilter();
    }
  }

  focus(): void {
    if (this.containerEl) {
      this.containerEl.nativeElement.focus();
    }
  }

  clear(event: Event): void {
    event.stopPropagation();
    this.value = null;
    this.selectedItem = null;
    this.onChange_(null);
    this.onClear.emit(event);
    this.cdr.markForCheck();
  }

  resetFilter(): void {
    this.filterValue = '';
    this.updateFilteredOptions();
    if (this.filterInputEl) {
      this.filterInputEl.nativeElement.value = '';
    }
  }

  // Event handlers
  onContainerClick(event: MouseEvent): void {
    if (this.disabled || this.readonly) return;

    event.preventDefault();
    event.stopPropagation();

    this.onClick.emit(event);

    if (!this.overlayVisible) {
      this.show();
    } else {
      this.hide();
    }
  }

  onOptionSelect(event: Event, option: any): void {
    console.log('onOptionSelect', option);
    if (this.isOptionDisabled(option)) return;
    console.log('isOptionDisabled', option);
    const optionValue = this.getOptionValue(option);
    this.value = optionValue;
    this.selectedItem = option;
    this.onChange_(optionValue);

    const changeEvent: SelectChangeEvent = {
      originalEvent: event,
      value: optionValue,
    };
    this.onChange.emit(changeEvent);

    // Close the dropdown and focus back to the container
    this.hide();
    setTimeout(() => {
      this.focus();
    }, 10);
  }

  onFocus_(event: Event): void {
    this.focused = true;
    this.onFocus.emit(event);
  }

  onBlur_(event: Event): void {
    this.focused = false;
    this.onTouched_();
    this.onBlur.emit(event);
  }

  onKeyDown(event: KeyboardEvent): void {
    switch (event.code) {
      case 'ArrowDown':
        event.preventDefault();
        if (!this.overlayVisible) {
          this.show();
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (this.overlayVisible) {
          this.hide();
        }
        break;
      case 'Space':
      case 'Enter':
        event.preventDefault();
        if (!this.overlayVisible) {
          this.show();
        }
        break;
      case 'Escape':
        if (this.overlayVisible) {
          this.hide();
          event.preventDefault();
        }
        break;
    }
  }

  onFilterInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    this.filterValue = value;
    this.filterOptionsArray(value);

    const filterEvent: SelectFilterEvent = {
      originalEvent: event,
      filter: value,
    };
    this.onFilter.emit(filterEvent);
  }

  // Utility methods
  getOptionLabel(option: any): string {
    if (!option) return '';
    return this.optionLabel
      ? this.getNestedProperty(option, this.optionLabel)
      : option.toString();
  }

  getOptionValue(option: any): any {
    return this.optionValue
      ? this.getNestedProperty(option, this.optionValue)
      : option;
  }

  isOptionDisabled(option: any): boolean {
    return this.optionDisabled
      ? this.getNestedProperty(option, this.optionDisabled)
      : false;
  }

  isOptionGroup(option: any): boolean {
    return this.group && option && option[this.optionGroupChildren];
  }

  getOptionGroupLabel(option: any): string {
    return this.getNestedProperty(option, this.optionGroupLabel);
  }

  getOptionGroupChildren(option: any): any[] {
    return this.getNestedProperty(option, this.optionGroupChildren) || [];
  }

  isSelected(option: any): boolean {
    return this.isOptionValueEqual(this.getOptionValue(option), this.value);
  }

  isEmptySelection(): boolean {
    return (
      this.value === null ||
      this.value === undefined ||
      (Array.isArray(this.value) && this.value.length === 0) ||
      (typeof this.value === 'string' && this.value.trim() === '')
    );
  }

  getSizeClasses(): string {
    switch (this.size) {
      case 'small':
        return 'px-2 py-1 text-sm';
      case 'large':
        return 'px-4 py-3 text-lg';
      default:
        return 'px-3 py-2'; // default size
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

  // Helper methods
  private updateSelectedItem(): void {
    if (this.value != null) {
      this.selectedItem = this.findOptionByValue(this.value);
    } else {
      this.selectedItem = null;
    }
  }

  private findOptionByValue(value: any): any {
    if (!this.options || !Array.isArray(this.options)) return null;

    for (let option of this.options) {
      if (this.group && this.isOptionGroup(option)) {
        const children = this.getOptionGroupChildren(option);
        for (let child of children) {
          if (this.isOptionValueEqual(this.getOptionValue(child), value)) {
            return child;
          }
        }
      } else {
        if (this.isOptionValueEqual(this.getOptionValue(option), value)) {
          return option;
        }
      }
    }
    return null;
  }

  private isOptionValueEqual(optionValue: any, value: any): boolean {
    return (
      optionValue === value ||
      (optionValue != null &&
        value != null &&
        optionValue.toString() === value.toString())
    );
  }

  private updateFilteredOptions(): void {
    if (this.options && Array.isArray(this.options)) {
      this.filteredOptions = [...this.options];
    } else {
      this.filteredOptions = [];
    }
  }

  private filterOptionsArray(value?: string): void {
    if (!this.options || !Array.isArray(this.options)) {
      this.filteredOptions = [];
      return;
    }

    if (!value) {
      this.filteredOptions = [...this.options];
      return;
    }

    const filterValue = value.toLowerCase();
    this.filteredOptions = this.options.filter((option) => {
      if (this.group && this.isOptionGroup(option)) {
        const children = this.getOptionGroupChildren(option);
        const filteredChildren = children.filter((child) =>
          this.matchesFilter(child, filterValue),
        );
        return filteredChildren.length > 0;
      } else {
        return this.matchesFilter(option, filterValue);
      }
    });
  }

  private matchesFilter(option: any, filterValue: string): boolean {
    const fieldsToSearch = this.filterFields || [this.optionLabel];

    return fieldsToSearch.some((field) => {
      const fieldValue = this.getNestedProperty(option, field)
        ?.toString()
        ?.toLowerCase();
      if (!fieldValue) return false;

      switch (this.filterMatchMode) {
        case 'startsWith':
          return fieldValue.startsWith(filterValue);
        case 'endsWith':
          return fieldValue.endsWith(filterValue);
        case 'equals':
          return fieldValue === filterValue;
        case 'notEquals':
          return fieldValue !== filterValue;
        case 'contains':
        default:
          return fieldValue.includes(filterValue);
      }
    });
  }

  private getNestedProperty(obj: any, path: string): any {
    return path.split('.').reduce((o, p) => o && o[p], obj);
  }

  private addClickOutsideListener(): void {
    if (!this.clickOutsideListener) {
      this.clickOutsideListener = (event: Event) => {
        const target = event.target as HTMLElement;
        if (!this.el.nativeElement.contains(target)) {
          this.hide();
          this.cdr.detectChanges();
        }
      };
      document.addEventListener('click', this.clickOutsideListener, true);
    }
  }

  private removeClickOutsideListener(): void {
    if (this.clickOutsideListener) {
      document.removeEventListener('click', this.clickOutsideListener, true);
      this.clickOutsideListener = undefined;
    }
  }

  // ControlValueAccessor callback functions
  private onChange_ = (value: any) => {};

  private onTouched_ = () => {};
}
