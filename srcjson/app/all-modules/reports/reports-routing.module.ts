import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportsComponent } from './reports.component';
import { ExpenseReportComponent } from './expense-report/expense-report.component';
import { InvoiceReportComponent } from './invoice-report/invoice-report.component';
import { EditInvoiceReportComponent } from './edit-invoice-report/edit-invoice-report.component';
// import { TestComponent } from './test/test.component';
import { SalarySlipComponent } from './salary-slip/salary-slip.component';
import { GenerateSlipComponent } from './generate-slip/generate-slip.component';
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
const routes: Routes = [
  {
    path:"",
    component:ReportsComponent,
    children:[
      {
        path:"expense-report",
        component:ExpenseReportComponent
      }, 
      {
        path:"invoice-report",
        component:InvoiceReportComponent
      },
      {
        path:"edit-invoice-report",
        component:EditInvoiceReportComponent
      },
      {
        path:"salarySlip",
        component:SalarySlipComponent
      },
      {
        path:"generatesalarySlip",
        component:GenerateSlipComponent
      },
      // {
      //   path:"test",
      //   component:TestComponent
      // },
      {
        path:"biometricAttendenceComponent",
        component:BiometricAttendenceComponent
      },
      {
        path:"dailyAttendenanceReportComponent",
        component:DailyAttendenanceReportComponent
      },
      {
        path:"monthlyAttendanceSummeryReportComponent",
        component:MonthlyAttendanceSummeryReportComponent
      },
      {
        path:"employeePendingShiftAssignDetailsReportComponent",
        component:EmployeePendingShiftAssignDetailsReportComponent
      },
      {
        path:"employeeLeaveApplicationReportComponent",
        component:EmployeeLeaveApplicationReportComponent
      },
      {
        path:"EmployeeAttendaceDetailsReportComponent",
        component:EmployeeAttendaceDetailsReportComponent
      },
      {
        path:"employeeInformationReport",
        component:EmployeeInformationReportComponent
      },
      {
        path:"EmployeeLeaveBalanceMonthWiseReportComponent",
        component:EmployeeLeaveBalanceMonthWiseReportComponent
      },
      {
        path:'EmployeeLeaveBalanceReportByDateComponent',
        component:EmployeeLeaveBalanceReportByDateComponent
      },
      {
        path:'employeeMonthlyLeavesStatusReportComponent',
        component:EmployeeMonthlyLeavesStatusReportComponent
      },
      {
        path:'bankPaymentDetailsReportComponent',
        component:BankPaymentDetailsReportComponent
      },
      {
        path:'pFRegisterReportComponent',
        component:PFRegisterReportComponent
      },
      {
        path:'eSICStatementReportComponent',
        component:ESICStatementReportComponent
      },
      {
        path:'eSICMasterReportComponent',
        component:ESICMasterReportComponent
      },
      {
        path:'eSICRegisterReportComponent',
        component:ESICRegisterReportComponent
      },
      {
        path:'employeeTypeWiseSalaryRegisterReportComponent',
        component:EmployeeTypeWiseSalaryRegisterReportComponent
      },
      {
        path:'employeePFUANNoReportComponent',
        component:EmployeePFUANNoReportComponent
      },
      {
        path:'getEmployeeDetailsReport',
        component:GetEmployeeDetailsReportComponent
      },
      {
        path:'punchdetailsComponent',
        component:PunchdetailsComponent
      }

      



    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
