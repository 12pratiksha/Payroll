import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2';
import { AllModulesService } from '../../all-modules.service';

@Component({
  selector: 'app-advance-amount-for-expenses',
  templateUrl: './advance-amount-for-expenses.component.html',
  styleUrls: ['./advance-amount-for-expenses.component.css']
})
export class AdvanceAmountForExpensesComponent implements OnInit {
  tableData: any;
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  dtOptions: any = {};
  loader = true
  constructor(
    public _service:AllModulesService,
    public router:Router
    ) { }

  ngOnInit(): void {
    this.getTableData();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'print', 
        ]
    };
  }

getTableData(){
  this._service.get('getAllAdvanceAmountForExpensesMaster').subscribe((res)=>{
    console.log(res)
    this.tableData = res;
    this.loader = false
  },(error)=>{
    
    this.loader = false
    console.log(error)
    alert("Something Went Wrong")
})
}
form(type){
  this.router.navigate(['/layout/payroll/advanceAmountExpensesForm/'+type])
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
      this._service.delete(id, 'deleteAdvanceAmountForExpensesMaster').subscribe((res)=>{
        console.log(res)
        if(res.respose == 'Success'){
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        this.getTableData();
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
