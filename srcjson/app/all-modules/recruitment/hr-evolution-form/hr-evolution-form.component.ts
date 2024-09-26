import { param, data } from 'jquery';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AllModulesService } from '../../all-modules.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import Swal from "sweetalert2";
import { isValidDate } from '@fullcalendar/angular';

@Component({
  selector: 'app-hr-evolution-form',
  templateUrl: './hr-evolution-form.component.html',
  styleUrls: ['./hr-evolution-form.component.css']
})
export class HrEvolutionFormComponent implements OnInit {
  candidateEvolutionForm:FormGroup
showMyContainer:boolean=false;
tableData: any=[];


shiftTimings=[
{id:1,name:'Day Shift'},
{id:2,name:'Night Shift'},
{id:3,name:'Any Shift'}
]

dtOptions: { pagingType: string; pageLength: number; processing: boolean; dom: string; buttons: string[]; };
  roundId: any;
  data: any;
  pTechRDetails: any=[];
  pHrRDetails: any=[];
  data1: any=[];
  department: any;
  approver: any;
  designation: any;
  requirementid: any;
  date: Date;

constructor(public fb:FormBuilder,public service:AllModulesService,private router:Router, public datePipe:DatePipe) {
  let param=this.router.getCurrentNavigation()?.extras.queryParams;
  if(param){
    this.roundId=JSON.parse(JSON.stringify(param));
    console.log(this.roundId)
    this.requirementid=this.roundId.requirementId;

} 
 }

ngOnInit(): void {
  this.date= new Date()
  console.log(this.date)
  this.getDesignation()
this.getApprover();
this.getDept();
  
  this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 10,
    processing: true,
    dom: 'Bfrtip',
      buttons: [
          'copy', 'csv', 'excel', 'print', 
      ]
  };

  
  this.candidateEvolutionForm=this.fb.group({
    date:[this.date,Validators.required],
    firstName:[''],
    middleName:[''],
    lastName:[''],
    positionAppliedfor:['',],
    totalExperience:['',],
    relevantExperience:[''],
    qualification:['',],
    comments:[''],
    lastEmployer:[''],
    reasonforLeaving:[''],
    presentSalary:['',],
    expectedSalary:['',Validators.required],
    communicationSkills:['',],
    professionalPresentation:[''],
    hradditionalComments:[''],
    suitableShiftTimings:['',],
    expectedDOJ:['',Validators.required],
    hasCandidateAppliedBefore:[''],
    overallEvaluationAndRecommendation:[''],
    workedAtIMHbefore:[''],
    jobKnowledge:[''],
    candidateEnthusiasm:[''],
    decisionMaking:[''],
    personalAppearance:[''],
    hodAdditionalComments:[''],
    shiftTimingsDepartmentRequirement:[''],
    hiringComments:[''],
    managementComments:[''],
    salaryOffered:[''],
    shiftsAgreedOn:[''],
    otherBenefits:[''],
    additionalRemarks:[''],
    status:[''],
    select:['']




  })
}
applydesg:any;
getCandDetails(){
  let id=this.roundId.requirementId
  this.service.get('getByRequirementId/'+id).subscribe((res)=>{

    let desg=res.designation;


    if( isNaN(desg)){
      this.applydesg=desg;
     }else{
      
      let result3 =this.designation.filter((design: any) =>
      (design.designationMasterId==desg) )
    desg = result3[0].name;
    this.applydesg=desg;
     }
   

    this.data1.push({"designation":desg,"required_exp":res.required_exp,"expected_joining_date":res.expected_joining_date,"no_of_vacancy":res.no_of_vacancy,"location":res.location,"skills":res.skills,"department":res.department_name,"firstName":res.first_name,"lastName":res.last_name})
    this.getDetails(); 
  })
  
}


async getDesignation(){
  await this.service.get("getAllDesignationMaster").subscribe(async (res)=>{
    this.designation = res
    this.getCandDetails();
  })
}

async getApprover(){
  await this.service.get("employee_master/getemployees").subscribe((res)=>{
    this.approver = res
    
  })
}

async getDept(){
  let url='getAllDepartment'
  await this.service.get(url).subscribe(res=>{
    this.department=res
  })
}
submit(){
  
  let form=this.candidateEvolutionForm.value
console.log(form.date)
  //  const parsedDate1 = new Date(form.date);
  let date=new Date()
  const parsedDate1 = new Date(date);
   console.log(parsedDate1)

const dateArray1 = [
  parsedDate1.getFullYear(),  
  parsedDate1.getMonth() + 1, 
  parsedDate1.getDate()      
];
// console.log(this.roundId)
let id=this.roundId.recno

  let data={
    "date":dateArray1,
    "firstName":form.firstName,
    "middeltName":form.middleName,
    "lastame":form.lastName,
    "positionAppliedfor":form.positionAppliedfor,
    "totalExperience":form.totalExperience,
    "relevantExperience":form.relevantExperience,
    "qualification":form.qualification,
    "lastEmployer":form.lastEmployer,
    "reasonforLeaving":form.reasonforLeaving,
    "comments":form.comments,
    "presentSalary":form.presentSalary,
    "expectedSalary":form.expectedSalary,
    "communicationSkills":form.communicationSkills,
    "professionalPresentation":form.professionalPresentation,
    "HRadditionalComments":form.hradditionalComments,
    "suitableShiftTimings": form.suitableShiftTimings,
    "expectedDOJ":form.expectedDOJ,
    "hasCandidateAppliedBefore":form.hasCandidateAppliedBefore,
    "OverallEvaluationAndRecommendation":form.overallEvaluationAndRecommendation,
    "WorkedAtIMHbefore":form.workedAtIMHbefore,
    "jobKnowledge":form.jobKnowledge,
    "hodAdditionalComments":form.hodAdditionalComments,
    "ShiftTimingsDepartmentRequirement":form.shiftTimingsDepartmentRequirement,
    "hiringComments":form.hiringComments,
    "ManagementComments":form.managementComments,
    "salaryOffered":form.salaryOffered,
    "otherBenefits":form.otherBenefits,
    "additionalRemarks":form.additionalRemarks,
    "scheduleInterviewForRoundId":this.roundId.scheduleId,
    "candidateEnthusiasm":form.candidateEnthusiasm,
    "decisionMaking":form. decisionMaking,
    "candidateid":this.candidateid,
    "recruitmentid":this.requirementid,
    "personalAppearance":form.personalAppearance,
    'status':true
  }
  let url="insertCandidateEvaluationFormHr"
  this.service.add(data,url).subscribe((res)=>{
    if(res.respose=='Success'){
    Swal.fire({
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    })
    // window.location.reload();
    this.router.navigate(['/layout/recruitment/scheduleInterview']);
  
  }
  else{
    Swal.fire({
      icon: 'error',
      title: 'Something went wrong',
      showConfirmButton: false,
      timer: 1500 
    })
  }
  })
}

candidate:any;
candidateid:any;
roundid:any;
getDetails(){
  let id=this.roundId.recno
  let url='getByNoOfRounds/'+id
  this.service.get(url).subscribe((res)=>{
     console.log(res)
 
  let url1='getByApplicantCandiateDetailsId/'+res.applicantCandiateId
  this.service.get(url1).subscribe((res1)=>{
    console.log(res1);
    this.candidate =res1;
this.roundid=id;
    this.candidateid = res.applicantCandiateId
console.log(">>>>>>>>>>>>>>>>>."+id)
    this.candidateEvolutionForm.get('firstName').setValue(res1[0].first_name)
    this.candidateEvolutionForm.get('middleName').setValue(res1[0].middle_name)
    this.candidateEvolutionForm.get('lastName').setValue(res1[0].last_name)
    this.candidateEvolutionForm.get('qualification').setValue(res1[0].qualification)
    this.candidateEvolutionForm.get('totalExperience').setValue(res1[0].experience)
    this.candidateEvolutionForm.get('positionAppliedfor').setValue(this.applydesg)
  
    let url2='getCandidateEvaluationFormByscheduleInterviewForRoundId?scheduleInterviewForRoundId='+id
    this.service.get(url2).subscribe((res)=>{
      console.log(res)
      this.pTechRDetails = res
    
     

      // let url3='getCandidateEvaluationFormHrByscheduleInterviewForRoundId?scheduleInterviewForRoundId='+id
      // this.service.get(url3).subscribe((res)=>{
      //  this.pHrRDetails=res
        
      // })
    });
   
    })

  })
}

getRoundDetails(){
  
}



cancel(){
this.router.navigate(['/layout/recruitment/scheduleInterview'])
}



approve(e,item){
  let id=this.roundId.recno
  if(e==1){
  Swal.fire({
    title:"Are you really want select candidate..?",
    // input: 'text',
    // inputValue: this.inputAdd,
    showCancelButton:true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes'
  }).then(result=>{
    console.log(result);
    if(result.isConfirmed==true)
    {
  let empid=localStorage.getItem('empid')
  let url='SelectCandiateInInterviewByMananger?status='+1+'&manageempId='+empid+'&NoOfRoundsId='+id+'&reason='+result.value
  this.service.get(url).subscribe((res)=>{
  console.log(res)
  if(res.respose=='Success')
          {
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: res.message,
             
            })
          
          }
          else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
              
            })
          }
  
})
}
else{
}
})
  }
  else if(e==2){
   
      Swal.fire({
        title:"Are you really want reject candidate..?",
        // input: 'text',
        // inputValue: this.inputAdd,
        showCancelButton:true,
        confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: 'Yes'
      }).then(result=>{
        console.log(result);
        if(result.isConfirmed==true)
        {
      let empid=localStorage.getItem('empid')
      let url='SelectCandiateInInterviewByMananger?status='+2+'&manageempId='+empid+'&NoOfRoundsId='+id+'&reason='+result.value
      this.service.get(url).subscribe((res)=>{
      console.log(res)
      if(res.respose=='Success')
              {
                Swal.fire({
                  icon: 'success',
                  title: 'Success',
                  text: res.message,
                 
                })
              
              
              }
              else{
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Something went wrong!',
                  
                })
              }
      
  })
    }
    else{

    }
  })
  }else if(e==3){
   
    Swal.fire({
      title:"Are you really want hold candidate..?",
      // input: 'text',
      // inputValue: this.inputAdd,
      showCancelButton:true,
      confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Yes'
    }).then(result=>{
      console.log(result);
      if(result.isConfirmed==true)
      {
    let empid=localStorage.getItem('empid')
    let url='SelectCandiateInInterviewByMananger?status='+3+'&manageempId='+empid+'&NoOfRoundsId='+id+'&reason='+result.value
    this.service.get(url).subscribe((res)=>{
    console.log(res)
    if(res.respose=='Success')
            {
              Swal.fire({
                icon: 'success',
                title: 'Success',
                text: res.message,
               
              })
            
            
            }
            else{
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                
              })
            }
    
})
  }
  else{

  }
})
}
}
}

