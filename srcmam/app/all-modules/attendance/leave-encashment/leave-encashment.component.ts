import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { AllModulesService } from '../../all-modules.service';

@Component({
  selector: 'app-leave-encashment',
  templateUrl: './leave-encashment.component.html',
  styleUrls: ['./leave-encashment.component.css']
})
export class LeaveEncashmentComponent implements OnInit {
  leaveEncashmantFrom: FormGroup
  stateData: any;
  branch: any;
  categories: any;
  departments: any;
  employees: any;
  grade: any;
  leave: any;
  designation: any;
  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  message: string;
  loginData: any;
  employee: Object;
  employee_display: any=[];
  someClickHandler(info: any): void {
    this.message = info.id + ' - ' + info.firstName;
  }
  constructor(
    public _fb:FormBuilder, 
    public _service: AllModulesService, 
    public http: HttpClient, 
  ) { } 

  ngOnInit(): void {
    this.leaveEncashmantFrom = this._fb.group({
      state:'',
      branch:'',
      category:'',
      department:'',
      designation:'',
      searchBy:'',
      grade:'',
      leaveType:['',Validators.required],
      formula:['',Validators.required]

    })
 
    this.loginData = localStorage.getItem('LoginData');
    let headers = new HttpHeaders({ "Authorization": this.loginData});
    const that = this;
    this.dtOptions = {
      select: {
        info: true,
        style: 'multiple'
      },
      searching:false,
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


this.getState();
this.getBranchList();
this.getCategories();
this.getDepartment();
this.getAllEmployee();
this.getGrade();
this.getLeave();
this.getDesignation()
  }

  ngAfterViewInit(): void {
    this.dtTrigger.subscribe(() => {
      this.datatableElement.dtInstance.then((dtInstance) => {
        dtInstance.columns().every(function () {
          const that = this;
          // $('input', this.footer()).on('keyup change', function () {
          //   if (that.search() !== this['value']) {
          //     that
          //       .search(this['value'])
          //       .draw();
          //   }
          // });
        });
      });
    });
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
  getAllEmployee(){
    this._service.get("employee_master/getemployees").subscribe((data) => {
      this.employees = data;
      data.forEach(element => {
        let department=element.department
        let branch=element.branch
        let result =this.departments.filter((dept: any) =>
              (dept.departmentId==department) )
              let resultBranch =this.branch.filter((brch: any) =>
              (brch.id==branch) )
        this.employee_display.push({"employeeId":element.employeeId,"employeeCode":element.employeeCode,"firstName":element.firstName,"lastName":element.lastName,"branch":resultBranch[0].branchName,"department":result[0].departmentName,"status":element.status})
          
        })
        this.employee = this.employee_display
      })
    }
  
    // department() {
    //   this._service.get('getAllDepartment').subscribe((res) => {
    //     this.departments = res
    //   })
    // }
  
    // getBranch(){
  
    //   this._service.get('branch/getBranchList')
    //   .subscribe((res)=>{
      
    //   this.branchList = res
      
    //   })
      
    //   }
      
      
  
  
  getGrade(){


    this._service.get('getgetCodeByType?type='+'grade')
    .subscribe((res)=>{
      this.grade=res

  
    })
    
      }
  getLeave(){
    this._service.get('getgetCodeByType?type=Leave Code').subscribe((res)=>{
      this.leave = res
    })
  }
  getDesignation(){
    this._service.get('getAllDesignationMaster').subscribe((res)=>{
      this.designation = res
    })
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
  findEmployees(){
    let form = this.leaveEncashmantFrom.value
    let url = "getLeaveEncashment?state="+form.state+"&branch="+form.branch+ "&category="+form.category+"&Department="+form.department+"&Designation="+form.designation+"&employeeCode="+form.searchBy+"&Grade="+ form.grade
    this._service.get(url).subscribe((res)=>{
      this.employees = res
    })
  }
  encash(){
   if(this.leaveEncashmantFrom.valid && this.selected.length > 0){
   let employees = []
   this.selected.forEach((element)=>{
   employees.push({employeeIds:element})
   })
   let data = {
    leaveType: this.leaveEncashmantFrom.value.leaveType,
    formula: this.leaveEncashmantFrom.value.formula,
   
    employeeIds: this.selected
}
this._service.add(data, "insertLeaveEncashment").subscribe((res)=>{
  if(res.respose=='Success'){
    Swal.fire({
     
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    })
        }
       else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Select Atleast One Employee',
          
        })
       }
})
   }
   else if(this.selected.length < 1){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Select Atleast One Employee',
      
    })
   }
   else
   {
    this.leaveEncashmantFrom.markAllAsTouched()
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
