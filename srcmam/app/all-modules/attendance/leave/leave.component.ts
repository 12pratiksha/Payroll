import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { AllModulesService } from '../../all-modules.service';
import { IMultiSelectOption } from 'ngx-bootstrap-multiselect';
import { DatePipe } from '@angular/common';
import { Subject, Subscriber } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import * as xlsx from 'xlsx';
import { HttpParams } from '@angular/common/http';
declare var $: any;
@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements OnInit {
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  dtOptions: any = {};
 loader = true
 years=[];
  month = [ "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December" ];
  selectedOption:any;
  showTable1:boolean=false;
  showTable2:boolean=false;
  showTable3:boolean=false;
  filterForm:FormGroup
  employees: any;
  leaveApplicationForm: FormGroup;
  showMyContainer:boolean=false;
  dtTrigger: Subject<any> = new Subject();
  optionsModel: number[];
  myOptions: IMultiSelectOption[];
  plDateRange: any[];
  lwpDateRange: any[];
  slDateRange: any[];
  clDateRange: any[];
  mlDateRange: any[];
  fhDateRange: any[];
  leaveDuration=[];
  leaveData: any[];
  leaveData1: any[];
  statusData:any=[];
  employee: any=[];
  leaveBalance: any;
  leaves: any = [];
  leave: any = [];
  Data1:any=[];
  status0:any=[];
  rejectLeaves: any[];
  Data2:any=[];
  status1:any[];
  pendingLeaves:any;
  Data3:any=[];
  status2:any[];
  approveLeaves:any=[];
  leaveForApproval:any=[];
  inputAdd:string;
  min
  covenants: any = [
    { provinceID: 1 },
    { provinceID: 2 },
    { provinceID: 3 },
    { provinceID: 4 },
    { provinceID: 5 },
  ];
  openCoverages = false;
  leaveData2: any= [];
  userType: any;
  st: any[];
  
  leaveStatus: any;
 
  data1:any=[];
  dataForAdmin:any=[];
  
  options=[

    {value:'Approve'},
    {value:'Rejected'},
    {value:'Pending'}]
  empId: void;
  rpStatus: string;
  shortLeaves: any=[];
  shortLeavesForAdmin: any=[];
  outDutyLeaves: any=[];
  outDutyForAdmin: any=[];
  normalLeavesHistory: any=[];
  filterId: any=[];
  //submitLoader: boolean;
  
 
  constructor(public _service:AllModulesService, public fb: FormBuilder, public router: Router) { }

  ngOnInit(): void {
    this.pendingLeaves=[];
this.filterForm=this.fb.group({
  employee:['',Validators.required],
  fromDate:['',Validators.required],
  toDate:['',Validators.required],
  state:['',Validators.required],
  branch:[''],
  department:[''],
  category:[''],
  status:['']
})




   // this.getNormalLeaveHistory();
    this.getLeaveApplications();
    //this.getOutDutyLeaves();
   
    this.userType=localStorage.getItem('type')
   this.rpStatus=localStorage.getItem('rpStatus');
   console.log(this.rpStatus);
   // this.getShortLeaves();
    this.getMyLeaves0();
    this.getMyLeaves1();
    this.getMyLeaves2();
    this.getYears();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'Bfrtip',
      buttons: [
            'copy', 'csv', 'excel', 'print'
        ]
    };
    this.getAllEmployee();
    this.getLeave();
this.leaveApplicationForm = this.fb.group({
  employee:['',Validators.required],
  reason:[''],
  leave:['',Validators.required],
  fArray: this.fb.array([]) ,  
})

var   date = new Date();

let eighteen = new Date(date.getFullYear(), date.getMonth(),date.getDay()-5 );
//console.log(date.getFullYear(), date.getMonth() + 1,date.getDay()-3)
this.min = eighteen





}

dateVal(e){
  console.log(e)
}
public pipe = new DatePipe("en-US"); 

fArray() : FormArray {
return this.leaveApplicationForm.get('fArray') as FormArray
}

newFarray(): FormGroup{
return this.fb.group({
  fromDate:'',
  toDate:'',
  days: this.fb.array([])
})
}
length
addFarray(event){
  this.leave = event
  this.fArray().clear()
let length = this.leaveApplicationForm.value.leave.length
  for ( let i = 0; i < length; i ++){
    this.fArray().push(this.newFarray())
  }

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
   
   xlsx.writeFile(wb, 'leaveApplication.xlsx');
 }
 downloadAsPDF(sectionToPrint){
  const printContents = document.getElementById(sectionToPrint).innerHTML;
  const originalContents = document.body.innerHTML;
  document.body.innerHTML = printContents;
  window.print()
  document.body.innerHTML = originalContents;
}


getYears(){
  let startYear;
  let currentYear = new Date().getFullYear();
  startYear = startYear || 2010;  
  while ( startYear <= currentYear ) {
      this.years.push(startYear++);
     
  }   
  

}
arrayDays(farrayindex:number) : FormArray{
return this.fArray().at(farrayindex).get("days") as FormArray
}

newArrayDays(): FormGroup{
  return this.fb.group({
    lvDate:'',
    lvDuration:'Full day'
  })
}

addNewArrayDays(farrayindex:number){
  for(let i = 0; i < 2; i++){
    this.arrayDays(farrayindex).push(this.newArrayDays())
  }


}
leavesData = []
onPlChange(i){
 let form =  this.leaveApplicationForm.value.fArray[i]
  let startDate = new Date(form.fromDate)
  let endDate = new Date(form.toDate)
  var date_range = new Array();
  this.arrayDays(i).clear()
  while (startDate <= endDate){
    let month  = ("0" + (startDate.getMonth() + 1)).slice(-2);
    let day   = ("0" + startDate.getDate()).slice(-2);     
    let date = [startDate.getFullYear(), month, day].join("-");
    date_range.push(date);
    startDate.setDate(startDate.getDate() + 1);
  }
console.log(date_range)

for(let j = 0; j < date_range.length; j++){
    this.arrayDays(i).push(this.fb.group({
      lvDate:date_range[j],
      lvDuration: "Full day"
    }))
    
  }

  this.leaveDuration.push(this.leaveApplicationForm.value.fArray[i].days)
  // console.log(this.leaveApplicationForm.value.fArray[i].fromDate)
  // console.log(this.leaveApplicationForm.value.fArray[i].toDate)

  // console.log(this.leaveApplicationForm.value.leave.length)

}
submit(){
  if(this.leaveApplicationForm.valid){

let leaves = []
for (let i = 0; i < this.leaveApplicationForm.value.leave.length; i ++){
  var datePipe = new DatePipe('en-US');
  let fromDate = datePipe.transform(this.leaveApplicationForm.value.fArray[i].fromDate, 'yyyy-MM-dd');
  let toDate = datePipe.transform(this.leaveApplicationForm.value.fArray[i].toDate, 'yyyy-MM-dd');
 
leaves.push(
           {
            leaveType: this.leaveApplicationForm.value.leave[i],
            fromDate: fromDate,
            toDate: toDate,
            totalDays:this.leaveApplicationForm.value.fArray[i].days.length,
            // totalDays:1,
            leavesDuration: this.leaveApplicationForm.value.fArray[i].days
           }
)

}
var today = new Date();
let date = datePipe.transform(today, 'yyyy-MM-dd');
let data = {
  reasonForLeave: this.leaveApplicationForm.value.reason,
    applicableDate: date,
    status: 0,
    leaves: leaves,
    employeeId: this.leaveApplicationForm.value.employee

}

this._service.add(data, "LeaveApplication/addLeaveApplication").subscribe((res)=>{
  if(res.respose == " Success"){
    Swal.fire({
      icon: 'success',
      title: 'Your work has been successfully done',
      showConfirmButton: false,
      timer: 1500
    })
    const currentRoute = this.router.url;

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentRoute]); // navigate to same route
    }); 
  }
  else if(res.respose == " Already"){
    Swal.fire({
      icon: 'warning',
      title: 'Oops...',
      text: res.message,
  
    })
   }else if(res.respose == "nobalance"){
    
    Swal.fire({
      icon: 'warning',
      title: 'Oops...',
      text: res.message,
  
    })
   }
   else if(res.respose == "Fail"){
    Swal.fire({
      icon: 'warning',
      title: 'Oops...',
      text: res.message,
  
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
    this.leaveApplicationForm.markAllAsTouched()
  }
}

 async getAllEmployee(){ 
    
      if(this.usertype=='Admin' || usertype=='Super Admin'){
        this._service.get("employee_master/getemployees").subscribe((data) => {
      this.employees = data;
    });
      }else{
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
  getLeave(){
  let option = []
    this._service.get("getgetCodeByType?type=Leave Code").subscribe((data) => {
      this.leave = data;
      //console.log(data);


    });
  }

showContainer(){
this.showMyContainer=true

}
hideContainer(){
 
this.showMyContainer=false
this.cancel()

}


cancel(){
  const currentRoute = this.router.url;
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate([currentRoute]); // navigate to same route
}); 
}


leavesforapproval:any;
getLeaveApplications(){
 let usertype=localStorage.getItem('type')
if(usertype=='Admin' || usertype=='Super Admin')
{
   let id = localStorage.getItem('empid')
  let url="getApprovalLeaveApplicationMasterListForAdmin?hrId="+id
 
  this._service.get(url).subscribe((res)=>{
   
  this.leaveData2= res.data
  //console.log(this.leaveData2)
  //this.filterId=res.data
  })
  }
  else {
    this.leavesforapproval=[];
    let id = localStorage.getItem('empid')
    let url="getApprovalLeaveApplicationMasterListForAdmin?hrId="+id
    this._service.get1(url).subscribe(res=>{
        this.leaveData2=res.data
      //this.filterId=res.data
        console.log(this.leavesforapproval);

    })
  }
}


details(){

this.fArray().clear()
this.leaveApplicationForm.controls.leave.reset()
this.leaveApplicationForm.controls.reason.reset()
  if(this.leaveApplicationForm.controls.employee.status=="VALID"){
  let url = "getempId/"+`${this.leaveApplicationForm.value.employee}`
 this._service.get(url).subscribe((res)=>{


  if(res.length < 1){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'No leaves',
      
    })
    this.leaveBalance = ""
  }
  else{
    this.leaveBalance = res
  
  }
 })

  }
  else {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Select Employee before Trying',
      
    })
    this.leaveBalance=false
  }
}

ngOnDestroy(): void {
 
  this.dtTrigger.unsubscribe();
}
// approve($event.target.value, item)_____html
approve(status,empid){
console.log(empid)
  if(status==1){
    Swal.fire({
      title:"Are you really want to approve leave..?",
      showCancelButton:true,
      confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Yes'
    }).then(result=>{
      console.log(result);
      if(result.isConfirmed==true)
      {
        let id = localStorage.getItem('empid')
       // let url="ApproveLeavesByManagersAndHR?status="+status+"&reasonforrejection="+ +"&manageempId="+id+"&applicationId="+empid.leaveApplicationId
        let url="ApproveLeavesByManagersAndHR?status="+status+"&manageempId="+id+"&applicationId="+empid.leaveApplicationId
        this._service.get(url).subscribe(res=>{
        console.log(res)
        if(res.respose=='Success')
            {
              Swal.fire({
                icon: 'success',
               // title: '',
                text: 'Leave has been Approved',
               
              })
              this.leaveApplicationForm.markAllAsTouched();
              this.getLeaveApplications();
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
      else if(result.isConfirmed==false)
      {
        
        let usertype=localStorage.getItem('type')
        if(usertype=='Admin' || usertype=='Super Admin')
        {
          let id = localStorage.getItem('empid')
          let url="getApprovalLeaveApplicationMasterListForAdmin?hrId="+id
          this._service.get(url).subscribe(res=>{
        this.dataForAdmin= res.data
        console.log(this.dataForAdmin);
  
       })
       }
       else {
       let id = localStorage.getItem('empid')
       let url="getApprovalLeaveApplicationMasterListForAdmin?hrId="+id
       this._service.get(url).subscribe(res=>{
       this.leaveData2=res.data
       //console.log(this.leaveData2);
    //    this.leaveData2.forEach(element=>{
    //    this.leaveForApproval.push(element.leaves[0])
    //    console.log(this.leaveForApproval)
    //  })
    })
  }
}
})
    
    }
  
      
      else if(status==2){
        Swal.fire({
          title:"Are you really want reject leave..?",
          //  html: `<textarea id="login" class="swal2-input" placeholder="Reason" tabIndex="" >`,
           input: 'text',
          inputValue: this.inputAdd,
          showCancelButton:true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes'
        }).then(result=>{
          console.log(result);
          if(result.isConfirmed==true)
          {
            let id = localStorage.getItem('empid')
            let url="ApproveLeavesByManagersAndHR?status="+status+"&reasonforrejection="+result.value +"&manageempId="+id+"&applicationId="+empid.leaveApplicationId
            //let url="ApproveLeavesByManagersAndHR?status="+status+"&manageempId="+id+"&applicationId="+empid.leaveApplicationId
            this._service.get(url).subscribe(res=>{
            console.log(res)
            if(res.respose=='Success')
            {
              Swal.fire({
                icon: 'success',
               // title: '',
                text: 'Leave has been Rejected',
               
              })
              this.leaveApplicationForm.markAllAsTouched();
              this.getLeaveApplications();
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
          else if(result.isConfirmed==false)
          {
            
            let usertype=localStorage.getItem('type')
        if(usertype=='Admin' || usertype=='Super Admin')
        {
  
          let id = localStorage.getItem('empid')
          let url="getApprovalLeaveApplicationMasterListForAdmin?hrId="+id
          this._service.get(url).subscribe(res=>{
          this.dataForAdmin= res.data
          console.log(this.dataForAdmin);
  
       })
       }
       else {
          let id = localStorage.getItem('empid')
          let url="getApprovalLeaveApplicationMasterListForAdmin?hrId="+id
          this._service.get(url).subscribe(res=>{
          this.leaveData2=res.data
    //       console.log(this.leaveData2);
    //       this.leaveData2.forEach(element=>{
    //       this.leaveForApproval.push(element.leaves[0])
    //       console.log(this.leaveForApproval)
    //  })
    })
  }
}
})
      }
}
approve1(status,empid){
  console.log(empid)
  console.log(empid)
    if(status==1){
      Swal.fire({
        title:"Are you really want to approve leave..?",
        showCancelButton:true,
        confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: 'Yes'
      }).then(result=>{
        console.log(result);
        if(result.isConfirmed==true)
        {
          let id = localStorage.getItem('empid')
         // let url="ApproveLeavesByManagersAndHR?status="+status+"&reasonforrejection="+ +"&manageempId="+id+"&applicationId="+empid.leaveApplicationId
          let url="ApproveLeavesByManagersAndHR?status="+status+"&manageempId="+id+"&applicationId="+empid.leave_application_id
          this._service.get(url).subscribe(res=>{
          console.log(res)
          if(res.respose=='Success')
              {
                Swal.fire({
                  icon: 'success',
                 // title: '',
                  text: 'Leave has been Approved',
                 
                })
                this.leaveApplicationForm.markAllAsTouched();
                this.getLeaveApplications();
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
        else if(result.isConfirmed==false)
        {
          
          let usertype=localStorage.getItem('type')
          if(usertype=='Admin' || usertype=='Super Admin')
          {
            let id = localStorage.getItem('empid')
            let url="getApprovalLeaveApplicationMasterListForAdmin?hrId="+id
            this._service.get(url).subscribe(res=>{
          this.dataForAdmin= res.data
          console.log(this.dataForAdmin);
    
         })
         }
         else {
         let id = localStorage.getItem('empid')
         let url="getApprovalLeaveApplicationMasterListForAdmin?hrId="+id
         this._service.get(url).subscribe(res=>{
         this.leaveData2=res.data
         //console.log(this.leaveData2);
      //    this.leaveData2.forEach(element=>{
      //    this.leaveForApproval.push(element.leaves[0])
      //    console.log(this.leaveForApproval)
      //  })
      })
    }
  }
  })
      
      }
    
        
        else if(status==2){
          Swal.fire({
            title:"Are you really want reject leave..?",
            //  html: `<textarea id="login" class="swal2-input" placeholder="Reason" tabIndex="" >`,
             input: 'text',
            inputValue: this.inputAdd,
            showCancelButton:true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
          }).then(result=>{
            console.log(result);
            if(result.isConfirmed==true)
            {
              let id = localStorage.getItem('empid')
              let url="ApproveLeavesByManagersAndHR?status="+status+"&reasonforrejection="+result.value +"&manageempId="+id+"&applicationId="+empid.leave_application_id
              //let url="ApproveLeavesByManagersAndHR?status="+status+"&manageempId="+id+"&applicationId="+empid.leaveApplicationId
              this._service.get(url).subscribe(res=>{
              console.log(res)
              if(res.respose=='Success')
              {
                Swal.fire({
                  icon: 'success',
                 // title: '',
                  text: 'Leave has been Rejected',
                 
                })
                this.leaveApplicationForm.markAllAsTouched();
                this.getLeaveApplications();
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
            else if(result.isConfirmed==false)
            {
              
              let usertype=localStorage.getItem('type')
          if(usertype=='Admin' || usertype=='Super Admin')
          {
    
            let id = localStorage.getItem('empid')
            let url="getApprovalLeaveApplicationMasterListForAdmin?hrId="+id
            this._service.get(url).subscribe(res=>{
            this.dataForAdmin= res.data
            console.log(this.dataForAdmin);
    
         })
         }
         else {
            let id = localStorage.getItem('empid')
            let url="getApprovalLeaveApplicationMasterListForAdmin?hrId="+id
            this._service.get(url).subscribe(res=>{
            this.leaveData2=res.data
      //       console.log(this.leaveData2);
      //       this.leaveData2.forEach(element=>{
      //       this.leaveForApproval.push(element.leaves[0])
      //       console.log(this.leaveForApproval)
      //  })
      })
    }
  }
  })
        }
  }





async getMyLeaves0(){
  let logData= JSON.parse(localStorage.getItem('loginData'))
  this.empId=logData.employeeid
  let url="getListByStatusAndEmployeeId?status=0&empId="+logData.employeeid
  await this._service.get(url).subscribe(async res=>{
    this.Data1=res.data;
    this.pendingLeaves=[];
    await this.Data1.forEach(async element=>{
    let cnt=0;
   let i=0;
    await element.leaves.forEach(async element1=>{
      
      await element1.leavesDuration.forEach(async element2=>{

       
        if(element2.lvDuration=="Full day"){
          cnt=cnt+1;
        }else if(element2.lvDuration=="Second half"){
          cnt=cnt+0.5;
        }if(element2.lvDuration=="First half"){
          cnt=cnt+0.5;
        }

      })
    

      this.pendingLeaves.push({"status":element.status,"reasonForLeave":element.reasonForLeave,"pend":element.leaves[i],"applicableDate":element.applicableDate,"firstName":element.firstName,"leaveApplicationId":element.leaveApplicationId})
      i++;
    })
     
    
    

    })
    
    console.log(this.pendingLeaves);
  })
  console.log(this.pendingLeaves);
}


getMyLeaves1(){
  let logData= JSON.parse(localStorage.getItem('loginData'))
  //console.log(logData.employeeid)
  let url="getListByStatusAndEmployeeId?status=1&empId="+logData.employeeid
  this._service.get(url).subscribe(res=>{
    //console.log(res)
    this.Data2=res.data;
    this.approveLeaves=[];
    this.Data2.forEach(element=>{
      
      
    this.status1=element.status;
      this.approveLeaves.push(element.leaves[0])
    

    })


  })

}

getMyLeaves2(){
  let logData= JSON.parse(localStorage.getItem('loginData'))
  //console.log(logData.employeeid)
  let url="getListByStatusAndEmployeeId?status=2&empId="+logData.employeeid
  this._service.get(url).subscribe(res=>{
    //console.log(res)
    this.Data3=res.data;
    //console.log(this.Data3)
    this.rejectLeaves=[];
    this.Data3.forEach(element=>{
      
      
      this.showTable3==true;
      this.status2=element.status;
      //console.log(this.status2)
        this.rejectLeaves.push(element.leaves[0])
        //console.log(this.rejectLeaves);
    

    })


  })

}
delete(id){
  console.log(id)
  Swal.fire({
    title:"Are you really want to delete leave..?",
    showCancelButton:true,
    confirmButtonColor: '#3085d6',
     cancelButtonColor: '#d33',
     confirmButtonText: 'Yes'
  }).then(result=>{
    console.log(result);
    if(result.isConfirmed==true)
    {
  let url="deleteLeaveApplication/"+id
  this._service.get(url).subscribe((res)=>{
    if(res.respose=='Success')
    {
      Swal.fire({
        icon: 'success',
       // title: '',
        text: res.message,
       
      })
      this.leaveApplicationForm.markAllAsTouched();
      this.getMyLeaves0();
      this.getMyLeaves1();
      this.getMyLeaves2();
    }
    else{
      Swal.fire({
        icon: 'warning',
       // title: 'Oops...',
        text: res.message,
        
      })
    }

  })
}else{
  this.leaveApplicationForm.markAllAsTouched();
  
}


})

}

// getShortLeaves(){
//   let logData= JSON.parse(localStorage.getItem('loginData'))
//   this.empId=logData.employeeid
//   console.log(logData.employeeid)
//   let usertype=localStorage.getItem('type')
//   if(usertype=='Admin' || usertype=='Super Admin'){

//     this._service.get("getShortLeaveEntryForAdminId").subscribe(res=>{

//       this.shortLeavesForAdmin=res.data
//       console.log(this.shortLeavesForAdmin);
    
//     })
//   }
//   else{
//     let url="getNotApprovalShortLeaveEntryList?empid="+this.empId

// this._service.get(url).subscribe(res=>{

//   this.shortLeaves=res
//   console.log(this.shortLeaves);

// })
//   }
// }


// approveShortLeaves(status, row){
//   if(status==1){
// Swal.fire({
//   title:"Are you really want approve leave..?",
//   showCancelButton:true,
//   confirmButtonColor: '#3085d6',
//    cancelButtonColor: '#d33',
//    confirmButtonText: 'Yes'
// }).then(result=>{
//   console.log(result);
//   if(result.isConfirmed==true)
//   {
//     let id = localStorage.getItem('empid')
//     console.log(id);
//     let url="ApproveshortLeaveEntryByManagersAndHRs?status="+status+"&manageempId="+id+"&shortLeaveEntryId="+row.shortLeaveEntryId1
//     //let url="ApproveLeavesByManagersAndHR?status="+status+"&manageempId="+id+"&applicationId="+empid.leaveApplicationId
//     // let url = "ApproveLeavesByManagersAndHR?status="+status+"&manageempId="+id+"&employeeId="+empid.employeeId
//     this._service.get(url).subscribe(res=>{
//     console.log(res)
    
//     })
//   }
//   else if(result.isConfirmed==false)
//   {
//     let usertype=localStorage.getItem('type')
//   if(usertype=='Admin' || usertype=='Super Admin'){

//     this._service.get("getShortLeaveEntryForAdminId").subscribe(res=>{

//       this.shortLeavesForAdmin=res.data
//       console.log(this.shortLeavesForAdmin);
    
//     })
//   }
//   else{
//     let url="getNotApprovalShortLeaveEntryList?empid="+this.empId

// this._service.get(url).subscribe(res=>{

//   this.shortLeaves=res
//   console.log(this.shortLeaves);

// })
//   }
//   }
// })
//   }
//   else if(status==2){
//     Swal.fire({
//       title:"Are you really want reject leave..?",
//       showCancelButton:true,
//       confirmButtonColor: '#3085d6',
//        cancelButtonColor: '#d33',
//        confirmButtonText: 'Yes'
//     }).then(result=>{
//       console.log(result);
//       if(result.isConfirmed==true)
//       {
//         let id = localStorage.getItem('empid')
//         console.log(id);
//         let url="ApproveshortLeaveEntryByManagersAndHRs?status="+status+"&manageempId="+id+"&shortLeaveEntryId="+row.shortLeaveEntryId1
//         //let url="ApproveLeavesByManagersAndHR?status="+status+"&manageempId="+id+"&applicationId="+empid.leaveApplicationId
//         // let url = "ApproveLeavesByManagersAndHR?status="+status+"&manageempId="+id+"&employeeId="+empid.employeeId
//         this._service.get(url).subscribe(res=>{
//         console.log(res)
        
//         })
//       }
//       else if(result.isConfirmed==false)
//       {
//         let usertype=localStorage.getItem('type')
//       if(usertype=='Admin' || usertype=='Super Admin'){
    
//         this._service.get("getShortLeaveEntryForAdminId").subscribe(res=>{
    
//           this.shortLeavesForAdmin=res.data
//           console.log(this.shortLeavesForAdmin);
        
//         })
//       }
//       else{
//         let url="getNotApprovalShortLeaveEntryList?empid="+this.empId
    
//     this._service.get(url).subscribe(res=>{
    
//       this.shortLeaves=res
//       console.log(this.shortLeaves);
    
//     })
//       }
//       }
//     })
//   }
 

// }

// getOutDutyLeaves()
// {
//   let usertype=localStorage.getItem('type')
//   if(usertype=='Admin' || usertype=='Super Admin'){
//   this._service.get("getOutDutyMasterListForAdmin").subscribe(res=>{
//     console.log(res)
//     this.outDutyForAdmin=res.data
//   })

//   }
// else{
//   let logData= JSON.parse(localStorage.getItem('loginData'))
//   this.empId=logData.employeeid
//   console.log(logData.employeeid)
//   let url="getNotApprovalOutDutyMasterList?empid="+this.empId
//   this._service.get(url).subscribe(res=>{
//     console.log(res)
//     this.outDutyLeaves=res

//   })
// }
// }


// approveOutDutyLeaves(status,row){

//   if(status==1){
//     Swal.fire({
//       title:"Are you really want approve leave..?",
//       showCancelButton:true,
//       confirmButtonColor: '#3085d6',
//        cancelButtonColor: '#d33',
//        confirmButtonText: 'Yes'
//     }).then(result=>{
//       console.log(result);
//       if(result.isConfirmed==true)
//       {
//         let id = localStorage.getItem('empid')
//         console.log(id);
//         let url="ApproveoutDutyMastersByManagersAndHRs?status="+status+"&manageempId="+id+"&outDutyMastersId="+row.outDutyMasterId
//         this._service.get(url).subscribe(res=>{
//         console.log(res)
         
//         })
//       }
//       else if(result.isConfirmed==false)
//       {
        
//         let usertype=localStorage.getItem('type')
//         if(usertype=='Admin' || usertype=='Super Admin'){
//         this._service.get("getOutDutyMasterListForAdmin").subscribe(res=>{
//           console.log(res)
//           this.outDutyForAdmin=res.data
//         })
      
//         }
//       else{
//         let logData= JSON.parse(localStorage.getItem('loginData'))
//         this.empId=logData.employeeid
//         console.log(logData.employeeid)
//         let url="getNotApprovalOutDutyMasterList?empid="+this.empId
//         this._service.get(url).subscribe(res=>{
//           console.log(res)
//           this.outDutyLeaves=res
      
//         })
//       }
//       }
//     })
//       }
//       else if(status==2){
//         Swal.fire({
//           title:"Are you really want reject leave..?",
//           showCancelButton:true,
//           confirmButtonColor: '#3085d6',
//            cancelButtonColor: '#d33',
//            confirmButtonText: 'Yes'
//         }).then(result=>{
//           console.log(result);
//           if(result.isConfirmed==true)
//           {
//             let id = localStorage.getItem('empid')
//             console.log(id);
//             let url="ApproveoutDutyMastersByManagersAndHRs?status="+status+"&manageempId="+id+"&outDutyMastersId="+row.outDutyMasterId
//             this._service.get(url).subscribe(res=>{
//             console.log(res)
             
//             })
//           }
//           else if(result.isConfirmed==false)
//           {
            
//             let usertype=localStorage.getItem('type')
//             if(usertype=='Admin' || usertype=='Super Admin'){
//             this._service.get("getOutDutyMasterListForAdmin").subscribe(res=>{
//               console.log(res)
//               this.outDutyForAdmin=res.data
//             })
          
//             }
//           else{
//             let logData= JSON.parse(localStorage.getItem('loginData'))
//             this.empId=logData.employeeid
//             console.log(logData.employeeid)
//             let url="getNotApprovalOutDutyMasterList?empid="+this.empId
//             this._service.get(url).subscribe(res=>{
//               console.log(res)
//               this.outDutyLeaves=res
          
//             })
//           }
//           }
//         })
//       }
// }

// getNormalLeaveHistory(){
//   let id = localStorage.getItem('empid')
//   let url="getApprovalLeaveApplicationMasterListForAdmin?hrId="+id
//   this._service.get(url).subscribe(res=>{
    
//     this.normalLeavesHistory=res.data
//     console.log(this.normalLeavesHistory);
//   })
// }

search()
{
  let form=this.filterForm.value
  var datePipe = new DatePipe('en-US');
    
    let fromDate = datePipe.transform(form.fromDate,'yyyy-MM-dd');
    let toDate = datePipe.transform(form.toDate,'yyyy-MM-dd');
  let params = new HttpParams();

  params = params.append('toDate', toDate);
  params = params.append('fromDate', fromDate);
  params = params.append('empId', form.employee);
  // console.log(data)
  //this.submitLoader = true 
  if(this.filterForm.status=='VALID'){
  let url ='getAttendenceLisFormTODateAndEmployeeId?fromDate'+`${fromDate}`+'&toDate='+`${toDate}`+'&empId='+`${form.employee}`
  
      this._service.add(params,url).subscribe((data) => {
      this.filterId=data
      //this.submitLoader = false
      })
}

else{
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: "Something went wrong",
    
  })
}
}

}
