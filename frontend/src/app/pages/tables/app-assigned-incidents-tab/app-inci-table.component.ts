import { Component, OnInit } from "@angular/core";
import { Incident } from "../../../model/incident";
import { IncidentService } from "../../../service/incident/incident-service.service";
import { User } from "../../../model/user";
import { Application } from "../../../model/application";
import { ApplicationService } from "../../../service/application/application-service.service";

@Component({
  selector: "ngx-smart-table",
  templateUrl: "./app-inci-table.component.html",
  styleUrls: ["./app-inci-table.component.scss"],
})
export class AppInciTableComponent implements OnInit {
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
  loading = true;


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

  fillIncidents(){
    for ( var appId of this.appIds) {
      this.incidentService
        .getIncidentsByAppId(appId)
       .subscribe((data) => {
        const openIncidents = data.filter(incident => incident.status === 'Open');
            this.incidents = [...this.incidents, ...openIncidents];
       });
   }
  }

  ngOnInit() {
    this.getApplicationList();

    if (this.currentUser?.toString().includes("ROLE_MODERATOR")) {
      this.applicationService
        .getAppByManagerId(this.modId)
        .subscribe((data) => {
          this.appIds = data.map((app) => app.id);
          console.log(this.appIds);
          this.fillIncidents();

        });
        return;
    }

    this.incidentService
    .getIncidentList()
    .subscribe((data) => {
      console.log(data);
    });
    
    setTimeout(() => {
      this.loading = false;
    }, 4000);
    

  }

  settings = {
    hideSubHeader: true,
    actions: false,
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      confirmSave: true,
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
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
      resolvedAt: {
        title: "Resolved At",
        type: "date",
        valuePrepareFunction: (date: Date) =>
          date ? new Date(date).toLocaleString("en-GB") : "N/A",
      },
      reportedBy: {
        title: "Reported By",
        type: "string",
        valuePrepareFunction: (user: User) => (user ? `${user.email}` : "N/A"),
      },
      resolvedBy: {
        title: "Resolved By",
        type: "string",
        valuePrepareFunction: (user: User) => (user ? `${user.email} ` : "N/A"),
      },
      solutionDescription: {
        title: "Solution Description",
        type: "string",
        valuePrepareFunction: (description: string) => description || "N/A",
      },
      application: {
        title: "Application",
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

  deleteIncident(incidentId: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this incident?"
    );
    if (confirmed) {
      this.incidentService.deleteIncident(incidentId).subscribe(() => {
        this.incidents = this.incidents.filter(
          (incident) => incident.id !== incidentId
        );
        console.log("Application deleted");
      });
    }
  }

  onDeleteConfirm(event): void {
    if (window.confirm("Are you sure you want to delete?")) {
      const incidentId = event.data.id;
      this.incidentService.deleteIncident(incidentId).subscribe(
        () => {
          this.incidents = this.incidents.filter(
            (incident) => incident.id !== incidentId
          );
          console.log("Incident deleted");
          event.confirm.resolve();
        },
        (error) => {
          console.error("Error deleting incident:", error);
          event.confirm.reject();
        }
      );
    } else {
      event.confirm.reject();
    }
  }

  onEditConfirm(event): void {
    console.log("Clicked Confirm");
    const updatedIncident = event.newData;
    console.log(updatedIncident);
    this.incidentService
      .updateIncident(event.data.id, updatedIncident)
      .subscribe(
        () => {
          this.incidents = this.incidents.map((incident) =>
            incident.id === updatedIncident.id ? updatedIncident : incident
          );
          console.log("Incident updated");
          window.location.reload();
          event.confirm.resolve();
        },
        (error) => {
          console.error("Error updating incident:", error);
          event.confirm.reject();
        }
      );
  }

  onCreateConfirm(event): void {
    console.log("Clicked Confirm");

    const newIncident = event.newData;
    this.incidentService.createIncident(newIncident).subscribe(
      (createdIncident: Incident) => {
        this.incidents.push(createdIncident);
        console.log("Incident created");
        event.confirm.resolve();
      },
      (error) => {
        console.error("Error creating incident:", error);
        event.confirm.reject();
      }
    );
  }
}
