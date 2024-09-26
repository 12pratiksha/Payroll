import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { IMultiSelectOption } from 'ngx-bootstrap-multiselect';
import Swal from 'sweetalert2';
import { AllModulesService } from '../../all-modules.service';

@Component({
  selector: 'app-off-day',
  templateUrl: './off-day.component.html',
  styleUrls: ['./off-day.component.css']
})
export class OffDayComponent implements OnInit {
  showMyContainer:boolean=false;
  branch:IMultiSelectOption[];
  categorie:IMultiSelectOption[];
  offDayTable: any;
  myOptions: IMultiSelectOption[];
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  dtOptions: any = {};
  offDayForm:FormGroup;
  states: any;
  
  constructor(
    public _service: AllModulesService,
    public _fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
 
    this.get();
    this.getCategories();
    this.getBranchList();
    this.getState();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'print'
        ]
    };

    this.offDayForm = this._fb.group({
      state:['',Validators.required],
      branch:['',Validators.required],
      grade:['',Validators.required],
      day:['',Validators.required],
      fullday:['',Validators.required],
      weekNo:['',Validators.required],
      effectiveDate:['',Validators.required],
      status:'true'
    })

this.getGrade();
  }

  grade:IMultiSelectOption[];
  getGrade(){
   let grade = []
   this._service.get('getgetCodeByType?type=grade').subscribe((res)=>{
     this.grade = res
     res.forEach(element => {
          
       let grades={id:element.name, name:element.name}
      if(element.name){ grade.push(grades)
       this.grade = grade
      }
     
       
     });
   })
 }


  showContainer(){
    this.showMyContainer=true; 
  }
  hideContainer(){
    const currentRoute = this.router.url;

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentRoute]); // navigate to same route
    }); 
  }

  get(){
    this._service.get('getAllOffDayMaster').subscribe((res)=>{
      this.offDayTable = res

      });
 
  }

  getBranchList(){

    let branch:any=[]
        this._service.get('branch/getBranchList')
        .subscribe((res)=>{
        
          res.forEach(element => {
           
            let branches={id:element.branchName, name:element.branchName}
            branch.push(branches)
          
          this.branch=branch

          });
      
        })
        
          }
        
          getCategories(){
              let categorie=[]
            this._service.get('categories/getCategories').subscribe((res)=>{
              
              
              res.forEach(element => {
               
                let categories={id:element.categoryName, name:element.categoryName}
                categorie.push(categories)
               
                this.categorie = categorie
                
              });
             
            })
          
          }

          submit(){
let form = this.offDayForm.value

 if (this.offDayForm.status=='VALID'){
  let grade = []
  let branch=[]
  form.grade.forEach(element => {
    let value={grade:element}
  grade.push(value)
  });
  
  form.branch.forEach(element => {
    let value={branchName:element}
    branch.push(value)
  });

  var datePipe = new DatePipe('en-US');
let effectiveDate = form.effectiveDate
effectiveDate = datePipe.transform(effectiveDate,'yyyy-MM-dd')

  let data = {
    state:form.state,
    branchNames: form.branch,
    offDay:form.day,
    fullDayHalfDay: form.fullday,
    weekNo: form.weekNo,
    applicableDate:effectiveDate,
    status: form.status,	
    grades:form.grade
    }

this._service.add(data, 'addOffDayMaster').subscribe((res)=>{
  console.log(res)
  if(res.respose=="Success"){
    Swal.fire({
  
      icon: 'success',
      title: 'Data Added Successfully',
      showConfirmButton: false,
      timer: 1500
    })
    const currentRoute = this.router.url;

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentRoute]); // navigate to same route
    }); 
  }
else  if(res.respose=="Already"){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Data Code Already Exists',
     
    })
  }
  else if(res.respose == "Fail"){
    Swal.fire({
      icon: 'warning',
      title: 'Oops...',
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
        this.offDayForm.markAllAsTouched();
      }  
}
cancel(){
  const currentRoute = this.router.url;

  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]); // navigate to same route
  }); 
}
getState(){
  this._service.get("state/getStateList").subscribe((res)=>{
this.states = res
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
      this._service.get('deleteOffDayMaster/'+id).subscribe((res)=>{
        if(res.respose == 'Success'){
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
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
}
