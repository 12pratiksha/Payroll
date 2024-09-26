import { Component, OnInit, ViewChild} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { AllModulesService } from '../../all-modules.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}




@Component({
  selector: 'app-early-departure-plan-assign',
  templateUrl: './early-departure-plan-assign.component.html',
  styleUrls: ['./early-departure-plan-assign.component.css']
})
export class EarlyDeparturePlanAssignComponent implements OnInit {
  planDeductionForm: FormGroup;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  getEarlyDeductionPlan: any;
  tableData: any;
  loader = true
  employee: any;
  loginData: any;
  message: string;
  departments: any;
  branchList: any;
  employee_display: any=[];
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  displayedColumns: string[] = ['select', 'id', 'name', 'branch', 'department', 'status'];
  dataSource = new MatTableDataSource();
  selection = new SelectionModel(true, []);
  employees = [];
  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;
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
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
constructor(public _service: AllModulesService, public fb: FormBuilder, private http: HttpClient, public router: Router) { }

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
            // that.employee = resp;
            this.dtTrigger.next();
           
          });
      
      




this.getTableData();
this.getEarlyDeduction()
this.getBranch();
this.department();
this.getAll()

this.planDeductionForm = this.fb.group({
  deductionPlan:['',Validators.required],
  effectiveDate:['',Validators.required]
})
console.log(this.planDeductionForm)
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
  let url='employee_master/getemployees'
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

getEarlyDeduction(){

this._service.get('earlyDepartureMaster/getAllEarlyDepature').subscribe((res)=>{
  console.log(res)
  this.getEarlyDeductionPlan = res
})

}
today = new Date()

applyPlan(){
  console.log('effectiveDate')
  var datePipe = new DatePipe('en-US');
let Date = this.planDeductionForm.value.effectiveDate
let effectiveDate = datePipe.transform(Date, 'yyyy-MM-dd');
// console.log(effectiveDate)
if (this.planDeductionForm.status == "VALID" && this.selected.length != 0){


  // let data = this.selection.selected
 
  // data.forEach((res)=>{
  //  this.employees.push(res.employeeId)
   
  // })
  let today = datePipe.transform(this.today, 'yyyy-MM-dd');

  let data = {
    earlyDepartureplanName:this.planDeductionForm.value.deductionPlan,
    effectiveDate:effectiveDate,
    employeeIds:this.selected,
    isStatus: "true"
  }
this._service.add(data,"addearlyDepartureAssignList").subscribe((res)=>{
  if (res.respose == "Success"){
    this.selection.clear();
    this.planDeductionForm.reset()
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
else{
this.planDeductionForm.markAllAsTouched();
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
