import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AllModulesService } from '../../all-modules.service';
import Swal from 'sweetalert2';
import { title } from 'process';
import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-addcertification',
  templateUrl: './addcertification.component.html',
  styleUrls: ['./addcertification.component.css']
})
export class AddcertificationComponent implements OnInit {
  addCertification:FormGroup;
  showMyContainer:boolean=false;
  tableData: any;
  dtOptions: { pagingType: string; pageLength: number; processing: boolean; dom: string; buttons: string[]; };
  editId: any;
  constructor(public fb:FormBuilder,public router:Router,public service:AllModulesService, public datePipe:DatePipe) { }

  ngOnInit(): void {
    this.addCertification=this.fb.group({
      title:['',Validators.required],
      type:['',Validators.required],
      date:['',Validators.required],
      time:['',Validators.required],
      startDate:['',Validators.required],
      endDate:['',Validators.required],
      quizArray:this.fb.array([]),
      
    })
    this.getAll();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'Bfrtip',
      buttons: [
            'copy', 'csv', 'excel', 'print'
        ]
  
    };
  }
  showContainer(){
    this.showMyContainer=true;
    this.addCertification.reset();
  }
  hideContainer(){
    this.showMyContainer=false;
  }

  cancel() {
    const currentRoute = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]);
    });
    // this.();
  }

  createRequest():FormGroup{
    return this.fb.group({
      question:['',Validators.required],
      optionA:['',Validators.required],
      optionB:['',Validators.required],
      optionC:['',Validators.required],
      optionD:['',Validators.required],
      correctoption:['',Validators.required],
      // ansergiven:[''],
   }) 
   
  }
  
  quizArray:FormArray
  addRequest():void{
  this.quizArray=this.addCertification.get('quizArray') as FormArray;
  this.quantities().push(this.createRequest());
  }
  
  remove(i: number) {
    console.log(this.quizArray)
    this.quantities().removeAt(i);
  }
  
  quantities(): FormArray {
    return this.addCertification.get('quizArray') as FormArray;
  }
  onChange(event){

  }

  submit(){
    let form=this.addCertification.value
    let url='addCertification'
    let data={
    "title": form.title,
    "type": form.type,
    "createdate": form.date,
    "createtime": form.time,
    "startdate":form.startDate,
    "enddate":form.endDate,
    "quiz": form.quizArray
    }
    if(this.addCertification.status=='VALID'){
    this.service.add(data,url).subscribe((res)=>{
      if(res.respose=='Success'){
        Swal.fire({
          icon:'success',
          title:'Success',
          text:'Certification added successfully!',
          showConfirmButton: false,
        })
        this.hideContainer();
        this.getAll();
      }
      else{
       Swal.fire({ 
        icon:'error',
        title:'Error',
        text:'Something went wrong!'
      })
      }
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
  getAll(){
    let url='getAllCertification'
    this.service.get(url).subscribe((res)=>{
      this.tableData=res

    })
  }
  edit(item){
    console.log(item)
    this.editId=item.certificationId
    let url='getCertification/'+this.editId
    this.service.get(url).subscribe((res)=>{
      let date=this.datePipe.transform(res.createdate,'dd-MM-YYYY')
      let sDate=this.datePipe.transform(res.startdate,'dd-MM-YYYY')
      let eDate=this.datePipe.transform(res.enddate,'dd-MM-YYYY')
      this.addCertification.get('title').setValue(res.title)
      this.addCertification.get('type').setValue(res.type)
      this.addCertification.get('date').setValue(date)
      this.addCertification.get('time').setValue(res.createtime)
      this.addCertification.get('startDate').setValue(sDate)
      this.addCertification.get('endDate').setValue(eDate)
      res.quiz.forEach(element => {
        this.quantities().push(this.fb.group({
      question:element.question,
      optionA:element.optionA,
      optionB:element.optionB,
      optionC:element.optionC,
      optionD:element.optionD,
      correctoption:element.correctoption,
        }))
        
      });

    })
    this.showMyContainer=true;
  }
  
  updateForm(id){
    let url='updateCertification/'+id
    let form=this.addCertification.value
    let date=this.datePipe.transform(form.date,'YYYY-MM-dd')
    let startDate=this.datePipe.transform(form.startDate,'YYYY-MM-dd')
    let endDate=this.datePipe.transform(form.endDate,'YYYY-MM-dd')
    let data={
    "title": form.title,
    "type": form.type,
    "createdate": date,
    "createtime": form.time,
    "startdate":startDate,
    "enddate":endDate,
    "quiz": form.quizArray
    }
    if(this.addCertification.status=='VALID'){
    this.service.add(data,url).subscribe((res)=>{
      if(res.respose=='Success'){
        Swal.fire({
          icon:'success',
          title:'Success',
          text:'Certification updated successfully!',
          showConfirmButton: false,
        })
        this.hideContainer();
      }
      else{
       Swal.fire({ 
        icon:'error',
        title:'Error',
        text:'Something went wrong!'
      })
      }
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

  delete(item){
    Swal.fire({
      title: 'Do you really want to delete ?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
    let url='training/deleteCertification/'+item.certificationId
    this.service.get(url).subscribe((res)=>{
      if(res.respose=='Success'){
        Swal.fire({
          icon:'success',
          title:'Success',
          text:'Certification is successfully deleted! '
  
        })
        this.cancel();
        this.getAll()
      }
      else{
        Swal.fire({
          icon:'error',
          title:'Error',
          text:'Something went wrong'
        })
      }  
    })

  }
  else{
   this.getAll();
  }
})
}

close(item){
  Swal.fire({
    title: 'Do you want to stop ?',
    text: "",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes'
  }).then((result) => {
    if (result.isConfirmed) {
     
  let url='training/startStopCertification?status='+false+'&certificationId='+item.certificationId
  let params= new HttpParams();
   params= params.append('status',false);
   params= params.append('certificationId',item.certificationId)
  this.service.add(params ,url).subscribe((res)=>{
    if(res.respose=='Success'){
      Swal.fire({
        icon:'success',
        title:'Success',
        text:'Certification has been stoped!'

      })
      this.cancel();
      this.getAll()
    }
    else{
      Swal.fire({
        icon:'error',
        title:'Error',
        text:'Something went wrong'
      })
    }  
  })
}
else{
  this.getAll();
}
  })

}

start(item){
  Swal.fire({
    title: 'Do you want to start?',
    text: "",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes'
  }).then((result) => {
    if (result.isConfirmed) {

  let url='training/startStopCertification?status='+true+'&certificationId='+item.certificationId
  let params= new HttpParams();
   params= params.append('status',true);
   params= params.append('certificationId',item.certificationId)
  this.service.add(params,url).subscribe((res)=>{
    if(res.respose=='Success'){
      Swal.fire({
        icon:'success',
        title:'Success',
        text:'Certification has been started! '

      })
      this.cancel();
      this.getAll()
    }
    else{
      Swal.fire({
        icon:'error',
        title:'Error',
        text:'Something went wrong'
      })
    }  
  })
}
else{
  this.getAll();
}
  })
}
}
