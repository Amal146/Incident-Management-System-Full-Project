import { Component, OnDestroy, ViewChild } from "@angular/core";
import { takeWhile } from "rxjs/operators";
import { OrdersChartComponent } from "./charts/orders-chart.component";
import { ProfitChartComponent } from "./charts/profit-chart.component";
import { OrdersChart } from "../../../@core/data/orders-chart";
import { ProfitChart } from "../../../@core/data/profit-chart";
import { OrderProfitChartSummary, OrdersProfitChartData } from "../../../@core/data/orders-profit-chart";
import { IncidentService } from "../../../service/incident/incident-service.service";

@Component({
  selector: "ngx-ecommerce-charts",
  styleUrls: ["./charts-panel.component.scss"],
  templateUrl: "./charts-panel.component.html",
})
export class ECommerceChartsPanelComponent implements OnDestroy {
  private alive = true;

  chartPanelSummary: OrderProfitChartSummary[] = [];
  period: string = "month";
  ordersChartData: OrdersChart;
  profitChartData: ProfitChart;

  // To dynamically change the context
  context: string = 'severity'; 
  
  @ViewChild("ordersChart", { static: true }) ordersChart: OrdersChartComponent;
  @ViewChild("profitChart", { static: true }) profitChart: ProfitChartComponent;
  loading = true;

  constructor(
    private ordersProfitChartService: OrdersProfitChartData,
    private incidentService: IncidentService
  ) {
    this.ordersProfitChartService
      .getOrderProfitChartSummary()
      .pipe(takeWhile(() => this.alive))
      .subscribe((summary) => {
        this.incidentService.getIncidentList().subscribe((res) => {
          let totalIncident: OrderProfitChartSummary = {
            title: "Total Incidents",
            value: res.length,
          };
          this.chartPanelSummary.push(totalIncident);
        });
        this.incidentService.getIncidentList().subscribe((res) => {
          let highSeverity: OrderProfitChartSummary = {
            title: "High-Severity",
            value: res.filter(
              (incident) =>
                incident.severity === "High" || incident.severity === "Critical"
            ).length,
          };
          this.chartPanelSummary.push(highSeverity);
        });
        this.incidentService.getIncidentList().subscribe((res) => {
          let mediumSeverity: OrderProfitChartSummary = {
            title: "Medium-Severity",
            value: res.filter((incident) => incident.severity === "Medium")
              .length,
          };
          this.chartPanelSummary.push(mediumSeverity);
        });
        this.incidentService.getIncidentList().subscribe((res) => {
          let lowSeverity: OrderProfitChartSummary = {
            title: "Low-Severity",
            value: res.filter((incident) => incident.severity === "Low").length,
          };
          this.chartPanelSummary.push(lowSeverity);
        });

        console.log(this.chartPanelSummary);
      });

    this.getOrdersChartData(this.period);
    this.getProfitChartData(this.period);
    setTimeout(() => {
      this.loading = false;
    }, 4000);
  }

  setPeriodAndGetChartData(value: string): void {
    if (this.period !== value) {
      this.period = value;
    }

    this.getOrdersChartData(value);
    this.getProfitChartData(value);
  }

  changeTab(selectedTab) {
    console.log('Tab changed to:', selectedTab.tabTitle);  // Log tab change
  
    if (selectedTab.tabTitle === "Type Analysis") {
      this.context = 'type';
      console.log('Context set to:', this.context);  // Log the context change
      this.profitChart.resizeChart();
    } else {
      this.context = 'severity';
      console.log('Context set to:', this.context);  // Log the context change
      this.ordersChart.resizeChart();
    }
  }
  

  getOrdersChartData(period: string) {
    this.ordersProfitChartService
      .getOrdersChartData(period)
      .pipe(takeWhile(() => this.alive))
      .subscribe((ordersChartData) => {
        this.ordersChartData = ordersChartData;
      });
  }

  getProfitChartData(period: string) {
    this.ordersProfitChartService
      .getProfitChartData(period)
      .pipe(takeWhile(() => this.alive))
      .subscribe((profitChartData) => {
        this.profitChartData = profitChartData;
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
