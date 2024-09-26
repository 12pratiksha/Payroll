import { Component, OnInit,} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AllModulesService } from '../../all-modules.service';
import { CalendarCreatorService } from "../calendar-creator.service";
import { Day } from "../day.model";

@Component({
  selector: 'app-shift-scheduling',
  templateUrl: './shift-scheduling.component.html',
  styleUrls: ['./shift-scheduling.component.css']
})
export class ShiftSchedulingComponent implements OnInit {
  shiftScheduling: FormGroup;
  public monthDays: Day[];
  hide: boolean = false
  public monthNumber: number;
  public year: number;
  months = [{id:0, month: 'January', number: '01'}, {id:1, month: 'February', number: '02'}, {id:2, month: 'March', number: '03'}, {id:3, month: 'April', number: '04'}, {id:4, month: 'May', number: '05'}, {id:5, month: 'June', number: '06'},
  {id:6, month: 'July', number: '07'}, {id:7, month: 'August', number: '08'}, {id:8, month: 'September', number: '09'}, {id:9, month: 'October', number: '10'}, {id:10, month: 'November', number: '11'}, {id:11, month: 'December', number: '12'}]
  years = [2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030]
  public weekDaysName = [];
  employees: any;
  shiftValue: any = [];
  month: string;
  shifts: any;
  shiftmonth: string;
  schedules: any;
  id: any;
  shiftArray: any;
  ShowMonth: boolean = false;
  userType: string;
  empId: string;
  shift1: any;
  errorMessage: any;
  disabled=false;
selectedmonth:any;
selectedyear:any;
selectedemp:any;
flag: boolean = false;
  array: any=[];
  employee1: any;
  selected: any;
  constructor(public calendarCreator: CalendarCreatorService, public _service:AllModulesService, public fb:FormBuilder) {}

  ngOnInit(): void {
  this.userType=localStorage.getItem('type')
  this.empId=localStorage.getItem('empid')
    this.setMonthDays(this.calendarCreator.getCurrentMonth());
    this.getEmployees();
    this.getAllShifts();
    // console.log(this.calendarCreator.getCurrentMonth())
    this.weekDaysName.push("Mo");
    this.weekDaysName.push("Tu");
    this.weekDaysName.push("We");
    this.weekDaysName.push("Th");
    this.weekDaysName.push("Fr");
    this.weekDaysName.push("Sa");
    this.weekDaysName.push("Su");
    this.shiftScheduling = this.fb.group({
      employee:['', Validators.required],
      month:[this.monthNumber, Validators.required],
      year:[this.year, Validators.required],
      
    })


  }

  onNextMonth(): void {
    this.monthNumber++;

    if (this.monthNumber == 13) {
      this.monthNumber = 1;
      this.year++;
     
    }
    
    this.setMonthDays(this.calendarCreator.getMonth(this.monthNumber, this.year));
    this.monthDays.forEach(element => {
 
      this.shiftValue[element.number]="";
     
  
    });
    this.getShiftSchedules();
    
  }

  onPreviousMonth() : void{
    this.monthNumber--;

    if (this.monthNumber < 1) {
      this.monthNumber = 12;
      this.year--;
      
    }

    this.setMonthDays(this.calendarCreator.getMonth(this.monthNumber, this.year));
    this.monthDays.forEach(element => {
 
      this.shiftValue[element.number]="";
      
  
    });
    this.getShiftSchedules();

  }

  private setMonthDays(days: Day[]): void {
    this.monthDays = days;
    this.monthNumber = this.monthDays[0].monthIndex;
    this.year = this.monthDays[0].year;
  }

  test(){

    console.log(">>"+this.flag);

    let form = this.shiftScheduling.value
   
      this.year++;
      this.setMonthDays(this.calendarCreator.getMonth(form.month, form.year));
      this.monthDays.forEach(element => {
   
        this.shiftValue[element.number]="";
       
    
      });
    this.shift1=[];
    this.shiftValue=[];
    this.flag=false;

  }
 
  async getEmployees(){
  //   this._service.get("employee_master/getemployees").subscribe((data) => {
  //     this.employees = data;
      
  // })
//   if(this.userType=='Admin'){
//     this._service.get("getAllActiveEmployees").subscribe((data) => {
//   this.employees = data;
//   console.log(data)
// });
//   }else{
//     this.employees=[];
//     let myemp=[];
//     let id = localStorage.getItem('empid')
//     let url = "getemployeesListByThere-RM1-RM2-Self?employeeId=" + id;
//     await this._service.get(url).subscribe((res) => {
//     console.log(res);
//     // console.log(">>>>>"+res.employeeId);
//    res.forEach(element => {
//       console.log(element)
//       this.employees.push({"employeeId":element.employeeId,"employeeCode":element.employeeCode,"firstName":element.firstName,"lastName":element.lastName});
//      console.log(">>>>>"+this.employees[0].employeeId); 
//     });

//     });



//   }
if(this.userType=='Admin' || this.userType=='Super Admin'){
  this._service.get("employee_master/getemployees").subscribe((data) => {
  this.employees = data;
  });
}
else{
  this.employees=[];
  let myemp=[];
  let id = localStorage.getItem('empid')
  let url = "employee_master/getemployee/" + id;
  await this._service.get(url).subscribe((res) => {
  console.log(res);
  console.log(">>>>>"+res.employeeId);
  this.employees.push({"employeeId":res.employeeId,"employeeCode":res.employeeCode,"firstName":res.firstName,"lastName":res.lastName});
  console.log(">>>>>"+this.employees[0].employeeId); 
  });
}
}

getAllShifts(){
  this._service.get('shifts/getAllShift').subscribe((res)=>{
  //  console.log(res)
    this.shifts = res
  })
}


  submit(){
    console.log(this.flag);
    console.log(this.selectedmonth+">>>>>>>>>>>>>>>>"+this.shiftmonth)
    console.log(this.selectedyear+">>>>>>>>>>"+this.year )
    console.log(this.selectedemp+">>>>>>>>>>>>>>>>>>>"+this.shiftScheduling.value.employee )

if(this.flag==true && this.selectedmonth==this.shiftmonth && this.selectedyear==this.year && this.selectedemp==this.shiftScheduling.value.employee){
  this.flag=false;
  console.log(">>>>yes")
  if(this.shiftScheduling.status == 'VALID'){
    this.monthDays.forEach(element => {
      
      this.month = element.month
     });
let arr = [{id:0, value:'01'}, {id:1, value:'02'}, {id:2, value:'03'}, {id:3, value:'04'}, {id:4, value:'05'}, {id:5, value:'06'}, {id:6, value:'07'},
{id:7, value:'08'}, {id:8, value:'09'}, {id:9, value:'10'}, {id:10, value:'11'}, {id:11, value:'12'},]

let month = arr[this.shiftScheduling.value.month]

let form = this.shiftScheduling.value
let url = 'addShiftScheduling?month='+ month.value + "&year=" + this.year + "&employeeId=" + form.employee
  
   let shift = []
   for(let i  = 1; i < this.shiftValue.length; i++){
   shift.push(this.shiftValue[i])
   }

 this._service.add(shift, url).subscribe((res)=>{
  if(res.respose == "Success"){
    Swal.fire({
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    })
    //window.location.reload();
    this.monthDays.forEach(element => {
 
      this.shiftValue=[];
      this.shift1=[];
      this.shiftScheduling.reset();
  
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
 
 this.reset()
   }
   else{
    this.shiftScheduling.markAllAsTouched()
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Select Employee',
  
    })
   }
}else{
  console.log(">>>>no")

  this.shiftScheduling.markAllAsTouched()
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Please click on Search Button first and then Submit',

  })
}



  
}

reset(){
  this.monthDays.forEach(element => {
 
    this.shiftValue[element.number]="";
    this.shiftScheduling.reset();

  });
}

getSchedules(event){
 
  this.id = event
}
  
getShiftSchedules(){
if(this.userType=='Admin'){
  this.hide = true
  // console.log(this.shiftScheduling)
  if (this.shiftScheduling.valid){
    let emp=this.shiftScheduling.value.employee.split(" ");
      let emply=this.employees.filter((emply)=>
      (emply.employeeCode == emp[0]))
    this.ShowMonth = true
    this.test();
  this.monthDays.forEach(element => {
      
    this.shiftmonth = element.month
     
     });
     Swal.fire({
      title: 'Loading...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading()
      }
    });
let shifts = []

let url1 ='shifts/getAllShiftdeptwise?&employeeId='+`${emply[0].employeeId}`
  this._service.get(url1).subscribe(res=>{
    console.log(res)
    if(res==null){
      Swal.fire({
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
      didOpen: () => {
        Swal.hideLoading()
      }
    })
      this.disabled=true;
this.errorMessage="There is no shifts are available for this department"
    }
    else{
      Swal.fire({
        icon: 'success',
       // title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500,
        didOpen: () => {
          Swal.hideLoading()
        }

      })
    //console.log(res.shiftName)
    this.shift1=res
    console.log(this.shift1)
    this.selectedmonth=this.shiftmonth;
    this.selectedyear=this.year;
    this.selectedemp=this.shiftScheduling.value.employee;
    this.flag=true;
    let url ='getAllShiftScheduling?month='+`${this.shiftmonth}`+'&year='+`${this.year}`+'&employeeId='+`${emply[0].employeeId}`
     this._service.get(url).subscribe((res)=>{
       this.schedules = res
       
       this.hide = false
if(res){
  for(let i = 0; i < res.length; i ++){

    if(res[i].defaultShift !== "No Shift" ){
    shifts.push(res[i].defaultShift)
    
    }
    else if(res[i].firstShift !== "No Shift" ){ 
    shifts.push(res[i].firstShift)
    }
    else if(res[i].secondShift !== "No Shift" ){
    shifts.push(res[i].secondShift)
    }
    else if (res[i].secondShift === "No Shift" && res[i].defaultShift === "No Shift" && res[i].firstShift === "No Shift"){
      shifts.push('')
    }
           }
           for (let i = 0; i < res.length; i ++){
            this.shiftValue[i+1] = res[i].defaultShift
          
          }
}
       

  
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
  this.shiftScheduling.markAllAsTouched();
 }
}
else{
  if (this.shiftScheduling.valid){
    
    this.ShowMonth = true
    this.test();
  this.monthDays.forEach(element => {
      
    this.shiftmonth = element.month
     
     });
     Swal.fire({
      title: 'Loading...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading()
      }
    });
let shifts = []

let url1 ='shifts/getAllShiftdeptwise?&employeeId='+`${this.shiftScheduling.value.employee}`
  this._service.get(url1).subscribe(res=>{
    console.log(res)
    if(res==null){
      Swal.fire({
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
      didOpen: () => {
        Swal.hideLoading()
      }
    })
      this.disabled=true;
this.errorMessage="There is no shifts are available for this department"
    }
    else{
      Swal.fire({
        icon: 'success',
       // title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500,
        didOpen: () => {
          Swal.hideLoading()
        }

      })
    //console.log(res.shiftName)
    this.shift1=res
    console.log(this.shift1)
    this.selectedmonth=this.shiftmonth;
    this.selectedyear=this.year;
    this.selectedemp=this.shiftScheduling.value.employee;
    this.flag=true;
    let url ='getAllShiftScheduling?month='+`${this.shiftmonth}`+'&year='+`${this.year}`+'&employeeId='+`${this.shiftScheduling.value.employee}`
     this._service.get(url).subscribe((res)=>{
       this.schedules = res
       
       this.hide = false
if(res){
  for(let i = 0; i < res.length; i ++){

    if(res[i].defaultShift !== "No Shift" ){
    shifts.push(res[i].defaultShift)
    
    }
    else if(res[i].firstShift !== "No Shift" ){ 
    shifts.push(res[i].firstShift)
    }
    else if(res[i].secondShift !== "No Shift" ){
    shifts.push(res[i].secondShift)
    }
    else if (res[i].secondShift === "No Shift" && res[i].defaultShift === "No Shift" && res[i].firstShift === "No Shift"){
      shifts.push('')
    }
           }
           for (let i = 0; i < res.length; i ++){
            this.shiftValue[i+1] = res[i].defaultShift
          
          }
}
       

  
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
  this.shiftScheduling.markAllAsTouched();
 }
}


}
// submit1(){
//   console.log(this.shiftScheduling)
// }

getEmpList(event){
 
  console.log(event)
  
  this.array.push(event)
  console.log(this.array.key)
  // console.log(this.array.key.toLowerCase)
  let form=this.shiftScheduling.value
  if(this.array.length >=2){
    let data=form.employee.toLowerCase()
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



  