import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2';
import { AllModulesService } from '../../all-modules.service';

@Component({
  selector: 'app-connection-to-db',
  templateUrl: './connection-to-db.component.html',
  styleUrls: ['./connection-to-db.component.css']
})
export class ConnectionToDBComponent implements OnInit {
type = new FormControl('')
sqlForm: FormGroup
excelForm: FormGroup
showMyContainer: boolean = false
@ViewChild(DataTableDirective)
datatableElement: DataTableDirective;
// dtOptions: DataTables.Settings = {};
dtOptions: any = {};
  constructor(
    public fb : FormBuilder,
    public service : AllModulesService,
    public router : Router
    ) { }

  ngOnInit(): void {

    this.dtOptions = {

      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      
    };

    this.sqlForm = this.fb.group({
      userName: ['',Validators.required],
      password: ['',Validators.required],
      hostName: ['',Validators.required],
      portNumber: ['',Validators.required],
      dbName: ['',Validators.required],
      tableName: ['',Validators.required],
      // api: ['',Validators.required],
      status:''
    }) 
    this.excelForm = this.fb.group({
      browse : ''
    })

    this.getTableData()

  }


  showContainer(){
    this.showMyContainer = true
  }
  hideMyContainer(){
     this.cancel()
  }
  cancel(){
    this.showMyContainer = false
      const currentRoute = this.router.url;
  
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([currentRoute]); // navigate to same route
      }); 

  }
  submit(type){
let url
if(type == 'add'){
 url = "insertInOutPuchDBDetials"
}
else{
  url = "InOutPuchDBDetials/updateInOutPuchDBDetials/"+this.editId
}

    let form = this.sqlForm.value
    let data ={
      // api: form.api,
      db: this.type.value,
      username: form.userName,
      password: form.password,
      hostName: form.hostName,
      databaseName: form.dbName,
      tableName: form.tableName,
      portNo: form.portNumber,
      status: form.status
  }
   if(this.sqlForm.valid){
    this.service.add(data, url).subscribe((res)=>{
      if(res.respose == "Success"){
        Swal.fire({
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        })
      this.cancel()
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
      text: 'Please enter mandatory Details',
      showConfirmButton: false,
      timer: 1500
    })
    this.sqlForm.markAllAsTouched()
   }
  }

  change(){
    this.sqlForm.reset()
    this.excelForm.reset()
  }
  tableData
  getTableData(){
    this.service.get("getALLInOutPuchDBDetials").subscribe((res)=>{
      this.tableData = res
    })
  }


  editId
edit(id){
this.showMyContainer = true
this.editId = id

this.service.get("getInOutPuchDBDetialsById/"+ id).subscribe((res)=>{
this.type.setValue(res.db)
// this.sqlForm.get('api').setValue(res.api)
this.sqlForm.get('userName').setValue(res.username)
this.sqlForm.get('password').setValue(res.password)
this.sqlForm.get('password').setValue(res.hostName)
this.sqlForm.get('dbName').setValue(res.databaseName)
this.sqlForm.get('tableName').setValue(res.tableName)
this.sqlForm.get('portNumber').setValue(res.portNo)
this.sqlForm.get('hostName').setValue(res.hostName)
this.sqlForm.get('status').setValue(res.status)


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

      this.service.delete(id,'deleteInOutPuchDBDetials').subscribe((res)=>{
       
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
}
