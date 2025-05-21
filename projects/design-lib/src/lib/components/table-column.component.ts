import {
  Component,
  Input,
  TemplateRef
} from '@angular/core';

// Column definition component
@Component({
  selector: 'ds-table-column',
  template: `<ng-content></ng-content>`,
  standalone: true
})
export class TableColumnComponent {
  @Input() field: string = '';
  @Input() header: string = '';
  @Input() sortable: boolean = false;
  @Input() filterable: boolean = false;
  @Input() width: string = '';
  @Input() cellClass: string = '';
  @Input() headerClass: string = '';
  @Input() align: 'left' | 'center' | 'right' = 'left';
  @Input() format?: (value: any, row: any) => string;

  // Custom templates for header and cell
  @Input() headerTemplate?: TemplateRef<any>;
  @Input() cellTemplate?: TemplateRef<any>;
}
