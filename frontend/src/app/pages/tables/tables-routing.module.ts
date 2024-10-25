import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablesComponent } from './tables.component';
import { SmartTableComponent } from './smart-table/smart-table.component';
import { TreeGridComponent } from './tree-grid/tree-grid.component';
import { AppInciTableComponent } from './app-assigned-incidents-tab/app-inci-table.component';
import { AppResInciTableComponent } from './app-resolved-incidents-tab/app-resolved-table.component';
import { OpenInciTableComponent } from './open-incidents-tab/open-inci-table.component';
import { AssignPopoverFormComponent } from './open-incidents-tab/assign-form.component';
import { AssignedTasksTabComponent } from './assigned-tasks-tab/assigned-tasks-tab.component';
import { SolvedTasksTabComponent } from './solved-tasks-tab/solved-tasks-tab.component';
import { FinishTaskPopoverFormComponent } from './assigned-tasks-tab/popover-form-comp';
import { ReadyToTestTabComponent } from './ready-to-test-tab/ready-to-test-tab.component';

const routes: Routes = [{
  path: '',
  component: TablesComponent,
  children: [
    {
      path: 'smart-table',
      component: SmartTableComponent,
    },
    {
      path: 'tree-grid',
      component: TreeGridComponent,
    },
    {
      path: 'app-assigned-incidents',
      component: AppInciTableComponent,
    },
    {
      path: 'app-resolved-incidents',
      component: AppResInciTableComponent,
    },
    {
      path: 'open-incidents',
      component: OpenInciTableComponent,
    },
    {
      path: 'assigned-tasks',
      component: AssignedTasksTabComponent,
    },
    {
      path: 'solved-tasks',
      component: SolvedTasksTabComponent,
    },
    {
      path: 'ready-to-test',
      component: ReadyToTestTabComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablesRoutingModule { }

export const routedComponents = [
  SolvedTasksTabComponent,
  AssignedTasksTabComponent,
  AssignPopoverFormComponent,
  OpenInciTableComponent,
  AppResInciTableComponent,
  TablesComponent,
  SmartTableComponent,
  TreeGridComponent,
  AppInciTableComponent,
  ReadyToTestTabComponent,
];
