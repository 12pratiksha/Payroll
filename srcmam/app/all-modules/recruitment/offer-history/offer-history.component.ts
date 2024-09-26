import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AllModulesService } from '../../all-modules.service';

@Component({
  selector: 'app-offer-history',
  templateUrl: './offer-history.component.html',
  styleUrls: ['./offer-history.component.css']
})
export class OfferHistoryComponent implements OnInit {
  filterForm:FormGroup
  dtOptions: { pagingType: string; pageLength: number; processing: boolean; dom: string; buttons: string[]; };
  tableData: any;
  candidate: any;
  baseurl: string;
  

  constructor(public service:AllModulesService,public fb:FormBuilder) { }

  ngOnInit(): void {
    this.baseurl=localStorage.getItem('baseurl')
    this.list();
    this.filterForm=this.fb.group({
      candidate:['',Validators.required]
    })
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'print', 
        ]
    };
  }
  list(){
    let url="getSelectedCandiateList"
    this.service.get(url).subscribe(res=>{

      this.candidate = res
    
      
      
    });

      
  }
  search(){
  console.log(this.filterForm)
  if(this.filterForm.status=='VALID'){
  let url='getCandiateOfferHistroyById/'+this.filterForm.value.candidate
  this.service.get(url).subscribe((res)=>{
    this.tableData=res
   
  })
}
else{
  Swal.fire({
    icon:'error',
    title:'Error',
    text:'Something went wrong!'
  })
}
}
}
