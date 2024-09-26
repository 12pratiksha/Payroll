import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AllModulesService } from '../../all-modules.service';

@Component({
  selector: 'app-salary-formulas-form',
  templateUrl: './salary-formulas-form.component.html',
  styleUrls: ['./salary-formulas-form.component.css']
})
export class SalaryFormulasFormComponent implements OnInit {
  editId: any;
  datePipe = new DatePipe('en-US');
  myDate = new Date();
  element: any;
  salaryStructureMaster:FormGroup
  masterDetails: any;
  show: any;
  display: any;
  masterId: any;
  constructor(
    public _fb :  FormBuilder,
    public _activatedroute: ActivatedRoute,
    public _service: AllModulesService,
    public router: Router,

  ) { }
  salaryStructureForm:FormGroup
  ngOnInit(): void {
    const routeParam = this._activatedroute.snapshot.params;
    this.editId = routeParam.id;
    
    this.salaryStructureForm = this._fb.group({
     name:['',Validators.required],
     status:''
    })
    this.salaryStructureMaster = this._fb.group({
      element:['',Validators.required],
      calculateOn:['',Validators.required],
      amount:['',Validators.required],
      calculateType:['',Validators.required],
      formula:['']
    })
    this.edit();
    this.getElement();
    this.getMasterDetails();
  }
  submit(){

  let  date = this.datePipe.transform(this.myDate,'yyyy-MM-dd');
  let form = this.salaryStructureForm.value
  console.log(form)
  let data = {
    formulaName: form.name,
	
	date: date,
	
	status: form.status

 }

if(this.salaryStructureForm.status == "VALID"){
  this._service.add(data, "addSalaryStructureMaster").subscribe((res)=>{
    this.masterId = res.data.salaryStructureId
    if (res.respose == 'Success'){
     
      this.display = res
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
    this.salaryStructureForm.markAllAsTouched();
  }
}
showTable(){
  this.router.navigate(['layout/masters/salaryFormulas'])
}
edit(){
 if(this.editId == 'add'){
  return;
 }
 else{
  this._service.get('getSalaryStructureMaster/'+this.editId).subscribe((res)=>{
    this.salaryStructureForm.get('name').setValue(res.formulaName)
    this.salaryStructureForm.get('status').setValue(res.status)
    this.show = res
  })
 }
}
update(){
  let  date = this.datePipe.transform(this.myDate,'yyyy-MM-dd');
  let form = this.salaryStructureForm.value
  let data = {
    formulaName: form.name,
	
	date: date,
	
	status: form.status

 }

if(this.salaryStructureForm.status == "VALID"){
  this._service.add(data, "updateSalaryStructureMaster/"+this.editId).subscribe((res)=>{
    if (res.respose == 'Success'){
      Swal.fire({
       
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        
      })
      this.router.navigate(['layout/masters/salaryFormulas'])
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
    this.salaryStructureForm.markAllAsTouched();
  }
}
cancel(){
  const currentRoute = this.router.url;
  
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([currentRoute]); // navigate to same route
      }); 
}
getElement(){
  this._service.get('getAllPayElementMaster').subscribe((res)=>{
    console.log(res)
    this.element = res
  })
}
submitMaster(){
  
  if(this.salaryStructureMaster.status=='VALID'){
    let branchStatus=localStorage.getItem('branchStatus')
    let branchId=localStorage.getItem('branchId')
    if(branchStatus=='true'){
    let form = this.salaryStructureMaster.value
    console.log(form)
   let data = {
  
    salaryStructureId: (this.editId=='add')?this.masterId:this.editId,
     elementName: form.element,
     calculateOn: form.calculateOn,
     formual:form.formula,
     calculationType: form.calculateType,
     percent: form.amount,
     branchId:branchId
 
}
  this._service.add(data, "addFormualElement").subscribe((res)=>{
    if (res.respose == 'Success'){
      this.salaryStructureMaster.reset()
      Swal.fire({
       
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1000
      })
   
     this.getMasterDetails();
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
  let form = this.salaryStructureMaster.value
    console.log(form)
   let data = {
  
    salaryStructureId: (this.editId=='add')?this.masterId:this.editId,
     elementName: form.element,
     calculateOn: form.calculateOn,
     formual:form.formula,
     calculationType: form.calculateType,
     percent: form.amount,
     branchId:''
 
}
  this._service.add(data, "addFormualElement").subscribe((res)=>{
    if (res.respose == 'Success'){
      this.salaryStructureMaster.reset()
      Swal.fire({
       
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1000
      })
   
     this.getMasterDetails();
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
  
  }
  else{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      
    })
    this.salaryStructureForm.markAllAsTouched();
    this.salaryStructureMaster.markAllAsTouched()
  }
}
getMasterDetails(){

  this._service.get('getFormualElementBysalaryStructureId/'+((this.editId=='add')?this.masterId:this.editId)).subscribe((res)=>{
    console.log(res)
    this.masterDetails = res
  })
}
delete(id){
  Swal.fire({
    title:"Are you really want to delete..?",
    showCancelButton:true,
    confirmButtonColor: '#3085d6',
     cancelButtonColor: '#d33',
     confirmButtonText: 'Yes'
  }).then(result=>{
    console.log(result);
    if(result.isConfirmed==true)
    {
this._service.get('deleteFormualElement/'+id).subscribe((res)=>{
  if(res.respose == 'Success'){
    Swal.fire(
      'Deleted!',
      'Your file has been deleted.',
      'success'
    )
    this.getMasterDetails();
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
this.getMasterDetails();
}
})
}
}