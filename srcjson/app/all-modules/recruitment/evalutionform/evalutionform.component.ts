import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AllModulesService } from '../../all-modules.service';
import Swal from 'sweetalert2';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';


@Component({
  selector: 'app-evalutionform',
  templateUrl: './evalutionform.component.html',
  styleUrls: ['./evalutionform.component.css']
})
export class EvalutionformComponent implements OnInit {
  candidateEvolutionForm:FormGroup
  showMyContainer:boolean=false;
  tableData: any=[];
  dtOptions: { pagingType: string; pageLength: number; processing: boolean; dom: string; buttons: string[]; };
  editId: any;
  roundId: any;
  pTechRDetails: any=[];
  pHrRDetails: any=[];
  data1: any=[];
  designation: any;
  date: Date;
  constructor(public fb:FormBuilder,public service:AllModulesService,public router:Router,public _activatedroute:ActivatedRoute) { 
    let param=this.router.getCurrentNavigation()?.extras.queryParams;
  if(param){
    this.roundId=JSON.parse(JSON.stringify(param));
    console.log(this.roundId)
    this.requirementid=this.roundId.requirementId;
    this.getDesignation();

} 
  }

  ngOnInit(): void {
    this.date= new Date()
    this.pTechRDetails=[]
    this.pHrRDetails=[]
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
      firstName:['',Validators.required],
      middleName:['',Validators.required],
     lastName:['',Validators.required],
      positionAppliedfor:['',Validators.required],
      totalExperience:['',Validators.required],
      relevantExperience:['',Validators.required],
      qualification:['',Validators.required],
      comments:['',Validators.required],
      // lastEmployer:['',Validators.required],
      // reasonforLeaving:['',Validators.required],
      // presentSalary:['',Validators.required],
      // expectedSalary:['',Validators.required],
      // communicationSkills:['',Validators.required],
      // professionalPresentation:['',Validators.required],
      // hradditionalComments:['',Validators.required],
      // suitableShiftTimings:['',Validators.required],
      // expectedDOJ:['',Validators.required],
      // hasCandidateAppliedBefore:['',Validators.required],
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
      select:['',Validators.required]

    })
    this.getAll();
  }
  showContainer(){
    this.showMyContainer=true;
  }
  hideContainer(){
    this.showMyContainer=false;
  }
mydata:any;
applydesg:any;
requirementid:any;
  getCandDetails(){
    console.log("ddddd>>>>>>>>>>>>>>>>>>>>.yes"+this.roundId)

    this.mydata=[];
    let id=this.roundId.requirementId
    this.requirementid = id;
    this.service.get('getByRequirementId/'+id).subscribe((res)=>{
      let desg=res.designation;
console.log(res)

      if( isNaN(desg)){
        this.applydesg=desg;

       }else{
        
        let result3 =this.designation.filter((design: any) =>
        (design.designationMasterId==desg) )
      desg = result3[0].name;
      this.applydesg=desg;

       }
       console.log(this.applydesg)

  
      this.mydata.push({"designation":desg,"required_exp":res.required_exp,"expected_joining_date":res.expected_joining_date,"no_of_vacancy":res.no_of_vacancy,"location":res.location,"skills":res.skills,"department":res.department_name,"firstName":res.first_name,"lastName":res.last_name})
      console.log(this.applydesg)
      this.getDetails(); 

    })
  }
  
  async getDesignation(){
    await this.service.get("getAllDesignationMaster").subscribe(async (res)=>{
      this.designation = res
      this.getCandDetails();

    })
  }
  
 

submit(){
  console.log(this.candidateEvolutionForm)
  let form=this.candidateEvolutionForm.value
  let url="insertCandidateEvaluationForm"
  let id=this.roundId.recno
  console.log(id)
  let data={
    
    "date": form.date,
    "firstName": form.firstName,
    "middeltName":form.middleName,
    "lastame": form.lastName,
    "positionAppliedfor": form.positionAppliedfor,
    "totalExperience": form.totalExperience,
    "relevantExperience": form.relevantExperience,
    "qualification": form.qualification,
    "comments": form.comments,
    "overallEvaluationAndRecommendation": form.overallEvaluationAndRecommendation,
    "jobKnowledge": form.jobKnowledge,
    "candidateEnthusiasm": form.candidateEnthusiasm,
    "decisionMaking": form.decisionMaking,
    "personalAppearance": form.personalAppearance,
    "hodAdditionalComments": form.hodAdditionalComments,
    "shiftTimingsDepartmentRequirement": form.shiftTimingsDepartmentRequirement,
    "hiringComments": form.hiringComments,
    "managementComments": form.managementComments,
    "salaryOffered": form.salaryOffered,
    "shiftsAgreedOn": form.shiftsAgreedOn,
    "otherBenefits": form.otherBenefits,
    "scheduleInterviewForRoundId":this.roundId.scheduleId,
    "candidateid":this.candidateid,
    "recruitmentid":this.requirementid,
    "additionalRemarks": form.additionalRemarks,
    'status':true

  }

console.log(data);

   if(this.candidateEvolutionForm.status=='VALID'){
  this.service.add(data,url).subscribe((res)=>{
    if(res.respose=='Success'){
      Swal.fire({
        icon:'success',
        title: 'Success',
        text: res.message,
      })
      // window.location.reload();
      this.router.navigate(['/layout/recruitment/scheduleInterview']);
    }
    else if(res.respose=='Already')
    {
      Swal.fire({
        icon:'warning',
        title: 'Oops',
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
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Something went wrong!',
    
  }) 
}
}

cancel(){
  this.router.navigate(['/layout/recruitment/scheduleInterview'])

  
}
getAll(){
  let url="getAllCandidateEvaluationFormList"
  this.service.get(url).subscribe((res)=>{
    this.tableData=res
  })
}
delete(item){
  Swal.fire({
    title:"Are you really want delete..?",
    showCancelButton:true,
    confirmButtonColor: '#3085d6',
     cancelButtonColor: '#d33',
     confirmButtonText: 'Yes'
  }).then(result=>{
    console.log(result);
    if(result.isConfirmed==true)
    {
let url='deleteCandidateEvaluationForm/'+item.applicantCandiateListId
this.service.get(url).subscribe((res)=>{
  if(res.respose=='Success')
  {
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: "Candidate Evolution form is deleted successfully!",
     
    })
    this.getAll()
   
  }
  else 
  {
    Swal.fire({
      icon: 'warning',
      title: 'Oops',
      text: 'Something went wrong! ',
     
    })
  }

})
    }
    else{
      this.getAll();
    }
  })
}
edit(item){
  console.log(item)
  this.editId=item.applicantCandiateListId
  this.showMyContainer=true;
let url="getByCandidateEvaluationFormId/"+item.applicantCandiateListId
this.service.get(url).subscribe((res)=>{
  let form=res
 console.log(res)
  this.candidateEvolutionForm.get('date').setValue(res.date)
  this.candidateEvolutionForm.get('firstName').setValue(res.firstName)
  this.candidateEvolutionForm.get('LastName').setValue(res.surname)
  this.candidateEvolutionForm.get('qualification').setValue(res.qualification)
  this.candidateEvolutionForm.get('positionAppliedfor').setValue(res.positionAppliedfor)
  this.candidateEvolutionForm.get('totalExperience').setValue(res.totalExperience)
  this.candidateEvolutionForm.get('relevantExperience').setValue(res.relevantExperience) 
  this.candidateEvolutionForm.get('comments').setValue(res.comments)
  this.candidateEvolutionForm.get('overallEvaluationAndRecommendation').setValue(res.overallEvaluationAndRecommendation)
  this.candidateEvolutionForm.get('jobKnowledge').setValue(res.jobKnowledge)
  this.candidateEvolutionForm.get('candidateEnthusiasm').setValue(res.candidateEnthusiasm)
  this.candidateEvolutionForm.get('decisionMaking').setValue(res.decisionMaking)
  this.candidateEvolutionForm.get('personalAppearance').setValue(res.personalAppearance)
  this.candidateEvolutionForm.get('hodAdditionalComments').setValue(res.hodAdditionalComments)
  this.candidateEvolutionForm.get('shiftTimingsDepartmentRequirement').setValue(res.shiftTimingsDepartmentRequirement)
  this.candidateEvolutionForm.get('hiringComments').setValue(res.hiringComments)
  this.candidateEvolutionForm.get('managementComments').setValue(res.managementComments)
  this.candidateEvolutionForm.get('salaryOffered').setValue(res.salaryOffered)
  this.candidateEvolutionForm.get('shiftsAgreedOn').setValue(res.shiftsAgreedOn)
  this.candidateEvolutionForm.get('otherBenefits').setValue(res.otherBenefits)
  this.candidateEvolutionForm.get('additionalRemarks').setValue(res.additionalRemarks)

})
}

update(id)
{
  let form=this.candidateEvolutionForm.value
  let url='updateCandidateEvaluationForm/'+id
 // this.service.get(url).subscribe((res)=>{
    let data={
      "date": form.date,
      "firstName": form.firstName,
      "middleName":form.middleName,
      "lastName": form.LastName,
      "positionAppliedfor": form.positionAppliedfor,
      "totalExperience": form.totalExperience,
      "relevantExperience": form.relevantExperience,
      "qualification": form.qualification,
      "comments": form.comments,
      "lastEmployer": "Test",
      "reasonforLeaving": "Test",
      "presentSalary": "30000",
      "expectedSalary": "50000",
      "communicationSkills": "Test",
      "professionalPresentation": "Test",
      "hradditionalComments": "Test",
      "suitableShiftTimings": "Test",
      "expectedDOJ": "1999-09-09",
      "hasCandidateAppliedBefore": "Test",
      "overallEvaluationAndRecommendation": form.overallEvaluationAndRecommendation,
      "workedAtIMHbefore": "Test",
      "jobKnowledge": form.jobKnowledge,
      "candidateEnthusiasm": form.candidateEnthusiasm,
      "decisionMaking": form.decisionMaking,
      "personalAppearance": form.personalAppearance,
      "hodAdditionalComments": form.hodAdditionalComments,
      "shiftTimingsDepartmentRequirement": form.shiftTimingsDepartmentRequirement,
      "hiringComments": form.hiringComments,
      "managementComments": form.managementComments,
      "salaryOffered": form.salaryOffered,
      "shiftsAgreedOn": form.shiftsAgreedOn,
      "otherBenefits": form.otherBenefits,
      "additionalRemarks": form.additionalRemarks,
      





    }
     if(this.candidateEvolutionForm.status=='VALID'){
    this.service.add(data,url).subscribe((res)=>{
      if(res.respose=='Success'){
        Swal.fire({
          icon:'success',
          title: 'Success',
          text: res.message,
        })
        this.showMyContainer=false
        // this.router.navigate(['layout/recruitment/evalutionform'])
        this.getAll();
      }
      else if(res.respose=='Already')
      {
        Swal.fire({
          icon:'warning',
          title: 'Oops',
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
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      
    }) 
  } 
  
}
candidate:any;
candidateid:any;
roundid:any;
getDetails(){
  
  this.pTechRDetails=[]
  this.pHrRDetails=[]
  let id=this.roundId.recno
  let url='getByNoOfRounds/'+id
  this.service.get(url).subscribe(async (res)=>{
     console.log(res)
 
  let url1='getByApplicantCandiateDetailsId/'+res.applicantCandiateId
  await this.service.get(url1).subscribe(async (res1)=>{
    console.log(res1);
    this.candidate =res1;
this.roundid=id;
    this.candidateid = this.candidate[0].applicant_candiate_list_id;
console.log(">>>>>>>>>>>>>>>>>."+id)
    this.candidateEvolutionForm.get('firstName').setValue(res1[0].first_name)
    this.candidateEvolutionForm.get('middleName').setValue(res1[0].middle_name)
    this.candidateEvolutionForm.get('lastName').setValue(res1[0].last_name)
    this.candidateEvolutionForm.get('qualification').setValue(res1[0].qualification)
    this.candidateEvolutionForm.get('totalExperience').setValue(res1[0].experience)
    this.candidateEvolutionForm.get('positionAppliedfor').setValue(this.applydesg)

  
    let url2='getCandidateEvaluationFormByscheduleInterviewForRoundId?scheduleInterviewForRoundId='+id
    await this.service.get(url2).subscribe(async(res2)=>{
    
     this.pTechRDetails = res2
   
     
    });
    console.log(this.pHrRDetails.length)
     let url3='getCandidateEvaluationFormHrByscheduleInterviewForRoundId?scheduleInterviewForRoundId='+id
     await this.service.get(url3).subscribe(async(res3)=>{
      let rres= res3;
      console.log(rres.length)
      if(rres.length>0){
      this.pHrRDetails=res3
      console.log(this.pHrRDetails)
      }
     
    })

  })
})
}

approve(e,item){
  let id=this.roundId.recno
  console.log(e)
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
      let url='SelectCandiateInInterviewByMananger?status='+-1+'&manageempId='+empid+'&NoOfRoundsId='+id+'&reason='+result.value
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
