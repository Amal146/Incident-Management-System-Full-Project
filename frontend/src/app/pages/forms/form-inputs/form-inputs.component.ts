import { Component, OnInit } from '@angular/core';
import { Incident } from '../../../model/incident';
import { Application } from '../../../model/application';
import { IncidentService } from '../../../service/incident/incident-service.service';
import { ApplicationService } from '../../../service/application/application-service.service';
import { UserService } from '../../../service/user/user-service.service';
import { NbToastrService } from '@nebular/theme';
import { NotificationService } from '../../../service/notification/notification.service';

@Component({
  selector: 'ngx-form-inputs',
  styleUrls: ['./form-inputs.component.scss'],
  templateUrl: './form-inputs.component.html',
})
export class FormInputsComponent implements OnInit{
  incident: Incident = new Incident();
  applications: Application[] = [];
  emailError: boolean = false;
  reportedByEmail: string = '';
  resolvedByEmail: string = '';
  appId = 0;

  notification = {
    message: "",
    is_read: false,
    user : {
      id : 0 ,
    },
    timestamp: new Date()
  };


  incidentReport = {
    title: "",
    description: "",
    severity: "",
    status:"",
    reportedAt : new Date(),
    application:{
       id : 0
    },
    reportedBy:{
       id : 0
    }
  
  }
  
  constructor(
    private notificationService :  NotificationService,
    private toastrService : NbToastrService,
    private incidentService: IncidentService,
    private applicationService: ApplicationService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.loadApplications();
    
  }

  loadApplications() {
       this.applicationService.getAppList().subscribe((apps) => { 
       this.applications = apps.map((app) => app);      
       console.log(this.applications);
    });
   }
  
  showSuccess() {
    this.toastrService.show('Incident added successfully ', 'Success', { status: 'success' });
  }


  validateUserEmail(email: string) {
    if (!email) return;
    this.userService.getUserByEmail(email).subscribe(
      (user) => (this.emailError = !user),
    );
  }
  onSubmit() {
    
    this.incidentReport.reportedAt = new Date();
    this.incidentReport.status = 'Open';
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.incidentReport.reportedBy.id = currentUser.id;    
    this.incidentService.createIncident(this.incidentReport).subscribe(
      () => {
        
        this.sendAdminsNotifications();
        this.showSuccess();
      }
    );

  }

  reporter = '' ;

  sendAdminsNotifications() {
     this.userService.getUserById(this.incidentReport.reportedBy.id).subscribe((res) => {
      this.reporter = res.username;
     })

     this.userService.getUsersByRoleId(3).subscribe(users => {
      users.forEach(user => {
        this.notification.message =  "A new incident has been reported by " + this.reporter ;
        this.notification.is_read =  false;
        this.notification.user.id =  user.id;
        this.notification.timestamp =  new Date();
        this.notificationService.save(this.notification).subscribe();
      });
     });
    
    
      this.applicationService.getAppById(this.incidentReport.application.id).subscribe(
        (res) => {
          console.log(res);
          this.notification.user.id = res.managerId;
          this.notification.message =  "A new incident has been reported by " + this.reporter ;
          this.notification.is_read =  false;
          this.notification.timestamp =  new Date();
          console.log(this.notification.user.id);
          this.notificationService.save(this.notification).subscribe();
        }
      )
      
  }

  
}
