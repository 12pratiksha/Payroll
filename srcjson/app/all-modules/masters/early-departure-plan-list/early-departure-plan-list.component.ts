import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AllModulesService } from 'src/app/all-modules/all-modules.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-early-departure-plan-list',
  templateUrl: './early-departure-plan-list.component.html',
  styleUrls: ['./early-departure-plan-list.component.css']
})
export class EarlyDeparturePlanListComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  showMyContainer:boolean = false;
  departurePlanForm: FormGroup
  departureDetails: any;
  editPlanId: null;
  minutes = [
'00:00', '00:01', '00:02', '00:03', '00:04', '00:05', '00:06', '00:07', '00:08', '00:09', '00:10', '00:11', '00:12', '00:13', '00:14', '00:15', '00:16', '00:17', '00:18', '00:19', '00:20',
'00:21', '00:22', '00:23', '00:24', '00:25', '00:26', '00:27', '00:28', '00:29', '00:30', '00:31', '00:32', '00:33', '00:34', '00:35', '00:36', '00:37', '00:38', '00:39', '00:40',
'00:41', '00:42', '00:43', '00:44', '00:45', '00:46', '00:47', '00:48', '00:49', '00:50', '00:51', '00:52', '00:53', '00:54', '00:55', '00:56', '00:57', '00:58', '00:59', ]
 
showContainer(){
  this.showMyContainer = true
  this.addQuantity()
}
hideMyContainer(){
this.cancelForm();
}
constructor(public _fb:FormBuilder,public _service:AllModulesService, public router: Router) { }
  ngOnInit(): void {
    this.dtOptions = {
      // ... skipped ...
      dom: 'lrtip',
      processing: true
   }
   this.getLeave()
    this.getEarlyDeparture();
    this.departurePlanForm = this._fb.group({
      planName:['',Validators.required],
      exemptDays:['',Validators.required],
      everyEarlyDays:['',Validators.required],
      status:[''],
      quantities: this._fb.array([
       
      ])
    })

      }
      newQuantity(): FormGroup {
        return this._fb.group({
          earlyMinuteTo1:'',
          earlyMinutesFrom1:'',
          deductionType:'',
          depatureLeave:'',
          leaveValue:'',
          deductHourWork1:'0.5',
         
        })
  }
quantities() : FormArray {
  return this.departurePlanForm.get("quantities") as FormArray
}
addQuantity() {
  this.quantities().push(this.newQuantity());
}

removeQuantity(i:number) {
  this.quantities().removeAt(i);
}

submitDepartureForm(){

  if(this.departurePlanForm.status == "VALID"){
    let form = this.departurePlanForm.value
    
    console.log(this.departurePlanForm.value.quantities)
     let data = {
       planName:form.planName,
       earlyExemptDays: form.exemptDays,
       everyEarlyDays: form.everyEarlyDays,
       status: form.status,
       earlyDepartureDetails: form.quantities
     }
     console.log(data)
     this._service.add(data,'earlyDepartureMaster/addEarlyDepature').subscribe((res)=>{
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
          text: 'Record Already Exists!',
      
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
    this.departurePlanForm.markAllAsTouched();
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
       
    })
    return
   }
  }


  cancelForm(){
    while(this.quantities().length !=0){

      this.quantities().removeAt(0);
    }
    this.showMyContainer=false;
    this.departurePlanForm.reset()
    this.editPlanId = null
    const currentRoute = this.router.url;
    
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentRoute]); // navigate to same route
    }); 
  }
loader = true
  getEarlyDeparture(){

this._service.get('earlyDepartureMaster/getAllEarlyDepature').subscribe((res)=>{
  console.log(res)
  this.loader = false
  this.departureDetails = res 

},(error)=>{
    
  this.loader = false
  console.log(error)
  alert("Something Went Wrong")
}
)

  }
  editPlan(id){
    this.editPlanId = id
    console.log(id)
    this.showMyContainer=true;

    let url = 'earlyDepartureMaster/getEarlyDepature/'+id
this._service.get(url).subscribe((res)=>{
  // console.log(res)


  this.departurePlanForm.get('planName').setValue(res.planName)
  this.departurePlanForm.get('exemptDays').setValue(res.earlyExemptDays)
  this.departurePlanForm.get('everyEarlyDays').setValue(res.everyEarlyDays)
  this.departurePlanForm.get('status').setValue(res.status)
  res.earlyDepartureDetails.forEach(element => {
    console.log(element)

  this.quantities().push(this._fb.group({
    earlyMinuteTo1:element.earlyMinuteTo1,
    earlyMinutesFrom1:element.earlyMinutesFrom1,
    deductionType:element.deductionType,
    depatureLeave:element.depatureLeave,
    leaveValue:element.leaveValue,
    deductHourWork1:element.deductHourWork1,
   
  }))
});
})

  }
  updateDepartureForm(){
    if(this.departurePlanForm.status == "VALID"){
      let form = this.departurePlanForm.value
       let data = {
         planName:form.planName,
         earlyExemptDays: form.exemptDays,
         everyEarlyDays: form.everyEarlyDays,
         status: form.status,
         earlyDepartureDetails: form.quantities
       }
  let url = 'earlyDepartureMaster/updateEarlyDepature/'+`${this.editPlanId}`
    this._service.update(data,url).subscribe((res)=>{
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
          text: 'Record Already Exists!',
      
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

  // this.router.navigate(['/layout/masters/earlyDeparturePlanList'])
  }
  else{
    this.departurePlanForm.markAllAsTouched();
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      
    })

   }
  }

  delete(id){

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
        this._service.delete(id, 'earlyDepartureMaster/deleteEarlyDepature').subscribe((res)=>{
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
      this.getEarlyDeparture();
      
    })
  }
  leave
  getLeave(){
    this._service.get('getgetCodeByType?type=Leave Code').subscribe((res)=>{
      this.leave = res
    })
  }
}
