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
  constructor(public fb:FormBuilder,public service:AllModulesService ,public datePipe:DatePipe) { }

  ngOnInit(): void {
    this.filterForm=this.fb.group({
      fromDate:[''],
      toDate:[''],
      employeeId:['']

    })
    this.getEmployee();
  }

  getEmployee(){
    let url='employee_master/getemployees'
    this.service.get(url).subscribe((res)=>{
      this.employees=res
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
    let url='getPunchInAndPunchOutTimeReport?fromDate='+fromd+'&toDate='+tod+'&employeeId='+form.employeeId
    this.service.get(url).subscribe((res)=>{
      this.data=res;
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
    Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: "Something went wrong",
   })
    }
  }

}
