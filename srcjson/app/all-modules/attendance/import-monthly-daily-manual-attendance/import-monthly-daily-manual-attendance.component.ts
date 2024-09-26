import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AllModulesService } from '../../all-modules.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-import-monthly-daily-manual-attendance',
  templateUrl: './import-monthly-daily-manual-attendance.component.html',
  styleUrls: ['./import-monthly-daily-manual-attendance.component.css']
})
export class ImportMonthlyDailyManualAttendanceComponent implements OnInit {
  @ViewChild('myInput')
  myInputVariable: ElementRef;
  fileName= 'ImportMonthlyDailyManualAttendance.xlsx';
  file: any;
  sheet1: any;
  importDailyManualAttendanceForm:FormGroup
  filenameurl: string;
  disabled: boolean = true;
  errorMessage: any;
  host: string;
  constructor(public _service:AllModulesService, public _fb:FormBuilder, public httpClient:HttpClient) { }

  ngOnInit(): void { 
    this.host=window.location.origin;
this.importDailyManualAttendanceForm=this._fb.group({
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
    let url = this.host+"/assets/Excle/ImportMonthlyDailyManualAttendance.xlsx";
    this.filenameurl=url;
    console.log(url);
    this.httpClient.get(url, { responseType: 'blob' }).subscribe(val => {
      // this.zipdownload=true;
      const url = URL.createObjectURL(val);
      this.downloadUrl(url, "MonthlyDailyManualAttendance" + '.xlsx');
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
      this.errorMessage='';
      this.myInputVariable.nativeElement.value="";
      this.disabled=true;
      
    }
  }
  getSheet(){
 let formData = new FormData();
    formData.append('file',this.file);
    // console.log(formData)
    this._service.uploadFile(formData, 'uploadDayWiswAttendanceInexcel/getsheets').subscribe((res)=>{
      this.sheet1 =res;
      // this.sheet1.splice(0,0,"--Select--");
      // this.importAttendanceForm.get('givenFor').setValue(this.sheet1[0])


      console.log(this.sheet1)


      // this.sheet1.push("--Select--")
      // this.importAttendanceForm.get('givenFor').setValue(this.sheet1[0]);
      // console.log()
      

    })
  }
  submit(){
    let value = this.importDailyManualAttendanceForm.value.givenFor
    
let parts=value.split("~");
console.log(parts[0])
console.log(parts[1])

if (parts[1]!='' && parts[0]!=''){
  let formData = new FormData();
 formData.append('file',this.file);
    // console.log(this.formData)
formData.append('sheetName',parts[0])
formData.append('sheetIndex',parts[1])
Swal.fire({
  title: 'Loading...',
  allowEscapeKey: false,
  allowOutsideClick: false,
  showConfirmButton: false,
  didOpen: () => {
    Swal.showLoading()
  }
});
     this._service.uploadFile(formData, 'uploadDayWiswAttendanceInexcel/uploadfileexcel').subscribe((res)=>{
      
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
            this.importDailyManualAttendanceForm.reset();
            this.sheet1=''
}
 
}
cancel(){
  this.myInputVariable.nativeElement.value="";
  this.importDailyManualAttendanceForm.reset();
  this.sheet1='';
  this.errorMessage='';
}

}
