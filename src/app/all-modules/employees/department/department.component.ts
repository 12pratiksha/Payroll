import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2';
import { AllModulesService } from '../../all-modules.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  dtOptions: any = {};
  branch: any;
  submitLoader : boolean = false
  states: any;
  departments: any;
  mycontainer: boolean=false;
  update:boolean=false;
  subDepartmentForm:FormGroup;
  subDepartments: any;
  editId: any;
  loader=true
  departmentName: any;
  branchName: any;
  stateName: any;
  subDepartment_dispaly: any=[];
  constructor(public srvModuleService:AllModulesService, public _fb:FormBuilder, public router:Router) {
    
   }

  ngOnInit(): void {
this.subDepartmentForm = this._fb.group({
  state:['',Validators.required],
  branch:['',Validators.required],
  departmentName:['',Validators.required],
  subDepartment:['',Validators.required],
  status:['true',Validators.required],
 
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

this.getBranchList();
// this.getDepartment();
this.getStates();
this.subDepartment();
  }


  showMyContainer(){
    this.mycontainer=true
      }
      hideContainer(){
        this.mycontainer=false
      }

  getBranchList(){


    // })
    this.srvModuleService.get('branch/getBranchList')
    .subscribe((res)=>{
    
    
    this.branch = res
 
    })
    
      }
    


getStates(){
  this.srvModuleService.get('state/getStateList').subscribe((res)=>{
     this.states = res   
      })
}

getDepartment(){
  let url='getAllDepartmentBybranchId/'+this.subDepartmentForm.value.branch
  this.srvModuleService.get(url).subscribe((res)=>{

  // this.srvModuleService.get('getAllDepartment').subscribe((res)=>{
  this.departments = res
  this.loader = false
  // },(error)=>{
    
  //   this.loader = false
  //   // alert("Something Went Wrong")
  // }
})
}

addSubDepartment(){


if (this.subDepartmentForm.status=='VALID'){
  this.submitLoader = true 
  let form =this.subDepartmentForm.value
  let data={
    departmentName: form.departmentName,
    state: form.state,
    subDepartmentName:form.subDepartment,
    branch:form.branch,
    status:form.status,
  }

  this.srvModuleService.add(data, 'subDepartment/insertSubDepartment').subscribe((res)=>{
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
          text: 'Record already exists',
        
        })
       }
       else{
          
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'something went wrong!',
        
        })
      
       }
  })
 
}
else{
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Something went wrong!',
    // footer: '<a href="">Why do I have this issue?</a>'
  })
  this.subDepartmentForm.markAllAsTouched()
}
 
}

subDepartment(){
  this.srvModuleService.get('subDepartment/getSubDepartments').subscribe((res)=>{
// this.subDepartments=res
res.forEach(element => {
  let department=element.departmentName
  let branch=element.branch
  let state=element.state
  let url='getDepartment/'+`${department}`
  this.srvModuleService.get(url).subscribe((res)=>{
    this.departmentName=res.departmentName

    let url1 = 'branch/getBranch/'+`${branch}`
    this.srvModuleService.get(url1).subscribe((res)=>{
     // console.log(res) 
      this.branchName=res.branchName

      let url = `${'state/getState/'}`+`${state}`
  this.srvModuleService.get(url).subscribe((res)=>{
   // console.log(res)
    this.stateName=res.stateName

    this.subDepartment_dispaly.push({"subDepartmentId":element.subDepartmentId,"state":this.stateName,"branch":this.branchName,"departmentName":this.departmentName,"subDepartmentName":element.subDepartmentName,"status":element.status})
  })

  })
  })
  
});
this.subDepartments=this.subDepartment_dispaly
  })
}
edit(id){
this.mycontainer=true;
this.update = true;
this.editId = id;
let url = 'subDepartment/getSubDepartment/'+`${id}`
this.srvModuleService.get(url).subscribe((res)=>{
  console.log(res)
  
this.subDepartmentForm.get('state').setValue(res.state)
this.subDepartmentForm.get('branch').setValue(res.branch)
this.subDepartmentForm.get('departmentName').setValue(res.departmentName)
this.subDepartmentForm.get('status').setValue(res.status)
this.subDepartmentForm.get('subDepartment').setValue(res.subDepartmentName)

})

}
updateSubDepartment(){

  if (this.subDepartmentForm.status=='VALID'){
    this.submitLoader = true 

let form =this.subDepartmentForm.value
let data={
  departmentName: form.departmentName,
  state: form.state,
  subDepartmentName:form.subDepartment,
  branch:form.branch,
  status:form.status,
}
let url ='subDepartment/updateSubDepartment/'+`${this.editId}`

this.srvModuleService.add(data, url).subscribe((res)=>{
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
        text: 'Record already exists',
      
      })
     }
     else{
        
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'something went wrong!',
      
      })
    
     }
})

}
else{
Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: 'Something went wrong!',
  // footer: '<a href="">Why do I have this issue?</a>'
})
this.subDepartmentForm.markAllAsTouched()
}



}

cancel(){
  const currentRoute = this.router.url;

  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]); 
  }); 
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
      Swal.fire({
        title: 'Loading...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading()
        }
      })

      let url = 'subDepartment/deleteDepartment/'+`${id}`
      this.srvModuleService.get(url).subscribe((res)=>{
       
        if(res.respose=="Success"){
          Swal.fire({
      
            icon: 'success',
            title: 'Sub-department Deleted Successfully',
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
        else if(res.respose=="Already"){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: res.message,
            didOpen: () => {
              Swal.hideLoading()
            }
          })
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
  }); 

 
}
}
