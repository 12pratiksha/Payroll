import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { AllModulesService } from '../../all-modules.service';

@Component({
  selector: 'app-qualification',
  templateUrl: './qualification.component.html',
  styleUrls: ['./qualification.component.css']
})
export class QualificationComponent implements OnInit {
  name = new FormControl(); 
  showMyContainer : boolean = false
  dtTrigger: Subject<any> = new Subject();
  dtOptions: any = {};
  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;
  constructor(
    public router: Router,
    public service: AllModulesService
  ) { }
  tableData
  ngOnInit(): void {
    this.dtOptions = {

      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      
    };
    this.service.get("getQualificationMaster").subscribe((res)=>{
  this.tableData = res
 
    })
  }
  showContainer(){
    this.showMyContainer=true;
  }
  hideMyContainer(){
    const currentRoute = this.router.url;

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentRoute]); 
    }); 
  }


  add(){
    this.service.add({qualificationName:this.name.value}, "addQualificationMaster").subscribe((res)=>{
      if(res.respose == "Success"){
        Swal.fire({
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        })
        const currentRoute = this.router.url;
    
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([currentRoute]); // navigate to same route
        }); 
       
      }
      else if(res.respose == "Alread"){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Record Already Exists!',
      
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
        this.service.delete(id, 'deleteQualificationMaster').subscribe((res)=>{
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
