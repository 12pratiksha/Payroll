import { StateComponent } from './../../employees/state/state.component';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AllModulesService } from '../../all-modules.service';
import * as xlsx from 'xlsx';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-e-sicmaster-report',
  templateUrl: './e-sicmaster-report.component.html',
  styleUrls: ['./e-sicmaster-report.component.css']
})
export class ESICMasterReportComponent implements OnInit {
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  filterForm:FormGroup;
    dtOptions: { pagingType: string; pageLength: number; processing: boolean; dom: string; buttons: string[]; };
    employees: any;
    state: any;
    category: any;
    department: any;
    branch: any;
    data: any;
  
  
    year = ["2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025"]
    months = [  { id: 'january', name: 'January' },
    { id: 'february', name: 'February' },
    { id: 'march', name: 'March ' },
    { id: 'april', name: 'April' },
    { id: 'may', name: 'May' },
    { id: 'june', name: 'June' },
    { id: 'july', name: 'July' },
    { id: 'august', name: 'August' },
    { id: 'september', name: 'September' },
    { id: 'october', name: 'October' },
    { id: 'november', name: 'November' },
    { id: 'december', name: 'December' },]
    companyName: string;
    address: string;
    
  fromd: any;
  tod: any;
    constructor(public fb:FormBuilder,public service:AllModulesService,public datePipe:DatePipe) { }
  
    ngOnInit(): void{ this.filterForm=this.fb.group({
      employeeId:[''],
      fromDate:['',Validators.required],
      toDate:['',Validators.required],
      branch:[''],
      category:[''],
      department:[''],
      state:[''],
      status:['']
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
  
  
    
    this.getEmployee();
    this.getState();
  }
  exportToExcel(){
      
    const ws: xlsx.WorkSheet =  xlsx.utils.table_to_sheet(this.epltable.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'PFRegisterReport.xlsx');
  }
  
  downloadAsPDF(sectionToPrint){
   const printContents = document.getElementById(sectionToPrint).innerHTML;
   const originalContents = document.body.innerHTML;
   document.body.innerHTML = printContents;
   window.print()
   document.body.innerHTML = originalContents;
  }
  
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
  // getCategory(){
  //   let url='categories/getCategories'
  //   this.service.get(url).subscribe((res)=>{
  //     this.category=res
  //   })
  // }
  // getDepartment(){
  //   let url='getAllDepartment'
  //   this.service.get(url).subscribe((res)=>{
  //     this.department=res
  //   })
  // }
  // getBranch(){
  //   let url='branch/getBranchList'
  //   this.service.get(url).subscribe((res)=>{
  //     this.branch=res
  //   })
  // }
  search(){
   this.companyName=localStorage.getItem('companyName')
   this.address=localStorage.getItem('address')
   
    let form=this.filterForm.value
    this.fromd=this.datePipe.transform(form.fromDate,"dd-MM-yyyy")
  this.tod=this.datePipe.transform(form.toDate,"dd-MM-yyyy")
  let fromd=this.datePipe.transform(form.fromDate,"yyyy-MM-dd")
  let tod=this.datePipe.transform(form.toDate,"yyyy-MM-dd")
  
    
    if(this.filterForm.status=='VALID'){
    let url='getESICMasterReport?fromDate='+fromd+'&toDate='+tod+'&state='+form.state
    this.service.get(url).subscribe((res)=>{
      this.data=res
      console.log(res)
    
    })
  }
  else{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: "Something went wrong",
    })
  }
  }

}
