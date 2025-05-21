import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
} from '@angular/core';
import { NgClass, NgForOf, NgIf } from '@angular/common';

// Tab component
@Component({
  selector: 'ds-tab',
  standalone: true,
  template: `
    <div [class.hidden]="!active" class="p-4">
      <ng-content></ng-content>
    </div>
  `,
  imports: [],
})
export class TabComponent {
  @Input() title: string = '';
  @Input() id?: string;
  @Input() disabled: boolean = false;
  @Input() active: boolean = false;
  @Input() iconLeft?: string;
}

// Tabs container component
@Component({
  selector: 'ds-tabs',
  template: `
    <div class="w-full">
      <!-- Tab headers -->
      <div
        [ngClass]="[
          'flex border-b',
          variant === 'pills'
            ? 'border-transparent mb-2'
            : 'border-neutral-200',
          fullWidth ? 'w-full' : '',
          'mb-4',
        ]"
      >
        <ng-container *ngFor="let tab of tabs; let i = index">
          <button
            [id]="tab.id || 'tab-' + i"
            [ngClass]="getTabClasses(tab)"
            (click)="selectTab(tab)"
            [disabled]="tab.disabled"
            role="tab"
            [attr.aria-selected]="tab.active"
            [attr.aria-controls]="'tabpanel-' + (tab.id || i)"
          >
            <span *ngIf="tab.iconLeft" class="mr-2">
              <!-- Integration point for icon library -->
              <i [class]="tab.iconLeft"></i>
            </span>
            {{ tab.title }}
          </button>
        </ng-container>
      </div>

      <!-- Tab content -->
      <div class="tab-content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  imports: [NgClass, NgForOf, NgIf],
})
export class TabsComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabs!: QueryList<TabComponent>;

  @Input() variant: 'tabs' | 'pills' | 'underline' = 'tabs';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() fullWidth: boolean = false;
  @Input() justified: boolean = false;

  @Output() tabChange = new EventEmitter<TabComponent>();

  ngAfterContentInit() {
    // Set the first tab as active if no active tab is set
    const activeTabs = this.tabs.filter((tab) => tab.active);

    if (activeTabs.length === 0 && this.tabs.first) {
      setTimeout(() => {
        this.selectTab(this.tabs.first);
      });
    }
  }

  selectTab(tab: TabComponent) {
    if (tab.disabled) return;

    // Deactivate all tabs
    this.tabs.forEach((t) => (t.active = false));

    // Activate the selected tab
    tab.active = true;

    // Emit the change event
    this.tabChange.emit(tab);
  }

  getTabClasses(tab: TabComponent): string {
    let classes = '';

    // Add size classes
    classes += ' ' + this.getSizeClasses();

    // Add fullWidth and justified classes
    if (this.fullWidth) {
      classes += this.justified ? ' flex-1 text-center' : ' flex-grow';
    }

    // Add variant specific classes
    switch (this.variant) {
      case 'pills':
        classes += ' rounded-md mr-2 font-medium ';
        classes += tab.active
          ? 'bg-primary-500 text-white'
          : 'bg-white text-neutral-600 hover:bg-neutral-100';
        break;

      case 'underline':
        classes += ' py-3 px-4 font-medium border-b-2 -mb-px ';
        classes += tab.active
          ? 'border-primary-500 text-primary-600'
          : 'border-transparent text-neutral-600 hover:text-neutral-800 hover:border-neutral-300';
        break;

      default: // tabs
        classes += ' py-2 px-4 font-medium border-b-2 -mb-px ';
        classes += tab.active
          ? 'border-primary-500 text-primary-600'
          : 'border-transparent text-neutral-600 hover:text-neutral-800 hover:border-neutral-300';
        break;
    }

    // Add disabled classes
    if (tab.disabled) {
      classes += ' opacity-50 cursor-not-allowed';
    }

    return classes;
  }

  getSizeClasses(): string {
    switch (this.size) {
      case 'sm':
        return 'text-sm px-2 py-1';
      case 'lg':
        return 'text-lg px-5 py-3';
      default:
        return 'text-base px-4 py-2'; // md
    }
  }
}
