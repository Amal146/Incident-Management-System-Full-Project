import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../service/user/user-service.service';
import { Application } from '../../../model/application';
import { ApplicationService } from '../../../service/application/application-service.service';

@Component({
  selector: 'ngx-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.scss'],
})
export class ListComponent implements OnInit {
  users!: {};
  managers!: {};
  admins!: {};
  applications!: Application[];
  loading = true;

  constructor(
    private router: Router,
    private userService: UserService,
    private appService: ApplicationService
  ) {}

  ngOnInit(): void {
    
    this.userService.getUsersByRoleId(1).subscribe(data => {
      this.users = data;

    });
    this.userService.getUsersByRoleId(2).subscribe(data => {
      this.managers = data;
    });
    this.userService.getUsersByRoleId(3).subscribe(data => {
      this.admins = data;
    });
    this.appService.getAppList().subscribe(data => {
      this.applications = data;
    });
    setTimeout(() => {
      this.loading = false;
    }, 500);

  }
}
