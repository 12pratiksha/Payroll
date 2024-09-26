import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceComponent } from './attendance.component';
import { RouterModule, Routes } from '@angular/router';
import { AttendanceListComponent } from './attendance-list/attendance-list.component';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { LeaveApprovalListComponent } from './leave-approval-list/leave-approval-list.component';
import { MatTableModule } from '@angular/material/table';
import { NgxBootstrapMultiselectModule } from 'ngx-bootstrap-multiselect';
import { ShiftSchedulingComponent } from './shift-scheduling/shift-scheduling.component';  
import { FullCalendarModule } from '@fullcalendar/angular';
import { LeaveEncashmentComponent } from './leave-encashment/leave-encashment.component';
import { ShortLeavesComponent } from './short-leaves/short-leaves.component';
import { OnDutyMasterComponent } from './on-duty-master/on-duty-master.component';
import { OnDutyApprovalListComponent } from './on-duty-approval-list/on-duty-approval-list.component';
import { FormsModule } from '@angular/forms';
import { CustomAttendanceComponent } from './custom-attendance/custom-attendance.component';
import { CalendarAttendanceListComponent } from './calendar-attendance-list/calendar-attendance-list.component';
import {MatTreeModule} from '@angular/material/tree';
import { ShiftHistoryComponent } from './shift-history/shift-history.component';
import { DataTablesModule } from 'angular-datatables';
import { AssignEmployeeShiftComponent } from './assign-employee-shift/assign-employee-shift.component';
import { ShiftAssignImportComponent } from './shift-assign-import/shift-assign-import.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AttendanceImportComponent } from './attendance-import/attendance-import.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatSliderModule } from '@angular/material/slider';
import {MatInputModule} from '@angular/material/input';
import { SearchPipePipe } from '../search-pipe.pipe';
import {MatButtonModule} from '@angular/material/button';
import { NgSelectModule } from '@ng-select/ng-select';
import { AttendanceProcessComponent } from './attendance-process/attendance-process.component';
import { ImportLeavesComponent } from './import-leaves/import-leaves.component';
import { AttendanceWithShiftComponent } from './attendance-with-shift/attendance-with-shift.component';
import { TransferRequisitionComponent } from './transfer-requisition/transfer-requisition.component';
import { TransferRequisitionFormComponent } from './transfer-requisition-form/transfer-requisition-form.component';
import { RegularizationComponent } from './regularization/regularization.component';
import { LeaveComponent } from './leave/leave.component';
import { ImportDailyAttendanceComponent } from './import-daily-attendance/import-daily-attendance.component';
import { MonthlyAttendanceComponent } from './monthly-attendance/monthly-attendance.component';
import { ImportmonthlyAttendanceComponent } from './importmonthly-attendance/importmonthly-attendance.component';
import { EmployeeComplicanceSetupComponent } from './employee-complicance-setup/employee-complicance-setup.component';
import { AngularDualListBoxModule } from 'angular-dual-listbox';
import { NgxMaskModule } from 'ngx-mask';
import { SharingModule } from 'src/app/sharing/sharing.module';
import { PickListModule } from 'primeng/picklist';
import { LeaveapprovalListComponent } from './leaveapproval-list/leaveapproval-list.component';
import { CoffApplicationComponent } from './coff-application/coff-application.component';
import { CoffApplicationListComponent } from './coff-application-list/coff-application-list.component';
import { ECoffApplicationListComponent } from './e-coff-application-list/e-coff-application-list.component';
import { ECoffApplicationComponent } from './e-coff-application/e-coff-application.component';
import { CoffApprovalComponent } from './coff-approval/coff-approval.component';
import { ECoffApprovalComponent } from './e-coff-approval/e-coff-approval.component';
import { Monthlyattendence11Component } from './monthlyattendence11/monthlyattendence11.component';
import { MarkpresentabsentComponent } from './markpresentabsent/markpresentabsent.component';
import { ImportMonthlyDailyManualAttendanceComponent } from './import-monthly-daily-manual-attendance/import-monthly-daily-manual-attendance.component';
import { LeaveListComponent } from './leave-list/leave-list.component';



const routes: Routes = [
  { path: '',
  component: AttendanceComponent,
  children: [
    
   {
    path:'leaveApproval',
    component: LeaveApprovalListComponent
   },
   {
    path:'LeaveList',
    component: LeaveListComponent
   },
   {
    path:'leaveApprovalList',
    component: LeaveapprovalListComponent
   },
   {
    path:'shiftScheduling',
    component: ShiftSchedulingComponent
   },
   {
    path:'attendance',
    component: AttendanceListComponent
   },
   {
    path:'markpresentabsent',
    component: MarkpresentabsentComponent
   },
   {
    path:'leaveEncash',
    component: LeaveEncashmentComponent
   },
   {
    path:'shortLeaves',
    component: ShortLeavesComponent
   },
   {
    path:'outDutyMaster',
    component: OnDutyMasterComponent
   },
   {
    path:'customAttendance',
    component: CustomAttendanceComponent
   },
   {
    path:'attendanceListCalendar',
    component: CalendarAttendanceListComponent
   },
   {
    path:'monthlyattendence11',
    component: Monthlyattendence11Component
   },
   {
    path:'shiftHistory',
    component: ShiftHistoryComponent
   },
   {
    path:'assignEmployeeShift',
    component: AssignEmployeeShiftComponent
   },
   {
    path:'importShiftAssign',
    component: ShiftAssignImportComponent
   },
   {
    path:'importAttendance',
    component: AttendanceImportComponent
   },
   {
    path:'processAttendance',
    component: AttendanceProcessComponent
   },
   {
    path:'importLeaveBalance',
    component: ImportLeavesComponent
   },
  
   {
    path:'importAttendanceWithShift',
    component: AttendanceWithShiftComponent
   },
   {
    path:'transferRequisition',
    component: TransferRequisitionComponent
   },
   {
    path:'transferRequisitionForm/:id',
    component: TransferRequisitionFormComponent
   },
   {
    path:'regularization',
    component: RegularizationComponent
   },
   {
    path:'leave/leaveApplication',
    component: LeaveComponent
   },
   {
    path:'importDailyAttendance',
    component: ImportDailyAttendanceComponent
   },
   {
    path:'monthlyTotalAttendance',
    component: MonthlyAttendanceComponent
   },
   
   {
    path:'importmonthlyTotalAttendance',
    component: ImportmonthlyAttendanceComponent
   },
   {
    path:'manage/emplyeeCompliance',
    component: EmployeeComplicanceSetupComponent
   },
   {
    path:'coffApplication',
    component: CoffApplicationComponent
   },
   {
    path:'coffApplicationList',
    component: CoffApplicationListComponent
   },
   {
    path:'EcoffApplicationList',
    component: ECoffApplicationListComponent
   },
   {
    path:'EcoffApplication',
    component: ECoffApplicationComponent
   },
   {
    path:'coffApprovalList',
    component: CoffApprovalComponent
   },
   {
    path:'EcoffApprovalList',
    component: ECoffApprovalComponent
   },
   {
    path:'importMonthlyDailyManualAttendance',
    component:ImportMonthlyDailyManualAttendanceComponent
   }
  ]
  }
]
@NgModule({
  declarations: [  LeaveApprovalListComponent, ShiftSchedulingComponent, AttendanceListComponent, 
    LeaveEncashmentComponent, ShortLeavesComponent, OnDutyApprovalListComponent,
     CustomAttendanceComponent, CalendarAttendanceListComponent, ShiftHistoryComponent,
      AssignEmployeeShiftComponent, ShiftAssignImportComponent, EmployeeComplicanceSetupComponent,
       AttendanceImportComponent, SearchPipePipe, AttendanceProcessComponent, AttendanceWithShiftComponent, 
       TransferRequisitionComponent, TransferRequisitionFormComponent, RegularizationComponent, LeaveComponent,
        ImportDailyAttendanceComponent, OnDutyMasterComponent, MonthlyAttendanceComponent, ImportmonthlyAttendanceComponent, 
        LeaveapprovalListComponent, CoffApplicationComponent, CoffApplicationListComponent, ECoffApplicationListComponent, 
        ECoffApplicationComponent, ECoffApprovalComponent, CoffApprovalComponent, Monthlyattendence11Component, MarkpresentabsentComponent, ImportMonthlyDailyManualAttendanceComponent, LeaveListComponent, ],
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
export class AttendanceModule { }
