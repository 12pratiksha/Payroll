import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2';
import { AllModulesService } from '../../all-modules.service';

@Component({
  selector: 'app-all-assets',
  templateUrl: './all-assets.component.html',
  styleUrls: ['./all-assets.component.css']
})
export class AllAssetsComponent implements OnInit {

  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  dtOptions: any = {};
  assignedAssets: any;
  showMyContainer: boolean = false;
  public assetsAssignedForm: FormGroup;
  employeeList: any;
  file: any;
  public pipe = new DatePipe("en-US");
  uploadAssetfile: string | Blob;
  deleteAssetId: any;
  uploadDoc: any;
  editId: any;
  update: boolean = false;
  path: any;
  loader = true;

  constructor( public _service: AllModulesService,
               public formBuilder: FormBuilder,
               public router: Router,
               public srvModuleService: AllModulesService) { }

  ngOnInit(): void {
    this.getAllAssetsAssigned();
    this.getEmployeeList();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
     
    };
  
  this.assignedAssets;
 
   
   this.assetsAssignedForm = this.formBuilder.group({
    employeeId: ['',Validators.required],
    assetName: ['',Validators.required],
    assetValue: [''],
    description: [''],
    issueDate: ['',Validators.required],
    attachment: [''],
    givenFor: [''],
    tandc: [''],
    status: [''],
    repeatAsset: [''],
  
  })

  }
  showContainer(){
    this.showMyContainer=true;
  }
  hideMyContainer(){
    const currentRoute = this.router.url;

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentRoute]); // navigate to same route
    }); 
  }
  getAllAssetsAssigned(){

    this._service.get('assetsAssign/getAllAssetAssign').subscribe((res)=>{
  this.assignedAssets = res;
  this.loader = false;
  
    },(error)=>{
    
      this.loader = false
      console.log(error)
      alert("Something Went Wrong")
})
  }

getEmployeeList(){
  this._service.get("employee_master/getemployees").subscribe((data) => {
    this.employeeList = data;

})
}

addAssetsList(){

if(this.assetsAssignedForm.status == "VALID"){
  let form = this.assetsAssignedForm.value;
  let date = this.pipe.transform(
    form.issueDate,
    "yyyy-MM-dd"
  );
let data = {
  assetName: form.assetName,
    assetValue: form.assetValue,
    description: form.description,
    issueDate: date,
    officeUse: form.givenFor,
    employeeId:form.employeeId,
    status: form.status,
    repeateAsset: form.repeatAsset,
    termsAndCondition: form.tandc,
    attachmentPath: this.uploadDoc
}
this._service.add(data, 'assetsAssign/addAssetsAssign').subscribe((res)=>{
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
    alert("Record already exists")
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
this.assetsAssignedForm.markAllAsTouched()
}
}
uploadAssetsFile(event) {
let  file = event.target.files[0];
  const formData = new FormData();
    formData.append('file', file);
    this._service.uploadFile(formData,"EmployeeAttachment").subscribe((res)=>{
     this.uploadDoc = res.data[0].attachmentPath
 
    })
}
getDeleteId(id){
  this.deleteAssetId = id
 
}

deleteAsset(){
  console.log(this.deleteAssetId)
 
  this.srvModuleService.delete(this.deleteAssetId, 'assetsAssign/deleteAssetAssign').subscribe((data) => {

  })
}
edit(id){
  this.update = true
this.editId = id
this.showMyContainer = true
let url = 'assetsAssign/getAssignAsset/'+id
this._service.get(url).subscribe((res)=>{
  let date = this.pipe.transform(
    res.issueDate,
    "yyyy-MM-dd"
  );
  console.log(date)
this.assetsAssignedForm.get('assetName').setValue(res.assetName)
this.assetsAssignedForm.get('assetValue').setValue(res.assetValue)
this.assetsAssignedForm.get('description').setValue(res.description)
this.assetsAssignedForm.get('givenFor').setValue(res.officeUse)
this.assetsAssignedForm.get('employeeId').setValue(res.employeeId)
this.assetsAssignedForm.get('status').setValue(res.status)
this.assetsAssignedForm.get('tandc').setValue(res.termsAndCondition)
this.assetsAssignedForm.get('repeatAsset').setValue(res.repeateAsset)
this.assetsAssignedForm.get('repeatAsset').setValue(res.repeateAsset)
this.assetsAssignedForm.get('issueDate').setValue(date)
this.path = res.attachmentPath
})
}
updateForm(){
  if(this.assetsAssignedForm.status == "VALID"){
    let form = this.assetsAssignedForm.value;
    let date = this.pipe.transform(
      form.issueDate,
      "yyyy-MM-dd"
    );
  let data = {
    assetName: form.assetName,
      assetValue: form.assetValue,
      description: form.description,
      issueDate: date,
      officeUse: form.givenFor,
      employeeId:form.employeeId,
      status: form.status,
      repeateAsset: form.repeatAsset,
      termsAndCondition: form.tandc,
      attachmentPath: this.uploadDoc?this.uploadDoc:this.path
  }
  this._service.add(data, 'assetsAssign/updateAssetAssign/'+this.editId).subscribe((res)=>{
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
      alert("Record already exists")
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
  this.assetsAssignedForm.markAllAsTouched()
  }
}
delete(id){
  let url = "assetsAssign/deleteAssetAssign/"+id
  
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
    if(res.respose = 'Success'){
   
    Swal.fire(
      'Deleted!',
      'Your file has been deleted.',
      'success'
    )
    const currentRoute = this.router.url;
  
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([currentRoute]); // navigate to same route
      }); 
    
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
cancel(){
  this.assetsAssignedForm.reset();
  this.showMyContainer = false;
  this.update = false
}
}