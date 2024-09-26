import { DatePipe } from '@angular/common';
import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AllModulesService } from '../../all-modules.service';

@Component({
  selector: 'app-employee-master-edit-form',
  templateUrl: './employee-master-edit-form.component.html',
  styleUrls: ['./employee-master-edit-form.component.css']
})
export class EmployeeMasterEditFormComponent implements OnInit {
  // @Output() childToParent = new EventEmitter<String>();
  employees: any;
  masterEditForm:FormGroup
  type: any;
  payElement: any;
  salData: any;
  array: any=[];
  employee1: any;
  selected: any;
  constructor(
    public _service:AllModulesService,
    public _fb:FormBuilder,
    public router:Router,

    ) { }

  ngOnInit(): void {
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
      remark:''
    })
    this.loadEmployee();
    this.getPayElement();
    this.getFormula()
  }
  getPayElement(){
    this._service.get("getAllPayElementMaster").subscribe((res)=>{
    this.payElement = res
    })
  }
  formula
  getFormula(){
    this._service.get("getAllSalaryStructureMaster").subscribe((res)=>{
    this.formula = res
    })
  }
  loadEmployee() {
    
    this._service.get("employee_master/getemployees").subscribe((data) => {
        this.employees = data;
    });

    }
    submit(type){
      let emp=this.masterEditForm.value.empId.split(" ");
let emply=this.employees.filter((emply)=>
(emply.employeeCode == emp[0]))
console.log(emply)
      // console.log(this.masterEditForm.controls.actualEffectiveDate.status)
      let form = this.masterEditForm.controls
      let forms = this.masterEditForm.value
      var datePipe = new DatePipe('en-US');
 
      let  effectiveDate =  datePipe.transform(forms.effectiveDate, 'yyyy-MM-dd');
      let actualDate = datePipe.transform(forms.actualEffectiveDate, 'yyyy-MM-dd');
if(type == 'Formula'){
if(
  form.empId.status == 'VALID' &&
   form.effectiveDate.status == 'VALID' && 
   form.ctcAmount.status == 'VALID' && 
   form.basedOn.status == 'VALID' && 
   form.formula.status == 'VALID' && 
   form.actualEffectiveDate.status == 'VALID'
  ){
 
let data = {
  employeeId:emply[0].employeeId,
	
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
   
  formualName : forms.formula,

  remark: forms.remark
}
this._service.add(data, "addSalary").subscribe((res)=>{
 if(res.respose="Success"){
  Swal.fire({
    
    icon: 'success',
    title: 'Your work has been saved',
    showConfirmButton: false,
    timer: 1500
  })
  this.masterEditForm.reset();
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
else if (type == 'Manual Element'){
if (
   // form.empId.status == 'VALID' &&
   form.effectiveDate.status == 'VALID' && 
   form.ctcAmount.status == 'VALID' && 
   form.basedOn.status == 'VALID' && 
   form.computationType.status == 'VALID'&& 
   form.payElement.status == 'VALID'&& 
   form.amount.status == 'VALID'&& 
   form.effectiveDate.status == 'VALID'
){
  let data = {
    employeeId:emply[0].employeeId,
    
    actualEffectiveStartDate: actualDate,
    
    effectiveDate: effectiveDate,
    
    payElementCode: forms.payElement,
    
    computationTypeName: '',
    
    baseOn: forms.basedOn,
    
    computationType: forms.computationType,
    
    ctcAmountPerMonth: forms.ctcAmount,
    
    amount: forms.amount,
 
    formualName : '',

    remark: forms.remark
  }
  this._service.add(data, "addSalary").subscribe((res)=>{
    if(res.respose="Success"){
     Swal.fire({
       
       icon: 'success',
       title: 'Your work has been saved',
       showConfirmButton: false,
       timer: 1500
     })
     this.masterEditForm.reset();
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
   
  this.masterEditForm.markAllAsTouched();
}
    }

    onChange(event){

      this.masterEditForm.markAsUntouched();
    }

    cancel(){
      this.masterEditForm.reset();
      this.router.navigate(['/layout/payroll/employeeMasterEdit'])
    }

    get(e){
      let url = "getFormualElementBysalaryStructureId/"+e
      this._service.get(url).subscribe((res)=>{
        console.log(res)
        this.salData = res
      })
    }

    getEmpList(event){
 
      console.log(event)
      
      this.array.push(event)
      console.log(this.array)
      let form=this.masterEditForm.value
      if(this.array.length >=2){
        let data=form.empId.toLowerCase() 
      let url='employees/search?employeeName='+`${data}`
      this._service.get(url).subscribe((res)=>{
        this.employee1=res.data
      })
    }
    }
    
    
    
    displayEmp(data,name,last){
    console.log(data,name,last)
    this.selected=[data] +" "+ name +" "+ last; 
    }

}
