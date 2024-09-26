import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { MorrisJsModule } from 'angular-morris-js';
import { NgApexchartsModule } from "ng-apexcharts";
import { TooltipModule } from 'ngx-bootstrap/tooltip'; 
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeebystatusComponent } from './employeebystatus/employeebystatus.component';
import { DataTablesModule } from 'angular-datatables';
@NgModule({
  declarations: [DashboardComponent, AdminDashboardComponent, EmployeeDashboardComponent, EmployeebystatusComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MorrisJsModule,
    NgApexchartsModule,
    TooltipModule.forRoot(),
    MatProgressBarModule,
    MatSelectModule,
    MatCheckboxModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    DataTablesModule,
  ]
})
export class DashboardModule { }
