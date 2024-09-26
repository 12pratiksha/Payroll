import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { AllModulesService } from '../../all-modules.service';
import { DatePipe } from '@angular/common';
import * as xlsx from 'xlsx';
import Swal from 'sweetalert2';
import { SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-daily-attendenance-report',
  templateUrl: './daily-attendenance-report.component.html',
  styleUrls: ['./daily-attendenance-report.component.css']
})
export class DailyAttendenanceReportComponent implements OnInit {
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  filterForm:FormGroup;
  employees: any;
  state: any;
  category: any;
  department: any;
  branch: any;
  dtOptions: { pagingType: string; pageLength: number; processing: boolean; dom: string; buttons: string[]; };
  data: any;
  companyName: any;
  address: string;
  fromd: string;
  tod: any;
  imageName: any;
  public backgroundImg:SafeStyle
  array: any=[];
  employee1: any;
  selected: string;
  branchName: any;
  branchId: any;
 
  constructor(public fb:FormBuilder,public service:AllModulesService,private datePipe: DatePipe) { 
    this.getEmployee();
  }

  ngOnInit(): void {
    this.branchId=localStorage.getItem('branchId')
    this.filterForm=this.fb.group({
      employeeId:[''],
      fromDate:['',Validators.required],
      toDate:['',Validators.required],
      state:[''],
      category:[''],
      department:[''],
      branch:[''],
      status:[''],
    })
    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 10,
    //   processing: true,
    //   dom: 'Bfrtip',
    //   buttons: [
    //         'copy', 'csv', 'excel', 'print'
    //     ]
    // };
    this.getCategory();
    this.getDepartment();
   
    this.getState();
    this.getBranch();
    this.getCompanyDetails();
  }

  exportToExcel(){
    
     const ws: xlsx.WorkSheet =  xlsx.utils.table_to_sheet(this.epltable.nativeElement);
     const wb: xlsx.WorkBook = xlsx.utils.book_new();
     xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
     xlsx.writeFile(wb, 'DailyAttendanceReport.xlsx');
   }

   downloadAsPDF(sectionToPrint){
    const printContents = document.getElementById(sectionToPrint).innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print()
    document.body.innerHTML = originalContents;
   }

getEmployee(){
  let url='employee_master/getemployees'
  this.service.get(url).subscribe((res)=>{
    this.employees=res
  })
}
getState(){
  let url='state/getStateList'
  this.service.get(url).subscribe((res)=>{
    this.state=res
  })
}
getCategory(){
  let url='categories/getCategories'
  this.service.get(url).subscribe((res)=>{
    this.category=res
  })
}
getDepartment(){
  let url='getAllDepartment'
  this.service.get(url).subscribe((res)=>{
    this.department=res
  })
}

onChange(event){
  console.log(event.target.value)
  let id=event.target.value
  let url='getAllDepartmentBybranchId/'+id
  this.service.get(url).subscribe((res)=>{
    this.department=res
  })
}

getBranch(){
  let url='branch/getBranchList'
  this.service.get(url).subscribe((res)=>{
  this.branch=res
  if(this.branchId!=0){
  let result=this.branch.filter((bran:any)=>
  bran.id==this.branchId)
  if(result.length!=0){
  this.branchName=result[0].branchName
  console.log(this.branchName)
  }
  }
  })
}
search(){
  let branchStatus=localStorage.getItem('branchStatus')
  let branchId=localStorage.getItem('branchId')
  this.companyName=localStorage.getItem('companyName')
  this.address=localStorage.getItem('address')
  let form=this.filterForm.value
  this.fromd=this.datePipe.transform(form.fromDate,"dd/MM/yyyy")
  this.tod=this.datePipe.transform(form.toDate,"dd/MM/yyyy")
  let fromd=this.datePipe.transform(form.fromDate,"yyyy-MM-dd")
  let tod=this.datePipe.transform(form.toDate,"yyyy-MM-dd")
  if(this.filterForm.status=='VALID'){
    if(this.filterForm.value.employeeId && branchStatus=='true' && form.branch==''){
      let emp=this.filterForm.value.employeeId.split(" ");
      let emply=this.employees.filter((emply)=>
      (emply.employeeCode == emp[0]))
      console.log(emply)
      let url='getDailyAttendenceReport?fromDate='+fromd+'&toDate='+tod+'&state='+form.state+'&status='+form.status+'&employeeNo='+emply[0].employeeId+'&category='+form.category+'&department='+form.department+'&branch='+branchId
      this.service.get(url).subscribe((res)=>{
      this.data=res;
      })
    }
    else if(this.filterForm.value.employeeId && branchStatus=='true' && form.branch!=''){
      let emp=this.filterForm.value.employeeId.split(" ");
      let emply=this.employees.filter((emply)=>
      (emply.employeeCode == emp[0]))
      console.log(emply)
      let url='getDailyAttendenceReport?fromDate='+fromd+'&toDate='+tod+'&state='+form.state+'&status='+form.status+'&employeeNo='+emply[0].employeeId+'&category='+form.category+'&department='+form.department+'&branch='+form.branch
      this.service.get(url).subscribe((res)=>{
      this.data=res;
      })
    }
    else if(this.filterForm.value.employeeId && branchStatus=='false'){
      let emp=this.filterForm.value.employeeId.split(" ");
      let emply=this.employees.filter((emply)=>
      (emply.employeeCode == emp[0]))
      console.log(emply)
      let url='getDailyAttendenceReport?fromDate='+fromd+'&toDate='+tod+'&state='+form.state+'&status='+form.status+'&employeeNo='+emply[0].employeeId+'&category='+form.category+'&department='+form.department+'&branch='+form.branch
      this.service.get(url).subscribe((res)=>{
      this.data=res;
      })
    }
    else if(this.filterForm.value.employeeId==undefined && branchStatus=='true' && form.branch!=''){
      let url='getDailyAttendenceReport?fromDate='+fromd+'&toDate='+tod+'&state='+form.state+'&status='+form.status+'&employeeNo='+''+'&category='+form.category+'&department='+form.department+'&branch='+form.branch
      this.service.get(url).subscribe((res)=>{
      this.data=res;
      })
    }
    else if(this.filterForm.value.employeeId==undefined && branchStatus=='true' && form.branch==''){
      let url='getDailyAttendenceReport?fromDate='+fromd+'&toDate='+tod+'&state='+form.state+'&status='+form.status+'&employeeNo='+''+'&category='+form.category+'&department='+form.department+'&branch='+branchId
      this.service.get(url).subscribe((res)=>{
      this.data=res;
      })
    }
    else{
      let url='getDailyAttendenceReport?fromDate='+fromd+'&toDate='+tod+'&state='+form.state+'&status='+form.status+'&employeeNo='+''+'&category='+form.category+'&department='+form.department+'&branch='+form.branch
      this.service.get(url).subscribe((res)=>{
      this.data=res;
      })
    }
  }
  else{
  Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: "Something went wrong",
  })
  }
}

getCompanyDetails(){
  let url="getAllCompanyInformationList"
  this.service.get(url).subscribe((res)=>{
  console.log(res)
  this.imageName=[];
  this.imageName=res[0].backImageName+""+res[0].logoImageName
    console.log(this.imageName)
  })
}

getEmpList(event){
  console.log(event)
  this.array.push(event)
  console.log(this.array)
  let form=this.filterForm.value
  if(this.array.length >=2){
  let data=form.employeeId.toLowerCase()
  let url='employees/search?employeeName='+`${data}`
  // let url='employees/search?employeeName='+`${form.employeeId}`
  this.service.get(url).subscribe((res)=>{
  this.employee1=res.data
  })
}
}


displayEmp(data,name,last){
console.log(data,name,last)
this.selected=[data] +" "+ name +" "+ last; 

}
}