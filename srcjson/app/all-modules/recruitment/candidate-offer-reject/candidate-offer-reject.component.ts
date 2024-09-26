import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AllModulesService } from '../../all-modules.service';
import { ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
@Component({
  selector: 'app-candidate-offer-reject',
  templateUrl: './candidate-offer-reject.component.html',
  styleUrls: ['./candidate-offer-reject.component.css']
})
export class CandidateOfferRejectComponent implements OnInit {

  offerForm:FormGroup
  details: any=[];
  bloodGroup: any=[];
  categories: any=[];
  departments: any=[];
  religion: any=[];
  grade: any=[];
  contractorData: any=[];
  company: any=[];
  lstEmployee: any=[];
  branchList: any=[];
  roundId: any;
  requirementid: any;
  candidateid: any;
  designation: any;
  pTechRDetails: any[];
  pHrRDetails: any[];
  template: any;
  searchData: any;
  count: any;
  newRequest: FormArray;
  offerForm1: FormGroup;
  newRequest1: FormArray;
  content="<p></p>";
  constructor(public router: Router,public _fb:FormBuilder, private _service: AllModulesService,) { 
  this.content="<p></p>";
    let param=this.router.getCurrentNavigation()?.extras.queryParams;
    if(param){
      this.roundId=JSON.parse(JSON.stringify(param));
      console.log(this.roundId)
      this.requirementid=this.roundId.requirementId;
      this.candidateid=this.roundId.candidateid;
      this.getDetails()


  } 

  }
 
  ngOnInit(): void {
    this.content="<p></p>";
    this.offerForm = this._fb.group({
      reasonforrejection:['',Validators.required],
      remark:['']
    })
    // this.pHrRDetails=[];


    // this.pTechRDetails=[]
    // this.offerForm = this._fb.group({
    //   candidateId: "",
    //   newRequest: new FormArray([])  ,
    //     templateId: "",
    //     Offered:"",
    //     templateName:""

    // })
  

console.log(this.offerForm)
this.getDesignation()
    
    // this.getBloodGroup()
    // this.getGrade()
    // this.contractor()
    // this.getCategories()
    // this.getCompany()
    // this.department()
    // this.getReligion()
    // this.loadEmployee()
    // this.getBranch()
    this.getTemplateName();

  }
  quantities() : FormArray {
    return this.offerForm.get('newRequest') as FormArray; 
  }
  createRequest(): FormGroup {  
    return this._fb.group({
      "variable":'',
    })
  }
  
  
  serach(){
    this.content="";
    console.log(this.offerForm)
    let form=this.offerForm.value
    let url='getTemplatesById/'+form.templateName
    this._service.get(url).subscribe((res)=>{
      this.searchData=res
      console.log(res.content)
      this.content=res.content
      this.count=res.variableCount


      console.log() 
       this.newRequest = this.offerForm.get('newRequest') as FormArray;  
       console.log(this.offerForm)
       for(let i=0;i<this.count;i++){
         this.quantities().push(this.createRequest());  
         //console.log(this.newRequest)
     
       }


     
  
    
    })
  }
  getTemplateName(){
    let url='getTemplatesList'
    this._service.get(url).subscribe((res)=>{
      this.template=res
    })
  }
  async getDesignation(){
    await this._service.get("getAllDesignationMaster").subscribe(async (res)=>{
      this.designation = res
      
    })
  }


  hideContainer(){
   this.router.navigate(['/layout/recruitment/selected']);
   
  }

  getBranch(){

    this._service.get('branch/getBranchList')
    .subscribe((res)=>{
    
    this.branchList = res
    
    })
    
    }
  getBloodGroup(){
    this._service.get('getgetCodeByType?type=bloodGroup').subscribe((res)=>{
    this.bloodGroup = res
   // console.log(res)
    })
  }
  getCategories(){
    this._service.get('categories/getCategories').subscribe((res)=>{
    this.categories=res
  
    })
  }
  department(){
    this._service.get('getAllDepartment').subscribe((res)=>{
    this.departments=res
    })
  }
  
  getReligion(){
    this._service.get('getgetCodeByType?type=religion').subscribe((res)=>{
    this.religion = res
    })
  }
  getGrade(){
    this._service.get('getgetCodeByType?type=grade').subscribe((res)=>{
    this.grade = res
    })
  }
  
  contractor(){
    this._service.get('getgetCodeByType?type=contractor').subscribe((res)=>{
    this.contractorData = res
    })
  }
 
  getCompany(){
    this._service.get('getAllCompanyInformationList').subscribe((res)=>{
      this.company=res
    })
  }

  loadEmployee() {
    
   
    this._service.get("employee_master/getemployees/").subscribe((data) => {
    
    
      this.lstEmployee = data;

     
      //this.selectedId=data[0].employeeId;
    
    });
  }
offerLetter:any;
//   submit()
//   {
//     var datePipe = new DatePipe('en-US');
//   let dateOfBirth = datePipe.transform(this.details.dateOfBirth,'yyyy-MM-dd');
//     //let url="AddFinalOfferForm"
//     let url="OfferSendingProcessing"
//     let form1=this.offerForm.value
//     console.log(form1)
//     console.log(this.newRequest)
//     let data={
//       "letterteassignTemplatesToEmployee":{
//         "candidateId": this.roundId.candidateid,
//         "variables":this.newRequest.value,
//         "templateId": form1.templateName,
//         "requirmentId": this.roundId.recno
//       },
//       "emailassignTemplatesToEmployee": {
//         "candidateId": this.roundId.candidateid,
//         "variables":this.newRequest.value,
//         "templateId": form1.templateName,
//         "requirmentId": this.roundId.recno
//       },
//       "emailSubject": "*emailSubject* ",
//       "applicantCandiateId": this.roundId.candidateid,
//       "RequirmentId": this.roundId.recno,
     
//       "offered":form1.Offered,
     
//   }
//   this._service.add(data,url).subscribe((res)=>{
//     console.log(res)
//     if(res.respose == "success"){

// this.offerLetter=res.data.letterteassignTemplatesToEmployee.documentgenerated
 
//       Swal.fire({
//         icon: 'success',
//         title: 'Your work has been saved',
//         showConfirmButton: false,
//         timer: 1500
//       })

      
 
      
//     }
//     else if(res.respose == "Already"){
//       Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: 'Record Already Exists!',
    
//       })
//      }
//      else{
//       Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: 'Something went wrong!',
    
//       })
//      }
//   })
  
//   }
cancel(){

}
submit(){
console.log(this.roundId)
let form=this.offerForm.value
let params = new HttpParams();
params = params.append('status', 2);
params = params.append('remark', form.reasonforrejection);
params = params.append('requirementId', this.requirementid);
params = params.append('applicantCandiateListId', this.candidateid);

  let url='UpdateApplicantCandiateByRequirementId?'
  if(this.offerForm.status=='VALID'){
  this._service.add(params,url).subscribe((res)=>{
    console.log(res)
    if(res.respose == "Success"){
            Swal.fire({
        icon: 'success',
        title: res.message,
        showConfirmButton: false,
        timer: 1500
      })
    this.hideContainer();

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
  getDetails(){
    this.pHrRDetails=[];

    this.pTechRDetails=[]
    this.requirementid=this.roundId.requirementId;
      this.candidateid=this.roundId.candidateid;
    let url='getSelectedByApplicantCandiateListId/'+this.candidateid
    this._service.get(url).subscribe(async (res)=>{
      console.log(res)
      this.details=res

    })

     
    let url2='getCandidateEvaluationFormByscheduleInterviewForRoundId?scheduleInterviewForRoundId='+this.roundId.recno
     this._service.get(url2).subscribe(async (res2)=>{
    
     this.pTechRDetails = res2
   
    });
    

    let url3='getCandidateEvaluationFormHrByscheduleInterviewForRoundId?scheduleInterviewForRoundId='+this.roundId.recno
     this._service.get(url3).subscribe((res1)=>{
      this.pHrRDetails=res1
     console.log(this.pHrRDetails)
    })
  }

}
