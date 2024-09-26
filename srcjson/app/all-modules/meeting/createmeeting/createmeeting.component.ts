import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'ngx-bootstrap-multiselect';
import { AllModulesService } from '../../all-modules.service';
import Swal from 'sweetalert2';
import { table } from 'console';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-createmeeting',
  templateUrl: './createmeeting.component.html',
  styleUrls: ['./createmeeting.component.css']
})
export class CreatemeetingComponent implements OnInit {
  createMeetingForm:FormGroup
  showMyContainer:boolean=false;
  dtOptions: any;
  submitLoader:boolean=false
  employee:IMultiSelectOption[];
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
  checked: 'item selected',
    checkedPlural: 'items selected',
    searchPlaceholder: 'Find',
    searchEmptyResult: 'Nothing found...',
    searchNoRenderText: 'Type in search box to see results...',
    defaultTitle: 'Select',
    allSelected: 'All selected',
};
  attendees: any=[];
  tableData: any;
  employees: any;
  attendeesName: any=[];
  attendeesName1: any=[];
  editId: any;
  agenda1: any=[];
  attendeesTableData: any;
  userType: string;
  showMore: boolean=true;
  visibleItemsCount: number=4;
  editData: any;
  
  constructor(public fb:FormBuilder,public router:Router,public service:AllModulesService,public datePipe:DatePipe) {
   
   }

  ngOnInit(): void {
    this.userType==localStorage.getItem('type')
    this.getEmployee();
    this.getAllMeeting();
   
    this.createMeetingForm=this.fb.group({
      meetingTitle:['',Validators.required],
      date:['',Validators.required],
      time:['',Validators.required],
      agendaArray:this.fb.array([]),
      remark:[''],
      attendees:['',Validators.required],
      location:['',Validators.required],
      type:['',Validators.required]

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
   
    
   
    
  }
createRequest():FormGroup{
  return this.fb.group({
    meetingMomName:['',Validators.required]
 }) 
}

agendaArray:FormArray
addRequest():void{
// this.agendaArray=this
this.agendaArray=this.createMeetingForm.get('agendaArray') as FormArray;
this.quantities().push(this.createRequest());
}

remove(i: number) {
  console.log(this.agendaArray)
  this.quantities().removeAt(i);
}

quantities(): FormArray {
  return this.createMeetingForm.get('agendaArray') as FormArray;
}

  showContainer() {
    this.showMyContainer = true
    this.getAllMeeting();

  }
  hideContainer() {

    this.showMyContainer = false
    this.cancel()

  }
   getEmployee(){
    this.service.get("employee_master/getemployees").subscribe((res)=>{
    this.employees=res
      // console.log(this.employees)
    let emp = []
    res.forEach(element => {
    let empls={id:element.employeeId, name: element.employeeCode+" "+ element.firstName + " " + element.lastName}
    emp.push(empls)
    this.employee=emp
  });
    })
  }

  cancel() {
    const currentRoute = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]);
    });
    this.getAllMeeting();
  }
  submit(){

  let empId=localStorage.getItem('empid')
    let form=this.createMeetingForm.value
    if(this.createMeetingForm.status=='VALID'){
      Swal.fire({
        title: 'Loading...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading()
        }
      });
    console.log(this.createMeetingForm)
    let emp=form.attendees
    for(let i=0;i<=emp.length-1;i++){
      // console.log(emp[i])
      this.attendees.push({'employeeId':emp[i]})
      
    };
    // var agenda=form.agenda.split(',').map(value => value.trim());
    // console.log(agenda)
   
    // for(let i=0;i<=agenda.length-1;i++){
    //   this.agenda1.push({"meetingMom": agenda[i]})
    // };
    let url='addCreateMeeting'

    let data={
      "date": form.date,
      "time": form.time,
      "title": form.meetingTitle,
      "agenda": form.remark,
      "meetingAttendies":this.attendees,
      "meetingMom":form.agendaArray,
      "meetingcreatorId":empId,
      "location":form.location,
      "typeOfMetting":form.type
    }
    
   
      this.submitLoader=true
    this.service.add(data,url).subscribe(res=>{
      if(res.respose=='Success'){
        Swal.fire({
          icon:'success',
          title:'Success',
          text:'Meeting is created successfully! ',
          showConfirmButton: false,
        
        didOpen: () => {
          Swal.hideLoading()
        }

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
    Swal.fire({
      icon:'error',
      title:'Error',
      text:'Something went wrong!'
    })
  }
}
   getAllMeeting(){
    
    let user=localStorage.getItem('type')
    if(user=='Admin'){
    let url='getAllCreateMeeting'
    this.service.get(url).subscribe(res=>{
      this.tableData=res
    })
    }
    else{
      let empId=localStorage.getItem('empid')
      let url='getByMeetingCreatorId?employeeId='+empId
      this.service.get(url).subscribe((res)=>{
        this.tableData=res 
      })
    }
    }

    //   res.forEach(element => {
      
    //   let attendees=element.meetingAttendies
    //   this.attendeesName1=[];
    //   attendees.forEach(element1 => {
    //     let eid=element1.employeeId
        
    //     let res1=this.employees.filter((emp:any)=>
    //     (emp.employeeId == eid))
    //     // console.log(res1)
    //     this.attendeesName1.push({'fName':res1[0].firstName+" "+res1[0].lastName})

        
    //   });
    //   let attendeesName=this.attendeesName1
    //     this.attendeesName.push({'attendeesName':attendeesName,'title':element.title,'date':element.date,'time':element.time,'createMeetingId':element.createMeetingId,'meetingMom':element.meetingMom})

      
    // });
    // this.tableData=this.attendeesName
    // console.log(this.tableData)
  
    


  edit(item){
    this.editId=item.createMeetingId
    this.editData=item
    let url='getCreateMeeting/'+item.createMeetingId
    this.service.get(url).subscribe(res=>{
      let form=res
      let date=this.datePipe.transform(res.date,'dd-MM-yyyy')
      this.createMeetingForm.get('date').setValue(date)
      this.createMeetingForm.get('time').setValue(res.time)
      this.createMeetingForm.get('meetingTitle').setValue(res.title)
      this.createMeetingForm.get('remark').setValue(res.agenda)
      this.createMeetingForm.get('location').setValue(res.location)
      this.createMeetingForm.get('type').setValue(res.typeOfMetting)
      let meetingMom=[];
      res.meetingMom.forEach(element => {
       this.quantities().push(this.fb.group({
        meetingMomName:element.meetingMomName 
       }))
      });
      
      let employeeId=[]

      res.meetingAttendies.forEach(element => {
        employeeId.push(element.employeeId)
      });
      this.createMeetingForm.get('attendees').setValue(employeeId)

    })
    this.showContainer();
  }
  updateForm(editId){
    let dateFormated
    let empId=localStorage.getItem('empid')
    console.log(this.createMeetingForm)
    
    let form=this.createMeetingForm.value
    let date=this.datePipe.transform(this.editData.date,'dd-MM-yyyy')
    if(form.date==date){
    alert(1111)
  var dateData =form.date.split('-');
        var year = dateData [0];
        var month = dateData [1];
        var day = dateData [2];
         dateFormated = day + "-" + month + "-" + year;
    console.log(dateFormated)
    }
    else{
alert(222)
 dateFormated=form.date

    }
    let emp=form.attendees
    for(let i=0;i<=emp.length-1;i++){
      console.log(emp[i])
      this.attendees.push({'employeeId':emp[i]})
      
    };
  
  
    console.log(editId)
    let data={
      "date": dateFormated,
      "time": form.time,
      "title": form.meetingTitle,
      "agenda": form.remark,
      "meetingAttendies":this.attendees,
      "meetingMom":form.agendaArray,
      "meetingcreatorId":empId,
      "location":form.location,
      "typeOfMetting":form.type

    }
    let url='updateCreateMeeting/'+editId
    if(this.createMeetingForm.status=='VALID'){
    this.service.add(data,url).subscribe(res=>{
      if(res.respose=='Success'){
        Swal.fire({
          icon:'success',
          title:'Success',
          text:'Meeting is updated successfully! '

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
    Swal.fire({
      icon:'error',
      title:'Error',
      text:'Something went wrong'
    }) 
  }

  }
delete(id){
  Swal.fire({
    title: 'Do you really want to delete ?',
    text: "",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes'
  }).then((result) => {
    if (result.isConfirmed) {
  let url='deleteCreateMeeting/'+id
  this.service.get(url).subscribe((res)=>{
    if(res.respose=='Success'){
      Swal.fire({
        icon:'success',
        title:'Success',
        text:'Meeting is successfully deleted! '

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
