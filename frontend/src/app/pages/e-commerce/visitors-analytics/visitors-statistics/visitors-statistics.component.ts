import { AfterViewInit, Component, Input, OnDestroy } from "@angular/core";
import { NbThemeService } from "@nebular/theme";
import { delay, takeWhile } from "rxjs/operators";
import { LayoutService } from "../../../../@core/utils/layout.service";
import { IncidentService } from "../../../../service/incident/incident-service.service";
import { Incident } from "../../../../model/incident";

@Component({
  selector: "ngx-visitors-statistics",
  styleUrls: ["./visitors-statistics.component.scss"],
  templateUrl: "./visitors-statistics.component.html",
})
export class ECommerceVisitorsStatisticsComponent
  implements AfterViewInit, OnDestroy
{
  private alive = true;

  @Input() value: number;

  option: any = {};
  chartLegend: { iconColor: string; title: string }[];
  echartsIntance: any;
  incidents: Incident[];
  totalInci = "";
  resolvedInci: Incident[];
  pendingInci: Incident[];
  resolvedPercent = 0;
  pendingPercent = 0;

  constructor(
    private incidentsService: IncidentService,
    private theme: NbThemeService,
    private layoutService: LayoutService
  ) {
    this.getIncidentsList();
    this.layoutService
      .onSafeChangeLayoutSize()
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => this.resizeChart());
  }

  getIncidentsList() {
    this.incidentsService.getIncidentList().subscribe((res) => {
      this.incidents = res;
      this.totalInci = res.length.toString();
      this.resolvedInci = res.filter(
        (incident) => incident.status === "Resolved"
      );
      this.resolvedPercent = (this.resolvedInci.length / res.length) * 100;
      console.log(this.resolvedPercent);
      this.pendingInci = res.filter(
        (incident) => incident.status !== "Resolved"
      );
      this.pendingPercent = (this.pendingInci.length / res.length) * 100;
      console.log(this.pendingPercent);
    });
  }
  
  setOptions(variables) {
    this.incidentsService.getIncidentList().subscribe((res) => {
      this.incidents = res;
      this.totalInci = res.length.toString();
      this.resolvedInci = res.filter(
        (incident) => incident.status === "Resolved"
      );
      this.resolvedPercent = (this.resolvedInci.length / res.length) * 100;
      this.pendingInci = res.filter(
        (incident) => incident.status !== "Resolved"
      );
      this.pendingPercent = (this.pendingInci.length / res.length) * 100;
      const visitorsPie: any = variables.visitorsPie;

    console.log("Resolved Percent:", this.resolvedPercent);
    console.log("Pending Percent:", this.pendingPercent);

    this.option = {
      tooltip: {
        trigger: "item",
        formatter: "",
      },
      series: [
        {
          name: " ",
          clockWise: true,
          hoverAnimation: false,
          type: "pie",
          center: ["50%", "50%"],
          radius: visitorsPie.firstPieRadius,
          data: [
            {
              value: 100,
              name: " ",
              label: {
                normal: {
                  position: "center",
                  formatter: "",
                  textStyle: {
                    fontSize: "22",
                    fontFamily: variables.fontSecondary,
                    fontWeight: "600",
                    color: variables.fgHeading,
                  },
                },
              },
              tooltip: {
                show: false,
              },
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: visitorsPie.firstPieGradientLeft,
                    },
                    {
                      offset: 1,
                      color: visitorsPie.firstPieGradientRight,
                    },
                  ]),
                  shadowColor: visitorsPie.firstPieShadowColor,
                  shadowBlur: 0,
                  shadowOffsetX: 0,
                  shadowOffsetY: 3,
                },
              },
              hoverAnimation: false,
            },
            {
              value: 0,
              name: " ",
              tooltip: {
                show: false,
              },
              label: {
                normal: {
                  position: "inner",
                },
              },
              itemStyle: {
                normal: {
                  color: variables.layoutBg,
                },
              },
            },
          ],
        },
        {
          name: " ",
          clockWise: true,
          hoverAnimation: false,
          type: "pie",
          center: ["50%", "50%"],
          radius: visitorsPie.secondPieRadius,
          data: [
            {
              value: 100 - Math.round(this.resolvedPercent),
              name: " ",
              label: {
                normal: {
                  position: "center",
                  formatter: "",
                  textStyle: {
                    fontSize: "22",
                    fontFamily: variables.fontSecondary,
                    fontWeight: "600",
                    color: variables.fgHeading,
                  },
                },
              },
              tooltip: {
                show: false,
              },
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1),
                },
              },
              hoverAnimation: false,
            },
            {
              value: Math.round(this.resolvedPercent),
              name: " ",
              tooltip: {
                show: false,
              },
              label: {
                normal: {
                  position: "inner",
                },
              },
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: visitorsPie.secondPieGradientLeft,
                    },
                    {
                      offset: 1,
                      color: visitorsPie.secondPieGradientRight,
                    },
                  ]),
                  shadowColor: visitorsPie.secondPieShadowColor,
                  shadowBlur: 0,
                  shadowOffsetX: visitorsPie.shadowOffsetX,
                  shadowOffsetY: visitorsPie.shadowOffsetY,
                },
              },
            },
          ],
        },
      ],
    };

    });
  }

  ngAfterViewInit() {
    this.theme
      .getJsTheme()
      .pipe(
        takeWhile(() => this.alive),
        delay(1)
      )
      .subscribe((config) => {
        const variables: any = config.variables;
        const visitorsPieLegend: any = config.variables.visitorsPieLegend;
        this.getIncidentsList();
        this.setOptions(variables);
        this.setLegendItems(visitorsPieLegend);
      });
  }

  setLegendItems(visitorsPieLegend) {
    this.chartLegend = [
      {
        iconColor: visitorsPieLegend.firstSection,
        title: "Resolved",
      },
      {
        iconColor: visitorsPieLegend.secondSection,
        title: "On Progress / Open",
      },
    ];
  }

   

  onChartInit(echarts) {
    this.echartsIntance = echarts;
  }

  resizeChart() {
    if (this.echartsIntance) {
      this.echartsIntance.resize();
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
