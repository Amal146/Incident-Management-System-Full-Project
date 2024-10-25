import { Component, OnInit } from "@angular/core";
import { UserService } from "../../../service/user/user-service.service";
import { NbToastrService } from "@nebular/theme";
import { IncidentService } from "../../../service/incident/incident-service.service";
import { Incident } from "../../../model/incident";
import { User } from "../../../model/user";
import { SuprSendInboxService } from "@suprsend/ngx-inbox";
import { NotificationService } from "../../../service/notification/notification.service";

@Component({
  selector: "ngx-popover-form",
  template: `<div class="p-4">
    <form (ngSubmit)="onSubmit($event)">
      <div class="form-group">
        <label>Incident Id : </label>
        <br>
        <nb-select
          status="basic"
          name="incidentId"
          required
          style="width:  218.438px;"
          placeholder="Select Incident Id"
          hero
          [(ngModel)]="incidentForm.id"
          name="incidentId"
        >
          <nb-option
            *ngFor="let incidentId of incidentsIds"
            [value]="incidentId"
            (click)="$event.stopPropagation()"
          >
            {{ incidentId }}
          </nb-option>
        </nb-select>
      </div>
      <div class="form-group">
        <label>Assigned to : </label>
        <br>
        <nb-select
          status="basic"
          name="resolverId"
          required
          style="width:  218.438px;"
          placeholder="Select resolver"
          hero
          [(ngModel)]="incidentForm.resolverId"
          name="resolverId"
        >
          <nb-option
            *ngFor="let res of resolvers"
            [value]="res.id"
            (click)="$event.stopPropagation()"
          >
            {{ formatManagerName(res.firstName, res.lastName) }}
          </nb-option>
        </nb-select>
      </div>
      <button type="submit" class="btn btn-primary w-100">Send</button>
    </form>
  </div>`,
})
export class AssignPopoverFormComponent implements OnInit {
  incidentsIds: number[] = [];
  notification = {
    message: "",
    is_read: false,
    user : {
      id : 0 ,
    },
    timestamp: new Date()
  };
  resolvers: User[] = [];
  incidentForm = {
    id: 0,
    resolverId: 0,
  };
  incidentUpdated: Incident;
  assignedTo: User;

  constructor(
    private notificationService: NotificationService,
    private userService: UserService,
    private incidentService: IncidentService,
    private toastrService: NbToastrService
  ) {}

  ngOnInit(): void {
    this.incidentService.getIncidentList().subscribe((incidents) => {
      const openIncidents = incidents.filter((incident) => 
        incident.status === "Open" && incident.resolvedBy === null
      );
    
      this.incidentsIds = [...this.incidentsIds, ...openIncidents.map((incident) => incident.id)];
    });
    
    this.userService.getUsersByRoleId(1).subscribe((data) => {
      this.resolvers = data;
    });
  }

  formatManagerName(firstName: string, lastName: string): string {
    return `${firstName} ${lastName?.toUpperCase()}`;
  }

  showSuccess() {
    this.toastrService.show("Task assigned successfully ", "Success", {
      status: "success",
    });
  }

  onSubmit(event: Event) {
    event.preventDefault(); 

    this.incidentService.getIncidentById(this.incidentForm.id).subscribe(
      (data) => {
        this.incidentUpdated = data;
        this.userService.getUserById(this.incidentForm.resolverId).subscribe(
          (userData) => {
            this.assignedTo = userData;
            this.incidentUpdated.resolvedBy = this.assignedTo;

            this.incidentService
              .updateIncident(this.incidentForm.id, this.incidentUpdated)
              .subscribe(
                () => {
                  
                    this.userService.getUserById(this.assignedTo.id).subscribe((res) => {
                        this.notification.message =  "A new task has been assigned to you" ;
                        this.notification.is_read =  false;
                        this.notification.user.id =  res.id;
                        this.notification.timestamp =  new Date();
                        this.notificationService.save(this.notification).subscribe();
                   });
                  
                this.showSuccess();
                setTimeout(() => {
                  window.location.reload(); 
                }, 5000); 

                },
                (error) => {
                  console.error("Error updating incident:", error);
                }
              );
          },
          (error) => {
            console.error("Error fetching user:", error);
          }
        );
      },
      (error) => {
        console.error("Error fetching incident:", error);
      }
    );

  }
}
