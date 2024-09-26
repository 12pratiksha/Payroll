import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AllModulesService } from '../../all-modules.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agency-list',
  templateUrl: './agency-list.component.html',
  styleUrls: ['./agency-list.component.css']
})
export class AgencyListComponent implements OnInit {
  //dtOptions: { pagingType: string; pageLength: number; dom: string; };
  showMyContainer:boolean=false;
  agencyForm: FormGroup
  city: any=[];
  state: any;
  tableData: any=[];
  dtOptions: { pagingType: string; pageLength: number; processing: boolean; dom: string; buttons: string[]; };
  agencyMasterId: any;
  stateName: any;
  cityName: any;
  tableData_display: any=[];
 



  

  constructor(private router: Router, public fb:FormBuilder,public service:AllModulesService) { 

  }

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
    this.getState()
    this.getCity()
    this.getAgencyList()
 this.agencyForm=this.fb.group({
  "agencyName":['',Validators.required],
  "city":['',Validators.required],
  "state":['',Validators.required],
  "contactNo":['',Validators.required],
  "contactperson":['',Validators.required],
  "contactpersonMobileNo": ['',Validators.required],
  "status":['',],
  //"type": ['',Validators.required],
  "registrationNumber": ''
 })
 console.log(this.agencyForm)
  }
  showContainer(){
    this.showMyContainer=true
    
    }
    hideContainer(){
     
    this.showMyContainer=false
    this.cancel()
    
    }
  getState()
  {
    let url='state/getStateList'
    this.service.get(url).subscribe((res)=>{
    this.state=res
    })
  }
  getCity()
  {
    let url="city/getCityList"
    this.service.get(url).subscribe((res)=>{
    this.city=res
    })
  }
  cancel(){
    const currentRoute = this.router.url;

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentRoute]); 
    }); 
  }
  add(){
    
    let form=this.agencyForm.value
    //console.log(this.agencyForm.status)
    let url='InsertAgencyMaster'
    let data={
      "agencyName":form.agencyName,
    "city":form.city,
    "state":form.state,
    "contactNo":form.contactNo,
    "contactperson":form.contactperson,
    "contactpersonMobileNo": form.contactpersonMobileNo,
    "status":form.status,
    //"type": form.type,
    "registrationNumber": form.registrationNumber
    }
   if(this.agencyForm.status=='VALID'){
    this.service.add(data,url).subscribe((res)=>{
      console.log(res)
      if(res.respose=='Success')
            {
              Swal.fire({
                icon: 'success',
                title: 'Success',
                text: res.message,
               
              })
              //this.router.navigate(['layout/recruitment/agencyList'])
              this.showMyContainer=false
              this.cancel();
             
            }
            else if(res.respose=='Already')
            {
              Swal.fire({
                icon: 'warning',
                title: 'Oops',
                text: res.message,
               
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
  }

  }
  edit(item){
    console.log(item)
    this.agencyMasterId = item 
    console.log(item)
    let url='getAgencyMasterById/'+item
    this.service.get(url).subscribe((res)=>{
      console.log(res)
      this.agencyForm.get('agencyName').setValue(res.agencyName)
      this.agencyForm.get('city').setValue(res.city)
      this.agencyForm.get('state').setValue(res.state)
      this.agencyForm.get('contactNo').setValue(res.contactNo)
      this.agencyForm.get('contactperson').setValue(res.contactperson)
      this.agencyForm.get('contactpersonMobileNo').setValue(res.contactpersonMobileNo)
      this.agencyForm.get('registrationNumber').setValue(res.registrationNumber)
      this.agencyForm.get('status').setValue(res.status)
      this.agencyForm.get('type').setValue(res.type)

    })
    this.showMyContainer=true;
  }

update(id){
  let url='updateAgencyMaster/'+id
  let form=this.agencyForm.value
  let data={
    "agencyName":form.agencyName,
  "city":form.city,
  "state":form.state,
  "contactNo":form.contactNo,
  "contactperson":form.contactperson,
  "contactpersonMobileNo": form.contactpersonMobileNo,
  "status":form.status,
  //"type": form.type,
  "registrationNumber": form.registrationNumber
  }
  this.service.add(data,url).subscribe((res)=>{
    console.log(res)
    if(res.respose=='Success')
            {
              Swal.fire({
                icon: 'success',
                title: 'Success',
                text: res.message,
               
              })
              this.showMyContainer=false
              this.cancel();
             
            }
            else if(res.respose=='Already')
            {
              Swal.fire({
                icon: 'warning',
                title: 'Oops',
                text: res.message,
               
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

  delete(item){
    Swal.fire({
      title:"Are you really wants to delete..?",
      showCancelButton:true,
      confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Yes'
    }).then(result=>{
      console.log(result);
      if(result.isConfirmed==true)
      {
    let url='deleteAgencyMaster/'+item.agencyMasterId
    this.service.get(url).subscribe((res)=>{
      if(res.respose=='Success')
            {
              Swal.fire({
                icon: 'success',
                title: 'Success',
                text: "Agency Master is deleted successfully!",
               
              })
              this.getAgencyList()
             
            }
            else 
            {
              Swal.fire({
                icon: 'warning',
                title: 'Oops',
                text: 'Something went wrong! ',
               
              })
            }

    })
  }
  else{
    this.getAgencyList()
  }
  })
}
  getAgencyList(){
    let url='getAgencyMasterList'
    this.service.get(url).subscribe((res)=>{
      this.tableData=res
      this.tableData.forEach(element => {
        let state=element.state
        let city=element.city

  let url = `${'state/getState/'}`+`${state}`
  this.service.get(url).subscribe((res)=>{
  this.stateName=res.stateName

  let url1 = "city/getCity/"+`${city}`
      this.service.get(url1).subscribe((res)=>{
        this.cityName=res.cityName

        this.tableData_display.push({"agencyMasterId":element.agencyMasterId,"agencyName":element.agencyName,"city":this.cityName,"state":this.stateName,"contactNo":element.contactNo,"contactperson":element.contactperson})
      })
  })
        
      });

    })

  }

}
