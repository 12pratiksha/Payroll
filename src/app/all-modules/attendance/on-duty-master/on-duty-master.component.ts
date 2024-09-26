import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AllModulesService } from '../../all-modules.service';
import { DataTableDirective } from 'angular-datatables';
import { Route, Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-on-duty-master',
  templateUrl: './on-duty-master.component.html',
  styleUrls: ['./on-duty-master.component.css']
})
export class OnDutyMasterComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  dtOptions: any = {};
  showMyContainer: boolean = false
  container: boolean = false
  onDutyForm: FormGroup
  filterForm: FormGroup
  employee: any;
  outDuty: any;
  loader = true
  Id: any = undefined;
  outDutyForAdmin: any = [];
  empId: any;
  outDutyLeaves: any = [];
  userType: string;
  rpStatus: string;
  outDutyLeavesHistory: any = [];
  inputAdd: string;
  filterId: any=[];
  array: any=[];
  employee1: any;
  selected: string;
  constructor(public _fb: FormBuilder, public _service: AllModulesService, public router: Router) { }

  ngOnInit(): void {
    this.userType = localStorage.getItem('type')
    this.rpStatus = localStorage.getItem('rpStatus')
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'Bfrtip',
      buttons: [
        'copy', 'csv', 'excel', 'print',
      ]

    };
this.getOutDutyLeaves();
//this.getOutDutyLeaveHistory();
this.getEmployees();
this.getOutDutyList();
this.onDutyForm=this._fb.group({
  employeeId:['',Validators.required],
  date:['',Validators.required],
  fromTime:['',Validators.required],
  toTime:['',Validators.required],
  reason:['',Validators.required],
})

this.filterForm=this._fb.group({
  employee:['',Validators.required],
  fromDate:['',Validators.required],
  toDate:['',Validators.required]
})

  }

  // getEmployees(){
  //   if(this.userType=='Admin'){
  
  //   this._service.get('employee_master/getemployees').subscribe((res)=>{
  //     this.employee=res
    
  //   })
  // }else{
  //   this.employee=[];
  //     let myemp=[];
  //     let id = localStorage.getItem('empid')
  //     let url = "getemployeesListByThere-RM1-RM2-Self?employeeId=" + id;
  //     this._service.get(url).subscribe((res) => {
  //       console.log(res);
  //       // console.log(">>>>>"+res.employeeId);
  //       res.forEach(element => {
  //         //console.log(element);
  //         this.employee.push({ "employeeId": element.employeeId, "employeeCode": element.employeeCode, "firstName": element.firstName, "lastName": element.lastName });
  //         //console.log(">>>>>" + this.employee[0].employeeId);
  //       });
  //     });
  
  // }
  // }
  async getEmployees(){
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





  // getEmployees(){
  //   this._service.get('employee_master/getemployees').subscribe((res)=>{
  //     this.employee=res
  //   })
  // }
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
    console.log(this.onDutyForm)
    if(this.onDutyForm.status=='VALID' && this.userType!='Admin'){
      let form = this.onDutyForm.value
     
      var datePipe = new DatePipe('en-US');
      let date = datePipe.transform(form.date, 'yyyy-MM-dd');
      console.log(date)
      let data = {
        employeeId:form.employeeId,
        date: date,
        fromTime: form.fromTime,
        toTime: form.toTime,
        reason: form.reason
    }
    this._service.add(data,'addOutDutyMaster').subscribe((res)=>{
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
          //title: 'Record already exists',
          text: res.message,
      
        })
       }
       else if(res.respose=="Fail")
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
    else if(this.onDutyForm.status=='VALID' && this.userType!='Super Admin'){
      let form = this.onDutyForm.value
     
      var datePipe = new DatePipe('en-US');
      let date = datePipe.transform(form.date, 'yyyy-MM-dd');
      console.log(date)
      let data = {
        employeeId:form.employeeId,
        date: date,
        fromTime: form.fromTime,
        toTime: form.toTime,
        reason: form.reason
    }
    this._service.add(data,'addOutDutyMaster').subscribe((res)=>{
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
          //title: 'Record already exists',
          text: res.message,
      
        })
       }
       else if(res.respose=="Fail")
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
    else if(this.onDutyForm.status=='VALID' && this.userType=='Admin'){
      let emp=this.onDutyForm.value.employeeId.split(" ");
      let emply=this.employee.filter((emply)=>
      (emply.employeeCode == emp[0]))
      console.log(emply)

      let form = this.onDutyForm.value
     
      var datePipe = new DatePipe('en-US');
      let date = datePipe.transform(form.date, 'yyyy-MM-dd');
      console.log(date)
      let data = {
        employeeId:emply[0].employeeId,
        date: date,
        fromTime: form.fromTime,
        toTime: form.toTime,
        reason: form.reason
    }
    this._service.add(data,'addOutDutyMaster').subscribe((res)=>{
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
          //title: 'Record already exists',
          text: res.message,
      
        })
       }
       else if(res.respose=="Fail")
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
    else if(this.onDutyForm.status=='VALID' && this.userType=='Super Admin'){
      let emp=this.onDutyForm.value.employeeId.split(" ");
      let emply=this.employee.filter((emply)=>
      (emply.employeeCode == emp[0]))
      console.log(emply)

      let form = this.onDutyForm.value
     
      var datePipe = new DatePipe('en-US');
      let date = datePipe.transform(form.date, 'yyyy-MM-dd');
      console.log(date)
      let data = {
        employeeId:emply[0].employeeId,
        date: date,
        fromTime: form.fromTime,
        toTime: form.toTime,
        reason: form.reason
    }
    this._service.add(data,'addOutDutyMaster').subscribe((res)=>{
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
          //title: 'Record already exists',
          text: res.message,
      
        })
       }
       else if(res.respose=="Fail")
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
      this.onDutyForm.markAllAsTouched()
     }
     
  }
  cancel(){
    this.onDutyForm.reset();
    this.showMyContainer=false;
  }
  getOutDutyList(){
    let logData= JSON.parse(localStorage.getItem('loginData'));
    this.empId=logData.employeeid;
    this._service.get('getOutDutyMasterByempId?empId='+this.empId).subscribe((res)=>{
      this.outDuty = res.data
      this.loader = false
    },(error)=>{
    
      this.loader = false
      console.log(error)
      alert("Something Went Wrong")
}
)
  }
  editOutDuty(id){
    this.Id = id
    let url = "getOutDutyMaster/"+id
    this._service.get(url).subscribe((res)=>{
    var datePipe = new DatePipe('en-US');
    let date = datePipe.transform(res.date, 'dd-MM-yyyy');
    this.showMyContainer = true
    this.onDutyForm.get('employeeId').setValue(res.employeeId)
    this.onDutyForm.get('fromTime').setValue(res.fromTime)
    this.onDutyForm.get('toTime').setValue(res.toTime)
    this.onDutyForm.get('reason').setValue(res.reason)
    this.onDutyForm.get('date').setValue(date)
    })
  }
  update(){
    this.Id 
    if(this.onDutyForm.status=='VALID' && this.userType!='Admin'){
      let form = this.onDutyForm.value
      var datePipe = new DatePipe('en-US');
      let date = datePipe.transform(form.date, 'yyyy-MM-dd');
      console.log(date)
      let data = {
        employeeId:form.employeeId,
        date: date,
        fromTime: form.fromTime,
        toTime: form.toTime,
        reason: form.reason
    }
    this._service.add(data,'updateOutDutyMaster/'+this.Id).subscribe((res)=>{
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
        alert("Record already exists")
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
    else if(this.onDutyForm.status=='VALID' && this.userType!='Super Admin'){
      let form = this.onDutyForm.value
      var datePipe = new DatePipe('en-US');
      let date = datePipe.transform(form.date, 'yyyy-MM-dd');
      console.log(date)
      let data = {
        employeeId:form.employeeId,
        date: date,
        fromTime: form.fromTime,
        toTime: form.toTime,
        reason: form.reason
    }
    this._service.add(data,'updateOutDutyMaster/'+this.Id).subscribe((res)=>{
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
        alert("Record already exists")
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
    else if(this.onDutyForm.status=='VALID' && this.userType=='Admin'){
      
      let form = this.onDutyForm.value
     
      var datePipe = new DatePipe('en-US');
      let date = datePipe.transform(form.date, 'yyyy-MM-dd');
      console.log(date)
      let emp=this.onDutyForm.value.employeeId.split(" ");
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
    this._service.add(data,'updateOutDutyMaster/'+this.Id).subscribe((res)=>{
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
        alert("Record already exists")
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
    else if(this.onDutyForm.status=='VALID' && this.userType=='Super Admin'){
      let form = this.onDutyForm.value
      var datePipe = new DatePipe('en-US');
      let date = datePipe.transform(form.date, 'yyyy-MM-dd');
      console.log(date)
      let emp=this.onDutyForm.value.employeeId.split(" ");
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
    this._service.add(data,'updateOutDutyMaster/'+this.Id).subscribe((res)=>{
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
        alert("Record already exists")
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
      this.onDutyForm.markAllAsTouched()
     }
  }

  delete(id){
    let url = "deleteOutDutyMaster/"+id
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
        this._service.delete(id,'deleteOutDutyMaster').subscribe((res)=>{
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
 getOutDutyLeaves()
 {
  let logData= JSON.parse(localStorage.getItem('loginData'))
  this.empId=logData.employeeid
  let usertype=localStorage.getItem('type')
  if(usertype=='Admin' || usertype=='Super Admin'){
    let url='getNotApprovalOutDutyMasterList?empid='+this.empId
    this._service.get(url).subscribe(res=>{
    console.log(res)
    this.outDutyLeaves=res.data
    })
  }
  else{
    console.log(logData.employeeid)
    let url="getNotApprovalOutDutyMasterList?empid="+this.empId
    this._service.get(url).subscribe(res=>{
    console.log(res.data)
    this.outDutyLeaves=res.data
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
      let url ='getOutDutyMasterListFormTODateAndEmployeeId?fromDate='+`${fromDate}`+'&toDate='+`${toDate}`+'&empId='+`${form.employee}`
      this._service.add(params,url).subscribe((data) => {
      this.filterId=data
      })
}
approveOutDutyLeaves(status,row){

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
        let url="ApproveoutDutyMastersByManagersAndHRs?status="+status+"&manageempId="+id+"&outDutyMastersId="+row.outDutyMasterId
        this._service.get(url).subscribe(res=>{
        console.log(res)
        if(res.respose=='Success')
            {
              Swal.fire({
                icon: 'success',
                text: 'Leave has been Approved',
               
              })
              this.onDutyForm.markAllAsTouched();
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
          this._service.get("getOutDutyMasterListForAdmin").subscribe(res=>{
          console.log(res)
          this.outDutyLeaves=res.data
          })
        }
        else{
          let logData= JSON.parse(localStorage.getItem('loginData'))
          this.empId=logData.employeeid
          console.log(logData.employeeid)
          let url="getNotApprovalOutDutyMasterList?empid="+this.empId
          this._service.get(url).subscribe(res=>{
          console.log(res)
          this.outDutyLeaves=res
          })
        }
      }
    })
      }
      else if(status==2){
        Swal.fire({
          title:"Are you really want reject leave..?",
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
            let url="ApproveoutDutyMastersByManagersAndHRs?status="+status+"&reasonforrejection="+result.value+"&manageempId="+id+"&outDutyMastersId="+row.outDutyMasterId
            this._service.get(url).subscribe(res=>{
            console.log(res)
            if(res.respose=='Success')
            {
              Swal.fire({
                icon: 'success',
                text: 'Leave has been Rejected',
              })
              this.onDutyForm.markAllAsTouched();
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
              this._service.get("getOutDutyMasterListForAdmin").subscribe(res=>{
              console.log(res)
              this.outDutyLeaves=res.data
            })
            }
            else{
              let logData= JSON.parse(localStorage.getItem('loginData'))
              this.empId=logData.employeeid
              console.log(logData.employeeid)
              let url="getNotApprovalOutDutyMasterList?empid="+this.empId
              this._service.get(url).subscribe(res=>{
              console.log(res)
              this.outDutyLeaves=res
              })
            }
          }
        })
      }
}


approveOutDutyLeaves1(status,row){
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
        let url="ApproveoutDutyMastersByManagersAndHRs?status="+status+"&manageempId="+id+"&outDutyMastersId="+row.out_duty_master_id
        this._service.get(url).subscribe(res=>{
        console.log(res)
        if(res.respose=='Success')
            {
              Swal.fire({
                icon: 'success',
                text: 'Leave has been Approved',
              })
              this.onDutyForm.markAllAsTouched();
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
          this._service.get("getOutDutyMasterListForAdmin").subscribe(res=>{
          console.log(res)
          this.outDutyLeaves=res.data
          })
        }
        else{
          let logData= JSON.parse(localStorage.getItem('loginData'))
          this.empId=logData.employeeid
          console.log(logData.employeeid)
          let url="getNotApprovalOutDutyMasterList?empid="+this.empId
          this._service.get(url).subscribe(res=>{
          console.log(res)
          this.outDutyLeaves=res
        })
      }
      }
    })
      }
      else if(status==2){
        Swal.fire({
          title:"Are you really want reject leave..?",
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
            let url="ApproveoutDutyMastersByManagersAndHRs?status="+status+"&reasonforrejection="+result.value+"&manageempId="+id+"&outDutyMastersId="+row.out_duty_master_id
            this._service.get(url).subscribe(res=>{
            console.log(res)
            if(res.respose=='Success')
            {
              Swal.fire({
                icon: 'success',
               // title: '',
                text: 'Leave has been Rejected',
               
              })
              this.onDutyForm.markAllAsTouched();
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
            if(usertype=='Admin' || usertype=='Super Admin '){
              this._service.get("getOutDutyMasterListForAdmin").subscribe(res=>{
              console.log(res)
              this.outDutyLeaves=res.data
              })
            }
            else{
              let logData= JSON.parse(localStorage.getItem('loginData'))
              this.empId=logData.employeeid
              console.log(logData.employeeid)
              let url="getNotApprovalOutDutyMasterList?empid="+this.empId
              this._service.get(url).subscribe(res=>{
              console.log(res)
              this.outDutyLeaves=res
            })
          }
          }
        })
      }
}


getEmpList(event){
  this.array.push(event)
  console.log(this.array)
  let form=this.onDutyForm.value
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
// getOutDutyLeaveHistory(){
//   let id = localStorage.getItem('empid')
//   let url="getApprovalOutDutyMasterListListForAdmin?hrId="+id
//   this._service.get(url).subscribe(res=>{
    
//     this.outDutyLeavesHistory=res.data
//     console.log(this.outDutyLeavesHistory);
//   })
//}

}


