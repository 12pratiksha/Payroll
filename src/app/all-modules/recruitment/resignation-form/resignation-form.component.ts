import { data } from 'jquery';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AllModulesService } from '../../all-modules.service';
import { Router } from '@angular/router';
import { DatePipe, formatDate } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import Swal from 'sweetalert2';
//import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-resignation-form',
  templateUrl: './resignation-form.component.html',
  styleUrls: ['./resignation-form.component.css']
})
export class ResignationFormComponent implements OnInit {
  resignForm:FormGroup
  resigationForm:FormGroup
  showPending:boolean=false;
  showMyContainer:boolean=false;
  newForm:boolean=false;
  isDisabled:boolean=true;
  employee: any=[];
  tableData: any;
  dtOptions: { pagingType: string; pageLength: number; processing: boolean; dom: string; buttons: string[]; };
  resignId: boolean;
  empid: any;
  assetsList: any=[];
  status: any;
  id: any;
  userType: string;
  rpStatus: string;
  tableData1: any;
  inputAdd: string ;
  tableData2: any;
  details: any;
  selected: any;
  employee1: any;
  newtableData: any=[];
  assets: string;
  array: any=[];
  constructor(public fb:FormBuilder, public service:AllModulesService,public router:Router) { }

  ngOnInit(): void {
    this.userType=localStorage.getItem('type')
    this.rpStatus=localStorage.getItem('rpStatus')
    this.getNotApprovalList();
    this.showPending = true;
    this.showMyContainer=false
    this.resignForm=this.fb.group({
      employee:'',
      hod:'',
      type:'',
      reason:'',
      resignDate:'',
      requestDate:'',
      releavingDate:'',
      remark:''
    })
    console.log(this.resignForm.get('employee'))

this.resigationForm=this.fb.group({
  lastDate:['',Validators.required],
  exitConcern:'',
  docClearance:'',
  remark:'',
  other:'',
  assets:'',
})

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'print', 
        ]
    };
    this.getAllEmp();
    this.getemp();
    this.getAll();
    this.getListByEmployeeId();
  }
  // open()
  // {
  //   this.newForm=true
  // }
  
   showContainer(){
    this.showMyContainer=true
    
    }
   hideContainer(){
     
    this.showMyContainer=false
    this.cancel()
    
    }
   check(item){
    //alert(1111)
   // this.hideContainer()
    console.log(item)
    this.details=item
    this.showPending = false;
    
    this.empid=item.employee_id
    let url='getAssetAssignByEmpId?empId='+this.empid
    this.service.get(url).subscribe((res)=>{
      this.assetsList=res
      
   })
  } 
  
   cancel(){
      const currentRoute = this.router.url;
  
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([currentRoute]); 
      }); 
    }
   getEmployeeId(){
      
    }
   submit(){
if(this.userType=='Admin'){
   let form=this.resignForm.value
   console.log(form)

   let emp=form.employee.split(" ");
   let empid=this.employee.filter((emply)=>
   (emply.employeeCode == emp[0]))
   console.log(empid)
   let url="InsertResignationForm"
   let data={
   "employeeId":empid[0].employeeId,
    "hod":form.hod,
    "seperationType":form.type,
    "resignationReason":form.reason,
    "dateOfResignation":form.resignDate,
    "requestReleavingDate":form.requestDate,
    "actualReleavingDate":form.releavingDate,
    "remark":form.remark,
    
}
    console.log(data)
    if(this.resignForm.status=='VALID'){
    this.service.add(data,url).subscribe((res)=>{
      console.log(res)
      if(res.respose=='Success')
      {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Your work is successfully done',
         
        })
        this.showMyContainer=false 
       this.getAll();
       this.cancel();
       
      }
      else if(res.respose=='Already')
      {
        Swal.fire({
          icon: 'warning',
          title: 'Oops',
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
  }
}
else{
  let form=this.resignForm.value
   console.log(form)
   let url="InsertResignationForm"
   let data={
   "employeeId":form.employee,
    "hod":form.hod,
    "seperationType":form.type,
    "resignationReason":form.reason,
    "dateOfResignation":form.resignDate,
    "requestReleavingDate":form.requestDate,
    "actualReleavingDate":form.releavingDate,
    "remark":form.remark,
    
}
    console.log(data)
    if(this.resignForm.status=='VALID'){
    this.service.add(data,url).subscribe((res)=>{
      console.log(res)
      if(res.respose=='Success')
      {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Your work is successfully done',
         
        })
        this.showMyContainer=false 
       this.getAll();
       this.cancel();
       
      }
      else if(res.respose=='Already')
      {
        Swal.fire({
          icon: 'warning',
          title: 'Oops',
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
  }
}
}
getAllEmp(){
  this.service.get("employee_master/getemployees").subscribe((data) => {
    this.employee = data;
})
}

 getemp(){
  // let url="employee_master/getemployees"
  // this.service.get(url).subscribe((res)=>{
  // this.employee=res 
  // })

 if(this.userType=='Admin' || this.userType=='Super Admin'){
    this.service.get("employee_master/getemployees").subscribe((data) => {
    });
  }else{
    this.employee1=[];
    let myemp=[];
    let id = localStorage.getItem('empid')
    let url = "employee_master/getemployee/" + id;
    this.service.get(url).subscribe((res) => {
      console.log(res);
      console.log(">>>>>"+res.employeeId); 
      this.employee1.push({"employeeId":res.employeeId,"employeeCode":res.employeeCode,"firstName":res.firstName,"lastName":res.lastName});
      console.log(">>>>>"+this.employee[0].employeeId); 
    });

  }

}
 getAll(){
  let url="getResignationFormList"
  this.service.get(url).subscribe((res)=>{
  if(res){
  res.forEach(element => {
    let url='getAssetAssignByEmpId?empId='+element.employee_id
    this.service.get(url).subscribe((res)=>{
      if(res){
        this.assets="yes"
      }
      else{
        this.assets="no"
      }
    this.newtableData.push({"actual_releaving_date":element.actual_releaving_date, "date_of_resignation":element.date_of_resignation,"employee_id":element.employee_id,"employee_name":element.employee_name,"firstName":element.firstName,"hod":element.hod,"hr_id":element.hr_id,"hriapproval":element.hriapproval,"lastName":element.lastName,"middleName":element.middleName,"reasonforrejection":element.reasonforrejection,"remark":element.remark,"reporting_manager1approval":element.reporting_manager1approval,"reporting_manager1id":element.reporting_manager1id,"reporting_manager2iapproval":element.reporting_manager2iapproval,"reporting_manager2id":element.reporting_manager2id,"request_releaving_date":element.request_releaving_date,"resignation_form_id":element.resignation_form_id,"resignation_reason":element.resignation_reason,"seperation_type":element.seperation_type, "status":element.status ,"assets":this.assets})

   })
   
  
  });
  }
  this.tableData=this.newtableData
  })
}
 delete(item){
    if(this.userType=='Admin'){
    console.log(item)
    Swal.fire({
      title:"Are you really wants to delete..?",
      showCancelButton:true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then(result=>{
    console.log(result);
    if(result.isConfirmed==true)
    {
      let url="deleteResignationForm/"+item.resignation_form_id
      this.service.get(url).subscribe((res)=>{
      if(res.respose=='Success')
      {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'resignation form is deleted successfully',
      })
      this.showMyContainer=false 
      this.getAll();
      this.cancel();
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
  this.getAll();
}
  })
}
else{
  Swal.fire({
    title:"Are you really wants to delete..?",
    //  html: `<textarea id="login" class="swal2-input" placeholder="Reason" tabIndex="" >`,
    showCancelButton:true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes'
  }).then(result=>{
    console.log(result);
    if(result.isConfirmed==true)
    {
    let url="deleteResignationForm/"+item.resignationFormId
    this.service.get(url).subscribe((res)=>{
    if(res.respose=='Success')
    {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'resignation form is deleted successfully',
      })
      this.showMyContainer=false 
      this.getAll();
      this.cancel();
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
  this.getAll();
}
  })
}
 }

 edit(item){
  if(this.userType=='Admin'){
  this.showMyContainer=true
  this.resignId=item.resignation_form_id
  let url="getResignationFormById/"+this.resignId 
  this.service.get(url).subscribe((res)=>{
  var datePipe=new DatePipe('en-Us')
  let resignDate=datePipe.transform(res.dateOfResignation,'dd-MM-yyyy')
  let requestDate=datePipe.transform(res.requestReleavingDate,'dd-MM-yyyy')
  let releavingDate=datePipe.transform(res.actualReleavingDate,'dd-MM-yyyy')
  this.resignForm.get('employee').setValue(res.employeeId)
  this.resignForm.get('type').setValue(res.seperationType) 
  this.resignForm.get('resignDate').setValue(resignDate)
  this.resignForm.get('requestDate').setValue(requestDate)
  this.resignForm.get('releavingDate').setValue(releavingDate)
  this.resignForm.get('remark').setValue(res.remark)
  this.resignForm.get('reason').setValue(res.resignationReason)
  })
}
else{
  this.showMyContainer=true
  this.resignId=item.resignationFormId
  let url="getResignationFormById/"+this.resignId 
  this.service.get(url).subscribe((res)=>{
  var datePipe=new DatePipe('en-Us')
  let resignDate=datePipe.transform(res.dateOfResignation,'dd-MM-yyyy')
  let requestDate=datePipe.transform(res.requestReleavingDate,'dd-MM-yyyy')
  let releavingDate=datePipe.transform(res.actualReleavingDate,'dd-MM-yyyy')
  this.resignForm.get('employee').setValue(res.employeeId)
  this.resignForm.get('hod').setValue(res.hod)
  this.resignForm.get('type').setValue(res.seperationType) 
  this.resignForm.get('resignDate').setValue(resignDate)
  this.resignForm.get('requestDate').setValue(requestDate)
  this.resignForm.get('releavingDate').setValue(releavingDate)
  this.resignForm.get('remark').setValue(res.remark)
  this.resignForm.get('reason').setValue(res.resignationReason)
  })
}
}

 update(id){
  let url="updateResignationForm/"+id
  let form=this.resignForm.value
  console.log(form)
  var dateData =form.resignDate.split('-');
  var day = dateData [0];
  var month = dateData [1];
  var year = dateData [2];
  var dateFormated =  month +"-"+day +"-" + year;
  let dateArray= new Date(dateFormated)
  const dateArray1 = [
    dateArray.getFullYear(),  
    dateArray.getMonth() + 1, 
    dateArray.getDate()      
  ];
  var dateData1 =form.requestDate.split('-');
  var day1 = dateData1 [0];
  var month1 = dateData1 [1];
  var year1 = dateData1 [2];
  var dateFormated1 =  month1 +"-"+day1 +"-" + year1;
  let dateArray2= new Date(dateFormated1)
  const dateArray3 = [
    dateArray2.getFullYear(),  
    dateArray2.getMonth() + 1, 
    dateArray2.getDate()      
  ];
  var dateData2 =form.releavingDate.split('-');
  var day2= dateData2 [0];
  var month2 = dateData2 [1];
  var year2 = dateData2 [2];
  var dateFormated2 =  month2 +"-"+day2 +"-" + year2;
  let dateArray4= new Date(dateFormated2)
  const dateArray5 = [
    dateArray4.getFullYear(),  
    dateArray4.getMonth() + 1, 
    dateArray4.getDate()      
  ];

  let data={
    "employeeId":form.employee,
      "hod":form.hod,
      "seperationType":form.type,
      "resignationReason":form.reason,
      "dateOfResignation":dateArray1,
      "requestReleavingDate":dateArray3,
      "actualReleavingDate":dateArray5,
      "remark":form.remark
  }
  if(this.resignForm.status=='VALID'){
    this.service.add(data,url).subscribe((res)=>{
    this.router.navigate(['layout/recruitment/resignation'])
    if(res.respose=='Success')
    {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Your resignation form is updated successfully',
      })
      this.showMyContainer=false 
      this.getAll();
    }
    else if(res.respose=='Already')
    {
      Swal.fire({
        icon: 'warning',
        title: 'Oops',
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
  }
}

 approve(status,item){
  console.log(status)
  console.log(item)
  if(status==1){
    Swal.fire({
      title:"Are you really want to approve resignation..?",
      showCancelButton:true,
      confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Yes'
    }).then(result=>{
      console.log(result);
      if(result.isConfirmed==true)
      {
        let id = localStorage.getItem('empid')
        let url='ApproveoutResignationByManagersAndHRs?status='+status+'&reasonforrejection='+''+'&manageempId='+id+'&resignationFormId='+item.resignationFormId
        this.service.get(url).subscribe(res=>{
        console.log(res)
       if(res.respose=='Success')
       {
          Swal.fire({
            icon: 'success',
            text: 'Resignation has been Approved',
          })
          this.resigationForm.markAllAsTouched();
          this.getNotApprovalList();
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
  else if(result.isConfirmed==false){
    let empid=localStorage.getItem('empid')
    let url='getNotApprovalResignationList?empid='+empid
    this.service.get(url).subscribe((res)=>{
    this.tableData=res.data
    }) 
  }
})

}
else if(status==2){
    Swal.fire({
      title:"Are you really want reject Regularization..?",
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
        let url='ApproveoutResignationByManagersAndHRs?status='+status+'&reasonforrejection='+result.value+'&manageempId='+id+'&resignationFormId='+item.resignationFormId
        this.service.get(url).subscribe(res=>{
          console.log(res)
          if(res.respose=='Success')
          {
            Swal.fire({
              icon: 'success',
              text: 'Resignation has been Rejected',
            })
            this.resigationForm.markAllAsTouched();
            this.getNotApprovalList();
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
        else if(result.isConfirmed==false){
          let empid=localStorage.getItem('empid')
          let url='getNotApprovalResignationList?empid='+empid
          this.service.get(url).subscribe((res)=>{
            this.tableData=res.data
          }) 
        }
})
}
}

 approve1(item){
  let params = new HttpParams();
  params = params.append('ResignationformId', item.resignationFormId);
  let url ='ApprovalbyResignationd?ResignationFormId='+`${item.resignationFormId}`
  Swal.fire({
    title:"Are you really wants to approve..?",
    showCancelButton:true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes'
  }).then(result=>{
    console.log(result);
    if(result.isConfirmed==true)
    {
      this.service.get(url).subscribe((res) => {
      if(res.respose=='Success')
      {
      Swal.fire({
        icon: 'success',
        text: 'Resignation has been accepted',
      })
      this.getAll();
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
    this.getAll();
  }
})
}

 submit1(){
  console.log(this.resigationForm)
   let form=this.resigationForm.value
   let data={
     "lastWorkingDay":form.lastDate,
     "exitInterviewConcern":form.exitConcern,
     "departmentClearanceDoc":form.docClearance,
     "remark":form.remark,
     "otherInfo":form.other,
     "employeeId": this.empid
   }
   if(this.resigationForm.status=='VALID'){
   let url="InsertResignationAcceptance"
   this.service.add(data,url).subscribe((res)=>{
     //console.log(res)
     if(res.respose='Success'){
       Swal.fire({
         icon:'success',
         title:'Success',
         text:res.message
             })
             this.showMyContainer=false;
        this.showPending=true;
        this.getAll();
     }
     else if(res.respose=='Already'){
        Swal.fire({
         icon:'warning',
         title:'Oops',
         text:res.message
        })
     }
     else{
        Swal.fire({
         icon:'error',
         title:'error',
         text:'Something went wrong!'
        })
     }
   })
 }
 else{
   Swal.fire({
     icon:'error',
     title:'error',
     text:'Something went wrong!'
    })
 }
 }


 check1(event,item){
  console.log(event)
  this.status=event
  this.id=item.assetAssignId
 } 
 
 update1(){
  let params = new HttpParams();
  if(this.status==true){
  params = params.append('status', 1);
  params = params.append('assetAssignId',this.id);
  let url ='updateAssetAssignStatusById?status='+`${1}`+'&assetAssignId='+`${this.id}`
      this.service.add(params,url).subscribe((data) => {
        if(data.respose=='Success'){
          Swal.fire({
            icon:'success',
            title:'Success',
            text:data.message
          })
        }
        else{
          Swal.fire({
            icon:'error',
            title:'Error',
            text:data.message
          }) 
        }
      })
    }
    else if(this.status==false){
      params = params.append('status', 0);
      params = params.append('assetAssignId',this.id);
      let url ='updateAssetAssignStatusById?status='+`${0}`+'&assetAssignId='+`${this.id}`
      this.service.add(params,url).subscribe((data)=>{
        if(data.respose=='Success'){
          Swal.fire({
            icon:'success',
            title:'Success',
            text:data.message
          })
        }
        else{
          Swal.fire({
            icon:'error',
            title:'Error',
            text:data.message
          }) 
        }
      }) 
    } 
    else{
      Swal.fire({
        icon:'error',
        title:'Error',
        text:'Something went wrong '
      })  
    }
 }

 getNotApprovalList(){
  let empid=localStorage.getItem('empid')
  let url='getNotApprovalResignationList?empid='+empid
  this.service.get(url).subscribe((res)=>{
    this.tableData1=res.data
  })
 }
 getListByEmployeeId(){
  let id=localStorage.getItem('empid')
  let url='getResignationApplicationListByEmployeeId?empid='+id
  this.service.get(url).subscribe((res)=>{
    this.tableData2=res.data
  })
 }

 
 
 getEmpList(event){
 
  console.log(event)
  
  this.array.push(event)
  console.log(this.array)
  let form=this.resignForm.value
  // console.log(form)
  if(this.array.length >=2){
    let data=form.employee.toLowerCase() 
  let url='employees/search?employeeName='+`${data}`
  this.service.get(url).subscribe((res)=>{
    this.employee1=res.data
    // console.log(this.employee1)
  })
}
}

displayEmp(data,name,last){
  console.log(data,name,last)
  this.selected=data +" "+ name +" "+ last; 

 }
}