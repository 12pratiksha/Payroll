import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2';
import { AllModulesService } from '../../all-modules.service';

@Component({
  selector: 'app-reimbersment-expense',
  templateUrl: './reimbersment-expense.component.html',
  styleUrls: ['./reimbersment-expense.component.css']
})
export class ReimbersmentExpenseComponent implements OnInit {
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
  this._service.get('getAllReimbusementExpenseMaster').subscribe((res)=>{
    console.log(res)
    this.tableData = res;
    this.loader = false
  },(error)=>{
    
   
    console.log(error)
    alert("Something Went Wrong")
    this.loader = false
}
)
}
reImburse(type){
  this.router.navigate(['/layout/payroll/ReimbExpenseMasterForm/'+type])
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
      this._service.delete(id, 'deleteReimbusementExpenseMaster').subscribe((res)=>{
        console.log(res)
        if(res.respose == 'Success'){
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
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
