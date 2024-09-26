import { Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AllModulesService } from '../../all-modules.service';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { Route, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { event, data } from 'jquery';
import { interval, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';




@Component({
  selector: 'app-attendance-process',
  templateUrl: './attendance-process.component.html',
  styleUrls: ['./attendance-process.component.css']
})
export class AttendanceProcessComponent implements OnInit {
  path=environment.apiEndpoint;
  attendanceProcess:FormGroup
  tableData: any;
  tableLen: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  stateData: any;
  branch: any;
  categories: any;
  departments: any;
  employees=[];
  isdisable:boolean=false;
  type: number;
  public pipe = new DatePipe("en-US"); 
  check: any;
  check1: any;
  employee_display: any=[];
  textData: string;

  private subscription: Subscription;
  response: any;
  apiurl: string;
  loginData: string;
  data: any;
  progress: string[];
  array: any=[];
  employee1: any;
  selected: any;
  userType: string;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  displayedColumns: string[] = ['select', 'id', 'name', 'branch', 'department','status'];
  dataSource = new MatTableDataSource();
  selection = new SelectionModel(true, []);

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  

  /** The label for the checkbox on the passed row */
  checkboxLabel(row): string {
    if (!row) {

      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }


  constructor(
    public _fb:FormBuilder, 
    public _service:AllModulesService,
    public router: Router,
    private http: HttpClient
    ) { }
  ngOnInit(): void {
  this.userType=localStorage.getItem('type')
  this.attendanceProcess=this._fb.group({
  fromDate:['',Validators.required],
  toDate:['',Validators.required],
  state:'',
  branch:'',
  category:'',
  department:'',
  searchBy:'',
  status:'1',
  id:'',
  name:''
})
let id = this.selection.selected
console.log(id)
//this.getEmployee();
this.getState();
this.getBranchList();
this.getCategories();
this.getDepartment();
this.getAllEmployee();
  }

  getEmployee(){
    let url = "getAttendanceProcess?fromDate&toDate&state&category&subCategory&status&employeeNo&department&branch"
    this._service.get(url).subscribe((data) => {
    console.log(data)
      this.tableData = data
      this.tableLen = data.length
      this.dataSource = new MatTableDataSource<any>(data);
       this.dataSource.paginator = this.paginator;
    });
  
  }
  search(event){
    let branchStatus=localStorage.getItem('branchStatus')
    let branchId=localStorage.getItem('branchId')
    
    console.log(event.type)
    this.check1=event.type
    if( this.attendanceProcess.status=='VALID'){
    let form=this.attendanceProcess.value
    var datePipe = new DatePipe('en-US');
    let fromDate = datePipe.transform(form.fromDate, 'yyyy-MM-dd');
    let toDate = datePipe.transform(form.toDate, 'yyyy-MM-dd');
    console.log(this.attendanceProcess)
    Swal.fire({
      title: 'Loading...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading()
      }
    });

let status=form.status;
let url
if ( this.attendanceProcess.value.id && branchStatus=='true' && this.attendanceProcess.value.branch==''){
  let emp=this.attendanceProcess.value.id.split(" ");
      let emply=this.employees.filter((emply)=>
      (emply.employeeCode == emp[0]))

    url = "getAttendanceProcess?fromDate="+`${fromDate}`+"&toDate="+`${toDate}`+"&state="+`${form.state}`+"&category="+`${form.category}`+"&subCategory=&status="+status+"&employeeNo="+`${emply[0].employeeId}`+"&department="+`${form.department}`+"&branch="+`${branchId}`
  }
else if (this.attendanceProcess.value.id && branchStatus=='true' && this.attendanceProcess.value.branch!=''){
    let emp=this.attendanceProcess.value.id.split(" ");
      let emply=this.employees.filter((emply)=>
      (emply.employeeCode == emp[0]))
     url = "getAttendanceProcess?fromDate="+`${fromDate}`+"&toDate="+`${toDate}`+"&state="+`${form.state}`+"&category="+`${form.category}`+"&subCategory=&status="+status+"&employeeNo="+`${emply[0].employeeId}`+"&department="+`${form.department}`+"&branch="+`${form.branch}`
  }
else if ( this.attendanceProcess.value.id && branchStatus=='false' ){
    let emp=this.attendanceProcess.value.id.split(" ");
      let emply=this.employees.filter((emply)=>
      (emply.employeeCode == emp[0]))
    url = "getAttendanceProcess?fromDate="+`${fromDate}`+"&toDate="+`${toDate}`+"&state="+`${form.state}`+"&category="+`${form.category}`+"&subCategory=&status="+status+"&employeeNo="+`${emply[0].employeeId}`+"&department="+`${form.department}`+"&branch="+`${form.branch}`
  }
else if (  this.attendanceProcess.value.id==undefined && branchStatus=='true'&& this.attendanceProcess.value.branch=='' ){
    
    url = "getAttendanceProcess?fromDate="+`${fromDate}`+"&toDate="+`${toDate}`+"&state="+`${form.state}`+"&category="+`${form.category}`+"&subCategory=&status="+status+"&employeeNo="+''+"&department="+`${form.department}`+"&branch="+`${branchId}`
  }
else if ( this.attendanceProcess.value.id==undefined && branchStatus=='true'&& this.attendanceProcess.value.branch!='' ){
    
    url = "getAttendanceProcess?fromDate="+`${fromDate}`+"&toDate="+`${toDate}`+"&state="+`${form.state}`+"&category="+`${form.category}`+"&subCategory=&status="+status+"&employeeNo="+''+"&department="+`${form.department}`+"&branch="+`${form.branch}`
  }
else{
   url = "getAttendanceProcess?fromDate="+`${fromDate}`+"&toDate="+`${toDate}`+"&state="+`${form.state}`+"&category="+`${form.category}`+"&subCategory=&status="+status+"&employeeNo="+`${form.searchBy}`+"&department="+`${form.department}`+"&branch="+`${form.branch}`
    
  }

this._service.get(url).subscribe((data)=>{
  console.log(data.length)
  if(data.length>0){
    console.log(">>>>>>")
    this.employee_display=[];
    data.forEach(element => {
      let department=element.department
      let branch=element.branch
      let result =this.departments.filter((dept: any) =>
            (dept.departmentId==department) )
            let resultBranch =this.branch.filter((brch: any) =>
            (brch.id==branch) )


      this.employee_display.push({"employeeId":element.employeeId,"employeeCode":element.employeeCode,"firstName":element.firstName,"lastName":element.lastName,"branch":resultBranch[0].branchName,"department":result[0].departmentName,"status":element.status})
        
      })
    
      Swal.fire({
        icon: 'success',
        //title: 'There is no records are available',
        showConfirmButton: false,
        timer: 1500,
        didOpen: () => {
          Swal.hideLoading()
        }
      })

      console.log(this.employee_display)
      this.tableData = this.employee_display
      this.tableLen = data.length
      this.dataSource = new MatTableDataSource<any>(this.tableData);
      
      this.dataSource.paginator = this.paginator;
  
}else{
  this.tableData=[];
  this.dataSource = new MatTableDataSource<any>(this.tableData);
  Swal.fire({
    icon: 'warning',
    title: 'There is no records are available',
    showConfirmButton: false,
    timer: 1500,
    didOpen: () => {
      Swal.hideLoading()
    }
  })

 
}
})
  }
else{
  this.attendanceProcess.markAllAsTouched();
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Something went wrong!',
    
  })
 }


  }




  searchExtraction(event){
    let branchStatus=localStorage.getItem('branchStatus')
    let branchId=localStorage.getItem('branchId')
    
 console.log(event.type)
 this.check=event.type
    if (this.attendanceProcess.status=='VALID'){
      
     let form=this.attendanceProcess.value
     var datePipe = new DatePipe('en-US');
   let fromDate = datePipe.transform(form.fromDate, 'yyyy-MM-dd');
   let toDate = datePipe.transform(form.toDate, 'yyyy-MM-dd');
   console.log(this.attendanceProcess)
   Swal.fire({
     title: 'Loading...',
     allowEscapeKey: false,
     allowOutsideClick: false,
     showConfirmButton: false,
     didOpen: () => {
       Swal.showLoading()
     }
   });

   
let status=form.status;
let url
if ( this.attendanceProcess.value.id && branchStatus=='true' && this.attendanceProcess.value.branch==''){
  let emp=this.attendanceProcess.value.id.split(" ");
      let emply=this.employees.filter((emply)=>
      (emply.employeeCode == emp[0]))
   //getAttendenceExtrationList?fromDate=2023-09-01&toDate=2023-09-07&state&category&subCategory&status&employeeNo=&department&branch
   //  let url = "getBulkAttendenceList?fromDate="+`${fromDate}`+"&toDate="+`${toDate}`+"&state="+`${form.state}`+"&subCategory&status="+`${form.status}`+"&employeeNo&category"+`${form.category}`+"&department"
   // let url = "getAttendanceProcess?fromDate="+`${fromDate}`+"&toDate="+`${toDate}`+"&state="+`${form.state}`+"&subCategory&status="+`${form.status}`+"&employeeNo="+`${form.id}`+"&category="+`${form.category}`+"&department="+`${form.department}`+"&branch="+`${form.branch}`
     url = "getAttendenceExtrationList?fromDate="+`${fromDate}`+"&toDate="+`${toDate}`+"&state="+`${form.state}`+"&category="+`${form.category}`+"&subCategory=&status="+status+"&employeeNo="+`${emply[0].employeeId}`+"&department="+`${form.department}`+"&branch="+`${branchId}`
}
else if ( this.attendanceProcess.value.id && branchStatus=='true' && this.attendanceProcess.value.branch!=''){
  let emp=this.attendanceProcess.value.id.split(" ");
      let emply=this.employees.filter((emply)=>
      (emply.employeeCode == emp[0]))
  
    url = "getAttendenceExtrationList?fromDate="+`${fromDate}`+"&toDate="+`${toDate}`+"&state="+`${form.state}`+"&category="+`${form.category}`+"&subCategory=&status="+status+"&employeeNo="+`${emply[0].employeeId}`+"&department="+`${form.department}`+"&branch="+`${form.branch}`
}
else if ( this.attendanceProcess.value.id && branchStatus=='false'){
  let emp=this.attendanceProcess.value.id.split(" ");
      let emply=this.employees.filter((emply)=>
      (emply.employeeCode == emp[0]))
  
    url = "getAttendenceExtrationList?fromDate="+`${fromDate}`+"&toDate="+`${toDate}`+"&state="+`${form.state}`+"&category="+`${form.category}`+"&subCategory=&status="+status+"&employeeNo="+`${emply[0].employeeId}`+"&department="+`${form.department}`+"&branch="+`${form.branch}`
}
else if ( this.attendanceProcess.value.id==undefined && branchStatus=='true'&& this.attendanceProcess.value.branch==''){
  
    url = "getAttendenceExtrationList?fromDate="+`${fromDate}`+"&toDate="+`${toDate}`+"&state="+`${form.state}`+"&category="+`${form.category}`+"&subCategory=&status="+status+"&employeeNo="+`${""}`+"&department="+`${form.department}`+"&branch="+`${branchId}`
}
else if ( this.attendanceProcess.value.id==undefined && branchStatus=='true'&& this.attendanceProcess.value.branch!=''){
  
  url = "getAttendenceExtrationList?fromDate="+`${fromDate}`+"&toDate="+`${toDate}`+"&state="+`${form.state}`+"&category="+`${form.category}`+"&subCategory=&status="+status+"&employeeNo="+`${""}`+"&department="+`${form.department}`+"&branch="+`${form.branch}`
}
else {

    url = "getAttendenceExtrationList?fromDate="+`${fromDate}`+"&toDate="+`${toDate}`+"&state="+`${form.state}`+"&category="+`${form.category}`+"&subCategory=&status="+status+"&employeeNo="+`${''}`+"&department="+`${form.department}`+"&branch="+`${form.branch}`
}

   this._service.get(url).subscribe((data)=>{
    console.log(data)
    if(data.length==0){
      this.tableData=[];
      this.tableLen = 0;
      this.dataSource = new MatTableDataSource<any>(this.tableData);
      Swal.fire({
        icon: 'warning',
        title: 'There is no records are available',
         showConfirmButton: false,
         timer: 1500,
         didOpen: () => {
           Swal.hideLoading()
         }
       })
  
     
    }else{
      Swal.fire({
        icon: 'success',
        //title: 'There is no records are available',
        showConfirmButton: false,
        timer: 1500,
        didOpen: () => {
          Swal.hideLoading()
        }
      })
   this.tableData = data
   this.tableLen = data.length
   this.dataSource = new MatTableDataSource<any>(this.tableData);
   
   this.dataSource.paginator = this.paginator;
    }
   })
    }
    else{
     this.attendanceProcess.markAllAsTouched();
     Swal.fire({
       icon: 'error',
       title: 'Oops...',
       text: 'Something went wrong!',
       
     })
    }
  
     }



  getState(){

    this._service.get( "state/getStateList").subscribe((data) => {
      this.stateData = data;
      // console.log(data);
    });

  }
  getBranchList(){


    this._service.get('branch/getBranchList')
    .subscribe((res)=>{
    
    
    this.branch = res
    // console.log(this.branch)
    
    })
    
  }

  getCategories(){

    this._service.get('categories/getCategories').subscribe((res)=>{
      this.categories=res
    })
    
  }
  getDepartment(){
    this._service.get('getAllDepartment').subscribe((res)=>{
    this.departments = res
    })
  }

  attendanceExtraction(){
    
    let form=this.attendanceProcess.value
    var datePipe = new DatePipe('en-US');
    let fromDate = datePipe.transform(form.fromDate, 'yyyy-MM-dd');
    let toDate = datePipe.transform(form.toDate, 'yyyy-MM-dd');
    let employees = []
    if (this.attendanceProcess.valid){
 Swal.fire({
    title: 'Are you sure?',
    text: "You Want To Process The Attendance For Selected Employees! (Attendance Extraction Process)",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, Process it!'
  }).then((result) => {
    if (result.isConfirmed) {
      //console.log(employees)
      let id = this.selection.selected
      //console.log(this.selection.selected)
      id.forEach((employee)=>{
        employees.push(employee.employeeId)
        console.log(employees)
       })
       Swal.fire({
        title: 'Loading...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading()
        }
      });
     let url = "AttendenceExtrationProcess?fromDate="+fromDate+"&toDate="+toDate
    //  this._service.add(employees, url).subscribe((res)=>{
     
      // if(res.respose == "Success"){
      //   Swal.fire({
      //     icon: 'success',
      //     title: 'Your work has been saved',
      //     showConfirmButton: false,
      //     timer: 1500,
      //     didOpen: () => {
      //       Swal.hideLoading()
      //     }
      //   })
       
      //   const currentRoute = this.router.url;

      //   this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      //       this.router.navigate([currentRoute]); // navigate to same route
      //   }); 
      // }
   
      // else if (res.respose ==	"Fail"){
      //   let msg = res.message
      //   Swal.fire({
      //     icon: 'error',
      //     title: 'Oops...',
      //     text: "Something went Wrong, please try again",
      //     didOpen: () => {
      //       Swal.hideLoading()
      //     }
         
      //   })
      //  }
      let botMessage = ''
        
          this.apiurl = this.path+`${url}`;
          this.loginData = localStorage.getItem('LoginData'); 
          this.chatStream(url,employees).subscribe({
            next: (text) => {
              // console.log(text)
              this.data=text
              botMessage += text
               this.progress=botMessage.split("Processing") 
               console.log(this.progress)
               
      
             
            },
            complete: () => {
              // console.log("Doness")
              Swal.fire({
                icon: 'success',
                title:'Success',
                text: 'Attendance extraction sucessfully done!',
                showConfirmButton: false,
              
              }) 
            },
            error: () => {
              // console.log("error")
              Swal.fire({
                icon: 'error',
                title:'Error',
                text: 'Something went wrong!',
                showConfirmButton: false,
              
              }) 
            }
          });
        
          return botMessage;
        };
     
    
      })
     
    }

}


// else{
//   Swal.fire({
//     icon: 'error',
//     title: 'Oops...',
//     text: 'Something went wrong!',
   
//   })
//   this.attendanceProcess.markAllAsTouched();
// }
  // }

 
  processAttendance(){
   
    let form=this.attendanceProcess.value
    var datePipe = new DatePipe('en-US');
    let fromDate = datePipe.transform(form.fromDate, 'yyyy-MM-dd');
    let toDate = datePipe.transform(form.toDate, 'yyyy-MM-dd');
    // console.log(this.selection.selected.length)
  if (this.attendanceProcess.valid && (this.selection.selected.length >= 1)){
    let employees = [];
    Swal.fire({
      title: 'Are you sure?',
      text: "You Want To Process The Attendance For Selected Employees! (Attendance Process)",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Process it!'
    }).then((result) => {
      if (result.isConfirmed) {
  
        let id = this.selection.selected
        id.forEach((employee)=>{
          employees.push(employee.employeeId)
          console.log(employee)
         })
         console.log(this.employees)
        //  Swal.fire({
        //   title: 'Loading...',
        //   allowEscapeKey: false,
        //   allowOutsideClick: false,
        //   showConfirmButton: false,
        //   // didOpen: () => {
        //   //   Swal.showLoading()
        //   // }
        // });
        

         let url = 'UpdateBulkAttendenceList?fromDate='+`${fromDate}`+'&toDate='+`${toDate}`
        

          let botMessage = ''
        
          this.apiurl = this.path+`${url}`;
          this.loginData = localStorage.getItem('LoginData'); 
          this.chatStream(url,employees).subscribe({
            next: (text) => {
              // console.log(text)
              this.data=text
              botMessage += text
               this.progress=botMessage.split("Processing") 
              //  console.log(this.progress)
               
      
             
            },
            complete: () => {
              // console.log("Doness")
              Swal.fire({
                icon: 'success',
                title:'Success',
                text: 'Attendance process sucessfully!',
                showConfirmButton: false,
              
              }) 
            },
            error: () => {
              // console.log("error")
              Swal.fire({
                icon: 'error',
                title:'Error',
                text: 'Something went wrong!',
                showConfirmButton: false,
              
              }) 
            }
          });
        
          return botMessage;
        };
     
    
      })
        //  this._service.add(employees, url).subscribe((data)=>{
        //   this.=data
      //     console.log(this.textData)
      //     if(data.respose == "Success"){
      //       Swal.fire({
      //         icon: 'success',
      //         title: 'Your work has been saved',
      //         showConfirmButton: false,
      //         timer: 1500,didOpen: () => {
      //           Swal.hideLoading()
      //         }
      //       })
      //       const currentRoute = this.router.url;

      //       this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      //           this.router.navigate([currentRoute]); // navigate to same route
      //       }); 
      //     }
       
      //     else if (data.respose ==	"Fail"){
      //       let msg = data.message
      //       Swal.fire({
      //         icon: 'error',
      //         title: 'Oops...',
      //         text: msg,
      //         didOpen: () => {
      //           Swal.hideLoading()
      //         }
             
      //       })
      //      }
      //    })
      
      // }
    
  
  // }
  // else if (this.selection.selected.length == 0 && this.attendanceProcess.valid){
  //   Swal.fire({
  //     icon: 'error',
  //     title: 'Oops...',
  //     text: 'Select Employee',
     
  //   })
  // }
  
  // else{
  //   Swal.fire({
  //     icon: 'error',
  //     title: 'Oops...',
  //     text: 'Something went wrong!',
     
  //   })
  //   this.attendanceProcess.markAllAsTouched();
  
  }
}

chatStream(url, body) {
  this.apiurl = this.path+`${url}`;
  this.loginData = localStorage.getItem('LoginData'); 
  
  return new Observable<string>(observer => {
    fetch(this.apiurl, {
      method: 'POST',
      body: "["+body+"]",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.loginData,
      },
    }).then(response => {
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      if (!response.ok) {
         // handle response error 
         observer.error();
      }

      function push() {
        return reader?.read().then(({ done, value }) => {
          if (done) {
            observer.complete();
            return;
          }
          // console.log(value)
          //parse text content from response
          const events = decoder.decode(value).split('\n\n');
          let content = '';
          
          for (let i = 0; i < events.length; i++) {
            const event = events[i];
          
            if (event === 'data: [DONE]') break;
            if (event && event.slice(0, 5) === 'data:') {
             const data = event.slice(5);
              content += data || '';


            }
          }
          
          observer.next(content);
          push();
        });
      }

      push();
    }).catch((err: Error) => {
      // handle fetch error
      observer.error();
    });
  });
}

  
  reset(){
    // window.location.reload(); 
    this.check='cl'
    this.check1='cl'
    this.attendanceProcess.reset();
  }
  async getAllEmployee(){
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
  update(){
    let form=this.attendanceProcess.value
    var datePipe = new DatePipe('en-US');
    let fromDate = datePipe.transform(form.fromDate, 'yyyy-MM-dd');
    let toDate = datePipe.transform(form.toDate, 'yyyy-MM-dd');
    let employees = [];
    let url = 'UpdateBulkAttendenceList?fromDate='+`${fromDate}`+'&toDate='+`${toDate}`
    if (this.attendanceProcess.valid && (this.selection.selected.length >= 1)){
      let id = this.selection.selected
      id.forEach((employee)=>{
        employees.push(employee.employeeId)
 
       })
       this._service.add(employees, url).subscribe((res)=>{
        console.log(res)
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

  getEmpList(event){
 
    console.log(event)
    
    this.array.push(event)
    console.log(this.array.key)
    // console.log(this.array.key.toLowerCase)
    let form=this.attendanceProcess.value
    if(this.array.length >=2){
      let data=form.id.toLowerCase()
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

