import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AllModulesService } from '../../all-modules.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-insertsetting',
  templateUrl: './insertsetting.component.html',
  styleUrls: ['./insertsetting.component.css']
})
export class InsertsettingComponent implements OnInit {
  insertSetting:FormGroup;
  showMyContainer: boolean=false;
  data: any;
  dtOptions: { pagingType: string; pageLength: number; processing: boolean; dom: string; buttons: string[]; };
  data1: any=[];
  editId: any;

  constructor(public fb:FormBuilder,public service:AllModulesService,public router: Router) { }

  ngOnInit(): void {
    this.insertSetting=this.fb.group({
    branchSetting:[''],
    date:['']
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
  this.getAll();
  }

  showContainer(){
    this.showMyContainer=true;
  }

  hideMyContainer(){
    this.showMyContainer=false
   this.insertSetting.reset()
  }
  submit(){
    console.log(this.editId)
    let url='insertSetting'
    let paramaterName='';
    let paramaterStatus='';
    let softExpiryDate='';
    if( this.insertSetting.value.branchSetting){
      paramaterName="branch";
      paramaterStatus= this.insertSetting.value.branchSetting;
    }
    if(this.insertSetting.value.date){
      softExpiryDate=this.insertSetting.value.date
    }
    let data={
    "settingParameters": [
        {
            "paramaterName":paramaterName,
            "paramaterStatus":paramaterStatus
        }
    ],
    "softExpiryDateSetting": {
    "softExpiryDate":softExpiryDate
    }
  }
  console.log(data)
  this.service.add(data,url).subscribe((res)=>{
    console.log(res)
  if(res.respose=='Success')
  {
    Swal.fire({
      icon:'success',
      title:'Success',
      text:res.message
    })
    this.cancel();
  } 
  else{
    Swal.fire({
      icon:'error',
      title:'Error',
      text:res.message
    })
  }  
})
}

getAll(){
  let url='getSettingList'
  this.service.get(url).subscribe((res)=>{
    if(res){
      res[0].settingParameters.forEach((element)=>{
        console.log(element)
        let softExpiryDate='';
        if(res[0].softExpiryDateSetting!=null){
          softExpiryDate=res[0].softExpiryDateSetting.softExpiryDate
        }
      this.data1.push({'settingId':res[0].settingId,'paramaterName':element.paramaterName,'paramaterStatus':element.paramaterStatus,'softExpiryDate':softExpiryDate})
      })
      this.data=this.data1
      console.log(this.data)
    }
  })
}

edit(id){
  this.editId=id
  this.showMyContainer=true;
  let url = 'getSettingById/'+`${id}`
  this.service.get(url).subscribe((res)=>{
    var datePipe = new DatePipe('en-US');
    let exDate = datePipe.transform(res.softExpiryDateSetting.softExpiryDate, 'dd-MM-YYYY');
    console.log(exDate)
  this.insertSetting.get('branchSetting').setValue(res.settingParameters[0].paramaterStatus)
  this.insertSetting.get('date').setValue(exDate)
  })
}


convertDate(inputFormat) {
  function pad(s) {
      return s < 10 ? '0' + s : s;
  }
  const parts = inputFormat.split('-');
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; 
    const year = parseInt(parts[2], 10);
    const d = new Date(year, month, day);
    if (!isNaN(d.getTime())) {
      return [
        d.getFullYear(),
        pad(d.getMonth() + 1), 
        pad(d.getDate())
      ].join('-');
    }
  }
}

update(id){
  let url='updateSetting/'+id
  let paramaterName='';
  let paramaterStatus='';
  let softExpiryDate='';
   if( this.insertSetting.value.branchSetting){
    paramaterName="branch";
    paramaterStatus= this.insertSetting.value.branchSetting;
   }
   if(this.insertSetting.value.date){
   console.log(this.insertSetting.value.date)
   softExpiryDate=this.convertDate(this.insertSetting.value.date)
   console.log(this.convertDate(this.insertSetting.value.date))
   }
   let data={
   "settingParameters": [
          {
            "paramaterName":paramaterName,
            "paramaterStatus":paramaterStatus
          }
      ],
      "softExpiryDateSetting": {
      "softExpiryDate":softExpiryDate
    }
    }
   this.service.add(data,url).subscribe((res)=>{
    if(res.respose=='Success')
    {
     Swal.fire({
       icon:'success',
       title:'Success',
       text:'Branch setting successfully updated!'
     })
     this.cancel();
     this.getAll();
    }
    else{
     Swal.fire({
       icon:'error',
       title:'Error',
       text:'Something went wrong !'
     })
    }  
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
  let url='deleteSetting/'+id
  this.service.get(url).subscribe((res)=>{
  if(res.respose=='Success')
  {
    Swal.fire({
      icon:'success',
      title:'Success',
      text:'Branch Setting Successfully Deleted!'
    })
    this.cancel();
    this.getAll();
  }
  else{
    Swal.fire({
      icon:'error',
      title:'Error',
      text:'Something went wrong !'
    })
  }  
  })
}
})
}

cancel(){
  const currentRoute = this.router.url;
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]); 
  }); 
}

}
