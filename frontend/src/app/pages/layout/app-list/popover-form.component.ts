import { Component, OnInit } from "@angular/core";
import { ApplicationService } from "../../../service/application/application-service.service";
import { UserService } from "../../../service/user/user-service.service";
import { Application } from "../../../model/application";
import { NbToastrService } from "@nebular/theme";

@Component({
  selector: "ngx-popover-form",
  template: `<div class="p-4">
    <form (ngSubmit)="onSubmit()">
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          placeholder="Application name"
          [(ngModel)]="applicationForm.name"
          name="name"
        />
      </div>
      <div class="form-group">
        <nb-select
          class="position-select"
          class="filters select"
          style="width:  218.438px;"
          [(ngModel)]="applicationForm.managerId"
          name="managerId"
          placeholder="Select App Manager"
          hero
        >
          <nb-option *ngFor="let manager of managers" [value]="manager.id" (click)="$event.stopPropagation()">{{
            formatManagerName(manager.firstName, manager.lastName)
          }}</nb-option>
        </nb-select>
      </div>
      <button type="submit" class="btn btn-primary w-100">Send</button>
    </form>
  </div>`
})
export class PopoverFormComponent implements OnInit {
    
  x = "";
  applicationForm = {
    name: "",
    managerId: 0,
  };
  applications!: string[];
  application: Application = new Application(); 
  managers: any[] = [];
  constructor(
    private applicationService: ApplicationService,
    private userService: UserService,
    private toastrService: NbToastrService,
  ) {}

  ngOnInit(): void {
    this.userService.getUsersByRoleId(2).subscribe((data: any) => {
      this.managers = data;
    });

    this.applicationService.getAppList().subscribe((data) => {
        this.applications = data.map((app) => app.name);
        console.log(this.applications);
      });
  }
  formatManagerName(firstName: string, lastName: string): string {
    this.x = firstName + lastName?.toUpperCase();
    return  this.x ;
  }
  showError() {
    this.toastrService.show('Application already exists', 'Warning', { status: 'warning' });
  }
  showSuccess() {
    this.toastrService.show('Application added successfully ', 'Success', { status: 'success' });
  }
  
  
  onSubmit() {
      this.application.name =  this.applicationForm.name;
      this.application.managerId = this.applicationForm.managerId;

    if (this.applications.toString().toLowerCase().includes(this.application.name.toLowerCase())){
        this.showError(); 
        console.log("Application already exists");
    }else{
        this.applicationService.createApp(this.application).subscribe((response) => {
            console.log("Application created", response);
            this.showSuccess();
          });
    }
    
  }
}
