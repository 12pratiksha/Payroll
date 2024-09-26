import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeesComponent } from './employees.component';
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
import { CompanypageComponent } from './companypage/companypage.component';
import { StateComponent } from './state/state.component';
import { CountryComponent } from './country/country.component';
import { CityComponent } from './city/city.component';
import { BranchComponent } from './branch/branch.component';
import { CategoriesComponent } from './categories/categories.component';
import { RegionComponent } from './region/region.component';
import { AssetsListComponent } from './assets-list/assets-list.component';
import { DepartmentComponent } from './department/department.component';
import { ImportEmployeesComponent } from './import-employees/import-employees.component';
import { ImportDepartmentComponent } from './import-department/import-department.component';
import { ImportSubDepartmentComponent } from './import-sub-department/import-sub-department.component';
import { ImportDesignationComponent } from './import-designation/import-designation.component';
import { EditEmpComponent } from './all-employees/edit-emp/edit-emp.component';
import { EditWithIdComponent } from './all-employees/edit-with-id/edit-with-id.component';
import { UsersComponent } from './users/users.component';
import { UsersFormComponent } from './users-form/users-form.component';
import { CompanyInfoComponent } from './company-info/company-info.component';
import { QualificationComponent } from './qualification/qualification.component';
import { ConnectionToDBComponent } from './connection-to-db/connection-to-db.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AdminchangepasswordComponent } from './adminchangepassword/adminchangepassword.component';



const routes: Routes = [
  {
    path: '',
    component: EmployeesComponent,
    children: [
      {
        path: 'categories',
        component: CategoriesComponent
      },
      {
        path: 'branch',
        component: BranchComponent
      },
      {
        path: 'city',
        component: CityComponent
      },
      {
        path: 'country',
        component: CountryComponent
      },
      {
        path: 'state',
        component: StateComponent
      },
      {
        path: 'region',
        component: RegionComponent
        },
      {
        path: 'companypage',
        component: CompanypageComponent
      },
      {
        path: 'employeepage',
        component: EmployeePageContentComponent
      },
      {
        path: 'employeelist',
        component: EmployeeListComponent
      },
      {
        path: 'employeeprofile',
        component: EmployeeProfileComponent
      },
      {
        path: 'holidays',
        component: HolidaysComponent
      },
      {
        path: 'adminleaves',
        component: LeavesAdminComponent
      },
      {
        path: 'employeeleaves',
        component: LeavesEmployeeComponent
      },
      {
        path: 'leavesettings',
        component: LeaveSettingsComponent
      },
      {
        path: 'attendanceadmin',
        component: AttendanceAdminComponent
      },
      {
        path: 'attendanceemployee',
        component: AttendanceEmployeeComponent
      },
      {
        path: 'departments',
        component: DepartmentsComponent
      },
      {
        path: 'designation',
        component: DesignationComponent
      },
      {
        path: 'timesheet',
        component: TimesheetComponent
      },
      {
        path: 'overtime',
        component: OvertimeComponent
      },
      {
        path: 'employeeprofile/:id',
        component: EmployeeProfileComponent
      },
      {
        path: 'assets-list',
        component: AssetsListComponent
      },
      {
        path: 'sub-departments',
        component: DepartmentComponent
      },
      {
        path: 'importEmployee',
        component: ImportEmployeesComponent
      },
      {
        path: 'importDeprtment',
        component: ImportDepartmentComponent
      },
      {
        path: 'importSubDeprtment',
        component: ImportSubDepartmentComponent
      },
      {
        path: 'importDesignation',
        component: ImportDesignationComponent
      },
      {
        path: 'employeeForm',
        component: EditEmpComponent
      },
      {
        path: 'employeeForm:id',
        component: EditWithIdComponent
      },
      {
        path: 'employeeForm/:id',
        component: EditWithIdComponent
      },
      {
        path: 'user',
        component: UsersComponent
      },
      {
        path: 'userForm/:id',
        component: UsersFormComponent
      },
      {
        path: 'changePassword',
        component: ChangePasswordComponent
      },
      {
        path: 'companyInfo',
        component: CompanyInfoComponent
      },
      {
        path: 'qualification',
        component: QualificationComponent
      },
      {
        path: 'connectionToDb',
        component: ConnectionToDBComponent
      },
      {
        path: 'adminchangepassword',
        component: AdminchangepasswordComponent
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
