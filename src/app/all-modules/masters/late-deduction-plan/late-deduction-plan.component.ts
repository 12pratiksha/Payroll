import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AllModulesService } from '../../all-modules.service';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import {MatPaginator} from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import * as xlsx from 'xlsx';


@Component({
  selector: 'app-late-deduction-plan',
  templateUrl: './late-deduction-plan.component.html',
  styleUrls: ['./late-deduction-plan.component.css']
})
export class LateDeductionPlanComponent implements OnInit {
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  loginData: string;
  message: string;
  employee: any;
  departments: any;
  branchList: any;
  employee_display: any=[];
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  today = new Date()
  displayedColumns: string[] = ['select', 'id', 'name', 'branch', 'department','status'];
  dataSource = new MatTableDataSource();
  selection = new SelectionModel(true, []);
  employeeTable: any;
  departureList: any;
  deductionPlanForm:FormGroup;
  tableData: any;
  tableLen: any; 
  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;
  // dtOptions: DataTables.Settings = {};
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  someClickHandler(info: any): void {
    this.message = info.id + ' - ' + info.firstName;
  }
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

  

  constructor(public srvModuleService:AllModulesService, public fb:FormBuilder, private http: HttpClient, public router: Router) { }

  ngOnInit(): void {

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
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        $('td', row).off('click');
        $('td', row).on('click', () => {
          self.someClickHandler(row);
        });
        return row;
      }
    };
    that.http
    .get(environment.apiEndpoint+'employee_master/getemployees', {headers:headers})
    .subscribe(resp => {
      that.employee = resp;
      this.dtTrigger.next();
     
    });

    this.getEmployee();
  this.getDepartureList();

this.getBranch();
this.department();
this.deductionPlanForm = this.fb.group({
  deductionPlan:['',Validators.required],
  effectiveDate:['',Validators.required]
})

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


  ngAfterViewInit(): void {
    this.dtTrigger.subscribe(() => {
      this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
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


  exportToExcel(){
    // const arr = [
    //  [{RevisedSumInsured:'', RepairType: '',IndictiveRenewalPremium:'',CustCode:''}],
    // ];
   
   // const sheetName = ["sheet1"];
     const ws: xlsx.WorkSheet =  xlsx.utils.table_to_sheet(this.epltable.nativeElement);
     const wb: xlsx.WorkBook = xlsx.utils.book_new();
     xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    //  for (var i = 0; i < sheetName.length; i++) {
    //    const ws: xlsx.WorkSheet = xlsx.utils.json_to_sheet(arr[i]);
    //    xlsx.utils.book_append_sheet(wb, ws, sheetName[i]);
    //  }
     // ws['!cols'][11] = { hidden: false};
     
     xlsx.writeFile(wb, 'timeOfficePolicy.xlsx');
   }
   downloadAsPDF(sectionToPrint){
    const printContents = document.getElementById(sectionToPrint).innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print()
    document.body.innerHTML = originalContents;
  }


  // loader = true
getEmployee(){

  this.srvModuleService.get("employee_master/getemployees").subscribe((data) => {
    console.log(data)
    data.forEach(element => {
      let department=element.department
      let branch=element.branch
    
      let result =this.departments.filter((dept: any) =>
            (dept.departmentId==department) )
      let dept='';
      if(result.length>0){
        dept=result[0].departmentName
      }
      let resultBranch =this.branchList.filter((brch: any) =>
          (brch.id==branch) )
      let brnc='';
      if(resultBranch.length>0){
        brnc=resultBranch[0].branchName
      }
      this.employee_display.push({"employeeId":element.employeeId,"employeeCode":element.employeeCode,"firstName":element.firstName,"lastName":element.lastName,"branch":brnc,"department":dept,"status":element.status})
    })
   
    
    this.tableData = this.employee_display
    this.tableLen = data.length
    this.dataSource = new MatTableDataSource<any>(this.tableData);

     this.dataSource.paginator = this.paginator;
//  this.loader = false
  },(error)=>{
    
    // this.loader = false
    console.log(error)
    alert("Something Went Wrong")
});

}
// checkValue(){
//  console.log(this.isChecked)
// }

department() {
  this.srvModuleService.get('getAllDepartment').subscribe((res) => {
    this.departments = res
  })
}

getBranch(){

  this.srvModuleService.get('branch/getBranchList')
  .subscribe((res)=>{
  
  this.branchList = res
  
  })
  
  }

getDepartureList(){
  this.srvModuleService.get('getAllLateDepature').subscribe((res)=>{
    this.departureList = res
    console.log(res)
  })
}

  // checkthis(empid, event){
  // console.log(event.target.checked);
  // console.log(empid);
  // if(event.target.checked){


  // }

  // }

  applyPlan(){
  if(this.deductionPlanForm.status == "VALID" && this.selection.selected.length != 0){
    


    let form = this.deductionPlanForm.value
    var datePipe = new DatePipe('en-US');
 
 
  let   assignDate = datePipe.transform(form.effectiveDate, 'yyyy-MM-dd');
  let today = datePipe.transform(this.today, 'yyyy-MM-dd');
let selectedItem = this.selection.selected

let selectedId=[];
selectedItem.forEach(element => {
  selectedId.push(element.employeeId)
});
// let data={
//   selectedId
// }
console.log(selectedId)
let data = {

    lateDeductionPlanName:form.deductionPlan,
	
	
    effectiveDate:assignDate,
	
    employeeids:selectedId
}
this.srvModuleService.add( data, "addLateDeductionPlanAssign").subscribe((res)=>{
 if (res.respose == "Success"){
  this.getDepartureList();
  this.deductionPlanForm.reset();
  // this.selection.clear()
    Swal.fire({
     
      icon: 'success',
      title: 'Plan Assigned successfully',
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

  else if(this.selection.selected.length == 0 && this.deductionPlanForm.valid){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'No employee Selected',
      
    })
  }
  else{
    this.deductionPlanForm.markAllAsTouched();
    
  Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: 'Something went wrong!',


})
return
  }
  }
  ngOnDestroy(): void {
 
    this.dtTrigger.unsubscribe();
  }
  private extractData(res: any) {
    const body = res.json();
    return body.data || {};
  }
  
}
