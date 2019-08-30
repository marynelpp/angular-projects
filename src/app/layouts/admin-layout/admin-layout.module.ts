import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent }       from '../../pages/dashboard/dashboard.component';
import { UserComponent }            from '../../pages/user/user.component';
import { TableComponent }           from '../../pages/table/table.component';
import { TypographyComponent }      from '../../pages/typography/typography.component';
import { IconsComponent }           from '../../pages/icons/icons.component';
import { MapsComponent }            from '../../pages/maps/maps.component';
import { NotificationsComponent }   from '../../pages/notifications/notifications.component';
import { UpgradeComponent }         from '../../pages/upgrade/upgrade.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import {HardwareComponent} from '../../pages/hardware/hardware.component';
import {SoftwareComponent} from '../../pages/software/software.component';
import {AssignmentComponent} from '../../pages/assignment/assignment.component';
import {LevelComponent} from '../../pages/level/level.component';
import {ActivityComponent} from '../../pages/activity/activity.component';
import {TechnologyComponent} from '../../pages/technology/technology.component'
import { NgxMultiselectModule } from '@ngx-lib/multiselect';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ModalModule.forRoot(),
    NgxMultiselectModule,
    NgbModalModule,
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    TableComponent,
    UpgradeComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    HardwareComponent,
    SoftwareComponent,
    AssignmentComponent,
    LevelComponent,
    TechnologyComponent,
    ActivityComponent
   
  ],
  
  
  providers: [BsModalService],
})

export class AdminLayoutModule {}
