import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as XLSX from 'xlsx';
import { AllModulesService } from '../../all-modules.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-shift-assign-import',
  templateUrl: './shift-assign-import.component.html',
  styleUrls: ['./shift-assign-import.component.css']
})
export class ShiftAssignImportComponent implements OnInit {
  file: string | Blob;  
    fileName= 'assignShift.xlsx';
  sheet: any;
  shiftAssignImport:FormGroup
  errorMessage: any;
  host: string;
  

  constructor(public _service:AllModulesService, public _fb:FormBuilder,public httpClient:HttpClient) { }

  ngOnInit(): void { 
    this.host=window.location.origin;
    this.shiftAssignImport=this._fb.group({
      givenFor:['']
    })
  }
  exportexcel(): void
  {
    let url = this.host+"/assets/Excle/assignShift.xlsx";
  
    console.log(url);
    this.httpClient.get(url, { responseType: 'blob' }).subscribe(val => {
      // this.zipdownload=true;
      const url = URL.createObjectURL(val);
      this.downloadUrl(url, "assignShift" + '.xlsx');
      URL.revokeObjectURL(url);

    });
    // /* pass here the table id */
    // let element = document.getElementById('excel-table');
    // const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
   
 
    // /* generate workbook and add the worksheet */
    // const wb: XLSX.WorkBook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    // /* save to file */  
    // XLSX.writeFile(wb, this.fileName);
    // console.log(this.fileName)
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

  }
  getSheet(){
 let formData = new FormData();
    formData.append('file',this.file);
    // console.log(formData)
    this._service.uploadFile(formData, 'EmployeeAssignShiftList_master/getsheets').subscribe((res)=>{
      this.sheet =res;

    })
  }
  submit(){
    let value = this.shiftAssignImport.value.givenFor
    
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
     this._service.uploadFile(formData, 'EmployeeAssignShiftList_master/uploadfileexcel').subscribe((res)=>{
      this.sheet =res;
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
    }
    else{
      this.errorMessage=res.message
              Swal.fire({
         
                icon: 'error',
                title: res.message,
                timer: 1500,
                didOpen: () => {
                  Swal.hideLoading()
                }
              })
    }
    })
}
 
  }
}