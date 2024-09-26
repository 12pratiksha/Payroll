import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { AllModulesService } from '../../all-modules.service';
import * as xlsx from 'xlsx';

@Component({
  selector: 'app-time-office-policy-list',
  templateUrl: './time-office-policy-list.component.html',
  styleUrls: ['./time-office-policy-list.component.css']
})
export class TimeOfficePolicyListComponent implements OnInit {
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  dtOptions: any = {};
  tableData: any;
  constructor(public _fb:FormBuilder, public _service:AllModulesService, public router: Router) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
     
    };
    this.getTableData();
  }

getTableData(){
  this._service.get("getAllTimeOfficePolicyMaster").subscribe((res)=>{
this.tableData = res
  })
}
exportToExcel(){
  // const arr = [
  //  [{RevisedSumInsured:'', RepairType: '',IndictiveRenewalPremium:'',CustCode:''}],
  // ];
 
 // const sheetName = ["sheet1"];
   const ws: xlsx.WorkSheet =  xlsx.utils.table_to_sheet(this.epltable.nativeElement);
   const wb: xlsx.WorkBook = xlsx.utils.book_new();
   xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
  //  for (var i = 0; i < sheetName.length; i++) {
  //    const ws: xlsx.WorkSheet = xlsx.utils.json_to_sheet(arr[i]);
  //    xlsx.utils.book_append_sheet(wb, ws, sheetName[i]);
  //  }
   // ws['!cols'][11] = { hidden: false};
   
   xlsx.writeFile(wb, 'timeOfficePolicy.xlsx');
 }
 downloadAsPDF(sectionToPrint){
  const printContents = document.getElementById(sectionToPrint).innerHTML;
  const originalContents = document.body.innerHTML;
  document.body.innerHTML = printContents;
  window.print()
  document.body.innerHTML = originalContents;
}

}
