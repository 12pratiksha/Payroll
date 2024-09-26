import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2';
import { AllModulesService } from '../../all-modules.service';

@Component({
  selector: 'app-provident-fund-table',
  templateUrl: './provident-fund-table.component.html',
  styleUrls: ['./provident-fund-table.component.css']
})
export class ProvidentFundTableComponent implements OnInit {
  tableData: any;
  
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  dtOptions: any = {};
  loader = true
  states: any;
  tableData_display: any=[];
  constructor(
    public _service: AllModulesService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getState();
  this.getTableData();
  
  this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 10,
    processing: true,
    dom: 'Bfrtip',
      buttons: [
          'copy', 'csv', 'excel', 'print'
      ]
  };
  }
add(type){
this.router.navigate(['/layout/masters/ProvidentFund/'+type])
}
getState(){
  this._service.get("state/getStateList").subscribe((res)=>{
this.states = res
  })
}

getTableData(){
  this._service.get('getAllProvidentFundMaster').subscribe((res)=>{
    res.forEach(element => {
      let state=element.state 
      let result=this.states.filter((stat:any)=>
      (stat.stateId=state))
      this.tableData_display.push({"state":result[0].stateName,"pfeffectiveDate":element.pfeffectiveDate,"employeeContributionInPercentage":element.employeeContributionInPercentage,"gender":element.gender,"maxAmountApplicable":element.maxAmountApplicable,"pfstatus":element.pfstatus,"providentFundId":element.providentFundId})
    });
    this.tableData = this.tableData_display
    this.loader = false
  },(error)=>{
    
    this.loader = false
    console.log(error)
    alert("Something Went Wrong")
})
}
delete(id){
this._service.get('deleteProvidentFundMaster/'+id).subscribe((res)=>{
  if(res.respose=="Success"){
    Swal.fire({
  
      icon: 'success',
      title: 'Data Added Successfully',
      showConfirmButton: false,
      timer: 1500
    })
    const currentRoute = this.router.url;
       this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([currentRoute]); 
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
}
