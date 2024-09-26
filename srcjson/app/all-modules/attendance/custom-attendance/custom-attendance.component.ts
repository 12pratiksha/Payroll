import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { AllModulesService } from '../../all-modules.service';
import * as xlsx from 'xlsx';
  

@Component({
  selector: 'app-custom-attendance',
  templateUrl: './custom-attendance.component.html',
  styleUrls: ['./custom-attendance.component.css']
})
export class CustomAttendanceComponent implements OnInit {
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  employees: any;
  filterForm: FormGroup
  attendanceTable: any;
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  dtOptions: any = {};
  constructor(public _service: AllModulesService, public fb:FormBuilder, ) { }

  ngOnInit(): void {
    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 10,
    //   processing: true,
    //   dom: 'Bfrtip',
    //     buttons: [
    //         'copy', 'csv', 'excel', 'print'
    //     ]
    // };
this.getEmployees();
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
     
     xlsx.writeFile(wb, 'CustomeDailyAttendance(Normal).xlsx');
   }

   downloadAsPDF(sectionToPrint){
    const printContents = document.getElementById(sectionToPrint).innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print()
    document.body.innerHTML = originalContents;
  }
  getEmployees(){
    this._service.get("employee_master/getemployees").subscribe((data) => {
      this.employees = data;
      
  })
  }

  getAttendance(){
    var datePipe = new DatePipe('en-US');
    console.log(this.filterForm.value)
    console.log(this.filterForm.value.toDate)
    let fromDate = datePipe.transform(this.filterForm.value.fromDate,'yyyy-MM-dd');
    let toDate = datePipe.transform(this.filterForm.value.toDate,'yyyy-MM-dd');
   let data = {
    employeeNo:this.filterForm.value.employee,
    fromDate:fromDate,
    toDate:toDate
   }
   let url = 'getCustomDailyAttendenceList?toDate='+`${toDate}`+'&fromDate='+`${fromDate}`+'&employeeNo='+`${this.filterForm.value.employee}`
  // let url = 'getCustomDailyAttendenceList?toDate=2022-06-01&fromDate=2022-06-08&employeeNo=25'
  // getCustomDailyAttendenceList?toDate=2022-06-08&fromDate=2022-06-01&employeeNo=25
   this._service.get(url).subscribe((res)=>{
    this.attendanceTable= res
   })
  }

}
