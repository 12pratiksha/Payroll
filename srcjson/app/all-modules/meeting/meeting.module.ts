import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MatTableModule } from '@angular/material/table';
import { NgxBootstrapMultiselectModule } from 'ngx-bootstrap-multiselect';
import { FullCalendarModule } from '@fullcalendar/angular';
import { FormsModule } from '@angular/forms';
import {MatTreeModule} from '@angular/material/tree';
import { DataTablesModule } from 'angular-datatables';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatSliderModule } from '@angular/material/slider';
import {MatInputModule} from '@angular/material/input';
import { SearchPipePipe } from '../search-pipe.pipe';
import {MatButtonModule} from '@angular/material/button';
import { NgSelectModule } from '@ng-select/ng-select';
import { AngularDualListBoxModule } from 'angular-dual-listbox';
import { NgxMaskModule } from 'ngx-mask';
import { SharingModule } from 'src/app/sharing/sharing.module';
import { PickListModule } from 'primeng/picklist';
import { MeetingComponent } from './meeting.component';
import { CreatemeetingComponent } from './createmeeting/createmeeting.component';
import { UpdatemeetingComponent } from './updatemeeting/updatemeeting.component';
import { AssignedtaskComponent } from './assignedtask/assignedtask.component';
import { MeetingreportsComponent } from './meetingreports/meetingreports.component';


const routes: Routes = [
  { path: '',
  component: MeetingComponent,
  children: [
    
   {
    path:'createMeeting',
    component: CreatemeetingComponent
   },
   {
    path:'updateMeeting',
    component:UpdatemeetingComponent
   },
   {
    path:'assignedTask',
    component:AssignedtaskComponent
   },
   {
    path:'meetingReport',
    component:MeetingreportsComponent
   },
   
   
  ]
  }
]
@NgModule({
  declarations: [ CreatemeetingComponent, UpdatemeetingComponent, AssignedtaskComponent ,AssignedtaskComponent, MeetingreportsComponent,  ],
  imports: [
    CommonModule,  RouterModule.forChild(routes), MatSelectModule, MatCheckboxModule, MatFormFieldModule, ReactiveFormsModule,
    BsDatepickerModule.forRoot(), MatTableModule,  NgxBootstrapMultiselectModule,
    FullCalendarModule, FormsModule, MatTreeModule, DataTablesModule, MatPaginatorModule, MatAutocompleteModule, MatSliderModule, MatInputModule,
    MatButtonModule, NgSelectModule, CommonModule, AngularDualListBoxModule,
    SharingModule,
    PickListModule,
    NgxMaskModule.forRoot({
      showMaskTyped : false,
     
    }) 


  ]
})
export class MeetingModule { }
