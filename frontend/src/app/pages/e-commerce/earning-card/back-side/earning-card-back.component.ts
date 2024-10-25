import { ChangeDetectorRef, Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { PieChart, EarningData } from '../../../../@core/data/earning';
import { takeWhile } from 'rxjs/operators';
import { IncidentService } from '../../../../service/incident/incident-service.service';
import { ApplicationService } from '../../../../service/application/application-service.service';
import { Incident } from '../../../../model/incident';
import { forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'ngx-earning-card-back',
  styleUrls: ['./earning-card-back.component.scss'],
  templateUrl: './earning-card-back.component.html',
})
export class EarningCardBackComponent implements OnDestroy {
  private alive = true;
  earningPieChartData: PieChart[] = [];
  name: string = '';
  color: string = '';
  value: number = 0;
  defaultSelectedApp: string = '';

  constructor(
    private incidentService: IncidentService,
    private appService: ApplicationService,
    private cdr: ChangeDetectorRef) {
    this.loadAppData();
  }


  private loadAppData() {
    let earningPieChartData: PieChart[] = [];
  
    this.incidentService.getIncidentList()
      .pipe( 
        takeWhile(() => this.alive),
        switchMap((incidents) => {
          const totalInc = incidents.length;
  
          if (totalInc === 0) {
            return [];
          }
  
          return this.appService.getAppList().pipe(
            switchMap((apps) => {
              const appDataObservables = apps.map((app) =>
                this.incidentService.getIncidentsByAppId(app.id).pipe(
                  map((appIncidents) => ({
                    name: app.name,
                    value: Math.round((appIncidents.length / totalInc) * 100)
                  }))
                )
              );
  
              return forkJoin(appDataObservables);
            })
          );
        })
      ).subscribe((appDataArray) => {
        let totValue = 0;
  
        appDataArray.forEach((appData) => {
          if (appData.value > 0) {
            totValue += appData.value;
            earningPieChartData.push(appData);
          }
        });
  
        if (totValue < 100) {
          earningPieChartData.push({
            value: 100 - totValue,
            name: "Other Apps"
          });
        }
  
        this.earningPieChartData = earningPieChartData;
        this.cdr.detectChanges(); // Ensure change detection is triggered
  
        console.log('Updated Pie Chart Data:', this.earningPieChartData);
      });
  }
  

  changeChartInfo(pieData: { value: number; name: string; color: any }) {
    if (pieData) {
      this.value = pieData.value ?? 0;
      this.name = pieData.name ?? '';
      this.color = pieData.color ?? '';
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }
}