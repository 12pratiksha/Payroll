import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2';
import { AllModulesComponent } from '../../all-modules.component';
import { AllModulesService } from '../../all-modules.service';

@Component({
  selector: 'app-esic-table',
  templateUrl: './esic-table.component.html',
  styleUrls: ['./esic-table.component.css']
})
export class EsicTableComponent implements OnInit {
  tableData: any;
  
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  dtOptions: any = {};
  loader = true
  stateName: any;
  tableData_display: any=[];
  constructor(
    public _service: AllModulesService,
    public router: Router
  ) { }

  ngOnInit(): void {
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
this.router.navigate(['/layout/masters/esic/'+type])
}
getTableData(){
  this._service.get('getAllESICMaster').subscribe((res)=>{
    this.tableData = res
    this.loader = false
    this.tableData.forEach(element => {
      let state=element.stateName

  let url = `${'state/getState/'}`+`${state}`
  this._service.get(url).subscribe((res)=>{
  this.stateName=res.stateName

  this.tableData_display.push({"esicId":element.esicId,"stateName":this.stateName,"effectiveDate":element.effectiveDate,"employeeContributionInPercentage":element.employeeContributionInPercentage,"employerContributionInPercentage":element.employerContributionInPercentage,"maxAmountLimit":element.maxAmountLimit,"status":element.status})
  })
    });
  },(error)=>{
    
    this.loader = false
    console.log(error)
    alert("Something Went Wrong")
})
}
delete(id){
  this._service.get('deleteESICMaster/'+id).subscribe((res)=>{
    if(res.respose=="Success"){
      Swal.fire({
    
        icon: 'success',
        title: 'Data Added Successfully',
        showConfirmButton: false,
        timer: 1500
      })
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
