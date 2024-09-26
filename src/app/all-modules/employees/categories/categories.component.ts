import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { data } from 'jquery';
import Swal from 'sweetalert2';
import { AllModulesService } from '../../all-modules.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  dtOptions: any = {};
update:boolean=false;
submitLoader : boolean = false
  categories: any;
  categoryForm:FormGroup
  editId: any;
  showMyContainer=false
  loader: boolean = true;
  constructor(public _service: AllModulesService, public _fb:FormBuilder, private router: Router) { }

  ngOnInit(): void {

    this.getCategories();

this.categoryForm=this._fb.group({
  categoryName:['',Validators.required],
  description:['',Validators.required],
  status:['true',Validators.required],

})
this.dtOptions = {
  pagingType: 'full_numbers',
  pageLength: 10,
  processing: true,
  dom: 'Bfrtip',
   
};


  }
getCategories(){

  this._service.get('categories/getCategories').subscribe((res)=>{
    this.categories=res
    this.loader = false
    
  },(error)=>{
    
    this.loader = false
    console.log(error)
    alert("Something Went Wrong")
  }
  )
  
}

addCategory(){
 if(this.categoryForm.status=='VALID'){
  this.submitLoader = true 

  this._service.add(this.categoryForm.value, 'categories/insertCategory').subscribe((res)=>{
    
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
this.categoryForm.markAllAsTouched();
}
  
}
edit(id){
  this.editId = id
  let url = 'categories/getCategory/'+`${id}`
  this._service.get(url).subscribe((res)=>{
    console.log(res)
    this.categoryForm.get('categoryName').setValue(res.categoryName)
    this.categoryForm.get('status').setValue(res.status)
    this.categoryForm.get('description').setValue(res.description)
    
  })
  this.update=true;
  this.showMyContainer=true;
}
updateCategory(){
if (this.categoryForm.valid){
  this.submitLoader = true 

  let url = 'categories/updateCategory/'+`${this.editId}`
  this._service.update(this.categoryForm.value,url).subscribe((res)=>{
    
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
this.categoryForm.markAllAsTouched();
}
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
  this._service.delete(id, 'categories/deleteCategory').subscribe((res)=>{
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
          this.router.navigate([currentRoute]); 
      }); 
      }
      else if(res.respose=="Already"){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: res.message,
          didOpen: () => {
            Swal.hideLoading()
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
  })
 
    }
  })
}
cancel(){
  this.editId=null;
  this.categoryForm.reset();
  this.showMyContainer=false;
  this.update=false
  this.categories();
  
}
}
