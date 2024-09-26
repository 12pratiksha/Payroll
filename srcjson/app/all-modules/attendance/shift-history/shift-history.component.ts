import { Component, OnInit } from '@angular/core';
import { AllModulesService } from '../../all-modules.service';

@Component({
  selector: 'app-shift-history',
  templateUrl: './shift-history.component.html',
  styleUrls: ['./shift-history.component.css']
})
export class ShiftHistoryComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  shiftDetails: any;
  loader = true
  constructor(public _service: AllModulesService) { }

  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      
       
    };
    this.getTableData();
  }

  getTableData(){
    this._service.get('getAllEmployeeAssignShiftList').subscribe((res)=>{
    this.shiftDetails = res
    this.loader = false
    })
  }

}
