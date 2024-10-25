import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbLayoutModule, NbPopoverModule, NbSelectModule, NbSpinnerModule, NbTreeGridModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { TablesRoutingModule, routedComponents } from './tables-routing.module';
import { FsIconComponent } from './tree-grid/tree-grid.component';
import { AssignPopoverFormComponent } from './open-incidents-tab/assign-form.component';
import { FormsModule } from '@angular/forms';
import { AssignedTasksTabComponent } from './assigned-tasks-tab/assigned-tasks-tab.component';
import { OpenInciTableComponent } from './open-incidents-tab/open-inci-table.component';
import { AppResInciTableComponent } from './app-resolved-incidents-tab/app-resolved-table.component';
import { AppInciTableComponent } from './app-assigned-incidents-tab/app-inci-table.component';
import { SolvedTasksTabComponent } from './solved-tasks-tab/solved-tasks-tab.component';
import { MyCustomComponent } from './assigned-tasks-tab/custom-component';
import { FinishTaskPopoverFormComponent } from './assigned-tasks-tab/popover-form-comp';
import { ReadyToTestTabComponent } from './ready-to-test-tab/ready-to-test-tab.component';
import { AssignTestPopoverFormComponent } from './ready-to-test-tab/assign-test-form.component';

@NgModule({
  imports: [
    NbSpinnerModule,
    NbButtonModule,
    NbLayoutModule,
    NbSelectModule,
    NbCardModule,
    NbTreeGridModule,
    NbPopoverModule,
    NbIconModule,
    NbInputModule,
    FormsModule,
    ThemeModule,
    TablesRoutingModule,
    NbButtonModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
    FinishTaskPopoverFormComponent,
    FsIconComponent,
    MyCustomComponent,
    AssignTestPopoverFormComponent,
    AssignPopoverFormComponent,
    AssignedTasksTabComponent,
    OpenInciTableComponent,
    AppResInciTableComponent,
    AppInciTableComponent,
    SolvedTasksTabComponent,
    ReadyToTestTabComponent,

  ],
  entryComponents: [
    MyCustomComponent
  ],
})
export class TablesModule { }
