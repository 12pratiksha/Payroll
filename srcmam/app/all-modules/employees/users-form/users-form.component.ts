import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AllModulesService } from '../../all-modules.service';
import { ConfirmedValidator } from './confirmed.validator';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css']
})
export class UsersFormComponent implements OnInit {
  customPatterns = {
    V: { pattern: new RegExp("-?") },
    "0": { pattern: new RegExp("[0-9]") },
  };
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  branch: any;
  submitLoader : boolean = false
  categories: any;
  departments: any;
  stateList: any;
  gradeArrray = [];
  cityList: any;
  userForm: FormGroup
  editId: any;
  datePipe = new DatePipe('en-US');
  myDate = new Date();
  
  error_messages = {
   
    'password': [
      { type: 'required', message: 'password is required.' },
      { type: 'minlength', message: 'password length.' },
      { type: 'maxlength', message: 'password length.' }
    ],
    'confirmpassword': [
      { type: 'required', message: 'password is required.' },
      { type: 'minlength', message: 'password length.' },
      { type: 'maxlength', message: 'password length.' }
    ],
  }
  grade: any;
  roles: any;
  role: any;
  constructor(
    public _service:AllModulesService,
    public _fb : FormBuilder,
    public _activatedroute: ActivatedRoute,
    public router: Router,
    
  ) { }

  ngOnInit(): void {
  
  
 this.userForm = this._fb.group({
  firstName:['',Validators.required],
  lastName:['',Validators.required],
  address:['',Validators.required],
  emailId:['',[Validators.pattern(this.emailPattern)]],
  mobileNumber:['',Validators.required],
  userName:['',Validators.required],
  password:['',Validators.required, Validators.minLength(6),],
  confirmPassword:['',Validators.required,  Validators.minLength(6),],
  state:['',Validators.required],
  branch:['',Validators.required],
  userType:['',Validators.required],
  role:['',Validators.required],
  type:['',Validators.required],
  middelName:'',
  status:'',
 },
 {
  validator: ConfirmedValidator('password', 'confirmPassword')
 }
 )
 const routeParam = this._activatedroute.snapshot.params;
 this.editId = routeParam.id;
 this.getBranch();
 this.getState();
 this.getCategories();
 this.department();
 this.getGrade();
 this.getCity();
 this.edit();
 this.getRole()
  }
 
  getBranch(){

    this._service.get('branch/getBranchList')
    .subscribe((res)=>{
    
    this.branch = res
    
    })
    
    }
  getCategories(){
    this._service.get('categories/getCategories').subscribe((res)=>{
      this.categories=res
    })
  }
  department(){
    this._service.get('getAllDepartment').subscribe((res)=>{
      this.departments=res
    })
  }
  getState(){

    this._service.get('state/getStateList')
    .subscribe((res)=>{
    
    // console.log(res )
    this.stateList = res
    
    })
    
    }

    getRole(){
      this._service.get('getAllRoleMaster').subscribe((res)=>{
        this.role = res
      })
    }

    
    getGrade(){
      this._service.get('getgetCodeByType?type=grade').subscribe((res)=>{
        this.grade = res
      })
    }


    getCity(){
      this._service.get('city/getCityList').subscribe((res)=>{
  
        this.cityList = res
    })
  }
  showTable(){
    this.router.navigate(['/layout/employees/user'])
  }
  cancel(){
    this.userForm.reset();
  }
  onChange(event){
    let url = "getfindByRoleType?roleType="+`${event}`
   this._service.get(url).subscribe((res)=>{
     this.roles =  res
   })
   }
  submit(){
    let forms = this.userForm.value
    console.log(this.userForm.controls.confirmPassword)
    console.log(this.userForm.controls.password)
   
    // let fromDate = this.datePipe.transform(forms.fromDate, 'yyyy-MM-dd');
    // let toDate = this.datePipe.transform(forms.toDate, 'yyyy-MM-dd');
  //  let date = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    if(this.userForm.status=="VALID" || this.userForm.status=="PENDING"){
      this.submitLoader = true 
      let data = {
        firstName: forms.firstName,
        middelName: forms.middelName,
        lastName: forms.lastName,
        addres: forms.address,
        mobileNumber: forms.mobileNumber,
        emailID: forms.emailId,
        userName: forms.userName,
        password: forms.password,
        confirmPassword: forms.confirmPassword,
        state: forms.state,
        branch: forms.branch,
        userType: forms.userType,
        roleType: forms.role,
        roleName: forms.type,
        status: forms.status
      }
      this._service.add(data, 'addUser').subscribe((res)=>{
        this.submitLoader = false
        if(res.respose=="Success"){
          Swal.fire({
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigate(['/layout/employees/user'])
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
    console.log(this.userForm)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        
      })
    }
  }

edit(){
  console.log(this.editId)
  if (this.editId=='add'){
return;
  }
  else{
this._service.get('getUserMaster/'+this.editId).subscribe((res)=>{
  let role = res.roleType
  let url = "getfindByRoleType?roleType="+`${role}`
  this._service.get(url).subscribe((res)=>{
    this.roles =  res
  })
this.userForm.get('firstName').setValue(res.firstName)
this.userForm.get('middelName').setValue(res.middelName)
this.userForm.get('lastName').setValue(res.lastName)
this.userForm.get('address').setValue(res.addres)
this.userForm.get('mobileNumber').setValue(res.mobileNumber)
this.userForm.get('emailId').setValue(res.emailID)
this.userForm.get('userName').setValue(res.userName)
this.userForm.get('password').setValue(res.password)
this.userForm.get('state').setValue(res.state)
this.userForm.get('branch').setValue(res.branch)
this.userForm.get('userType').setValue(res.userType)
this.userForm.get('role').setValue(res.roleType)
this.userForm.get('type').setValue(res.roleName)
this.userForm.get('status').setValue(res.status)
this.userForm.get('confirmPassword').setValue(res.confirmPassword)

})
  }
}
update(){
  let forms = this.userForm.value
  
  if(this.userForm.status=="VALID"){
    this.submitLoader = true 
    let data = {
      firstName: forms.firstName,
      middelName: forms.middelName,
      lastName: forms.lastName,
      addres: forms.address,
      mobileNumber: forms.mobileNumber,
      emailID: forms.emailId,
      userName: forms.userName,
      password: forms.password,
      confirmPassword: forms.confirmPassword,
      state: forms.state,
      branch: forms.branch,
      userType: forms.userType,
      roleType: forms.role,
      roleName: forms.type,
      status: forms.status
    }
    this._service.add(data, 'updateUserMaster/'+this.editId).subscribe((res)=>{
      this.submitLoader = false
      if(res.respose=="Success"){
        Swal.fire({
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
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
    this.userForm.markAllAsTouched();
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      
    })
  }
}
}

function MustMatch(arg0: string, arg1: string): any {
  throw new Error('Function not implemented.');
}
