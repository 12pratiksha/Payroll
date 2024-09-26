import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AllModulesService } from '../../all-modules.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import * as xlsx from 'xlsx';

@Component({
  selector: 'app-employee-leave-application-report',
  templateUrl: './employee-leave-application-report.component.html',
  styleUrls: ['./employee-leave-application-report.component.css']
})
export class EmployeeLeaveApplicationReportComponent implements OnInit {
@ViewChild('epltable', { static: false }) epltable: ElementRef;
filterForm:FormGroup;
  dtOptions: { pagingType: string; pageLength: number; processing: boolean; dom: string; buttons: string[]; };
  branch: any;
  data: any;
  department: any;
  category: any;
  state: any;
  employees: any;
  companyName: string;
  address: string;
  tod: string;
  fromd: string;
  imageName: string;
  data1: any;
  data2: any;
  constructor(public fb:FormBuilder,public service:AllModulesService,public datePipe:DatePipe) {  this.data=[];
    this.data1=[];
    this.data2=[];}

  ngOnInit(): 
 
    void{ this.filterForm=this.fb.group({
    employeeId:[''],
    fromDate:['',Validators.required],
    toDate:['',Validators.required],
    branch:[''],
    category:[''],
    department:[''],
    state:[''],
    status:[''],
    type:['']
  })

  this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 10,
    processing: true,
    dom: 'Bfrtip',
    buttons: [
          'copy', 'csv', 'excel', 'print'
      ]
  };


  this.getBranch();
  this.getCategory();
  this.getDepartment();
  this.getEmployee();
  this.getState();
  this.getCompanyDetails();
}

exportToExcel(){
    
  const ws: xlsx.WorkSheet =  xlsx.utils.table_to_sheet(this.epltable.nativeElement);
  const wb: xlsx.WorkBook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
  xlsx.writeFile(wb, 'PFRegisterReport.xlsx');
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
getBranch(){
  let url='branch/getBranchList'
  this.service.get(url).subscribe((res)=>{
    this.branch=res
  })
}
search(){
  this.companyName=localStorage.getItem('companyName')
  this.address=localStorage.getItem('address')
  let form=this.filterForm.value
  let fromd=this.datePipe.transform(form.fromDate,"yyyy-MM-dd")
  let tod=this.datePipe.transform(form.toDate,"yyyy-MM-dd")
  this.fromd=this.datePipe.transform(form.fromDate,"dd/MM/yyyy")
  this.tod=this.datePipe.transform(form.toDate,"dd/MM/yyyy")
  if(this.filterForm.status=='VALID'){
    if(form.type==1){
  let url='EmployeeLeaveApplicationReport?fromDate='+fromd+'&toDate='+tod+'&state='+form.state+'&status='+form.status+'&employeeNo='+form.employeeId+'&category='+form.category+'&department='+form.department+'&branch='+form.branch+'&leaveType='+form.type
  this.service.get(url).subscribe((res)=>{
    this.data=res;
    this.data1=[];
    this.data2=[];
  })
}
else if(form.type==2){
  let url='EmployeeLeaveApplicationReport?fromDate='+fromd+'&toDate='+tod+'&state='+form.state+'&status='+form.status+'&employeeNo='+form.employeeId+'&category='+form.category+'&department='+form.department+'&branch='+form.branch+'&leaveType='+form.type
  this.service.get(url).subscribe((res)=>{
    this.data1=res;
    this.data=[];
    this.data2=[];

  })
}
else{
  let url='EmployeeLeaveApplicationReport?fromDate='+fromd+'&toDate='+tod+'&state='+form.state+'&status='+form.status+'&employeeNo='+form.employeeId+'&category='+form.category+'&department='+form.department+'&branch='+form.branch+'&leaveType='+form.type
  this.service.get(url).subscribe((res)=>{
    this.data2=res;
    this.data1=[];
    this.data=[];
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
   
      this.imageName=res[0].backImageName+""+res[0].logoImageName
    
    console.log(this.imageName)
  })
}

}
