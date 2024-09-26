import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AllModulesService } from '../../all-modules.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpParams } from '@angular/common/http';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'ngx-bootstrap-multiselect';
import { appendFile } from 'fs';

@Component({
  selector: 'app-assignedtask',
  templateUrl: './assignedtask.component.html',
  styleUrls: ['./assignedtask.component.css']
})
export class AssignedtaskComponent implements OnInit {
  updateTaskForm:FormGroup
  meetingFeedbakForm
  empName: any;
  allUpdate: any[];
  employees: any;
  allUpdate1: any[];
  showMyContainer: boolean=false;
  dtOptions: { pagingType: string; pageLength: number; processing: boolean; dom: string; buttons: string[]; };
  employee:IMultiSelectOption[];
  mySettings: IMultiSelectSettings = {
    enableSearch: true,
    // checkedStyle: 'fontawesome',
    // buttonClasses: 'btn btn-default btn-block',
    dynamicTitleMaxItems: 3,
    displayAllSelectedText: true
};
  date: Date;
  data: any;
  assignTask: any;
;
myTexts: IMultiSelectTexts = {
  checkAll: 'Select all',
  uncheckAll: 'Unselect all',
};
  AssignedEmployee: any;
  userType: any;
  emp: any;
  employeeId1: any;
  meetingDesc1: any[];
  editId: any;
  constructor(public fb:FormBuilder,public service:AllModulesService,public datePipe:DatePipe,public router:Router) { }

  ngOnInit(): void {
    this.date= new Date()
    this.userType=localStorage.getItem('type')
    console.log(this.userType)
    this.emp=localStorage.getItem('empid')
    this.getEmployee();
    this.updateTaskForm=this.fb.group({
      date:['',Validators.required],
      task:['',Validators.required],
      remark:[''], 
    })

    this.meetingFeedbakForm=this.fb.group({
      date:['',Validators.required],
      time:['',Validators.required],
      meetingDesc:this.fb.array([])
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
    this.getAllMeetingUpdate();
  }


  createRequest(): FormGroup {
    return this.fb.group({
      description: [''],
      employeeId: ['']
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
  getEmployee(){

    this.service.get("employee_master/getemployees").subscribe((res)=>{

      this.employees=res
     
    let emp = []

  res.forEach(element => {
// for(let i=0;i<=res.length-1;i++){}
   
    let empls={id:element.employeeId, name: element.firstName + " " + element.lastName}
    emp.push(empls)
  
  this.employee=emp

  });

    })
  }

  hideContainer() {

    this.showMyContainer = false
    this.cancel()

  }
  
  cancel() {
    const currentRoute = this.router.url;

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]);
    });
    
  }

  showContainer() {
    this.showMyContainer = true

  }

  getAllMeetingUpdate(){
    if(this.userType=='Admin'){
    let url='getAllMeetingUpdate'
    this.service.get(url).subscribe((res)=>{
     this.allUpdate1=res
  //   this.allUpdate=[]; 
  //   for(let i=0;i<=res.length-1;i++){
  //   let allUpdate=res[i].meetingdescription
  //   allUpdate.forEach(element1 => {
  //   console.log(element1)
  //   let emp=element1.meetingTaskAsignEmp
  //   this.empName=[];

  //   for(let j=0;j<=emp.length-1;j++){
  //   let id=emp[j].employeeId
  //   console.log(id)
  //   // let resid=this.employees.filter((emp:any)=>
  //   // (emp.employeeId == id))
  //   // console.log(resid)
  //   this.empName.push({'Name':emp[j].firstName+" "+emp[j].lastName})
    
  // }
  // this.allUpdate.push({'employee':this.empName,'description':element1.description,'meetingUpdateId':res[i].meetingUpdateId,'nextMeetingDate':res[i].nextMeetingDate,'nextMeetingtime':res[i].nextMeetingtime})
        
     

    })
  }
  else {
    let url='getAllMeetingUpdateListByEmployeeId?employeeId='+this.emp
    this.service.get(url).subscribe((res)=>{
      this.allUpdate1=res
    })
    let empid=localStorage.getItem('empid')
    let url1='getAllMeetingUpdaterByEmpId?employeeid='+empid
    this.service.get(url1).subscribe((res)=>{
      this.assignTask=res

    })
    
  }
}
  
   
  edit(item){
    console.log(item)
    this.editId=item.meetingUpdateId
    let url='getMeetingUpdate/'+item.meetingUpdateId
    this.service.get(url).subscribe((res)=>{
  console.log(res)
  let date=this.datePipe.transform(res.nextMeetingDate,'dd-MM-yyyy')
  this.meetingFeedbakForm.get('date').setValue(date)
  this.meetingFeedbakForm.get('time').setValue(res.nextMeetingtime)
  let decs=res.meetingdescription

  decs.forEach(element => {
    let emp=element.meetingTaskAsignEmp
    this.employeeId1=[];
   emp.forEach(element => {
      this.employeeId1.push(element.employeeId)
      console.log(this.employeeId1)
    });
  this.quantities().push(this.fb.group({
  description:element.description,
  employeeId:this.employeeId1 
}))
});
 

})
this.showContainer();
   }



  //  http://localhost:5555/updateStatusMeettingTaskAsignEmpByCreatorEmpId?status=0&mettingTaskAsignEmpId=12649

   approve(status,item){
  console.log(item)
  console.log(status)
  if(status==4){
    Swal.fire({
      title:"Are you really want to approve?",
      showCancelButton:true,
      confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Yes'
    }).then(result=>{
      console.log(result);
      if(result.isConfirmed==true)
      {
        let params = new HttpParams();

params = params.append('status', status);
params = params.append('mettingTaskAsignEmpId',item.meeting_task_asign_emp_id);
  let url='updateStatusMeettingTaskAsignEmpByCreatorEmpId'
        this.service.add(params,url).subscribe((res)=>{
          if(res.respose=='Success')
            {
              Swal.fire({
                icon: 'success',
                title: 'Success',
                text: ' Task has been approved',
               
              })
              this.getAllMeetingUpdate();
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
         this.getAllMeetingUpdate();
      }
    })
  }
      else{
        if(status==3){
        Swal.fire({
          title:"Are you really want to reassign task?",
          showCancelButton:true,
          confirmButtonColor: '#3085d6',
           cancelButtonColor: '#d33',
           confirmButtonText: 'Yes'
        }).then(result=>{
          console.log(result);
          if(result.isConfirmed==true)
          {
        let params = new HttpParams();
        params = params.append('status', status);
        params = params.append('mettingTaskAsignEmpId',item.meeting_task_asign_emp_id);
        let url='updateStatusMeettingTaskAsignEmpByCreatorEmpId'
        this.service.add(params,url).subscribe((res)=>{
          if(res.respose=='Success')
            {
              Swal.fire({
                icon: 'success',
                title: 'Success',
                text: ' Task has been reassign',
               
              })
              this.getAllMeetingUpdate();
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
        this.getAllMeetingUpdate();
      }
    })
  }
  else{
    this.getAllMeetingUpdate();
  }
}



    


   

}
updateForm(editId){
  console.log(this.meetingFeedbakForm)
  let form=this.meetingFeedbakForm.value
  
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
    this.meetingDesc1.push({'description':farray[i].description,'meetingTaskAsignEmp':mettingTaskAsignEmp})
  
  }
  let meetingDesc =this.meetingDesc1
  console.log(meetingDesc)
  
  let url='updateMeetingUpdate/'+editId
  let data={
    "nextMeetingDate":date,
    "nextMeetingtime": form.time,
    "meetingdescription":this.meetingDesc1
        }
  this.service.add(data,url).subscribe((res)=>{
    if(res.respose=='Success'){
      Swal.fire({
        icon:'success',
        title:'Success',
        text:'Meeting is created successfully! '

      })
     
      this.cancel();
     
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

delete(item){
  console.log(item)
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
  let url='deleteMeetingUpdate/'+item.meeting_task_asign_emp_id
  this.service.get(url).subscribe((res)=>{
    if(res.respose=='Success'){
      Swal.fire({
        icon:'success',
        title:'Success',
        text:'Meeting is successfully deleted! '

      })
      this.cancel();
      this.getAllMeetingUpdate()
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
  this.getAllMeetingUpdate();
}
})
}
addTaskUpdate(item){
this.updateTaskForm.get('date').setValue(this.date)
  console.log(item)
  this.data=item
  let url='getMeettingTaskAsignEmpStatusById/'+item.meeting_task_asign_emp_id
  this.service.get(url).subscribe((res)=>{
    console.log(res);
  })
  this.showContainer();
}
submit(){
  let form=this.updateTaskForm.value
  console.log(this.updateTaskForm)
  let params = new HttpParams();
  var datePipe = new DatePipe('en-US');
  let date = datePipe.transform(form.date, 'yyyy-MM-dd');
  params=params.append('taskupdateDate',date)
  params=params.append('remark',form.remark)
  params=params.append('status',form.task)
  params=params.append('mettingTaskAsignEmpId',this.data.meeting_task_asign_emp_id)
  let url='updatMeettingTaskAsignEmpStatusById'
  if(this.updateTaskForm.status=="VALID"){
  this.service.add(params,url).subscribe((res)=>{
    if(res.respose=='Success'){
      Swal.fire({
        icon:'success',
        title:'Success',
        text:'Task update updated successfully! '

      })
      this.cancel();
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



}
