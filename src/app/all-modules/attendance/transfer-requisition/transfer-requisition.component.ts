import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AllModulesService } from '../../all-modules.service';
import { DataTableDirective } from 'angular-datatables';
@Component({
  selector: 'app-transfer-requisition',
  templateUrl: './transfer-requisition.component.html',
  styleUrls: ['./transfer-requisition.component.css']
})
export class TransferRequisitionComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  dtOptions: any = {};
  tableData;
  loader = false
  constructor(public _service: AllModulesService, public router:Router) { }

  ngOnInit(): void {
    this.getData();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
     
      
    };
  
  }

  getData(){
    this._service.get("getAlltransferRequisitionMaster").subscribe((res)=>{
      this.tableData = res
      this.loader = false
    },(error)=>{
    
      this.loader = false
      console.log(error)
      alert("Something Went Wrong")
}
)
  }
  form(type){
    if (type == 'submit'){
      this.router.navigate(['layout/attendance&leave/transferRequisitionForm/'+'add'])
    }
  }
}
