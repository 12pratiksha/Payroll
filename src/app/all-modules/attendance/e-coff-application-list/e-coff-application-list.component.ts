import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AllModulesService } from '../../all-modules.service';
import * as xlsx from 'xlsx';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-e-coff-application-list',
  templateUrl: './e-coff-application-list.component.html',
  styleUrls: ['./e-coff-application-list.component.css']
})
export class ECoffApplicationListComponent implements OnInit {
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  tableData: any;
  applicationListForm:FormGroup
  @ViewChild(DataTableDirective)
 
  dtTrigger: Subject<any> = new Subject();
  datatableElement: DataTableDirective;
  datePipe = new DatePipe('en-US');
  approvedData: any;
  pendingData: any;
  rejectedData: any;
  SelfData: any=[];
  dataForAdmin: any;
  dtOptions: { pagingType: string; pageLength: number; processing: boolean; dom: string; buttons: string[]; };
  self: any=[];
  userType: any;
  rpStatus: any;
  constructor(
    public fb : FormBuilder,
    public service : AllModulesService,
    public router:Router
    ) { }

  ngOnInit(): void {


    this.applicationListForm = this.fb.group({
       fromDate:['',Validators.required],
       toDate:['',Validators.required]
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
    //this.getSelfTableData();
   this.getApprovedTableData();
   this.getDataForAdmin();
 this.userType=localStorage.getItem('type')
 this.rpStatus=localStorage.getItem('rpStatus');

   // this.getRejectedTableData();
  }


getTableData(){
 let form = this.applicationListForm.value
 let fromDate = this.datePipe.transform(form.fromDate, 'yyyy-MM-dd');
 let toDate = this.datePipe.transform(form.toDate, 'yyyy-MM-dd');
 if(this.applicationListForm.status=='VALID'){
let url = `getCoffBalanceListByDate?fromDate=${fromDate}&toDate=${toDate}`
  this.service.get(url).subscribe((res)=>{
    this.tableData = res
  })
}
else{
  Swal.fire({
    icon:'error',
    title:'Oops',
    text:'Something went wrong!'
  })
}
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

getApprovedTableData(){
  let id=localStorage.getItem('empid')
  let url="getNotApproveECoffApplicationListForRM1AndRM2?empid="+id
  this.service.get(url).subscribe((res)=>{
    this.approvedData=res
    console.log(this.approvedData)
  })
}


getSelfTableData(){
  let id=localStorage.getItem('empid')
  console.log(id)
  let url="getCoffApplicationByempId/"+id
  this.service.get(url).subscribe((res)=>{
  this.self=res.data
  this.self.forEach(elememt=>{
      this.SelfData.push(elememt.ecoffDetials[0])
    })
   
    console.log(this.SelfData)
  })
}

// getRejectedTableData(){
//   let url=""
//   this.service.get(url).subscribe((res)=>{
//     this.rejectedData=res
//   })
// }

approve1(empid,item){
  console.log(empid,item)
  
    Swal.fire({
      title:"Do you really want to approve leave..?",
      showCancelButton:true,
      confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Yes'
    }).then(result=>{
      console.log(result);
      if(result.isConfirmed==true)
      {
        let id = localStorage.getItem('empid')
        let url="ApproveshortECoffApplicationListsByManagersAndHRs?status="+1+"&manageempId="+id+"&eCoffDetialsId="+item.ecoffDetialsId
        this.service.get(url).subscribe(res=>{
        console.log(res)
        if(res.respose=='Success')
            {
              Swal.fire({
                icon: 'success',
               // title: '',
                text: 'Leave has been Approved',
               
              })
              const currentRoute = this.router.url;

  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]); // navigate to same route
  }); 
            }
            else{
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                
              })
            }
   
  })
      }
    })
}
getDataForAdmin(){
  let id=localStorage.getItem('empid')
  console.log(id) 
  let url='getNotApproveECoffApplicationListForRM1AndRM2?empid='+id
  this.service.get(url).subscribe((res)=>{
this.dataForAdmin=res
console.log(this.dataForAdmin)
  })
}
}



