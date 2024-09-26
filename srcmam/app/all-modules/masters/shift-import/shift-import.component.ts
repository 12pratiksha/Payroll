import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { AllModulesService } from '../../all-modules.service';
@Component({
  selector: 'app-shift-import',
  templateUrl: './shift-import.component.html',
  styleUrls: ['./shift-import.component.css']
})
export class ShiftImportComponent implements OnInit {
  @ViewChild('myInput')
  myInputVariable: ElementRef;
  file: any;  
    fileName= 'importShifts.xlsx';
  sheet: any;
  shiftImport:FormGroup
  filenameurl: string;
  disabled: boolean = true;
  errorMessage: string;
  host: string;
  

  constructor(public _service:AllModulesService, public _fb:FormBuilder, public httpClient:HttpClient) { }

  ngOnInit(): void { 
    this.host=window.location.origin;
    this.shiftImport=this._fb.group({
      givenFor:['']
    })
  }
  exportexcel(): void
  {
    let url = this.host+"/assets/Excle/ShiftMaster.xlsx";
  
    console.log(url);
    this.httpClient.get(url, { responseType: 'blob' }).subscribe(val => {
      // this.zipdownload=true;
      const url = URL.createObjectURL(val);
      this.downloadUrl(url, "shift" + '.xlsx');
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
    this.file=event.target.files[0]
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
      this.errorMessage='';
      this.myInputVariable.nativeElement.value="";
      this.disabled=true;
      
    }
  }
  getSheet(){
 let formData = new FormData();
    formData.append('file',this.file);
    // console.log(formData)
    this._service.uploadFile(formData, 'ShiftMaster_master/getsheets').subscribe((res)=>{
      this.sheet =res;

    })
  }
  submit(){
    let value = this.shiftImport.value.givenFor
    
let parts=value.split("~");
console.log(parts[1])
console.log(parts[0])

if (parts[0]!='' && parts[1]!=''){
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
     this._service.uploadFile(formData, 'ShiftMaster_master/uploadfileexcel').subscribe((res)=>{
      this.sheet =res;
      if(res.respose=='Success'){

       //alert('success')
        Swal.fire({
         
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500,
          didOpen: () => {
            Swal.hideLoading()
          }
        })
              }
             else {
              this.errorMessage=res.message
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
            this.disabled=true;
            this.myInputVariable.nativeElement.value="";
            this.shiftImport.reset();
            this.sheet=''
}
   
}
cancel(){
  this.myInputVariable.nativeElement.value="";
  this.shiftImport.reset();
  this.sheet='';
  this.errorMessage='';
}
  }
