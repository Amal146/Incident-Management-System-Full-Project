import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { IncidentService } from '../../../service/incident/incident-service.service';
import { PopoverFormComponent } from '../../layout/app-list/popover-form.component';
import { FinishTaskPopoverFormComponent } from './popover-form-comp';

@Component({
  selector: 'll-button-comp',
  template: `
    <button nbButton hero 
            [nbPopover]="isTaskStarted ? formComponent : null"
            [status]="isTaskStarted ? 'danger' : 'success'"
            (click)="handleClick()">
      {{ isTaskStarted ? 'Finish Task' : 'Start Task' }}
    </button>
  `
})
export class MyCustomComponent implements OnInit {
  @Input() rowData!: any;
  @Output() startTask: EventEmitter<any> = new EventEmitter();
  @Output() finishTask: EventEmitter<any> = new EventEmitter();
  
  @Input() parent: any; 

  updatedTask = {
    id : "",
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
    },
    resolvedBy:{
       id : 0
    },
  }
  formComponent = FinishTaskPopoverFormComponent;
  isTaskStarted: boolean ;
  constructor(
    private incidentService : IncidentService,
  ){}

  ngOnInit() {
    this.isTaskStarted = (this.rowData.status === "In_Progress");
    console.log( this.isTaskStarted)

  }

  handleClick() {
    if (this.isTaskStarted) {
      console.log(this.rowData);
      localStorage.setItem('currentIncident', JSON.stringify(this.rowData));
      this.finishTask.emit(this.rowData);
    } else {
      this.startTask.emit(this.rowData);
      this.updatedTask.id = this.rowData.id;
      this.updatedTask.title = this.rowData.title;
      this.updatedTask.description = this.rowData.description;
      this.updatedTask.severity = this.rowData.severity;
      this.updatedTask.reportedAt = this.rowData.reportedAt;
      this.updatedTask.application.id = this.rowData.application.id;
      this.updatedTask.reportedBy.id = this.rowData.reportedBy.id;
      this.updatedTask.resolvedBy.id = this.rowData.resolvedBy.id;
      this.updatedTask.status = "In_Progress";

      this.incidentService.updateIncident(this.rowData.id , this.updatedTask).subscribe(
        () => {
          console.log('updated succefully !! ')
          window.location.reload(); 
        }
      )
      console.log('We are inside custom Comp', JSON.stringify(this.rowData));


    }
  }
}
