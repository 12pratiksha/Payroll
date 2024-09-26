import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AllModulesService } from '../../all-modules.service';
import { CalendarCreatorService } from "../calendar-creator.service";
import { Day } from "./models/day.model";
@Component({
  selector: 'app-calendar-attendance-list',
  templateUrl: './calendar-attendance-list.component.html',
  styleUrls: ['./calendar-attendance-list.component.css']
})
export class CalendarAttendanceListComponent implements OnInit {

  public monthDays: Day[];
  months = [{id:0, month: 'January', number: '01'}, {id:1, month: 'February', number: '02'}, {id:2, month: 'March', number: '03'}, {id:3, month: 'April', number: '04'}, {id:4, month: 'May', number: '05'}, {id:5, month: 'June', number: '06'},
  {id:6, month: 'July', number: '07'}, {id:7, month: 'August', number: '08'}, {id:8, month: 'September', number: '09'}, {id:9, month: 'October', number: '10'}, {id:10, month: 'November', number: '11'}, {id:11, month: 'December', number: '12'}]
  years = [ 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030]
  public monthNumber: number;
  public year: number;
  img = []
  public weekDaysName = [];
  employees: any;
  form: FormGroup
  month: string;
  data: any;
  attendance = [];
  array: any=[];
  employee1: any;
  selected: string;
  userType: string;
  constructor(public calendarCreator: CalendarCreatorService, public _service: AllModulesService, public fb: FormBuilder) {}

  ngOnInit(): void {
    this.userType=localStorage.getItem('type')
    this.setMonthDays(this.calendarCreator.getCurrentMonth());
    var date = new Date();
    this.weekDaysName.push("Mo");
    this.weekDaysName.push("Tu");
    this.weekDaysName.push("We");
    this.weekDaysName.push("Th");
    this.weekDaysName.push("Fr");
    this.weekDaysName.push("Sa");
    this.weekDaysName.push("Su");
    console.log(date.getMonth())
    console.log(date.getFullYear())
    this.form = this.fb.group({
      employee: ['', Validators.required],
      year: [date.getFullYear(), Validators.required],
      month: [date.getMonth(), Validators.required],
    })
    this.getEmployees();
  }

  onNextMonth(): void {
    this.monthNumber++;
    console.log(this.monthNumber)
    console.log(this.year)
    if (this.monthNumber == 13) {
      this.monthNumber = 1;
      this.year++;
    }
    this.setMonthDays(this.calendarCreator.getMonth(this.monthNumber, this.year));
  }

  onPreviousMonth() : void{
    this.monthNumber--;
    if (this.monthNumber < 1) {
      this.monthNumber = 12;
      this.year--;
    }
    this.setMonthDays(this.calendarCreator.getMonth(this.monthNumber, this.year));
  }

  private setMonthDays(days: Day[]): void {
    this.monthDays = days;
    // this.img = ["/assets/img/logo2.png", "/assets/img/logo3.png",  "/assets/img/logo3.png", "", "", "", "", "", "/assets/img/logo2.png"]
    this.monthNumber = this.monthDays[0].monthIndex;
    this.year = this.monthDays[0].year;
  }

  async getEmployees(){
    if(this.userType=='Admin' || this.userType=='Super Admin'){
      this._service.get("employee_master/getemployees").subscribe((data) => {
      this.employees = data;
      });
    }
    else{
      this.employees=[];
      let myemp=[];
      let id = localStorage.getItem('empid')
      let url = "employee_master/getemployee/" + id;
      await this._service.get(url).subscribe((res) => {
      console.log(res);
      console.log(">>>>>"+res.employeeId);
      this.employees.push({"employeeId":res.employeeId,"employeeCode":res.employeeCode,"firstName":res.firstName,"lastName":res.lastName});
      console.log(">>>>>"+this.employees[0].employeeId); 
      });
    }
  }

  test(){
  if(this.form.valid)
  {
    let form = this.form.value

    this.setMonthDays(this.calendarCreator.getMonth(form.month, form.year));
    this.getAttendance();
  }
  else{
    this.form.markAllAsTouched();
    Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Please enter required field',
    })
  }
}

  inTime
  outTime
  getAttendance(){
    let url
    let form = this.form.value
    console.log(form)
    if (this.form.valid && this.userType=='Admin'){
      let emp=this.form.value.employee.split(" ");
      let emply=this.employees.filter((emply)=>
      (emply.employeeCode == emp[0]))
      this.attendance=[]
      this.inTime=[]
      this.outTime=[]
      
      this.monthDays.forEach(element => {
        this.month = element.month
       });
      url ='getAttendanceStatusReportbyYearAndDate?year='+`${this.year}`+'&month='+`${this.month}`+'&employeeNo='+`${emply[0].employeeId}`
    }
    else{ 
      this.monthDays.forEach(element => {
        this.month = element.month
       });
      url ='getAttendanceStatusReportbyYearAndDate?year='+`${form.year}`+'&month='+`${this.month}`+'&employeeNo='+`${form.employee}`
    }
      console.log(url)
      this._service.get(url).subscribe((res) => {
       this.data = res
       if(res == ''){
        this.attendance = [ ]
       }
        let intime = []
        let outtime = []
      for(let i = 0; i < res.length; i ++){
        
        // intime.push("in " + res[i]?.ainTime?res[i]?.ainTime[0]:'' + ":" + res[i]?.ainTime?res[i]?.ainTime[0]:'' + " -")
        // outtime.push("out " + res[i]?.aoutTime?res[i]?.aoutTime[0]:'' + ":" +  res[i]?.aoutTime?res[i]?.aoutTime[1]:'')
        intime.push("in " + res[i]?.ainTime?res[i]?.ainTime:''  + " -")
        outtime.push("out " + res[i]?.aoutTime?res[i]?.aoutTime:'' )
        this.attendance.push(res[i].attendance)
        if(res[i].attendance == 'Absent'){
          this.img.push("/assets/img/images/absent.png")
        
        }
        else if(res[i].attendance == 'Prsent' || res[i].attendance == 'out  duty'){
          this.img.push("/assets/img/images/present.png")
        }
        else if(res[i].attendance == 'late'){
          this.img.push("/assets/img/images/late.png")
          
        }
      else{
        this.img.push("")
      }
      }
      console.log(intime)
      this.inTime = intime
      this.outTime = outtime
    })
      
    
    // else{
     
    //   this.form.markAllAsTouched();
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Oops...',
    //     text: 'Something went wrong!',
      
    //   })
    // }
  }

  getEmpList(event){
 
    console.log(event)
    
    this.array.push(event)
    console.log(this.array.key)
    // console.log(this.array.key.toLowerCase)
    let form=this.form.value
    if(this.array.length >=2){
      let data=form.employee.toLowerCase()
    let url='employees/search?employeeName='+`${data}`
    this._service.get(url).subscribe((res)=>{
      this.employee1=res.data
    })
  }
  }
  
  displayEmp(data,name,last){
  console.log(data,name,last)
  this.selected=[data] +" "+ name +" "+ last; 
  
  }
}
