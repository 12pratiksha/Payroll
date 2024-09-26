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
  constructor(public service : AllModulesService, public _activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    const routeParam = this._activatedroute.snapshot.params;
    this.type = routeParam.type;
    this.loadEmployee();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
     
    };

  }

  



  loadEmployee() {
console.log(this.type)
    this.service.get("employee_master/getemployees").subscribe((data) => {


  if(this.type == 'total'){
    this.lstEmployee = data
  }
  else{
    let list = []
    for (let i = 0; i < data.length; i++){
      if(data[i].status == this.type){
    list.push(data[i])
      }
      this.lstEmployee = list
  }

}

},(error)=>{
  console.log(error)
    });
  }



}
