import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AllModulesComponent } from '../../all-modules.component';
import { AllModulesService } from '../../all-modules.service';



@Component({
  selector: 'app-work-flow-form',
  templateUrl: './work-flow-form.component.html',
  styleUrls: ['./work-flow-form.component.css']
})
export class WorkFlowFormComponent implements OnInit {
  workFlowForm:FormGroup;
  showField1:boolean=false;
 options1=[
  {value:'Reporting Person 1',id:0},
  {value:'Reporting Person 2',id:1},
  {value:'Admin',id:2}
 ]
 
  options=[

    {value:1},
    {value:2},
    {value:3},]
  editId: any;
  selection: any;
  constructor(public _fb:FormBuilder, public router:Router, 
    public _service:AllModulesService,
    public _activatedroute: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    const routeParam = this._activatedroute.snapshot.params;
    this.editId = routeParam.id;
    this.workFlowForm = this._fb.group({
      name:['', Validators.required],
      approvars: ['', Validators.required],
      firstContact: '',
      firstOperator: '',
      secondContact: '',
      secondOperator: '',
      thirdContact: '',
    })
    console.log(this.workFlowForm.value)
   this.edit();
  }
  submit(){

let form = this.workFlowForm.value
    if(this.workFlowForm.status == 'VALID'){
      let data = {
    workFlowName:form.name,
    numberOfApprover:form.approvars,
    firstContact:form.firstContact,   
    operator1:form.firstOperator,
    secondContact:form.secondContact,
    operator2:form.secondOperator,
    thirdContact:form.thirdContact,
    description:"",  
    status:"true"
  
  }
this._service.add(data, 'addWorkFlowConfigurationMaster').subscribe((res)=>{
  //console.log(res)
    if(res.respose == "Success"){
      Swal.fire({
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })
    this.router.navigate(['/layout/masters/workFlow'])
  }
  
  else if(res.respose == "Already"){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Record Already Exists!',
    
    });
   }

   else{

    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something Went Wrong',
     
    })
  
 }
});

}
   else{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something Went Wrong',
     
    })
      this.workFlowForm.markAllAsTouched();
    }


  }
  
  onChange1(event){
    if(this.workFlowForm.value.firstContact=='Reporting Person 1'){
      // console.log(this.workFlowForm.value.firstContact);
    //  this.options1[0].value==null;
//this.workFlowForm.value.secondContact!=this.workFlowForm.value.firstContact

    }

  }

  onChange(value){
   this.selection = value;
    if(this.workFlowForm.value.approvars == 1){
     
      this.workFlowForm.controls['firstContact'].setValidators([Validators.required])
      this.workFlowForm.controls['firstOperator'].setValue(null)
      this.workFlowForm.controls['secondContact'].setValue(null)
        this.workFlowForm.controls['secondOperator'].setValue(null)
        this.workFlowForm.controls['thirdContact'].setValue(null)
        console.log(this.workFlowForm);
      }
      else if(this.workFlowForm.value.approvars == 2){
        this.workFlowForm.controls['firstContact'].setValidators([Validators.required])
        this.workFlowForm.controls['firstOperator'].setValidators([Validators.required])
        this.workFlowForm.controls['secondContact'].setValidators([Validators.required])
        this.workFlowForm.controls['secondOperator'].setValue(null)
        this.workFlowForm.controls['thirdContact'].setValue(null)
      }
      else if(this.workFlowForm.value.approvars != 1 || this.workFlowForm.value.approvars != 2) {
      
        this.workFlowForm.controls['firstContact'].setValidators([Validators.required])
        this.workFlowForm.controls['firstOperator'].setValidators([Validators.required])
        this.workFlowForm.controls['secondContact'].setValidators([Validators.required])
        this.workFlowForm.controls['secondOperator'].setValidators([Validators.required])
        this.workFlowForm.controls['thirdContact'].setValidators([Validators.required])
      }
      
      this.workFlowForm.controls['firstOperator'].updateValueAndValidity();
      this.workFlowForm.controls['secondContact'].updateValueAndValidity();
      this.workFlowForm.controls['secondOperator'].updateValueAndValidity();
      this.workFlowForm.controls['thirdContact'].updateValueAndValidity();
  }

edit(){
 let url = 'getWorkFlowConfigurationMaster/'+this.editId
 this._service.get(url).subscribe((res)=>{
  console.log((res))
  let form = this.workFlowForm
form.get('name').setValue(res.workFlowName)
form.get('approvars').setValue(res.numberOfApprover)
form.get('firstContact').setValue(res.firstContact)
form.get('firstOperator').setValue(res.operator1)
form.get('secondContact').setValue(res.secondContact)
form.get('secondOperator').setValue(res.operator2)
form.get('thirdContact').setValue(res.thirdContact)
this.onChange(res.numberOfApprover)

 })
 
}

  update(){
    
    let form = this.workFlowForm.value
    console.log(this.workFlowForm)
    if(this.workFlowForm.value.approvars == 1){
      console.log(this.workFlowForm)
      this.workFlowForm.get('firstContact').setValidators([Validators.required]);
      this.workFlowForm.get('firstOperator').setValidators(null);
      this.workFlowForm.get('secondContact').setValidators(null);
      this.workFlowForm.get('secondOperator').setValidators(null);
      this.workFlowForm.get('thirdContact').setValidators(null);
        console.log(this.workFlowForm)
    }
    else if(this.workFlowForm.value.approvars == 2){
      this.workFlowForm.get('firstContact').setValidators([Validators.required]);
      this.workFlowForm.get('firstOperator').setValidators([Validators.required]);
      this.workFlowForm.get('secondContact').setValidators([Validators.required]);
      this.workFlowForm.get('secondOperator').setValidators(null);
      this.workFlowForm.get('thirdContact').setValidators(null);
    }
    else  {
      this.workFlowForm.get('firstContact').setValidators([Validators.required]);
      this.workFlowForm.get('firstOperator').setValidators([Validators.required]);
      this.workFlowForm.get('secondContact').setValidators([Validators.required]);
      this.workFlowForm.get('secondOperator').setValidators([Validators.required]);
      this.workFlowForm.get('thirdContact').setValidators([Validators.required]);
    }
    this.workFlowForm.get('firstContact').updateValueAndValidity();
    this.workFlowForm.get('firstOperator').updateValueAndValidity();
    this.workFlowForm.get('secondContact').updateValueAndValidity();
    this.workFlowForm.get('secondOperator').updateValueAndValidity();
    this.workFlowForm.get('thirdContact').updateValueAndValidity();
    console.log(this.workFlowForm)
  

    if(this.workFlowForm.status=='VALID'){
      let data = {
    workFlowName:form.name,
    numberOfApprover:form.approvars,
    firstContact:form.firstContact,   
    operator1:form.firstOperator,
    secondContact:form.secondContact,
    operator2:form.secondOperator,
    thirdContact:form.thirdContact,
    description:"",  
    status:"true" 
  }
  

let url ="updateWorkFlowConfigurationMaster/"+this.editId
this._service.add(data, url).subscribe((res)=>{
  console.log(res);
  if (res.respose = "Success"){
    Swal.fire(
      'Success!',
      'Data was added SuccessFully.',
      'success'
    )
    this.router.navigate(['/layout/masters/workFlow'])
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
        text: 'Something Went Wrong',
       
      })
      this.workFlowForm.markAllAsTouched();
    }



  }

// update(){
//   if(this.workFlowForm.valid){
//     let url ="updateWorkFlowConfigurationMaster/"+this.editId
//     this._service.add(this.workFlowForm.value, url).subscribe((res)=>{
//       if (res.respose = "Success"){
//         Swal.fire(
//           'Success!',
//           'Data was added SuccessFully.',
//           'success'
//         )
//         this.router.navigate(['/layout/masters/workFlow'])
//       }
     
//       else{
//         Swal.fire({
//           icon: 'error',
//           title: 'Oops...',
//           text: 'Something went wrong!',
         
//         })
//       }
//       });
//     }
//         else{
//           alert("Invalid")
//           this.workFlowForm.markAllAsTouched();
//         }
//   }



  cancel(){
    this.workFlowForm.reset();
    this.workFlowForm.clearValidators();
    this.showTable();
  }
  showTable(){
    this.router.navigate(['/layout/masters/workFlow'])
  }
}
