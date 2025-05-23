import { Component, Input, OnInit } from '@angular/core';
import { DonutChartComponent, DonutChartSelection } from 'ng-design-system-lib';

interface ChartData {
  label: string;
  value: number;
  color?: string;
}

@Component({
  selector: 'app-donut-chart',
  template: `
    <ds-donut-chart
      [data]="data"
      [config]="{ width: 500, innerRadius: 90 }"
      [showLegend]="true"
      [centerSize]="250"
      [allowSelection]="true"
      [autoSelectHighest]="true"
      centerEmptyText="Choose category"
      (selectionChange)="onSelectionChange($event)"
    >
    </ds-donut-chart>
  `,

  imports: [DonutChartComponent],
})
export class DonutShowcaseComponent implements OnInit {
  @Input() data: ChartData[] = [
    { label: 'Product A', value: 87 },
    { label: 'Product B', value: 45 },
    { label: 'Product C', value: 20 },
    { label: 'Product D', value: 15 },
    { label: 'Product E', value: 25 },
  ];

  ngOnInit(): void {}

  onSelectionChange($event: DonutChartSelection | null) {}
}
