import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllModulesComponent } from './all-modules.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AllModulesComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },

      {
        path: 'employees',
        loadChildren: () => import('./employees/employees.module').then(m => m.EmployeesModule)
      },
      
      {
        path: 'payroll',
        loadChildren: () => import('./payroll/payroll.module').then(m => m.PayrollModule)
      },
     
      {
        path: 'reports',
        loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule)
      },
      
      {
        path: 'paymentreports',
        loadChildren: () => import('./paymentreports/paymentreports.module').then(m => m.PaymentreportsModule)
      },
      
      {
        path: 'payslipreports',
        loadChildren: () => import('./payslipreports/payslipreports.module').then(m => m.PayslipreportsModule)
      },
      {
        path: 'jobsdashboard',
        loadChildren: () => import('./jobsdashboard/jobsdashboard.module').then(m => m.JobsdashboardModule)
      },
      
      {
        path: 'masters',
        loadChildren: () => import('./masters/masters.module').then(m => m.MastersModule)
      },
      {
        path: 'humanResorces',
        loadChildren: () => import('./human-resources/human-resources.module').then(m => m.HumanResourcesModule)
      },
      {
        path: 'attendance&leave',
        loadChildren: () => import('./attendance/attendance.module').then(m => m.AttendanceModule)
      },
      {
        path: 'recruitment',
        loadChildren: () => import('./recruitment/recruitment.module').then(m => m.RecruitmentModule)
      },
      {
        path:'tds',
        loadChildren: () => import('./tds/tds.module').then(m => m.TdsModule)
      },
      {
        path:'meeting',
        loadChildren:() => import('./meeting/meeting.module').then(m => m.MeetingModule)
      },
      {
        path:'training',
        loadChildren:() => import('./training/training.module').then(m =>m.TrainingModule)
      }
     
         ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllModulesRoutingModule { }
