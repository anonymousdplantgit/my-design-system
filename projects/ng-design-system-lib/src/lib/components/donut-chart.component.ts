import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import * as d3 from 'd3';
import { NgForOf, NgIf } from '@angular/common';

export interface DonutChartData {
  label: string;
  value: number;
  color?: string;
}

export interface DonutChartConfig {
  width?: number;
  height?: number;
  innerRadius?: number;
  outerRadius?: number;
  cornerRadius?: number;
  padAngle?: number;
  animationDuration?: number;
}

export interface DonutChartSelection {
  data: DonutChartData;
  percentage: number;
}

@Component({
  selector: 'ds-donut-chart',
  template: `
    <div class="flex flex-col items-center p-4 md:p-8 rounded-3xl max-w-4xl">
      <!-- Chart Container -->
      <div
        class="relative inline-block"
        [class]="chartWrapperClass"
        [style.margin-bottom.px]="showLegend ? 24 : 0"
      >
        <svg #chartSvg [class]="svgClass"></svg>

        <!-- Center Display -->
        <div
          class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none flex items-center justify-center"
          [style.width.px]="centerSize"
          [style.height.px]="centerSize"
          *ngIf="showCenterDisplay"
        >
          <div class="center-content" [class.has-data]="centerData">
            <div
              class="font-semibold text-slate-800 mb-1.5 leading-tight break-words"
              [class]="centerLabelClass"
            >
              {{ centerData?.label || centerEmptyText }}
            </div>
            <div
              class="font-bold text-slate-900 mb-1 leading-none"
              [class]="centerValueClass"
            >
              {{ centerData?.value || centerEmptyValue }}
            </div>
            <div
              class="font-medium text-blue-500 mb-1.5"
              [class]="centerPercentageClass"
              *ngIf="centerData && showCenterPercentage"
            >
              {{ centerData.percentage }}%
            </div>
            <div
              class="text-xs text-slate-500 font-normal uppercase tracking-wider"
              [class]="centerSubtitleClass"
            >
              {{ centerData ? centerSelectedText : centerInstructionText }}
            </div>
          </div>
        </div>
      </div>

      <!-- Legend -->
      <div
        class="w-full"
        [style.max-width.px]="legendMaxWidth"
        *ngIf="showLegend"
      >
        <div class="grid gap-4" [class]="legendGridClass">
          <div
            *ngFor="let item of processedData"
            class="flex items-center cursor-pointer p-4 rounded-xl transition-all duration-200 ease-out border-2 border-transparent bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-slate-200"
            [class.legend-selected]="selectedData?.label === item.label"
            [class]="legendItemClass"
            (click)="toggleSelection(item)"
            (mouseenter)="onLegendHover ? showInCenter(item) : null"
            (mouseleave)="onLegendHover ? restoreCenter() : null"
          >
            <div class="mr-4" *ngIf="showLegendColors">
              <div
                class="rounded shadow-sm"
                [class]="legendColorClass"
                [style.background-color]="item.color"
              ></div>
            </div>

            <div class="flex flex-col flex-1">
              <span
                class="font-medium text-slate-700 mb-0.5"
                [class]="legendLabelClass"
              >
                {{ item.label }}
              </span>
              <div class="flex justify-between items-center">
                <span class="text-slate-500" [class]="legendValueClass">
                  {{ formatValue(item.value) }}
                </span>
                <span
                  class="text-slate-400 text-xs font-medium"
                  [class]="legendPercentageClass"
                  *ngIf="showLegendPercentages"
                >
                  {{ item.percentage }}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  imports: [NgIf, NgForOf],
  styles: [
    `
      .center-content {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .legend-selected {
        @apply border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg;
        box-shadow: 0 6px 24px rgba(59, 130, 246, 0.2);
      }

      .arc-path {
        cursor: pointer;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .arc-path:hover {
        filter: brightness(1.05);
      }

      .percentage-label {
        pointer-events: none;
        text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
        font-weight: 600;
      }

      .w-4-5 {
        width: 18px;
      }

      .h-4-5 {
        height: 18px;
      }

      @media (max-width: 640px) {
        .responsive-grid {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class DonutChartComponent implements OnInit, OnChanges {
  // Data Input
  @Input() data: DonutChartData[] = [];
  // Chart Configuration
  @Input() config: DonutChartConfig = {};
  // Display Options
  @Input() showLegend: boolean = true;
  @Input() showCenterDisplay: boolean = true;
  @Input() showPercentages: boolean = true;
  @Input() showCenterPercentage: boolean = true;
  @Input() showLegendPercentages: boolean = true;
  @Input() showLegendColors: boolean = true;
  // Interaction Options
  @Input() allowSelection: boolean = true;
  @Input() allowMultipleSelection: boolean = false;
  @Input() onHover: boolean = true;
  @Input() onLegendHover: boolean = true;
  @Input() autoSelectHighest: boolean = false;
  // Styling Options
  @Input() containerClass: string =
    'bg-gradient-to-br from-slate-50 to-slate-100 shadow-xl';
  @Input() chartWrapperClass: string = 'mb-6';
  @Input() svgClass: string = 'block drop-shadow-lg';
  @Input() legendGridClass: string =
    'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
  @Input() legendItemClass: string = '';
  @Input() legendColorClass: string = 'w-4-5 h-4-5';
  @Input() legendLabelClass: string = 'text-sm';
  @Input() legendValueClass: string = 'text-sm';
  @Input() legendPercentageClass: string = '';
  @Input() centerLabelClass: string = 'text-lg';
  @Input() centerValueClass: string = 'text-4xl';
  @Input() centerPercentageClass: string = 'text-xl';
  @Input() centerSubtitleClass: string = '';
  // Text Customization
  @Input() centerEmptyText: string = 'Select a part';
  @Input() centerEmptyValue: string = 'to view';
  @Input() centerSelectedText: string = 'of total';
  @Input() centerInstructionText: string = 'Hover or click';
  @Input() valueFormatter: ((value: number) => string) | null = null;
  // Sizing
  @Input() centerSize: number = 160;
  @Input() legendMaxWidth: number = 600;
  // Color Scheme
  @Input() colorScheme: string[] = [
    '#3b82f6',
    '#ef4444',
    '#10b981',
    '#f59e0b',
    '#8b5cf6',
    '#06b6d4',
    '#f97316',
    '#84cc16',
    '#ec4899',
    '#14b8a6',
    '#f97316',
    '#6366f1',
  ];
  // Events
  @Output() selectionChange = new EventEmitter<DonutChartSelection | null>();
  @Output() hover = new EventEmitter<DonutChartSelection | null>();
  @Output() segmentClick = new EventEmitter<DonutChartSelection>();
  // Internal properties
  selectedData: any = null;
  centerData: any = null;
  processedData: any[] = [];
  @ViewChild('chartSvg', { static: true }) private chartContainer!: ElementRef;
  private svg: any;
  private colors: any;

  // Default configuration
  private defaultConfig: DonutChartConfig = {
    width: 360,
    height: 360,
    innerRadius: 80,
    outerRadius: 140,
    cornerRadius: 4,
    padAngle: 0.02,
    animationDuration: 200,
  };

  ngOnInit() {
    this.initializeChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] || changes['config'] || changes['colorScheme']) {
      this.initializeChart();
    }
  }

  showInCenter(data: any) {
    this.centerData = data;
  }

  restoreCenter() {
    if (this.selectedData) {
      this.centerData = this.selectedData;
    } else {
      this.centerData = null;
    }
  }

  toggleSelection(data: any) {
    if (!this.allowSelection) return;

    if (this.allowMultipleSelection) {
      // Multiple selection logic would go here
      // For now, treating as single selection
    }

    // Single selection with toggle
    if (this.selectedData && this.selectedData.label === data.label) {
      this.selectedData = null;
      this.centerData = null;
      this.selectionChange.emit(null);
    } else {
      this.selectedData = data;
      this.centerData = this.selectedData;
      this.selectionChange.emit({
        data: this.selectedData,
        percentage: this.selectedData.percentage,
      });
    }

    this.updateSelection();
  }

  selectSegment(data: any) {
    this.selectedData = data;
    this.centerData = this.selectedData;
    this.updateSelection();
    this.selectionChange.emit({
      data: this.selectedData,
      percentage: this.selectedData.percentage,
    });
  }

  clearSelection() {
    this.selectedData = null;
    this.centerData = null;
    this.updateSelection();
    this.selectionChange.emit(null);
  }

  formatValue(value: number): string {
    if (this.valueFormatter) {
      return this.valueFormatter(value);
    }
    return value.toString();
  }

  // Public API methods
  getSelectedData(): DonutChartSelection | null {
    return this.selectedData
      ? {
          data: this.selectedData,
          percentage: this.selectedData.percentage,
        }
      : null;
  }

  getAllData(): DonutChartData[] {
    return this.processedData;
  }

  getTotalValue(): number {
    return this.processedData.reduce((sum, d) => sum + d.value, 0);
  }

  private initializeChart() {
    if (!this.data || this.data.length === 0) {
      return;
    }

    this.processData();
    this.createChart();

    if (this.autoSelectHighest) {
      const highest = this.processedData.reduce((max, item) =>
        item.value > max.value ? item : max,
      );
      this.selectSegment(highest);
    }
  }

  private processData() {
    const total = this.data.reduce((sum, d) => sum + d.value, 0);
    this.colors = d3.scaleOrdinal(this.colorScheme);

    this.processedData = this.data.map((d, i) => ({
      ...d,
      color: d.color || this.colors(i.toString()),
      percentage: Math.round((d.value / total) * 100),
    }));
  }

  private createChart() {
    const element = this.chartContainer.nativeElement;
    const finalConfig = { ...this.defaultConfig, ...this.config };

    // Clear existing chart
    d3.select(element).selectAll('*').remove();

    this.svg = d3
      .select(element)
      .attr('width', finalConfig.width!)
      .attr('height', finalConfig.height!);

    const g = this.svg
      .append('g')
      .attr(
        'transform',
        `translate(${finalConfig.width! / 2}, ${finalConfig.height! / 2})`,
      );

    const pie = d3
      .pie<any>()
      .value((d) => d.value)
      .sort(null)
      .padAngle(finalConfig.padAngle!);

    const arc = d3
      .arc<any>()
      .innerRadius(finalConfig.innerRadius!)
      .outerRadius(finalConfig.outerRadius!)
      .cornerRadius(finalConfig.cornerRadius!);

    const arcHover = d3
      .arc<any>()
      .innerRadius(finalConfig.innerRadius! - 3)
      .outerRadius(finalConfig.outerRadius! + 10)
      .cornerRadius(finalConfig.cornerRadius!);

    const pieData = pie(this.processedData);

    // Create arcs
    const arcs = g
      .selectAll('.arc')
      .data(pieData)
      .enter()
      .append('g')
      .attr('class', 'arc');

    // Add paths
    arcs
      .append('path')
      .attr('class', 'arc-path')
      .attr('d', arc)
      .attr('fill', (d: any) => d.data.color)
      .attr('stroke', (d: any) => d.data.color)
      .attr('stroke-width', 2)
      .on('mouseenter', (event: any, d: any) => {
        if (this.onHover) {
          d3.select(event.currentTarget)
            .transition()
            .duration(finalConfig.animationDuration!)
            .attr('d', arcHover);

          this.showInCenter(d.data);
          this.hover.emit({
            data: d.data,
            percentage: d.data.percentage,
          });
        }
      })
      .on('mouseleave', (event: any, d: any) => {
        if (this.onHover) {
          d3.select(event.currentTarget)
            .transition()
            .duration(finalConfig.animationDuration!)
            .attr('d', arc);

          this.restoreCenter();
          this.hover.emit(null);
        }
      })
      .on('click', (event: any, d: any) => {
        if (this.allowSelection) {
          this.toggleSelection(d.data);
        }
        this.segmentClick.emit({
          data: d.data,
          percentage: d.data.percentage,
        });
      });

    // Add percentage labels inside segments
    if (this.showPercentages) {
      arcs
        .append('text')
        .attr('class', 'percentage-label')
        .attr('transform', (d: any) => `translate(${arc.centroid(d)})`)
        .attr('dy', '0.35em')
        .attr('fill', 'white')
        .attr('font-size', '14px')
        .attr('text-anchor', 'middle')
        .style('pointer-events', 'none')
        .text((d: any) => `${d.data.percentage}%`)
        .style('opacity', 0)
        .transition()
        .duration(finalConfig.animationDuration! * 2)
        .style('opacity', 1);
    }
  }

  private updateSelection() {
    if (!this.svg) return;

    this.svg
      .selectAll('.arc-path')
      .attr('stroke-width', (d: any) =>
        this.selectedData && d.data.label === this.selectedData.label ? 4 : 2,
      );
  }
}
