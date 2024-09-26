import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AllModulesService } from '../../all-modules.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { environment } from 'src/environments/environment';
import { DataTableDirective } from 'angular-datatables';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-time-office-policy',
  templateUrl: './time-office-policy.component.html',
  styleUrls: ['./time-office-policy.component.css']
})
export class TimeOfficePolicyComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  selectedType:any;
  selectedOnType:any;
  tableData: any;
  loader = true;
  timeOfficeform:FormGroup
  services: any;
  message: string;
  employee: Object;
  loginData: string;
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

  minutes = [
    '00:00', '00:01', '00:02', '00:03', '00:04', '00:05', '00:06', '00:07', '00:08', '00:09', '00:10', '00:11', '00:12', '00:13', '00:14', '00:15', '00:16', '00:17', '00:18', '00:19', '00:20',
    '00:21', '00:22', '00:23', '00:24', '00:25', '00:26', '00:27', '00:28', '00:29', '00:30', '00:31', '00:32', '00:33', '00:34', '00:35', '00:36', '00:37', '00:38', '00:39', '00:40',
    '00:41', '00:42', '00:43', '00:44', '00:45', '00:46', '00:47', '00:48', '00:49', '00:50', '00:51', '00:52', '00:53', '00:54', '00:55', '00:56', '00:57', '00:58', '00:59', ]
  
  constructor(public fb: FormBuilder, public _service: AllModulesService, public router: Router,  private http: HttpClient) { }

  ngOnInit(): void {
    
    this.getTableData()
    this.getBranch();
    this.department();
    this.getAll();
    this.timeOfficeform = this.fb.group({
      lwlaslll:'',
      lateArrival:'',
      workingHoursStart:'',
      lhlaslll:'',
      earlyArrival:'',
      workingHourEnds:'',
      lalaslll:'',
      missPunchAbsent:'',
      deductOutWork:'',
      awaasaaa:'',
      misspunchhalf:'',
      duplicateCheckMinutes:'',
      ahaasaaa:'',
      showHw:'',
    })
    let id = this.selection.selected
    console.log(id)
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
      
      


  }

  getAll(){
let url='employee_master/getemployees'
this._service.get(url).subscribe((res)=>{
  
res.forEach(element => {
  // console.log(element)
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
  let brnc=''
  if(resultBranch.length>0){
     brnc=resultBranch[0].branchName
  }
  this.employee_display.push({"employeeId":element.employeeId,"employeeCode":element.employeeCode,"firstName":element.firstName,"lastName":element.lastName,"branch":brnc,"department":dept,"status":element.status})
})
this.employee  = this.employee_display;

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

  punchDisable(type){
    if(type == 'missPunchAbsent'){
      this.timeOfficeform.get('missPunchAbsent').setValue(false)
    }
else{
    this.timeOfficeform.get('misspunchhalf').setValue(false)
}
  }
  getTableData(){

    this._service.get("employee_master/getemployees").subscribe((data) => {
      this.tableData = data
      this.dataSource = new MatTableDataSource<any>(data);
      this.dataSource.paginator = this.paginator;
      this.loader = false
    },(error)=>{
      
      this.loader = false
      alert("Something Went Wrong")
  });
  
    
  }
 
submit(){
  let form = this.timeOfficeform.value
  console.log(this.selection.selected)
 if(this.selection.selected.length > 0){

    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
     })
     return
 }else{
//  let employees = []
//  let id=this.selection.selected;
//  id.forEach(element => {
//   console.log(element)
//   employees.push(element.employeeId)
//   console.log(employees)
//   });
  let data = {
    permissibleLateArrivalMinutes: form.lateArrival,
    permissibleEarlyDepartureMinutes: form.earlyArrival,
    markMisspunchAsHalfDay: form.misspunchhalf,
    showHWTotalHWOT: form.showHw,
    workingHoursStartWithShiftStartTime: form.workingHoursStart,
    deductOutWorkFromWorkingHours: form.deductOutWork,
    duplicateCheckMinutes: form.duplicateCheckMinutes,
    markLHLAsLLL: form.lhlaslll,
    markAWAAsAAA: form.awaasaaa,
    markLWLAsLLL: form.lwlaslll,
    markAHAAsAAA: form.ahaasaaa,
    markLALAsLLL: form.lalaslll,
  workingHoursEndWithShiftEndTime: form.workingHourEnds,
    markMissPunchAsAbsent: form.missPunchAbsent,
    employeeIds: this.selected
  }
  console.log(data)

  this._service.add(data, "addTimeOfficePolicyMaster").subscribe((res)=>{
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
}
cancel(){
  const currentRoute = this.router.url;
  
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]); // navigate to same route
  }); 
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

selected=[];
public selectRow(index: number, row:any) {
console.log(row)
 
  if(this.selected.includes(row.employeeId)){
    let index = this.selected.indexOf(row.employeeId)
    this.selected.splice(index, 1);
    console.log(this.selected)
  }
  else{
    this.selected.push(row.employeeId)
  }
 
 
}


ngOnDestroy(): void {
  this.dtTrigger.unsubscribe();
}

}
