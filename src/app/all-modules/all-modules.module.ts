import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AllModulesRoutingModule } from './all-modules-routing.module';
import { AllModulesComponent } from './all-modules.component';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DataTablesModule } from 'angular-datatables';

// Api Interaction 
//import { InMemoryWebApiModule } from 'angular-in-memory-web-api'

// Perfect Scrollbar
import {
  PerfectScrollbarModule, PerfectScrollbarConfigInterface,
  PERFECT_SCROLLBAR_CONFIG
} from 'ngx-perfect-scrollbar';
import { HeaderService } from '../header/header.service';
import { AllModulesService } from './all-modules.service';

// Api All Modules Database
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { MastersComponent } from './masters/masters.component';
import { MeetingComponent } from './meeting/meeting.component';
import { TdsComponent } from './tds/tds.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { NgxBootstrapMultiselectModule } from 'ngx-bootstrap-multiselect';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import {MatTableModule} from '@angular/material/table';
import { FullCalendarModule } from '@fullcalendar/angular';
import {MatTreeModule} from '@angular/material/tree';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ImportLeavesComponent } from './attendance/import-leaves/import-leaves.component';
import { HolidaysComponent } from './holidays/holidays.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { FooterComponent } from '../footer/footer.component';
FullCalendarModule.registerPlugins([interactionPlugin, dayGridPlugin]);
import { DatePipe } from "@angular/common";
import { TrainingComponent } from './training/training.component';




const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {};

@NgModule({
  declarations: [
    AllModulesComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    MastersComponent,
    AttendanceComponent,
    ImportLeavesComponent,
    HolidaysComponent,
    MeetingComponent,
    TdsComponent,
    TrainingComponent,
    
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgMultiSelectDropDownModule,
    TooltipModule.forRoot(),
    PerfectScrollbarModule,
    AllModulesRoutingModule,
    DataTablesModule,
    MatCheckboxModule, 
    MatSelectModule,
    MatFormFieldModule,
    NgxBootstrapMultiselectModule,
    BsDatepickerModule,
    FullCalendarModule,
    MatTreeModule,
    MatAutocompleteModule, 
    MatInputModule,
    MatButtonModule,
    NgSelectModule,
    MatTableModule,
    MatPaginatorModule,
    NgSelectModule,
    MatProgressBarModule
  ],
  providers: [
    AllModulesService,DatePipe,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    HeaderService
  ]
})
export class AllModulesModule { }
