import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule, NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { ParenWlcComponent } from './parentwlc.component';
import { WelcomeComponent } from './component/welcome.component';

@NgModule({
  imports: [
    ThemeModule,
    NbMenuModule,
    NbCardModule,
    NbButtonModule,
    WelcomeRoutingModule,
  ],
  declarations: [
    ParenWlcComponent,
    WelcomeComponent,
  ],
})
export class WelcomeModule { }