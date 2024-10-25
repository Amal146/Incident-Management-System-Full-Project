import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { delay, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'ngx-earning-pie-chart',
  styleUrls: ['./earning-card-back.component.scss'],
  template: `
    <div echarts
         class="echart"
         [options]="options"
         (chartInit)="onChartInit($event)"
         (chartClick)="onChartClick($event)">
    </div>
  `,
})
export class EarningPieChartComponent implements AfterViewInit, OnDestroy, OnChanges {

  @Output() selectPie = new EventEmitter<{ value: number; name: string; color: string }>();
  @Input() values: { value: number; name: string; }[] = [];
  @Input() defaultSelectedApp: string = '';

  private alive = true;

  options: any = {};
  echartsInstance;

  constructor(private theme: NbThemeService, private cdr: ChangeDetectorRef) {}
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes.values || changes.defaultSelectedApp) {
      if (this.echartsInstance) {
        this.updateChart();
        this.selectDefaultPie();
      }
    }
  }
  

  onChartInit(ec) {
    this.echartsInstance = ec;
    this.updateChart();
    this.cdr.detectChanges();
  }

  onChartClick(event) {
    const pieData = {
      value: event.value,
      name: event.name,
      color: event.color,
    };

    this.emitSelectPie(pieData);
  }

  emitSelectPie(pieData: { value: number; name: string; color: any }) {
    this.selectPie.emit(pieData);
  }

  ngAfterViewInit() {
    this.theme.getJsTheme()
      .pipe(
        takeWhile(() => this.alive),
        delay(1),
      )
      .subscribe(config => {
        const variables = config.variables;
        this.options = this.getOptions(variables);
        this.cdr.detectChanges();
        this.updateChart();
        this.selectDefaultPie();
      });
  }

  updateChart() {
    if (this.echartsInstance && this.options) {
      this.echartsInstance.setOption(this.options, true);
    }
  }

  selectDefaultPie() {
    const defaultSelectedData =
      this.options.series[0].data.find((item) => item.name === this.defaultSelectedApp);

    if (defaultSelectedData) {
      const color = defaultSelectedData.itemStyle.normal.color;
      const pieData = {
        value: defaultSelectedData.value,
        name: defaultSelectedData.name,
        color,
      };

      this.emitSelectPie(pieData);
    } else {
      console.warn('Default selected app not found in the pie chart data.');
      if (this.options.series[0].data.length > 0) {
        const fallbackData = this.options.series[0].data[0];
        const fallbackColor = fallbackData.itemStyle.normal.color;
        const fallbackPieData = {
          value: fallbackData.value,
          name: fallbackData.name,
          color: fallbackColor,
        };
        this.emitSelectPie(fallbackPieData);
      }
    }
  }

  getOptions(variables) {
    const earningPie: any = variables.earningPie;

    if (!earningPie) {
      console.error('earningPie is not defined');
      return {};
    }

    const colors = ['#00d68f', '#ffaa00', '#ff3d71', '#3366ff', '#6610f2'];

    return {
      tooltip: {
        trigger: 'item',
        formatter: '{b}',
      },
      series: [
        {
          name: ' ',
          clockwise: true,
          hoverAnimation: true,
          type: 'pie',
          center:  ['50%', '50%'],
          radius:  ['50%','70%'],
          data: this.values.map((item, index) => {
            const randomIndex = Math.floor(Math.random() * colors.length);
            const color = colors[randomIndex];
            return {
              value: item.value,
              name: item.name,
              label: {
                normal: {
                  position: 'center',
                  formatter: ``,
                  textStyle: {
                    fontSize: '30pt',
                    lineHeight: '3pt',
                    fontFamily: variables.fontSecondary,
                    fontWeight: '600',
                    color: variables.fgHeading,
                  },
                },
              },
              tooltip: {
                show: true,
              },
              itemStyle: {
                normal: {
                  color: color,
                  shadowColor: 0,
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowOffsetY: 0,
                },
              },
            };
          }),
        },
      ],
    };
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
