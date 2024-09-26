import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees.component';
import { AllEmployeesComponent } from './all-employees/all-employees.component';
import { EmployeePageContentComponent } from './all-employees/employee-page-content/employee-page-content.component';
import { EmployeeListComponent } from './all-employees/employee-list/employee-list.component';
import { EmployeeProfileComponent } from './all-employees/employee-profile/employee-profile.component';
import { HolidaysComponent } from './holidays/holidays.component';
import { LeavesAdminComponent } from './leaves-admin/leaves-admin.component';
import { LeavesEmployeeComponent } from './leaves-employee/leaves-employee.component';
import { LeaveSettingsComponent } from './leave-settings/leave-settings.component';
import { AttendanceAdminComponent } from './attendance-admin/attendance-admin.component';
import { AttendanceEmployeeComponent } from './attendance-employee/attendance-employee.component';
import { DepartmentsComponent } from './departments/departments.component';
import { DesignationComponent } from './designation/designation.component';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { OvertimeComponent } from './overtime/overtime.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { SharingModule } from 'src/app/sharing/sharing.module';
import { PickListModule } from 'primeng/picklist';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatNativeDateModule } from '@angular/material/core';
import { CompanypageComponent } from './companypage/companypage.component';
import { CountryComponent } from './country/country.component';
import { StateComponent } from './state/state.component';
import { CityComponent } from './city/city.component';
import { BranchComponent } from './branch/branch.component';
import { DepartmentComponent } from './department/department.component';
import { CategoriesComponent } from './categories/categories.component';
import { RegionComponent } from './region/region.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatSelectModule } from '@angular/material/select';
import {NgxMaskModule} from 'ngx-mask';
import { AssetsListComponent } from './assets-list/assets-list.component';
import { ImportEmployeesComponent } from './import-employees/import-employees.component';
import { ImportDepartmentComponent } from './import-department/import-department.component';
import { ImportSubDepartmentComponent } from './import-sub-department/import-sub-department.component';
import { ImportDesignationComponent } from './import-designation/import-designation.component';
import { EditEmpComponent } from './all-employees/edit-emp/edit-emp.component'
import { NgSelectModule } from '@ng-select/ng-select';
import { EditWithIdComponent } from './all-employees/edit-with-id/edit-with-id.component';
import { UsersComponent } from './users/users.component';
import { UsersFormComponent } from './users-form/users-form.component';
import { CompanyInfoComponent } from './company-info/company-info.component';
import { QualificationComponent } from './qualification/qualification.component';
import { ConnectionToDBComponent } from './connection-to-db/connection-to-db.component';
import { OnlyNumberDirective } from '../onlynumber.directive';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AdminchangepasswordComponent } from './adminchangepassword/adminchangepassword.component';
import { ImportDatabaseComponent } from './import-database/import-database.component';
import { ExportdatabaseComponent } from './exportdatabase/exportdatabase.component';
import { InsertsettingComponent } from './insertsetting/insertsetting.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';




@NgModule({
  declarations: [EmployeesComponent, AllEmployeesComponent, EmployeePageContentComponent, EmployeeListComponent, EmployeeProfileComponent, HolidaysComponent, LeavesAdminComponent, LeavesEmployeeComponent, LeaveSettingsComponent, AttendanceAdminComponent, AttendanceEmployeeComponent, DepartmentsComponent, DesignationComponent, TimesheetComponent, OvertimeComponent, CompanypageComponent, CountryComponent, StateComponent, CityComponent, BranchComponent, DepartmentComponent, CategoriesComponent, RegionComponent, AssetsListComponent, ImportEmployeesComponent, ImportDepartmentComponent, ImportSubDepartmentComponent, ImportDesignationComponent, EditEmpComponent,
                OnlyNumberDirective, EditWithIdComponent, UsersComponent, UsersFormComponent, CompanyInfoComponent, QualificationComponent, ConnectionToDBComponent, ChangePasswordComponent, AdminchangepasswordComponent, ImportDatabaseComponent, ExportdatabaseComponent, InsertsettingComponent,],
  imports: [
    CommonModule,
    FormsModule,
    SharingModule,
    ReactiveFormsModule,
    PickListModule,
    EmployeesRoutingModule, PickListModule,
    BsDatepickerModule.forRoot(),
    DataTablesModule,
    TooltipModule.forRoot(),
    NgMultiSelectDropDownModule,
    NgSelectModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    NgxMaskModule.forRoot({
      showMaskTyped : false,
    }) 
  ]
})

export class EmployeesModule { }
