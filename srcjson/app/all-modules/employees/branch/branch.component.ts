import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2';
import { AllModulesService } from '../../all-modules.service';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit {
  customPatterns = {
    V: { pattern: new RegExp("-?") },
    "0": { pattern: new RegExp("[0-9]") },
  };
  submitLoader : boolean = false
  showMyContainer:boolean=false;
  branchMasterForm: FormGroup
  branch: any;
  statesList: any;
  cityList: any;
  editId: any;
  update:boolean=false;
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  dtOptions: any = {};
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  loader = true
  logo: any;
  baseurl: string;
  constructor( private srvModuleService: AllModulesService, public fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.baseurl=localStorage.getItem('baseurl');
this.getCityList()
    this.getBranchList();
    this.getStateList();
    this.branchMasterForm = this.fb.group({
      stateName:['',Validators.required],
      branchName:['',Validators.required],
      branchCode: ['',Validators.required],
      address: [''],
      telePhoneNo:[''],
      emailId:['',[Validators.pattern(this.emailPattern)]],
      branchCity:[''],
      status: ['true'],
      logoImageName:['']
     
    })
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'print', 
        ]
    };
  }

  onChange(event, type){
    let file=event.target.files[0]
    console.log(file)
    const formData = new FormData();
  formData.append('file', file);
  console.log(formData)
  if(type == 'logo'){
    this.srvModuleService.uploadFile(formData,"Branch/uploadlogo").subscribe((res)=>{
    this.logo = res.data[0].logoImageName
    this.branchMasterForm.get('logoImageName').setValue(res.data[0].logoImageName);
    //this.branchMasterForm.controls['logoImageName'].setValue(this.logo );

    })
  }
 
  }

  showContainer(){
    this.showMyContainer=true;
  }
  hideMyContainer(){
    const currentRoute = this.router.url;

      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([currentRoute]); // navigate to same route
      })
  }
  getCity(event){
    console.log(event)
    let url = "Branch/getByStateName?stateName="+event
    this.srvModuleService.get(url).subscribe((res)=>{
      console.log(res)
    })
  }
  cancel(){
    const currentRoute = this.router.url;

      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([currentRoute]); // navigate to same route
      })
  }

  getBranchList(){


this.srvModuleService.get('branch/getBranchList')
.subscribe((res)=>{


this.branch = res

this.loader = false
},(error)=>{
    
  this.loader = false

  alert("Something Went Wrong")
})

  }

  getStateList(){
    this.srvModuleService.get('state/getStateList').subscribe((res)=>{
  
  this.statesList = res

    })
  
  }

  getCityList(){
    this.srvModuleService.get('city/getCityList').subscribe((res)=>{
  
  this.cityList = res

    })
  
  }

addBranch(){
this.update=false
  let form = this.branchMasterForm.value
  let email = this.branchMasterForm.get('emailId')



console.log(this.branchMasterForm)

if(this.branchMasterForm.valid ){
  this.submitLoader = true 

  this.srvModuleService.add(form, 'branch/insertBranch').subscribe((res)=>{
    if(res.respose == "Success"){
      Swal.fire({
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })
      this.submitLoader = false
      const currentRoute = this.router.url;

      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([currentRoute]); // navigate to same route
      }); 
    }
    else if(res.respose == "Already"){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Record Already Exists',
      })
      this.submitLoader = false
     }
     else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
    
      })
      this.submitLoader = false
     }
  })
  
}
else{
   
Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: 'Something went wrong!',
})
this.submitLoader = false
this.branchMasterForm.markAllAsTouched();
}
}
edit(id){
  this.editId=id
  let url = 'branch/getBranch/'+`${id}`
  this.srvModuleService.get(url).subscribe((res)=>{

    this.branchMasterForm.get('stateName').setValue(res.stateName)
    this.branchMasterForm.get('branchName').setValue(res.branchName)
    this.branchMasterForm.get('branchCode').setValue(res.branchCode)
    this.branchMasterForm.get('address').setValue(res.address)
    this.branchMasterForm.get('telePhoneNo').setValue(res.telePhoneNo)
    this.branchMasterForm.get('emailId').setValue(res.emailId)
    this.branchMasterForm.get('branchCity').setValue(res.branchCity)
    this.branchMasterForm.get('status').setValue(res.status)
    this.branchMasterForm.get('logoImageName').setValue(res.logoImageName)
    this.logo=res.logoImageName;
  })
  this.showMyContainer=true
  this.update=true
}
updateBranch(){
console.log(this.logo);
  if(this.branchMasterForm.valid){
    this.branchMasterForm.get('logoImageName').setValue(this.logo);
  let form = this.branchMasterForm.value
  
  this.submitLoader = true 
  console.log(this.branchMasterForm);

   let url = "branch/updateBranch/"+`${this.editId}`
  this.srvModuleService.add(form, url).subscribe((res)=>{
    
  this.submitLoader = false
    if(res.respose == "Success"){
      Swal.fire({
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })
      const currentRoute = this.router.url;

      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([currentRoute]); // navigate to same route
      }); 
    }
    else if(res.respose == "Already"){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Record Already Exists',
    
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
this.branchMasterForm.markAllAsTouched();
}
}
delete(id){

  let url = 'branch/deleteBranch/'+`${id}`
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
      Swal.fire({
        title: 'Loading...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading()
        }
      })
      this.srvModuleService.get(url).subscribe((res)=>{
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
