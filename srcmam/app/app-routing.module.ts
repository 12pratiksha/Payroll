import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from './core/auth/authentication.guard';
import { Error404Component } from './errorpages/error404/error404.component';
import { SalaryStructureComponent } from './all-modules/payroll/salary-structure/salary-structure.component';
import { LoginGuard } from './core/auth/loginGuard';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },  
  { path: '', loadChildren: () => import(`./login/login.module`).then((m) => m.LoginModule)},
  { path: "error", loadChildren: () => import(`./errorpages/errorpages.module`).then((m) => m.ErrorpagesModule) },
  { path: "layout", loadChildren: () => import(`./all-modules/all-modules.module`).then((m) => m.AllModulesModule),canActivate: [AuthenticationGuard]},
  {path: '404', component: Error404Component},
  {path: '**', redirectTo: '/404'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
