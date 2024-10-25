import { delay, takeWhile } from 'rxjs/operators';
import { AfterViewInit, Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { LayoutService } from '../../../../@core/utils/layout.service';
import { ApplicationService } from '../../../../service/application/application-service.service';
import { IncidentService } from '../../../../service/incident/incident-service.service';

@Component({
  selector: 'ngx-earning-live-update-chart',
  styleUrls: ['earning-card-front.component.scss'],
  template: `
    <div echarts
         [options]="options"
         class="echart"
         (chartInit)="onChartInit($event)">
    </div>
  `,
})
export class EarningLiveUpdateChartComponent implements AfterViewInit, OnDestroy {
  private alive = true;

  @Input() linesData: number[] = [];

  echartsInstance: any;
  options: any = {};

  constructor(private theme: NbThemeService,
              private layoutService: LayoutService) {
    this.layoutService.onSafeChangeLayoutSize()
      .pipe(
        takeWhile(() => this.alive),
      )
      .subscribe(() => this.resizeChart());
  }

  ngAfterViewInit() {
    this.theme.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(config => {
        const profitBarAnimationEchart: any = config.variables.profitBarAnimationEchart;

        this.setChartOption(profitBarAnimationEchart);
    });
  }

  setChartOption(chartVariables) {
    this.options = {
      color: [chartVariables.firstAnimationBarColor],
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line',
        },
      },
      xAxis: {
        type: 'category',
        name: 'Days of the Year 2013',
        data: Array.from({ length: 365 }, (_, index) => this.formatDate(index + 1)), 
        axisLabel: {
          rotate: 45, 
          interval: 30, 
        },
      },
      yAxis: {
        type: 'value',
        minInterval: 1,
        name: 'Number of Incidents', // Label for the Y-axis
      },
      series: [
        {
          name: 'Incidents',
          type: 'line',
          smooth: true,
          data: this.linesData,
          lineStyle: {
            color: '#3366ff', 
          },
        },
      ],
    };
    if (this.echartsInstance) {
      this.echartsInstance.setOption(this.options, true);
    }
  }

  ngOnChanges() {
    if (this.linesData && this.linesData.length > 0) {
      this.setChartOption(this.theme);
    }
  }
  private formatDate(dayOfYear: number): string {
    const date = new Date(Date.now()); // Create a date object with the current year
    date.setMonth(0, dayOfYear); // Set the month to January and the day to the given day of the year
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
  
  onChartInit(echarts) {
    this.echartsInstance = echarts;
  }

  resizeChart() {
    if (this.echartsInstance) {
      this.echartsInstance.resize();
    }
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
