import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AllModulesService } from '../../all-modules.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { format } from 'date-fns';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-special-working-day-update',
  templateUrl: './special-working-day-update.component.html',
  styleUrls: ['./special-working-day-update.component.css']
})
export class SpecialWorkingDayUpdateComponent implements OnInit {
  // editId: any;


  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // displayedColumns: string[] = ['select', 'id', 'name', 'branch', 'department','status'];
  // dataSource = new MatTableDataSource();
  // selection = new SelectionModel(true, []);
  // officeTimeForm:FormGroup
  // states: any = [];
  // branch: any = [];
  // loader = true;
  // tableData: any;
  // grade: any;
  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }
  // employees = [];
  // isAllSelected() {
  //   const numSelected = this.selection.selected.length;
  //   const numRows = this.dataSource.data.length;
  //   return numSelected === numRows;
  // }

  // /** Selects all rows if they are not all selected; otherwise clear selection. */
  // masterToggle() {
  //   if (this.isAllSelected()) {
  //     this.selection.clear();
  //     return;
  //   }

  //   this.selection.select(...this.dataSource.data);
  // }

  // /** The label for the checkbox on the passed row */
  // checkboxLabel(row?: PeriodicElement): string {
  //   if (!row) {
  //     return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
  //   }
  //   return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  // }
  constructor(public fb: FormBuilder, public _service: AllModulesService,
     public router: Router,
     public _activatedroute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    // const routeParam = this._activatedroute.snapshot.params;
    // this.editId = routeParam.id;

    // this.officeTimeForm = this.fb.group({
    //   workingDate: ["",Validators.required],
    //   state: ["",Validators.required],
    //   branch: ["",Validators.required],
    //   description: "",
    //   status:'',
    //   grade:''
    // })

    // this.getState();
    // this.getBranchList();
    // this.getTableData();
    // this.getEditData();
    // this.getGrade()
  }

//   getEditData(){
//   let url = "getSpecialWorkDayMaster/" + this.editId
//  this._service.get(url).subscribe((res)=>{
  
//  }) 
// }
// cancel(){
//   const currentRoute = this.router.url;

//   this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
//       this.router.navigate([currentRoute]); 
//   }); 
// }

// getGrade(){
//   this._service.get('getgetCodeByType?type=grade').subscribe((res)=>{
//     this.grade = res
//   })
// }

//   getState(){
//     this._service.get("state/getStateList").subscribe((res)=>{
//     this.states = res;
//    console.log(res)
//     })
//   } 
//   getBranchList(){

   
//     this._service.get('branch/getBranchList')
//     .subscribe((res)=>{
//     this.branch = res

//     })
    
//    } 
//    getTableData(){
//     let url = "getAllEmployeesBySBG?state=MH&branch=Pune"
//     this._service.add([], url).subscribe((data) => {
//       console.log(data)
//       this.tableData = data
//       this.dataSource = new MatTableDataSource<any>(data);
//       this.dataSource.paginator = this.paginator;
//       this.loader = false
//     },(error)=>{
      
//       this.loader = false
//       console.log(error)
     
//   });
  
    
//   }
//   submit(){
//  if (this.officeTimeForm.valid && this.selection.selected.length > 0){
//   let form = this.officeTimeForm.value
//   var datePipe = new DatePipe('en-US');
//   let  date = datePipe.transform(form.workingDate,'yyyy-MM-dd');
 
//   let url = "addSpecialWorkDayMaster?workingDate="+date+"&dayHalf=HalfDay&description="+form.description+"&status="+form.status
//   this._service.add(this.selection.selected, url).subscribe((res)=>{
//     if(res.respose=="Success"){
//       Swal.fire({
    
//         icon: 'success',
//         title: 'Data Added Successfully',
//         showConfirmButton: false,
//         timer: 1500
//       })
//     // this.router.navigate(['/layout/masters/ProvidentFund'])
//     const currentRoute = this.router.url;

//     this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
//         this.router.navigate([currentRoute]); 
//     }); 
//     }
   
//     else{
//       Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: 'Something went wrong!',
        
//       })
//     }

//   })
//  }
//  else{
//   Swal.fire({
//     icon: 'error',
//     title: 'Oops...',
//     text: 'Something went wrong!',
    
//   })
//   this.officeTimeForm.markAllAsTouched();
// }  
// }
// onChange(){
//   let form = this.officeTimeForm.value
//   let url = "getAllEmployeesBySBG?state="+form.state+"&branch="+form.branch
//   this._service.get(url).subscribe((data) => {
//     console.log(data)
//     this.tableData = data
//     this.dataSource = new MatTableDataSource<any>(data);
//     this.dataSource.paginator = this.paginator;
//     this.loader = false
//   },(error)=>{
      
//     this.loader = false
//     console.log(error)
  
// });

 
// }
}