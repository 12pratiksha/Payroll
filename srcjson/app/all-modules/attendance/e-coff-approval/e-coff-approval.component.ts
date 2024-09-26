import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AllModulesService } from '../../all-modules.service';
import Swal from 'sweetalert2';
import * as xlsx from 'xlsx';

@Component({
  selector: 'app-e-coff-approval',
  templateUrl: './e-coff-approval.component.html',
  styleUrls: ['./e-coff-approval.component.css']
})
export class ECoffApprovalComponent implements OnInit {
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  tableData: any;
  applicationListForm:FormGroup
  @ViewChild(DataTableDirective)
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  datatableElement: DataTableDirective;
  empId: string;
  eCoffData: any=[];
  eCoffDataForAdmin: any=[];
  constructor(public fb : FormBuilder, public _service:AllModulesService) { }

  ngOnInit(): void {
    this.getNotApprovalList();
    this.empId=localStorage.getItem('empid')
    
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
     
     xlsx.writeFile(wb, 'employeeCoffApplication.xlsx');
   }
   downloadAsPDF(sectionToPrint){
    const printContents = document.getElementById(sectionToPrint).innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print()
    document.body.innerHTML = originalContents;
  }
  

getNotApprovalList(){
  let userType=localStorage.getItem('type')
  if(usertype=='Admin' || usertype=='Super Admin'){
  this._service.get("getECoffApplicationListForAdminId").subscribe(res=>{
    console.log(res);
    this.eCoffDataForAdmin=res.data
  })

  }
  else{
  let empId=localStorage.getItem('empid')
  console.log(empId);
  let url="getNotApproveECoffApplicationList?empid="+empId
  this._service.get(url).subscribe(res=>{
    this.eCoffData=res
    console.log(res)
  })
}
}
approve(status,row){
  

  if(status==1){
    Swal.fire({
      title:"Do you really want approve leave..?",
      showCancelButton:true,
      confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Yes'
    }).then(result=>{
      console.log(result);
      if(result.isConfirmed==true)
      {
        let empId=localStorage.getItem('empid')
  let url="ApproveshortECoffApplicationListsByManagersAndHRs?status="+status+"&manageempId="+empId+"&ECoffApplicationId="+row.e_coff_application_id
  this._service.get(url).subscribe(res=>{
    console.log(res);
  })
      }
      else if(result.isConfirmed==false)
      {
        
        let userType=localStorage.getItem('type')
  if(usertype=='Admin' || usertype=='Super Admin'){
  this._service.get("getECoffApplicationListForAdminId").subscribe(res=>{
    console.log(res);
    this.eCoffDataForAdmin=res.data
  })

  }
  else{
  let empId=localStorage.getItem('empid')
  console.log(empId);
  let url="getNotApproveECoffApplicationList?empid="+empId
  this._service.get(url).subscribe(res=>{
    this.eCoffData=res
    console.log(res)
  })
}
      }
    })
      }
      else if(status==2){
        Swal.fire({
          title:"Are you really want reject leave..?",
          showCancelButton:true,
          confirmButtonColor: '#3085d6',
           cancelButtonColor: '#d33',
           confirmButtonText: 'Yes'
        }).then(result=>{
          console.log(result);
          if(result.isConfirmed==true)
          {
            let empId=localStorage.getItem('empid')
  let url="ApproveshortCoffBalanceListsByManagersAndHRs?status="+status+"&manageempId="+empId+"&CoffBalanceId="+row.coff_balance_id
  this._service.get(url).subscribe(res=>{
    console.log(res);
  })
          }
          else if(result.isConfirmed==false)
          {
            
            let userType=localStorage.getItem('type')
  if(usertype=='Admin' || usertype=='Super Admin'){
  this._service.get("getECoffApplicationListForAdminId").subscribe(res=>{
    console.log(res);
    this.eCoffDataForAdmin=res.data
  })

  }
  else{
  let empId=localStorage.getItem('empid')
  console.log(empId);
  let url="getNotApproveECoffApplicationList?empid="+empId
  this._service.get(url).subscribe(res=>{
    this.eCoffData=res
    console.log(res)
  })
}
          }
        })
      }
}


}
