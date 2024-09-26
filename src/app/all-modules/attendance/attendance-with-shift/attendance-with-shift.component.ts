import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { AllModulesService } from '../../all-modules.service';
@Component({
  selector: 'app-attendance-with-shift',
  templateUrl: './attendance-with-shift.component.html',
  styleUrls: ['./attendance-with-shift.component.css']
})
export class AttendanceWithShiftComponent implements OnInit {
  @ViewChild('myInput')
  myInputVariable: ElementRef;
  fileName= 'importAttendance.xlsx';
  file: any;
  sheet: any;
  importAttendanceForm:FormGroup
  filenameurl: string;
  disabled: boolean = true;
  errorMessage: any;
  host: string;
  constructor(public _service:AllModulesService, public _fb:FormBuilder, public httpClient:HttpClient) { }

  ngOnInit(): void { 
    this.host=window.location.origin;
this.importAttendanceForm=this._fb.group({
  givenFor:['']
})

  }
  exportexcel(): void
  {
  

    let url = this.host+"/assets/Excle/atendenceWithShift.xlsx";
    this.filenameurl=url;
    console.log(url);
    this.httpClient.get(url, { responseType: 'blob' }).subscribe(val => {
      // this.zipdownload=true;
      const url = URL.createObjectURL(val);
      this.downloadUrl(url, "attendanceWithShift" + '.xlsx');
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
    this._service.uploadFile(formData, 'ImportEmployeeShiftChangeDetailsMaster/getsheets').subscribe((res)=>{
      this.sheet =res;
console.log(res)
    })
  }
  submit(){
    let value = this.importAttendanceForm.value.givenFor
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
     this._service.uploadFile(formData, 'ImportEmployeeShiftChangeDetailsMaster/uploadfileexcel').subscribe((res)=>{
      
     
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
                title: 'Error While Import',
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
            this.importAttendanceForm.reset();
            this.sheet=''
}
 
}
cancel(){
  this.myInputVariable.nativeElement.value="";
  this.importAttendanceForm.reset();
  this.sheet='';
  this.errorMessage='';
}
}
