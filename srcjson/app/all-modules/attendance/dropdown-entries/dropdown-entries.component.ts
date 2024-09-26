import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AllModulesService } from '../../all-modules.service';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-dropdown-entries',
  templateUrl: './dropdown-entries.component.html',
  styleUrls: ['./dropdown-entries.component.css']
})
export class DropdownEntriesComponent implements OnInit {
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
  salaryHead: any;
  constructor(public _fb:FormBuilder, public _service:AllModulesService) { }

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
  }
  hideContainer(){
    this.showMyContainer=true;
  }
  getLookupType(){
this._service.get('getGroupByType').subscribe((res)=>{
this.type=res
console.log(res)
})
  }
  onChange(event){
    console.log(event.target.value)
    let url = "getgetCodeByType?type="+`${event.target.value}`
    console.log(url)
    this._service.get(url).subscribe((res)=>{
      console.log(res)
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
      console.log(res)
    })
    this.lookupForm.reset();
    Swal.fire({
      
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    })
    this.showMyContainer=false;
    this.getTableData();
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
      console.log(error)
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
            console.log(this.typeLookup.code)
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
      console.log(res)
    })
  this.lookupForm.reset();
  Swal.fire({
    
    icon: 'success',
    title: 'Your work has been saved',
    showConfirmButton: false,
    timer: 1500
  })
  this.showMyContainer=false;
  this.getTableData();
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
    this.lookupForm.reset();
    this.updateButton=false;
  this.showMyContainer=false;
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
        console.log(res)
        this.getTableData();
      })
      
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  })
  this.getTableData();
}

}