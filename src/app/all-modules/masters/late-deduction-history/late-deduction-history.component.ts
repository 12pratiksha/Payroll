import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AllModulesService } from '../../all-modules.service';
import * as xlsx from 'xlsx';

@Component({
  selector: 'app-late-deduction-history',
  templateUrl: './late-deduction-history.component.html',
  styleUrls: ['./late-deduction-history.component.css']
})
export class LateDeductionHistoryComponent implements OnInit {
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  dtOptions: any = {};
  tableData: any;
  
    
    
  constructor(public _service:AllModulesService) { }

  ngOnInit(): void {
    this.lateHistory()
    this.dtOptions = {

      pagingType: 'full_numbers',
      pageLength: 10,
    }
  }
  loader = true
lateHistory(){
  this._service.get('getLateDeductionPlanAssign').subscribe((res)=>{
    this.tableData = res
    this.loader = false
  },(error)=>{
    
    this.loader = false
    console.log(error)
    alert("Something Went Wrong")
}
)
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
   
   xlsx.writeFile(wb, 'lateDeductionPlanHistory.xlsx');
 }
 downloadAsPDF(sectionToPrint){
  const printContents = document.getElementById(sectionToPrint).innerHTML;
  const originalContents = document.body.innerHTML;
  document.body.innerHTML = printContents;
  window.print()
  document.body.innerHTML = originalContents;
}
  
}
