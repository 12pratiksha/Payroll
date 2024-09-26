import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { AllModulesService } from '../../all-modules.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.css']
})
export class TrainingsComponent implements OnInit {
  quizForm:FormGroup;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  showMyContainer:boolean=false;
  tableData: any;
  quiz: any[] = [];
  length: any;
  pageSize = 1; // Number of questions per page
  pageIndex = 0; // Current page index
  quizId: any;
  newData: any=[];
  constructor(public service:AllModulesService,public fb:FormBuilder) { }

  ngOnInit(): void {
    this.quizForm=this.fb.group({
    });
      
    this.getAll();
  }
  show(){
    this.showMyContainer=true
  }
  hide(){
    this.showMyContainer=false
  }
  getQuiz(item){
   
    console.log(item)
    let id=item.certificationId
    let url='getCertification/'+id
    this.service.get(url).subscribe((res)=>{
      this.quizId=res
      this.quiz=res.quiz
      this.length=this.quiz.length
      console.log(this.quiz)
      console.log(this.length)
   
    this.showMyContainer=true;
    this.quiz.forEach((question, index) => {
     // this.quizForm.addControl('answer' + index, new FormControl(''));
     this.quizForm.addControl(`answer${index}`, new FormControl(''));
     this.quizForm.addControl(`index${index}`, new FormControl(index));
    })
  })

  }
  getAll(){
    let url='getAllCertification'
    this.service.get(url).subscribe((res)=>{
      this.tableData=res
      // this.tableData.forEach(element=>{
      //   console.log
      //   this.quiz=element.quiz
      //   this.length=this.quiz.length
      //   console.log(this.quiz)
        
        
      // });

    })
  }
  submit(){
    let url='addSubmitedQuize'
    let empid=localStorage.getItem('empid')
    console.log(this.quizForm)
    let ans=[]
    for(let i=0;i<=this.quiz.length-1;i++)
    {
      this.newData.push({'quizId':this.quiz[i].quizId,'correctoption':this.quiz[i].correctoption,'ansergiven':''})
    }
    console.log(this.newData)
  let data={
  "certificationId":this.quizId.certificationId,
  "employeeId":empid,
  "score": "0",
  "emplyeeAnsersQuiz":this.newData
}
console.log(data)
Swal.fire({
  title: 'Do you really want to Submit test?',
  text: "",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes'
}).then((result) => {
  if (result.isConfirmed) {
this.service.add(data,url).subscribe((res)=>{
  console.log(res)
  if(res.respose=='Success'){
    Swal.fire({
      icon:'success',
      title:'Success',
      text:'Test is successfully deleted! '

    })
    this.hide();
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
