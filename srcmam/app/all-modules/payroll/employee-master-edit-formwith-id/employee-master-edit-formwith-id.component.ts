import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { AllModulesService } from '../../all-modules.service';
@Component({
  selector: 'app-employee-master-edit-formwith-id',
  templateUrl: './employee-master-edit-formwith-id.component.html',
  styleUrls: ['./employee-master-edit-formwith-id.component.css']
})
export class EmployeeMasterEditFormwithIdComponent implements OnInit {
  employees: any;
  masterEditForm:FormGroup
  type: any;
  editId: any;
  payElement: any;
  constructor(
    public _service:AllModulesService,
    public _fb:FormBuilder,
    public _activatedroute:ActivatedRoute,
    
    ) { }

  ngOnInit(): void {
    const routeParam = this._activatedroute.snapshot.params;
    this.editId = routeParam.id;
    this.edit();
    console.log(this.editId)
    this.masterEditForm = this._fb.group({
      empId:['',Validators.required],
      effectiveDate:['',Validators.required],
      ctcAmount:['',Validators.required],
      basedOn:['',Validators.required],
      payElement:['',Validators.required],
      computationType:['',Validators.required],
      amount:['',Validators.required],
      formula:['',Validators.required],
      actualEffectiveDate:['',Validators.required],
    })
    console.log(this.masterEditForm)
    this.loadEmployee();
    this.getPayElement();
  }
  loadEmployee() {
    
    this._service.get("employee_master/getemployees").subscribe((data) => {
        this.employees = data;
    });

    }
    submit(){
      
      // console.log(this.masterEditForm.controls.actualEffectiveDate.status)
      let form = this.masterEditForm.controls
      let forms = this.masterEditForm.value
      var datePipe = new DatePipe('en-US');
 
      let  effectiveDate =  datePipe.transform(forms.effectiveDate, 'yyyy-MM-dd');
      let actualDate = datePipe.transform(forms.actualEffectiveDate, 'yyyy-MM-dd');
if(forms.basedOn == 'Formula'){
if(
  form.empId.status == 'VALID' &&
   form.effectiveDate.status == 'VALID' && 
   form.ctcAmount.status == 'VALID' && 
   form.basedOn.status == 'VALID' && 
   form.formula.status == 'VALID' && 
   form.actualEffectiveDate.status == 'VALID'
  ){
 
let data = {
  employeeId:forms.empId,
	
	actualEffectiveStartDate: actualDate,
	
	effectiveDate: effectiveDate,
	
	payElementCode: '',
	
	computationTypeName: '',
	
	baseOn: forms.basedOn,
	
	// computationType: forms.computationType,
	computationType: '',
	
	ctcAmountPerMonth: forms.ctcAmount,
	
	// amount: forms.amount,
	amount: '',
   
  formula: forms.formula
}
this._service.add(data, "updateSalary/"+this.editId).subscribe((res)=>{
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
  this.masterEditForm.markAllAsTouched();
}
     }
else if (forms.basedOn == 'Manual Element'){
 
if (
   form.empId.status == 'VALID' &&
   form.effectiveDate.status == 'VALID' && 
   form.ctcAmount.status == 'VALID' && 
   form.basedOn.status == 'VALID' && 
   form.computationType.status == 'VALID'&& 
   form.payElement.status == 'VALID'&& 
   form.amount.status == 'VALID'&& 
   form.effectiveDate.status == 'VALID'
){
  let data = {
    employeeId:forms.empId,
    
    actualEffectiveStartDate: actualDate,
    
    effectiveDate: effectiveDate,
    
    payElementCode: forms.payElement,
    
    computationTypeName: '',
    
    baseOn: forms.basedOn,
    
    computationType: forms.computationType,
    
    ctcAmountPerMonth: forms.ctcAmount,
    
    amount: forms.amount,
 
    formula: ''
  }
  this._service.add(data, "updateSalary/"+this.editId).subscribe((res)=>{
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
  this.masterEditForm.markAllAsTouched();
}
}
else{

    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
     
    })
   console.log("error")
   console.log(this.masterEditForm)
   
  this.masterEditForm.markAllAsTouched();
}
    }

    onChange(event){

      this.masterEditForm.markAsUntouched();
    }

    cancel(){
      this.masterEditForm.reset();
    }
edit(){
  this.editId
  this._service.get("getSalary/"+this.editId).subscribe((res)=>{
    console.log(res)
    this.type = res.baseOn
    var datePipe = new DatePipe('en-US');
let actualEffectiveDate = datePipe.transform(res.actualEffectiveStartDate,'yyyy-MM-dd');
let effectiveDate = datePipe.transform(res.effectiveDate,'yyyy-MM-dd');
    this.masterEditForm.get('empId').setValue(res.employeeId)
    this.masterEditForm.get('effectiveDate').setValue(effectiveDate)
    this.masterEditForm.get('ctcAmount').setValue(res.ctcAmountPerMonth)
    this.masterEditForm.get('basedOn').setValue(res.baseOn)
    this.masterEditForm.get('payElement').setValue(res.payElementCode)
    this.masterEditForm.get('computationType').setValue(res.computationType)
    this.masterEditForm.get('amount').setValue(res.amount)
    // this.masterEditForm.get('formula').setValue(res.effectiveDate)
    this.masterEditForm.get('actualEffectiveDate').setValue(actualEffectiveDate)
  })
}
getPayElement(){
  this._service.get("getAllPayElementMaster").subscribe((res)=>{
  this.payElement = res
  
  })
}
}
