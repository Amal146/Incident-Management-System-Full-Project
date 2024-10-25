import { Incident } from "../../../model/incident";
import { IncidentService } from "../../../service/incident/incident-service.service";
import { User } from "../../../model/user";
import { Application } from "../../../model/application";
import { ApplicationService } from "../../../service/application/application-service.service";
import { Component, OnInit } from "@angular/core";
import { MyCustomComponent } from "./custom-component";

@Component({
  selector: "ngx-assigned-tasks-tab",
  templateUrl: "./assigned-tasks-tab.component.html",
  styleUrls: ["./assigned-tasks-tab.component.scss"],
})
export class AssignedTasksTabComponent implements OnInit {
  loading= true;
  constructor(
    private incidentService: IncidentService,
    private applicationService: ApplicationService
  ) {}

  incidents: Incident[] = [];
  applicationOptions!: String[];
  currentUser = localStorage.getItem("currentUser");
  modId = this.currentUser ? JSON.parse(this.currentUser)["id"] : null;
  appIds: number[] = [];
  // Define options for severity and status
  statusOptions = ["Open", "In Progress", "Resolved", "Closed"];
  severityOptions = ["Low", "Medium", "High", "Critical"];

  getApplicationList() {
    this.applicationService.getAppList().subscribe(
      (apps) => {
        if (apps) {
          this.applicationOptions = apps.map((app) => app.name);
          console.log(this.applicationOptions);
        } else {
          console.error("No applications found");
        }
      },
      (error) => {
        console.error("Error fetching applications:", error);
      }
    );
    return this.applicationOptions
      ? this.applicationOptions.map((app) => ({ value: app, title: app }))
      : [];
  }

  fillIncidents() {
    this.incidentService
      .getIncidentByResolverId(this.modId)
      .subscribe((data) => {
        const openIncidents = data.filter(
          (incident) => incident.status !== "Resolved"
        );
        this.incidents = [...this.incidents, ...openIncidents];
      });
  }

  onCustomAction(event: any) {
    // Handle custom action events
    console.log('Custom action triggered:', event);
  }

  ngOnInit() {
    this.getApplicationList();

    this.fillIncidents();
    setTimeout(() => {
      this.loading = false;
    }, 4000);
  }

  settings = {
    hideSubHeader: true,
    actions: false,
    columns: {
      customColumn: {
        title: "Actions",
        type: "custom",
        filter: false,
        renderComponent: MyCustomComponent,
        onComponentInitFunction(instance: MyCustomComponent) {
        },
      },
      id: {
        title: "ID",
        type: "number",
      },
      title: {
        title: "Title",
        type: "string",
      },
      description: {
        title: "Description",
        type: "string",
      },
      status: {
        title: "Status",
        type: "string",
        editor: {
          type: "list",
          config: {
            list: this.statusOptions.map((option) => ({
              value: option,
              title: option,
            })),
          },
        },
      },
      severity: {
        title: "Severity",
        type: "string",
        editor: {
          type: "list",
          config: {
            list: this.severityOptions.map((option) => ({
              value: option,
              title: option,
            })),
          },
        },
      },
      reportedAt: {
        title: "Reported At",
        type: "date",
        valuePrepareFunction: (date: Date) =>
          new Date(date).toLocaleString("en-GB"),
      },
      reportedBy: {
        title: "Reported By",
        type: "string",
        valuePrepareFunction: (user: User) => (user ? `${user.email}` : "N/A"),
      },
      application: {
        title: "Project",
        type: "string",
        valuePrepareFunction: (application: Application) => application.name,
        editor: {
          type: "list",
          config: {
            list: this.applicationOptions,
          },
        },
      },
    },
  };
}
