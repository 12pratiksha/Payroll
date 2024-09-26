import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AllModulesService } from '../../all-modules.service';

@Component({
  selector: 'app-ot-adjustment-setup',
  templateUrl: './ot-adjustment-setup.component.html',
  styleUrls: ['./ot-adjustment-setup.component.css']
})
export class OtAdjustmentSetupComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  showMyContainer:boolean = false;
  otPlanForm: FormGroup
  tableData: any;
  editId: null;
  disabled: boolean = false
  loader = true
  constructor(public _fb:FormBuilder, public _service:AllModulesService, public router: Router) { }
  ngOnInit(): void {
    this.dtOptions = {
      // ... skipped ...
      dom: 'lrtip',
      processing: true
   }
    this.otDataTable();
    this.otPlanForm = this._fb.group({
      planName:['', Validators.required],
      quantities: this._fb.array([])
    })
    
      }
      newQuantity(): FormGroup {
        return this._fb.group({
          otMinutesTo:'',
          otMinutesFrom:'',
          otBecomes:'',
         
        })
  }
quantities() : FormArray {
  return this.otPlanForm.get("quantities") as FormArray
}
addQuantity() {
  this.quantities().push(this.newQuantity());
}
submitDepartureForm(){
  console.log(this.otPlanForm)
}
removeQuantity(i:number) {
  this.quantities().removeAt(i);
}

submitOtForm(){
  if(this.otPlanForm.status == "VALID"){
    this.disabled = true
  let data = {
    planName:this.otPlanForm.value.planName,
    otdepartureDetails: this.otPlanForm.value.quantities,

  }
  this._service.add(data,'OTDepartureMaster/addOTDepature').subscribe((res)=>{
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
      this.disabled = false
    }
    else if(res.respose == "Already"){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Record Already Exists!',
    
      })
      this.disabled = false
     }
     else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
    
      })
      this.disabled = false
     }
  })

}
else{
  this.otPlanForm.markAllAsTouched();
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Something went wrong!',
    
  })
  this.disabled = false
   }
  
}

otDataTable(){
  this._service.get('OTDepartureMaster/getAllOTDepature').subscribe((res)=>{
    console.log(res)
    this.tableData = res;
    this.loader = false
  },(error)=>{
    
    this.loader = false
    console.log(error)
    alert("Something Went Wrong")
})
}


editPlan(id){
this.editId = id
this.showMyContainer = true;
this.otPlanForm.reset();
this.quantities().removeAt(0);
let url = 'OTDepartureMaster/getOTDepature/' + `${this.editId}`

this._service.get(url).subscribe((res)=>{
  console.log(res)
  this.otPlanForm.get('planName').setValue(res.planName)
  res.otdepartureDetails.forEach(element => {
    console.log(element)
    this.quantities().push(this._fb.group({
      otMinutesTo:element.otMinutesTo,
      otMinutesFrom:element.otMinutesFrom,
      otBecomes:element.otBecomes,
    }))
  });
})
}

updateOtForm(){
if (this.otPlanForm.valid){
  this.disabled = true

  let data = {
    planName:this.otPlanForm.value.planName,
    otdepartureDetails: this.otPlanForm.value.quantities,

  }
  let url = 'OTupdateotDepature/'+`${this.editId}`
  this._service.add(data,url).subscribe((res)=>{
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
      this.disabled = false
    }
    else if(res.respose == "Already"){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Record Already Exists!',
    
      })
      this.disabled = false
     }
     else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
    
      })
      this.disabled = false
     }
      }); 
      }
      else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          
        })
        this.disabled = false
      }


  
}

cancel(){
  while(this.quantities().length !=0){

    this.quantities().removeAt(0);
  }
this.editId=null
this.showMyContainer = false
this.otPlanForm.reset()
this.otDataTable();
}
delete(id){
  this.disabled = true
let url = 'OTDepartureMaster/deleteOTDepature/'+`${id}`
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
      if(res.respose == 'Success'){
        
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        const currentRoute = this.router.url;

        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([currentRoute]); // navigate to same route
        }); 
        this.disabled = false
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            
          })
          this.disabled = false
        }
    })
   
  }
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

}
