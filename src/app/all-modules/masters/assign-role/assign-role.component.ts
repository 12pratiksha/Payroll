import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { AllModulesService } from '../../all-modules.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-assign-role',
  templateUrl: './assign-role.component.html',
  styleUrls: ['./assign-role.component.css']
})
export class AssignRoleComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  tableData: any;
  roles: any;

  employees = [];
  
  roleForm: FormGroup;
  loginData: string;
  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  message: string;
  employee: Object;
  roleData:any= [];
  state: any;
  department: any;
  employee_display: any=[];
  branch: any;
  tableLen: any;
  ids: any=[];
  someClickHandler(info: any): void {
    this.message = info.id + ' - ' + info.firstName;
  }
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
  checkboxLabel(row): string {
    if (!row) {

      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }


  constructor(
    public _fb:FormBuilder,
    public _service: AllModulesService,
    private http: HttpClient, 
    public router: Router
  ) { }

  ngOnInit(): void {
    this.roleForm = this._fb.group({
      role: ['', Validators.required],
      type: ['', Validators.required]
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
            //this.dtTrigger.next();
           
          });
   this.getRoles()
   this.getState();
   this.getBranch();
   this.getDepartment();
   this.getEmployee();
   
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
  getState(){
    this._service.get("state/getStateList").subscribe((res)=>{
     this.state = res
    })
  }
  getDepartment(){
    this._service.get('getAllDepartment').subscribe((res)=>{
      this.department=res
    })
  }

  getBranch(){

   
    this._service.get('branch/getBranchList')
    .subscribe((res)=>{
     
      let branch = []
      res.forEach(element => {
       
        let branches={id:element.id, name:element.branchName}
        branch.push(branches)
      
      this.branch=branch

      });
  
    })
    
      }

getEmployee(){
  let url="employee_master/getemployees"
  this._service.get(url).subscribe((res)=>{
    res.forEach(element => {

      // console.log(element)
      let branchRes=this.branch.filter((bran:any)=>
      (bran.id==element.branch))
      let brch='';
      if(branchRes.length>0){
        brch=branchRes[0].name
      }
      // console.log(branchRes)

      let deptRes=this.department.filter((dept:any)=>
      (dept.departmentId==element.department))
      let dept='';
      if(deptRes.length>0){
        dept=deptRes[0].departmentName
      }
      
this.employee_display.push({"employeeCode":element.employeeCode,"employeeId":element.employeeId,"firstName":element.firstName,"lastName":element.lastName,"branch":brch,"department":dept,"status":element.status})

    });;
    // this.employee=this.employee_display
    this.tableLen = this.employee_display
      this.dataSource = new MatTableDataSource<any>(this.employee_display);
  
       this.dataSource.paginator = this.paginator;
    // this.dtTrigger.next();
    // console.log(this.employee)
    
  })
}
  getRoles(){
    this._service.get('getAllRoleMaster').subscribe((res)=>{
     //this.roleData = res
      //console.log(res);
     this.roleData = res
      console.log(this.roleData[0].roleMasterId)
     
     },(error)=>{
       

       console.log(error)
       alert("Something Went Wrong")
   })
  }

  onChange(event){
   let url = "getfindByRoleType?roleType="+`${event}`
  this._service.get(url).subscribe((res)=>{
    this.roles =  res
    console.log(this.roles)
  })
  }
  // selection = new SelectionModel(true, []);
  applyPlan(){
    this.selection.selected.forEach(row => {
     
      this.ids.push(row.employeeId)
      console.log(this.ids);
    })
    console.log(this.roleForm.status+">>>>>>")
  if (this.roleForm.status == "VALID" && this.selection.selected.length != 0){
    console.log("<<<<<1");
  let form = this.roleForm.value
    let data = {
      roleType: form.role,
        roleName: form.type,
        roleMasterId:form.type,
        employeeIds: this.ids
    }
    console.log("<<<<<2"+data);

  this._service.add(data,"addRoleAssign").subscribe((res)=>{
    console.log(res);
    let resp=JSON.parse(JSON.stringify(res));
    if (resp.respose == "Success"){
      this.selection.clear();
      this.roleForm.reset()
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
  this.roleForm.markAllAsTouched();
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Something went wrong!',
    
  })
  return
  }
  } 


}
