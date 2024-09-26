import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AllModulesService } from '../../all-modules.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-role-master-form',
  templateUrl: './role-master-form.component.html',
  styleUrls: ['./role-master-form.component.css']
})
export class RoleMasterFormComponent implements OnInit {
  roleForm:FormGroup
  editId: any;
  company: any;
  dataDisplay: any;
  dt: any;
  constructor(public _fb:FormBuilder, public router:Router, public _activatedroute:ActivatedRoute, public _service: AllModulesService,public http:HttpClient) { }

  ngOnInit(): void {
    // Swal.fire({
    //   title: 'Loading...',
    //   allowEscapeKey: false,
    //   allowOutsideClick: false,
    //   showConfirmButton: false,
    //   didOpen: () => {
    //     Swal.showLoading()
    //   }
    // });

    // Swal.fire({
         
    //   icon: 'success',
    //   title: 'Your work has been saved',
    //   showConfirmButton: false,
    //   timer: 1500,
    //   didOpen: () => {
    //     Swal.hideLoading()
    //   }
    // })
              
          

  this.getCompany()
  this.roleForm = this._fb.group({
    name:['',Validators.required],
    roleName:['',Validators.required],
    roleType:['',Validators.required],
    roleDescription:['',],
    status:[''],
  })
  console.log("''''''''''''''''''''"+this.roleForm)
  const routeParam = this._activatedroute.snapshot.params;
  
  this.editId = routeParam.id;
  
  if(this.editId != 'add'){
    this.edit();
  }

  }
  showTable(){
    this.router.navigate(['/layout/masters/roleMaster'])
  }
  getCompany(){
    this._service.get("getAllCompanyInformationList").subscribe((res)=>{
      this.company = res
      
    })
   
  }
  submit(){
  
if (this.roleForm.status == 'VALID'){
  let form = this.roleForm.value
  console.log(form)
  let data =  {
      companyName: form.name,
        roleType: form.roleType,
        roleName: form.roleName,
        roleDescription: form.roleDescription,
        status: form.status
 
      }

this._service.add(data, "addRoleMaster").subscribe((res)=>{
  console.log(res) 
  if (res.respose == 'Success'){
    Swal.fire({
     
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    })
    this.router.navigate(['layout/masters/roleMaster'])
  }
  else{
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Something went wrong!',
    timer: 1500
  })
}
})
}
else{
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Something went wrong!',
    timer: 1500
  })
  this.roleForm.markAllAsTouched();
}
  }
  edit(){
   
    this._service.get('getRoleMaster/'+this.editId).subscribe((res)=>{
    this.roleForm.get('name').setValue(res.companyName)
    this.roleForm.get('roleType').setValue(res.roleType)
    this.roleForm.get('roleName').setValue(res.roleName)
    this.roleForm.get('roleDescription').setValue(res.roleDescription)
    this.roleForm.get('status').setValue(res.status)
    })
   
  }
  update(){
    if (this.roleForm.status == 'VALID'){
      let form = this.roleForm.value

      let data =  {
            companyName: form.name,
            roleType: form.roleType,
            roleName: form.roleName,
            roleDescription: form.roleDescription,
            status: form.status
     
          }
          Swal.fire({
            title: 'Loading...',
            allowEscapeKey: false,
            allowOutsideClick: false,
            showConfirmButton: false,
            didOpen: () => {
              Swal.showLoading()
            }
          });
    let url = 'updateRoleMaster/'+this.editId
    this._service.add(data, url).subscribe((res)=>{
     console.log(data)
      if (res.respose == 'Success'){
        Swal.fire({
         
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500,
          didOpen: () => {
            Swal.hideLoading()
          }
        })
      }    

     else {Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        timer: 1500
      })
    }
    })
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        timer: 1500
      })
      this.roleForm.markAllAsTouched();
    }
  }
  cancel(){
    this.roleForm.reset();
    this.router.navigate(['/layout/masters/roleMaster'])
  }
}
