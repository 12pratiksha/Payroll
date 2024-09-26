import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AllModulesService } from '../../all-modules.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-punchdetails',
  templateUrl: './punchdetails.component.html',
  styleUrls: ['./punchdetails.component.css']
})
export class PunchdetailsComponent implements OnInit {
  filterForm:FormGroup;
  employees: any;
  companyName: string;
  address: string;
  fromd: string;
  tod: string;
  data: any;
  array: any=[];
  employee1: any;
  selected: string;
  branch: any;
  branchName: any;
  branchId: any;
  constructor(public fb:FormBuilder,public service:AllModulesService ,public datePipe:DatePipe) { }

  ngOnInit(): void {
    this.branchId=localStorage.getItem('branchId')
    this.filterForm=this.fb.group({
      fromDate:[''],
      toDate:[''],
      employeeId:['']

    })
    this.getEmployee();
    this.getBranch();
  }

  getEmployee(){
    let url='employee_master/getemployees'
    this.service.get(url).subscribe((res)=>{
      this.employees=res
    })
  }
  
  getBranch(){
    let url='branch/getBranchList'
    this.service.get(url).subscribe((res)=>{
    this.branch=res
    if(this.branchId!=0 ){
    let result=this.branch.filter((bran:any)=>
    bran.id==this.branchId)
    console.log(result)
    if(result.length!=0){
    this.branchName=result[0].branchName
    console.log(this.branchName)
    }
    }
    })
  }

  search(){
    Swal.fire({
      title: 'Loading...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading()
      }
    })
    this.companyName=localStorage.getItem('companyName')
    this.address=localStorage.getItem('address')
    let form=this.filterForm.value
    let fromd=this.datePipe.transform(form.fromDate,"yyyy-MM-dd")
    let tod=this.datePipe.transform(form.toDate,"yyyy-MM-dd")
    this.fromd=this.datePipe.transform(form.fromDate,"dd-MM-yyyy")
    this.tod=this.datePipe.transform(form.toDate,"dd-MM-yyyy")
    if(this.filterForm.status=='VALID'){

      this.data='';
        if(this.filterForm.value.employeeId){
          let emp=this.filterForm.value.employeeId.split(" ");
         let emply=this.employees.filter((emply)=>
         (emply.employeeCode == emp[0]))
         console.log(emply)
    let url='getPunchInAndPunchOutTimeReport?fromDate='+fromd+'&toDate='+tod+'&employeeId='+emply[0].employeeId
    this.service.get(url).subscribe((res)=>{
      this.data=res;
      if(this.data){
      Swal.fire({
        icon: 'success',
        title: '',
        showConfirmButton: false,
        timer: 1500,
        didOpen: () => {
          Swal.hideLoading()
        }
      })
      }
      else{
        Swal.fire({
          icon: 'success',
          title: '',
          text: "No data available in table",
          didOpen: () => {
            Swal.hideLoading()
          }
         })
      }
    })
  }
  else{
    let url='getPunchInAndPunchOutTimeReport?fromDate='+fromd+'&toDate='+tod+'&employeeId='+''
    this.service.get(url).subscribe((res)=>{
      this.data=res;
      if(this.data){
        Swal.fire({
          icon: 'success',
          title: '',
          showConfirmButton: false,
          timer: 1500,
          didOpen: () => {
            Swal.hideLoading()
          }
        })
      }
      else{
          Swal.fire({
            icon: 'success',
            title: '',
            text: "No data available in table",
            didOpen: () => {
              Swal.hideLoading()
            }
          })
      }
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
