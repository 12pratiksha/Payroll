import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AllModulesService } from '../../all-modules.service';
import { DatePipe } from '@angular/common';
import * as xlsx from 'xlsx';



@Component({
  selector: 'app-monthly-attendance-summery-report',
  templateUrl: './monthly-attendance-summery-report.component.html',
  styleUrls: ['./monthly-attendance-summery-report.component.css']
})
export class MonthlyAttendanceSummeryReportComponent implements OnInit {
@ViewChild('epltable', { static: false }) epltable: ElementRef;
filterForm:FormGroup;
  employees: any;
  state: any;
  category: any;
  department: any;
  branch: any;
  data: any;
  dtOptions: { pagingType: string; pageLength: number; processing: boolean; dom: string; buttons: string[]; };
  companyName: string;
  address: string;
  fomd: string;
  tod: string;
  imageName: string;
  constructor(public fb:FormBuilder,public service:AllModulesService,public datePipe:DatePipe) { }

  ngOnInit(): void {
    this.filterForm=this.fb.group({
      employeeId:[''],
      fromDate:['',Validators.required],
      toDate:['',Validators.required],
      state:[''],
      category:[''],
      department:[''],
      branch:[''],
      status:[''],
    })
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'Bfrtip',
      buttons: [
            'copy', 'csv', 'excel', 'print'
        ]
    };
    this.getCategory();
    this.getDepartment();
    this.getEmployee();
    this.getState();
    this.getBranch();
    this.getCompanyDetails();
  }
  exportToExcel(){
    
    const ws: xlsx.WorkSheet =  xlsx.utils.table_to_sheet(this.epltable.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'MonthlyAttendanceSummaryReport.xlsx');
  }
  
  downloadAsPDF(sectionToPrint){
   const printContents = document.getElementById(sectionToPrint).innerHTML;
   const originalContents = document.body.innerHTML;
   document.body.innerHTML = printContents;
   window.print()
   document.body.innerHTML = originalContents;
  }

  // exportToExcel(){
    
  //    const ws: xlsx.WorkSheet =  xlsx.utils.table_to_sheet(this.epltable.nativeElement);
  //    const wb: xlsx.WorkBook = xlsx.utils.book_new();
  //    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
  //    xlsx.writeFile(wb, 'DailyAttendanceReport.xlsx');
  //  }

  //  downloadAsPDF(sectionToPrint){
  //   const printContents = document.getElementById(sectionToPrint).innerHTML;
  //   const originalContents = document.body.innerHTML;
  //   document.body.innerHTML = printContents;
  //   window.print()
  //   document.body.innerHTML = originalContents;
  //  }

getEmployee(){
  let url='employee_master/getemployees'
  this.service.get(url).subscribe((res)=>{
    this.employees=res
  })
}
getState(){
  let url='state/getStateList'
  this.service.get(url).subscribe((res)=>{
    this.state=res
  })
}
getCategory(){
  let url='categories/getCategories'
  this.service.get(url).subscribe((res)=>{
    this.category=res
  })
}
getDepartment(){
  let url='getAllDepartment'
  this.service.get(url).subscribe((res)=>{
    this.department=res
  })
}
getBranch(){
  let url='branch/getBranchList'
  this.service.get(url).subscribe((res)=>{
    this.branch=res
  })
}
search(){
  this.companyName=localStorage.getItem('companyName')
  this.address=localStorage.getItem('address')
  let form=this.filterForm.value
  let fromd=this.datePipe.transform(form.fromDate,"yyyy-MM-dd")
  let tod=this.datePipe.transform(form.toDate,"yyyy-MM-dd")
  this.fomd=this.datePipe.transform(form.fromDate,"dd/MM/yyyy")
  this.tod=this.datePipe.transform(form.toDate,"dd/MM/yyyy")
  let url='MonthlyAttendanceSummaryReport?fromDate='+fromd+'&toDate='+tod+'&state='+form.state+'&status='+form.status+'&employeeNo='+form.employeeId+'&category='+form.category+'&department='+form.department+'&branch='+form.branch
  this.service.get(url).subscribe((res)=>{
    this.data=res;
    console.log(this.data)
  })
}

getCompanyDetails(){
  let url="getAllCompanyInformationList"
  this.service.get(url).subscribe((res)=>{
    console.log(res)
   
      this.imageName=res[0].backImageName+""+res[0].logoImageName
    
    console.log(this.imageName)
  })
}
}


