import { Component, HostListener, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { AllModulesService } from "../all-modules/all-modules.service";
import { HeaderService } from "./header.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {

  notifications: any;
  messagesData: any;
  lstEmployee: any;
  user: any;
  empid: any;

  // userActivity;

  // userInactive: Subject<any> = new Subject();
  // display: any;
  // timerInterval;
  
  // @HostListener('window:mousemove') refreshUserState() {
  //   this.timer()
  // }

  // timer() {
  //   let seconds: number = 1 * 60;

  //   this.timerInterval = setInterval(() => {
  //     seconds--;
  //    if (seconds < 0 ){
  //     this.display = seconds

  //    }
  //   }, 1000);
  // }


  constructor(private headerService: HeaderService, private router: Router, public _service:AllModulesService) {}

  ngOnInit() {

this.user = localStorage.User
this.empid=localStorage.getItem('empid')
  
  }

  // getDatas(section) {
  //   this.headerService.getDataFromJson(section).subscribe((data) => {
  //     this.jsonData[section] = data;
  //   });
  // }

  // clearData(section) {
  //   this.jsonData[section] = [];
  // }

  // onSubmit() {
  //   this.router.navigate(["/layout/pages/search"]);
  // }
  
  Logout(){
    localStorage.clear()
    this.router.navigate(['']);
  }
  loadEmployee() {
    
    
    this._service.get("employee_master/getemployees").subscribe((data) => {
     
    
      this.lstEmployee = data;
     data.forEach(element => {

     });

    
    });
  }


}
