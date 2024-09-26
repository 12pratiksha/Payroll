import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2';
import { AllModulesService } from '../../all-modules.service';

@Component({
  selector: 'app-professional-tax-table',
  templateUrl: './professional-tax-table.component.html',
  styleUrls: ['./professional-tax-table.component.css']
})
export class ProfessionalTaxTableComponent implements OnInit {
  tableData: any;
  
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  dtOptions: any = {};
  loader: boolean = true;
  tableData_display: any=[];
  states: any;
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
this.router.navigate(['/layout/masters/pt/'+type])
}
getTableData(){
  this._service.get('getAllProfessionalTaxMaster').subscribe((res)=>{
    res.forEach(element => {
      let state=element.state 
      let result=this.states.filter((stat:any)=>
      (stat.stateId=state))
      this.tableData_display.push({"state":result[0].stateName,"applicableDate":element.applicableDate,"description":element.description,"gender":element.gender,"status":element.status,"professionalTaxId":element.professionalTaxId})
    });
    this.tableData = this.tableData_display
    // this.tableData = res
    this.loader = false
  },(error)=>{
    
    this.loader = false
    console.log(error)
    alert("Something Went Wrong")
})
}
getState(){
  this._service.get("state/getStateList").subscribe((res)=>{
this.states = res
  })
}
delete(id){
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: 'Loading...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading()
        }
      })
      this._service.get('deleteProfessionalTaxMaster/'+id).subscribe((res)=>{
        if(res.respose=="Success"){
          this.router.navigate(["/layout/masters/pt"])
          Swal.fire({
        
            icon: 'success',
            title: 'Data Added Successfully',
            showConfirmButton: false,
            timer: 1500
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
}
