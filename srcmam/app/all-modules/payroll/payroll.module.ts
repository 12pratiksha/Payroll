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
import { PayrollRoutingModule } from './payroll-routing.module';
import { PayrollComponent } from './payroll.component';
import { EmployeeSalaryComponent } from './employee-salary/employee-salary.component';
import { SalaryViewComponent } from './salary-view/salary-view.component';
import { PayrollItemsComponent } from './payroll-items/payroll-items.component';
import { SharingModule } from 'src/app/sharing/sharing.module';
import { ViewAndReviseSalaryComponent } from './view-and-revise-salary/view-and-revise-salary.component';
import { EmployeeMasterEditComponent } from './employee-master-edit/employee-master-edit.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EmployeeMasterEditFormComponent } from './employee-master-edit-form/employee-master-edit-form.component';
import { EmployeeMasterEditFormwithIdComponent } from './employee-master-edit-formwith-id/employee-master-edit-formwith-id.component';
import { SalaryStructureComponent } from './salary-structure/salary-structure.component';
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
import { SfshComponent } from './sfsh/sfsh.component';
import { ApfComponent } from './apf/apf.component'
import {AddOrDeductSalaryHeadComponent} from './add-or-deduct-salary-head/add-or-deduct-salary-head.component'
@NgModule({
  declarations: [PayrollComponent, EmployeeSalaryComponent, SalaryViewComponent, PayrollItemsComponent, ViewAndReviseSalaryComponent, EmployeeMasterEditComponent, EmployeeMasterEditFormComponent, EmployeeMasterEditFormwithIdComponent, SalaryStructureComponent, SalaryDueRemarksComponent, SalarySlipRemarksComponent, SalaryDueRemarksFormComponent, SalarySlipRemarksFormComponent, ImportSalaryWithFormulaComponent, ReimbersmentExpenseComponent, ReimbersmentExpenseFormComponent, AdvanceAmountForExpensesComponent, AdvanceAmountForExpensesFormComponent, SalaryAdditionDeductionComponent, SalaryAdditionDeductionFormComponent, SalaryAdditionDeductionImportComponent, RunPayrollComponent, SfshComponent, ApfComponent,AddOrDeductSalaryHeadComponent],
  imports: [
    CommonModule,
    PayrollRoutingModule,
    DataTablesModule,
    BsDatepickerModule.forRoot(),
    SharingModule,
    ReactiveFormsModule,
    MatSelectModule, MatCheckboxModule, MatFormFieldModule, ReactiveFormsModule, MatTableModule,  NgxBootstrapMultiselectModule,
    FullCalendarModule, FormsModule, MatTreeModule, DataTablesModule, MatPaginatorModule, MatAutocompleteModule, MatSliderModule, MatInputModule,
    MatButtonModule, NgSelectModule
  ]
})
export class PayrollModule { }
