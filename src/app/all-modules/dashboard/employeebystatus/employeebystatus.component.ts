import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AllModulesService } from '../../all-modules.service';

@Component({
  selector: 'app-employeebystatus',
  templateUrl: './employeebystatus.component.html',
  styleUrls: ['./employeebystatus.component.css']
})
export class EmployeebystatusComponent implements OnInit {
  tableData: any;
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  dtOptions: any = {};
  lstEmployee: any;
  type: any;
  departments: any;
  designations: any;
  employee_display: any=[];
  constructor(public service : AllModulesService, public _activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    const routeParam = this._activatedroute.snapshot.params;
    this.type = routeParam.type;
    this.department();
    this.designation();
    this.loadEmployee();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
     
    };
    
  }

  department(){
    this.service.get('getAllDepartment').subscribe((res)=>{
    this.departments=res
    })
  }
  designation(){
    this.service.get('getAllDesignationMaster').subscribe((res)=>{
    this.designations=res
    })
  }
  



   async loadEmployee() {
console.log(this.type)
    await this.service.get("employee_master/getemployees").subscribe((data) => {


  if(this.type == 'total'){
    data.forEach((element)=>{
    let department = element.department
    let designation = element.designation
    let image = element.imageName
   
    let result =this.departments.filter((dept: any) =>
    (dept.departmentId==department) )
    let resultdesg =this.designations.filter((desg: any) =>
    (desg.designationMasterId==designation) )
   
    let dept="";
    if(result.length>0){
       dept = result[0].departmentName;
    }

    this.employee_display.push({ "employeeId": element.employeeId, "firstName": element.firstName, "middleName": element.middleName, "lastName": element.lastName, "employeeCode": element.employeeCode, "department": dept, "designation": resultdesg[0].name, imageName: image, "status": element.status })

  });
  this.lstEmployee  = this.employee_display;
    // this.lstEmployee = data
  }
  else{
    let list = []
    for (let i = 0; i < data.length; i++){
      if(data[i].status == this.type){
    list.push(data[i])
      }
      list.forEach((element)=>{
        let department = element.department
        let designation = element.designation
        let image = element.imageName
       
        let result =this.departments.filter((dept: any) =>
        (dept.departmentId==department) )
        let resultdesg =this.designations.filter((desg: any) =>
        (desg.designationMasterId==designation) )
       
        let dept="";
        if(result.length>0){
           dept = result[0].departmentName;
        }
    
        this.employee_display.push({ "employeeId": element.employeeId, "firstName": element.firstName, "middleName": element.middleName, "lastName": element.lastName, "employeeCode": element.employeeCode, "department": dept, "designation": resultdesg[0].name, imageName: image, "status": element.status })
    
      });
      console.log(list)
      this.lstEmployee = this.employee_display
  }

}

},(error)=>{
  console.log(error)
    });
  }



}
