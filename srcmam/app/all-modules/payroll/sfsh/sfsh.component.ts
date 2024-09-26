import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { AllModulesService } from '../../all-modules.service';

@Component({
  selector: 'app-sfsh',
  templateUrl: './sfsh.component.html',
  styleUrls: ['./sfsh.component.css']
})
export class SfshComponent implements OnInit {
  @ViewChild('myInput')
  myInputVariable: ElementRef;
  fileName= 'ImportSalaryWithSalaryhead.xlsx';
  file: any;
  sheet: any;
  importDesignaton1:FormGroup
  errorMessage: any;
  disabled:boolean=true;
  filenameurl: string;
  host: string;
   myCheckbox:boolean=false;


  constructor(public _service:AllModulesService, public _fb:FormBuilder, public httpClient:HttpClient) {
    
   }

  ngOnInit(): void { 
    this.host=window.location.origin;
this.importDesignaton1=this._fb.group({
  givenFor:['']
})

  }
  
    

  
  exportexcel(): void
  {
     console.log("main Success")
    // let element = document.getElementById('excel-table');
    // const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
 
    // const wb: XLSX.WorkBook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
   
    // XLSX.writeFile(wb, this.fileName);
    let url = this.host+"/assets/Excle/ImportSalaryWithSalaryhead.xlsx";
    this.filenameurl=url;
    console.log(url);
    this.httpClient.get(url, { responseType: 'blob' }).subscribe(val => {
      // this.zipdownload=true;
      const url = URL.createObjectURL(val);
      this.downloadUrl(url, "ImportSalaryWithSalaryhead" + '.xlsx');
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
  this.myInputVariable.nativeElement.value="";
  this.disabled=true;
  this.errorMessage='';
}
  }
  getSheet(){
    console.log("main sheet Success")
 let formData = new FormData();
    formData.append('file',this.file);
   
    this._service.uploadFile(formData, 'SalaryWithoutFormula_master/getsheets').subscribe((res)=>{
     
      this.sheet =res;

    })
  }

  



  submit(){
    console.log("main submit Success")
    let value = this.importDesignaton1.value.givenFor
    console.log(value)
let parts=value.split("~");


if (parts[1]!='' && parts[0]!=''){
  let formData = new FormData();
 formData.append('file',this.file);
    
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



     this._service.uploadFile(formData, 'SalaryWithoutFormula_master/uploadfileexcel').subscribe((res)=>{
      console.log(res);
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
    this.importDesignaton1.reset();
    this.sheet=''
}
 else{
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Something went wrong!',
    footer: 'Select a file before Submit'
  })
 
 }
  }

  cancel(){
    this.myInputVariable.nativeElement.value="";
    this.importDesignaton1.reset();
    this.sheet=''
  }





  checkCheckBoxvalue(e){
console.log(e.checked);
this.myCheckbox=e.checked;
console.log(this.myCheckbox);
}






exportexcel1(): void
  {
    console.log("other Success")
    // let element = document.getElementById('excel-table');
    // const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
 
    // const wb: XLSX.WorkBook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
   
    // XLSX.writeFile(wb, this.fileName);
    let url = this.host+"/assets/Excle/ImportSalaryWithSalaryheadExtraAllowances.xlsx";
    this.filenameurl=url;
    console.log(url);
    this.httpClient.get(url, { responseType: 'blob' }).subscribe(val => {
      // this.zipdownload=true;
      const url = URL.createObjectURL(val);
      this.downloadUrl(url, "ImportSalaryWithSalaryheadExtraAllowances" + '.xlsx');
      URL.revokeObjectURL(url);

    });
  }
  getSheet1(){
    console.log("other sheet Success")
    let formData = new FormData();
       formData.append('file',this.file);
      
       this._service.uploadFile(formData, 'ExtraSalaryWithoutFormula_master/getsheets').subscribe((res)=>{
        
         this.sheet =res;
   
       })
     }

    submit1(){
      console.log("other submit Success")
    
      let value = this.importDesignaton1.value.givenFor
      console.log(value)
  let parts=value.split("~");
  
  
  if (parts[1]!='' && parts[0]!=''){
    let formData = new FormData();
   formData.append('file',this.file);
      
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
  
  
  
       this._service.uploadFile(formData, 'ExtraSalaryWithoutFormula_master/uploadfileexcel').subscribe((res)=>{
        console.log(res);
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
      this.importDesignaton1.reset();
      this.sheet=''
  }
   else{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      footer: 'Select a file before Submit'
    })
   
   }
    }
  }
