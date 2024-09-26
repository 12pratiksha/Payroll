import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators,} from '@angular/forms';
import { AllModulesService } from '../../all-modules.service';
import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-apf',
  templateUrl: './apf.component.html',
  styleUrls: ['./apf.component.css']
})
export class ApfComponent implements OnInit {
  applybulkForm:FormGroup;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  stateData: any;
  branch: any;
  categories: any;
  departments: any;
  subDepartments: any;
  designations: any;
  grade: any;
  tableData: any;
  employee=[];
  tableLen: any;
  td:any=[];

  employees: any;


  salary = [ 
    {value:1, key: 'Processed'}, {value:0, key:'Unprocessed'}]
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  displayedColumns: string[] = ['select','id', 'name','employeeId','aadhaarCardNo','emergMobileNo','status'];
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
  checkboxLabel(row): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
  
  constructor(public fb:FormBuilder,public _service:AllModulesService) {}

 

  ngOnInit(): void {
    // this.applybulkForm.value.lockUnlock
    this.applybulkForm=this.fb.group({
 
      state:'',
      branch:'',
      category:'',
      department:'',
      subDepartment:'',
      designation:'',
      searchBy:'',
      grade:'',
      status:'true',
      //id:'',
      // name:'',
      // year:['',Validators.required],
      // month:['',Validators.required],
      lockUnlock:['']
    })

    this.getState();
    this.getBranchList();
    this.getCategories();
    this.getDepartment();
    this.getAllEmployee();
   

    this._service.get('subDepartment/getSubDepartments').subscribe((res)=>{
      this.subDepartments=res
        })
        this._service.get('getAllDesignationMaster').subscribe((data) => {
          this.designations = data;
          console.log(data);
          
        });
        this._service.get('getgetCodeByType?type=grade').subscribe((res)=>{
          this.grade = res
        })
  }

  getEmployee(){
   let f=this.applybulkForm.value 
    let url = "getEmployeeBySCSS?state="+f.state+"&category="+f.category+"&subCategory&status="+f.status+"&employeeId="+f.searchBy+"&department="+f.department+"&subDepartment="+f.subDepartment+"&brach="+f.branch
        this._service.get(url).subscribe((data) => {
          this.tableData = data
          this.tableLen = data.length
          console.log(this.tableData);

          this.dataSource = new MatTableDataSource<any>(this.tableData);
      console.log(this.dataSource.data.length)
           this.dataSource.paginator = this.paginator;
      
        });
      
      }
res:any;
  search(){
    if (this.applybulkForm.status=='VALID'){
      this.getEmployee();

  //    let form=this.applybulkForm.value
  //    var datePipe = new DatePipe('en-US');
  //  let fromDate = datePipe.transform(form.fromDate, 'yyyy-MM-dd');
  //  let toDate = datePipe.transform(form.toDate, 'yyyy-MM-dd');
   
  //  //console.log(form.searchBy)
  //  //  let url = "getBulkAttendenceList?fromDate="+`${fromDate}`+"&toDate="+`${toDate}`+"&state="+`${form.state}`+"&subCategory&status="+`${form.status}`+"&employeeNo&category"+`${form.category}`+"&department"
  //  // let url = "getPayrollListses?year="+`${fromDate}`+"&month="+`${toDate}`+"&state="+`${form.state}`+"&subCategory&status="+`${form.status}`+"&employeeNo="+`${form.id}`+"&category="+`${form.category}`+"&department="+`${form.department}`+"&branch="+`${form.branch}`
  //  let url = "getEmployeeBySCSS?state="+`${form.state}`+"&category="+`${form.category}`+"&employeeId="+`${form.searchBy}`+"&department="+`${form.department}`+"&subDepartment="+`${form.subDepartment}`+"&branch="+`${form.branch}`+"&grade="+`${form.grade}`+"designation="+`${form.designation}`
  //  this._service.get(url).subscribe((data)=>{
  //   this.res=data;
  //   this.td=data;
  //   console.log(this.td);
   
  //   console.log(this.td[0].employeeCode);
  //  this.tableData = data.data
  //  this.tableLen = data.length
  //  this.dataSource = new MatTableDataSource<any>(this.tableData);
   
  //  this.dataSource.paginator = this.paginator;
  //  })
  //   }
  //   else{
  //    this.applybulkForm.markAllAsTouched();
  //    Swal.fire({
  //      icon: 'error',
  //      title: 'Oops...',
  //      text: 'Something went wrong!',
       
  //    })
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

  processSalary(){
  
    let form=this.applybulkForm.value
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
         console.log(this.applybulkForm.value,)
         let data = {
        
          "lockUnlock": this.applybulkForm.value.lockUnlock,
          "employeeIds": [
              90632,
              90634
          ]
          
        }
         let  type =  "BulkPFAssignToEmployees"
         this._service.add(data, type).subscribe((res)=>{
          console.log(res);
           
         })
      
      }
    
    })
  }

  getAllEmployee(){
    this._service.get("employee_master/getemployees").subscribe((data) => {
      this.employees = data;
      console.log(data)

      
      
    });
  }

  getTableData(){
    this._service.get('getEmployeeBySCSS?state&category&subCategory&status&employeeId=&department&subDepartment&branch')
    .subscribe((res)=>{
      console.log(res)
    })
  }


}
