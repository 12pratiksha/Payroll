import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AllModulesService } from '../../all-modules.service';

@Component({
  selector: 'app-transfer-requisition-form',
  templateUrl: './transfer-requisition-form.component.html',
  styleUrls: ['./transfer-requisition-form.component.css']
})
export class TransferRequisitionFormComponent implements OnInit {
  requisitionForm:FormGroup;
  stateList: any;
  cityList: any;
  branchList: any;
  categories: any;
  subDepartments: any;
  departments: any;
  employees: any;
  constructor(public _fb:FormBuilder, public _service:AllModulesService, public router:Router) { }

  ngOnInit(): void {
    this.requisitionForm = this._fb.group({
      date:['',Validators.required],
      description:[''],
      state:[''],
      branch:[''],
      category:[''],
      subcategory:[''],
      department:[''],
      subdepartment:[''],
      amount:['',Validators.required],
      empId:[''],
      reportingManager:[''],
      reportingManager2:[''],
    });
    this.getState();
    this.getBranch();
    this.getDepartment();
    this.getCategories();
    this.subDepartment();
    this.getDepartment();
    this.loadEmployee();
  }
getState(){
  this._service.get('state/getStateList').subscribe((res)=>{
    this.stateList = res
  })
}
getBranch(){
  this._service.get('branch/getBranchList').subscribe((res)=>{
    this.branchList = res
  })
}
getCategories(){
  this._service.get('categories/getCategories').subscribe((res)=>{
    this.categories = res
  })
}
subDepartment(){
  this._service.get('subDepartment/getSubDepartments').subscribe((res)=>{
this.subDepartments=res
  })
}
cancel(){
  const currentRoute = this.router.url;
  
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([currentRoute]); // navigate to same route
      }); 
}
getDepartment(){
  this._service.get('getAllDepartment').subscribe((res)=>{
  this.departments = res
  })
}
loadEmployee() {
    
  //this.HttpClient.get(this.path+"company/getCompanyList", {headers:headers}).subscribe(data=>{
  this._service.get("employee_master/getemployees").subscribe((data) => {
    // JSON.parse(data)
  
    this.employees = data;});
  }
  addTransferRequisition(){
  let form = this.requisitionForm.value
  let datePipe = new DatePipe('en-US');
  let date = datePipe.transform(
    form.date,
    "yyyy-MM-dd"
  );
let data = {
  effectiveDate:date,  
  description: form.description,  
  state:form.state,
  branch: form.branch,
  category:form.category,
  subCategory:form.subcategory,
  department:form.department,
  relocationAmount:form.amount,
  empolyeeId:form.empId,
  reportingManager:form.reportingManager,
  reportingManager2:form.reportingManager2,
  status:"true"

}
if (this.requisitionForm.status == 'VALID'){
this._service.add(data, 'addtransferRequisitionMaster').subscribe((res)=>{
  
  if (res.respose="Success"){

    Swal.fire({
  
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,

    })
this.router.navigate(['/layout/attendance&leave/transferRequisition'])
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
  this.requisitionForm.markAllAsTouched();
}
  }
  showTable(){
    this.router.navigate(['layout/attendance&leave/transferRequisition'])
  }
}
