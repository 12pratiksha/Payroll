import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ElementRef, ViewChild  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { AllModulesService } from '../../all-modules.service';
@Component({
  selector: 'app-import-employees',
  templateUrl: './import-employees.component.html',
  styleUrls: ['./import-employees.component.css']
})
export class ImportEmployeesComponent implements OnInit {
  @ViewChild('myInput')
  myInputVariable: ElementRef;
  file: any;  
    fileName= 'importEmployee.xlsx';
  sheet: any;
  employeeImport:FormGroup
 
  message: any;
  disabled: boolean= true;
  errorMessage: any;
  filenameurl: string;
  ipAddress: any;
  host: string;
  getsheet: boolean = false;
  
  constructor(public _service:AllModulesService, public _fb:FormBuilder, public httpClient:HttpClient, private router: Router) { }

  ngOnInit(): void { 
   
    this.host=window.location.origin;
   
    this.employeeImport=this._fb.group({
      givenFor:['']
    })
  }
  exportexcel(): void
  {
   
    // let element = document.getElementById('excel-table');
    // const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
  
    // const wb: XLSX.WorkBook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
      
    // XLSX.writeFile(wb, this.fileName);
    let url = `${this.host}`+"/assets/Excle/employees.xlsx";
    // let url = "http://192.168.0.117:4200/assets/Excle/employees.xlsx";
    this.filenameurl=url;
    console.log(url);
    this.httpClient.get(url, { responseType: 'blob' }).subscribe(val => {
      // this.zipdownload=true;
      const url = URL.createObjectURL(val);
      this.downloadUrl(url, "employees" + '.xlsx');
      URL.revokeObjectURL(url);

    });
  }
  downloadUrl(url: string, fileName: string) {
    const a: any = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.style = 'display: none';
    a.click();
    a.remove();
  }
  onChange(event){
    this.file=event.target.files[0];
    if (this.file.type=="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"){
      this.disabled=false
      this.errorMessage=''
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Invalid file type',
        
      })
      this.myInputVariable.nativeElement.value="";
      this.disabled=true
    }

  }
  getSheet(){
    this.getsheet = true
 let formData = new FormData();
    formData.append('file',this.file);
    this.disabled=true
    // console.log(formData)
    this._service.uploadFile(formData, 'employee_master/getsheets').subscribe((res)=>{
      this.sheet =res;
      if(res){
        this.getsheet = false
      }
      this.disabled=false
    })
  }
  submitLoader : boolean = false
  submit(){
    let value = this.employeeImport.value.givenFor
    this.disabled=true
let parts=value.split("~");
console.log(parts[0])
console.log(parts[1])

if (parts[0]!='' && parts[1]!=''){
  this.submitLoader = true
  let formData = new FormData();
 formData.append('file',this.file);
    // console.log(this.formData)
formData.append('sheetName',parts[1])
formData.append('sheetIndex',parts[0])
Swal.fire({
  title: 'Loading...',
  allowEscapeKey: false,
  allowOutsideClick: false,
  showConfirmButton: false,
  didOpen: () => {
    Swal.showLoading()
  }
});
     this._service.uploadFile(formData, 'employee_master/uploadfileexcel').subscribe((res)=>{
      if(res.respose=='Success'){
        Swal.fire({
         
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500,
          didOpen: () => {
            Swal.hideLoading()
          }
        })
        this.cancel();
        this.submitLoader = false
      
              }
             else {
              this.errorMessage=res.message
              this.submitLoader = false
              Swal.fire({
                icon: 'error',
                title: 'There is an error while import',
                showConfirmButton: false,
                timer: 1500,
                didOpen: () => {
                  Swal.hideLoading()
                }
              })
             }
     

           
    })
  
}
 else{
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Something went wrong!',
    footer: 'Select a file before Submit'
  })
  this.cancel();
 }
}

 

  
    // this.InputVar.nativeElement.value = "";
    cancel(){
      console.log(this.myInputVariable.nativeElement.value="")
      this.myInputVariable.nativeElement.value="";
      this.employeeImport.reset();
      this.sheet=''
    }
    // getIPAddress()
    // {
    //   this.httpClient.get("http://api.ipify.org/?format=json").subscribe((res:any)=>{
    //     this.ipAddress = res.ip;
    //     console.log(this.ipAddress)
    //   });
    // }
  }
