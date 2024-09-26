import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AllModulesService } from '../../all-modules.service';

@Component({
  selector: 'app-setup-config',
  templateUrl: './setup-config.component.html',
  styleUrls: ['./setup-config.component.css']
})
export class SetupConfigComponent implements OnInit {
  public dtOptions: DataTables.Settings = {};
  pageName: any;
  workflowConfig: any;
  loader = true
  constructor(public _service:AllModulesService) { }

  ngOnInit(): void {
    this.getWorkflow()
    this.dtOptions = {
      processing: true,
      dom: 'lrtip'
    };
 this.getData();
  }
getWorkflow(){
this._service.get("getAllSetupConfiguration").subscribe((res)=>{
  this.pageName = res
  this.loader = false
},(error)=>{
    
  this.loader = false
  console.log(error)
  alert("Something Went Wrong")
})
}
getData(){
  this._service.get('getAllworkFlowConfigurationMaster').subscribe((res)=>{
    this.workflowConfig = res;
   
  })
}
update(val, id){
  let url = 'updatesetupConfiguration/'+val
  let data = {
    workFlowId: Number(id)
  }
 if (id){
   this._service.add(data, url).subscribe((res)=>{
   
    if(res.respose == 'Success'){
      Swal.fire({
        
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })
    }
  })
 }
 else{
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Something went wrong!',

  })
 }
}
}
