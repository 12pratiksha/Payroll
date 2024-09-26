import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AllModulesService } from '../../all-modules.service';

@Component({
  selector: 'app-salary-slip-remarks-form',
  templateUrl: './salary-slip-remarks-form.component.html',
  styleUrls: ['./salary-slip-remarks-form.component.css']
})
export class SalarySlipRemarksFormComponent implements OnInit {
  employees: any;
  month =  [ "January", "February", "March", "April", "May", "June",
   "July", "August", "September", "October", "November", "December" ];
  year =  [ 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025 ];
  salarySlipForm: FormGroup
   constructor(
     public _service:AllModulesService,
     public _fb:FormBuilder,
     public router:Router,
   ) { }
 
   ngOnInit(): void {
     this.loadEmployee();
     this.salarySlipForm = this._fb.group({
       empId:['',Validators.required],
       remark:['',Validators.required],
       month:'',
       year:'',
     })
   }
   loadEmployee() {
     
     //this.HttpClient.get(this.path+"company/getCompanyList", {headers:headers}).subscribe(data=>{
     this._service.get("employee_master/getemployees").subscribe((data) => {
       // JSON.parse(data)
     
       this.employees = data;});
     }
     cancel(){
      this.salarySlipForm.reset();
     }
     showTable(){
      this.router.navigate(['/layout/payroll/salaryDueRemarks'])
     }
 }