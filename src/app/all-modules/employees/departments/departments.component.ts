import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AllModulesService } from "../../all-modules.service";
import { ToastrService } from "ngx-toastr";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
declare const $: any;
@Component({
  selector: "app-departments",
  templateUrl: "./departments.component.html",
  styleUrls: ["./departments.component.css"],
})
export class DepartmentsComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  submitLoader : boolean = false
  dtOptions: any = {};
  public editId: any;
  public departmentForm: FormGroup;
  mycontainer:boolean=false;
  states: any; 
  branch: any;
  departments: any;
  update:boolean=false;
  deleteDepartmentId: any;
  loader = true
  stateName: any;
  branchName: any;
  constructor(
    private formBuilder: FormBuilder,
    private srvModuleService: AllModulesService,
    private router: Router,
  ) {
    this.getStates(); 
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'print'
        ]
    };
    setTimeout(() => {
      this.loader = false;
    }, 10000);
   
    this.departmentForm = this.formBuilder.group({
      state:['',Validators.required],
      branch:['',Validators.required],
      departmentName:['',Validators.required],
      departmentAddress:['',Validators.required],
      status:['',Validators.required]
    })
    // Swal.fire({
    //   title: 'Loading...',
    //   allowEscapeKey: false,
    //   allowOutsideClick: false,
    //   showConfirmButton: false,
    //   didOpen: () => {
    //     Swal.showLoading()
    //   }
    // });
   
  
    
  }

  showMyContainer(){
this.mycontainer=true
this.update=false;
  }
  hideContainer(){
    this.mycontainer=false
    this.update=true;
    this.departmentForm.reset();
  }
   getBranchList(){
     this.srvModuleService.get('branch/getBranchList')
    .subscribe((res)=>{
    this.branch = res
    })
    setTimeout(() => {
      this.getDepartment();
    }, 1000);
   
  }

  getStates(){
   this.srvModuleService.get('state/getStateList').subscribe((res)=>{
    this.states = res   
  })
  this.getBranchList();
}

departments_display:any;
 getDepartment(){
  this.departments_display=[];

 this.srvModuleService.get('getAllDepartment').subscribe((data)=>{
 // this.departments = res
  data.forEach(element => {
    let state=element.state;
    let brnch=element.branch

    let resultstate =this.states.filter((st: any) =>
    (st.stateId==state) )

    let resultbranch =this.branch.filter((brn: any) =>
    (brn.id==brnch) )

    let st='';
    if(resultstate.length>0){
      st=resultstate[0].stateName;
    }

    let brn='';
    if(resultbranch.length>0)
    {
       brn=resultbranch[0].branchName;
    }

    this.departments_display.push({"departmentId":element.departmentId,"departmentName":element.departmentName,"state":st,"branch":brn})
    })
 

  this.departments=this.departments_display
  console.log(this.departments)

  this.loader = false
  },(error)=>{
    
    this.loader = false
   
    alert("Something Went Wrong")
  })
// console.log(this.departmentForm)
}

addDepartment(){
  if(this.departmentForm.status == 'VALID'){
  this.submitLoader = true 
  let form= this.departmentForm.value
  let data= {
   state: form.state,
   branch: form.branch,
   departmentName: form.departmentName,
   departmentAddres: form.departmentAddress,
   status: form.status
  }
 
  this.srvModuleService.add(data, 'addDepartment').subscribe((res)=>{
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
        text: res.message,
      
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
   this.departmentForm.markAllAsTouched();
   Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Something went wrong!',
   
  })
}
}

edit(id){
  this.update=true
  this.editId = id
  let url='getDepartment/'+`${id}`
  this.srvModuleService.get(url).subscribe((res)=>{

  this.mycontainer=true;
  this.departmentForm.get('state').setValue(res.state)
  this.departmentForm.get('branch').setValue(res.branch)
  this.departmentForm.get('departmentName').setValue(res.departmentName)
  this.departmentForm.get('status').setValue(res.status)
  this.departmentForm.get('departmentAddress').setValue(res.departmentAddres)
})

}
updateDepartment(){
  if(this.departmentForm.status == 'VALID'){
    this.submitLoader = true 
    let form= this.departmentForm.value
    let data= {
    state: form.state,
    branch: form.branch,
    departmentName: form.departmentName,
    departmentAddres: form.departmentAddress,
    status: form.status
  }
  let url = 'updateDepartment/'+`${this.editId}`
  this.srvModuleService.update(data, url).subscribe((res)=>{
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
    this.departmentForm.markAllAsTouched();
    Swal.fire({
     icon: 'error',
     title: 'Oops...',
     text: 'Something went wrong!',
    
   })
  }
}

// deleteDepartment(){
//   let url='getDepartment/'+`${id}`
//   this.srvModuleService.get('')
// }


deleteDepatment(id){
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

      this.srvModuleService.delete(id, 'deleteDepartment').subscribe((res)=>{
       
        if(res.respose=="Success"){
          Swal.fire({
      
            icon: 'success',
            title: 'Department Deleted Successfully !',
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
  })
}
cancel(){
  this.departmentForm.reset();
  this.editId=null;
  this.mycontainer=false;
  this.update=false;

}


}
