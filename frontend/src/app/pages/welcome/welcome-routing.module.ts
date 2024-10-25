import { RouterModule, Routes } from "@angular/router";
import { WelcomeComponent } from "./component/welcome.component";
import { ParenWlcComponent } from "./parentwlc.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    {
      path: '',
      component: ParenWlcComponent,
      children: [
        {
          path: 'welcome',
          component: WelcomeComponent,
        },
      ],
    },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class WelcomeRoutingModule {
  }
  