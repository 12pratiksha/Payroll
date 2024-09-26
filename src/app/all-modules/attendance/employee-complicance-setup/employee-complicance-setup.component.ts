import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import {Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { AllModulesService } from '../../all-modules.service';

@Component({
  selector: 'app-employee-complicance-setup',
  templateUrl: './employee-complicance-setup.component.html',
  styleUrls: ['./employee-complicance-setup.component.css']
})
export class EmployeeComplicanceSetupComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  loginData: string;
  message: string;
  employee: Object;

  employees = [];
  loader = true;
  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  departments: any;
  branchList: any;
  employee_display: any=[];
  someClickHandler(info: any): void {
    this.message = info.id + ' - ' + info.firstName;
  }
  
  
  constructor(public _service:AllModulesService, public fb: FormBuilder, private http: HttpClient, public router: Router) { }

  ngOnInit(): void {
    this.getBranch();
    this.department();
    this.getAll();
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
            
            this.loader = false
            this.dtTrigger.next();
           
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
            let dept="";
            if(result.length>0){
               dept = result[0].departmentName;
            }
            
      this.employee_display.push({"employeeId":element.employeeId,"employeeCode":element.employeeCode,"firstName":element.firstName,"lastName":element.lastName,"branch":resultBranch[0].branchName,"department":dept,"status":element.status})
        
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



ngOnDestroy(): void {
 
  this.dtTrigger.unsubscribe();
}
private extractData(res: any) {
  const body = res.json();
  return body.data || {};
}

}
