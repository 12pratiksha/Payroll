import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Route, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { AllModulesService } from '../../all-modules.service';

@Component({
  selector: 'app-ot-adjustment-assign',
  templateUrl: './ot-adjustment-assign.component.html',
  styleUrls: ['./ot-adjustment-assign.component.css']
})
export class OtAdjustmentAssignComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  tableData: any;
  loginData: string;
  message: string;
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
  employees = [];
  otPlans: any;
  otForm: FormGroup;
  minDate: Date;
  loader = true;
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

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

 
  checkboxLabel(row?): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
  constructor(public _service:AllModulesService, public fb: FormBuilder, private http: HttpClient, public router: Router) { }

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
this.getAllPlan();
this.getBranch();
this.department();
this.getAll()

this.otForm = this.fb.group({
  otPlan:['',Validators.required],
  fromDate:['',Validators.required],
  toDate:['',Validators.required]
})
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
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.loader = false
    },(error)=>{
    
      this.loader = false
      console.log(error)
      alert("Something Went Wrong")
});
  
    
  }

getAllPlan(){
  this._service.get('OTDepartureMaster/getAllOTDepature').subscribe((res)=>{
    console.log(res)
    this.otPlans=res
  })
}
applyPlan(){

if(this.otForm.status == "VALID" && this.selected.length != 0){


    let form=this.otForm.value
    var datePipe = new DatePipe('en-US');
    let fromDate = form.fromDate
    fromDate = datePipe.transform(fromDate,'yyyy-MM-dd')
 
    this.minDate = new Date(fromDate);
    let toDate = form.toDate 
    toDate = datePipe.transform(toDate,'yyyy-MM-dd')
  
    let employees = this.selection.selected;

  
    let employeeID = [];
    employees.forEach(element => {
      employeeID.push(element.employeeId)
     
    });
    
    let data = {
      fromDate: fromDate,
      toDate: toDate,
      otPlanId:form.otPlan,
      employeeIds: this.selected,
      employeeId: " ",
      status: "",
      workFlowSetUpId: " "
    }
 
  let url = "addOTAdjustmentAssign"
  this._service.add(data,url).subscribe((res)=>{
    if (res.respose == "Success"){
    this.otForm.reset();
  
      this.selection.clear()
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
  console.log(url)
 
  
}
else {this.otForm.markAllAsTouched();
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
