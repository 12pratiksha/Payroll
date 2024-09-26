import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AllModulesService } from '../../all-modules.service';
import Swal from 'sweetalert2';
import { DatePipe } from "@angular/common";
@Component({
  selector: 'app-companypage',
  templateUrl: './companypage.component.html',
  styleUrls: ['./companypage.component.css']
})
export class CompanypageComponent implements OnInit {
  public basicForm: FormGroup;
  submitLoader : boolean = false
  path=environment.apiEndpoint;
  result:any;
  showMyContainer:boolean=false;
  loginData:any;
  dtOptions: DataTables.Settings = {};
  cityList: any;
  statesList: any;
  countryList: any;
 btnUpdate:boolean=false;
 editId:any;
  file: any;
  loader: boolean = true;
  stateName: any;
  branchName: any;
  cityName: any;
  result_display: any;
  countryName: any;
  
  constructor(private router: Router,public HttpClient :HttpClient,private formBuilder: FormBuilder, public _service: AllModulesService) {

    this.loginData = localStorage.getItem('LoginData');



   }

 
  showContainer(){
this.showMyContainer=true;

  }
  hideContainer(){
    this.showMyContainer=false;
    this.cancel();
  }
  ngOnInit() {
    setTimeout(() => {
      this.loader = false;
    }, 10000);
    this.basicForm = this.formBuilder.group({
      companyCode: ["",Validators.required],
      companyName: ["",Validators.required],
      uploadLogo: [""],
      address: [""],
      country: ["",Validators.required],
      state: ["",Validators.required],
      pincode: [""],
      city: ["",Validators.required],
      region: [""],
      companyType: [""],
      telNo: [""],
      faxNo: [""],
      mobileNo: [""],
      website: [""],
      eMail: [""],
      vision: [""],
      mission: [""],
      emplimits: [""],
     // softwareExpiryDate: ["",Validators.required]
    });
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      dom: 'Bfrtip'
     
   }

this.getCountryList();
this.getCityList();
this.getStateList();
this.getCompany();
 

  }

getCompany(){
  this.result_display=[];
  let headers = new HttpHeaders({ "Authorization": this.loginData});
  this.HttpClient.get(this.path+"getAllCompanyInformationList", {headers:headers}).subscribe(data=>{

   
     this.result=data;
    
     this.loader = false
     this.result.forEach(element => {
    
      let state=element.stateName;
      console.log(state)
      let city=element.cityName
      let country=element.countryName
      
      let url = `${'state/getState/'}`+`${state}`
    this._service.get(url).subscribe((res)=>{
      this.stateName=res.stateName
    
      let url1 = "city/getCity/"+`${city}`
      this._service.get(url1).subscribe((res)=>{
        this.cityName=res.cityName

        let url2 = 'country/getCountry/'+`${country}`
        this._service.get(url2).subscribe((res)=>{
          this.countryName=res.countryName
       
  
      
      this.result_display.push({"companyInformationId":element.companyInformationId,"companyName":element.companyName,"stateName":this.stateName,"cityName":this.cityName,"countryName":this.countryName})
    })
    })
  })
  });
  console.log(this.result_display)
     
  },(error)=>{
    
    this.loader = false
    console.log(error)
    alert("Something Went Wrong")
  });

}
  getCityList(){
    this._service.get('city/getCityList').subscribe((res)=>{
  
  this.cityList = res
 
    })
  
  }

  getStateList(){
    this._service.get('state/getStateList').subscribe((res)=>{
  
  this.statesList = res
 
    })
  
  }
  getCountryList(){
    this._service.get('country/getCountryList').subscribe((res)=>{
  
  this.countryList = res
  
    

    })
  
  }

  addCompany(){
   if (this.basicForm.status=="VALID"){
    this.submitLoader = true 
    let form =this.basicForm.value;
    var datePipe = new DatePipe('en-US');
    let date = datePipe.transform(form.softwareExpiryDate,'yyyy-MM-dd');

    let data = {
      companyName:form.companyName,
      companyCode:form.companyCode,
      cityName:form.city,
      stateName:form.state,
      countryName:form.country,
     softExpiryDate:date,
     imageName:this.file
    }
    this._service.uploadFile(data, 'companyMaster/company').subscribe((res)=>{
      this.submitLoader = false
      if(res.respose=="Success"){
        Swal.fire({

          icon: 'success',
          title: 'Company Added Successfully',
          showConfirmButton: false,
          timer: 1500
        })
        const currentRoute = this.router.url;

        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([currentRoute]); // navigate to same route
        }); 
      }
      if(res.respose=="Already"){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Company Already Exists',
         
        })
      }
     
    })
   }
   else{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong',
     
    })
   
   }
  }
  edit(id){
    this.btnUpdate=true;
  
    this.editId = id
    this.showMyContainer=true;
    let url = 'companyMaster/getCompany/'+`${this.editId}`
this._service.get(url).subscribe((res)=>{
  
  var datePipe = new DatePipe('en-US');
  let date = datePipe.transform(res.softExpiryDate,'dd-MM-yyyy');
  
  this.basicForm.get('companyName').setValue(res.companyName)
  this.basicForm.get('companyCode').setValue(res.companyCode)

  this.basicForm.get('city').setValue(res.cityName)
  this.basicForm.get('state').setValue(res.stateName)
  this.basicForm.get('country').setValue(res.countryName)
  this.basicForm.get('softwareExpiryDate').setValue(date)
  
})

  }
  onChange(event){
    let file=event.target.files[0]
    const formData = new FormData();
  formData.append('file', file);
  this._service.uploadFile(formData,"companyMaster/uploadlogo").subscribe((res)=>{
   this.file = res.data[0].imageName;
   console.log(this.file)
   })
  }

update(){
// console.log(this.editId)
// const formData = new FormData();
if (this.basicForm.status=="VALID"){
  this.submitLoader = true
  let url = 'companyMaster/updateCompany/'+`${this.editId}`;
  let form =this.basicForm.value;
  var datePipe = new DatePipe('en-US');
  let date = datePipe.transform(form.softwareExpiryDate,'yyyy-MM-dd');
  console.log(this.file)
  let data = {
    companyName:form.companyName,
    companyCode:form.companyCode,
    cityName:form.city,
    stateName:form.state, 
    countryName:form.country,
   softExpiryDate:date,
   imageName:this.file
  }
  this._service.uploadFile(data,url).subscribe((res)=>{
    this.submitLoader = false
    if(res.respose=="Success"){
      Swal.fire({

        icon: 'success',
        title: 'Company Updated Successfully',
        showConfirmButton: false,
        timer: 1500
      })
      const currentRoute = this.router.url;

      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([currentRoute]); // navigate to same route
      }); 
    }
    if(res.respose=="Already"){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Company Already Exists',
       
      })
    }
    
  })
 }
 else{
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Something went wrong',
   
  })
 
 }
}

  cancel(){
    const currentRoute = this.router.url;

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentRoute]); 
    }); 
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
        this._service.delete(id, 'companyMaster/deleteCompany').subscribe((res)=>{

        if(res.respose=="Success"){
            Swal.fire({
             icon: 'success',
              title: 'Company Deleted Successfully',
              showConfirmButton: false,
              timer: 1500,
              didOpen: () => {
                Swal.hideLoading()
              }
            })
          this.cancel()
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
