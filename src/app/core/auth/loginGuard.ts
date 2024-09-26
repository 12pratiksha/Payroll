
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class LoginGuard implements CanActivate {
    constructor(public router: Router, public state: RouterStateSnapshot) {}
    canActivate() {
        if (localStorage.getItem('LoginData')) {
            // this.router.navigate(["/layout/dashboard/admin"]);
            return true;
         }
        }
}