import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AllModulesService } from '../../all-modules.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-exportdatabase',
  templateUrl: './exportdatabase.component.html',
  styleUrls: ['./exportdatabase.component.css']
})
export class ExportdatabaseComponent implements OnInit {
  exportDatabase:FormGroup;
  constructor(public fb:FormBuilder, public service:AllModulesService) { }

  ngOnInit(): void {
    this.exportDatabase=this.fb.group({
      databaseName:['',Validators.required]
    })

  }
  export(){
    Swal.fire({
      title: 'Loading...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading()
      }
    })
    let url='exportDatabase'
    this.service.getPlainRes(url).subscribe((res)=>{
      console.log(res)
    if(res!=null){
    Swal.fire({

    icon: 'success',
    title: 'Database exported successfully !',
    showConfirmButton: false,
    timer: 1500,
    didOpen: () => {
      Swal.hideLoading()
    }
  })
}
else{
    Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: "Something went wrong",
    })
}
    })
  }
}