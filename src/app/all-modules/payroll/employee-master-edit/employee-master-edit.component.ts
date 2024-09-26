import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { AllModulesService } from '../../all-modules.service';
import { EmployeeMasterEditFormComponent } from '../employee-master-edit-form/employee-master-edit-form.component';

@Component({
  selector: 'app-employee-master-edit',
  templateUrl: './employee-master-edit.component.html',
  styleUrls: ['./employee-master-edit.component.css']
})
export class EmployeeMasterEditComponent implements OnInit {
  masterEditForm:FormGroup
  employees: any;
  tableData: any;
  data: any;
  path=environment.apiEndpoint;
  array: any=[];
  employee1: any;
  selected: string;
  constructor(
    public _fb:FormBuilder,
    public _service:AllModulesService,
    public router:Router,

    ) { }

  ngOnInit(): void {
    this.masterEditForm = this._fb.group({
      empId:['',Validators.required]
    })
    this.loadEmployee()
  }

  loadEmployee() {
    
    this._service.get("employee_master/getemployees").subscribe((data) => {
        this.employees = data;
    });

    }
    formReset(){
      const currentRoute = this.router.url;

      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([currentRoute]); 
      }); 
    }
  
    onChange(){
      console.log(this.selected)
      let emp=this.selected.split(" ");
let emply=this.employees.filter((emply)=>
(emply.employeeCode == emp[0]))
console.log(emply)
let url = 'getDisplayCurrentSalarybyemployeeId1/'+emply[0].employeeId
this._service.get(url).subscribe((res)=>{
this.tableData= res
})
this._service.get('employee_master/getemployee/'+emply[0].employeeId).subscribe((res)=>{
this.data= res
})


    }
    edit(type){
      this.router.navigate(['/layout/payroll/employeeMasterEditForm/'+type])
    }

    delete(id){
      let url="deleteDisplayCurrentSalary/"+id
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
          this._service.get(url).subscribe((res)=>{
            console.log(res)
            if(res.respose == 'Success'){
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
            this.router.navigateByUrl("/layout/payroll/employeeMasterEdit");
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
      
        
      })
  
    }
    reset(){

    }

    getEmpList(event){
 
      console.log(event)
      
      this.array.push(event)
      console.log(this.array)
      let form=this.masterEditForm.value
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
    this.onChange();
    }
}
