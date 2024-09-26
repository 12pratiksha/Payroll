import { Component, OnInit, ViewChild } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import { AllModulesService } from '../../all-modules.service';
import { MatPaginator } from '@angular/material/paginator';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  // {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  // {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  // {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  // {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  // {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  // {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  // {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  // {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  // {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];






@Component({
  selector: 'app-leave-approval-list',
  templateUrl: './leave-approval-list.component.html',
  styleUrls: ['./leave-approval-list.component.css']
})
export class LeaveApprovalListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  leaveData: any;
  employees: any;

  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;
  
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  message: string;
  employee: any;
  loginData: string;
  tableData: Object;
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  someClickHandler(info: any): void {
    this.message = info.id + ' - ' + info.firstName;
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
  constructor(public _service:AllModulesService, private http: HttpClient) { }

  ngOnInit(): void {
    this.getLeaveApplications();
   this.getEmployees();

   
   this.loginData = localStorage.getItem('LoginData');
   let headers = new HttpHeaders({ "Authorization": this.loginData});
   this.dtOptions = {
    select: {
      info: true,
      style: 'multiple'
    },
    pagingType: 'full_numbers',
    pageLength: 25,
    processing: true,
   
  };
  const that = this;
     that.http
        .get(environment.apiEndpoint+'LeaveApplication/getAllLeaveApplication', {headers:headers})
        .subscribe(resp => {
          that.tableData = resp;
          this.dtTrigger.next();
         
        });
    

  }

  assign(){

    console.log(this.selection.selected)
  }
  approveSeleted(){

  }
  rejectSeleted(){
    
  }
  
  ngAfterViewInit(): void {
    // this.dtTrigger.subscribe(() => {
    //   this.datatableElement.dtInstance.then((dtInstance) => {
    //     dtInstance.columns().every(function () {
    //       const that = this;
    //       $('input', this.footer()).on('keyup change', function () {
    //         if (that.search() !== this['value']) {
    //           that
    //             .search(this['value'])
    //             .draw();
    //         }
    //       });
    //     });
    //   });
    // });
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

  getLeaveApplications(){


    this._service.get('LeaveApplication/getAllLeaveApplication').subscribe((res)=>{
    
    this.leaveData = res
     
    this.dataSource = new MatTableDataSource(this.leaveData);
    this.dataSource.paginator=this.paginator
    },(error)=>{
    
    
      alert("Something Went Wrong")
}
)
    
    }
    

    getEmployees(){

      this._service.get("employee_master/getemployees").subscribe((data) => {
        this.employees = data;
        
        
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
