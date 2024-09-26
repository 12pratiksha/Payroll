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
  
    onChange(event){
let url = 'getDisplayCurrentSalarybyemployeeId1/'+event
this._service.get(url).subscribe((res)=>{
this.tableData= res
})
this._service.get('employee_master/getemployee/'+event).subscribe((res)=>{
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
}
