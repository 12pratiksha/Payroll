import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AllModulesService } from '../../all-modules.service';
import { DatePipe, formatDate } from '@angular/common';
import Swal from 'sweetalert2';
import { error } from 'console';
import { HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-requirement-approved',
  templateUrl: './requirement-approved.component.html',
  styleUrls: ['./requirement-approved.component.css']
})
export class RequirementApprovedComponent implements OnInit {
  baseurl: string;
  isReadOnly: boolean = false;

  showMyContainer : boolean = false
  public candidatesForm: FormGroup
  public dtOptions = {};
  tableData: any;
  uploadDoc: any;
  reqId: any;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  city: any=[];
  state: any=[];
  qualification: any=[];
  Desingation: any=[];
  candName: any=[];
  department: any;
  agencyList: any=[];
  data: any=[];
  joiningDate: any;
  tableData_display: any=[];
  approver: any;
  mydata: any;
  requirementlist: any[];
  roundId: any;
  todayDate: Date;
  mindob: Date;
  maxDate: any;
  birthdate: any;
  cvName: any;
  constructor(
    public router: Router,
    public fb: FormBuilder,
    public _service: AllModulesService
    ) { 

      let param=this.router.getCurrentNavigation()?.extras.queryParams;
      if(param){
        this.roundId=JSON.parse(JSON.stringify(param));
        console.log(this.roundId)
        
    
    } 

    }

  ngOnInit(): void {
    this.baseurl=localStorage.getItem('baseurl')
   this.maxDate = new Date();
    this.mindob=new Date(
      this.maxDate.getFullYear() - 18,
      this.maxDate.getMonth(),
      this.maxDate.getDate()
    );

this.todayDate= new Date()
this.candidatesForm = this.fb.group({
  candidate:['',],
  firstName:['', Validators.required],
  middleName:['', Validators.required],
  lastName:['', Validators.required],
  agency:['', ],
  city: ['', Validators.required],
  state: ['', Validators.required],
  dob:['', Validators.required],
  email:['', [Validators.pattern(this.emailPattern)]],
  phone:['', Validators.required],
  age:['',Validators.required],
  gender:['', Validators.required],
  experience:['', Validators.required],
  skill:['', ],
  availability:['', Validators.required],
  existing:[''],
  qualification:['', Validators.required],
  replacement:[''],
  against: ['']

  
})
// this.candidatesForm.controls['candidate'].valueChanges.subscribe(value=>{
//   console.log(value)
//   if(value='Exiting')
//     {
//       this.candidatesForm.controls['firstName'].setValidators(null);
//       this.candidatesForm.controls['firstName'].setValidators(null);
//       this.candidatesForm.controls['middleName'].setValidators(null);
//       this.candidatesForm.controls['lastName'].setValidators(null);
//       this.candidatesForm.controls['city'].setValidators(null);
//       this.candidatesForm.controls['state'].setValidators(null);
//       this.candidatesForm.controls['dob'].setValidators(null);
//       this.candidatesForm.controls['email'].setValidators(null);
//       this.candidatesForm.controls['phone'].setValidators(null);
//       this.candidatesForm.controls['age'].setValidators(null);
//       this.candidatesForm.controls['to'].setValidators(null);
//       this.candidatesForm.controls['gender'].setValidators(null);
//       this.candidatesForm.controls['experience'].setValidators(null);
//       this.candidatesForm.controls['skill'].setValidators(null);
//       this.candidatesForm.controls['availability'].setValidators(null);
//       this.candidatesForm.controls['existing'].setValidators(null);
//       this.candidatesForm.controls['qualification'].setValidators(null);
//       this.candidatesForm.controls['against'].setValidators(null);
//     }
//     else{

//     }
   




// })
console.log(this.candidatesForm)
this.dtOptions = {
  pagingType: 'full_numbers',
  pageLength: 10,
  processing: true,
  dom: 'Bfrtip',
    buttons: [
        'copy', 'csv', 'excel', 'print', 
    ]
};
this.getDesignation();
this.getApprover();
this.getcad()
//this.getTableData()
this.getDept()
    this.getCity()
    this.getState()
    this.getquali()
    
    
    
    this.getAgencyList()
  }
  
  enterCand(item)
  {
    let id=item.requirement_id
    this.showMyContainer = true
    this.reqId=id

  this._service.get('getByRequirementId/'+id).subscribe((res)=>{
    this.mydata=res
    var datePipe = new DatePipe('en-US');

     this.joiningDate = datePipe.transform(res.expected_joining_date , 'dd-MM-yyyy'); 
     let desg=this.mydata.designation;
     let cand=this.mydata.candidate
     if(isNaN(cand)){
     }else{
      let candidate=this.approver.filter((emp:any)=>
      (emp.employeeId==cand))
      // console.log(candidate[0].firstName)
     }
       if( isNaN(desg)){
        }else{
         let result3 =this.Desingation.filter((design: any) =>
         (design.designationMasterId==desg) )
          desg = result3[0].name;
          }

        this.mydata.designation=desg;
        
        this.data =this.mydata;
console.log(this.data)

  })
}
hideContainer(){
  const currentRoute = this.router.url;

  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]); // navigate to same route
  }); 
}

getTableData(){
  this.tableData_display=[];
  this._service.get("getAllApprovalJobRequirementList").subscribe((res)=>{
    this.tableData = res
    console.log(res)
    this.tableData.forEach(element => {

      let desg=element.designation;



        if( isNaN(desg)){
         }else{
          let result3 =this.Desingation.filter((design: any) =>
          (design.designationMasterId==desg) )
        desg = result3[0].name;
         }

      
        this.tableData_display.push({"requirement_id":element.requirement_id,"request_date":element.request_date,"department":element.department_name,"expected_joining_date":element.expected_joining_date,"designation":desg,"no_of_vacancy":element.no_of_vacancy,"approver":element.first_name+" "+element.last_name,'no_of_pending_vacancy':element.no_of_pending_vacancy})
      
    })
  })
}
getCity(){
  let url="city/getCityList"
  this._service.get(url).subscribe((res)=>{
    console.log(res)
    this.city=res

  })
}
getState(){
  let url="state/getStateList"
  this._service.get(url).subscribe((res)=>{
this.state=res
  })

}
getcad(){
  let url='getApplicantCandiateListByStatus'
  this._service.get(url).subscribe(res=>{
    console.log(res)
    this.candName=res
  })
}
getquali(){
  let url='getgetCodeByType?type=Qualification'
  this._service.get(url).subscribe((res)=>{
console.log(res)
this.qualification=res
  })
}
async getDesignation(){
  let url='getAllDesignationMaster'
  await this._service.get(url).subscribe((res)=>{
    this.Desingation=res
    this.getTableData();

  })
}

async getApprover(){
  await this._service.get("employee_master/getemployees").subscribe((res)=>{
    this.approver = res
    
    
  })
}

async getDept(){
  let url='getAllDepartment'
  await this._service.get(url).subscribe(res=>{
    this.department=res
  })
}
// handleUpload(event) {
 
//   const file = event.target.files[0];

  
//     const formData = new FormData();
//     formData.append('file', file);
//     console.log(file)
//     this.srvModuleService.uploadFile(formData,"employee_master/uploadlogo").subscribe((res)=>{
      
//      this.profilePhoto = res.data[0].firstName
//      console.log( this.profilePhoto )
    
//     //  this.imagePath = this.baseUrl+""+res.data[0].photo
//     //  console.log(this.imagePath)
//     })
  

// }
myfile:any;
uploadFile(event) {
  console.log(event)
  let file = event.target.files[0];
  if( file.type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file.type == "application/pdf" ){
   
  
      const formData = new FormData();
    formData.append('file', file);
    console.log(file)
    this._service.uploadFile(formData,"uploadCandidateDoc").subscribe((res)=>{
       console.log(res.data)
       this.uploadDoc = res.data
    })
  }
  else{
    ""
  }
}
getDate(date){
  console.log(date.value)
  var datePipe = new DatePipe('en-US');

  let birthDate = datePipe.transform(date.value, 'dd-MM-yyyy');
  console.log(birthDate)


}
add(){
console.log(this.candidatesForm)
  let formValue=this.candidatesForm.value
  if( formValue.candidate=='New'){
  console.log(this.candidatesForm);
  let dob=formValue.dob
  
  var datePipe = new DatePipe('en-US');

   let birthDate = datePipe.transform(formValue.dob, 'dd-MM-yyyy');
   let availableDate = datePipe.transform(formValue.availability, 'dd-MM-yyyy');
   const parsedDate1 = new Date(formValue.dob);

const dateArray1 = [
  parsedDate1.getFullYear(),  
  parsedDate1.getMonth() + 1, 
  parsedDate1.getDate()      
];
console.log(dateArray1)

const parsedDate2 = new Date(formValue.availability);

const dateArray2 = [
  parsedDate2.getFullYear(),  
  parsedDate2.getMonth() + 1, 
  parsedDate2.getDate()      
];
  console.log(birthDate)
  let url="EnterCandiate"
this.requirementlist=[];
this.requirementlist.push({  "requirementId": this.reqId,"status": "1"})
let data={
  "selectCandidate": formValue.selectCandidate,
    "Replacement": formValue.replacement,
    "agency": formValue.agency,
    "agencyType":formValue.agencyType,
    "state": formValue.state,
    "city": formValue.city,
    "firstName": formValue.firstName,
"middleName":formValue.middleName,
"lastName":formValue.lastName,
    "qualification": formValue.qualification,
    "dateOfBirth": dateArray1,
    "email": formValue.email,
    "phone": formValue.phone,
    "age": formValue.age,
    "gender": formValue.gender,
    "skills": formValue.skill,
    "cvName":  this.uploadDoc ,
    "experience": formValue.experience,
    "availability": dateArray2,
    "against": formValue.against,
    "requirementDetails": this.requirementlist,
    
}
console.log(this.candidatesForm)
if(this.candidatesForm.status=='VALID'){
 this._service.add(data,url).subscribe(res=>{
  console.log(res)
  if(res.respose == "Success"){
    Swal.fire({
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    })
    const currentRoute = this.router.url;
  
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentRoute]);
    }); 
  }
  else if(res.respose == "Already"){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Record Already Exists!',
  
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
  let invalid = "";
  const controls = this.candidatesForm.controls;
  for (const name in controls) {
      if (controls[name].invalid) {
          invalid+=name+", ";
      }
  }


  Swal.fire({
    icon:'error',
    title:"Error",
    text:"Something went wrong with these fields! "+invalid
  })
}

  }
  else{
  console.log(formValue.dob);
  var datePipe = new DatePipe('en-US');
  let date=formValue.availability
  var avail=date.split("-");
  console.log(avail)
  let availability:any;
  availability=[avail[1],avail[0],avail[2]]
  const parsedDate1 =new Date(availability);
  console.log()

   let dateArray1 = [
    parsedDate1.getFullYear(),
 
    parsedDate1.getMonth()+1,
    parsedDate1.getDate(),
  ];

  
  let date1=formValue.dob
  var dob=date1.split("-");
  console.log(avail)
  let dateOfBirth:any;
  dateOfBirth=[dob[1],dob[0],dob[2]]
  console.log(dateOfBirth)



  const parsedDate2 =new Date(dateOfBirth);
  let dateArray2 = [
    parsedDate2.getFullYear(),
 
    parsedDate2.getMonth()+1,
    parsedDate2.getDate(),
  ];


//   const parsedDate1 = new Date(formValue.availability);

// const dateArray1 = [
//   parsedDate1.getFullYear(),  
//   parsedDate1.getMonth() + 1, 
//   parsedDate1.getDate()      
// ];
// console.log(formValue.dob)
// const parsedDate2 = new Date(formValue.dob);
// console.log(parsedDate2)
// const dateArray2 = [
//   parsedDate2.getFullYear(),  
//   parsedDate2.getMonth() + 1, 
//   parsedDate2.getDate()      
// ];
// console.log(dateArray2)
let id=this.candidatesForm.value.existing
 let url="updateApplicantCandiateList/"+133581

//  let params = new HttpParams();

//  params = params.append('id',id);
//  params=params.append("replacementCandidate",true)
this.requirementlist=[];
this.requirementlist.push({"requirementId": this.reqId,"status": "1"})
let data={
  "selectCandidate": formValue.existing,
    "Replacement": formValue.replacement,
    "agency": formValue.agency,
    "agencyType":formValue.agencyType,
    "state": formValue.state,
    "city": formValue.city,
    "firstName": formValue.firstName,
    "middleName":formValue.middleName,
    "lastName":formValue.lastName,
    "qualification": formValue.qualification,
    "dateOfBirth":dateArray2,
    "email": formValue.email,
    "phone": formValue.phone,
    "age": formValue.age,
    "gender": formValue.gender,
    "skills": formValue.skill,
    "cvName":   this.cvName,
    "experience": formValue.experience,
    "availability": dateArray1,
    "against": formValue.against,
    "requirementDetails": this.requirementlist,
}
if(this.candidatesForm.status=='VALID'){
 this._service.add(data,url).subscribe(res=>{
  console.log(res)
  if(res.respose == "Success"){
    Swal.fire({
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    })
    const currentRoute = this.router.url;
  
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentRoute]);
    }); 
  }
  else if(res.respose == "Already"){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Record Already Exists!',
  
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
  let invalid = "";
  const controls = this.candidatesForm.controls;
  for (const name in controls) {
      if (controls[name].invalid) {
          invalid+=name+", ";
      }
  }

  Swal.fire({
    icon:'error',
    title:"Error",
    text:"Something went wrong with these fields: "+invalid
  })
}

}
}
getAgencyList()
{
  let url='getAgencyMasterList'
  this._service.get(url).subscribe(res=>{
    this.agencyList=res
  
  })
}
close(item){
  console.log(item)
  let url='UpdateRemovingStatus?removestatus='+1+'&requirementId='+item.requirement_id
//  let params= new HttpParams();
//  params=params.append('removestatus',1);
//  params=params.append('requirementId','item.requirement_id')
 Swal.fire({
  title:"Are you really wants to close this requirement ?",
  showCancelButton:true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes'
}).then(result=>{
  console.log(result);
  if(result.isConfirmed==true)
  {
 this._service.get(url).subscribe((res)=>{
  if(res.respose=='Success'){
    Swal.fire({
      icon:'success',
      title:'Success',
      text:'res.message'
    })
    const currentRoute = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentRoute]); 
        // navigate to same route
    }); 
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
else if(result.isConfirmed==false)
  {
    this.tableData();
  }
})

}


// calucateAge($event){
//   alert(11111111)
//   console.log("dateeeeeeee")
//   // if(this.age){
//   //   const convertAge = new Date(this.age);
//   //   const timeDiff = Math.abs(Date.now() - convertAge.getTime());
//   //   this.showAge = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
//   // }
// }
onLeaveDateChange(event) {
  console.log(event)
  if(event){
const timeDiff = Math.abs(Date.now() - event.getTime() );
let age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365)
console.log(age.toString)
            
            this.candidatesForm.get('age').setValue(age);
  }
}

onSelectionChange1($event){
  console.log(this.candidatesForm.value.candidate)
  if(this.candidatesForm.value.candidate=="Existing"){
    this.isReadOnly=true;
  }
}

onSelectionChange($event){
  console.log($event)
  let id=this.candidatesForm.value.existing
  let url='getByApplicantCandiateListId1/'+id
  this._service.get(url).subscribe((res)=>{
    var datePipe = new DatePipe('en-US');
    let dob = datePipe.transform(res[0].dateOfBirth, 'dd-MM-yyyy');
    let availability = datePipe.transform(res[0].availability, 'dd-MM-yyyy');
    console.log(dob)
    this.cvName=res[0].cvName
      this.candidatesForm.get('firstName').setValue(res[0].firstName);
      this.candidatesForm.get('middleName').setValue(res[0].middleName);
      this.candidatesForm.get('lastName').setValue(res[0].lastName);
      this.candidatesForm.get('city').setValue(res[0].city);
      this.candidatesForm.get('state').setValue(res[0].state);
      this.candidatesForm.get('dob').setValue(dob);
      this.candidatesForm.get('email').setValue(res[0].email);
      this.candidatesForm.get('phone').setValue(res[0].phone);
      //this.candidatesForm.get('age').setValue(res[0].age);
      this.candidatesForm.get('gender').setValue(res[0].gender);
      this.candidatesForm.get('experience').setValue(res[0].experience);
      this.candidatesForm.get('skill').setValue(res[0].skills);
      this.candidatesForm.get('availability').setValue(availability);
      this.candidatesForm.get('qualification').setValue(res[0].qualification);
      this.candidatesForm.get('against').setValue(res[0].against);

if((res[0].age=="0" || res[0].age=="") && res[0].dateOfBirth!=""){
  var date = new  Date (res[0].dateOfBirth);
  console.log(date)
      const timeDiff = Math.abs(Date.now() - date.getTime() );
      console.log(timeDiff)

let age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365)
console.log(age)
            
            this.candidatesForm.get('age').setValue(age);
}else{
  this.candidatesForm.get('age').setValue(res[0].age);
}
  })
}
}
// const formData = new FormData();

//  let edata="{\"assetName\":\""+formValue.assetName+"\",\"assetValue\":\""+formValue.assetValue+"\",\"description\":\""+formValue.description+"\",\"issueDate\":\""+date+"\",\"officeUse\":\""+formValue.givenFor+"\",\"isTermsAndCondition\":\""+formValue.tandc+"\",\"isStatus\":"+formValue.status+",\"isRepeatAsset\":"+formValue.repeatAsset+",\"employeeId\":\""+this.employeeID+"\"}";

//  formData.append('emplAssAssgn', edata);
//  formData.append('attachment', this.uploadAssetfile);