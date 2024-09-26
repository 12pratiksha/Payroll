import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { format } from 'date-fns';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'ngx-bootstrap-multiselect';
import Swal from 'sweetalert2';
import { AllModulesService } from '../../all-modules.service';

@Component({
  selector: 'app-attendanceunlock-list',
  templateUrl: './attendanceunlock-list.component.html',
  styleUrls: ['./attendanceunlock-list.component.css']
})
export class AttendanceunlockListComponent implements OnInit {
  showMyContainer:boolean=false;
  public dtElement: DataTableDirective;
  dtOptions: any = {};
  lockListForm: FormGroup
  datePipe = new DatePipe('en-US');
  employee:IMultiSelectOption[];
  tableData: any;
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
  // checked: 'item selected',
  // checkedPlural: 'items selected',
  // searchPlaceholder: 'Find',
  // searchEmptyResult: 'Nothing found...',
  // searchNoRenderText: 'Type in search box to see results...',
  // defaultTitle: 'Select',
  // allSelected: 'All selected',
};
  editId: any;
  update: boolean = false;
  constructor(
    public fb: FormBuilder,
    public router: Router,
    public _service: AllModulesService,
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
      // lockListName:['',Validators.required],
      employee:['',Validators.required],

    })
    this.getEmployee();
    this.getTableData();
  }

  delete(){
    
  }
  getEmployee(){
    this._service.get("employee_master/getemployees").subscribe((res)=>{
 let department = []

  res.forEach(element => {
   
    let departments={id:element.employeeId, name: element.firstName + " " + element.lastName}
    department.push(departments)
  
  this.employee=department

  });

    })
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
    console.log(this.lockListForm.value)
let fromDate = this.lockListForm.value.fromDate
let toDate = this.lockListForm.value.toDate

fromDate = this.datePipe.transform(fromDate,'yyyy-MM-dd')
toDate = this.datePipe.transform(toDate,'yyyy-MM-dd')
let date = new Date().toLocaleDateString();
date = this.datePipe.transform(date,'yyyy-MM-dd')
if(this.lockListForm.valid){
  let data = 
  {
    fromDate: fromDate,
    toDate: toDate,
    employeeIds: this.lockListForm.value.employee,
    createdDate: date,
    
}
this._service.add(data, 'addAttendanceLockUnLockMaster').subscribe((res)=>{
  
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
  this.lockListForm.markAllAsTouched()
}
  }

getTableData(){
  this._service.get("getAllAttendanceLockUnLockMaster").subscribe((res)=>{
    this.tableData = res
  })
}
edit(id){
  this.update = true
  this.showMyContainer = true
  this.editId = id

this._service.get("getAttendanceLockUnLockMaster").subscribe((res)=>{
 let fromDate = this.datePipe.transform(res.fromDate,'yyyy-MM-dd')
 let  toDate = this.datePipe.transform(res.toDate,'yyyy-MM-dd')
this.lockListForm.get("fromDate").setValue(fromDate)
this.lockListForm.get("toDate").setValue(toDate)

})

}
updateForm(){
  let fromDate = this.lockListForm.value.fromDate
let toDate = this.lockListForm.value.toDate

fromDate = this.datePipe.transform(fromDate,'yyyy-MM-dd')
toDate = this.datePipe.transform(toDate,'yyyy-MM-dd')
let date = new Date().toLocaleDateString();
date = this.datePipe.transform(date,'yyyy-MM-dd')
if(this.lockListForm.valid){
  let data = 
  {
    fromDate: fromDate,
    toDate: toDate,
    employeeIds: this.lockListForm.value.employee,
    createdDate: date,
    
}
this._service.add(data, 'updateAttendanceLockUnLockMaster'+this.editId).subscribe((res)=>{
  
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
  this.lockListForm.markAllAsTouched()
}
}
}
