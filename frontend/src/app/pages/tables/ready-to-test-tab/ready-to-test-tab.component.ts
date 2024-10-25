import { Component, OnInit } from '@angular/core';
import { User } from '../../../model/user';
import { Application } from '../../../model/application';
import { IncidentService } from '../../../service/incident/incident-service.service';
import { ApplicationService } from '../../../service/application/application-service.service';
import { Incident } from '../../../model/incident';
import { AssignTestPopoverFormComponent } from './assign-test-form.component';
import { LocalDataSource, ServerDataSource } from 'ng2-smart-table';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ngx-ready-to-test-tab',
  templateUrl: './ready-to-test-tab.component.html',
  styleUrls: ['./ready-to-test-tab.component.scss']
})
export class ReadyToTestTabComponent implements OnInit {
  loading= true;
  constructor(
    private httpClient: HttpClient,
  ) {
  }
  ngOnInit(): void {
    this.initData();
  }
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
  formComponent = AssignTestPopoverFormComponent;

  source: LocalDataSource = new LocalDataSource();

  initData() {
    const endPoint = 'http://localhost:8080/api/findAllIncidentsByPage?status=Readytotest&pageNo=0&pageSize=10';
  
    this.source = new ServerDataSource(this.httpClient, {
      dataKey: 'content',
      endPoint: endPoint,
      pagerPageKey: 'pageNo',
      pagerLimitKey: 'pageSize',
      totalKey: 'totalElements',
    });
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
