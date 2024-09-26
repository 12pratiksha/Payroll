import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PayrollComponent } from './payroll.component';
import { EmployeeSalaryComponent } from './employee-salary/employee-salary.component';
import { SalaryViewComponent } from './salary-view/salary-view.component';
import { PayrollItemsComponent } from './payroll-items/payroll-items.component';
import { ViewAndReviseSalaryComponent } from './view-and-revise-salary/view-and-revise-salary.component';
import { EmployeeMasterEditComponent } from './employee-master-edit/employee-master-edit.component';
import { EmployeeMasterEditFormComponent } from './employee-master-edit-form/employee-master-edit-form.component';
import { EmployeeMasterEditFormwithIdComponent } from './employee-master-edit-formwith-id/employee-master-edit-formwith-id.component';
import { SalaryPolicyComponent } from '../masters/salary-policy/salary-policy.component';
import { SalaryDueRemarksComponent } from './salary-due-remarks/salary-due-remarks.component';
import { SalarySlipRemarksComponent } from './salary-slip-remarks/salary-slip-remarks.component';
import { SalaryDueRemarksFormComponent } from './salary-due-remarks-form/salary-due-remarks-form.component';
import { SalarySlipRemarksFormComponent } from './salary-slip-remarks-form/salary-slip-remarks-form.component';
import { ImportSalaryWithFormulaComponent } from './import-salary-with-formula/import-salary-with-formula.component';
import { ReimbersmentExpenseComponent } from './reimbersment-expense/reimbersment-expense.component';
import { ReimbersmentExpenseFormComponent } from './reimbersment-expense-form/reimbersment-expense-form.component';
import { AdvanceAmountForExpensesComponent } from './advance-amount-for-expenses/advance-amount-for-expenses.component';
import { AdvanceAmountForExpensesFormComponent } from './advance-amount-for-expenses-form/advance-amount-for-expenses-form.component';
import { SalaryAdditionDeductionComponent } from './salary-addition-deduction/salary-addition-deduction.component';
import { SalaryAdditionDeductionFormComponent } from './salary-addition-deduction-form/salary-addition-deduction-form.component';
import { SalaryAdditionDeductionImportComponent } from './salary-addition-deduction-import/salary-addition-deduction-import.component';
import { RunPayrollComponent } from './run-payroll/run-payroll.component';
import { PayElementComponent } from '../masters/pay-element/pay-element.component';
import { ImportPayElementComponent } from '../masters/import-pay-element/import-pay-element.component';
import { SalaryFormulasComponent } from '../masters/salary-formulas/salary-formulas.component';
import { SalaryCalendarManualComponent } from '../masters/salary-calendar-manual/salary-calendar-manual.component';
import { SfshComponent } from './sfsh/sfsh.component';
import { ApfComponent } from './apf/apf.component';
import { AddOrDeductSalaryHeadComponent } from './add-or-deduct-salary-head/add-or-deduct-salary-head.component';
const routes: Routes = [
  {
    path:"",
    component:PayrollComponent,
    children:[
      {
        path:"employee-salary",
        component:EmployeeSalaryComponent
      },
      {
        path:"salary-view",
        component:SalaryViewComponent
      },
      {
        path:"payroll-items",
        component:PayrollItemsComponent
      },
      {
        path:"view&revise",
        component:ViewAndReviseSalaryComponent
      },
      {
        path:"employeeMasterEdit",
        component:EmployeeMasterEditComponent
      },
      {
        path:"employeeMasterEditForm",
        component:EmployeeMasterEditFormComponent
      },
      {
        path:"employeeMasterEditForm/:id",
        component:EmployeeMasterEditFormwithIdComponent
      },
      {
        path:"salaryDueRemarks",
        component:SalaryDueRemarksComponent
      },
      {
        path:"salaryDueRemarksForm/:id",
        component:SalaryDueRemarksFormComponent
      },
      {
        path:"salarySlipRemarks",
        component:SalarySlipRemarksComponent
      },
      {
        path:"salarySlipRemarksForm/:id",
        component:SalarySlipRemarksFormComponent
      },
      {
        path:"importSalaryWithFormula",
        component:ImportSalaryWithFormulaComponent
      },
      {
        path:"sfsh",
        component:SfshComponent
      },

      {
        path:"apf",
        component:ApfComponent
      },
      {
        path:"ReimbExpenseMaster",
        component:ReimbersmentExpenseComponent
      },
      {
        path:"ReimbExpenseMasterForm/:id",
        component: ReimbersmentExpenseFormComponent
      },
      {
        path:"advanceAmountExpenses",
        component: AdvanceAmountForExpensesComponent
      },
      {
        path:"advanceAmountExpensesForm/:id",
        component: AdvanceAmountForExpensesFormComponent
      },
      {
        path:"salaryAditionDeduction",
        component: SalaryAdditionDeductionComponent
      },
      {
        path:"salaryAditionDeductionForm/:id",
        component: SalaryAdditionDeductionFormComponent
      },
      {
        path:"salaryAditionDeductionImport",
        component: SalaryAdditionDeductionImportComponent
      },
      {
        path:"runPayroll",
        component: RunPayrollComponent
      },
      {
        path:"payElementMaster",
        component: PayElementComponent
      },
      {
        path:"importPayElement",
        component: ImportPayElementComponent
      },
      {
        path:"salaryFormulas",
        component: SalaryFormulasComponent
      },
      {
        path:"salaryPolicy",
        component: SalaryPolicyComponent
      },
      {
        path:"salaryCalenderManual",
        component: SalaryCalendarManualComponent
      },
      {
        path:"AddOrDeductSalaryHeadComponent",
        component:AddOrDeductSalaryHeadComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayrollRoutingModule { }
