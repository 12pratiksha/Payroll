import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AllModulesService } from '../../all-modules.service';
import * as xlsx from 'xlsx';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-bank-payment-details-report',
  templateUrl: './bank-payment-details-report.component.html',
  styleUrls: ['./bank-payment-details-report.component.css']
})
export class BankPaymentDetailsReportComponent implements OnInit {
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  filterForm:FormGroup;




  year = ["2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025"]
  months = [  { id: 'january', name: 'January' },
  { id: 'february', name: 'February' },
  { id: 'march', name: 'March ' },
  { id: 'april', name: 'April' },
  { id: 'may', name: 'May' },
  { id: 'june', name: 'June' },
  { id: 'july', name: 'July' },
  { id: 'august', name: 'August' },
  { id: 'september', name: 'September' },
  { id: 'october', name: 'October' },
  { id: 'november', name: 'November' },
  { id: 'december', name: 'December' },
]
  dtOptions: { pagingType: string; pageLength: number; processing: boolean; dom: string; buttons: string[]; };
  employees: any;
  state: any;
  category: any;
  department: any;
  branch: any;
  data: any;
  companyName: string;
  address: string;
  year1: any;
  month1: any;
  imageName: string;
  array: any=[];
  employee1: any;
  selected: any;
  branchName: any;
  branchId: any;
 
  constructor(public fb:FormBuilder, public service:AllModulesService, public datePipe:DatePipe) { 
  this.getBranch();
  }

  ngOnInit(): void{ 
    this.branchId=localStorage.getItem('branchId')
    this.filterForm=this.fb.group({
    employeeId:[''],
    year:['',Validators.required],
    month:['',Validators.required],
    branch:[''],
    category:[''],
    department:[''],
    state:[''],
    status:['']
  })

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
  xlsx.writeFile(wb, 'BankPaymentDetailsReport.xlsx');
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
  console.log(branchStatus)
  let form=this.filterForm.value
  console.log(this.filterForm.value.employeeId)
  this.month1=form.month 
  this.year1=form.year
  if(this.filterForm.status=='VALID'){
    if(this.filterForm.value.employeeId && branchStatus=='true' && form.branch==''){
      let emp=this.filterForm.value.employeeId.split(" ");
      let emply=this.employees.filter((emply)=>
      (emply.employeeCode == emp[0]))
      console.log(emply)
      let url='getBankPaymentDetailsReport?month='+form.month+'&year='+form.year+'&state='+form.state+'&status='+form.status+'&employeeNo='+emply[0].employeeId+'&category='+form.category+'&department='+form.department+'&branch='+branchId
      this.service.get(url).subscribe((res)=>{
      this.data=res;
      })
    }
    else if(this.filterForm.value.employeeId && branchStatus=='true' && form.branch!=''){
      let emp=this.filterForm.value.employeeId.split(" ");
      let emply=this.employees.filter((emply)=>
      (emply.employeeCode == emp[0]))
      console.log(emply)
      let url='getBankPaymentDetailsReport?month='+form.month+'&year='+form.year+'&state='+form.state+'&status='+form.status+'&employeeNo='+emply[0].employeeId+'&category='+form.category+'&department='+form.department+'&branch='+form.branch
      this.service.get(url).subscribe((res)=>{
      this.data=res;
      })
    }
    else if(this.filterForm.value.employeeId && branchStatus==undefined && form.branch!=''){
      let emp=this.filterForm.value.employeeId.split(" ");
      let emply=this.employees.filter((emply)=>
      (emply.employeeCode == emp[0]))
      console.log(emply)
      let url='getBankPaymentDetailsReport?month='+form.month+'&year='+form.year+'&state='+form.state+'&status='+form.status+'&employeeNo='+emply[0].employeeId+'&category='+form.category+'&department='+form.department+'&branch='+form.branch
      this.service.get(url).subscribe((res)=>{
      this.data=res;
      })
    }
    else{
      let url='getBankPaymentDetailsReport?month='+form.month+'&year='+form.year+'&state='+form.state+'&status='+form.status+'&employeeNo='+''+'&category='+form.category+'&department='+form.department+'&branch='+form.branch
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
