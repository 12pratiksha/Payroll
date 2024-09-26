import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AllModulesService } from '../../all-modules.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-assign-employee-shift',
  templateUrl: './assign-employee-shift.component.html',
  styleUrls: ['./assign-employee-shift.component.css']
})
export class AssignEmployeeShiftComponent implements OnInit {
  shiftAssignForm: FormGroup;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  selectedType:any;
  selectedOnType:any;
  tableData: any;
  loader = true
  services: any;
  employees = [];
  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;
  // dtOptions: DataTables.Settings = {};
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  loginData: string;
  employee: Object;
  departments: any;
  branchList: any;
  employee_display: any=[];
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
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  constructor(public fb: FormBuilder, public _service: AllModulesService, public router: Router,  private http: HttpClient) { }

  ngOnInit(): void {
    this.getBranch();
    this.department();
    this.getTableData();
    this.getAll();
    this.shiftAssignForm = this.fb.group({
  effectiveDate:['',Validators.required],
  type:['', Validators.required],
  on:[''],
  date:['',],
  defaultShift:['', Validators.required],
  defaultDays:[''],
  firstShift:[''],
  firstShiftDays:[''],
  secondShift:[''],
  secondShiftDays:[''],
})

this.loginData = localStorage.getItem('LoginData');
let headers = new HttpHeaders({ "Authorization": this.loginData});

const that = this;
this.dtOptions = {
  select: {
    info: true,
    style: 'multiple'
  },
  pagingType: 'full_numbers',
  pageLength: 5,
  processing: true,
  
};
    //  that.http
    //     .get(environment.apiEndpoint+'employee_master/getemployees', {headers:headers})
    //     .subscribe(resp => {
    //       // that.employee = resp;
    //       this.dtTrigger.next();
        
    //     });
  
  

this. getShifts();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.subscribe(() => {
      this.datatableElement.dtInstance.then((dtInstance) => {
        dtInstance.columns().every(function () {
          const that = this;
          $('input', this.footer()).on('keyup change', function () {
            if (that.search() !== this['value']) {
              that
                .search(this['value'])
                .draw();
            }
          });
        });
      });
    });
  }
  
  getAll(){
    let url='getAllActiveEmployees'
    this._service.get(url).subscribe((res)=>{
  res.forEach(element => {
  let department=element.department
  let branch=element.branch
  let result =this.departments.filter((dept: any) =>
        (dept.departmentId==department) )

        let resultBranch =this.branchList.filter((brch: any) =>
        (brch.id==branch) )
  this.employee_display.push({"employeeId":element.employeeId,"employeeCode":element.employeeCode,"firstName":element.firstName,"lastName":element.lastName,"branch":resultBranch[0].branchName,"department":result[0].departmentName,"status":element.status})
    
  })
  this.employee = this.employee_display
  this.dtTrigger.next();
  console.log(this.employee)
  })
  }

  
  
  department() {
    this._service.get('getAllDepartment').subscribe((res) => {
      this.departments = res
    })
  }
  
  getBranch(){
  
    this._service.get('branch/getBranchList')
    .subscribe((res)=>{
    
    this.branchList = res
    
    })
    
    }
  getTableData(){

    this._service.get("employee_master/getemployees").subscribe((data) => {
      console.log(data)
      this.tableData = data
      this.dataSource = new MatTableDataSource<any>(data);
      this.dataSource.paginator = this.paginator;
      this.loader = false
    },(error)=>{
      
      this.loader = false
      console.log(error)
      alert("Something Went Wrong")
  });
  
    
  }
  submit(){
    // console.log(this.selection.selected)
   
    // let employee =[]
    // for (let i = 0; i < this.selected.length; i++){
    // employee.push({employeeId:this.selection.selected[i].employeeId})
    // }
    if(this.shiftAssignForm.valid && this.selected.length != 0){
      let form = this.shiftAssignForm.value
   
      var datePipe = new DatePipe('en-US');
      let date = datePipe.transform(form.date, 'yyyy-MM-dd');
      let effectiveDate = datePipe.transform(form.effectiveDate, 'yyyy-MM-dd');
     let data = {
      type: form.type,
      effectiveDate: effectiveDate,
      date: date,
      onShift: form.on, 
      defaultShift: form.defaultShift,
      firstShift:form.firstShift,
      secondShift: form.secondShift,
      daySlot1: form.defaultDays,
      daySlot2: form.firstShiftDays,
      daySlot3: form.secondShiftDays,
      status: "true",
      employeeIds: this.selected,
     }
     console.log(data)
 this._service.add(data, "addEmployeeAssignShiftList").subscribe((res)=>{
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
      this.shiftAssignForm.markAllAsTouched()
    }

  }


  selected=[];
  public selectRow(index: number, row:any) {
  
   
    if(this.selected.includes(row.employeeId)){
      let index = this.selected.indexOf(row.employeeId)
      this.selected.splice(index, 1);
      console.log(this.selected)
    }
    else{
      this.selected.push(row.employeeId)
      console.log(this.selected)
    }
   
   
  }


  getShifts(){
this._service.get("shifts/getAllShift").subscribe((res)=>{
  this.services = res;
})
  }
  cancel(){
    const currentRoute = this.router.url;

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentRoute]); // navigate to same route
    }); 
  }
  ngOnDestroy(): void {
 
    this.dtTrigger.unsubscribe();
  }
  private extractData(res: any) {
    const body = res.json();
    return body.data || {};
  }
  

}
