import { Component, OnInit, ViewChild} from '@angular/core';
import {  Router } from '@angular/router';
import { AllModulesService } from '../../all-modules.service';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-work-flow',
  templateUrl: './work-flow.component.html',
  styleUrls: ['./work-flow.component.css']
})
export class WorkFlowComponent implements OnInit {
  tableData: any;
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  loader = true
  dtOptions: any = {};
  constructor(public router:Router, public _service: AllModulesService) { }

  ngOnInit(): void {
    this.getData();
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

  workFlowForm(type, value){
    console.log(value)
if (type == 'submit'){
this.router.navigate(['layout/masters/workFlowForm/add'])
  }
  else{
    this.router.navigate(['layout/masters/workFlowForm/'+value])
  }
}
getData(){
  this._service.get('getAllworkFlowConfigurationMaster').subscribe((res)=>{ 
    this.tableData = res;
    this.loader = false
  },(error)=>{
    
    this.loader = false
    console.log(error)
    alert("Something Went Wrong")
})
}
delete(id){
  console.log(id)
  let url = "deleteWorkFlowConfigurationMaster/"+id

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
