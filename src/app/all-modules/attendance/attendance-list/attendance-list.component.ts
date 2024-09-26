import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AllModulesService } from '../../all-modules.service';
import * as xlsx from 'xlsx';

@Component({
  selector: 'app-attendance-list',
  templateUrl: './attendance-list.component.html',
  styleUrls: ['./attendance-list.component.css']
})


export class AttendanceListComponent implements OnInit {
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  years=[];
  month = [ "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December" ];
  // public dtOptions: DataTables.Settings = {};
  filterForm:FormGroup
  attendanceTable: any;
  employees: any;
  submitLoader: boolean = false
  userType:any;
  constructor( private fb:FormBuilder, public _service:AllModulesService,private http: HttpClient) { }

  ngOnInit(): void {
    this.userType=localStorage.getItem('type')
    this.getYears();
    this.getEmployees();
    let year = new Date().getFullYear();
    let month = new Date().getMonth();
    this.filterForm = this.fb.group({
      employee:['',Validators.required],
      year:[year,Validators.required],
      month:[this.month[month],Validators.required],
      inactive:['']
    })
  }



  exportToExcel(){
     const ws: xlsx.WorkSheet =  xlsx.utils.table_to_sheet(this.epltable.nativeElement);
     const wb: xlsx.WorkBook = xlsx.utils.book_new();
     xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    //  for (var i = 0; i < sheetName.length; i++) {
    //    const ws: xlsx.WorkSheet = xlsx.utils.json_to_sheet(arr[i]);
    //    xlsx.utils.book_append_sheet(wb, ws, sheetName[i]);
    //  }
     // ws['!cols'][11] = { hidden: false};
     
     xlsx.writeFile(wb, 'AttendanceList.xlsx');
   }

   downloadAsPDF(sectionToPrint){
    const printContents = document.getElementById(sectionToPrint).innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print()
    document.body.innerHTML = originalContents;
  }
  getYears(){
    let startYear;
    let currentYear = new Date().getFullYear();
    startYear = startYear || 2010;  
    while ( startYear <= currentYear ) {
    this.years.push(startYear++);
    }   
  }

  getAttendance(){
// console.log(this.filterForm)
    if (this.filterForm.status =="INVALID"){
      this.filterForm.markAllAsTouched();
    }
   else{
      this.submitLoader = true
      let form = this.filterForm.value
      let data={
        month:form.month,
        year: form.year,
        employeeNo: form.employee,
      }
    let params = new HttpParams();
    params = params.append('year', form.year);
    params = params.append('month', form.month);
    params = params.append('employeeNo', form.employee);
    let url ='getAttendanceStatusReportbyYearAndDate?year='+`${form.year}`+'&month='+`${form.month}`+'&employeeNo='+`${form.employee}`
    this._service.get(url).subscribe((data) => {
      this.submitLoader = false
      this.attendanceTable = data;
      console.log(data)
    })
   }
}
 
getEmployees(){
  //   this._service.get("employee_master/getemployees").subscribe((data) => {
//     this.employees = data;
    
// })

if(this.userType=='Admin' || this.userType=='Super Admin'){

  let url='getAllActiveEmployees'
  this._service.get(url).subscribe(res=>{
  this.employees=res
  }) 
}else{
  this.employees=[];
    let myemp=[];
    let id = localStorage.getItem('empid')
    let url = "getemployeesListByThere-RM1-RM2-Self?employeeId=" + id;
    this._service.get(url).subscribe((res) => {
      console.log(res);
      // console.log(">>>>>"+res.employeeId);
      res.forEach(element => {
        console.log(element);
        this.employees.push({ "employeeId": element.employeeId, "employeeCode": element.employeeCode, "firstName": element.firstName, "lastName": element.lastName });
        console.log(">>>>>" + this.employees[0].employeeId);
      });
    });

  }
}
  
updateAttendance(){
  let form = this.filterForm.value
  let data={
month:form.month,
year: form.year,
employeeNo: form.employee,
  }
  let url ='updateAttendanceStatusReports?year='+`${form.year}`+'&month='+`${form.month}`+'&employeeNo='+`${form.employee}`
  this._service.add(data,url ).subscribe((res)=>{

  })
}
getEmployees1(event){
  console.log(event)
  console.log(this.filterForm.value.inactive)
  if(this.filterForm.value.inactive==true){
    console.log('active')
  let url='getAllInActiveEmployees'
    
    this._service.get(url).subscribe((res)=>{
    this.employees=res
    })
}
else if(this.filterForm.value.inactive==false){
  console.log('inactive')
  let url='getAllActiveEmployees'
  this._service.get(url).subscribe(res=>{
  this.employees=res
  }) 
  
}
else{

}

}
}
