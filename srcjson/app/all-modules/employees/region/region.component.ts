import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2';
import { AllModulesService } from '../../all-modules.service';


interface Status {
  key: string;
  value: string;
}


@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit {
  public addRegionForm : FormGroup
  countryList: any;
  showMyContainer:boolean=false;
  submitLoader : boolean = false
 status: Status[] = [{
key: 'Active', value: 'true'},
{key: 'Inactive', value: 'false'}]
  countryId: any;
  regionName: any;
  regionCode: any;
  ipAddress: any;
  regionList: any;
  deleteRegionId: any;
  update:boolean=false;
  editId: any;

  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  dtOptions: any = {};
  loader: boolean = true;
  constructor(private fb: FormBuilder, private srvModuleService: AllModulesService, private http:HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'print', 
        ]
    };
    this.getCountry()
this.getRegion();
this.addRegionForm = this.fb.group({

  countryName:['',Validators.required],
  regionName: ['',Validators.required],
  regionCode: ['',Validators.required],
  status: ['true',Validators.required]
})



  }


  getCountry(){

this.srvModuleService.get('country/getCountryList')
.subscribe((res)=>{


this.countryList = res

})
  }
  showContainer(){
    this.showMyContainer=true;
  }
  hideMyContainer(){
    const currentRoute = this.router.url;

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentRoute]); // navigate to same route
    })
  }

  addRegion(){

if(this.addRegionForm.valid){
  this.submitLoader = true 

  let data = {
    countryId:  this.addRegionForm.value.countryName,
    regionName: this.addRegionForm.value.regionName,
    regionCode: this.addRegionForm.value.regionCode,
    status: this.addRegionForm.value.status,
    createdby: '',
    createdIp:'',
    modifiedBy:'',
    modifiedIp:'',
  
  }
  this.srvModuleService.add(data,'region/inserRegion').subscribe((res)=>{
    
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
        text: 'Record Already Exists',
    
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
else{
   
Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: 'Something went wrong!',
})
this.addRegionForm.markAllAsTouched();
}
    
  }


  getRegion(){

    this.srvModuleService.get('region/getRegionList')
    .subscribe((res)=>{
    
    
    this.regionList = res
    this.loader = false

    },(error)=>{
    
    this.loader = false
    console.log(error)
    alert("Something Went Wrong")
  })
      }


  
  cancel(){

    const currentRoute = this.router.url;

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentRoute]); // navigate to same route
    }); 
  }


  deleteRegion(){



this.srvModuleService.delete(this.deleteRegionId,'region/deleteRegion' ).subscribe((res)=>{
 
console.log(res)
this.getRegion()
this.showMyContainer = false

})


  }
  deleteRegionID(id){

    this.deleteRegionId = id
    let url = 'region/deleteRegion/'+`${id}`
    console.log(id)
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
        this.srvModuleService.get(url).subscribe((res)=>{
          if(res.respose == 'Success'){
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

  edit(id){
    this.editId=id
    let url = 'region/getRegion/'+`${id}`
    this.showMyContainer=true
    this.srvModuleService.get(url).subscribe((res)=>{
      console.log(res)
      this.addRegionForm.get('countryName').setValue(res.countryId)
      this.addRegionForm.get('regionName').setValue(res.regionName)
      this.addRegionForm.get('regionCode').setValue(res.regionCode)
      this.addRegionForm.get('status').setValue(res.status)
    })
    this.update=true
  }
updateRegion(){
if(this.addRegionForm.valid){
  this.submitLoader = true 
  let url = 'region/updateRegion/'+`${this.editId}`
  let data = {
    countryId:  this.addRegionForm.value.countryName,
    regionName: this.addRegionForm.value.regionName,
    regionCode: this.addRegionForm.value.regionCode,
    status: this.addRegionForm.value.status,
    createdby: '',
    createdIp:'',
    modifiedBy:'',
    modifiedIp:'',
  
  }
  this.srvModuleService.add(data,url).subscribe((res)=>{
    
  this.submitLoader = false
   if(res.respose == "Success"){ Swal.fire({
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
      text: 'Record Already Exists',
  
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

else{
 
Swal.fire({
icon: 'error',
title: 'Oops...',
text: 'Something went wrong!',
})
this.addRegionForm.markAllAsTouched();
}
  
}

  }



