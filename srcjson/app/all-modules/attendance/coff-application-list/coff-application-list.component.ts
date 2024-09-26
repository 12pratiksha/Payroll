import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import * as xlsx from 'xlsx';

@Component({
  selector: 'app-coff-application-list',
  templateUrl: './coff-application-list.component.html',
  styleUrls: ['./coff-application-list.component.css']
})
export class CoffApplicationListComponent implements OnInit {
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  tableData: any;
  applicationListForm:FormGroup
  @ViewChild(DataTableDirective)
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  datatableElement: DataTableDirective;
  constructor(public fb : FormBuilder) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
    
    };
    this.applicationListForm = this.fb.group({
       fromDate:'',
       toDate:''
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
     
     xlsx.writeFile(wb, 'salarySheet.xlsx');
   }
   downloadAsPDF(sectionToPrint){
    const printContents = document.getElementById(sectionToPrint).innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print()
    document.body.innerHTML = originalContents;
  }

}
