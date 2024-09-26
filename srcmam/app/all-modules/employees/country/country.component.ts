import { Component, OnInit, ViewChild } from "@angular/core";
import { AllModulesService } from "src/app/all-modules/all-modules.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { DataTableDirective } from "angular-datatables";
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from "sweetalert2";

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  dtOptions: any = {};
  public addCountryForm: FormGroup;
  submitLoader : boolean = false
  path=environment.apiEndpoint;
  result:any;
  deleteId:any;
  update:boolean=false
  showMyContainer:boolean=false;
  loginData:any;
  loader : boolean = true
  lstCountry:any;
  
  editId: any;
  constructor(private router: Router,public HttpClient :HttpClient,private formBuilder: FormBuilder,
    private srvModuleService: AllModulesService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadCountry();
    this.addCountryForm = this.formBuilder.group({
      countryName: ["", [Validators.required]],
      countryCode: ["", [Validators.required]]
    });
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


  loadCountry() {
   
    this.srvModuleService.get( "country/getCountryList").subscribe((data) => {
      this.lstCountry = data;
      this.loader = false
    },(error)=>{
    
      alert("Something Went Wrong")
    });
  }


  

    
  addCountry() {
   if (this.addCountryForm.status == "INVALID") {
  
    Swal.fire({
     icon: 'error',
     title: 'Oops...',
     text: 'Something went wrong!',
    
   })
this.addCountryForm.markAllAsTouched()
   }
   else{
    this.submitLoader = true 
    this.srvModuleService.add(this.addCountryForm.value ,"country/insertCountry").subscribe((res) => {
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
          text: 'Something Went Wrong',
         
        })
      
     }
   });

   }
  }
  cancel(){
    const currentRoute = this.router.url;

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentRoute]); // navigate to same route
    }); 
  }
  edit(id){
    this.editId=id
    this.update=true
let url = 'country/getCountry/'+`${id}`
this.srvModuleService.get(url).subscribe((res)=>{

  this.addCountryForm.get('countryName').setValue(res.countryName)
  this.addCountryForm.get('countryCode').setValue(res.countryCode)
})

this.showMyContainer=true;

  }
updateCountry(){
if(this.addCountryForm.valid){
  console.log(this.addCountryForm.value)
  this.submitLoader = true 
  let url="country/updateCountry/"+`${this.editId}`
  this.srvModuleService.add(this.addCountryForm.value,url).subscribe((res)=>{
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
        text: 'Something Went Wrong',
       
      })
    
   }
 });

   
}
 
else{
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Something Went Wrong',
   
  })
  this.addCountryForm.markAllAsTouched()
}
 
}
delete(id){
//  
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
    this.srvModuleService.delete(id, 'country/deleteCountry').subscribe((res)=>{
      if(res.respose=="Success"){
        Swal.fire({
    
          icon: 'success',
          title: 'Country Deleted Successfully',
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

showContainer(){
  this.showMyContainer=true;
}
hideMyContainer(){
  this.showMyContainer=false
 this.addCountryForm.reset()
}

}
