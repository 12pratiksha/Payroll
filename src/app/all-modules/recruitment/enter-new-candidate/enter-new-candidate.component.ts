import { Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,  } from '@angular/forms';
import { Router } from '@angular/router';
import { AllModulesService } from '../../all-modules.service';
import { DatePipe, formatDate } from '@angular/common';
import Swal from 'sweetalert2';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-enter-new-candidate',
  templateUrl: './enter-new-candidate.component.html',
  styleUrls: ['./enter-new-candidate.component.css']
})
export class EnterNewCandidateComponent implements OnInit {

  showMyContainer : boolean = false
  candidatesForm: FormGroup
  filterForm:FormGroup;
  tableData: any=[];
  uploadDoc: any;
  reqId: any;
  city: any=[];
  state: any=[];
  qualification: any=[];
  Desingation: any=[];
  candName: any=[];
  department: any;
  agencyList: any=[];
  data: any=[];
  joiningDate: any;
  tableData_display: any;
  approver: any;
  mydata: any;
  requirementlist: any[];
  roundId: any;
  baseurl: string;
  dtOptions: { pagingType: string; pageLength: number; processing: boolean; dom: string; buttons: string[]; };
  editId: any;
  dob: number[];
  dateArray3: number[];
  dateArray2: number[];
  dateArray1: number[];
  editData: any;
  dropdownValue: any=[];
  filterData: any;
  tableData1: any=[];
  constructor(
    public router: Router,
    public fb: FormBuilder,
    public _service: AllModulesService,
    public datePipe:DatePipe

    ) { 
      this.getDesignation();
    }

  ngOnInit(): void {
    this.filterForm=this.fb.group({
      designation:['',],
      status:['',]
    })
    this.baseurl=localStorage.getItem('baseurl')
this.showMyContainer=false;
this.candidatesForm = this.fb.group({
  candidate:['', Validators.required],
  firstName:['', Validators.required],
  middleName:['', Validators.required],
  lastName:['', Validators.required],
  agency:['', Validators.required],
  // agencyType:'',
  city: ['', Validators.required],
  state: ['', Validators.required],
  dob:['', Validators.required],
  email:['', Validators.required],
  phone:['', Validators.required],
  from:['', Validators.required],
  to:['', Validators.required],
  gender:['', Validators.required],
  experience:['', Validators.required],
  skill:['', Validators.required],
  availability:['', Validators.required],
  existing:['', Validators.required],
  qualification:['', Validators.required],
  replacement:[''],
  against: [''],
  applicationDate:[''],
  applyFrom:[''],
  status:['']
  
})
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
this.getTableData()
this.getApprover();
this.getDropdownValue();
this.getcad()

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
showContainer(){
  this.showMyContainer=true
  
  }
hideContainer(){
  this.showMyContainer=false
  const currentRoute = this.router.url;

  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]); // navigate to same route
  }); 
}
getDropdownValue(){
  this.tableData_display=[];
  this._service.get("getAllCandiateListWoApplication").subscribe((res)=>{
    if(res){
    res.forEach(element => {
      let desig = Number(element.against); 
      let result=this.Desingation.filter((des:any)=>
      (des.designationMasterId==desig))
      this.dropdownValue.push({"designId":result[0].designationMasterId,"name":result[0].name})
      console.log(this.dropdownValue)
    })  
    }
  }) 
}
getTableData(){
  this.tableData_display=[];
  this._service.get("getAllCandiateListWoApplication").subscribe((res)=>{
    if(res){
    res.forEach(element => {
      let desig = element.against;
      // let result=this.Desingation.filter((des:any)=>
      // (des.designationMasterId==desig)) 
      // console.log(result[0].name)
      // this.tableData.push({"applicantCandiateListId":element.applicantCandiateListId,"applicationDate":element.applicationDate,"firstName":element.firstName,"middleName":element.middleName,"lastName":element.lastName,"phone":element.phone,"email":element.email,"gender":element.gender,"skills":element.skills,"against":result[0].name,"cvName":element.cvName,"status":element.status})
      this.tableData.push({"applicantCandiateListId":element.applicantCandiateListId,"applicationDate":element.applicationDate,"firstName":element.firstName,"middleName":element.middleName,"lastName":element.lastName,"phone":element.phone,"email":element.email,"gender":element.gender,"skills":element.skills,"cvName":element.cvName,"status":element.status})
    })  
    }
    this.tableData_display=this.tableData
    console.log(this.tableData_display)
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
  let url='getAllApplicantCandiateListList'
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
  const formData = new FormData();
  formData.append('file', file);
  console.log(file)
  this._service.uploadFile(formData,"uploadCandidateDoc").subscribe((res)=>{
  console.log(res.data)
  this.uploadDoc = res.data
  })
}
add(){
   console.log(this.candidatesForm)
   let formValue=this.candidatesForm.value
   console.log(formValue.dob);
   let dob=formValue.dob
   var datePipe = new DatePipe('en-US');
   const parsedDate1 = new Date(formValue.dob);
  const dateArray1 = [
     parsedDate1.getFullYear(),  
     parsedDate1.getMonth() + 1, 
     parsedDate1.getDate()      
  ];
  const parsedDate2 = new Date(formValue.availability);

  const dateArray2 = [
     parsedDate2.getFullYear(),  
     parsedDate2.getMonth() + 1, 
     parsedDate2.getDate()      
  ];
  const parsedDate3 = new Date(formValue.applicationDate);

  const dateArray3 = [
     parsedDate3.getFullYear(),  
     parsedDate3.getMonth() + 1, 
     parsedDate3.getDate()      
  ];
  console.log(dateArray3)
  let url="EnterCandiate"
  this.requirementlist=[];
  this.requirementlist.push({  "requirementId": this.reqId})
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
    "applicationDate":dateArray3,
    "applyFrom":formValue.applyFrom
    // "status": "1"
}
console.log(data);
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

getAgencyList(){
  let url='getAgencyMasterList'
  this._service.get(url).subscribe(res=>{
  this.agencyList=res
  })
}



delete(appId){
  Swal.fire({
    title:"Are you really wants to delete..?",
    showCancelButton:true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes'
  }).then(result=>{
    console.log(result);
    if(result.isConfirmed==true)
    {
  let url='deleteApplicantCandiateList/'+appId
  this._service.get(url).subscribe((res)=>{
    if(res.respose=='Success')
    {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Candidate details deleted successfully',
      })
      this.showMyContainer=false 
      this.getTableData();
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
  this.getTableData();
}
  })
}
edit(id){
    this.editId=id;
    this.showMyContainer=true;
    let url='getByApplicantCandiateById/'+id
    this._service.get(url).subscribe((res)=>{
    this.editData=res
    var datePipe=new DatePipe('en-Us')
    let desig = Number(res.against);
    let dob=datePipe.transform(res.dateOfBirth,'dd-MM-yyyy')
    let availability=datePipe.transform(res.availability,'dd-MM-yyyy')
    let applicationDate=datePipe.transform(res.applicationDate,'dd-MM-yyyy')
    this.candidatesForm.get('applicationDate').setValue(applicationDate)
    this.candidatesForm.get('against').setValue(desig)
    this.candidatesForm.get('agency').setValue(res.agency)
    this.candidatesForm.get('state').setValue(res.state)
    this.candidatesForm.get('city').setValue(res.city)
    this.candidatesForm.get('firstName').setValue(res.firstName)
    this.candidatesForm.get('middleName').setValue(res.middleName)
    this.candidatesForm.get('lastName').setValue(res.lastName)
    this.candidatesForm.get('qualification').setValue(res.qualification)
    this.candidatesForm.get('dob').setValue(dob)
    this.candidatesForm.get('email').setValue(res.email)
    this.candidatesForm.get('phone').setValue(res.phone)
    this.candidatesForm.get('from').setValue(res.age)
    this.candidatesForm.get('gender').setValue(res.gender)
    this.candidatesForm.get('skill').setValue(res.skills)
    this.candidatesForm.get('experience').setValue(res.experience)
    this.candidatesForm.get('availability').setValue(availability)
    this.candidatesForm.get('applyFrom').setValue(res.applyFrom)
    this.candidatesForm.get('status').setValue(res.status)
  })
}
update(){
  let url='updateApplicantCandiateList/'+this.editId
  let formValue=this.candidatesForm.value
  let url1='getByApplicantCandiateById/'+this.editId
  this._service.get(url1).subscribe((res)=>{
  var datePipe = new DatePipe('en-US');
  let dob=datePipe.transform(res.dateOfBirth,'dd-MM-yyyy')
  let availability=datePipe.transform(res.availability,'dd-MM-yyyy')
  let applicationDate=datePipe.transform(res.applicationDate,'dd-MM-yyyy')
  console.log(formValue)
  if(formValue.dob==dob){
  let date=formValue.dob
  var dateOfBirth=date.split("-");
  console.log(dateOfBirth)
  let dateOfBirth1:any;
  dateOfBirth1=[dateOfBirth[1],dateOfBirth[0],dateOfBirth[2]]
  console.log(dateOfBirth1)
  var datePipe = new DatePipe('en-US');
  const parsedDate1 =new Date(dateOfBirth1);
  console.log(parsedDate1)
  this.dateArray1 = [
  parsedDate1.getFullYear(),
  parsedDate1.getMonth()+1,
  parsedDate1.getDate(),
  ];
  console.log(this.dateArray1)
  }
  else{
  const parsedDate1 = new Date(formValue.dob);
  this.dateArray1 = [
  parsedDate1.getFullYear(),  
  parsedDate1.getMonth() + 1, 
  parsedDate1.getDate()      
  ];
  console.log(parsedDate1)
  }
  if(formValue.availability==availability)
  {
    let date=formValue.availability
    var availabilityDate=date.split("-");
    console.log(availabilityDate)
    let availability1:any;
    availability1=[availabilityDate[1],availabilityDate[0],availabilityDate[2]]
    console.log(availability1)
    
    var datePipe = new DatePipe('en-US');
    const parsedDate2 =new Date(availability1);
    console.log(parsedDate2)
  
    this.dateArray2 = [
    parsedDate2.getFullYear(),
    parsedDate2.getMonth()+1,
    parsedDate2.getDate(),
    ];
    console.log(this.dateArray2)
  }
  else{
    const parsedDate2 = new Date(formValue.availability);
    this.dateArray2 = [
      parsedDate2.getFullYear(),  
      parsedDate2.getMonth() + 1, 
      parsedDate2.getDate()      
    ];
   console.log(this.dateArray2)
  }
  if(formValue.applicationDate==applicationDate)
  {
    let date=formValue.applicationDate
    var applicationD=date.split("-");
    console.log(applicationD)
    let applicationD1:any;
    applicationD1=[applicationD[1],applicationD[0],applicationD[2]]
    console.log(applicationD1)
    var datePipe = new DatePipe('en-US');
    const parsedDate3 =new Date(applicationD1);
    console.log(parsedDate3)
    this.dateArray3 = [
       parsedDate3.getFullYear(),
       parsedDate3.getMonth()+1,
       parsedDate3.getDate(),
    ];
    console.log(this.dateArray3)
  }
  else{
    const parsedDate3 = new Date(formValue.applicationDate);
    this.dateArray3 = [
       parsedDate3.getFullYear(),  
       parsedDate3.getMonth() + 1, 
       parsedDate3.getDate()      
    ];
    console.log(this.dateArray3)
  }
  let cvDoc:any;
  if(this.uploadDoc!=null){
   cvDoc=this.uploadDoc
  }
  else{
     cvDoc=this.editData.cvName
  }
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
      "dateOfBirth": this.dateArray1,
      "email": formValue.email,
      "phone": formValue.phone,
      "age": formValue.age,
      "gender": formValue.gender,
      "skills": formValue.skill,
      "cvName":  cvDoc ,
      "experience": formValue.experience,
      "availability": this.dateArray2,
      "against": formValue.against,
      "requirementDetails": this.requirementlist,
      "applicationDate":this.dateArray3,
      "applyFrom":formValue.applyFrom,
      "status":formValue.status
      // "status": "1"
  } 
  this._service.add(data,url).subscribe((res)=>{
    if(res.respose == "Success"){
      Swal.fire({
        icon: 'success',
        title: 'Candidate details updated successfully',
        showConfirmButton: false,
        timer: 1500
      })
      const currentRoute = this.router.url;
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]);
      }); 
    }
     else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
     }
  })
})
}
search()
{
  let form=this.filterForm.value
  let params = new HttpParams();
  params = params.append('against', form.designation);
  params = params.append('status', form.status);
  let url='getAllCandiateListByDesignation?against='+form.designation +'&status='+form.status
  this._service.get(url).subscribe((res)=>{
    res.forEach(element => {
      let desig = Number(element.against);
      let result=this.Desingation.filter((des:any)=>
      (des.designationMasterId==desig)) 
      console.log(result)
      this.tableData1.push({"applicantCandiateListId":element.applicantCandiateListId,"applicationDate":element.applicationDate,"firstName":element.firstName,"middleName":element.middleName,"lastName":element.lastName,"phone":element.phone,"email":element.email,"gender":element.gender,"skills":element.skills,"against":result[0].name,"cvName":element.cvName,"status":element.status})
      console.log(this.tableData1)
    })  
    this.filterData=this.tableData1
    console.log(this.filterData)
  })
}
}
