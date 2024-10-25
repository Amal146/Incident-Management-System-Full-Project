import { Component, OnInit } from '@angular/core';
import { Application } from '../../../model/application';
import { ApplicationService } from '../../../service/application/application-service.service';
import { PopoverFormComponent } from './popover-form.component';

@Component({
  selector: 'ngx-list',
  templateUrl: 'app-list.component.html',
  styleUrls: ['app-list.component.scss'],
})
export class AppListComponent implements OnInit {
  applications!: Application[];
  app: Application = new Application(); 
  formComponent = PopoverFormComponent;
  loading = true;

  constructor(private appService: ApplicationService) {}

  ngOnInit(): void {
    this.appService.getAppList().subscribe(data => {
      this.applications = data;
      console.log(this.applications);
      this.loading = false; // Hide loading spinner or similar
    });
  }
}

