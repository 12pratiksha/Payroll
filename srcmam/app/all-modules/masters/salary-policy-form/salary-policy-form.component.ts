import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AllModulesComponent } from '../../all-modules.component';
import { AllModulesService } from '../../all-modules.service';

@Component({
  selector: 'app-salary-policy-form',
  templateUrl: './salary-policy-form.component.html',
  styleUrls: ['./salary-policy-form.component.css']
})
export class SalaryPolicyFormComponent implements OnInit {
  categories: any;
  departments: any;
  stateList: any;
  salaryPolicyForm:FormGroup
  editId: any;
  branch: any;
  grade: any;
  constructor(
    public _service:AllModulesService,
    public _fb : FormBuilder,
    public _activatedroute: ActivatedRoute,
    public router: Router
    ) { }

  ngOnInit(): void {
    const routeParam = this._activatedroute.snapshot.params;
    this.editId = routeParam.id;

    this.salaryPolicyForm = this._fb.group({
      effectiveDate:['',Validators.required],
      state:['',Validators.required],
      branch:['',Validators.required],
      Category:['',Validators.required],
      grade:['',Validators.required],
      days:'',
      medMmount:'',
      eduAmount:'',
      tranAmount:'',
      status:'',
      salaryOnCal:'',

    })
    this.getBranch();
    this.getState();
    this.getCategories();
    this.department();
    this.getGrade();
    this.edit();
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
    getGrade(){
      this._service.get('getgetCodeByType?type=grade').subscribe((res)=>{
        this.grade = res
      })
    }
    cancel(){
      this.router.navigate(['layout/masters/salaryPolicy'])
    }
    submit(){
      console.log(this.salaryPolicyForm.value)
      let form = this.salaryPolicyForm.value
      var datePipe = new DatePipe('en-US');
    let  effectiveDate = datePipe.transform(form.effectiveDate,'yyyy-MM-dd');
  if (this.salaryPolicyForm.status == 'VALID'){
let data = {
  effectiveDate: effectiveDate,
  branch: form.branch,
  state: form.state,
  category:form.Category,
  subCategory: '',
  grade: form.grade,
  days: form.days,
  medicalMaxAmount: form.medMmount,
  educationMaxAmount: form.eduAmount,
  transportMaxAmount: form.tranAmount,
  salaryonCalender: form.salaryOnCal,
  status: form.status
}
this._service.add(data, 'addSalaryPolicyMaster').subscribe((res)=>{
  if(res.respose=='Success'){
    Swal.fire({
      
      icon: 'success',
      title: 'Salary Policy has been saved',
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
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
     
    })
    this.salaryPolicyForm.markAllAsTouched();
  }
    }

edit(){
 if (this.editId == 'add'){
  return
 }
 else{
  this._service.get("getSalaryPolicyMaster/"+this.editId).subscribe((res)=>{
console.log(res)
let form = this.salaryPolicyForm;
form.get('branch').setValue(res.branch)
form.get('state').setValue(res.state)
form.get('Category').setValue(res.category)
form.get('days').setValue(res.days)
form.get('medMmount').setValue(res.medicalMaxAmount)
form.get('eduAmount').setValue(res.educationMaxAmount)
form.get('tranAmount').setValue(res.transportMaxAmount)
form.get('salaryOnCal').setValue(res.salaryonCalender)
form.get('status').setValue(res.status)
form.get('grade').setValue(res.grade)

var datePipe = new DatePipe('en-US');
let  effectiveDate = datePipe.transform(res.effectiveDate,'dd-MM-yyyy');
form.get('effectiveDate').setValue(effectiveDate)
  })
 }
}
update(){
  let form = this.salaryPolicyForm.value
  var datePipe = new DatePipe('en-US');
let  effectiveDate = datePipe.transform(form.effectiveDate,'yyyy-MM-dd');
if (this.salaryPolicyForm.status == 'VALID'){
let data = {
effectiveDate: effectiveDate,
branch: form.branch,
state: form.state,
category:form.Category,
subCategory: '',
grade: form.grade,
days: form.days,
medicalMaxAmount: form.medMmount,
educationMaxAmount: form.eduAmount,
transportMaxAmount: form.tranAmount,
salaryonCalender: form.salaryOnCal,
status: form.status
}
this._service.add(data, 'updateSalaryPolicyMaster/'+this.editId).subscribe((res)=>{
if(res.respose=='Success'){
Swal.fire({
  
  icon: 'success',
  title: 'Salary Policy has been saved',
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
Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: 'Something went wrong!',
 
})
this.salaryPolicyForm.markAllAsTouched();
}
}
}
