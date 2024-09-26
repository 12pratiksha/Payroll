import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2';
import { AllModulesService } from '../../all-modules.service';

@Component({
  selector: 'app-shift-policy',
  templateUrl: './shift-policy.component.html',
  styleUrls: ['./shift-policy.component.css']
})
export class ShiftPolicyComponent implements OnInit {
  selectedOption:any;
  submitLoader : boolean = false
  shiftMasterForm: FormGroup;
  generalShiftForm: FormGroup;
  flexibleShiftForm: FormGroup;
  noShiftForm:FormGroup;
  showMyContainer: boolean = true;
  markAbs: boolean = true
  options=[
    {value:"NoShiftHours"},
    {value:"Flexibe"},
    {value:"General"},
  ]
  minutes = [
    '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
    '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40',
    '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', ]
  hours = [ '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12' ]
  shiftTable: any;
  deleteShiftPoicyId: any;
  editshiftData: any;
  editShiftName: any;
  editShiftwithID: any = null;
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  dtOptions: any = {};
  loader: boolean = true;
  generalBrakHours: boolean = false;
  saturdatBreak: boolean= false;
  shiftInvalid: boolean = false;
  shiftDifference: number = 0;
  constructor(public fb:FormBuilder, public _service: AllModulesService,  private router: Router) { }

  ngOnInit(): void {
    // console.log(this.editShiftwithID)
    
  
setTimeout(() => {
  this.loader=false
}, 10000);
    this.getAllShifts();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'print'
        ]
    };

this.shiftMasterForm = this.fb.group({
 type:['', Validators.required],
 shiftName:['', Validators.required],

})

// flexiForm
this.flexibleShiftForm = this.fb.group({

  shiftHours:[''],
  breakHoursDeduct:[''],
  shiftStartTime:[''],
  shiftEndTime:[''],
  breakHours:[''],
  satTiming:[''],
  satShiftHours:[''],
  satBreakHours:[''],
  satBreakHoursDeduct:[''],
  presentMarkingDuration:[''],
  presentHalfMarkingDuration:[''],
  otStart:[''],
 
  roundOverTime:[''],
  status:[''],
  payOnHoursBases:['']

})
//end flexiForm

// general shift form

this.generalShiftForm = this.fb.group({
  shiftHours:[''],
  shiftStartTime: [''],
  breakStartTime: [''],
  shiftEndTime: [''],
  breakEndTime: [''],
  nightShift: [''],
  breakHoursDeduct: [''],
  saturdayBreakDeduct: [''],
  beforeShiftTime: [''],
  afterShiftTime: [''],
  // presentMarkingDuration: [''],
  presentMarkingDurationmin: ['00'],
  presentMarkingDurationhr: ['00'],
  // presentHalfMarkingDuration: [''],
  presentHalfMarkingDurationhr: ['00'],
  presentHalfMarkingDurationmin: ['00'],
  // markAbsentAfterLate: [''],
  markAbsentAfterLatehr: ['00'],
  markAbsentAfterLatemin: ['00'],
  // otBeforeShiftStarts: [''],
  otBeforeShiftStartshr: ['00'],
  otBeforeShiftStartsmin: ['00'],
  // otAfterShiftEnd:[''],
  otAfterShiftEndhr:['00'],
  otAfterShiftEndmin:['00'],
  // markHalfDayAfterLate: [''],
  markHalfDayAfterLatehr: ['00'],
  markHalfDayAfterLatemin: ['00'],
  startTimeForInPunch: ['', Validators.required],
  otCalculation: [''],
  endTimeforOutPunch: ['', Validators.required],
  roundOverTime: [''],
  status: [''],
  // saturdayShiftHours:[''],
  // saturdayBreakTime:[''],
  satShiftStartTime:[''],
  satBreakStartTime:[''],
  satShiftEndTime:[''],
  satBreakEndTime:[''],
  markabsent:[''],
  markhalf:[''],
  otstart:[''],
  otend:[''],


})
this.noShiftForm=this.fb.group({
  shiftHours:[''],
  presentMarkingDurationhr:['00'],
  presentMarkingDurationmin:['00']
})

// general shift form

this.dtOptions = {
  pagingType: 'full_numbers',
  pageLength: 10,
  processing: true,
  dom: 'Bfrtip',
    buttons: [
        'copy', 'csv', 'excel', 'print'
    ]
};

}

makedefault(e,shift,defaultvalue){

  Swal.fire({
    title: 'DO you want to make this default shift?',
    text: "",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, Make Default!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: 'Loading...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading()
        }
      })

    shift.defultShift = defaultvalue

    console.log(shift.defultShift);

   this._service.add(shift, 'shifts/makedefaultShift').subscribe((res)=>{
    this.shiftTable = res
    Swal.fire({
      
      icon: 'success',
      title: 'Default Shift Updated',
      showConfirmButton: false,
      timer: 1500,
      didOpen: () => {
        Swal.hideLoading()
      }
    })
    const currentRoute = this.router.url;

    this.router.navigate([currentRoute]); // navigate to same route
  });
    }
  });

}


test(){
console.log(this.selectedOption)

}
 showContainerFn(){
  this.showMyContainer = false;
  
 }
 hideContainer(){
  const currentRoute = this.router.url;

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentRoute]); // navigate to same route
    }); 

 }

// cancel flexibleShiftForm

cancelFlexiContainer(){
this.hideContainer()
}

// cancel flexibleShiftForm


//............................................................ shifts data table...................................................................

getAllShifts(){

this._service.get('shifts/getAllShift').subscribe((res)=>{

this.shiftTable = res
this.loader = false;
},(error)=>{
    
  this.loader = false
  console.log(error)
  alert("Something Went Wrong")
})

}


// ................................................................end shifts data table ............................................................

//................................................................ Flexibe form submit...............................................................  

 
noShiftFormSubmit(){
  let form=this.noShiftForm.value;
  let Data={
  shiftType:this.shiftMasterForm.value.type,
  shiftName: this.shiftMasterForm.value.shiftName,
  shiftHours: form.shiftHours,
  presentMarkingDuration: form.presentMarkingDurationhr +':'+form.presentMarkingDurationmin
}
this._service.add(Data, 'shifts/addShift').subscribe((res)=>{
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
      text: 'Record Already Exists',
  
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

flexibleFormSumit(){

  let form = this.flexibleShiftForm.value;

let breakHours = form.breakHours.toFixed(1)
let satBreakHours = form.satBreakHours.toFixed(1)
let Data ={
  breakHourse : breakHours,
  breakHourseDeduct : form.breakHoursDeduct,
  otStartAfterShiftEnd : form.otStart,
  presentHalfMarking : form.presentHalfMarkingDuration,
  presentMarkingDuration : form.presentMarkingDuration,
  roundOverTime : form.roundOverTime,
  saturdayBreakHours : satBreakHours,
  satBreakHoursDeduct : form.satBreakHoursDeduct,
  satShiftHours : form.satShiftHours,
  shiftEndTime : form.shiftEndTime,
  shiftHours : form.shiftHours,
  shiftStartTime : form.shiftStartTime,
  active : form.status,
  PayOnHoursBases:form.payOnHoursBases,
    shiftType : this.shiftMasterForm.value.type,
    shiftName : this.shiftMasterForm.value.shiftName,
   halfMarkingDuration : "",
    etPunchRTC : "",
    otCalculationType : "",
    stPunchRTC : "",
    otStartAfterShift : "",
    halfDayLate : "",
    otStartBeforeShift : "",
    absentAfterLate : "",
    afterShiftTime : "",
    beforeShiftTime : "",
    presentMarking : "",
    breakEndTime : "",
    breakStartTime: "",
    breakHoursDeduct : "",
    nightSift : "",
    
}

this._service.add(Data, 'shifts/addShift').subscribe((res)=>{
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
      text: 'Record Already Exists',
  
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

//...............................................end Flexibe form submit  .....................................................................
generalBreakTime(e,o){
  console.log(e,o)
if(o > e){
  this.generalBrakHours = true
}
else{
  this.generalBrakHours = false
}

}
satBreakTime(e,o){
  if(o > e){
    this.saturdatBreak = true
  }
  else{
    this.saturdatBreak = false
  }
}
//........................................................general form submit .......................................................................

generalFormSubmit(){

if ( this.generalShiftForm.valid){
  let form = this.generalShiftForm.value
 

  let Data ={
    breakHourse : form.breakHours,
    breakHourseDeduct :form.breakHoursDeduct,
    otStartAfterShiftEnd : form.otStartAfterShiftEnd,
    halfMarkingDuration : form.presentHalfMarkingDurationhr + ":" +form.presentHalfMarkingDurationmin,
    presentMarkingDuration : form.presentMarkingDurationhr +':'+form.presentMarkingDurationmin ,
    roundOverTime : form.roundOverTime,
    saturdayBreakHours : form.satBreakHours,
    satBreakHoursDeduct : form.saturdayBreakDeduct,
    satShiftHours : "",
    shiftEndTime : form.shiftEndTime,
    shiftHours : "",
    shiftStartTime : form.shiftStartTime,
    active : form.status,
      shiftType :this.shiftMasterForm.value.type,
      shiftName : this.shiftMasterForm.value.shiftName,
      etPunchRTC : form.endTimeforOutPunch,
      otCalculationType : form.otCalculation,
      stPunchRTC : form.startTimeForInPunch,
      otStartAfterShift : form.otAfterShiftEndhr+":"+form.otAfterShiftEndmin,
      // halfDayLate : form.markHalfDayAfterLatehr+":"+form.markHalfDayAfterLatemin,
      otStartBeforeShift : form.otBeforeShiftStartshr+':'+form.otBeforeShiftStartsmin,
      // absentAfterLate : form.markAbsentAfterLatehr+":"+form.markAbsentAfterLatemin,
      afterShiftTime : form.afterShiftTime,
      beforeShiftTime : form.beforeShiftTime,
      presentMarking : form.presentMarkingDuration,
      breakEndTime : form.breakEndTime,
      breakStartTime: form.breakStartTime,
      breakHoursDeduct : form.saturdayBreakDeduct,
      nightSift: form.nightShift,
      saturdayShiftStartTime: form.satShiftStartTime,
      saturdayShiftEndTime: form.satShiftEndTime,
      saturdayBreakStartTime: form.satBreakStartTime,
      saturdayBreakEndTime: form.satBreakEndTime,
      // markAbsentAfterLate:form.markabsent,
      // markHalfDayAfterLate: form.markhalf,
      otstartbeforeShiftStart:form.otstart,
      otstartAfterShiftEnd1: form.otend,
      shifthours:form.shiftHours
    }


    this.submitLoader = true

this._service.add(Data, 'shifts/addShift').subscribe((res)=>{
  if(res.respose == "Success"){
    Swal.fire({
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    })
    console.log(res)

    const currentRoute = this.router.url;

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentRoute]); // navigate to same route
    }); 
  }
  else if(res.respose == "Already"){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Record Already Exists',
  
    })

   }
   else{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
  
    })
 
   }
   this.submitLoader = false
})
}
else{
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Something went wrong!',

  })
  this.generalShiftForm.markAllAsTouched()
}
}


//........................................................end general form submit .......................................................................

//......................................................... delete shift policy.................................................................


deleteShiftPoicy(id){
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
      Swal.fire({
        title: 'Loading...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading()
        }
      })
      this._service.delete(id, 'shifts/deleteShiftById').subscribe((res)=>{

        if(res.respose == 'Success'){
          Swal.fire({
      
            icon: 'success',
            title: 'Employee Deleted Successfully',
            showConfirmButton: false,
            timer: 1500,
            didOpen: () => {
              Swal.hideLoading()
            }
          })
          const currentRoute = this.router.url;
  
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate([currentRoute]); // navigate to same route
          })
          }
          else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong',
              didOpen: () => {
                Swal.hideLoading()
              }
            })
          }
       
        })
     
    }
  })

 

}




//......................................................... delete shift policy.................................................................
editShiftPolicy(id){
this.editShiftwithID = id
  this.showMyContainer = false;
let url = 'shifts/getShiftById/'+`${this.editShiftwithID}`
  this._service.get(url).subscribe((res)=>{
   console.log(res)
   
    this.editshiftData = res
  if(res.halfMarkingDuration){
    let presenthalf = res.halfMarkingDuration.split(":",2)
    this.generalShiftForm.get('presentHalfMarkingDurationhr').setValue(presenthalf[0])
    this.generalShiftForm.get('presentHalfMarkingDurationmin').setValue(presenthalf[1])
  }

if(res.presentMarkingDuration){
  let presentMarkingDuration = res.presentMarkingDuration.split(":",2)
this.generalShiftForm.get('presentMarkingDurationhr').setValue(presentMarkingDuration[0])
this.generalShiftForm.get('presentMarkingDurationmin').setValue(presentMarkingDuration[1])
}
if(res.absentAfterLate){
  let absentAfterLate = res.absentAfterLate.split(":",2)
this.generalShiftForm.get('markAbsentAfterLatehr').setValue(absentAfterLate[0])
this.generalShiftForm.get('markAbsentAfterLatemin').setValue(absentAfterLate[1])
}
if(res.halfDayLate){
  let markHalfDayAfterLate = res.halfDayLate.split(":",2)
this.generalShiftForm.get('markHalfDayAfterLatehr').setValue(markHalfDayAfterLate[0])
this.generalShiftForm.get('markHalfDayAfterLatemin').setValue(markHalfDayAfterLate[1])
}
if(res.otStartBeforeShift){
  let otStartBeforeShift = res.otStartBeforeShift.split(":",2)
this.generalShiftForm.get('otBeforeShiftStartshr').setValue(otStartBeforeShift[0])
this.generalShiftForm.get('otBeforeShiftStartsmin').setValue(otStartBeforeShift[1])
}
if(res.otStartAfterShift){
  let otStartAfterShift = res.otStartAfterShift.split(":",2)
this.generalShiftForm.get('otAfterShiftEndhr').setValue(otStartAfterShift[0])
this.generalShiftForm.get('otAfterShiftEndmin').setValue(otStartAfterShift[1])
}
    this.shiftMasterForm.get('shiftName').setValue(res.shiftName)
    this.shiftMasterForm.get('type').setValue(res.shiftType)
this.generalShiftForm.get('shiftStartTime').setValue(res.shiftStartTime)
this.generalShiftForm.get('breakStartTime').setValue(res.breakStartTime)
this.generalShiftForm.get('shiftEndTime').setValue(res.shiftEndTime)
this.generalShiftForm.get('breakEndTime').setValue(res.breakEndTime)
this.generalShiftForm.get('nightShift').setValue(res.nightSift)
this.generalShiftForm.get('breakHoursDeduct').setValue(res.breakHoursDeduct)
this.generalShiftForm.get('saturdayBreakDeduct').setValue(res.satBreakHoursDeduct)
this.generalShiftForm.get('beforeShiftTime').setValue(res.beforeShiftTime)
this.generalShiftForm.get('afterShiftTime').setValue(res.afterShiftTime)

// this.generalShiftForm.get('markHalfDayAfterLate').setValue(res.halfDayLate)
this.generalShiftForm.get('otCalculation').setValue(res.otCalculationType)
this.generalShiftForm.get('status').setValue(res.active)
this.generalShiftForm.get('roundOverTime').setValue(res.roundOverTime)
this.generalShiftForm.get('satShiftStartTime').setValue(res.saturdayShiftStartTime)
this.generalShiftForm.get('satBreakStartTime').setValue(res.saturdayShiftEndTime)
this.generalShiftForm.get('satShiftEndTime').setValue(res.saturdayBreakStartTime)
this.generalShiftForm.get('satBreakEndTime').setValue(res.saturdayBreakEndTime)
this.generalShiftForm.get('shiftHours').setValue(res.shiftHours)


this.generalShiftForm.get('startTimeForInPunch').setValue(res.stPunchRTC) 
this.generalShiftForm.get('endTimeforOutPunch').setValue(res.etPunchRTC)
this.generalShiftForm.get('markabsent').setValue(res.markAbsentAfterLate)
this.generalShiftForm.get('markhalf').setValue(res.markHalfDayAfterLate)
this.generalShiftForm.get('otstart').setValue(res.otstartbeforeShiftStart)
this.generalShiftForm.get('otend').setValue(res.otstartAfterShiftEnd1)
// this.generalShiftForm.get('saturdayBreakTime').setValue(res.saturdayBreakHours)

// this.generalShiftForm.get('otBeforeShiftStarts').setValue(res.otStartBeforeShift)
// this.generalShiftForm.get('presentHalfMarkingDuration').setValue(res.halfMarkingDuration)
// this.generalShiftForm.get('presentMarkingDuration').setValue(res.presentMarkingDuration)
// this.generalShiftForm.get('markAbsentAfterLate').setValue(res.absentAfterLate)
// this.generalShiftForm.get('otAfterShiftEnd').setValue(res.otStartAfterShift)
this.shiftTime(res.shiftEndTime, res.shiftStartTime)

this.flexibleShiftForm.get('shiftHours').setValue(res.shiftHours)
this.flexibleShiftForm.get('breakHoursDeduct').setValue(res.breakHourseDeduct)
this.flexibleShiftForm.get('shiftStartTime').setValue(res.shiftStartTime)
this.flexibleShiftForm.get('shiftEndTime').setValue(res.shiftEndTime)
this.flexibleShiftForm.get('breakHours').setValue(res.breakHourse)
this.flexibleShiftForm.get('satShiftHours').setValue(res.satShiftHours)
this.flexibleShiftForm.get('satBreakHours').setValue(res.saturdayBreakHours)
this.flexibleShiftForm.get('satBreakHoursDeduct').setValue(res.satBreakHoursDeduct)
this.flexibleShiftForm.get('presentMarkingDuration').setValue(res.presentMarkingDuration)
this.flexibleShiftForm.get('presentHalfMarkingDuration').setValue(res.presentHalfMarking)
this.flexibleShiftForm.get('otStart').setValue(res.otStartAfterShiftEnd)
this.flexibleShiftForm.get('roundOverTime').setValue(res.roundOverTime)
this.flexibleShiftForm.get('status').setValue(res.active)
this.flexibleShiftForm.get('payOnHoursBases').setValue(res.payOnHoursBases)


this.noShiftForm.get('shiftHours').setValue(res.shiftHours)
console.log(res.presentMarkingDuration)
//this.noShiftForm.get('presentMarkingDuration').setValue(res.presentMarkingDuration)
let presentMarkingDuration = res.presentMarkingDuration.split(":",2)
this.noShiftForm.get('presentMarkingDurationhr').setValue(presentMarkingDuration[0])
this.noShiftForm.get('presentMarkingDurationmin').setValue(presentMarkingDuration[1])

// this.flexibleShiftForm.get('satTiming').setValue()

})

}
updateflexiShiftForm(){
console.log(this.editShiftwithID)
let form = this.flexibleShiftForm.value;
let breakHours = form.breakHours.toFixed(1)
let satBreakHours = form.satBreakHours.toFixed(1)
let Data ={
  breakHourse : breakHours,
  breakHourseDeduct : form.breakHoursDeduct,
  otStartAfterShiftEnd : form.otStart,
  presentHalfMarking : form.presentHalfMarkingDuration,
  // presentHalfMarking : "33",
  presentMarkingDuration : form.presentMarkingDuration,
  roundOverTime : form.roundOverTime,
  saturdayBreakHours : satBreakHours,
  // saturdayBreakHours : 1,
  satBreakHoursDeduct : form.satBreakHoursDeduct,
  satShiftHours : form.satShiftHours,
  shiftEndTime : form.shiftEndTime,
  shiftHours : form.shiftHours,
  shiftStartTime : form.shiftStartTime,
  
  active : form.status,
  payOnHoursBases:form.payOnHoursBases,
    shiftType : this.shiftMasterForm.value.type,
    shiftName : this.shiftMasterForm.value.shiftName,
   halfMarkingDuration : "",
    etPunchRTC : "",
    otCalculationType : "",
    stPunchRTC : "",
    otStartAfterShift : "",
    halfDayLate : "",
    otStartBeforeShift : "",
    absentAfterLate : "",
    afterShiftTime : "",
    beforeShiftTime : "",
    presentMarking : "",
    breakEndTime : "",
    breakStartTime: "",
    breakHoursDeduct : "",
    nightSift : "",
    
}


    console.log(Data)
    let url = 'shifts/updateShiftById/' + `${this.editShiftwithID}`
    this._service.update(Data, url).subscribe((res)=>{
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
          text: 'Record Already Exists',
      
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
updateGeneralShiftForm(){
  let form = this.generalShiftForm.value
  let Data ={
    breakHourse : form.breakHours,
    breakHourseDeduct :form.breakHoursDeduct,
    otStartAfterShiftEnd : form.otStartAfterShiftEnd,
    halfMarkingDuration : form.presentHalfMarkingDurationhr + ":" +form.presentHalfMarkingDurationmin,
    presentMarkingDuration : form.presentMarkingDurationhr +':'+form.presentMarkingDurationmin ,
    roundOverTime : form.roundOverTime,
    saturdayBreakHours : form.satBreakHours,
    satBreakHoursDeduct : form.saturdayBreakDeduct,
    satShiftHours : "",
    shiftEndTime : form.shiftEndTime,
    shiftStartTime : form.shiftStartTime,
    active : form.status,
      shiftType :this.shiftMasterForm.value.type,
      shiftName : this.shiftMasterForm.value.shiftName,
      etPunchRTC : form.endTimeforOutPunch,
      otCalculationType : form.otCalculation,
      stPunchRTC : form.startTimeForInPunch,
      otStartAfterShift : form.otAfterShiftEndhr+":"+form.otAfterShiftEndmin,
      // halfDayLate : form.markHalfDayAfterLatehr+":"+form.markHalfDayAfterLatemin,
      otStartBeforeShift : form.otBeforeShiftStartshr+':'+form.otBeforeShiftStartsmin,
      // absentAfterLate : form.markAbsentAfterLatehr+":"+form.markAbsentAfterLatemin,
      afterShiftTime : form.afterShiftTime,
      beforeShiftTime : form.beforeShiftTime,
      presentMarking : form.presentMarkingDuration,
      breakEndTime : form.breakEndTime,
      breakStartTime: form.breakStartTime,
      breakHoursDeduct : form.saturdayBreakDeduct,
      nightSift: form.nightShift,
      saturdayShiftStartTime: form.satShiftStartTime,
      saturdayShiftEndTime: form.satShiftEndTime,
      saturdayBreakStartTime: form.satBreakStartTime,
      saturdayBreakEndTime: form.satBreakEndTime,
      // markAbsentAfterLate:form.markabsent,
      // markHalfDayAfterLate: form.markhalf,
      otstartbeforeShiftStart:form.otstart,
      otstartAfterShiftEnd1: form.otend,
      shifthours:form.shiftHours,
    }
    this.submitLoader = true
let url = 'shifts/updateShiftById/' + `${this.editShiftwithID}`
this._service.update(Data, url).subscribe((res)=>{
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
      text: 'Record Already Exists',
  
    })
    this.submitLoader = false
   }
   else{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
  
    })
    this.submitLoader = false
   }
})

}
updateNoShiftForm(){
  let form=this.noShiftForm.value;
  let Data={
  shiftType:this.shiftMasterForm.value.type,
  shiftName: this.shiftMasterForm.value.shiftName,
  shiftHours: form.shiftHours,
  presentMarkingDuration: form.presentMarkingDurationhr +':'+form.presentMarkingDurationmin
}
this.submitLoader=true;
let url = 'shifts/updateShiftById/' + `${this.editShiftwithID}`
this._service.update(Data, url).subscribe((res)=>{
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
      text: 'Record Already Exists',
  
    })
    this.submitLoader = false
   }
   else{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
  
    })
    this.submitLoader = false
   }
})

}

generalTime(event){

if (event.target.checked){
  this.generalShiftForm.get('satShiftStartTime').setValue(this.generalShiftForm.value.shiftStartTime)
  this.generalShiftForm.get('satBreakStartTime').setValue(this.generalShiftForm.value.breakStartTime)
  this.generalShiftForm.get('satShiftEndTime').setValue(this.generalShiftForm.value.shiftEndTime)
  this.generalShiftForm.get('satBreakEndTime').setValue(this.generalShiftForm.value.breakEndTime)
}
else{
  this.generalShiftForm.get('satShiftStartTime').setValue("")
  this.generalShiftForm.get('satBreakStartTime').setValue("")
  this.generalShiftForm.get('satShiftEndTime').setValue("")
  this.generalShiftForm.get('satBreakEndTime').setValue("")
}
}
flexibleTime(event){
  if (event.target.checked){
    this.flexibleShiftForm.get('satShiftHours').setValue(this.flexibleShiftForm.value.shiftHours)
    this.flexibleShiftForm.get('satBreakHours').setValue(this.flexibleShiftForm.value.breakHours)
  }
  else{
    this.flexibleShiftForm.get('satShiftHours').setValue("")
    this.flexibleShiftForm.get('satBreakHours').setValue("")
  }
}

valuechange(event){
  let hour = 0
  let minute = 0
let time1 = event.split(':')
let time2 = this.flexibleShiftForm.value.shiftHours.split(':')
hour = parseInt(time1[0])+parseInt(time2[0])
minute = parseInt(time1[1])+parseInt(time1[1])
hour = hour + minute/60;
minute = minute%60;

console.log(hour + ':' + minute)
}


shiftTime(e, s){
  if(e && s){
    let startTime = new Date().setHours(this.GetHours(s), this.GetMinutes(s), 0);
    let endTime = new Date(startTime).setHours(this.GetHours(e), this.GetMinutes(e), 0);



console.log( this.GetHours(e)-this.GetHours(s))
// console.log( this.GetHours(s)-this.GetHours(e))

// if(this.GetHours(e)-this.GetHours(s) < (-7) && this.GetHours(e)-this.GetHours(s)>(-17) || this.GetHours(e)-this.GetHours(s) > 7 && this.GetHours(e)-this.GetHours(s) < 16 ){
//   alert("valid")
// }
// if(this.GetHours(e)-this.GetHours(s)> (-7) && this.GetHours(e)-this.GetHours(s)<(-17) ){
//   alert("invalid")
// }
 if( this.GetHours(e)-this.GetHours(s) < 8 && this.GetHours(e)-this.GetHours(s)> (-12) ){
 this.shiftInvalid = true

}
else if( this.GetHours(e)-this.GetHours(s) > 12 || this.GetHours(e)-this.GetHours(s) < -(16)){
  this.shiftInvalid = true
}
else{
  this.shiftInvalid = false
}

if(Math.sign(this.GetHours(e)-this.GetHours(s))== 1  ){

this.shiftDifference =  this.GetHours(e)-this.GetHours(s)
}
else if(Math.sign(this.GetHours(e)-this.GetHours(s))== -1 ){

this.shiftDifference =  this.GetHours(e)-this.GetHours(s)+24
}
}
}
GetHours(d) {
  var h = parseInt(d.split(':')[0]);
  if (d.split(':')[1].split(' ')[1]) {
      h = h + 12;
  }
  return h;
}
 GetMinutes(d) {
  return parseInt(d.split(':')[1].split(' ')[0]);
}
}
