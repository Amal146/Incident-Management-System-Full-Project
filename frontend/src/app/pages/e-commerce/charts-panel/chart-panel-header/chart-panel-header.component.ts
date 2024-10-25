import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { NbMediaBreakpoint, NbMediaBreakpointsService, NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'ngx-chart-panel-header',
  styleUrls: ['./chart-panel-header.component.scss'],
  templateUrl: './chart-panel-header.component.html',
})
export class ChartPanelHeaderComponent implements OnDestroy, OnChanges {
  private alive = true;

  @Output() periodChange = new EventEmitter<string>();
  @Input() type: string = 'week';
  @Input() context: string = 'severity'; // 'severity' or 'type'

  types: string[] = ['day', 'week', 'month'];
  legendItems: { iconColor: string; title: string }[];
  breakpoint: NbMediaBreakpoint = { name: '', width: 0 };
  breakpoints: any;
  currentTheme: string;
  orderProfitLegend: any;

  constructor(private themeService: NbThemeService,
              private breakpointService: NbMediaBreakpointsService,
              private cdr: ChangeDetectorRef) {

    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.orderProfitLegend = theme.variables.orderProfitLegend;
        this.currentTheme = theme.name;

        this.setLegendItems();
      });

    this.breakpoints = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(takeWhile(() => this.alive))
      .subscribe(([oldValue, newValue]) => {
        this.breakpoint = newValue;
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.context && !changes.context.isFirstChange()) {
      console.log('Context changed:', this.context);  // Log the context change
      this.setLegendItems();
      this.cdr.detectChanges(); // Force change detection
    }
  }

  setLegendItems() {
    if (this.context === 'severity') {
      this.legendItems = [
        {
          iconColor: this.orderProfitLegend.firstItem,
          title: 'Critical/High',
        },
        {
          iconColor: this.orderProfitLegend.secondItem,
          title: 'Medium',
        },
        {
          iconColor: this.orderProfitLegend.thirdItem,
          title: 'Low',
        },
      ];
    } else if (this.context === 'type') {
      this.legendItems = [
        {
          iconColor: this.orderProfitLegend.firstItem,
          title: 'Bug',
        },
        {
          iconColor: this.orderProfitLegend.secondItem,
          title: 'Failure',
        },
        {
          iconColor: this.orderProfitLegend.thirdItem,
          title: 'Other',
        },
      ];
    }
  }

  changePeriod(period: string): void {
    this.type = period;
    this.periodChange.emit(period);
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
