import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2';
import { AllModulesService } from '../../all-modules.service';

@Component({
  selector: 'app-salary-formulas',
  templateUrl: './salary-formulas.component.html',
  styleUrls: ['./salary-formulas.component.css']
})
export class SalaryFormulasComponent implements OnInit {
  tableData: any;
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  dtOptions: any = {};
  loader = true
  constructor(
    public _service: AllModulesService,
    public router: Router
  ) { }

  ngOnInit(): void {
this.getData();
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

getData(){
  this._service.get("getAllSalaryStructureMaster").subscribe((res)=>{
this.tableData = res
this.loader = false
  },(error)=>{
    
    this.loader = false
    console.log(error)
    alert("Something Went Wrong")
})
}
salaryFormula(type){
  console.log(type)
  this.router.navigate(['layout/masters/salaryFormulasForm/'+type])
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
      this._service.delete(id, 'deleteSalaryStructureMaster').subscribe((res)=>{
        console.log(res)
        if(res.respose == 'Success'){
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        this.getData();
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

