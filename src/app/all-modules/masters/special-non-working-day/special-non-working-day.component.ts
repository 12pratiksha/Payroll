import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { IMultiSelectOption } from 'ngx-bootstrap-multiselect';
import { AllModulesService } from '../../all-modules.service';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-special-non-working-day',
  templateUrl: './special-non-working-day.component.html',
  styleUrls: ['./special-non-working-day.component.css']
})
export class SpecialNonWorkingDayComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource();
  update: any = false;
  tableData: any;
  showMyContainer:boolean=false;
  dtOptions: any = {};
  states: any;
  workingDayForm:FormGroup
  filterForm:FormGroup
  displayedColumns: string[] = ['select', 'id', 'name', 'branch', 'department','status'];
 
  selection = new SelectionModel(true, []);
  data: any;
  editId: any;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  employees = [];
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
  checkboxLabel(row?): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  constructor(public fb: FormBuilder, public _service: AllModulesService, public router: Router) { }

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
    this.workingDayForm = this.fb.group({
  dayFull:['FullDay',Validators.required],
  workingDate:['',Validators.required],
  branch:['',Validators.required],
  state:['',Validators.required],
  description:'',
  status:'true'
    })
    this.filterForm = this.fb.group({
    
    })
    this.getState();
    this.getBranchList();
    this.getTableData();
    this.getGrade();
    this.getEmployeeList();
  }
  getState(){
    this._service.get("state/getStateList").subscribe((res)=>{
    this.states = res;
   console.log(res)
    })
  } 
  

  branch:IMultiSelectOption[];
  getBranchList(){

    let branch:any=[]
        this._service.get('branch/getBranchList')
        .subscribe((res)=>{
        
          res.forEach(element => {
           
            let branches={id:element.id, name:element.branchName}
            branch.push(branches)
          
          this.branch=branch

          });
      
        })
        
          }
        

   grade:IMultiSelectOption[];
   getGrade(){
    let grade = []
    this._service.get('getgetCodeByType?type=grade').subscribe((res)=>{
      this.grade = res
      res.forEach(element => {
           
        let grades={id:element.name, name:element.name}
       if(element.name){ grade.push(grades)
        this.grade = grade
       }
      
        
      });
    })
  }
  
getTableData(){
  this._service.get("getAllSpecialNonWorkDayMaster").subscribe((res)=>{
this.tableData = res
  })
}
// edit(id){
//   this.router.navigate(['/layout/masters/specialWorkingDayUpdate/'+id])
// }

getEmployeeList(){
//   console.log(this.filterForm)
// let url = "getAllEmployeesBySBG?state=MH&branch=Pune"
// this._service.add(["a","b","c","d"], url).subscribe((data)=>{
//   this.data = data
//   this.dataSource = new MatTableDataSource<any>(data);
//   setTimeout(() => this.dataSource.paginator = this.paginator);
 
// })
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

search(){
  console.log(this.filterForm)
  let form = this.filterForm.value
let url = "getAllEmployeesBySBG?state="+form.state+"&branch="+form.branch
this._service.add(form.grade, url).subscribe((data)=>{
  this.data = data
  this.dataSource = new MatTableDataSource<any>(data);
  this.dataSource.paginator = this.paginator;
  // this.loader = false
})
}


submit(){
  if(this.workingDayForm.valid ){
    let form = this.workingDayForm.value
    var datePipe = new DatePipe('en-US');
  let  date = datePipe.transform(form.workingDate,'yyyy-MM-dd');
  let branch=[]
form.branch.forEach(element => {
  let value={branch:element}
  branch.push(value)
});
let data = {
  nonworkingDate: date,
  dayHalf: form.dayFull,
  description: form.description,
  status: form.status,
  state: form.state,
  branch: branch
}

this._service.add(data, "addSpecialNonWorkDayMaster").subscribe((res)=>{
  if(res.respose=="Success"){
    Swal.fire({
  
      icon: 'success',
      title: 'Data Added Successfully',
      showConfirmButton: false,
      timer: 1500
    })
  
  const currentRoute = this.router.url;

  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]); 
  }); 
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
  }
}

edit(id){
  this.showMyContainer=true;
  this.update = true
 let url = "getSpecialNonWorkDayMaster/"+ id
 this.editId = id
 this._service.get(url).subscribe((res)=>{
  var datePipe = new DatePipe('en-US');
  let  date = datePipe.transform(res.nonworkingDate,'dd-MM-yyyy');
  this.workingDayForm.get('dayFull').setValue(res.dayHalf)
  this.workingDayForm.get('description').setValue(res.description)
  this.workingDayForm.get('status').setValue(res.status)
  this.workingDayForm.get('workingDate').setValue(date)
  this.workingDayForm.get('state').setValue(res.state)
  let branch = []
  res.branch.forEach(element => {
     
    branch.push(element.branch)
 
  });
  this.workingDayForm.get('branch').setValue(branch)

 })
}

datePipe = new DatePipe('en-US');

updateForm(){
  if(this.workingDayForm.valid){
    let form = this.workingDayForm.value
    var datePipe = new DatePipe('en-US');
  let  date = datePipe.transform(form.workingDate,'yyyy-MM-dd');
let employees = []
this.selection.selected.forEach(element => {
  employees.push(element.employeeId)
});
let branch=[]
form.branch.forEach(element => {
  let value={branch:element}
  branch.push(value)
});
let data = {
  nonworkingDate: date,
  dayHalf: form.dayFull,
  description: form.description,
  status: form.status,
  state: form.state,
  branch: branch
}

this._service.add(data, "updateSpecialNonWorkDayMaster/"+this.editId).subscribe((res)=>{
  if(res.respose=="Success"){
    Swal.fire({
  
      icon: 'success',
      title: 'Data Added Successfully',
      showConfirmButton: false,
      timer: 1500
    })
  // this.router.navigate(['/layout/masters/ProvidentFund'])
  const currentRoute = this.router.url;

  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]); 
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
  else{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      
    })
  }
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

      this._service.delete(id,'deleteSpecialNonWorkDayMaster').subscribe((res)=>{
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
cancel(){
  const currentRoute = this.router.url;

  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]); 
  });   
}
}
