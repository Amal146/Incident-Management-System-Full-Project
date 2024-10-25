import { Component, OnInit } from "@angular/core";
import { ApplicationService } from "../../../service/application/application-service.service";
import { UserService } from "../../../service/user/user-service.service";
import { NbToastrService } from "@nebular/theme";
import { IncidentService } from "../../../service/incident/incident-service.service";
import { NotificationService } from "../../../service/notification/notification.service";

@Component({
  selector: "ngx-popover-form",
  template: `<div class="p-4">
    <form (ngSubmit)="onSubmit($event)">
      <label>Brief Solution Description :</label>
      <br />
      <div class="form-group">
        <textarea
          nbInput
          fullWidth
          placeholder="Full width"
          [(ngModel)]="solution"
          name="solution"
        ></textarea>
      </div>
      <button type="submit" class="btn btn-primary w-100">Send</button>
    </form>
  </div>`,
})
export class FinishTaskPopoverFormComponent implements OnInit {
  rowData = JSON.parse(localStorage.getItem("currentIncident"));
  solution = "";

  notification = {
    message: "",
    is_read: false,
    user : {
      id : 0 ,
    },
    timestamp: new Date()
  };

  updatedTask = {
    id: "",
    title: "",
    description: "",
    severity: "",
    status: "",
    reportedAt: new Date(),
    application: {
      id: 0,
    },
    reportedBy: {
      id: 0,
    },
    resolvedBy: {
      id: 0,
    },
    solutionDescription: "",
    resolvedAt: new Date(),
  };

  constructor(
    private userService: UserService,
    private notificationService: NotificationService,
    private applicationService: ApplicationService,
    private incidentService: IncidentService,
    private toastrService: NbToastrService
  ) {}

  ngOnInit(): void {
    console.log(this.rowData);
  }

  showError() {
    this.toastrService.show("Application already exists", "Warning", {
      status: "warning",
    });
  }
  showSuccess() {
    this.toastrService.show("Application added successfully ", "Success", {
      status: "success",
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.updatedTask.id = this.rowData ? this.rowData["id"] : "";
    this.updatedTask.title = this.rowData ? this.rowData["title"] : "";
    this.updatedTask.description = this.rowData ? this.rowData["description"] : "";
    this.updatedTask.severity = this.rowData ? this.rowData["severity"] : "";
    this.updatedTask.reportedAt = this.rowData ? new Date(this.rowData["reportedAt"]) : new Date();
    this.updatedTask.application.id = this.rowData ? this.rowData["application"]["id"] : 0;
    this.updatedTask.reportedBy.id = this.rowData ? this.rowData["reportedBy"]["id"] : 0;
    this.updatedTask.resolvedBy.id = this.rowData ? this.rowData["resolvedBy"]["id"] : 0;
    this.updatedTask.status = "Ready_to_Test";
    this.updatedTask.solutionDescription = this.solution;
    this.updatedTask.resolvedAt = new Date();

    this.incidentService.updateIncident(this.rowData.id , this.updatedTask).subscribe(
      () => {
        console.log('updated succefully !! ')
        this.sendAdminsNotifications();
        this.notifyManager();

        setTimeout(() => {
          window.location.reload(); 
        }, 5000); 
      }
    )

  }
  resolver = '' ;
  sendAdminsNotifications() {
    

    this.userService.getUsersByRoleId(3).subscribe(users => {
      this.userService.getUserById(this.updatedTask.resolvedBy.id).subscribe((res) => {
        this.resolver = res.username;
        users.forEach(user => {
          this.notification.message =  "Dear Admin Incident titled " + this.updatedTask.title + "has been resolved by " + this.resolver ;
          this.notification.is_read =  false;
          this.notification.user.id =  user.id;
          this.notification.timestamp =  new Date();
          this.notificationService.save(this.notification).subscribe();
        
         });
     });
       
    });
 }

 notifyManager(){
  let x = '' ;
  this.userService.getUserById(this.updatedTask.resolvedBy.id).subscribe((res) => {
    x = res.username;
  }
)
  this.applicationService.getAppById(this.updatedTask.application.id).subscribe(
    (data) => {
      
     
      this.notification.user.id = data.managerId;
      this.notification.message =  "Dear Manager Incident titled " + this.updatedTask.title + "has been resolved by " + x ;
      this.notification.is_read =  false;
      this.notification.timestamp =  new Date();
      this.notificationService.save(this.notification).subscribe();
      })
     }

}
