import { Component, OnInit } from "@angular/core";
import { Incident } from "../../../model/incident";
import { IncidentService } from "../../../service/incident/incident-service.service";
import { User } from "../../../model/user";
import { Application } from "../../../model/application";
import { ApplicationService } from "../../../service/application/application-service.service";
import { AssignPopoverFormComponent } from "./assign-form.component";
import { LocalDataSource, ServerDataSource } from "ng2-smart-table";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "ngx-smart-table",
  templateUrl: "./open-inci-table.component.html",
  styleUrls: ["./open-inci-table.component.scss"],
})
export class OpenInciTableComponent implements OnInit {
  loading= true;
  constructor(
    private httpClient: HttpClient,
    private incidentService: IncidentService,
    private applicationService: ApplicationService
  ) {
    this.initData()
  }
  source: LocalDataSource = new LocalDataSource();
  pagesSize = 30;
  currentPage = 0 ;
  totaCount = 0;
  totalItems: number;
  incidents: Incident[] = [];
  applicationOptions!: String[];
  currentUser = localStorage.getItem("currentUser");
  modId = this.currentUser ? JSON.parse(this.currentUser)["id"] : null;
  appIds: number[] = [];
  // Define options for severity and status
  statusOptions = ["Open", "In Progress", "Resolved", "Closed"];
  severityOptions = ["Low", "Medium", "High", "Critical"];
  formComponent = AssignPopoverFormComponent;


  initData() {
    this.source = new ServerDataSource(this.httpClient, {
      // http://localhost:8080/api/findAllIncidentsByPage?pageNo=0&pageSize=10
      dataKey: 'content',
      endPoint: 'http://localhost:8080/api/findAllIncidentsByPage',
      pagerPageKey: 'pageNo', // this should be page number param name in endpoint (request not response) for example 'page'
      pagerLimitKey: 'pageSize', // this should page size param name in endpoint (request not response)
      totalKey: 'totalElements', // this is total records count in response, this will handle pager
    });
  }

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

  fillIncidents(pageNo: number = 0, pageSize: number = 20) {
    this.loading = true; // Set loading to true before making the request
  
    this.incidentService.getIncidentListPerPage(pageNo, pageSize).subscribe(
      (page) => {
        // Filter incidents before assigning to this.incidents
        this.incidents = page.content.filter(incident => incident.status === 'Open');
        this.totalItems = page.totalElements;
        this.loading = false;
        console.log(`Displaying ${pageSize} records`);
      },
      (error) => {
        console.error("Error fetching paginated incidents:", error);
        this.loading = false;
      }
    );
  }

  

  ngOnInit() {
  }

  onPageChange(event) {
    const { page, perPage } = event; 
    this.loading = true; 
    this.fillIncidents(page - 1, perPage); // Load the corresponding 
  }

  settings = {
    pager: {
      display: true,
      perPage: 10,
    },
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
      reportedBy: {
        title: "Reported By",
        type: "string",
        valuePrepareFunction: (user: User) => (user ? `${user.email}` : "N/A"),
      },
      resolvedBy: {
        title: "Assigned to",
        type: "string",
        valuePrepareFunction: (user: User) => (user ? `${user.email} ` : "N/A"),
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
