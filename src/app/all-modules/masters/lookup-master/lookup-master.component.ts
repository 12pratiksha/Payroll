import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AllModulesService } from '../../all-modules.service';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lookup-master',
  templateUrl: './lookup-master.component.html',
  styleUrls: ['./lookup-master.component.css']
})
export class LookupMasterComponent implements OnInit {
  showMyContainer=false;
  updateButton=false;
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  dtOptions: any = {};
lookupForm:FormGroup
  type: any;
  lookupType: any;
  tabeData;
  urlType: any;
  typeLookup: any;
  editId: any;
  loader = true
  constructor(public _fb:FormBuilder, public _service:AllModulesService, public router: Router) { }

  ngOnInit(): void {
    this.getLookupType();
    this.getTableData();
    this.lookupForm=this._fb.group({
      lookUp:['',Validators.required],
      lookUpName:['',Validators.required],
      description:'',
      parentLookUp:'',
      status:'',
    })
    
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'Bfrtip',
       
    };
  }
  showContainer(){
    this.showMyContainer=false;
    const currentRoute = this.router.url;
    
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentRoute]); 
    }); 
  }
  hideContainer(){
    this.showMyContainer=true;
  }
  getLookupType(){
this._service.get('getGroupByType').subscribe((res)=>{
this.type=res
})
  }
  onChange(event){
    console.log(event)
    let url = "getgetCodeByType?type="+`${event.target.value}`
    this._service.get(url).subscribe((res)=>{
      this.lookupType=res
    })
  }
  submit(){
   if(this.lookupForm.status=='VALID'){
    let form = this.lookupForm.value
    let data = {
      type:form.lookUp,
	
      code:form.parentLookUp,
      
      name:form.lookUpName,
    
      status: form.status,
    
      description:form.description
    }

    this._service.add(data,'addLookupMaster').subscribe((res)=>{
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
   }
  }
  getTableData(){
    this._service.get('getAllLookupMaster').subscribe((res)=>{
      this.tabeData=res
      this.loader = false;
    },(error)=>{
    
      this.loader = false
      alert("Something Went Wrong")
})
  }
  edit(id){
    this.editId=id;
    this.showMyContainer=true;
    let url = 'getLookupMaster/'+`${id}`
    this._service.get(url).subscribe((res)=>{
      this.typeLookup=res
      this.lookupForm.get('lookUp').setValue(res.type)
      this.lookupForm.get('status').setValue(res.status)
      this.lookupForm.get('description').setValue(res.description)
      this.lookupForm.get('lookUpName').setValue(res.name)
      
      let type="getgetCodeByType?type="+`${ res.type}`
          this._service.get(type).subscribe((res)=>{
            this.lookupType=res
            this.lookupForm.get('parentLookUp').setValue(this.typeLookup.code)
          })

  })
  this.updateButton=true;
  }

 update(){
  let url = 'updateLookupMaster/'+`${this.editId}`
  



if(this.lookupForm.status=='VALID'){
  let form = this.lookupForm.value
  let data = {
    type:form.lookUp,

    code:form.parentLookUp,
    
    name:form.lookUpName,
  
    status: form.status,
  
    description:form.description
  }

  this._service.update(data, url).subscribe((res)=>{
    
    if(res.respose == "Success"){
      Swal.fire({
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })
      const currentRoute = this.router.url;

      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([currentRoute]);   
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
 }

  }
  cancel(){
    const currentRoute = this.router.url;
    
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentRoute]); 
    }); 
  }
delete(id){

let url = 'deleteLookupMaster/'+`${id}`

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
        if(res.respose == 'Success'){
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          const currentRoute = this.router.url;

          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate([currentRoute]); 
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
  this.getTableData();
}
}