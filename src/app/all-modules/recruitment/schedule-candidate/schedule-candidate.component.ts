import { data } from 'jquery';
import { Component, OnInit } from '@angular/core';
import { AllModulesService } from '../../all-modules.service';
import Swal from 'sweetalert2';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-schedule-candidate',
  templateUrl: './schedule-candidate.component.html',
  styleUrls: ['./schedule-candidate.component.css']
})
export class ScheduleCandidateComponent implements OnInit {
 
  scheduleForm:FormGroup
  public dtOptions = {};
  tableData: any=[];
  inputAdd:string;
  type: string;
  tableData1: any=[];
  item: any;
  data: any;
  container:boolean=true;
  getId: any;
  data1: any;
  getData: any;
  approver: any;
  interviewer: any=[];
  editId: any;
  applicantCandiateId: any;
  details: any=[];
  overallData: any;
  roundId: any;
  scheduleId: any;
  rId: any;
  candList: any;
  cand: any;
  tableData2: any=[];
  reqireId: void;
  designation: any;
  baseurl: string;

  constructor(public service: AllModulesService,public _fb:FormBuilder,public router:Router,public datePipe:DatePipe) { }

 async ngOnInit() {
  this.baseurl=localStorage.getItem('baseurl')
  this.getDesignation();
    await this.getApprover()

this.type=localStorage.getItem('type')
this.list();





    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'print', 
        ]
    };

   
    this.scheduleForm = this._fb.group({
      rounds:'',
      candidateId:'',
      // date:'',
      // time:'',
      fArray: this._fb.array([]) , 
     
    }) 

  }

  newFarray(): FormGroup{
    return this._fb.group({
      type:'',
      round:'',
      onDate:'',
      atTime:'',
      interview: null,
      // remarkfromHr: '',
      // otherDetails: ''

    })
    console.log(this.newFarray)
    }
    // create(): FormGroup{
    // return this.formBuilder.group({
    //   rounds:'',
    // })
    // }

    fArray() : FormArray {
      return this.scheduleForm.get('fArray') as FormArray
      console.log(this.fArray)
      }

      
  
      
  addItem(e): void {  
console.log(e)
    this.fArray().clear()
  
    for (let i = 0; i < e; i ++){
      this.fArray().push(this.newFarray())
       console.log(this.fArray)
      
    }

  }

  // showContainer(){
  //   this.container = true
   
  //  }

  getList(){
   // let empid=localStorage.getItem('empid')
   // let url='getNotSelectedListForApproval?empId='+empid
   // this.service.get(url).subscribe((res)=>{
      //res.forEach(element => {
      //  let url='getByApplicantCandiateListId/'+element.applicant_candiate_id
    // this.service.get(url).subscribe((res1)=>{
    //   console.log(res1.cvName);

    //   let  result2=this.candList.filter((candidate: any) =>
    //   (candidate.applicantCandiateListId==element.applicant_candiate_id) )
    //   console.log(result2)

    
       // this.tableData2.push({"cvName":"","roundId":element.round_id,"round":element.round,"type":element.type,"onDate":element.on_date,"atTime":element.at_time,"firstName":"res1.firstName","lastName":"res1.lastName","middleName":"res1.middleName","requirementId":"res1.requirementId"}) 
        
     // });
   // })
   //   this.tableData=this.tableData2
    //  console.log(this.tableData)

    //})
  }
  // Swal.fire({
  //   title:"Are you really want reject leave..?",
  //   //  html: `<textarea id="login" class="swal2-input" placeholder="Reason" tabIndex="" >`,
  //    input: 'text',
  //   inputValue: this.inputAdd,
  //   showCancelButton:true,
  //   confirmButtonColor: '#3085d6',
  //   cancelButtonColor: '#d33',
  //   confirmButtonText: 'Yes'
  // }).then(result=>{
  //   console.log(result);
  //   if(result.isConfirmed==true)
  //   {
  //     let id = localStorage.getItem('empid')
  approve(e,item){
    console.log(e)
    if(e==1){
    Swal.fire({
      title:"Are you really want select candidate..?",
      input: 'text',
      inputValue: this.inputAdd,
      showCancelButton:true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then(result=>{
      console.log(result);
      if(result.isConfirmed==true)
      {
    let empid=localStorage.getItem('empid')
    let url='SelectCandiateInInterviewByMananger?status='+1+'&manageempId='+empid+'&NoOfRoundsId='+item.round_id+'&reason='+result.value
    this.service.get(url).subscribe((res)=>{
    console.log(res)
    if(res.respose=='Success')
            {
              Swal.fire({
                icon: 'success',
                title: 'Success',
                text: res.message,
               
              })
            
              this.getList();
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
    this.getList();
  }
})
    }
    else if(e==2){
      if(e==1){
        Swal.fire({
          title:"Are you really want reject candidate..?",
          input: 'text',
          inputValue: this.inputAdd,
          showCancelButton:true,
          confirmButtonColor: '#3085d6',
           cancelButtonColor: '#d33',
           confirmButtonText: 'Yes'
        }).then(result=>{
          console.log(result);
          if(result.isConfirmed==true)
          {
        let empid=localStorage.getItem('empid')
        let url='SelectCandiateInInterviewByMananger?status='+-1+'&manageempId='+empid+'&NoOfRoundsId='+item.round_id+'&reason='+result.value
        this.service.get(url).subscribe((res)=>{
        console.log(res)
        if(res.respose=='Success')
                {
                  Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: res.message,
                   
                  })
                
                  this.getList();
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
        this.getList();
      }
    })
    }
}
}

async list(){
  let url="getAllApplicantCandiateListList"
  await this.service.get(url).subscribe(res=>{
    this.candList=res
    console.log(res)
    this.getList()
  })
}

async getAllDataForAdmin(){
  let empid=localStorage.getItem('empid')
  let usertype = localStorage.getItem('type')
  let url='getAllNoOfRounds/'+empid
  this.service.get(url).subscribe((res)=>{
  this.data=res
  if(res){
  res.forEach(element => {
    this.getId=element
    let tableData1=element.scheduleInterviewForRound
    let status="";
    if(element.main_status==1){
      status="Done";
    }else{
      status="Not Done";
    }
  let desg=element.designation;
    if( isNaN(desg)){
    }else{
      let result3 =this.designation.filter((design: any) =>
      (design.designationMasterId==desg) )
      desg = result3[0].name;
    }
  this.tableData1.push({"desg":desg,"department_name":element.department_name,status:status,interviewname:element.fname+" "+element.lname,"roundId":element.round_id,"round":element.round,"type":element.type,"onDate":element.on_date,"atTime":element.at_time,"firstName":element.first_name,"lastName":element.last_name,"requirementId":element.recruitmentid,"scheduleId":element.schedule_interview_for_round_id,"cv_name":element.cv_name})
  this.tableData.push({"desg":desg,"department_name":element.department_name,status:status,interviewname:element.fname+" "+element.lname,"roundId":element.round_id,"round":element.round,"type":element.type,"onDate":element.on_date,"atTime":element.at_time,"firstName":element.first_name,"lastName":element.last_name,"requirementId":element.recruitmentid,"scheduleId":element.schedule_interview_for_round_id,"cv_name":element.cv_name})
  }); 
  }
 }); 
 
}

async getDesignation(){
  await this.service.get("getAllDesignationMaster").subscribe(async (res)=>{
  this.designation = res
  await this.list()
  })
}

test(e){
  console.log(e)
}

edit(item){
  console.log(item)
  this.editId=item.roundId
  this.applicantCandiateId=item.applicantCandiateId
  this.container = false
  let i=0;
  let url='getByNoOfRounds/'+item.roundId
  this.service.get(url).subscribe((res)=>{
    this.overallData=res
    this.data1=res.scheduleInterviewForRound
    this.scheduleForm.get('rounds').setValue(res.roundNo)
    this.data1.forEach(element => {
    this.scheduleId=element.scheduleInterviewForRoundId
    console.log(this.scheduleId)
    this.interviewer=[];
    this.getData=element.interview
    console.log(this.getData)
    var datePipe = new DatePipe('en-US');
    let date= datePipe.transform(element.onDate, 'dd-MM-yyyy');
    this.getData.forEach(element1 => {
    let interviewer=element1.empId
    this.interviewer.push(interviewer);
    console.log(this.interviewer)
    })
    this.fArray().push(this._fb.group({
    type:element.type,
    round:element.round,
    onDate:date,
    atTime:element.atTime,
    interview:this.interviewer,
  }))
  });
  });
}


setSelected(selectElement) {
  for (var i = 0; i < this.approver.length; i++) {
      let optionElement = this.approver[i];
      let optionModel = this.interviewer[i];

      if (optionElement.selected == optionModel) {
        console.log(">>>"+optionElement)
      }
  }
}
hideContainer(){
  const currentRoute = this.router.url;

  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]); 
  }); 
  this.container = true
}
update(editId, applicantCandiateId){
  console.log(applicantCandiateId)
  let form=this.scheduleForm.value.fArray
  form.forEach(element => {
  var datePipe = new DatePipe('en-US');
  const parsedDate1 = new Date(element.onDate);
  const dateArray1 = [
  parsedDate1.getFullYear(),  
  parsedDate1.getMonth() + 1, 
  parsedDate1.getDate()      
];

console.log(form)
let url='updateNoOfRounds/'+editId
let scheduleForm={
  type:element.type,
  round:element.round,
  onDate:dateArray1,
  atTime:element.atTime,
  interview:element.interviewer, 
}
this.details.push(scheduleForm)
let data={
  "scheduleInterviewForRound":this.details,
  "applicantCandiateId":applicantCandiateId,
  "roundNo":this.scheduleForm.value.rounds,
}
this.service.add(data,url).subscribe((res)=>{
const currentRoute = this.router.url;
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate([currentRoute]); // navigate to same route
  })
});
})
}


async getApprover(){
  await this.service.get("employee_master/getemployees").subscribe((res)=>{
  this.approver = res
  this.getAllDataForAdmin();
  })
}
evalutionform(item){
  console.log(item)
  this.roundId=item.roundId
  this.reqireId=item.requirementId
  console.log()
  if(item.round=='Technical Round 1' || item.round=='Technical Round 2'){
  this.router.navigate(["/layout/recruitment/evalutionform"],{queryParams:{recno:this.roundId,scheduleId:item.scheduleId,requirementId:this.reqireId}})
}
else if(item.round=='HR Round' || item.round=='Management Round'){
  this.router.navigate(["/layout/recruitment/hrEvolutionFormComponent"],{queryParams:{recno:this.roundId,scheduleId:item.scheduleId,requirementId:this.reqireId}})
}
}

evalutionform1(item,scheduleId){
  console.log(item) 
  this.roundId=item.roundId
  this.reqireId=item.requirementId
  if(item.round=='Technical Round 1' || item.round=='Technical Round 2'){
  this.router.navigate(['/layout/recruitment/evalutionform/'],{queryParams:{recno:this.roundId,scheduleId:item.scheduleId,requirementId:this.reqireId}});
}
else if(item.round=='HR Round' || item.round=='Management Round'){
  this.router.navigate(['/layout/recruitment/hrEvolutionFormComponent/'],{queryParams:{recno:this.roundId,scheduleId:item.scheduleId,requirementId:this.reqireId}});
}
}
}

