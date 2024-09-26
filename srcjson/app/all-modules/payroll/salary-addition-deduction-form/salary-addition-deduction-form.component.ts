import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AllModulesService } from '../../all-modules.service';

@Component({
  selector: 'app-salary-addition-deduction-form',
  templateUrl: './salary-addition-deduction-form.component.html',
  styleUrls: ['./salary-addition-deduction-form.component.css']
})
export class SalaryAdditionDeductionFormComponent implements OnInit {
  employees: any;
  additionDeductionForm:FormGroup
  type: any;
  payElement: any;
  editId: any;
  constructor(
    public _service:AllModulesService,
    public _fb:FormBuilder,
    public router:Router,
    public _activatedroute:ActivatedRoute,

    ) { }

  ngOnInit(): void {
    const routeParam = this._activatedroute.snapshot.params;
    this.editId = routeParam.id;
    this.additionDeductionForm = this._fb.group({
      empId:['',Validators.required],
      computationType:['',Validators.required],
      amount:['',Validators.required],
      type:['',Validators.required],
      date:['',Validators.required],
    })
    
    this.loadEmployee();
    this.getPayElement();
    this.edit();
    console.log(this.editId)
  }
  getPayElement(){
    this._service.get("getAllPayElementMaster").subscribe((res)=>{
    this.payElement = res
    })
  }
  loadEmployee() {
    
    this._service.get("employee_master/getemployees").subscribe((data) => {
        this.employees = data;
    });

    }
    submit(type){
      // console.log(this.masterEditForm.controls.actualEffectiveDate.status)
      let form = this.additionDeductionForm.controls
      let forms = this.additionDeductionForm.value
      var datePipe = new DatePipe('en-US');
 
      let  date =  datePipe.transform(forms.date, 'yyyy-MM-dd');
      let actualDate = datePipe.transform(forms.actualEffectiveDate, 'yyyy-MM-dd');

if(this.additionDeductionForm.status == "VALID" ){
 let data = 
  {
    employeeId: forms.empId,
    type: forms.type,
    computationType: forms.computationType,
    amount: forms.amount,
    status: forms.status,
    date: date
}
 
this._service.add(data, "addSalaryAdditionDeductionMaster").subscribe((res)=>{
 if(res.respose="Success"){
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
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Something went wrong!',
   
  })
  this.additionDeductionForm.markAllAsTouched();
}
     }
     cancel(){
      this.additionDeductionForm.reset();
      this.router.navigate(['/layout/payroll/salaryAditionDeduction'])
}

showTable(){
  this.router.navigate(['/layout/payroll/salaryAditionDeduction'])
}
edit(){
if(this.editId != "add"){
  this._service.get("getSalaryAdditionDeductionMaster/"+this.editId).subscribe((res)=>{
    var datePipe = new DatePipe('en-US');
   
        let  date =  datePipe.transform(res.date, 'dd-MM-yyyy');
  this.additionDeductionForm.get('empId').setValue(res.employeeId)
  this.additionDeductionForm.get('computationType').setValue(res.computationType)
  this.additionDeductionForm.get('amount').setValue(res.amount)
  this.additionDeductionForm.get('type').setValue(res.type)
  this.additionDeductionForm.get('date').setValue(date)
   })
}
}
update(){
     // console.log(this.masterEditForm.controls.actualEffectiveDate.status)
     let form = this.additionDeductionForm.controls
     let forms = this.additionDeductionForm.value
     var datePipe = new DatePipe('en-US');

     let  date =  datePipe.transform(forms.date, 'yyyy-MM-dd');
     let actualDate = datePipe.transform(forms.actualEffectiveDate, 'yyyy-MM-dd');

if(this.additionDeductionForm.status == "VALID" ){
let data = 
 {
   employeeId: forms.empId,
   type: forms.type,
   computationType: forms.computationType,
   amount: forms.amount,
   status: forms.status,
   date: date
}

this._service.add(data, "updateSalaryAdditionDeductionMaster"+this.editId).subscribe((res)=>{
if(res.respose="Success"){
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
 Swal.fire({
   icon: 'error',
   title: 'Oops...',
   text: 'Something went wrong!',
  
 })
 this.additionDeductionForm.markAllAsTouched();
}
}
}


   

