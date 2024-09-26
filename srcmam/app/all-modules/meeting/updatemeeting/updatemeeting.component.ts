import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AllModulesService } from '../../all-modules.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'ngx-bootstrap-multiselect';
import Swal from 'sweetalert2';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-updatemeeting',
  templateUrl: './updatemeeting.component.html',
  styleUrls: ['./updatemeeting.component.css']
})
export class UpdatemeetingComponent implements OnInit {
  meetingFeedbakForm:FormGroup
  createmeetingDetails:FormGroup
  showMyContainer:boolean=false
  showOtherContainer="";
  attendeesTableData: any;
  dtOptions: any;
  employee:any;
  mySettings: IMultiSelectSettings = {
    enableSearch: true,
    // checkedStyle: 'fontawesome',
    // buttonClasses: 'btn btn-default btn-block',
    dynamicTitleMaxItems: 3,
    displayAllSelectedText: true
};
myTexts: IMultiSelectTexts = {
  checkAll: 'Select all',
  uncheckAll: 'Unselect all',
};
  meetingDesc1: any=[];
  allUpdate: any;
  employees: any;
  empName: any;
  allUpdate1: any;
  response: any;
  userType: string;
  tableData: any;
  meetingDetails: any;
  attendeesName1: any;
  agenda: any=[];
  feedback: any;
  viewData: any;
  feedbackData: any;
  agendaId: any;
  showMore: boolean=true;
  visibleItemsCount: number=4;
  // dtOptions: { pagingType: string; pageLength: number; processing: boolean; dom: string; buttons: string[]; };
  constructor(public fb:FormBuilder,public service:AllModulesService,public router:Router,public datePipe:DatePipe) { }

  async ngOnInit(): Promise<void> {
    this.userType=localStorage.getItem('type')
    this.meetingFeedbakForm=this.fb.group({
      date:['',Validators.required],
      time:['',Validators.required],
      title:[''],
      
      meetingDesc:this.fb.array([])
    })
this.createmeetingDetails=this.fb.group({
  attendees:[''],
  timeold:[''],
  dateold:[''],
  meetingTitle:[''],
  remark:['']
})
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'Bfrtip',
      buttons: [
            'copy', 'csv', 'excel', 'print'
        ]

    };
    this.getEmployee();
    this.getAllAttendeesForApproval();
    await this.getAllMeeting();
    
   
  }

  createRequest(): FormGroup {
    return this.fb.group({
      description: ['',Validators.required],
      employeeId: ['',Validators.required],
      // agenda:['']
      
    })
  }

  meetingDesc: FormArray
  addRequest(): void {
    console.log()
    this.meetingDesc = this.meetingFeedbakForm.get('meetingDesc') as FormArray;
    console.log(this.meetingFeedbakForm)
    this.quantities().push(this.createRequest());
    console.log(this.meetingDesc)
  }



  remove(i: number) {
    console.log(this.meetingDesc)
    this.quantities().removeAt(i);
  }

  quantities(): FormArray {
    return this.meetingFeedbakForm.get('meetingDesc') as FormArray;
  }
  cancel() {
    const currentRoute = this.router.url;

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]);
    });
    
  }

  
  hideContainer() {

    this.showOtherContainer=''
    // this.showMyContainer = false
    // this.cancel()

  }

  showContainer() {
    this.showMyContainer = true

  }

  showOtherCon(){
this.showOtherContainer='view'
  }

  hideOtherCon(){
this.showOtherContainer='nview'
  }
  

  
  getEmployee(){

    this.service.get("employee_master/getemployees").subscribe((res)=>{
    this.employees=res
    let emp = []
    res.forEach(element => {
    let empls={id:element.employeeId, name: element.firstName + " " + element.lastName}
    emp.push(empls)
    this.employee=emp
    // console.log(this.employees)
    });

    })
  }
  getAllMeeting(){
    let type=localStorage.getItem('type')
    let id=localStorage.getItem('empid')
    if(type=='Admin'){
    let url='getAllCreateMeeting'
    this.service.get(url).subscribe(res=>{
      this.tableData=res
      
    })
  }
  else{
    let url='getByMeetingCreatorId?employeeId='+id
    this.service.get(url).subscribe((res)=>{
      this.tableData=res 
      
    })
  }
  }
  getAllAttendeesForApproval(){
      // let id=localStorage.getItem('empid')
      // let url='getAllCreateMeetingListByEmployeeId?employeeId='+id
      // this.service.get(url).subscribe((res)=>{
      //   console.log(res)
      //   this.attendeesTableData=res
      // })
    
   
    }
    addFeedback(item) {
      let user=localStorage.getItem('type')
      if( this.tableData!=null){
      // this.showMyContainer = true
      this.showOtherContainer='nview'
      console.log(item)
      this.meetingDetails=item
      this.attendeesName1=item.meetingAttendies; 
      item.meetingMom.forEach(element => {
        this.quantities().push(this.fb.group({
          description:'',
          employeeId: '', 
         }))
         this.agenda.push({'agenda':element.meetingMomName,"id":element.meetingMomId})
         console.log(this.agenda)
      });

    }
    else{
      
        // this.showMyContainer = true
        this.showOtherContainer='nview'
        console.log(item)
        this.meetingDetails=item
        this.attendeesName1=item.meetingAttendies;  
    }
    }
   
  submit(){
    let user=localStorage.getItem('type')
    if(user=='Admin'){
    let empid=localStorage.getItem('empid')
    let form=this.meetingFeedbakForm.value
    console.log(form)
    let date=new Date(form.date)
    let farray=form.meetingDesc
    this.meetingDesc1=[];
    for(let i=0;i<=farray.length-1;i++){
    let emp=farray[i].employeeId
    let mettingTaskAsignEmp=[];
    for(let j=0;j<=emp.length-1;j++){
      console.log(emp[j])
      mettingTaskAsignEmp.push({'employeeId':emp[j]})
    }
    this.agendaId=this.agenda[i].id
    this.meetingDesc1.push({'description':farray[i].description,'meetingTaskAsignEmp':mettingTaskAsignEmp,"meetingMomId":this.agendaId})
    console.log(this.meetingDesc1)
  }
  let meetingDesc =this.meetingDesc1
  console.log(meetingDesc)
  
  let url='addMeetingUpdate'
  let data={
    "nextMeetingDate":date,
    "nextMeetingtime": form.time,
    "meetingdescription":this.meetingDesc1,
    "employeeId1":empid,
    "meetingId":this.meetingDetails.createMeetingId,
    // "feedback":'true'
    
        }
        console.log(data)
  if(this.meetingFeedbakForm.status=='VALID'){
  this.service.add(data,url).subscribe((res)=>{
    if(res.respose=='Success'){
      Swal.fire({
        icon:'success',
        title:'Success',
        text:'Task successfully assigned to employee! '

      })
      let url='updateFeedBackStatusByMeetingId'

      let params= new HttpParams();
       params= params.append('feedBackStatus',true);
       params= params.append('createMeetingId',this.meetingDetails.createMeetingId) 
       this.service.add(params,url).subscribe((res)=>{

       })
     
      this.cancel();
     
    }
    else{
Swal.fire({
  icon:'error',
  title:'Error',
  text:'Something went wrong!'
})
    
    }
  }) 
}     
else{
  Swal.fire({
    icon:'error',
    title:'Error',
    text:'Something went wrong'
  })
}

   }
   else{
    let empid=localStorage.getItem('empid')
    let form=this.meetingFeedbakForm.value
    console.log(form)
    let date=new Date(form.date)
    let farray=form.meetingDesc
    this.meetingDesc1=[];
    for(let i=0;i<=farray.length-1;i++){
      let emp=farray[i].employeeId
      let mettingTaskAsignEmp=[];
      for(let j=0;j<=emp.length-1;j++){
        console.log(emp[j])
        mettingTaskAsignEmp.push({'employeeId':emp[j]})
      
      }
      this.agendaId=this.agenda[i].id
      this.meetingDesc1.push({'description':farray[i].description,'meetingTaskAsignEmp':mettingTaskAsignEmp,"meetingMomId":this.agendaId })
    
    }
    let meetingDesc =this.meetingDesc1
    console.log(meetingDesc)
    
    let url='addMeetingUpdate'
    let data={
      "nextMeetingDate":date,
      "nextMeetingtime": form.time,
      "meetingdescription":this.meetingDesc1,
      "employeeId1":empid,
      "meetingId":this.meetingDetails.createMeetingId,
      // "feedback":'true'
          }
          console.log(data)
    if(this.meetingFeedbakForm.status=='VALID'){
    this.service.add(data,url).subscribe((res)=>{
      if(res.respose=='Success'){
        Swal.fire({
          icon:'success',
          title:'Success',
          text:'Task successfully assigned to employee! '
  
        })
      let url='updateFeedBackStatusByMeetingId'

      let params= new HttpParams();
       params= params.append('feedBackStatus',true);
       params= params.append('createMeetingId',this.meetingDetails.createMeetingId) 
       this.service.add(params,url).subscribe((res)=>{
        
       }) 
        this.cancel();
       
      }
      else{
        Swal.fire({
          icon:'error',
          title:'Error',
          text:'Something went wrong!'
        })
      }
    }) 
  }     
  else{
    Swal.fire({
      icon:'error',
      title:'Error',
      text:'Something went wrong'
    })
  } 
   }
  }
  view(item){
    console.log(item)
    this.viewData=item
    this.showOtherContainer="view"
  let url='getByMeetingId?mettingId='+item.createMeetingId
  this.service.get(url).subscribe((res)=>{
    this.feedbackData=res.data
  

  })
 } 
 close(item){
  let url='updateCloseStatusByMeetingId?closeMetting='+1+'&createMeetingId='+item.createMeetingId

  let params= new HttpParams();
   params= params.append('mettingStatus',1);
   params= params.append('createMeetingId',item.createMeetingId)
   Swal.fire({
    title: 'Do you really want to close meeting ?',
    text: "",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes'
  }).then((result) => {
    if (result.isConfirmed) {
   this.service.add(params,url).subscribe((res)=>{
    if(res.respose=='Success'){
      Swal.fire({
        icon:'success',
        title:'Success',
        text:'Meeting is successfully close!'

      })
      this.cancel();
      this.getAllMeeting()
    }
    else{
      Swal.fire({
        icon:'error',
        title:'Error',
        text:'Something went wrong'
      })
    }  
  })

}
else{
  this.getAllMeeting();
}
  })
 }

 cancelMeeting(item){
   let url='updateCloseStatusByMeetingId'
   let params= new HttpParams();
   params= params.append('mettingStatus',2);
   params= params.append('createMeetingId',item.createMeetingId)
   Swal.fire({
    title: 'Do you really want to cancel meeting ?',
    text: "",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes'
   }).then((result) => {
    if (result.isConfirmed) {
    this.service.add(params,url).subscribe((res)=>{
    if(res.respose=='Success'){
      Swal.fire({
        icon:'success',
        title:'Success',
        text:'Meeting has been cancel!'

      })
      this.cancel();
      this.getAllMeeting()
    }
    else{
      Swal.fire({
        icon:'error',
        title:'Error',
        text:'Something went wrong'
      })
    }  
  })

}
else{
  this.getAllMeeting();
 }
  })
 }

 toggleVisibility(i,item): void {
  // console.log(item)
  this.showMore = !this.showMore;
  if (this.showMore) {
    // alert(11111)
    this.visibleItemsCount = 4; // Display first 10 items
  } else {
    // alert(2222)
    this.visibleItemsCount = item.length; // Display all items
  }
}

 }


 
   

    
