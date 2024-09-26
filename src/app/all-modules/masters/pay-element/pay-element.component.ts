import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2';
import { AllModulesService } from '../../all-modules.service';

@Component({
  selector: 'app-pay-element',
  templateUrl: './pay-element.component.html',
  styleUrls: ['./pay-element.component.css']
})
export class PayElementComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  dtOptions: any = {};
  tableData: any;
  loader = true
  constructor(public router: Router, public _service:AllModulesService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      
    };
    this.getData();
  }
  getData(){
    this._service.get('getAllPayElementMaster').subscribe((res)=>{
      console.log(res)
      this.tableData = res
      this.loader = false
    },(error)=>{
    
      this.loader = false
      console.log(error)
      alert("Something Went Wrong")
})
  }
  payRollForm(type){
    
      this.router.navigate(['layout/masters/payElementMasterForm/'+type])
      
  }
  delete(id){
   
      console.log(id)
      let url = 'deletePayElementMaster/'+`${id}`
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
          this._service.get(url).subscribe((res)=>{
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

