import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar.component';
import { NgxMultiselectModule } from '@ngx-lib/multiselect';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IgxSliderModule } from 'igniteui-angular';



@NgModule({
    imports: [ RouterModule, CommonModule,NgxMultiselectModule,FormsModule, IgxSliderModule,
        ReactiveFormsModule, ],
    declarations: [ SidebarComponent ],
    exports: [ SidebarComponent ]
})

export class SidebarModule {}