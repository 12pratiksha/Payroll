import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { ExpenseReportComponent } from './expense-report/expense-report.component';
import { DataTablesModule } from 'angular-datatables';
import { InvoiceReportComponent } from './invoice-report/invoice-report.component';
import { SharingModule } from 'src/app/sharing/sharing.module';
import { EditInvoiceReportComponent } from './edit-invoice-report/edit-invoice-report.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { TestComponent } from './test/test.component';
import { SalarySlipComponent } from './salary-slip/salary-slip.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { GenerateSlipComponent } from './generate-slip/generate-slip.component';
import { SalarySlipFormatComponent } from './salary-slip-format/salary-slip-format.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { NgxBootstrapMultiselectModule } from 'ngx-bootstrap-multiselect';
import { MatTreeModule } from '@angular/material/tree';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { BiometricAttendenceComponent } from './biometric-attendence/biometric-attendence.component';
import { DailyAttendenanceReportComponent } from './daily-attendenance-report/daily-attendenance-report.component';
import { MonthlyAttendanceSummeryReportComponent } from './monthly-attendance-summery-report/monthly-attendance-summery-report.component';
import { EmployeePendingShiftAssignDetailsReportComponent } from './employee-pending-shift-assign-details-report/employee-pending-shift-assign-details-report.component';
import { EmployeeLeaveApplicationReportComponent } from './employee-leave-application-report/employee-leave-application-report.component';
import { EmployeeAttendaceDetailsReportComponent } from './employee-attendace-details-report/employee-attendace-details-report.component';
import { EmployeeInformationReportComponent } from './employee-information-report/employee-information-report.component';
import { EmployeeLeaveBalanceMonthWiseReportComponent } from './employee-leave-balance-month-wise-report/employee-leave-balance-month-wise-report.component';
import { EmployeeLeaveBalanceReportByDateComponent } from './employee-leave-balance-report-by-date/employee-leave-balance-report-by-date.component';
import { EmployeeMonthlyLeavesStatusReportComponent } from './employee-monthly-leaves-status-report/employee-monthly-leaves-status-report.component';
import { BankPaymentDetailsReportComponent } from './bank-payment-details-report/bank-payment-details-report.component';
import { PFRegisterReportComponent } from './p-fregister-report/p-fregister-report.component';
import { ESICStatementReportComponent } from './e-sicstatement-report/e-sicstatement-report.component';
import { ESICMasterReportComponent } from './e-sicmaster-report/e-sicmaster-report.component';
import { ESICRegisterReportComponent } from './e-sicregister-report/e-sicregister-report.component';
import { EmployeeTypeWiseSalaryRegisterReportComponent } from './employee-type-wise-salary-register-report/employee-type-wise-salary-register-report.component';
import { EmployeePFUANNoReportComponent } from './employee-pfuanno-report/employee-pfuanno-report.component';
import { GetEmployeeDetailsReportComponent } from './get-employee-details-report/get-employee-details-report.component';
import { PunchdetailsComponent } from './punchdetails/punchdetails.component';

@NgModule({
  declarations: [ReportsComponent, ExpenseReportComponent, InvoiceReportComponent, EditInvoiceReportComponent, SalarySlipComponent, GenerateSlipComponent, SalarySlipFormatComponent, BiometricAttendenceComponent, DailyAttendenanceReportComponent, MonthlyAttendanceSummeryReportComponent, EmployeePendingShiftAssignDetailsReportComponent, EmployeeLeaveApplicationReportComponent, EmployeeAttendaceDetailsReportComponent, EmployeeInformationReportComponent, EmployeeLeaveBalanceMonthWiseReportComponent, EmployeeLeaveBalanceReportByDateComponent, EmployeeMonthlyLeavesStatusReportComponent, BankPaymentDetailsReportComponent, PFRegisterReportComponent, ESICStatementReportComponent, ESICMasterReportComponent, ESICRegisterReportComponent, EmployeeTypeWiseSalaryRegisterReportComponent, EmployeePFUANNoReportComponent, GetEmployeeDetailsReportComponent, PunchdetailsComponent, ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    SharingModule,
    NgSelectModule,
    BsDatepickerModule.forRoot(),
    MatSelectModule, MatCheckboxModule, MatFormFieldModule, ReactiveFormsModule, 
    MatTableModule,  NgxBootstrapMultiselectModule,
     FormsModule, MatTreeModule, DataTablesModule, MatPaginatorModule, MatAutocompleteModule,
      MatSliderModule, MatInputModule,
    MatButtonModule, NgSelectModule
  ]
})
export class ReportsModule { }
