import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AllModulesService } from '../../all-modules.service';
import { HttpParams } from '@angular/common/http';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-import-database',
  templateUrl: './import-database.component.html',
  styleUrls: ['./import-database.component.css']
})
export class ImportDatabaseComponent implements OnInit {
  importDatabase:FormGroup;
  data: any;
  constructor(public fb:FormBuilder,public service:AllModulesService,) { }

  ngOnInit(): void {
    this.importDatabase=this.fb.group({
      databaseName:['',Validators.required]
    })
  }
  onChange(event, type){
    let file=event.target.files[0]
    console.log(file.name)
 
    Swal.fire({
      title: 'Loading...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading()
      }
    })
    // let url='importDatabase?dbName='+file.name
    let url='uploasDBFile';
    let formData = new FormData();
    formData.append('file',file);
    this.service.add(formData,url).subscribe((res)=>{
      console.log(res)
      this.data=res;
      if(res!=null)
     {
      Swal.fire({
        icon: 'success',
        text:res.data.DBName +' '+'Database is Successfully Imported !',
        showConfirmButton: false,
        timer: 1500,
        didOpen: () => {
          Swal.hideLoading()
        }
      })
      this.importDatabase.reset();
     }
     

    })
  }
}