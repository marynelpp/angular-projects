import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar.component';
import { NgxMultiselectModule } from '@ngx-lib/multiselect';

@NgModule({
    imports: [ RouterModule, CommonModule,NgxMultiselectModule ],
    declarations: [ SidebarComponent ],
    exports: [ SidebarComponent ]
})

export class SidebarModule {}
