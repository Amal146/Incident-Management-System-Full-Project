import { Component, OnDestroy } from "@angular/core";
import {
  ProgressInfo,
  StatsProgressBarData,
} from "../../../@core/data/stats-progress-bar";
import { takeWhile } from "rxjs/operators";
import { IncidentService } from "../../../service/incident/incident-service.service";
import { Incident } from "../../../model/incident";
import { UserService } from "../../../service/user/user-service.service";
import { Resolver } from "dns";

@Component({
  selector: "ngx-progress-section",
  styleUrls: ["./progress-section.component.scss"],
  templateUrl: "./progress-section.component.html",
})
export class ECommerceProgressSectionComponent implements OnDestroy {
  private alive = true;

  progressInfoData: ProgressInfo[];
  loading = true;

  constructor(private incidentService: IncidentService ,
              private userService: UserService
  ) {
    this.incidentService
      .getIncidentList()
      .pipe(takeWhile(() => this.alive))
      .subscribe((res) => {
        let data: ProgressInfo[] = [];
        const totalResolved = res.filter(
          (incident) => incident.status === "Resolved"
        ).length;
        const totalRes: ProgressInfo = {
          title: "Total Solved Incidents",
          value: totalResolved,
          activeProgress: Math.round((totalResolved / res.length) * 100),
          description: "We've solved almost all incidents !",
        };
        data.push(totalRes);
        let totalUsers = 0;
        const uniqueResolvers = new Set(
          res
            .filter((incident) => incident.status === "Resolved")
            .map((incident) => incident.resolvedBy.id)
        );
        
        const resolvers = uniqueResolvers.size;
                this.userService.getUserList().subscribe((res) => {
          totalUsers = res.length
          const Resolvers: ProgressInfo = {
            title: "Incident Resolvers",
            value: resolvers,
            activeProgress: Math.round((resolvers / totalUsers) * 100),
            description: Math.round((resolvers / totalUsers) * 100) + "% of our Agents are contributing in the incidents solving! ",
          };
          data.push(Resolvers);
        })
        const openIncidents = res.filter((incident) => incident.status === "Open").length
        const unresolvedIncidents = res.filter((incident) => incident.status !== "Resolved").length
        const IncidentBacklog: ProgressInfo = {
          title: "Incident Backlog",
          value: openIncidents,
          activeProgress: Math.round((openIncidents / unresolvedIncidents) * 100),
          description: "There are currently " + openIncidents + " unresolved incidents pending assignation.",
      };
      data.push(IncidentBacklog);
      this.progressInfoData = data;
      });

      setTimeout(() => {
        this.loading = false;
      }, 7000);
  }

  ngOnDestroy() {
    this.alive = true;
  }
}
