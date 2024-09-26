import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-all-modules',
  templateUrl: './all-modules.component.html',
  styleUrls: ['./all-modules.component.css']
})
export class AllModulesComponent implements OnInit {
  config: any;
  config1: any;
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
constructor(private http: HttpClient, public router: Router) {
  // this.loadConfig()
}

  ngOnInit() {
  }
  // loadConfig() {
  //   // alert(11111111)
  //   return this.http.get('/assets/json/jsonfile.json')
  //     .toPromise()
  //     .then(data => {
  //       this.config= data;
  //       // environment.apiEndpoint = this.config.baseURL;
  //       console.log(this.config.urls.baseURL)
  //       this.config1=this.config.urls.baseURL
  //       localStorage.setItem('url',this.config1)
  //     });
  // }

}
