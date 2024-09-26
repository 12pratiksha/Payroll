import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AllModulesComponent } from '../../all-modules.component';
import { AllModulesService } from '../../all-modules.service';

@Component({
  selector: 'app-salary-due-remarks-form',
  templateUrl: './salary-due-remarks-form.component.html',
  styleUrls: ['./salary-due-remarks-form.component.css']
})
export class SalaryDueRemarksFormComponent implements OnInit {
  employees: any;
 month =  [ "January", "Feburary", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December" ];
 year =  [ 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025 ];
 salaryDueForm: FormGroup
  array: any=[];
  employee1: any;
  selected: any;
  constructor(
    public _service:AllModulesService,
    public _fb:FormBuilder,
    public router:Router,
  ) { }

  ngOnInit(): void {
    this.loadEmployee();
    this.salaryDueForm = this._fb.group({
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
    showTable(){
      this.router.navigate(['/layout/payroll/salaryDueRemarks'])
     }
     submit(){
        let emp=this.salaryDueForm.value.empId.split(" ");
  let emply=this.employees.filter((emply)=>
  (emply.employeeCode == emp[0]))
  console.log(emply)
     if(this.salaryDueForm.status=='VALID'){
      let form = this.salaryDueForm.value
      console.log(form)
      let url = 'updateRemark?remark='+form.remark+'&year='+form.year+'&month='+form.month+'&employeeId='+emply[0].employeeId
      this._service.get(url).subscribe((res)=>{
        console.log(res)
      })
     }
     }
     cancel(){
      
     }
     getEmpList(event){
 
      console.log(event)
      
      this.array.push(event)
      console.log(this.array)
      let form=this.salaryDueForm.value
      if(this.array.length >=2){
        let data=form.empId.toLowerCase() 
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
