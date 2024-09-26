import { Component, OnInit } from '@angular/core';
import { AllModulesService } from '../../all-modules.service';

@Component({
  selector: 'app-early-departure-plan-history',
  templateUrl: './early-departure-plan-history.component.html',
  styleUrls: ['./early-departure-plan-history.component.css']
})
export class EarlyDeparturePlanHistoryComponent implements OnInit {
  public dtOptions: DataTables.Settings = {};
  earlyHistory: any;
  loader = true
  constructor(public _service: AllModulesService) { }

  ngOnInit(): void {
this.getEarlyHistory();
this.dtOptions = {
  pagingType: 'full_numbers',
  pageLength: 5,
  processing: true,
  dom: 'Bfrtip',
//   buttons: [
//     'copy', 'csv', 'excel', 'print'
// ]
};
  }

getEarlyHistory(){
  this._service.get('getEmployeeEarlyDeductionPlanAssign').subscribe((res)=>{
    this.earlyHistory = res
    this.loader = false;
  },(error)=>{
    
    this.loader = false
    console.log(error)
    alert("Something Went Wrong")
})
}

}
