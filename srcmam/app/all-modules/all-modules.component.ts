import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-all-modules',
  templateUrl: './all-modules.component.html',
  styleUrls: ['./all-modules.component.css']
})
export class AllModulesComponent implements OnInit {
//   userActivity;

//   userInactive: Subject<any> = new Subject();
//   constructor(public router: Router) {
//     this.setTimeout();

//   }

//   setTimeout() {
//     this.userActivity = setTimeout(() => this.logout()
//     , 30000);
//   }
// logout(){
  
//   localStorage.setItem('inactivity', "true")
//   localStorage.setItem('LoginData', "")
//   this.router.navigate([''])
// }
//   @HostListener('window:mousemove') refreshUserState() {
//     clearTimeout(this.userActivity);
//     this.setTimeout();
//   }

  ngOnInit() {
  }

}
