import { Component, OnDestroy } from "@angular/core";
import { NbThemeService } from "@nebular/theme";
import { takeWhile } from "rxjs/operators";
import { IncidentService } from "../../../service/incident/incident-service.service";

interface IncidentStatus {
  Date: String;
  ReportedIncident: Number;
  CriticalDeltaup: Boolean;
  HighDeltaup: Boolean;
  LowDeltaup: Boolean;
  MediumDeltaup: Boolean;
  criticalPercentage: number;
  highPercentage: number;
  lowPercentage: number;
  mediumPercentage: number;
}

@Component({
  selector: "ngx-user-activity",
  styleUrls: ["./user-activity.component.scss"],
  templateUrl: "./user-activity.component.html",
})
export class ECommerceUserActivityComponent implements OnDestroy {
  private alive = true;
  loading = true ;
  type = "day";
  types = ["day", "month"];
  period: String = this.type;
  currentTheme: string;
  incidentActivity: IncidentStatus[] = [];
  months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  constructor(
    private incidentService: IncidentService,
    private themeService: NbThemeService
  ) {
    this.loadIncidentData();
  }

  loadIncidentData() {
    this.incidentService.getIncidentList().subscribe((res) => {
      this.incidentActivity = [];

      if (this.period === "month") {
        this.processMonthlyData(res);
      } else {
        this.processDailyData(res);
      }
    });

    this.themeService
      .getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe((theme) => {
        this.currentTheme = theme.name;
      });
  }

  processMonthlyData(res: any[]) {
    let previousMonthStats: IncidentStatus = null;

    for (let month = 0; month < 12; month++) {
      const incidentsInMonth = res.filter((incident) => {
        const reportedAtDate = new Date(incident.reportedAt);
        return reportedAtDate.getMonth() === month;
      });

      if (incidentsInMonth.length > 0) {
        const incidentStatus = this.calculateIncidentStatus(incidentsInMonth, this.months[month], previousMonthStats);
        this.incidentActivity.push(incidentStatus);
        previousMonthStats = incidentStatus;
      }
    }
    setTimeout(() => {
      this.loading = false;
    }, 7000);
  }

  processDailyData(res: any[]) {
    for (let month = 0; month < 12; month++) {
      let previousDayStats: IncidentStatus = null;

      for (let day = 1; day <= 31; day++) {
        const incidentsInDay = res.filter((incident) => {
          const reportedAtDate = new Date(incident.reportedAt);
          return reportedAtDate.getMonth() === month && reportedAtDate.getDate() === day;
        });

        if (incidentsInDay.length > 0) {
          const incidentStatus = this.calculateIncidentStatus(incidentsInDay, `${day} ${this.months[month]}`, previousDayStats);
          this.incidentActivity.push(incidentStatus);
          previousDayStats = incidentStatus;
        }
      }
    }
    setTimeout(() => {
      this.loading = false;
    }, 7000);
  }

  calculateIncidentStatus(incidents: any[], date: String, previousStats: IncidentStatus = null): IncidentStatus {
    const totalIncidents = incidents.length;
    const criticalIncidents = incidents.filter(incident => incident.severity === 'Critical').length;
    const highIncidents = incidents.filter(incident => incident.severity === 'High').length;
    const mediumIncidents = incidents.filter(incident => incident.severity === 'Medium').length;
    const lowIncidents = incidents.filter(incident => incident.severity === 'Low').length;

    const criticalPercentage = this.calculatePercentage(criticalIncidents, totalIncidents);
    const highPercentage = this.calculatePercentage(highIncidents, totalIncidents);
    const mediumPercentage = this.calculatePercentage(mediumIncidents, totalIncidents);
    const lowPercentage = this.calculatePercentage(lowIncidents, totalIncidents);

    return {
      Date: date,
      ReportedIncident: totalIncidents,
      criticalPercentage,
      highPercentage,
      mediumPercentage,
      lowPercentage,
      CriticalDeltaup: previousStats ? criticalPercentage >= previousStats.criticalPercentage : false,
      HighDeltaup: previousStats ? highPercentage >= previousStats.highPercentage : false,
      MediumDeltaup: previousStats ? mediumPercentage >= previousStats.mediumPercentage : false,
      LowDeltaup: previousStats ? lowPercentage >= previousStats.lowPercentage : false,
    };
  }

  calculatePercentage(part: number, total: number): number {
    return parseFloat(((part / total) * 100).toFixed(2));
  }

  getIncidentPeriod(period: String) {
    this.period = period;
    this.loadIncidentData();
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
