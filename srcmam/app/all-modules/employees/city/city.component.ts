import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { AllModulesService } from '../../all-modules.service';
import { Subject } from 'rxjs';
// import Swal from 'sweetalert2'

// class cityList {
//   cityName: string;
//   stateName: string;
//   regionName: string;
//   countryName: string;
// } 

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  stateList: any;
  cityList;
  submitLoader : boolean = false
  public addcityForm: FormGroup;
  countrylist: any;
  statesList: any;
  regionList: any;
  showMyContainer:boolean=false;
  editCityform:any;
  cityId: any;
  isAddMode: boolean;
  dtTrigger: Subject<any> = new Subject();
 
  // public dtElement: DataTableDirective;
  // dtOptions: any = {};
  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;
  // dtOptions: DataTables.Settings = {};
  dtOptions: any = {};
  persons;
  loader = true
  loginData: string;
  message = '';
  stateName: any;
  countryName: any;
  regionName: any;
  city_display: any=[];
  constructor(private srvModuleService: AllModulesService, 
    private fb: FormBuilder, 
    private router: Router, 
    private http: HttpClient) { 

  }
  someClickHandler(info: any): void {
    this.message = info.id + ' - ' + info.firstName;
  }
  ngOnInit(): void {
    this.isAddMode = !this.cityId;
    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 10,
    //   processing: true,
     
      
    // };

    this.loginData = localStorage.getItem('LoginData');
    let headers = new HttpHeaders({ "Authorization": this.loginData});
   
    const that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'print', 
        ]
    };
      //  that.http
      //     .get(environment.apiEndpoint+'city/getCityList', {headers:headers})
      //     .subscribe(resp => {
      //       that.cityList = resp;
      //       this.dtTrigger.next();
           
      //     });
      
      
    



    this.getCityDataTable();
    this.getCountryList();
    this.getStateList();
    this.getRegion()
this.addcityForm = this.fb.group({

  countryName:['',Validators.required],
  regionName:['',Validators.required],
  stateName:['',Validators.required],
  cityName:['',Validators.required],


})

  }


  
  ngAfterViewInit(): void {
    this.dtTrigger.subscribe(() => {
      this.datatableElement.dtInstance.then((dtInstance) => {
        dtInstance.columns().every(function () {
          const that = this;
          $('input', this.footer()).on('keyup change', function () {
            if (that.search() !== this['value']) {
              that
                .search(this['value'])
                .draw();
            }
          });
        });
      });
    });
  }


  showContainer(){
    this.showMyContainer=true;
  }
  hideMyContainer(){
    const currentRoute = this.router.url;

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentRoute]); // navigate to same route
    }); 
  }

  getCityDataTable(){
    this.srvModuleService.get('city/getCityList').subscribe((res)=>{
  
  this.cityList = res
this.cityList.forEach(element => {
  let state=element.stateName
  let country=element.countryName
  let region=element.regionName

  let url = `${'state/getState/'}`+`${state}`
    this.srvModuleService.get(url).subscribe((res)=>{
      this.stateName=res.stateName

      let url = 'country/getCountry/'+`${country}`
this.srvModuleService.get(url).subscribe((res)=>{
  this.countryName=res.countryName

  let url = 'region/getRegion/'+`${region}`
  this.srvModuleService.get(url).subscribe((res)=>{
    this.regionName=res.regionName

    this.city_display.push({"id":element.id,"cityName":element.cityName,"stateName":this.stateName,"countryName":this.countryName,"regionName":this.regionName})
  })
})
    })
});
  this.loader = false
    },(error)=>{
    
      this.loader = false
      alert("Something Went Wrong")
    })
  
  }
  getCountryList(){
    this.srvModuleService.get('country/getCountryList').subscribe((res)=>{
  
  this.countrylist = res

    })
  
  }

  getStateList(){
    this.srvModuleService.get('state/getStateList').subscribe((res)=>{
  
  this.statesList = res
    })
  
  }
getRegion(){

this.srvModuleService.get('region/getRegionList').subscribe((res)=>{

this.regionList = res

})

}

addCity(){
if(this.addcityForm.valid){
  this.submitLoader = true 


  this.srvModuleService.add(this.addcityForm.value,'city/insertCity').subscribe((res)=>{
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
  this.addcityForm.markAllAsTouched()
}
  }


deleteCity(id){
 
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

      this.srvModuleService.delete(id,'city/deleteCity').subscribe((res)=>{
       
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
editCity(cityid){

  
  this.cityId = cityid 
let url = "city/getCity/"+`${this.cityId}`
this.srvModuleService.get(url).subscribe((res)=>{

this.editCityform = res

this.addcityForm.get('cityName').setValue(this.editCityform.cityName)
this.addcityForm.get('regionName').setValue(this.editCityform.regionName)
this.addcityForm.get('stateName').setValue(this.editCityform.stateName)
this.addcityForm.get('countryName').setValue(this.editCityform.countryName)

})
this.showMyContainer=true;




}

updateCity(){
if(this.addcityForm.valid){
  let url = "city/updateCity/"+`${this.cityId}`
  this.submitLoader = true 

  this.srvModuleService.update(this.addcityForm.value,url).subscribe((res)=>{

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
      alert("Record already exists")
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
  this.addcityForm.markAllAsTouched()
}


}
selected=[];
public selectRow(index: number, row:any) {

 
  if(this.selected.includes(row.id)){
    let index = this.selected.indexOf(row.id)
    this.selected.splice(index, 1);
  }
  else{
    this.selected.push(row.id)
  }
 
 
}

cancel(){
this.cityId = undefined;
  this.showMyContainer = false;
  this.addcityForm.reset();
}

ngOnDestroy(): void {
 
  this.dtTrigger.unsubscribe();
}
private extractData(res: any) {
  const body = res.json();
  return body.data || {};
}
}
