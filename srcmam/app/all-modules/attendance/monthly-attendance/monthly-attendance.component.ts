import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2';
import { AllModulesService } from '../../all-modules.service';
import * as xlsx from 'xlsx';

@Component({
  selector: 'app-monthly-attendance',
  templateUrl: './monthly-attendance.component.html',
  styleUrls: ['./monthly-attendance.component.css']
})
export class MonthlyAttendanceComponent implements OnInit {

  @ViewChild(DataTableDirective, { static: false })
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  public dtElement: DataTableDirective;
  dtOptions: any = {};
  employees: any;
  attendanceForm: FormGroup;
  showMyContainer:boolean = false;
  month = [ "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December" ];
  years=[]
  tableData: any;

  constructor(public _service:AllModulesService, public fb : FormBuilder, public service: AllModulesService, public router: Router) { } 

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
     
    };
    this.getAllEmployee();
    this.getTableData()
    let currentYear = new Date().getFullYear();
    for(let i = currentYear ; i >= currentYear - 9; i--){
      this.years.push(i)
    }
    let d = new Date();
let month = this.month[d.getMonth()];
  
this.attendanceForm = this.fb.group({
  employee:["", Validators.required],
  month:[month, Validators.required],
  year:[currentYear, Validators.required],
  attendance:["", Validators.required],
  // hr:["", Validators.required],

})


  }
  getAllEmployee(){
    this._service.get("employee_master/getemployees").subscribe((data) => {
      this.employees = data;
      console.log
    
      
    });
  }

  exportToExcel(){
    // const arr = [
    //  [{RevisedSumInsured:'', RepairType: '',IndictiveRenewalPremium:'',CustCode:''}],
    // ];
   
   // const sheetName = ["sheet1"];
     const ws: xlsx.WorkSheet =  xlsx.utils.table_to_sheet(this.epltable.nativeElement);
     const wb: xlsx.WorkBook = xlsx.utils.book_new();
     xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    //  for (var i = 0; i < sheetName.length; i++) {
    //    const ws: xlsx.WorkSheet = xlsx.utils.json_to_sheet(arr[i]);
    //    xlsx.utils.book_append_sheet(wb, ws, sheetName[i]);
    //  }
     // ws['!cols'][11] = { hidden: false};
     
     xlsx.writeFile(wb, 'monthlyTotalAttendance.xlsx');
   }
   downloadAsPDF(sectionToPrint){
    const printContents = document.getElementById(sectionToPrint).innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print()
    document.body.innerHTML = originalContents;
  }

submit(){
if(this.attendanceForm.valid){
  let form = this.attendanceForm.value
  let data = {
    month: form.month,
    year: form.year,
    monthlyAttendance: form.attendance,
   monthlyOt:  form.hr,
    employeeId: form.employee
 }
this.service.add(data, 'insertMonthlyTotalAttendance').subscribe((res)=>{
  if(res.respose == "Success"){
    Swal.fire({
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    })
    const currentRoute = this.router.url;

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentRoute]); 
    }); 
  }
  else if(res.respose == "Already"){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Record Already Exists!',
  
    })
   }
   else{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
  
    })
   }
  })
} 
else{
Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: 'Something went wrong!',

})
this.attendanceForm.markAllAsTouched()
}
}

getTableData(){
  this.service.get("getAllMonthlyTotalAttendanceList").subscribe((res)=>{
    this.tableData = res
    console.log(res)
    let empid=res.employee_id;
  })
}

  showContainer(){
this.showMyContainer = true
  }
  hideMyContainer(){  
    this.showMyContainer = false
  }
  delete(id){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
     
      if (result.isConfirmed) {
        
        this.service.delete(id,'deleteMonthlyTotalAttendance').subscribe((res)=>{
          Swal.fire({
            title: 'Loading...',
            allowEscapeKey: false,
            allowOutsideClick: false,
            showConfirmButton: false,
            didOpen: () => {
              Swal.showLoading()
            }
          })
  
          if(res.respose=="Success"){
            Swal.fire({
        
              icon: 'success',
              title: 'Employee Deleted Successfully',
              showConfirmButton: false,
              timer: 1500,
              didOpen: () => {
                Swal.hideLoading()
              }
            })
            const currentRoute = this.router.url;
  
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate([currentRoute]); 
            }); 
          }
          else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong',
              didOpen: () => {
                Swal.hideLoading()
              }
            })
          }
        })
      }
    })
  
  }
}
