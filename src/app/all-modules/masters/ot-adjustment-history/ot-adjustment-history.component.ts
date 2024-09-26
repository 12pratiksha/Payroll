import { Component, OnInit } from '@angular/core';
import { AllModulesService } from '../../all-modules.service';

@Component({
  selector: 'app-ot-adjustment-history',
  templateUrl: './ot-adjustment-history.component.html',
  styleUrls: ['./ot-adjustment-history.component.css']
})
export class OtAdjustmentHistoryComponent implements OnInit {
  public data = [
    {name: 'test', email: 'test@gmail.com', website:'test.com'},
    {name: 'test', email: 'test@gmail.com', website:'test.com'},
    {name: 'test', email: 'test@gmail.com', website:'test.com'},
    {name: 'test', email: 'test@gmail.com', website:'test.com'},
];
loader = true
dtOptions: any = {};
  tableData: any;
  constructor(public _service:AllModulesService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'print'
        ]
    };
    this.getOtHistory();
  }

getOtHistory(){
  this._service.get("getOTAdjustmentAssignList").subscribe((res)=>{
    console.log(res)
    this.tableData = res
    this.loader = false
  },(error)=>{
    
    this.loader = false
    console.log(error)
    alert("Something Went Wrong")
})
}
}
