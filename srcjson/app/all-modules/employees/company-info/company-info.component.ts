import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AllModulesService } from '../../all-modules.service';
import Swal from 'sweetalert2';
import { DatePipe } from "@angular/common";

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.css']
})
export class CompanyInfoComponent implements OnInit {
  public companyinfoForm: FormGroup;
  path=environment.apiEndpoint;
  submitLoader : boolean = false
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
  public Toggledata=true;
  tableData: any;
  backgroundImage: any;
  logo: any;
  constructor(private router: Router,private datePipe: DatePipe,public HttpClient :HttpClient,private formBuilder: FormBuilder, public _service: AllModulesService) {

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
    this.getTableData();
    setTimeout(() => {
      this.loader = false;
    }, 10000);
    this.companyinfoForm = this.formBuilder.group({
      companyName:["",Validators.required],
      address:["",Validators.required],
      gst:["",Validators.required],
      footer:["",Validators.required],
      adminUserName:["",Validators.required],
      password:["",Validators.required],
      //softwareExpiryDate: ["",Validators.required],
      poweredBy:[""],
      mission:["",Validators.required],
      vission:["",Validators.required]
    });
    console.log(this.companyinfoForm)
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      dom: 'Bfrtip'
     
   }


 

  }

getTableData(){
  this._service.get('getAllCompanyInformationList').subscribe((res)=>{
  this.tableData = res
  })
}



  addCompany(){
   if (this.companyinfoForm.status=="VALID"){
    this.submitLoader = true 
    let form =this.companyinfoForm.value;
    var datePipe = new DatePipe('en-US');
    console.log(form.softwareExpiryDate)
    let date = datePipe.transform(form.softwareExpiryDate,'yyyy-MM-dd');
   
    let data = {
      logoImageName: this.logo,
      gstNo: form.gst,
      backImageName: this.backgroundImage,
      footer: form.footer,
      adminUsename: form.adminUserName,
      adminPasword: form.password,
      softExpiryDate: date,
      companyName: form.companyName,
      address: form.address,
      poweredBy:form.poweredBy,
      mission:form.mission,
      vision:form.vission
    }
   
   
    this._service.uploadFile(data, 'AddCompanyInformationMaster').subscribe((res)=>{
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
    let url = 'getCompanyInformation/'+`${this.editId}`
    this._service.get(url).subscribe((res)=>{

    var datePipe = new DatePipe('en-US');
    let date = datePipe.transform(res.softExpiryDate,'dd-MM-yyyy');
    console.log(date)
  
    this.companyinfoForm.get('companyName').setValue(res.companyName)
    this.companyinfoForm.get('password').setValue(res.adminPasword)
    this.companyinfoForm.get('gst').setValue(res.gstNo)
    //this.companyinfoForm.get('softwareExpiryDate').setValue(date)
    this.companyinfoForm.get('footer').setValue(res.footer)
    this.companyinfoForm.get('adminUserName').setValue(res.adminUsename)
    this.companyinfoForm.get('companyName').setValue(res.companyName)
    this.companyinfoForm.get('address').setValue(res.address)
    this.companyinfoForm.get('poweredBy').setValue(res.poweredBy)
    this.companyinfoForm.get('mission').setValue(res.mission)
    this.companyinfoForm.get('vission').setValue(res.vision)


 
  
})

  }
  onChange(event, type){
    let file=event.target.files[0]
    console.log(file)
    const formData = new FormData();
  formData.append('file', file);
  console.log(formData)
  if(type == 'logo'){
    this._service.uploadFile(formData,"CompanyInformationMaster/uploadlogo").subscribe((res)=>{
    this.logo = res.data[0].logoImageName
    
    })
  }
  else{
    this._service.uploadFile(formData,"CompanyInformationMaster/uploadBackImage").subscribe((res)=>{
      this.backgroundImage = res.data[0].backImageName
     
      })
  }
 
  }

update(){

if (this.companyinfoForm.status=="VALID"){
  this.submitLoader = true 

  let url = 'updateCompanyInformation/'+`${this.editId}`;
  let form =this.companyinfoForm.value;
  // var datePipe = new DatePipe('en-US');
  // console.log(form.softwareExpiryDate)
  //let date = datePipe.transform(form.softwareExpiryDate,'yyyy-MM-dd');
  var date = new Date();
  console.log(this.datePipe.transform(date,"yyyy-MM-dd"));

  let data = {
    logoImageName: this.logo,
    gstNo: form.gst,
    backImageName: this.backgroundImage,
    footer: form.footer,
    adminUsename: form.adminUserName,
    adminPasword: form.password,
    softExpiryDate: date,
    companyName: form.companyName,
    address: form.address,
    poweredBy:form.poweredBy,
    mission:form.mission,
    vision:form.vission
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
        text: 'UserName Already Exists',
       
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
iconLogle(){
  this.Toggledata = !this.Toggledata
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
        this._service.delete(id, 'deleteCompanyInformation').subscribe((res)=>{

        

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

