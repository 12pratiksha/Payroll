import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ConfirmedValidator } from '../users-form/confirmed.validator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AllModulesService } from '../../all-modules.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-adminchangepassword',
  templateUrl: './adminchangepassword.component.html',
  styleUrls: ['./adminchangepassword.component.css']
})
export class AdminchangepasswordComponent implements OnInit {
  public changePasswordForm: FormGroup
  submitLoader: boolean=false;
  employees: any;
  userType: string;
  // confirmPassword:any;
  // password:any
  constructor(
    public _service:AllModulesService,
    private fb: FormBuilder,
    public _activatedroute: ActivatedRoute,
    public router: Router,
  ) { }

  ngOnInit(): void {
   
    this.userType=localStorage.getItem('type')
     this.changePasswordForm = this.fb.group({
      employee:[''],
      password:['',Validators.required, Validators.minLength(6)],
     confirmPassword:['',Validators.required,  Validators.minLength(6)]
     },
     {
      validator: ConfirmedValidator('password', 'confirmPassword')
     }
     )
     this.getAllEmployee();
  }
  getAllEmployee(){
   
      this._service.get("employee_master/getemployees").subscribe((data) => {
    this.employees = data;
    console.log(this.employees)
  });
  }

  update(){
    let empid=localStorage.getItem('empid')
    let forms = this.changePasswordForm.value
    console.log(forms)
    // let empId=forms.employee
    // console.log(empId)
    let pass=this.changePasswordForm.controls.confirmPassword.value
    let conpass=this.changePasswordForm.controls.password.value
    console.log(pass,conpass)
    console.log(this.changePasswordForm.controls.password.value)
   
    if(this.usertype=='Admin' || usertype=='Super Admin'){
      if(pass==conpass){
        let empId=localStorage.getItem('empid')
        let url="updateEmployeePassword?password="+pass+"&confirmPassword="+conpass+"&employeeId="+empId
        this._service.get(url).subscribe((res)=>{
          this.submitLoader = false
            if(res.respose=="Success"){
              Swal.fire({
                icon: 'success',
                title: 'Password Updated Successfully',
                showConfirmButton: false,
                timer: 1500
              })

              this.router.navigateByUrl('/layout/dashboard/admin')
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
          console.log(this.changePasswordForm)
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            
          })
        }

    }else{
  
    
   
    if(pass==conpass){
    let url="updateEmployeePassword?password="+pass+"&confirmPassword="+conpass+"&employeeId="+empid
    this._service.get(url).subscribe((res)=>{
      this.submitLoader = false
        if(res.respose=="Success"){
          Swal.fire({
            icon: 'success',
            title: 'Password Updated Successfully',
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigate(['/layout/dashboard/employee'])
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
      console.log(this.changePasswordForm)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        
      })
    }
  
  }
  }
  cancel(){
  this.router.navigateByUrl('/layout/dashboard/admin')
  }
}
