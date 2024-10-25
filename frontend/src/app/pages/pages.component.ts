import { ChangeDetectionStrategy, Component } from "@angular/core";
import { NbMenuItem, NbMenuService } from "@nebular/theme";

@Component({
  selector: "ngx-pages",
  styleUrls: ["pages.component.scss"],
  template: `
  
    <ngx-one-column-layout>
      <nb-menu [items]="menu" tag="myMainMenu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  
  `,
    changeDetection: ChangeDetectionStrategy.OnPush, 
})
export class PagesComponent {
  menu : NbMenuItem[] = [];
  newMenuItem: NbMenuItem[] = [];
  currentUser = localStorage.getItem("currentUser");

  constructor(private nbMenuService: NbMenuService) {
    this.newMenuItem = this.getMenuItemsBasedOnRole(this.currentUser);
    this.clearMenu();
    this.addItems();
  }

  clearMenu() {
    this.nbMenuService.collapseAll("myMainMenu"); 
    this.nbMenuService.addItems([], "myMainMenu"); 
  }
  addItems() {
    this.nbMenuService.addItems(this.newMenuItem, "myMainMenu");
    console.log("added");
  }
  getMenuItemsBasedOnRole(role: string | null): NbMenuItem[] {
    console.log("add items");
    if (role?.includes("ROLE_ADMIN") || role?.includes("ROLE_TESTER")) {
      return [
        {
          title: "Home",
          icon: "home-outline",
          link: "/pages/dashboard",
          home: true,
        },
        {
          title: "FEATURES",
          group: true,
        },
        {
          title: "Data Center",
          icon: "layout-outline",
          children: [
            {
              title: "Agents List",
              link: "/pages/layout/list",
            },
            {
              title: "Projects List",
              link: "/pages/layout/app-list",
            },
            {
              title: "All incidents",
              link: "/pages/tables/smart-table",
            },
          ],
        },
        {
          title: "Incidents Manager",
          icon: "edit-2-outline",
          children: [
            {
              title: "Report new Incident",
              link: "/pages/forms/inputs",
            },
            {
              title: "Assign new Tasks",
              link: "/pages/tables/open-incidents",
            },
            {
              title: "Assign new Test",
              link: "/pages/tables/ready-to-test",
            }
          ],
        },
      ];
    } else if (role?.includes("ROLE_MODERATOR")) {
      return [
        {
          title: "Home",
          icon: "home-outline",
          link: "/pages/dashboard",
          home: true,
        },
        {
          title: "App Manager",
          icon: "edit-2-outline",
          children: [
            {
              title: "Assigned Incident",
              link: "/pages/tables/app-assigned-incidents",
            },
            {
              title: "Solved Incidents",
              link: "/pages/tables/app-resolved-incidents",
            },
            {
              title: "Report new Incident",
              link: "/pages/forms/inputs",
            }
          ],
        },
      ];
    } else {
      return [
        {
          title: "Home",
          icon: "home-outline",
          link: "/pages/dashboard",
          home: true,
        },
        {
          title: "Report Incidents",
          icon: "edit-2-outline",
          children: [
            {
              title: "New Incident Form",
              link: "/pages/forms/inputs",
            },
          ],
        },
        {
          title: "Task Manager",
          icon: "layout-outline",
          children: [
            {
              title: "Assigned Tasks",
              link: "/pages/tables/assigned-tasks",
            },
            {
              title: "Solved Tasks",
              link: "/pages/tables/solved-tasks",
            },
          ],
        },
      ];
    }
  }
}
