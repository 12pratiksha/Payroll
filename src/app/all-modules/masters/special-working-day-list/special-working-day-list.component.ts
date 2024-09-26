import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AllModulesService } from '../../all-modules.service';

@Component({
  selector: 'app-special-working-day-list',
  templateUrl: './special-working-day-list.component.html',
  styleUrls: ['./special-working-day-list.component.css']
})
export class SpecialWorkingDayListComponent implements OnInit {
  tableData: any;

  constructor(public fb: FormBuilder, public _service: AllModulesService, public router: Router) { }

  ngOnInit(): void {
    this.getTableData();
  }
getTableData(){
  this._service.get("getAllSpecialWorkDayMaster").subscribe((res)=>{
this.tableData = res
  })
}
edit(id){
  this.router.navigate(['/layout/masters/specialWorkingDayUpdate/'+id])
}
}
