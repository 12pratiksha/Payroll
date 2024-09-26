import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AllModulesService } from '../../all-modules.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import * as xlsx from 'xlsx'; 
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-employee-information-report',
  templateUrl: './employee-information-report.component.html',
  styleUrls: ['./employee-information-report.component.css']
})
export class EmployeeInformationReportComponent implements OnInit {
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  filterForm:FormGroup;
  dtOptions: { pagingType: string; pageLength: number; processing: boolean; dom: string; buttons: string[]; };
  employees: any;
  state: any;
  category: any;
  department: any;
  branch: any;
  data: any;
  companyName: string;
  address: string;
  fomd: string;
  tod: string;
  imageName: string;
  allColumns: string[] = ['Employee Code','Employee FullName','Religion','Gender','Type',
    'Department','Sub Department','DOB','Employement Date','Email','PAN No','Mobile','Pf No','Uan No','Adhaar Card No',
'Account No','Account Type','Bank Name','IFSC Code','Payment Method','Category','Blood Group','Age','Experience','PL'];
displayColumns: string[] = ['Employee Code','Employee FullName','Religion','Gender','Type',
  'Department','Sub Department','DOB','Employement Date','Email','PAN No','Mobile','Pf No','Uan No','Adhaar Card No',
'Account No','Account Type','Bank Name','IFSC Code','Payment Method','Category','Blood Group','Age','Experience','PL'];

// displayColumns: string[] = ['Employee Code','Employee FullName','First Name','Middle Name','Last Name','Gender','Experience','DOB',
//   'Employement Date','Email','State','Branch','Category','Department','SubDepartment','SubDepartment 1','SubDepartment 2','Designation',
// 'Paycader Name','Religion Name','Reporting Manager 1','Reporting Manager 2','Status'];
dataSource: MatTableDataSource<any>;
  columns: any=[];
  array: any=[];
  employee1: any;
  selected: string;
  branchName: any;
  branchId: any;
  constructor(public fb:FormBuilder,public service:AllModulesService,public datePipe:DatePipe) { }

  ngOnInit():  void{ 
    this.branchId=localStorage.getItem('branchId')
    this.filterForm=this.fb.group({
    employeeId:[''],
    // fromDate:['',Validators.required],
    // toDate:['',Validators.required],
    branch:[''],
    category:[''],
    department:[''],
    state:[''],
    status:['']
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
}
changeColumns(event){
  console.log(event.value)
  if(this.columns==null){
 this.allColumns=event.value
  }
  else{
    this.allColumns=event.value
  }

  
}
exportToExcel(){
    
  const ws: xlsx.WorkSheet =  xlsx.utils.table_to_sheet(this.epltable.nativeElement);
  const wb: xlsx.WorkBook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
  xlsx.writeFile(wb, 'EmployeeInformationReport.xlsx');
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
  Swal.fire({
    title: 'Loading...',
    allowEscapeKey: false,
    allowOutsideClick: false,
    showConfirmButton: false,
    didOpen: () => {
      Swal.showLoading()
    }
  })
  console.log(">>>>>1");
  this.companyName=localStorage.getItem('companyName')
  console.log(">>>>>2");
  this.address=localStorage.getItem('address')
  console.log(">>>>>3");
  let form=this.filterForm.value
  console.log(">>>>>4");
  let fromd=this.datePipe.transform(form.fromDate,"yyyy-MM-dd")
  let tod=this.datePipe.transform(form.toDate,"yyyy-MM-dd")
  this.fomd=this.datePipe.transform(form.fromDate,"dd/MM/yyyy")
  this.tod=this.datePipe.transform(form.toDate,"dd/MM/yyyy")
  console.log(">>>>>5");

  if(this.filterForm.status=='VALID'){
    if(this.filterForm.value.employeeId && branchStatus=='true' && form.branch==''){
      let emp=this.filterForm.value.employeeId.split(" ");
      let emply=this.employees.filter((emply)=>
      (emply.employeeCode == emp[0]))
      console.log(emply)
      let url='getEmployeInformationReport?state='+form.state+'&status='+form.status+'&employeeNo='+emply[0].employeeId+'&category='+form.category+'&department='+form.department+'&branch='+branchId
      this.service.get(url).subscribe((res)=>{
      console.log(">>>>>6"+res);
      this.data=res;
      this.dataSource=  new MatTableDataSource(this.data);
      Swal.fire({
          icon: 'success',
          title: '',
          showConfirmButton: false,
          timer: 1500,
          didOpen: () => {
             Swal.hideLoading()
          }
        })
      })
    }
    else if(this.filterForm.value.employeeId && branchStatus=='true' && form.branch!=''){
      let emp=this.filterForm.value.employeeId.split(" ");
      let emply=this.employees.filter((emply)=>
      (emply.employeeCode == emp[0]))
      console.log(emply)
      let url='getEmployeInformationReport?state='+form.state+'&status='+form.status+'&employeeNo='+emply[0].employeeId+'&category='+form.category+'&department='+form.department+'&branch='+form.branch
      this.service.get(url).subscribe((res)=>{
      console.log(">>>>>6"+res);
      this.data=res;
      this.dataSource=  new MatTableDataSource(this.data);
      Swal.fire({
         icon: 'success',
         title: '',
         showConfirmButton: false,
         timer: 1500,
         didOpen: () => {
           Swal.hideLoading()
          }
          })
       })
    }
    else if(this.filterForm.value.employeeId && branchStatus=='false'){
      let emp=this.filterForm.value.employeeId.split(" ");
      let emply=this.employees.filter((emply)=>
      (emply.employeeCode == emp[0]))
      console.log(emply)
      let url='getEmployeInformationReport?state='+form.state+'&status='+form.status+'&employeeNo='+emply[0].employeeId+'&category='+form.category+'&department='+form.department+'&branch='+form.branch
      this.service.get(url).subscribe((res)=>{
      console.log(">>>>>6"+res);
      this.data=res;
      this.dataSource=  new MatTableDataSource(this.data);
      Swal.fire({
         icon: 'success',
         title: '',
         showConfirmButton: false,
         timer: 1500,
         didOpen: () => {
           Swal.hideLoading()
          }
        })
      })
    }
    else{
      let url='getEmployeInformationReport?state='+form.state+'&status='+form.status+'&employeeNo='+''+'&category='+form.category+'&department='+form.department+'&branch='+form.branch
      this.service.get(url).subscribe((res)=>{
      console.log(">>>>>6"+res);
      this.data=res;
      this.dataSource=  new MatTableDataSource(this.data);
      Swal.fire({
         icon: 'success',
         title: '',
         showConfirmButton: false,
         timer: 1500,
         didOpen: () => {
           Swal.hideLoading()
          }
        })
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
onChange(event){
  console.log(event.target.value)
  let id=event.target.value
  let url='getAllDepartmentBybranchId/'+id
  this.service.get(url).subscribe((res)=>{
  this.department=res
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
