import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder,FormArray, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AllModulesService } from '../../all-modules.service';
import * as xlsx from 'xlsx';

@Component({
  selector: 'app-late-departure-plan',
  templateUrl: './late-departure-plan.component.html',
  styleUrls: ['./late-departure-plan.component.css']
})
export class LateDeparturePlanComponent implements OnInit {
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  dtOptions: DataTables.Settings = {};
  showMyContainer:boolean = false;
  departurePlanForm: FormGroup
  departureDataTable: any;
  deleteDepartureId: any;
  editDepartureid: any= null ;
  lateDepartureDetails: any;
  leave: any;
  loader: boolean = true;
  minutes = [
    '00:00', '00:01', '00:02', '00:03', '00:04', '00:05', '00:06', '00:07', '00:08', '00:09', '00:10', '00:11', '00:12', '00:13', '00:14', '00:15', '00:16', '00:17', '00:18', '00:19', '00:20',
    '00:21', '00:22', '00:23', '00:24', '00:25', '00:26', '00:27', '00:28', '00:29', '00:30', '00:31', '00:32', '00:33', '00:34', '00:35', '00:36', '00:37', '00:38', '00:39', '00:40',
    '00:41', '00:42', '00:43', '00:44', '00:45', '00:46', '00:47', '00:48', '00:49', '00:50', '00:51', '00:52', '00:53', '00:54', '00:55', '00:56', '00:57', '00:58', '00:59', ]
  constructor(public _fb:FormBuilder,
     private _service: AllModulesService,
     private router: Router
    ) { }

  ngOnInit(): void {
    console.log(this.editDepartureid)
    this.dtOptions = {
      // ... skipped ...
      dom: 'lrtip',
      processing: true
   }
   let time = this.timeConvert(1);
   console.log(time)
   this.getLeave();
this.displayDepartureTable();
this.departurePlanForm = this._fb.group({
  planName:['', Validators.required],
  exemptDays:['', Validators.required],
  everyLateDays:[''],
  status:[''],
  quantities: this._fb.array([
    
  ])
})


  }

  exportToExcel(){
    // const arr = [
    //  [{RevisedSumInsured:'', RepairType: '',IndictiveRenewalPremium:'',CustCode:''}],
    // ];
   
   // const sheetName = ["sheet1"];
     const ws: xlsx.WorkSheet =  xlsx.utils.table_to_sheet(this.epltable.nativeElement);
     const wb: xlsx.WorkBook = xlsx.utils.book_new();
     xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    //  for (var i = 0; i < sheetName.length; i++) {
    //    const ws: xlsx.WorkSheet = xlsx.utils.json_to_sheet(arr[i]);
    //    xlsx.utils.book_append_sheet(wb, ws, sheetName[i]);
    //  }
     // ws['!cols'][11] = { hidden: false};
     
     xlsx.writeFile(wb, 'lateDeparturePlan.xlsx');
   }
   downloadAsPDF(sectionToPrint){
    const printContents = document.getElementById(sectionToPrint).innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print()
    document.body.innerHTML = originalContents;
  }

 
  showContainer(){
    this.showMyContainer=true;
    this.addQuantity()
  }
  hideMyContainer(){
    const currentRoute = this.router.url;

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentRoute]); // navigate to same route
    }); 
  } 
  timeConvert(n) {
    var num = n;
    var hours = (num / 60);
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return rhours.toString().padStart(2, '0') + ":" + rminutes.toString().padStart(2, '0') ;
    }
  newQuantity(): FormGroup {
    return this._fb.group({
      lateMinuteTo1:[''],
      lateMinutesFrom1:[''],
      depatureLeave:[''],
      leaveValue:[''],
      deductionType:[''],
      deductHourWork1:['0.5'],
    })
  }
  
quantities() : FormArray {
  return this.departurePlanForm.get("quantities") as FormArray
}
addQuantity() {
  this.quantities().push(this.newQuantity());
 
}
submitDepartureForm(){
  console.log(this.departurePlanForm)
if (this.departurePlanForm.status == "VALID"){
  let data = {
    planName: this.departurePlanForm.value.planName,
    lateExemptDays: this.departurePlanForm.value.exemptDays,
    everylateDays: this.departurePlanForm.value.everyLateDays,
    status: this.departurePlanForm.value.status,
    lateDepartureDetails:this.quantities().value
    // lateMinutesFrom: this.quantities().value[0].lateMinutesFrom,
    // lateMinuteTo:this.quantities().value[0].lateMinutesTo,
    // deductionType: this.quantities().value[0].deductionTypeName,
    // deductHourWork: this.quantities().value[0].deductionFromWorkHour,
    
  }
    console.log(data)
  this._service.add(data, 'addLateDepature').subscribe((res)=>{
     
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
   
displayDepartureTable(){
  this._service.get('getAllLateDepature').subscribe((res)=>{

    this.departureDataTable = res
  this.lateDepartureDetails =  res[0].lateDepartureDetails
    this.loader = false
  },(error)=>{
    
    this.loader = false
    console.log(error)
    alert("Something Went Wrong")
})

}


removeQuantity(i:number) {
  this.quantities().removeAt(i);
}
editDepartureForm(id){
  this.editDepartureid = id
  
let url = 'getLateDepature/'+ `${this.editDepartureid}`
this._service.get(url).subscribe((res)=>{
  console.log(res.lateDepartureDetails.length)
  this.showMyContainer = true;
  this.departurePlanForm.get('planName').setValue(res.planName)
  this.departurePlanForm.get('exemptDays').setValue(res.lateExemptDays)
  this.departurePlanForm.get('everyLateDays').setValue(res.everylateDays)
  this.departurePlanForm.get('status').setValue(res.status);
  
  res.lateDepartureDetails.forEach((item)=>{
    console.log(item.depatureLeave)
    this.quantities().push(this._fb.group({
      lateMinuteTo1:item.lateMinuteTo1,
      lateMinutesFrom1:item.lateMinutesFrom1,
      depatureLeave:item.depatureLeave,
      leaveValue:item.leaveValue,
      deductionType:item.deductionType,
      deductHourWork1:item.deductHourWork1,
    }))
  })

})

}
getDeprtureId(id){
  this.deleteDepartureId = id
}
deleteDepartureForm(){
console.log(this.deleteDepartureId)
let url = 'LateDeparture/deleteLateDepature/' + `${this.deleteDepartureId}`
this._service.delete(this.deleteDepartureId, 'LateDeparture/deleteLateDepature').subscribe((res)=>{

})
}
updateDepartureForm(){
  if (this.departurePlanForm.status == "VALID"){

      let data = {
        planName: this.departurePlanForm.value.planName,
        lateExemptDays: this.departurePlanForm.value.exemptDays,
        everylateDays: this.departurePlanForm.value.everyLateDays,
        status: this.departurePlanForm.value.status,
        lateDepartureDetails:this.quantities().value
      
      }
    
      let url = 'updateLateDepature/'+ `${this.editDepartureid}`
      this._service.update(data, url).subscribe((res)=>{
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
cancel(){
  const currentRoute = this.router.url;
    
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]); // navigate to same route
  }); 
while(this.quantities().length !=0){

  this.quantities().removeAt(0);
}
    
  
  this.displayDepartureTable();
  this.showMyContainer=false;
  this.editDepartureid=null
  this.departurePlanForm.reset();

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
      console.log(id)
let url = 'deleteLateDepature/'+`${id}`
this._service.delete(id, 'deleteLateDepature').subscribe((res)=>{
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
  })
}
getLeave(){
  this._service.get('getgetCodeByType?type=Leave Code').subscribe((res)=>{
    this.leave = res
  })
}
}
