import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { format } from 'date-fns';
import Swal from 'sweetalert2';
import { AllModulesService } from '../../all-modules.service';

@Component({
  selector: 'app-attendance-lock-list',
  templateUrl: './attendance-lock-list.component.html',
  styleUrls: ['./attendance-lock-list.component.css']
})
export class AttendanceLockListComponent implements OnInit {
  showMyContainer:boolean=false;
  public dtElement: DataTableDirective;
  dtOptions: any = {};
  lockListForm: FormGroup
  tableData: any;
  editId: any;
  constructor(
    public fb: FormBuilder,
    public router: Router,
    public _service: AllModulesService
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'print', 
        ]
    };
    this.lockListForm = this.fb.group({
      fromDate:['', Validators.required],
      toDate:['', Validators.required],
      lockDate:['', Validators.required],
      repeat:['', ],
      status:['', ]
    })

    this.getTableData();
  }

  showContainer(){
    this.showMyContainer=true;
  }
  hideMyContainer(){
    const currentRoute = this.router.url;

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentRoute]); // navigate to same route
    }); 
  }

  submit(){
    // console.log(this.lockListForm.value)
   
let fromDate = this.lockListForm.value.fromDate
let toDate = this.lockListForm.value.toDate
let lockDate = this.lockListForm.value.lockDate
let form = this.lockListForm.value
var datePipe = new DatePipe('en-US');
let date = new Date()
fromDate = datePipe.transform(fromDate,'yyyy-MM-dd')
toDate = datePipe.transform(toDate,'yyyy-MM-dd')
lockDate = datePipe.transform(lockDate,'yyyy-MM-dd')

let d = datePipe.transform(date,'yyyy-MM-dd')

let data = {
  fromDate: fromDate,
    toDate: toDate,
    lockDate: lockDate,
    repeatPerMonth: form.repeat,
    createdBy: "",
    createdDate: d,
    status: form.status
}

if(this.lockListForm.valid){
  this._service.add(data, "addAttendancLockMaster").subscribe((res)=>{
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
this.lockListForm.markAllAsTouched();
}

  }


  getTableData(){
    this._service.get("getAllAttendancLockMaster").subscribe((res)=>{
      this.tableData = res
    })
  }
update = false
edit(id){
  this.editId = id
  this.update = true
  this.showMyContainer = true
let url = "getAttendancLockMaster/"+id
this._service.get(url).subscribe((res)=>{
  let fromDate = res.fromDate
let toDate = res.toDate
let lockDate = res.lockDate
var datePipe = new DatePipe('en-US');
  fromDate = datePipe.transform(fromDate,'yyyy-MM-dd')
toDate = datePipe.transform(toDate,'yyyy-MM-dd')
lockDate = datePipe.transform(lockDate,'yyyy-MM-dd')


this.lockListForm.get('fromDate').setValue(fromDate)
this.lockListForm.get('toDate').setValue(toDate)
this.lockListForm.get('lockDate').setValue(lockDate)
this.lockListForm.get('repeat').setValue(res.repeatPerMonth)
this.lockListForm.get('status').setValue(res.status)

})
}

updateForm(){
  console.log(this.lockListForm.value)
  if(this.lockListForm.valid){
    let fromDate = this.lockListForm.value.fromDate
    let toDate = this.lockListForm.value.toDate
    let lockDate = this.lockListForm.value.lockDate
    let form = this.lockListForm.value
    var datePipe = new DatePipe('en-US');
    let date = new Date().toLocaleDateString();
    fromDate = datePipe.transform(fromDate,'yyyy-MM-dd')
    toDate = datePipe.transform(toDate,'yyyy-MM-dd')
    lockDate = datePipe.transform(lockDate,'yyyy-MM-dd')
    date = datePipe.transform(date,'yyyy-MM-dd')
 
    let data = {
      fromDate: fromDate,
        toDate: toDate,
        lockDate: lockDate,
        repeatPerMonth: form.repeat,
        createdBy: "",
        createdDate: date,
        status: form.status
    }
   
    this._service.add(data, "updateAttendancLockMaster/"+this.editId).subscribe((res)=>{
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
  this.lockListForm.markAllAsTouched();
  }
  
}
cancel(){
  const currentRoute = this.router.url;

  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]); // navigate to same route
  }); 
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

      this._service.delete(id,'deleteAttendancLockMaster').subscribe((res)=>{
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
}
