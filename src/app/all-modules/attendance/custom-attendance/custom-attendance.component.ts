import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { AllModulesService } from '../../all-modules.service';
import * as xlsx from 'xlsx';
import Swal from 'sweetalert2';
  

@Component({
  selector: 'app-custom-attendance',
  templateUrl: './custom-attendance.component.html',
  styleUrls: ['./custom-attendance.component.css']
})
export class CustomAttendanceComponent implements OnInit {
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  employees: any;
  filterForm: FormGroup
  attendanceTable: any;
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  dtOptions: any = {};
  array: any=[];
  employee1: any;
  selected: any;
  userType: string;
  constructor(public _service: AllModulesService, public fb:FormBuilder, ) { }

  ngOnInit(): void {
    this.userType=localStorage.getItem('type')
     this.getEmployees();
     this.filterForm = this.fb.group({
     employee:['',Validators.required],
     fromDate:['',Validators.required],
     toDate:['',Validators.required]
     })
  }

  exportToExcel(){
     const ws: xlsx.WorkSheet =  xlsx.utils.table_to_sheet(this.epltable.nativeElement);
     const wb: xlsx.WorkBook = xlsx.utils.book_new();
     xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
     xlsx.writeFile(wb, 'CustomeDailyAttendance(Normal).xlsx');
   }

  downloadAsPDF(sectionToPrint){
    const printContents = document.getElementById(sectionToPrint).innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print()
    document.body.innerHTML = originalContents;
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

  getAttendance(){
    var datePipe = new DatePipe('en-US');
    console.log(this.filterForm.value)
    console.log(this.filterForm.value.toDate)
    let fromDate = datePipe.transform(this.filterForm.value.fromDate,'yyyy-MM-dd');
    let toDate = datePipe.transform(this.filterForm.value.toDate,'yyyy-MM-dd');
   let data = {
    employeeNo:this.filterForm.value.employee,
    fromDate:fromDate,
    toDate:toDate
   }
   let url
   if(this.userType=='Admin'  && this.filterForm.status=='VALID')
   {
    let emp=this.filterForm.value.employee.split(" ");
      let emply=this.employees.filter((emply)=>
      (emply.employeeCode == emp[0]))
     url = 'getCustomDailyAttendenceList?toDate='+`${toDate}`+'&fromDate='+`${fromDate}`+'&employeeNo='+`${emply[0].employeeId}`
   }
   else{
    url = 'getCustomDailyAttendenceList?toDate='+`${toDate}`+'&fromDate='+`${fromDate}`+'&employeeNo='+`${this.filterForm.value.employee}`
   }
 
   this._service.get(url).subscribe((res)=>{
    this.attendanceTable= res
   })
  }

  getEmpList(event){
    console.log(event)
    this.array.push(event)
    console.log(this.array.key)
    let form=this.filterForm.value
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