import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AllModulesService } from "../../all-modules.service";
import { ToastrService } from "ngx-toastr";
import { DataTableDirective } from "angular-datatables";
import { Subject } from 'rxjs';
import Swal from "sweetalert2";
import { Router } from "@angular/router";
declare const $: any;
@Component({
  selector: "app-designation",
  templateUrl: "./designation.component.html",
  styleUrls: ["./designation.component.css"],
})
export class DesignationComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  dtOptions: any = {};
  // dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  lstDesignation: any;
  url: any = "designation";
  public tempId: any;
  public editId: any;
  mycontainer=false;
  public rows = [];
  public srch = [];
  public designationForm: FormGroup;
 loader = true
  update: boolean=false;
  constructor(
    private formBuilder: FormBuilder,
    private srvModuleService: AllModulesService,
    private toastr: ToastrService,
    public router: Router
  ) {}

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'print', 
        ]
    };
    this.LoadDesignation();

    this.designationForm = this.formBuilder.group({
      name:['',Validators.required],
      description:[''],
      reporting:[''],
      status:['true'],
    });


  }
  showMyContainer(){
    this.mycontainer=true;
  }
  hideMyContainer(){
    this.mycontainer=false
    this.designationForm.reset();
  }
  // Get designation list  Api Call
  LoadDesignation() {
    this.srvModuleService.get('getAllDesignationMaster').subscribe((data) => {
      this.lstDesignation = data;
      console.log(this.lstDesignation)
      this.loader = false
    },(error)=>{
    
      this.loader = false
      console.log(error)
      alert("Something Went Wrong")
    });
  }


  // private markFormGroupTouched(formGroup: FormGroup) {
  //   (<any>Object).values(formGroup.controls).forEach((control) => {
  //     control.markAsTouched();
  //     if (control.controls) {
  //       this.markFormGroupTouched(control);
  //     }
  //   });
  // }
  

  // Add Designation  Modal Api Call
  addDesignation() {
   if (this.designationForm.status == 'VALID'){
   this.srvModuleService.add(this.designationForm.value,'addDesignationMaster').subscribe((res)=>{
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
  
   })
   }
   else{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
     
    })
    this.designationForm.markAllAsTouched()
   }
  }

  updateDesignation(){
    let url = 'updateDesignationMaster/'+`${this.editId}`
    if (this.designationForm.status == 'VALID'){
    this.srvModuleService.add(this.designationForm.value,url).subscribe((res)=>{
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
    
     })
     }
     else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
       
      })
      this.designationForm.markAllAsTouched()
     }

  }

  // To Get The timesheet Edit Id And Set Values To Edit Modal Form
  edit(id) {
    this.editId=id
    this.mycontainer=true;
   let url = 'getDesignationMaster/'+`${id}`
   this.srvModuleService.get(url).subscribe((res)=>{

   this.designationForm.get('name').setValue(res.name)
   this.designationForm.get('description').setValue(res.description)
   this.designationForm.get('reporting').setValue(res.reporting)
   this.designationForm.get('status').setValue(res.status)
    this.update=true
   })
  }

  // Delete timedsheet Modal Api Call

  deleteDesignation(id) {
  
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
        this.srvModuleService.delete(id, 'deleteDesignationMaster').subscribe((res)=>{
       
          if (res.respose == 'Success'){
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
    const currentRoute = this.router.url;

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentRoute]); // navigate to same route
    }); 
  }


}
