import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AllModulesService } from '../../all-modules.service';
import { StatesService } from './states.service';
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})


export class StateComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  dtOptions: any = {};
  public addStateForm: FormGroup;
  stateData:any;
  showMyContainer:boolean=false;
  loader = true
  submitLoader : boolean = false
  countrylist:any;
  regionList: any;
  user: string;
  cityId: any;
  stateID: any;
  ipAddress: any;
  constructor( private http:HttpClient, private srvModuleService: AllModulesService, private formBuilder: FormBuilder, private toastr: ToastrService, public router: Router) { }
  public dtTrigger: Subject<any> = new Subject();
  customPatterns = {
    V: { pattern: new RegExp("-?") },
    "0": { pattern: new RegExp("[0-9]") },
  };
  ngOnInit(): void {
    setTimeout(() => {
      this.loader = false;
    }, 10000);
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'print', 
        ]
    };

    this.statedataTable();
   this.getCountryList();
   this.getRegionList();
this.addStateForm = this.formBuilder.group({

  
  stateName:['',],
  countryName:['',],
  regionName:['', ],
  stateCode:['',]

}) 

 
  }
  showContainer(){
    let currentRoute = this.router.url;
    console.log(currentRoute)
    this.showMyContainer=true;
  }
  hideMyContainer(){
    let currentRoute = this.router.url;
console.log(currentRoute)
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate([currentRoute]); 
          }); 
  }

  statedataTable(){

    this.srvModuleService.get( "state/getStateList").subscribe((data) => {
      this.stateData = data;
      this.loader = false
    },(error)=>{
    
      this.loader = false
      alert("Something Went Wrong")
    });

  }
addState(){




  if(this.addStateForm.valid){
    this.submitLoader = true 
    this.srvModuleService.add(this.addStateForm.value ,"state/insertState").subscribe((res) => {
      this.submitLoader = false
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
    else if(res.respose == "Already"){
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
        text: 'Something Went Wrong!',
    
      })
     }
  
    });
  
  }

  else{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      
    })
    this.addStateForm.markAllAsTouched()
}


}


getCountryList(){
  this.srvModuleService.get('country/getCountryList').subscribe((res)=>{

this.countrylist = res

  })

}
getRegionList(){

this.srvModuleService.get('region/getRegionList').subscribe((res)=>{

this.regionList = res

})

}
deleteState(id){

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
      this.srvModuleService.delete(id,'state/deleteState').subscribe((res)=>{
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
editState(id){
this.showMyContainer= true
 this.stateID = id
  let url = `${'state/getState/'}`+`${id}`
 this.srvModuleService.get(url).subscribe((res)=>{

this.addStateForm.get('stateName').setValue(res.stateName)
this.addStateForm.get('countryName').setValue(res.countryName)
this.addStateForm.get('regionName').setValue(res.regionName)
this.addStateForm.get('stateCode').setValue(res.stateCode)

 })



}
cancel(){

  const currentRoute = this.router.url;

  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]); 
  }); 
}
update(){
  let data = {
    regionId:"",
    countryName: this.addStateForm.value.countryName,
    regionName: this.addStateForm.value.regionName,
    stateName: this.addStateForm.value.stateName,
    stateCode: this.addStateForm.value.stateCode,
    status: '',
    createBy: '',
    createDate: '',
    createdIp: '',
    modifiedBy: '',
    modifiedDate: '',
    modifiedIp: ''
  }

if(this.addStateForm.valid){
  this.submitLoader = true 
  let url='state/updateState/'+`${this.stateID}`
  this.srvModuleService.update(data ,url).subscribe((res) => {
    this.submitLoader = false
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
else if(res.respose == "Already"){
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
  text: 'Something Went Wrong!',

})
}
  });

}

else{
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Something went wrong!',
    
  })
  this.addStateForm.markAllAsTouched()
}

}



}
