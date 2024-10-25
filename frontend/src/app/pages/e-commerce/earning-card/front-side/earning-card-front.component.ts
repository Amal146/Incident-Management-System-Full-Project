import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { interval, Subscription } from 'rxjs';
import { switchMap, takeWhile } from 'rxjs/operators';
import { LiveUpdateChart, EarningData } from '../../../../@core/data/earning';
import { ApplicationService } from '../../../../service/application/application-service.service';
import { IncidentService } from '../../../../service/incident/incident-service.service';
import { Application } from '../../../../model/application';

interface IncidentLiveUpdateCardData {
  liveChart: number[];
  delta: {
    up: boolean;
    value: number;
  };
  dailyIncome: number;
}
@Component({
  selector: 'ngx-earning-card-front',
  styleUrls: ['./earning-card-front.component.scss'],
  templateUrl: './earning-card-front.component.html',
})
export class EarningCardFrontComponent implements OnDestroy, OnInit {
  private alive = true;

  @Input() selectedAppName: string = 'ModeShape';
  @Input() selectedApp: Application = { id: 23, name: this.selectedAppName, managerId: 114 };
  defaultselectedApp: Application = { id: 23, name: 'ModeShape', managerId: 114 };
  intervalSubscription: Subscription;

  apps: Application[] = [];

  currentTheme: string;

  incidentLiveUpdateCardData: IncidentLiveUpdateCardData = {
    liveChart: [],
    delta: { up: true, value: 0 },
    dailyIncome: 0,
  };

  liveUpdateChartData: number[] = [];

  constructor(private themeService: NbThemeService,
              private appService: ApplicationService,
              private incidentService: IncidentService,
              private cdr: ChangeDetectorRef) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.currentTheme = theme.name;
      });

    this.appService.getAppList().subscribe((res) => {
      this.apps = res;
      this.defaultselectedApp = res[0];
    });
  }

  ngOnInit() {
    this.selectedApp = { id: 23, name: 'ModeShape', managerId: 114 };

    this.appService.getAppList().subscribe((res) => {
        this.apps = res;

        if (this.apps.length > 0) {
            this.selectedApp = this.apps[0];  // Simplified logic for testing
            this.cdr.detectChanges();  // Force update
        }

        this.getIncidentCardData(this.selectedApp, false);
    });
}


compareFn(c1: Application, c2: Application): boolean {
  return c1 && c2 ? c1.id === c2.id : c1 === c2;
}

  changeApp(app: Application) {
    console.log('Changing app to:', app.name);
    if (this.selectedApp.id !== app.id) {
      this.selectedApp = app;
      this.selectedAppName = app.name;
      this.getIncidentCardData(app, true);
    }
  }

  private getIncidentCardData(app: Application, startLiveUpdates: boolean) {
    this.incidentService.getIncidentsByAppId(app.id)
      .pipe(takeWhile(() => this.alive))
      .subscribe((res) => {
        console.log('Incident Data for', app.name, res);
        const incidentLiveUpdateCardData: IncidentLiveUpdateCardData = {
          liveChart: new Array(365).fill(0),  // Pre-fill with 0s
          delta: { up: true, value: 0 },
          dailyIncome: 0
        };
  
        const incidentsByDay = new Map<string, number>();
  
        res.forEach(incident => {
          const date = new Date(incident.reportedAt);
          const dayOfYear = this.getDayOfYear(date); // Convert date to day of the year (1-365)
          incidentsByDay.set(dayOfYear.toString(), (incidentsByDay.get(dayOfYear.toString()) || 0) + 1);
        });
  
        incidentsByDay.forEach((value, key) => {
          incidentLiveUpdateCardData.liveChart[+key - 1] = value; // Fill the chart at the correct index
        });
  
        let previousDayIncome: number | null = null;
        let lastDayIncome: number | null = null;
  
        if (incidentLiveUpdateCardData.liveChart.length > 1) {
          previousDayIncome = incidentLiveUpdateCardData.liveChart[incidentLiveUpdateCardData.liveChart.length - 2];
          lastDayIncome = incidentLiveUpdateCardData.liveChart[incidentLiveUpdateCardData.liveChart.length - 1];
        }
  
        if (previousDayIncome !== null && lastDayIncome !== null) {
          const rateOfChange = lastDayIncome == 0 ? 0 :((lastDayIncome - previousDayIncome) / previousDayIncome) * 100;
          console.log(rateOfChange);
          incidentLiveUpdateCardData.delta.up = rateOfChange >= 0;
          incidentLiveUpdateCardData.delta.value = Math.floor(rateOfChange);
        }
  
        incidentLiveUpdateCardData.dailyIncome = res.length;
  
        this.incidentLiveUpdateCardData = incidentLiveUpdateCardData;
        console.log('Updated Incident Data:', this.incidentLiveUpdateCardData);
  
        if (startLiveUpdates) {
          this.startReceivingLiveData(app);  // Start live updates only after initial load
        }
      });
  }
  

  startReceivingLiveData(app: Application) {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe(); // Clear any existing intervals
    }

    // Set a longer interval or throttle/debounce the calls
    this.intervalSubscription = interval(10000000000) 
      .pipe(
        takeWhile(() => this.alive),
        switchMap(() => this.incidentService.getIncidentsByAppId(app.id)),
      )
      .subscribe((res) => {
        console.log('Live Data Update:', res);
        this.processLiveUpdateData(res); // Consider a separate method for processing live data
      });
  }

  private processLiveUpdateData(res: any) {
    const incidentsByDay = new Map<string, number>();
    res.forEach(incident => {
      const date = new Date(incident.reportedAt);
      const dayOfYear = this.getDayOfYear(date); // Convert date to day of the year (1-365)
      incidentsByDay.set(dayOfYear.toString(), (incidentsByDay.get(dayOfYear.toString()) || 0) + 1);
    });
  
    const liveChart = new Array(365).fill(0); // Pre-fill with 0s
  
    incidentsByDay.forEach((value, key) => {
      liveChart[+key - 1] = value; // Fill the chart at the correct index
    });
  
    this.incidentLiveUpdateCardData.liveChart = liveChart;
    this.liveUpdateChartData = liveChart;
  
    if (liveChart.length > 1) {
      const previousDayIncome = liveChart[liveChart.length - 2];
      const lastDayIncome = liveChart[liveChart.length - 1];
      const rateOfChange = ((lastDayIncome - previousDayIncome) / previousDayIncome) * 100;
      this.incidentLiveUpdateCardData.delta.up = rateOfChange > 0;
      this.incidentLiveUpdateCardData.delta.value = Math.abs(rateOfChange);
    }
  }
  private getDayOfYear(date: Date): number {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  }
  
  ngOnDestroy() {
    this.alive = false;
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }
}
