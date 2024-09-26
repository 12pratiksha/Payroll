import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AllModulesService } from '../../all-modules.service';
import { DataTableDirective } from 'angular-datatables';
import { Router } from '@angular/router';
import { moment } from 'ngx-bootstrap/chronos/test/chain';
import { param } from 'jquery';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-short-leaves',
  templateUrl: './short-leaves.component.html',
  styleUrls: ['./short-leaves.component.css']
})
export class ShortLeavesComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  dtOptions: any = {};
  showMyContainer:boolean = false;
  shortLeaveForm:FormGroup
  filterForm:FormGroup
  employee: any;
  shortLeaves: any;
  loader = true
  editId: any = undefined;
  shortLeavesForAdmin: any=[];
  empId: any;
  shortLeaves1: any=[];
  userType: string;
  rpStatus: string;
  shortLeavesHistory: any=[];
  hourDiff: number;
  inputAdd: string ;
  filterId: any=[];
  array: any=[];
  employee1: any;
  selected: string;
  
  constructor(public _fb:FormBuilder, public _service:AllModulesService, public router: Router) { }

  ngOnInit(): void {
    this.userType=localStorage.getItem('type')
    this.rpStatus=localStorage.getItem('rpStatus');
    this.getEmployee();
    this.shortLeaveForm=this._fb.group({
      employeeId:['',Validators.required],
      date:['',Validators.required],
      toTime:['',Validators.required],
      fromTime:['',Validators.required],
      reason:['',Validators.required],
    })

this.filterForm=this._fb.group({
  employee:['',Validators.required],
  fromDate:['',Validators.required],
  toDate:['',Validators.required]
})


    //this.getShortLeaveHistory();
    this.getShortLeaves();
    this.getShortLeaves1();

    this.dtOptions = {
      pagingType: 'full_numbers',
  pageLength: 10,
  processing: true,
  dom: 'Bfrtip',
    buttons: [
        'copy', 'csv', 'excel', 'print', 
    ]
    };
  }


//   if(this.userType=='Admin'){
//     this._service.get("employee_master/getemployees").subscribe((data) => {
//   this.employees = data;
//   console.log(data)
// });
//   }else{
  //   this.employees=[];
  //   let myemp=[];
  //   let id = localStorage.getItem('empid')
  //   let url = "getemployeesListByThere-RM1-RM2?employeeId=" + id;
  //   await this._service.get(url).subscribe((res) => {
  //   console.log(res);
  //   // console.log(">>>>>"+res.employeeId);
  //  res.forEach(element => {
  //     console.log(element)
  //     this.employees.push({"employeeId":element.employeeId,"employeeCode":element.employeeCode,"firstName":element.firstName,"lastName":element.lastName});
  //    console.log(">>>>>"+this.employees[0].employeeId); 
  //   });

//     });



//   }
//   }



//http://localhost:5555/getemployeesListByThere-RM1-RM2-Self?employeeId=1395
  async getEmployee(){
  if(this.userType=='Admin' || this.userType=='Super Admin'){
    this._service.get("employee_master/getemployees").subscribe((data) => {
  this.employee = data;
});
  }else{
    this.employee=[];
    let myemp=[];
    let id = localStorage.getItem('empid')
    let url = "employee_master/getemployee/" + id;
    await this._service.get(url).subscribe((res) => {
      console.log(res);
      console.log(">>>>>"+res.employeeId); 

      this.employee.push({"employeeId":res.employeeId,"employeeCode":res.employeeCode,"firstName":res.firstName,"lastName":res.lastName});
     console.log(">>>>>"+this.employee[0].employeeId); 

    });



  }

}
showContainer(){
  this.showMyContainer=true
}
hideContainer(){
  const currentRoute = this.router.url;

  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]); // navigate to same route
  }); 
}
submit(){
if(this.shortLeaveForm.status=='VALID' && this.userType!='Admin' ){
  let form = this.shortLeaveForm.value
  var datePipe = new DatePipe('en-US');
  let date = datePipe.transform(form.date, 'yyyy-MM-dd');
  console.log(form.fromTime)
  let data = {
    // employeeId:form.employeeId,
   
    employeeId:form.employeeId,
    date: date,
    fromTime: form.fromTime,
    toTime: form.toTime,
    reason: form.reason
}

this._service.add(data,'addShortLeaveEntry').subscribe((res)=>{
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
else if(this.shortLeaveForm.status=='VALID' && this.userType!='Super Admin' ){
  let form = this.shortLeaveForm.value
  var datePipe = new DatePipe('en-US');
  let date = datePipe.transform(form.date, 'yyyy-MM-dd');
  console.log(form.fromTime)
  let data = {
    // employeeId:form.employeeId,
   
    employeeId:form.employeeId,
    date: date,
    fromTime: form.fromTime,
    toTime: form.toTime,
    reason: form.reason
}

this._service.add(data,'addShortLeaveEntry').subscribe((res)=>{
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
else if(this.shortLeaveForm.status=='VALID' && this.userType=='Admin'){
  

  let form = this.shortLeaveForm.value

  var datePipe = new DatePipe('en-US');
  let date = datePipe.transform(form.date, 'yyyy-MM-dd');
  console.log(form.fromTime)
  let emp=this.shortLeaveForm.value.employeeId.split(" ");
  let emply=this.employee.filter((emply)=>
  (emply.employeeCode == emp[0]))
  console.log(emply)
  let data = {
    // employeeId:form.employeeId,
   
    employeeId:emply[0].employeeId,
    date: date,
    fromTime: form.fromTime,
    toTime: form.toTime,
    reason: form.reason
}

this._service.add(data,'addShortLeaveEntry').subscribe((res)=>{
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
else if(this.shortLeaveForm.status=='VALID' && this.userType=='Super Admin'){
  

  let form = this.shortLeaveForm.value

  var datePipe = new DatePipe('en-US');
  let date = datePipe.transform(form.date, 'yyyy-MM-dd');
  console.log(form.fromTime)
  let emp=this.shortLeaveForm.value.employeeId.split(" ");
  let emply=this.employee.filter((emply)=>
  (emply.employeeCode == emp[0]))
  console.log(emply)
  let data = {
    // employeeId:form.employeeId,
   
    employeeId:emply[0].employeeId,
    date: date,
    fromTime: form.fromTime,
    toTime: form.toTime,
    reason: form.reason
  }

this._service.add(data,'addShortLeaveEntry').subscribe((res)=>{
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
this.shortLeaveForm.markAllAsTouched()
}
}
cancel(){
  const currentRoute = this.router.url;

  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]); // navigate to same route
  }); 
}

getShortLeaves(){
  let logData= JSON.parse(localStorage.getItem('loginData'));
    this.empId=logData.employeeid;
  this._service.get('getShortLeaveEntryByempId?empId='+this.empId).subscribe((res)=>{
    console.log(res);
    this.shortLeaves = res.data
    this.loader = false;
  },(error)=>{
    
    this.loader = false
    console.log(error)
    alert("Something Went Wrong")
})
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

      this._service.delete(id,'deleteShortLeaveEntry').subscribe((res)=>{
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
edit(id){
  let url = "getShortLeaveEntry/"+id
  this.showMyContainer = true
  this.editId = id
  this._service.get(url).subscribe((res)=>{
    var datePipe = new DatePipe('en-US');
    let date = datePipe.transform(res.date, 'dd-MM-yyyy');
  this.shortLeaveForm.get('toTime').setValue(res.toTime)
  this.shortLeaveForm.get('fromTime').setValue(res.fromTime)
  this.shortLeaveForm.get('reason').setValue(res.reason)
  this.shortLeaveForm.get('employeeId').setValue(res.employeeId)
  this.shortLeaveForm.get('date').setValue(date)
  })
  }
  update(){
    let url = "updateShortLeaveEntry/"+this.editId
    if(this.shortLeaveForm.status=='VALID' && this.userType!='Admin'){
      let form = this.shortLeaveForm.value
      var datePipe = new DatePipe('en-US');
      let date = datePipe.transform(form.date, 'yyyy-MM-dd');
      let data = {
        employeeId:form.employeeId,
        date: date,
        fromTime: form.fromTime,
        toTime: form.toTime,
        reason: form.reason
      }
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
      }
      else if(res.respose == "Already"){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Record Already Exists!',
      
        })
       }
       else if(res.respose == "Fail"){
        Swal.fire({
          icon: 'error',
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
    else if(this.shortLeaveForm.status=='VALID' && this.userType!='Super Admin'){
      let form = this.shortLeaveForm.value
      var datePipe = new DatePipe('en-US');
      let date = datePipe.transform(form.date, 'yyyy-MM-dd');
      let data = {
        employeeId:form.employeeId,
        date: date,
        fromTime: form.fromTime,
        toTime: form.toTime,
        reason: form.reason
      }
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
      }
      else if(res.respose == "Already"){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Record Already Exists!',
      
        })
       }
       else if(res.respose == "Fail"){
        Swal.fire({
          icon: 'error',
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
    else if(this.shortLeaveForm.status=='VALID' && this.userType=='Admin'){
      let form = this.shortLeaveForm.value
      var datePipe = new DatePipe('en-US');
      let date = datePipe.transform(form.date, 'yyyy-MM-dd');
      let emp=this.shortLeaveForm.value.employeeId.split(" ");
      let emply=this.employee.filter((emply)=>
      (emply.employeeCode == emp[0]))
      console.log(emply)
      let data = {
        employeeId:emply[0].employeeId,
        date: date,
        fromTime: form.fromTime,
        toTime: form.toTime,
        reason: form.reason
      }
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
      }
      else if(res.respose == "Already"){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Record Already Exists!',
        })
       }
       else if(res.respose == "Fail"){
        Swal.fire({
          icon: 'error',
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
    else if(this.shortLeaveForm.status=='VALID' && this.userType=='Super Admin'){
      let form = this.shortLeaveForm.value
      var datePipe = new DatePipe('en-US');
      let date = datePipe.transform(form.date, 'yyyy-MM-dd');
      let emp=this.shortLeaveForm.value.employeeId.split(" ");
      let emply=this.employee.filter((emply)=>
      (emply.employeeCode == emp[0]))
      console.log(emply)
      let data = {
        employeeId:emply[0].employeeId,
        date: date,
        fromTime: form.fromTime,
        toTime: form.toTime,
        reason: form.reason
      }
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
      }
      else if(res.respose == "Already"){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Record Already Exists!',
        })
       }
       else if(res.respose == "Fail"){
        Swal.fire({
          icon: 'error',
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
    this.shortLeaveForm.markAllAsTouched()
    }
  }
  getShortLeaves1(){
    let logData= JSON.parse(localStorage.getItem('loginData'))
    this.empId=logData.employeeid
    console.log(logData.employeeid)
    let usertype=localStorage.getItem('type')
    if(usertype=='Admin' || usertype=='Super Admin'){
    let url1="getNotApprovalShortLeaveEntryList?empId="+this.empId
    this._service.get(url1).subscribe(res=>{
        this.shortLeaves1=res.data
        console.log(this.shortLeavesForAdmin);
      })
    }
    else{
      let url="getNotApprovalShortLeaveEntryList?empId="+this.empId
      this._service.get(url).subscribe(res=>{
      this.shortLeaves1=res.data
      console.log(res);
     })
    }
  }
  
  
  approveShortLeaves(status, item){
    console.log(item)
    if(status==1){
    Swal.fire({
     title:"Are you really want approve leave..?",
     showCancelButton:true,
     confirmButtonColor: '#3085d6',
     cancelButtonColor: '#d33',
     confirmButtonText: 'Yes'
     }).then(result=>{
    console.log(result);
    if(result.isConfirmed==true)
    {
      let id = localStorage.getItem('empid')
      console.log(id);
      let url="ApproveshortLeaveEntryByManagersAndHRs?status="+status+"&manageempId="+id+"&shortLeaveEntryId="+item.shortLeaveEntryId1
      //let url="ApproveLeavesByManagersAndHR?status="+status+"&manageempId="+id+"&applicationId="+empid.leaveApplicationId
      // let url = "ApproveLeavesByManagersAndHR?status="+status+"&manageempId="+id+"&employeeId="+empid.employeeId
      this._service.get(url).subscribe(res=>{
      console.log(res)
      if(res.respose=='Success')
            {
              Swal.fire({
                icon: 'success',
                text: 'Leave has been Approved',
              })
              this.shortLeaveForm.markAllAsTouched();
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
      if(usertype=='Admin' || usertype=='Super Admin'){
      this._service.get("getShortLeaveEntryForAdminId").subscribe(res=>{
        this.shortLeavesForAdmin=res.data
        console.log(this.shortLeavesForAdmin);
      })
      }
      else{
      let url="getNotApprovalShortLeaveEntryList?empid="+this.empId
      this._service.get(url).subscribe(res=>{
      this.shortLeaves1=res
      console.log(this.shortLeaves1);
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
          console.log(id);
          let url="ApproveshortLeaveEntryByManagersAndHRs?status="+status+"&reasonforrejection="+result.value+"&manageempId="+id+"&shortLeaveEntryId="+item.shortLeaveEntryId1
          //let url="ApproveLeavesByManagersAndHR?status="+status+"&manageempId="+id+"&applicationId="+empid.leaveApplicationId
          // let url = "ApproveLeavesByManagersAndHR?status="+status+"&manageempId="+id+"&employeeId="+empid.employeeId
          this._service.get(url).subscribe(res=>{
          console.log(res)
          if(res.respose=='Success')
            {
              Swal.fire({
                icon: 'success',
               // title: '',
                text: 'Leave has been Rejected',
               
              })
              this.shortLeaveForm.markAllAsTouched();
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
        if(usertype=='Admin' || usertype=='Super Admin'){
      
          this._service.get("getShortLeaveEntryForAdminId").subscribe(res=>{
      
            this.shortLeavesForAdmin=res.data
            console.log(this.shortLeavesForAdmin);
          
          })
        }
        else{
          let url="getNotApprovalShortLeaveEntryList?empid="+this.empId
      
      this._service.get(url).subscribe(res=>{
      
        this.shortLeaves1=res
        console.log(this.shortLeaves1);
      
      })
        }
        }
      })
    }
   
  
  }


  approveShortLeaves1(status, item){
    console.log(item)
    if(status==1){
  Swal.fire({
    title:"Are you really want approve leave..?",
    showCancelButton:true,
    confirmButtonColor: '#3085d6',
     cancelButtonColor: '#d33',
     confirmButtonText: 'Yes'
  }).then(result=>{
    console.log(result);
    if(result.isConfirmed==true)
    {
      let id = localStorage.getItem('empid')
      console.log(id);
      let url="ApproveshortLeaveEntryByManagersAndHRs?status="+status+"&manageempId="+id+"&shortLeaveEntryId="+item.short_leave_entry_id1
      //let url="ApproveLeavesByManagersAndHR?status="+status+"&manageempId="+id+"&applicationId="+empid.leaveApplicationId
      // let url = "ApproveLeavesByManagersAndHR?status="+status+"&manageempId="+id+"&employeeId="+empid.employeeId
      this._service.get(url).subscribe(res=>{
      console.log(res)
      if(res.respose=='Success')
            {
              Swal.fire({
                icon: 'success',
               // title: '',
                text: 'Leave has been Approved',
               
              })
             this.filterForm.reset();
             this.getShortLeaves1();
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
    if(usertype=='Admin' || usertype=='Super Admin'){
  
      this._service.get("getShortLeaveEntryForAdminId").subscribe(res=>{
  
        this.shortLeavesForAdmin=res.data
        console.log(this.shortLeavesForAdmin);
      
      })
    }
    else{
      let url="getNotApprovalShortLeaveEntryList?empid="+this.empId
  
  this._service.get(url).subscribe(res=>{
  
    this.shortLeaves1=res
    console.log(this.shortLeaves1);
  
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
          console.log(id);
          let url="ApproveshortLeaveEntryByManagersAndHRs?status="+status+"&reasonforrejection="+result.value+"&manageempId="+id+"&shortLeaveEntryId="+item.short_leave_entry_id1
          //let url="ApproveLeavesByManagersAndHR?status="+status+"&manageempId="+id+"&applicationId="+empid.leaveApplicationId
          // let url = "ApproveLeavesByManagersAndHR?status="+status+"&manageempId="+id+"&employeeId="+empid.employeeId
          this._service.get(url).subscribe(res=>{
          console.log(res)
          if(res.respose=='Success')
            {
              Swal.fire({
                icon: 'success',
               // title: '',
                text: 'Leave has been Rejected',
               
              })
              this.shortLeaveForm.markAllAsTouched();
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
        if(usertype=='Admin' || usertype=='Super Admin'){
      
          this._service.get("getShortLeaveEntryForAdminId").subscribe(res=>{
      
            this.shortLeavesForAdmin=res.data
            console.log(this.shortLeavesForAdmin);
          
          })
        }
        else{
          let url="getNotApprovalShortLeaveEntryList?empid="+this.empId
      
      this._service.get(url).subscribe(res=>{
      
        this.shortLeaves1=res
        console.log(this.shortLeaves1);
      
      })
        }
        }
      })
    }
   
  
  }


  search(){
    let form=this.filterForm.value
    var datePipe = new DatePipe('en-US');
    let fromDate = datePipe.transform(form.fromDate,'yyyy-MM-dd');
    let toDate = datePipe.transform(form.toDate,'yyyy-MM-dd');
    let params = new HttpParams();
    params = params.append('toDate', toDate);
    params = params.append('fromDate', fromDate);
    params = params.append('empId', form.employee);
    let url ='getShortLeaveEntryListFormTODateAndEmployeeId?fromDate='+`${fromDate}`+'&toDate='+`${toDate}`+'&empId='+`${form.employee}`
        this._service.add(params,url).subscribe((data) => {
        this.filterId=data
        })
  }



  getEmpList(event){
    console.log(event)
    this.array.push(event)
    console.log(this.array.key)
    let form=this.shortLeaveForm.value
    if(this.array.length >=2){
    let data=form.employeeId.toLowerCase()
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





