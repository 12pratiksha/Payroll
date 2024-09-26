import { Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AllModulesService } from '../../all-modules.service';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-run-payroll',
  templateUrl: './run-payroll.component.html',
  styleUrls: ['./run-payroll.component.css']
})
export class RunPayrollComponent implements OnInit {
  payrollForm:FormGroup
  tableData: any;
  tableLen: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  stateData: any;
  branch: any;
  categories: any;
  departments: any;
  employees;
  employee=[];
  type: number;
  subDepartments: any;
  designations: any;
  grade: any;
  showContainer:boolean=false;
  year = ["2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025"]
  months = [  { id: 'january', name: 'January' },
  { id: 'february', name: 'February' },
  { id: 'march', name: 'March ' },
  { id: 'april', name: 'April' },
  { id: 'may', name: 'May' },
  { id: 'june', name: 'June' },
  { id: 'july', name: 'July' },
  { id: 'august', name: 'August' },
  { id: 'september', name: 'September' },
  { id: 'october', name: 'October' },
  { id: 'november', name: 'November' },
  { id: 'december', name: 'December' },
]
  salary = [ 
    {value:1, key: 'Processed'}, {value:0, key:'Unprocessed'}]
  array: any=[];
  employee1: any;
  selected: any;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  displayedColumns: string[] = ['select', 'id', 'name', 'days', 'present', 'leave', 'holiday', 'absent', 'processed', 'addition', 'deduction', 'netSalary', 'status'];
  dataSource = new MatTableDataSource();
  selection = new SelectionModel(true, []);

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data?.length;
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

  
  constructor(public _fb:FormBuilder, public _service:AllModulesService) { }

  ngOnInit(): void {
this.payrollForm=this._fb.group({
 
  state:'',
  branch:'',
  category:'',
  department:'',
  subDepartment:'',
  designation:'',
  searchBy:'',
  grade:'',
  status:'1',
  id:'',
  name:'',
  year:['',Validators.required],
  month:['',Validators.required],
})
//this.getEmployee();
this.getState();
this.getBranchList();
this.getCategories();
this.getDepartment();
this.getAllEmployee();
//this.getTableData();

this._service.get('subDepartment/getSubDepartments').subscribe((res)=>{
  this.subDepartments=res
    })
    this._service.get('getAllDesignationMaster').subscribe((data) => {
      this.designations = data;
      console.log(this.designations);
      
    });
    this._service.get('getgetCodeByType?type=grade').subscribe((res)=>{
      this.grade = res
    })
  }

  getEmployee(){
let url = "getPayrollListses?year&month&state&category&subCategory&status&employeeId&department&subDepartment&branch"
    this._service.get(url).subscribe((data) => {
       console.log(data)
      this.tableData = data.data
      this.tableLen = data?.length
      this.dataSource = new MatTableDataSource<any>(this.tableData);
  
       this.dataSource.paginator = this.paginator;
  
    });
  
  }
  search(){
let branchStatus=localStorage.getItem('branchStatus')
let branchId=localStorage.getItem('branchId')
   // this.showContainer=true;
    Swal.fire({
      title: 'Loading...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading()
      }
    });
 if (this.payrollForm.status=='VALID'){
  
  let form=this.payrollForm.value
  var datePipe = new DatePipe('en-US');
  let fromDate = datePipe.transform(form.fromDate, 'yyyy-MM-dd');
  let toDate = datePipe.transform(form.toDate, 'yyyy-MM-dd');

  console.log(form.searchBy)
let url=''
if(this.payrollForm.value.searchBy && branchStatus=='true' && form.branch==''){
  let emp=this.payrollForm.value.searchBy.split(" ");
  let emply=this.employees.filter((emply)=>
  (emply.employeeCode == emp[0]))
  console.log(emply)
  //  let url = "getBulkAttendenceList?fromDate="+`${fromDate}`+"&toDate="+`${toDate}`+"&state="+`${form.state}`+"&subCategory&status="+`${form.status}`+"&employeeNo&category"+`${form.category}`+"&department"
  // let url = "getPayrollListses?year="+`${fromDate}`+"&month="+`${toDate}`+"&state="+`${form.state}`+"&subCategory&status="+`${form.status}`+"&employeeNo="+`${form.id}`+"&category="+`${form.category}`+"&department="+`${form.department}`+"&branch="+`${form.branch}`
   url = "getPayrollListses?year="+`${form.year}`+"&month="+`${form.month}`+"&state="+`${form.state}`+"&category="+`${form.category}`+"&subCategory&status="+`${form.status}`+"&employeeId="+`${emply[0].employeeId}`+"&department="+`${form.department}`+"&subDepartment="+`${form.subDepartment}`+"&branch="+`${branchId}`
}
else if(this.payrollForm.value.searchBy && branchStatus=='true' && form.branch!=''){
  let emp=this.payrollForm.value.searchBy.split(" ");
  let emply=this.employees.filter((emply)=>
  (emply.employeeCode == emp[0]))
  console.log(emply)
    url = "getPayrollListses?year="+`${form.year}`+"&month="+`${form.month}`+"&state="+`${form.state}`+"&category="+`${form.category}`+"&subCategory&status="+`${form.status}`+"&employeeId="+`${emply[0].employeeId}`+"&department="+`${form.department}`+"&subDepartment="+`${form.subDepartment}`+"&branch="+`${form.branch}`
}
else if(this.payrollForm.value.searchBy==undefined && branchStatus=='false'){
   url = "getPayrollListses?year="+`${form.year}`+"&month="+`${form.month}`+"&state="+`${form.state}`+"&category="+`${form.category}`+"&subCategory&status="+`${form.status}`+"&employeeId="+`${''}`+"&department="+`${form.department}`+"&subDepartment="+`${form.subDepartment}`+"&branch="+`${form.branch}`
}
else if(this.payrollForm.value.searchBy==undefined && branchStatus=='true' && form.branch==''){
  url = "getPayrollListses?year="+`${form.year}`+"&month="+`${form.month}`+"&state="+`${form.state}`+"&category="+`${form.category}`+"&subCategory&status="+`${form.status}`+"&employeeId="+`${''}`+"&department="+`${form.department}`+"&subDepartment="+`${form.subDepartment}`+"&branch="+`${branchId}`
}
else if(this.payrollForm.value.searchBy==undefined && branchStatus=='true' && form.branch!=''){
  url = "getPayrollListses?year="+`${form.year}`+"&month="+`${form.month}`+"&state="+`${form.state}`+"&category="+`${form.category}`+"&subCategory&status="+`${form.status}`+"&employeeId="+`${''}`+"&department="+`${form.department}`+"&subDepartment="+`${form.subDepartment}`+"&branch="+`${form.branch}`
}
else {
  url = "getPayrollListses?year="+`${form.year}`+"&month="+`${form.month}`+"&state="+`${form.state}`+"&category="+`${form.category}`+"&subCategory&status="+`${form.status}`+"&employeeId="+`${''}`+"&department="+`${form.department}`+"&subDepartment="+`${form.subDepartment}`+"&branch="+`${form.branch}`
}
  this._service.get(url).subscribe((data)=>{
  console.log(data.data)

  if(data!=null ){
    Swal.fire({
      allowEscapeKey: false,
      allowOutsideClick: false,
      showConfirmButton:false,
      timer: 1,
      didOpen: () => {
        Swal.hideLoading()
      }
        });
  }
  this.tableData = data.data
  this.tableLen = data.length
  this.dataSource = new MatTableDataSource<any>(this.tableData);
  this.dataSource.paginator = this.paginator;
})
 }
 else{
  this.payrollForm.markAllAsTouched();
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Something went wrong!',
    didOpen: () => {
      Swal.hideLoading()
    }
  })
  
 }

  }

  getState(){

    this._service.get( "state/getStateList").subscribe((data) => {
      this.stateData = data;
      // console.log(data);
    });

  }
  getBranchList(){


    this._service.get('branch/getBranchList')
    .subscribe((res)=>{
    
    
    this.branch = res
    // console.log(this.branch)
    
    })
    
  }

  getCategories(){

    this._service.get('categories/getCategories').subscribe((res)=>{
      this.categories=res
    })
    
  }
  getDepartment(){
    this._service.get('getAllDepartment').subscribe((res)=>{
    this.departments = res
    })
  }

  attendanceExtraction(){
 Swal.fire({
    title: 'Are you sure?',
    text: "You Want To Process The Attendance For Selected Employees! (Attendance Extraction Process)",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, Process it!'
  }).then((result) => {
    if (result.isConfirmed) {
      // Swal.fire(
      //   'Deleted!',
      //   'Your file has been deleted.',
      //   'success'
      // )
    }
  })
  }

  processSalary(){
  
    let form=this.payrollForm.value
    var datePipe = new DatePipe('en-US');
 
    
    Swal.fire({
      title: 'Are you sure?',
      text: "You Want To Process The Salary For Selected Employees! (Attendance Process)",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Process it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // Swal.fire(
        //   'Deleted!',
        //   'Your file has been deleted.',
        //   'success'
        // )
        let employee = [];
        let id = this.selection.selected
        console.log(id)
        id.forEach((employees)=>{
          employee.push(employees.employeeId)
         
         })
         let  type =  "ProcessPayRollList"
         this._service.add(employee, type).subscribe((res)=>{
          if(res.respose=='successs'){
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Salary Processed Successfully!',
              
            })
          }
          else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: res.message,
              
            }) 
          }
           
         })
      
      }
    
    })
  }
  reset(){
    this.payrollForm.reset();
  }
  getAllEmployee(){
    this._service.get("employee_master/getemployees").subscribe((data) => {
      this.employees = data;
      
      
    });
  }

  getTableData(){
    this._service.get('getPayrollListses?year=&month=September&state&category&subCategory&status&employeeId=&department&subDepartment&branch')
    .subscribe((res)=>{
      console.log(res)
    })
  }

  getEmpList(event){
 
    console.log(event)
    
    this.array.push(event)
    console.log(this.array)
    let form=this.payrollForm.value
    if(this.array.length >=2){
  
    let url='employees/search?employeeName='+`${form.searchBy.toLowerCase()}`
    this._service.get(url).subscribe((res)=>{
      this.employee1=res.data
    })
  }
  }
  
  
  
  displayEmp(data,name,last){
  console.log(data,name,last)
  this.selected=[data] +" "+ name +" "+ last; 
  }
}
