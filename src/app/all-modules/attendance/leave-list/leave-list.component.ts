import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AllModulesService } from '../../all-modules.service';
import { DatePipe } from '@angular/common';
import * as xlsx from 'xlsx';

@Component({
  selector: 'app-leave-list',
  templateUrl: './leave-list.component.html',
  styleUrls: ['./leave-list.component.css']
})
export class LeaveListComponent implements OnInit {
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  filterForm: FormGroup
  leaveData: any;
  constructor(public fb:FormBuilder,public _service: AllModulesService) { }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      employee:['',],
      fromDate:['',],
      toDate:['',]
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
     
     xlsx.writeFile(wb, 'leaveApplication.xlsx');
   }
   downloadAsPDF(sectionToPrint){
    const printContents = document.getElementById(sectionToPrint).innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print()
    document.body.innerHTML = originalContents;
  }
  getLeaveList(){
    let id=localStorage.getItem('empid')
    let form = this.filterForm.value
    
  let params = new HttpParams();
  var datePipe = new DatePipe('en-US');
  console.log(this.filterForm.value)
  console.log(this.filterForm.value.toDate)
  let fromDate = datePipe.transform(this.filterForm.value.fromDate,'yyyy-MM-dd');
  let toDate = datePipe.transform(this.filterForm.value.toDate,'yyyy-MM-dd');
params = params.append('fromDate', fromDate);
params = params.append('toDate', toDate);
params = params.append('adminId', id);
let url ='getLeaveApprovalListByFormToDateForAmdin?fromDate='+`${fromDate}`+'&toDate='+`${toDate}`+'&adminId='+`${id}`

this._service.get(url).subscribe((res)=>{
  console.log(res)
  this.leaveData=res
})
  }
}
