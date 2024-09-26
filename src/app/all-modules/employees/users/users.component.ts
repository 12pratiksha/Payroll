import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2';
import { AllModulesService } from '../../all-modules.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  tableData: any;
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  dtOptions: any = {};
  loader: boolean = true;

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
    setTimeout(() => {
      this.loader = false;
    }, 10000);
  }

getTableData(){
  this._service.get('getAllUserMaster').subscribe((res)=>{

    this.tableData = res;
    this.loader = false
  },(error)=>{
    
    this.loader = false
    alert("Something Went Wrong")
  })
}
reImburse(type){
  this.router.navigate(['/layout/employees/userForm/'+type])
}

edit(id){
  console.log(id)
  this.router.navigate(['/layout/employees/userForm/'+id])
  // this._service.get('getUser/+id').subscribe((res)=>{

  // })

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
      // Swal.fire({
      //   title: 'Loading...',
      //   allowEscapeKey: false,
      //   allowOutsideClick: false,
      //   showConfirmButton: false,
      //   didOpen: () => {
      //     Swal.showLoading()
      //   }
      // })

      this._service.delete(id, 'deleteUserMaster').subscribe((res)=>{
     
          if(res.respose=="Success"){
            Swal.fire({
        
              icon: 'success',
              title: 'Employee Deleted Successfully',
              showConfirmButton: false,
              timer: 1500,
              didOpen: () => {
                Swal.hideLoading()
              }
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
              text: 'Something went wrong',
              didOpen: () => {
                Swal.hideLoading()
              }
            })
          }
        })
      }
    
  })
}
}
