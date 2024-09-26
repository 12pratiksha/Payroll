import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AllModulesService } from "src/app/all-modules/all-modules.service";
import { DatePipe } from "@angular/common";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import Swal from "sweetalert2";

@Component({
  selector: "app-employee-profile",
  templateUrl: "./employee-profile.component.html",
  styleUrls: ["./employee-profile.component.css"],
})
export class EmployeeProfileComponent implements OnInit {
  @ViewChild('multiSelect') multiSelect;
  @ViewChild('docUpload')
  myInputVariable: ElementRef;
  public adminEmployeeForm: FormGroup;
  public addLeaveForm: FormGroup;
  public educationForm: FormGroup;
  public emergencyContactForm: FormGroup;
  public paymentForm: FormGroup;
  public assetsAssignedForm: FormGroup;
  public uploadDocForm: FormGroup;
  public experienceForm:FormGroup;
  showESIfield: boolean = false;
  public file:any;
 esiValue: boolean = false
  editId: any;
  public pipe = new DatePipe("en-US");
  employeeDetails: any;
  firstName: any;
  lastName: any;
  employeeID: any;
  companyEmail: any;
  employeecompanyEmail: any;
  employeereportingManager: any;
  public data = [];
  doc:any=[];
  public settings = {};
 bondDocuments: any[] = [{id: "1", value: 'Aadharcard'}, { id: "2", value: 'Pancard'},];
  bondId: any;
  bondValue: any;
  customPatterns = {
    V: { pattern: new RegExp("-?") },
    "0": { pattern: new RegExp("[0-9]") },
  };
  
  dtOptions: DataTables.Settings = {};
  showMyContainer:boolean=false;
  showAssetForm:boolean=false;
  filePath: string | ArrayBuffer;
  uploadAssetDoc: string | ArrayBuffer;
  uploadAssetfile: string | Blob;
  uploadfile: any;
  empDetails: any;
  weekoff: any;
  otApplicable:any;
  select1:any;
  select2:any;
  select3:any;
  select4:any;
  selectVal: any;
  dropdown: boolean;
  formula: boolean;
  employeeDeatil: any;
  education: any;
  experience: any;
  employeeQual: any;
  empQual: any;
  host: string;
  path=environment.apiEndpoint;
  image: string;
  uploadDoc: any;
  documentDetails: any;
  empExp: any;
  updateExperience: boolean=false;
  updateQual: boolean = false;
  updateExpId: any;
  editQualId: any;
  companyEmailId: any;
  dateOfBirth: any;
  address: string;
  gender: any;
  userType: any;
  filenameurl: string;
  image1: any;
  qualification: any;
  loginId: string;
  depart: any;
  desig: any;
  fingerPrintId:any;
  documentDetails_display: any=[];

  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    public _activatedroute: ActivatedRoute,
    public _service: AllModulesService,
    public http: HttpClient,
    
    
  ) {}

  ngOnInit() {
    this.loginId=localStorage.getItem('empid')
    this.userType=localStorage.getItem('type')
    console.log(this.userType)
    
    this.host=window.location.origin;
   
    
    const routeParam = this._activatedroute.snapshot.params;
    this.editId = routeParam.id;
    this.weekOff();
    this.getQualification()
    this.getAllAssetsAssigned()
    this.getDocument(); 
    this.getAssetsList();
    this.employeeProfileDetails();
    this.getEmployeewithID();
    this.getEmployeeQual();
    // this.getImageName();
    this.adminEmployeeForm = this.formBuilder.group({
      salaryon:[''],
      esino:[''],
      esidespensary:[''],
      tdsapplicable:[''],
      esiapplicable:[''],
      compoff:[''],
      uan:[''],
      pfapplicable:[''],
      pfno:[''],
      pfspecial:[''],
      epfapplicable:[''],
      epfspecial:[''],
      edli:[''],
      gratuityApplicable:[''],
      gratuityNo:[''],
      otapplicable:[''],
      aadharCardNo:[''],
      rfidCardNo:[''],
      votercardNo:[''],
      DOL:[''],
      bonusapplicable:[''],
      bonusspecial:[''],
      noticePeriod:[''],
      bondpplicable:[''],
      bondPeriod:[''],
      bondamount:[''],
      DOR:[''],
      ptApplicable:[''],
      bondDocuments:[''],
      headName:[''],
      otOvertime:[''],
      otHoursAllowance:[''],
      dailyBases:[''],
      dailyBasesAllowance:['']
    });
this.otApplicables();


    this.addLeaveForm = this.formBuilder.group({
      offDay:[''],
      dayFullHalf:[''],
      weekno:[''],
      aplicableDate:[''],
      status:[''],
    })

    this.educationForm = this.formBuilder.group({
      qualification:[''],
      unibord:[''],
      college:[''],
      score:[''],
      completeDate:[''],
    })

    this.emergencyContactForm = this.formBuilder.group({
name:[''],
relation:[''],
phone:[''],

    })

this.paymentForm = this.formBuilder.group({
  paymentMethod: [''],
  payeeName:[''],
  bankName:[''],
  branchCode:[''],
  branchName:[""],
  branchPhone:[''],
  accountType:[''],
  accountNo:[''],
  ifscCode: [''],

})

this.assetsAssignedForm = this.formBuilder.group({
  employeeId: [''],
  assetName: [''],
  assetValue: [''],
  description: [''],
  issueDate: [''],
  attachment: [''],
  givenFor: [''],
  tandc: [''],
  status: [''],
  repeatAsset: [''],

})

this.uploadDocForm = this.formBuilder.group({
  documentName:[''],
  documentType:[''],
  documentNum:[''],
  docFile:['']
})

this.experienceForm = this.formBuilder.group({
  lastOrg:[''],
  designation:[''],
  salary:[''],
  fromDate:[''],
  toDate:[''],
  reason:[''],
})

this.getAssetsList();
this.getEmployeeExp();
let url = "employee_master/getemployee/"+`${this.editId}`

this._service.get(url).subscribe((res)=>{
  console.log(res.fingerprint)
  this.fingerPrintId = res.fingerprint;
})
  }

  weekOff(){
  if(this.editId){
    const routeParam = this._activatedroute.snapshot.params;
    this.editId = routeParam.id;
    let url = 'employee_master/getEmplWeekOff/'+`${routeParam.id}`
    
    this._service.get(url).subscribe((res)=>{
    
      this.weekoff=res
    })
  }
  else{
    let url = 'employee_master/getEmplWeekOff/'+this.loginId
    
    this._service.get(url).subscribe((res)=>{
    
      this.weekoff=res
    }) 
  }
    }

  onSubmit() {
    this.toastr.success("Bank & statutory added", "Success");
  }



 employeeProfileDetails(){

if(this.editId){
  // alert("yesssssss")
let url = 'employee_master/getemployee/'+`${this.editId}`
this._service.get(url).subscribe((res)=>{
  console.log(res)
  this.fingerPrintId = res.fingerprint;

this.empDetails=res
let url='getDepartment/'+res.department
this._service.get(url).subscribe((res)=>{
  this.depart=res.departmentName
})
let url1 = 'getDesignationMaster/'+res.designation
this._service.get(url1).subscribe((res)=>{
  this.desig=res.name
})
let url2 = `${'state/getState/'}`+res.state
this._service.get(url2).subscribe((res1)=>{
 

this.image = this.path+'empimages/'+res.imageName
this.companyEmailId = res.companyEmailId;
this.dateOfBirth = res.dateOfBirth
this.address = res.address + " " + res1.stateName
this.gender = res.gender
})
})
}
else{
  // alert("noooooooooo")
  let url = 'employee_master/getemployee/'+this.loginId
  this._service.get(url).subscribe((res)=>{
    console.log(res)
  this.empDetails=res
  let url='getDepartment/'+res.department
this._service.get(url).subscribe((res)=>{
  this.depart=res.departmentName
})
let url1 = 'getDesignationMaster/'+res.designation
this._service.get(url1).subscribe((res)=>{
  this.desig=res.name
})
let url2 = `${'state/getState/'}`+res.state
this._service.get(url2).subscribe((res1)=>{
  this.image = this.path+'empimages/'+res.imageName
  this.companyEmailId = res.companyEmailId;
  this.dateOfBirth = res.dateOfBirth
  this.address = res.address + " " + res1.stateName
  this.gender = res.gender
  }) 
})
}
 }

 addLeaves(){


let Date = this.pipe.transform(
  this.addLeaveForm.value.aplicableDate,
  "yyyy-MM-dd"
);


let form =  this.addLeaveForm.value
let data = {
  offDay: form.offDay,
  dayFullHalf: form.dayFullHalf,
  weekNo: form.weekno,
  aplicableDate: Date,
  status: form.status,
  employeeId: this.editId
} 


let url = 'employee_master/addEmplWeekOff/'+`${this.editId}`

this._service.add(data,url).subscribe((res)=>{


})
this.weekOff();
this.addLeaveForm.reset();
Swal.fire(
  'Good job!',
  'WeekOff Addesd SuccessFully',
  'success'
)
 }

getQualification()
{
  this._service.get('getgetCodeByType?type=Qualification').subscribe((res)=>{
    this.qualification = res
    //console.log(this.qualification)
  })
}

addAdminInfo(){
if(this.editId){
 let url = "employee_master/addEmplAdministrativeInformation/"+`${this.editId}`

let form = this.adminEmployeeForm.value


let data = {

  pfSpecial: form.pfspecial,
  emplyrPFApplicable: form.epfapplicable,
  emplyrPFSpecial: form.epfspecial,
edliNo: form.edli,

gratuityNo: form.gratuityNo,
aadhaarCardNo: form.aadharCardNo,
rfidCardNo: form.rfidCardNo,
resignationDate: "",
fingerPrintId: this.fingerPrintId,
voterCardNo:  form.votercardNo,
dateOfLeaving: "",
bonusApplicable: form.bonusapplicable,
bonusSpecial: form.bonusspecial,
noticePeriod: form.noticePeriod,
bondApplicable: form.bondpplicable,
bondPeriod: form.bondPeriod,
bondAmount: form.bondamount,
bondDocuments:[this.bondId, this.bondValue],
uploadDate :"",
salaryOn: form.salaryon,
tdsApplicable: form.tdsapplicable,
ptApplicable: form.ptApplicable,
esIApplicable:  form.esiapplicable,
esiNo:form.esino,
esiDispensary: form.esidespensary,
compOffApplicable: form.compoff,
uan: form.uan,
pfApplicable: form.pfapplicable,
pfno: form.pfno,
gratuityApplicable:form.gratuityApplicable,
otApplicable:form.otapplicable,
headName:form.headName,
otOvertime:form.otOvertime,
otHoursAllowance:form.otHoursAllowance,
dailyBases:form.dailyBases,
dailyBasesAllowance:form.dailyBasesAllowance
}
this.selectVal=form.select

this._service.add(data,url).subscribe((res)=>{

})
Swal.fire(
  'Good job!',
  'Form Submitted Successfully',
  'success'
)
}
else{
  let url = "employee_master/addEmplAdministrativeInformation/"+`${this.loginId}`

  let form = this.adminEmployeeForm.value
  
  
  let data = {
  
    pfSpecial: form.pfspecial,
    emplyrPFApplicable: form.epfapplicable,
    emplyrPFSpecial: form.epfspecial,
  edliNo: form.edli,
  
  gratuityNo: form.gratuityNo,
  aadhaarCardNo: form.aadharCardNo,
  rfidCardNo: form.rfidCardNo,
  resignationDate: "",
  fingerPrintId: this.fingerPrintId,
  voterCardNo:  form.votercardNo,
  dateOfLeaving: "",
  bonusApplicable: form.bonusapplicable,
  bonusSpecial: form.bonusspecial,
  noticePeriod: form.noticePeriod,
  bondApplicable: form.bondpplicable,
  bondPeriod: form.bondPeriod,
  bondAmount: form.bondamount,
  bondDocuments:[this.bondId, this.bondValue],
  uploadDate :"",
  salaryOn: form.salaryon,
  tdsApplicable: form.tdsapplicable,
  ptApplicable: form.ptApplicable,
  esIApplicable:  form.esiapplicable,
  esiNo:form.esino,
  esiDispensary: form.esidespensary,
  compOffApplicable: form.compoff,
  uan: form.uan,
  pfApplicable: form.pfapplicable,
  pfno: form.pfno,
  gratuityApplicable:form.gratuityApplicable,
  otApplicable:form.otapplicable,
  headName:form.headName,
  otOvertime:form.otOvertime,
  otHoursAllowance:form.otHoursAllowance,
  dailyBases:form.dailyBases,
  dailyBasesAllowance:form.dailyBasesAllowance
  }
  this.selectVal=form.select
  
  this._service.add(data,url).subscribe((res)=>{
  
  })
  Swal.fire(
    'Good job!',
    'Form Submitted Successfully',
    'success'
  ) 
}
}

onChange(event){
  let value = event.target.value

  if (value=='CTC' || value=='Basic' || value=='Gross'){
this.select1=false
this.select2=false
this.select3=false
this.select4=false

// this.adminEmployeeForm.get('otApplicable3').setValue('')
// this.adminEmployeeForm.get('otApplicable4').setValue('')

  }
  else if(value=='Fixed Hourly'){
    this.select1=true
    this.select2=true
    
    
    // this.adminEmployeeForm.get('otApplicable4').setValue('')
   
   
  }
  else if(value=='Fixed Day')
  {
    this.select3=true
    this.select4=true
  }
  
  else if(value=='Formula'){
    // this.select=true
    // this.dropdown=false
    // this.formula=true
    this.select1=false
this.select2=false
this.select3=false
this.select4=false
    // this.adminEmployeeForm.get('otApplicable3').setValue('')
  }
}

getEmployeewithID(){
  // employee_master/getemployee/{employeeId}

let url = "employee_master/getemployee/"+`${this.editId}`

this._service.get(url).subscribe((res)=>{
  if(res.imageName){
    this.image = this.path+"empimages/"+ res.imageName
  }
  else{
    this.image = '/assets/img/user.jpg'
  }

 
  this.education = res.employeeQualification;
  this.experience = res.employeeExperience
  let value=res.headName

  if( value=='CTC' || value=='Basic' || value=='Gross'){
    // this.select=true
    // this.dropdown=false
    // this.formula=false
  
  }
  else if(value=='Fixed Hourly'){
    this.select1=true
    this.select2=true
    
    
   
   
  }
  else if(value=='Fixed Day')
  {
    this.select3=true
    this.select4=true
  }
  else if(value=='Formula'){
    // this.select=true
    // this.dropdown=false
    // this.formula=true
    
  }


  this.firstName = res.firstName
  this.lastName = res.lastName
this.employeeID = res.employeeId
this.employeecompanyEmail = res.companyEmailId
this.employeereportingManager = res.reportingManager

this.adminEmployeeForm.get('salaryon').setValue(res.salaryOn)
this.adminEmployeeForm.get('esidespensary').setValue(res.esiDispensary)
this.adminEmployeeForm.get('tdsapplicable').setValue(res.tdsApplicable)
this.adminEmployeeForm.get('esiapplicable').setValue(res.esIApplicable)
// this.adminEmployeeForm.get('compoff').setValue(res.compOffApplicable)
this.adminEmployeeForm.get('uan').setValue(res.uan)
this.adminEmployeeForm.get('pfapplicable').setValue(res.pfApplicable)
this.adminEmployeeForm.get('pfno').setValue(res.pfno)
this.adminEmployeeForm.get('pfspecial').setValue(res.pfSpecial)
this.adminEmployeeForm.get('epfapplicable').setValue(res.emplyrPFApplicable)
this.adminEmployeeForm.get('edli').setValue(res.edliNo)
this.adminEmployeeForm.get('gratuityApplicable').setValue(res.gratuityApplicable)
this.adminEmployeeForm.get('gratuityNo').setValue(res.gratuityNo)
this.adminEmployeeForm.get('otapplicable').setValue(res.otApplicable)
this.adminEmployeeForm.get('aadharCardNo').setValue(res.aadhaarCardNo)
this.adminEmployeeForm.get('rfidCardNo').setValue(res.rfidCardNo)
this.adminEmployeeForm.get('votercardNo').setValue(res.voterCardNo)
this.adminEmployeeForm.get('DOL').setValue(res.dateOfLeaving)
this.adminEmployeeForm.get('bonusapplicable').setValue(res.bonusApplicable)
this.adminEmployeeForm.get('bonusspecial').setValue(res.bonusSpecial)
this.adminEmployeeForm.get('noticePeriod').setValue(res.noticePeriod)
this.adminEmployeeForm.get('bondpplicable').setValue(res.bondApplicable)
this.adminEmployeeForm.get('bondPeriod').setValue(res.bondPeriod)
this.adminEmployeeForm.get('bondamount').setValue(res.bondAmount)
this.adminEmployeeForm.get('DOR').setValue(res.resignationDate)
this.adminEmployeeForm.get('ptApplicable').setValue(res.ptApplicable)
this.adminEmployeeForm.get('esino').setValue(res.esiNo)
this.adminEmployeeForm.get('epfspecial').setValue(res.emplyrPFSpecial)
this.adminEmployeeForm.get('compoff').setValue(res.compOffApplicable)
this.adminEmployeeForm.get('compoff').setValue(res.compOffApplicable)
this.adminEmployeeForm.get('compoff').setValue(res.compOffApplicable)
this.adminEmployeeForm.get('compoff').setValue(res.compOffApplicable)
this.adminEmployeeForm.get('headName').setValue(res.headName)
this.adminEmployeeForm.get('otOvertime').setValue(res.otOvertime)
this.adminEmployeeForm.get('otHoursAllowance').setValue(res.otHoursAllowance)
this.adminEmployeeForm.get('dailyBases').setValue(res.dailyBases)
this.adminEmployeeForm.get('dailyBasesAllowance').setValue(res.dailyBasesAllowance)
this.paymentForm.get('paymentMethod').setValue(res.paymentMethod)
this.paymentForm.get('payeeName').setValue(res.payeeName)
this.paymentForm.get('bankName').setValue(res.bankName)
this.paymentForm.get('branchCode').setValue(res.branchCode)
this.paymentForm.get('branchName').setValue(res.bankBranchName)
this.paymentForm.get('branchPhone').setValue(res.branchPhone)
this.paymentForm.get('accountType').setValue(res.accountType)
this.paymentForm.get('accountNo').setValue(res.accountNo)
this.paymentForm.get('ifscCode').setValue(res.ifscCode)
this.paymentForm.get('ifscCode').setValue(res.ifscCode)



})

}
// getImageName(){
// let url = "employee_master/getemployee/"+`${this.editId}`

// this._service.get(url).subscribe((res)=>{
//   this.image1=res.imageName
//   console.log(this.image1)
//   let url="Editlogo?imageName="+this.image1
//   console.log(url)
//   let params = new HttpParams();
//   params = params.append('imageName', this.image1);
//   this._service.get(url).subscribe(res=>{
//     console.log(res)
//   })
// })

// }


otApplicables(){
 
}


addEducationInfo(){
if(this.editId){
  let date = this.pipe.transform(
    this.educationForm.value.completeDate,
    "yyyy-MM-dd"
  );

let form = this.educationForm.value
let data = {
qualification: form.qualification,
board: form.unibord,
college: form.college,
passingYear:date,
description:"",
score: form.score 
}


let url = "addEmployeeQualification/"+`${this.editId}`
this._service.add(data,url).subscribe((res)=>{
  if (res.respose=="Success"){
    Swal.fire(
      'Good job!',
      'Form Submitted Successfully',
      'success'
    )
    this.getEmployeewithID();
    this.educationForm.reset();
    this.getEmployeeQual();
    this.getEmployeewithID();
  }
 
  else {
    Swal.fire(
      'Error',
      'Something went wrong',
      'error'
    )
  }
})
}else{
  let date = this.pipe.transform(
    this.educationForm.value.completeDate,
    "yyyy-MM-dd"
  );

let form = this.educationForm.value
let data = {
qualification: form.qualification,
board: form.unibord,
college: form.college,
passingYear:date,
description:"",
score: form.score 
}


let url = "addEmployeeQualification/"+`${this.loginId}`
this._service.add(data,url).subscribe((res)=>{
  if (res.respose=="Success"){
    Swal.fire(
      'Good job!',
      'Form Submitted Successfully',
      'success'
    )
    this.getEmployeewithID();
    this.educationForm.reset();
    this.getEmployeeQual();
    this.getEmployeewithID();
  }
 
  else {
    Swal.fire(
      'Error',
      'Something went wrong',
      'error'
    )
  }
}) 
}

}

addemergencyContact(){

  let form = this.emergencyContactForm.value

let url = "employee_master/addEmplEmergencyDetails/"+`${this.editId}`

let Data = {
  emergContactName:form.name,
  emergMobileNo: form.phone,
}
this._service.update(Data, url).subscribe((res)=>{
})
}

updatePaymentDetails(){

let form = this.paymentForm.value
  let data = {
     paymentMethod: form.paymentMethod,
		 payeeName: form.payeeName,
		 bankName: form.bankName,
		 branchCode: form.branchCode,
		 bankBranchName: form.branchName,
		 branchPhone: form.branchPhone,
		 accountType: form.accountType,
		 accountNo: form.accountNo,
		 ifscCode: form.ifscCode,

  }
let url = "employee_master/addEmplPaymentDetails/"+`${this.editId}`

this._service.add(data, url).subscribe((res)=>{

})
Swal.fire(
  'Good job!',
  'Form Submitted Successfully',
  'success'
)
}
bondDocumentsvalue(event){

  this.bondId =  this.bondDocuments[event.target.value].id
  this.bondValue = this.bondDocuments[event.target.value].value


}
// exportexcel(item,item2): void
//   {
// console.log(item,item2)
   
// '<a href="url"></a>'
//     //let url = this.host+""+item;
//     this.filenameurl=url;
   
//     this.http.get(url, { responseType: 'blob' }).subscribe(val => {
//       // this.zipdownload=true;
//       const url = URL.createObjectURL(val);
//       this.downloadUrl(url, "item2" + '.jpg');
//       URL.revokeObjectURL(url);

//     });
//   }
//   downloadUrl(url: string, fileName: string) {
//     const a: any = document.createElement('a');
//     a.href = url;
//     a.download = fileName;
//     document.body.appendChild(a);
//     a.style = 'display: none';
//     a.click();
//     a.remove();
//   }
myfile:any;
uploadFile(event) {
  let file = event.target.files[0];
 // console.log(file.name)
  this.uploadDoc = file.name
  this.myfile=file;
  // const formData = new FormData();
  //   formData.append('file', file);
  //   this._service.uploadFile(formData,"uploadEmployeeDocument").subscribe((res)=>{
  //     console.log(res)
  //     this.uploadDoc = res
  //     console.log(this.uploadDoc)
   
  //   })
}

uploadDocument(){
if(this.editId){
console.log(this.editId)
 let url = "addEmployeeDocuments"
    // let data = {
    //   docName: this.uploadDocForm.value.documentName,
    //   docType:this.uploadDocForm.value.documentType,
    //   docNo:this.uploadDocForm.value.documentNum,
    //   file: this.myfile,
    //   employeeId:this.editId
    // }


    const formData = new FormData();
    formData.append('docName', this.uploadDocForm.value.documentName);

    formData.append('docType', this.uploadDocForm.value.documentType);
    formData.append('docNo', this.uploadDocForm.value.documentNum);
    formData.append('file', this.myfile);
    formData.append('employeeId', this.editId);
    this._service.uploadFile(formData,"addEmployeeDocuments").subscribe((res)=>{

    // this._service.add(formData, url).subscribe((res)=>{
    
      if(res.respose=="Success"){
        Swal.fire(
          'Good job!',
          'Document uploaded Successfully',
          'success'
        )
        
        this.myInputVariable.nativeElement.value="";
        this.getDocument();
        this.uploadDocForm.reset();
      }
      else{
        Swal.fire(
          'Error',
          'Something went wrong',
          'error'
        )
      }
    })
  }
  else{
    let url = "addEmployeeDocuments"
    // let data = {
    //   docName: this.uploadDocForm.value.documentName,
    //   docType:this.uploadDocForm.value.documentType,
    //   docNo:this.uploadDocForm.value.documentNum,
    //   file: this.myfile,
    //   employeeId:this.editId
    // }


    const formData = new FormData();
    formData.append('docName', this.uploadDocForm.value.documentName);

    formData.append('docType', this.uploadDocForm.value.documentType);
    formData.append('docNo', this.uploadDocForm.value.documentNum);
    formData.append('file', this.myfile);
    formData.append('employeeId', this.loginId);
    this._service.uploadFile(formData,"addEmployeeDocuments").subscribe((res)=>{

    // this._service.add(formData, url).subscribe((res)=>{
    
      if(res.respose=="Success"){
        Swal.fire(
          'Good job!',
          'Document uploaded Successfully',
          'success'
        )
        
        this.myInputVariable.nativeElement.value="";
        this.getDocument();
        this.uploadDocForm.reset();
      }
      else{
        Swal.fire(
          'Error',
          'Something went wrong',
          'error'
        )
      }
    }) 
  }
 
}

getDocument(){
  console.log(this.editId)
  if(this.editId){
  let url = "getEmployeeDocuments/"+`${this.editId}`
  this._service.get(url).subscribe((res)=>{
  this.documentDetails = res
  
  // this.documentDetails.forEach(element => {
  //   let image=this.path+"empdoc/"+element.imageName
  //   this.documentDetails_display.push({"docName":element.docName,"docNo":element.docNo,"emplDocId":element.emplDocId,"imageName":image})

  // });
  console.log(this.documentDetails)
})
  }
  else{
    let url = 'getEmployeeDocuments/'+this.loginId
    this._service.get(url).subscribe((res)=>{
    this.documentDetails = res
    console.log(this.documentDetails)
  }) 
  }
}
download(item){
  console.log(item.imageName)
  let params = new HttpParams();

  params = params.append('imageName',item.imageName); 
  let url = 'EditAndDownloadEmployeeDocument?imageName='+`${item.imageName}`
  this._service.get(url).subscribe((res)=>{
    console.log(res)
    let resp=res.data.path
  
    // const link = document.createElement('a');
    // link.setAttribute('target', '_blank');
    // link.setAttribute('href', 'url');
    // link.setAttribute('download', 'Document.pdf');
    // document.body.appendChild(link);
    // link.click();
    // link.remove();
    const url = window.URL.createObjectURL(resp);
    window.open(url, "_blank")
  })
}
  downloadUrl(url: string, fileName: string) {
    const a: any = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.style = 'display: none';
    a.click();
    a.remove();
  }

    
  

deleteDoc(id){
  
  console.log(id)
  let url="deleteEmployeeDocuments/"+id
  this._service.get(url).subscribe((res)=>{
    console.log(res)
    if (res.respose=="Success"){
      Swal.fire(
        'Good job!',
        'Document Deleted Successfully',
        'success'
      )
      this.experienceForm.reset();
      this.getDocument();
      this.getEmployeewithID();
    }
    
      else {
        Swal.fire(
          'Error',
          'Something went wrong',
          'error'
        )
      }
  })
  
 }

assetsAssigned(){

 let formValue = this.assetsAssignedForm.value

 let date = this.pipe.transform(
  formValue.issueDate, "yyyy-MM-dd"
  );

 const formData = new FormData();

 let edata="{\"assetName\":\""+formValue.assetName+"\",\"assetValue\":\""+formValue.assetValue+"\",\"description\":\""+formValue.description+"\",\"issueDate\":\""+date+"\",\"officeUse\":\""+formValue.givenFor+"\",\"isTermsAndCondition\":\""+formValue.tandc+"\",\"isStatus\":"+formValue.status+",\"isRepeatAsset\":"+formValue.repeatAsset+",\"employeeId\":\""+this.employeeID+"\"}";

 formData.append('emplAssAssgn', edata);
 formData.append('attachment', this.uploadAssetfile);


 this._service.uploadFile(formData,"assetsAssign/addAssetsAssign").subscribe(result=>{

  
 if (result.returnstatus == "success"){
   alert("File was uploaded successfully");
   this.assetsAssignedForm.reset();
   this.showAssetForm = false;

 }

 })


// this._service.get("assetsAssign/uploadfile").subscribe((res)=>{
// console.log(res)
// })



  }

  public localUrl:any;

  uploadAssetsFile(event) {
     this.uploadAssetfile = event.target.files[0];
   

}
    // const reader = new FileReader();
    // reader.readAsDataURL(file);
    // reader.onload = () => {
     
    //     console.log(reader.result);
    //     this.uploadAssetDoc = reader.result;
    // };
  

  getAssetsList(){
    let url = "assetsAssign/getAssignAsset/"+`${this.editId}`

    this._service.get(url).subscribe((res)=>{
      
    })
  }

getAllAssetsAssigned(){

  this._service.get('assetsAssign/getAllAssetAssign').subscribe((res)=>{


  })
}
empExperience(){
  if(this.editId){
  let  url = 'addEmployeeExperience/'+`${this.editId}`
  let form = this.experienceForm.value
  let fromDate = this.pipe.transform(
    form.fromDate, "yyyy-MM-dd"
    );
    let toDate = this.pipe.transform(
      form.toDate, "yyyy-MM-dd"
      );
  
  let data = {
    organization: form.lastOrg,
    lastSalary: form.salary,
    startDate: fromDate,
    endDate: toDate,
    leavingReason: form.reason,
    designation: form.designation
  }
 this._service.add(data, url).subscribe((res)=>{

  if (res.respose=="Success"){
    Swal.fire(
      'Good job!',
      'Experience Added Successfully',
      'success'
    )
    this.experienceForm.reset();
    this.getEmployeeExp();
    this.getEmployeewithID();
  }
  else {
    Swal.fire(
      'Error',
      'Something went wrong',
      'error'
    )
  }
 })

}
else{
  let  url = 'addEmployeeExperience/'+`${this.loginId}`
  let form = this.experienceForm.value
  let fromDate = this.pipe.transform(
    form.fromDate, "yyyy-MM-dd"
    );
    let toDate = this.pipe.transform(
      form.toDate, "yyyy-MM-dd"
      );
  
  let data = {
    organization: form.lastOrg,
    lastSalary: form.salary,
    startDate: fromDate,
    endDate: toDate,
    leavingReason: form.reason,
    designation: form.designation
  }
 this._service.add(data, url).subscribe((res)=>{

  if (res.respose=="Success"){
    Swal.fire(
      'Good job!',
      'Experience Added Successfully',
      'success'
    )
    this.experienceForm.reset();
    this.getEmployeeExp();
    this.getEmployeewithID();
  }
  else {
    Swal.fire(
      'Error',
      'Something went wrong',
      'error'
    )
  }
 })
}

}


deleteExp(id){
if(this.editId){
let url = "deleteEmployeeExperience?EmployeeId="+`${this.editId}`+"&EmployeeExperienceId="+`${id}`

this._service.get(url).subscribe((res)=>{
  if (res.respose=="Success"){
    Swal.fire(
      'Good job!',
      'Experience Deleted Successfully',
      'success'
    )
    this.experienceForm.reset();
    this.getEmployeeExp();
    this.getEmployeewithID();
  }
  
    else {
      Swal.fire(
        'Error',
        'Something went wrong',
        'error'
      )
    }
})
}
else{
  let url = "deleteEmployeeExperience?EmployeeId="+`${this.loginId}`+"&EmployeeExperienceId="+`${id}`

  this._service.get(url).subscribe((res)=>{
    if (res.respose=="Success"){
      Swal.fire(
        'Good job!',
        'Experience Deleted Successfully',
        'success'
      )
      this.experienceForm.reset();
      this.getEmployeeExp();
      this.getEmployeewithID();
    }
    
      else {
        Swal.fire(
          'Error',
          'Something went wrong',
          'error'
        )
      }
  }) 
}
  
}
getEmployeeQual(){
  if(this.editId){
  let url = "getEmployeeQualification/"+`${this.editId}`
  this._service.get(url).subscribe((res)=>{
this.employeeQual= res
  })
}
else{
  let url = "getEmployeeQualification/"+`${this.loginId}`
  this._service.get(url).subscribe((res)=>{
this.employeeQual= res
  }) 
}
}

getEmployeeExp(){
  if(this.editId){
  let url = "getEmployeeExperience/"+`${this.editId}`
  this._service.get(url).subscribe((res)=>{
this.empExp = res
  })
}
else{
  let url = "getEmployeeExperience/"+`${this.loginId}`
  this._service.get(url).subscribe((res)=>{
this.empExp = res
  }) 
}
}

deleteQual(id){
  let url = "deleteEmployeeQualification?EmployeeId="+`${this.editId}`+"&EmployeeQualificationId="+`${id}`

  this._service.get(url).subscribe((res)=>{
    if (res.respose=="Success"){
      Swal.fire(
        'Good job!',
        'Experience Deleted Successfully',
        'success'
      )
      this.getEmployeewithID();
      this.educationForm.reset();
      this.getEmployeeQual();
      this.getEmployeewithID();
    }
    
      else {
        Swal.fire(
          'Error',
          'Something went wrong',
          'error'
        )
      }
  })
  }
editQual(id){
  if(this.editId){
  this.editQualId = id;
 this.updateQual = true;
let url = "getOneEmployeeQualification?EmployeeId="+`${this.editId}`+"&EmployeeQualificationId="+`${id}`
this._service.get(url).subscribe((res)=>{

let date = this.pipe.transform(
  res.passingYear,
  "dd-MM-yyyy"
);
this.educationForm.get('qualification').setValue(res.qualification)
this.educationForm.get('unibord').setValue(res.board)
this.educationForm.get('college').setValue(res.college)
this.educationForm.get('score').setValue(res.score)
this.educationForm.get('completeDate').setValue(date)

});
  }
  else{
    this.editQualId = id;
 this.updateQual = true;
let url = "getOneEmployeeQualification?EmployeeId="+`${this.loginId}`+"&EmployeeQualificationId="+`${id}`
this._service.get(url).subscribe((res)=>{

let date = this.pipe.transform(
  res.passingYear,
  "dd-MM-yyyy"
);
this.educationForm.get('qualification').setValue(res.qualification)
this.educationForm.get('unibord').setValue(res.board)
this.educationForm.get('college').setValue(res.college)
this.educationForm.get('score').setValue(res.score)
this.educationForm.get('completeDate').setValue(date)

}); 
  }
}
editExp(id){
  this.updateExpId = id
  this.updateExperience = true;
  if(this.editId){
 let url = "getOneEmployeeExperience?EmployeeId="+`${this.editId}`+"&EmployeeExperienceId="+`${id}`
 this._service.get(url).subscribe((res)=>{

 let fromDate = this.pipe.transform(
   res.startDate,
   "dd-MM-yyyy"
 );
 let toDate = this.pipe.transform(
   res.endDate,
   "dd-MM-yyyy"
 );
 this.experienceForm.get('lastOrg').setValue(res.organization)
 this.experienceForm.get('designation').setValue(res.designation)
 this.experienceForm.get('salary').setValue(res.lastSalary)
 this.experienceForm.get('fromDate').setValue(fromDate)
 this.experienceForm.get('toDate').setValue(toDate)
 this.experienceForm.get('reason').setValue(res.leavingReason)

 
 });
}
else{
  let url = "getOneEmployeeExperience?EmployeeId="+`${this.loginId}`+"&EmployeeExperienceId="+`${id}`
  this._service.get(url).subscribe((res)=>{
 
  let fromDate = this.pipe.transform(
    res.startDate,
    "dd-MM-yyyy"
  );
  let toDate = this.pipe.transform(
    res.endDate,
    "dd-MM-yyyy"
  );
  this.experienceForm.get('lastOrg').setValue(res.organization)
  this.experienceForm.get('designation').setValue(res.designation)
  this.experienceForm.get('salary').setValue(res.lastSalary)
  this.experienceForm.get('fromDate').setValue(fromDate)
  this.experienceForm.get('toDate').setValue(toDate)
  this.experienceForm.get('reason').setValue(res.leavingReason)
 
  
  }); 
}
 }
 cancel(){
  this.educationForm.reset();
  this.experienceForm.reset();
  this.updateExperience = false;
  this.updateQual = false;

 }
 updateQualification(){
 let url = "updateEmployeeQualification?EmployeeId="+`${this.editId}`+"&EmployeeQualificationId="+`${this.editQualId}`

 let date = this.pipe.transform(
  this.educationForm.value.completeDate,
  "yyyy-MM-dd"
);

let form = this.educationForm.value
let data = {
qualification: form.qualification,
board: form.unibord,
college: form.college,
passingYear:date,
description:"",
score: form.score 
}
this._service.add(data,url).subscribe((res)=>{
  if (res.respose=="Success"){
    Swal.fire(
      'Good job!',
      'Form Submitted Successfully',
      'success'
    )
    this.updateQual = false;
    this.getEmployeewithID();
    this.educationForm.reset();
    this.getEmployeeQual();
    this.getEmployeewithID();

  }
 
  else {
    Swal.fire(
      'Error',
      'Something went wrong',
      'error'
    )
  }
})
 }

 updateExp(){
if(this.editId){
let url = "updateEmployeeExperience?EmployeeId="+`${this.editId}`+"&EmployeeExperienceId="+`${this.updateExpId}`
let form = this.experienceForm.value
  let fromDate = this.pipe.transform(
    form.fromDate, "yyyy-MM-dd"
    );
    let toDate = this.pipe.transform(
      form.toDate, "yyyy-MM-dd"
      );
  
  let data = {
    organization: form.lastOrg,
    lastSalary: form.salary,
    startDate: fromDate,
    endDate: toDate,
    leavingReason: form.reason,
    designation: form.designation
  }
 this._service.add(data, url).subscribe((res)=>{

  if (res.respose=="Success"){
    Swal.fire(
      'Good job!',
      'Experience Added Successfully',
      'success'
    )
    this.experienceForm.reset();
    this.getEmployeeExp();
    this.getEmployeewithID();
    this.updateExperience;
  }
  else {
    Swal.fire(
      'Error',
      'Something went wrong',
      'error'
    )
  }
 })
}
else{
  let url = "updateEmployeeExperience?EmployeeId="+`${this.loginId}`+"&EmployeeExperienceId="+`${this.updateExpId}`
  let form = this.experienceForm.value
    let fromDate = this.pipe.transform(
      form.fromDate, "yyyy-MM-dd"
      );
      let toDate = this.pipe.transform(
        form.toDate, "yyyy-MM-dd"
        );
    
    let data = {
      organization: form.lastOrg,
      lastSalary: form.salary,
      startDate: fromDate,
      endDate: toDate,
      leavingReason: form.reason,
      designation: form.designation
    }
   this._service.add(data, url).subscribe((res)=>{
  
    if (res.respose=="Success"){
      Swal.fire(
        'Good job!',
        'Experience Added Successfully',
        'success'
      )
      this.experienceForm.reset();
      this.getEmployeeExp();
      this.getEmployeewithID();
      this.updateExperience;
    }
    else {
      Swal.fire(
        'Error',
        'Something went wrong',
        'error'
      )
    }
   }) 
}
 }
 
}

