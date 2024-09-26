import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { AllModulesService } from "src/app/all-modules/all-modules.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { DatePipe } from "@angular/common";
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from "@angular/router";
import Swal from 'sweetalert2'


declare const $: any;
@Component({
  selector: 'app-edit-with-id',
  templateUrl: './edit-with-id.component.html',
  styleUrls: ['./edit-with-id.component.css']
})
export class EditWithIdComponent implements OnInit {
  yourFileData: File | null = null;
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  submitLoader : boolean = false
  @ViewChild('myInput')
  myInputVariable: ElementRef;
  dtOptions: any = {};
  date:any;
  public lstEmployee: any;
  public url: any = "employeelist";
  public tempId: any;
  public 
  
  editId: any;
  customPatterns = {
    V: { pattern: new RegExp("-?") },
    "0": { pattern: new RegExp("[0-9]") },
  };
  path=environment.apiEndpoint;
  result:any;
  data =[]
  loginData:any;


  public addEmployeeForm: FormGroup;
  public editEmployeeForm: FormGroup;
  showMyContainer:boolean=true;

  
  public pipe = new DatePipe("en-US"); 
  public rows = [];
  public srch = [];
  public statusValue;
  public dtTrigger: Subject<any> = new Subject();
  public DateJoin;
  stateList: any;
  branchList: any;
  employeeID: any;
  editEmployeeform: any;
  deleteEmployeeid: any;
  selectedId: any;
  designations: any;
  departments: any;
  categories: any;
  religion: any;
  grade: any;
  contractorData: any;
  errorMsg: any;
  profilePhoto: any;
  image: string;
  host: string;
  photo: any;
  subDepartment: any;
  company: any;
  // emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  emailPattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";
  doj: { ans: string; minDate: Date; }[];
  empexperience: string;
  image1: any;
  baseUrl:any;
  imagePath: string;
  i1: any;
  i2: any;
  ImName: any;
  array: any=[];
  employee1: any;
  selected: any;
  selected1: string;
  employee2: any;
  constructor(
    private srvModuleService: AllModulesService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    public HttpClient :HttpClient,
    private router: Router,
    public _activatedroute: ActivatedRoute,
  ) { 
   
  }

  ngOnInit() {
    this.host=window.location.origin;
    this.getCategories();

      var   eighteenYearsAgo = new Date();
      let eighteen = eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear());
      let date =  this.pipe.transform(eighteen, "dd-MM-yyyy")
      let maxdate = this.pipe.transform(new Date(), "dd-MM-yyyy")
      
      this.data = [{ans: '',minDate: new Date(eighteen), maxDate: maxdate}]
      this.doj = [{ans: '',minDate: new Date()}]
  
    
    this.getState();
    this.getBranch();
    this.getReligion();
    this.path=environment.apiEndpoint;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'print'
        ]
    };
    this.getGrade();
    this.contractor();
    this.getBloodGroup()
    // for floating label
    this.loginData = localStorage.getItem('LoginData');
    const routeParam = this._activatedroute.snapshot.params;
    this.editId = routeParam.id;

    this.loadEmployee();
    // add employee form validation
    this.addEmployeeForm = this.formBuilder.group({
      employeeCode:['',Validators.required],
      salutation:[''],
      FirstName: ["", Validators.required],
      MiddleName: ["",],
      LastName: ["", Validators.required],
      Email: ["", [Validators.pattern(this.emailPattern)]],
      DOJ: ["", Validators.required],
      EmployeeID: ["",],
      Gender:['',Validators.required],
      Experience:['',],
      DOB:['',Validators.required],
      State: ['',],
      Branch:['',Validators.required],
      company:['',Validators.required],
      Category: ["",Validators.required],
      Department: ['',Validators.required],
      Designation:['',Validators.required],
      Grade: ['',Validators.required],
      ReportingManager: [],
      empstatus: ['1', Validators.required],
      subCategory: ['', ],
      subDepartment: ['',Validators.required],
      probation: ['', ],
      bloodGroup: [''],
      religion: [''],
      panno: [''],
      personalEmail: ['', Validators.pattern(this.emailPattern)],
      address: ['', ],
      ReportingManager2: [],
      contractor:['',],
      probationDate:[''],
      fingerprint:[''],
      mobileno:['',],
      whatsappno:['',],
      permanantadd:['',],
      drivingLicenseNo:[],
      lockUnlock:[''],
      uploadphoto:[]
    });

    // this.department();
    this.designation();
    this.getdept();
  this.subDepartments();
    this.getCompany();
    this.editEmployee();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }

  loadEmployee() {
    this.srvModuleService.get("employee_master/getemployees/").subscribe((data) => {
    this.lstEmployee = data;
    this.selectedId=data[0].employeeId;
    });
  }
  subDepartments(){
    let id=this.addEmployeeForm.value.Department
    if (this.editId == 'add' && id){
    let url='getAllSubDepartmentBydepartmentId?departmentName='+this.addEmployeeForm.value.Department
    this.srvModuleService.get(url).subscribe((res)=>{
      this.subDepartment = res
    })
  }
  else{
    this.srvModuleService.get('subDepartment/getSubDepartments').subscribe((res)=>{
      this.subDepartment=res
    })
  }
  }
  getdept(){
    let id=this.addEmployeeForm.value.Branch
    if (this.editId == 'add' && id){
      // alert(1111)
    console.log(this.addEmployeeForm.value.Department)
    
    let url='getAllDepartmentBybranchId/'+id
    this.srvModuleService.get(url).subscribe((res)=>{
      this.departments=res
      })
    }
    else{
      // alert(222)
      this.srvModuleService.get('getAllDepartment').subscribe((res)=>{
        this.departments=res
        })

    }
  }

  change(e){

  }

  from(data) {
    this.DateJoin = this.pipe.transform(data, "dd-MM-yyyy");
  }

  deleteEmployee(id) {

    
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
          this.srvModuleService.delete(id, 'employee_master/delete_employee').subscribe((data) =>{
      
          })
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
        this.loadEmployee();
      })
  }

  handleUpload(event) {
 
    const file = event.target.files[0];
  
    
      const formData = new FormData();
      formData.append('file', file);
      console.log(file)
      this.srvModuleService.uploadFile(formData,"employee_master/uploadlogo").subscribe((res)=>{
        
       this.profilePhoto = res.data[0].firstName
       console.log( this.profilePhoto )
      
      //  this.imagePath = this.baseUrl+""+res.data[0].photo
      //  console.log(this.imagePath)
      })
    
  
  }



 


 
addEmployes(){
if(this.addEmployeeForm.status == "VALID"){
  this.submitLoader = true 
  {
    
    let joinDate = this.pipe.transform(
      this.addEmployeeForm.value.DOJ,
      "yyyy-MM-dd"
    );
    let birthDate = this.pipe.transform(
      this.addEmployeeForm.value.DOB,
      "yyyy-MM-dd"
    );
   
  let employeeDetails = this.addEmployeeForm.value
  
  var datePipe = new DatePipe('en-US');
  let dateOfJoining = datePipe.transform(this.addEmployeeForm.value.DOJ,'yyyy-MM-dd');
  let dateOfBirth = datePipe.transform(this.addEmployeeForm.value.DOB,'yyyy-MM-dd');
  let probationDate = datePipe.transform(this.addEmployeeForm.value.probationDate,'yyyy-MM-dd');
  let rp1;

  let rp3='';
  if(employeeDetails.ReportingManager){
  let emp=employeeDetails.ReportingManager.split(" ");
   let rp=this.lstEmployee.filter((emply)=>
   (emply.employeeCode == emp[0]))
   console.log(rp)
   rp1= rp[0].employeeId

   }
   else{
    rp1='';
   }

   if(employeeDetails.ReportingManager2){
   let emp1=employeeDetails.ReportingManager2.split(" ");
   let rp2=this.lstEmployee.filter((emply)=>
   (emply.employeeCode == emp1[0]))
   console.log(rp2)
   rp3=rp2[0].employeeId
   }
   else{
    rp3='';
   }

  let data = {
    employeeCode:employeeDetails.employeeCode,
    salutation:employeeDetails.salutation,
    firstName : employeeDetails.FirstName,
    middleName: employeeDetails.MiddleName,
    lastName: employeeDetails.LastName,
    gender: employeeDetails.Gender,
    experience: employeeDetails.Experience,
    companyEmailId: employeeDetails.Email,
  state: employeeDetails.State,
  branch: employeeDetails.Branch,
  category: employeeDetails.Category,
  subCategory: employeeDetails.subCategory,
  department: employeeDetails.Department,
  subDepartment: employeeDetails.subDepartment,
  subDepartment1: "",
  subDepartment2: "",
  subDepartment3: "",
  panNo:employeeDetails.panno,
  designation: employeeDetails.Designation,
  grade: employeeDetails.Grade,
  reportingManager1:rp1,
  reportingManager2:rp3,
  bloodGroup:employeeDetails.bloodGroup,
  probation:employeeDetails.probation,
  status: employeeDetails.empstatus,
  contractor:employeeDetails.contractor,
  address:employeeDetails.address,
  dateOfJoining: dateOfJoining,
  dateOfBirth: dateOfBirth,
  imageName:this.profilePhoto,
  personalEmailId:employeeDetails.personalEmail,
  religion: employeeDetails.religion,
  company: employeeDetails.company,
  fingerprint: employeeDetails.fingerprint,
  uploadDate:"",
  probationDate: probationDate,
  mobileNumber:employeeDetails.mobileno,
  whatssappNo:employeeDetails.whatsappno,
  permanentAddress:employeeDetails.permanantadd,
  lockUnlock:employeeDetails.lockUnlock,
  drivingLicenseNo:employeeDetails.drivingLicenseNo
  
  }
  console.log(data);

    this.srvModuleService.add(data,'employee_master/employee').subscribe((res)=>{
      this.submitLoader = false 
if(res.respose=="Success"){
  Swal.fire({

    icon: 'success',
    title: 'Employee Added Successfully',
    showConfirmButton: false,
    timer: 1500
  })
 
  this.router.navigate(['layout/employees/employeelist'])
}
if(res.respose=="Already"){
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Employee Code Already Exists',
   
  })
}
     
    })
   
  }
}
else{
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Something went wrong!',
   
  })
this.addEmployeeForm.markAllAsTouched()
}
}




// stateDropdown    


getState(){
this.srvModuleService.get('state/getStateList')
.subscribe((res)=>{
this.stateList = res
})
}

// get Branch Dropdown

getBranch(){
  let branchId:any;
  let branchStatus
  this.srvModuleService.get('branch/getBranchList').subscribe((res)=>{
  branchId=localStorage.getItem('branchId')
  branchStatus=localStorage.getItem('branchStatus')
  if(branchStatus=='true'){
    let resultBranch =res.filter((brch: any) =>
    (brch.id==branchId) )
    this.branchList=resultBranch
  }

  else{
    this.branchList = res
  }
  })
}

editEmployee(){
if (this.editId == 'add'){
  return
}
let url = "employee_master/getemployee/"+`${this.editId}`

this.srvModuleService.get(url).subscribe((res)=>{
this.editEmployeeform = res
// let emp=this.addEmployeeForm.value.ReportingManager.split(" ");
// let emp1=res.reportingManager1
// let emply1=this.lstEmployee.filter((emply)=>
// (emply.employeeCode == emp1))
// let rp1=emply1[0].employeeCode+" "+emply1[0].firstName+" "+emply1[0].lastName
// console.log(rp1)
// let emp2=res.reportingManager2
// let emply2=this.lstEmployee.filter((emply2)=>
// (emply2.employeeCode == emp2))
// let rp2=emply2[0].employeeCode+" "+emply2[0].firstName+" "+emply2[0].lastName

var datePipe = new DatePipe('en-US');
let dateOfJoining = datePipe.transform(this.editEmployeeform.dateOfJoining,'yyyy-MM-dd');
let dateOfBirth = datePipe.transform(this.editEmployeeform.dateOfBirth,'yyyy-MM-dd');
let probationDate = datePipe.transform(this.editEmployeeform.probationDate,'yyyy-MM-dd');
this.addEmployeeForm.get('employeeCode').setValue(this.editEmployeeform.employeeCode)
this.addEmployeeForm.get('salutation').setValue(this.editEmployeeform.salutation)
this.addEmployeeForm.get('FirstName').setValue(this.editEmployeeform.firstName)
this.addEmployeeForm.get('LastName').setValue(this.editEmployeeform.lastName)
this.addEmployeeForm.get('MiddleName').setValue(this.editEmployeeform.middleName)
this.addEmployeeForm.get('Email').setValue(this.editEmployeeform.companyEmailId)
this.addEmployeeForm.get('DOJ').setValue(dateOfJoining.toString())
this.addEmployeeForm.get('EmployeeID').setValue(this.editEmployeeform.employeeId)
this.addEmployeeForm.get('Gender').setValue(this.editEmployeeform.gender)
this.addEmployeeForm.get('probation').setValue(this.editEmployeeform.probation)
this.addEmployeeForm.get('DOB').setValue(dateOfBirth.toString())
this.addEmployeeForm.get('State').setValue(this.editEmployeeform.state)
this.addEmployeeForm.get('Branch').setValue(this.editEmployeeform.branch) 
this.addEmployeeForm.get('Category').setValue(this.editEmployeeform.category)
this.addEmployeeForm.get('Department').setValue(this.editEmployeeform.department)
this.addEmployeeForm.get('Designation').setValue(this.editEmployeeform.designation)
this.addEmployeeForm.get('Grade').setValue(this.editEmployeeform.grade)
this.addEmployeeForm.get('ReportingManager').setValue(this.editEmployeeform.reportingManager1)
// this.addEmployeeForm.get('ReportingManager').setValue(rp1)
this.addEmployeeForm.get('empstatus').setValue(this.editEmployeeform.status)
this.addEmployeeForm.get('subCategory').setValue(this.editEmployeeform.subCategory)
this.addEmployeeForm.get('subDepartment').setValue(this.editEmployeeform.subDepartment)
this.addEmployeeForm.get('ReportingManager2').setValue(this.editEmployeeform.reportingManager2)
// this.addEmployeeForm.get('ReportingManager2').setValue(rp2)
this.addEmployeeForm.get('panno').setValue(this.editEmployeeform.panNo)
this.addEmployeeForm.get('bloodGroup').setValue(this.editEmployeeform.bloodGroup)
this.addEmployeeForm.get('contractor').setValue(this.editEmployeeform.contractor)
this.addEmployeeForm.get('address').setValue(this.editEmployeeform.address)
this.addEmployeeForm.get('religion').setValue(this.editEmployeeform.religion)
this.addEmployeeForm.get('personalEmail').setValue(this.editEmployeeform.personalEmailId)
this.addEmployeeForm.get('company').setValue(this.editEmployeeform.company)
this.addEmployeeForm.get('fingerprint').setValue(this.editEmployeeform.fingerprint)
this.addEmployeeForm.get('mobileno').setValue(this.editEmployeeform.mobileNumber)
this.addEmployeeForm.get('whatsappno').setValue(this.editEmployeeform.whatssappNo)
this.addEmployeeForm.get('permanantadd').setValue(this.editEmployeeform.permanentAddress)
this.addEmployeeForm.get('lockUnlock').setValue(this.editEmployeeform.lockUnlock)
this.category = this.editEmployeeform.category
this.addEmployeeForm.get('drivingLicenseNo').setValue(this.editEmployeeform.drivingLicenseNo)
this.addEmployeeForm.get('Experience').setValue(this.editEmployeeform.experience)
this.addEmployeeForm.get('uploadphoto').setValue(this.editEmployeeform.imageName)
console.log(this.addEmployeeForm.get('uploadphoto').setValue(this.editEmployeeform.imageName))
if(res.probation == "true"){

this.addEmployeeForm.get('probationDate').setValue(probationDate.toString())

}
// let url="Editlogo?imageName="+this.editEmployeeform.imageName
//   console.log(url)
//   let params = new HttpParams();
//   params = params.append('imageName', this.editEmployeeform.imageName);
//   this.srvModuleService.get(url).subscribe(res=>{
//   console.log(res)
//   })
})

}
// getImageName(){
//   console.log(this.imageName)
//   let url="Editlogo?imageName="+this.imageName
//   console.log(url)
//   let params = new HttpParams();
//   params = params.append('imageName', this.imageName);
//   this.srvModuleService.get(params,url).subscribe(res=>{
//     console.log(res)
//   })

// }



category
updateEmployee(){
if(this.addEmployeeForm.status == "VALID"){
  this.submitLoader = true 
  let employeeDetails = this.addEmployeeForm.value
  console.log(employeeDetails)
  var datePipe = new DatePipe('en-US');
  let dateOfJoining = datePipe.transform(this.addEmployeeForm.value.DOJ,'yyyy-MM-dd');
  let dateOfBirth = datePipe.transform(this.addEmployeeForm.value.DOB,'yyyy-MM-dd');
  let probationDate = datePipe.transform(this.addEmployeeForm.value.probationDate,'yyyy-MM-dd');
  let url1 = "employee_master/getemployee/"+`${this.editId}`
  this.srvModuleService.get(url1).subscribe((res)=>{
    if(res.imageName!=null && this.profilePhoto==null){
    this.ImName=res.imageName
    console.log(this.ImName)
    }
    else if(res.imageName!=null && this.profilePhoto!=null)
    {
      this.ImName=this.profilePhoto 
    }
    else{
      console.log(this.profilePhoto)
      this.ImName=this.profilePhoto
      console.log(this.ImName)
    }
   let data = {
    contractor:employeeDetails.contractor,
    employeeCode:employeeDetails.employeeCode,
    salutation:employeeDetails.salutation,
    firstName : employeeDetails.FirstName,
    middleName: employeeDetails.MiddleName,
 lastName: employeeDetails.LastName,
gender: employeeDetails.Gender,
experience: employeeDetails.Experience,
companyEmailId: employeeDetails.Email,
state: employeeDetails.State,
branch: employeeDetails.Branch,
category: employeeDetails.Category,
subCategory: employeeDetails.subCategory,
department: employeeDetails.Department,
subDepartment: employeeDetails.subDepartment,
subDepartment1: "",
subDepartment2: "",
subDepartment3: "",
panNo:employeeDetails.panno,
designation: employeeDetails.Designation,
grade: employeeDetails.Grade,
reportingManager1: employeeDetails.ReportingManager,
reportingManager2:employeeDetails.ReportingManager2,
bloodGroup:employeeDetails.bloodGroup,
probation:employeeDetails.probation,
address:employeeDetails.address,
status: employeeDetails.empstatus,
dateOfJoining: dateOfJoining,
dateOfBirth: dateOfBirth,
imageName:this.ImName,
uploadDate:"",
probationDate: probationDate,
personalEmailId:employeeDetails.personalEmail,
  religion: employeeDetails.religion,
  company: employeeDetails.company,
  mobileNumber:employeeDetails.mobileno,
  lockUnlock:employeeDetails.lockUnlock,
  whatssappNo:employeeDetails.whatsappno,
  permanentAddress:employeeDetails.permanantadd,
  fingerprint: employeeDetails.fingerprint,
  drivingLicenseNo:employeeDetails.drivingLicenseNo
  
}

console.log(data)

let url = "employee_master/update_employee/"+`${this.editId}`

this.srvModuleService.update(data, url).subscribe((res)=>{
  this.submitLoader = false
  if(res.respose == "Success"){
    Swal.fire({
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    })
 this.router.navigate(['/layout/employees/employeelist'])
  }
  else if(res.respose == "Already"){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Employee Code Already Exists',
     
    })
   }
   else{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong',
     
    })
   }

})
})
}
else{
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Something went wrong!',
   
  })
this.addEmployeeForm.markAllAsTouched()
}



}




cancel(){

  this.addEmployeeForm.reset();
  this.router.navigate(['layout/employees/employeelist'])
}

employeeProfileDetails(id){

this.selectedId = id
  this.router.navigateByUrl(
    '/layout/employees/employeeprofile/'+this.selectedId
);
}
getCategories(){
  this.srvModuleService.get('categories/getCategories').subscribe((res)=>{
  this.categories=res

  })
}
department(){
  this.srvModuleService.get('getAllDepartment').subscribe((res)=>{
  this.departments=res
  })
}
designation(){
  this.srvModuleService.get('getAllDesignationMaster').subscribe((res)=>{
  this.designations=res
  })
}
getReligion(){
  this.srvModuleService.get('getgetCodeByType?type=religion').subscribe((res)=>{
  this.religion = res
  })
}
getGrade(){
  this.srvModuleService.get('getgetCodeByType?type=grade').subscribe((res)=>{
  this.grade = res
  })
}
bloodGroup;
getBloodGroup(){
  this.srvModuleService.get('getgetCodeByType?type=bloodGroup').subscribe((res)=>{
  this.bloodGroup = res
  })
}
contractor(){
  this.srvModuleService.get('getgetCodeByType?type=contractor').subscribe((res)=>{
  this.contractorData = res
  })
}
showContainer(){
  this.showMyContainer = true;
}
hideContainer(){
  this.router.navigate(['/layout/employees/employeelist'])
}
getCompany(){
  this.srvModuleService.get('getAllCompanyInformationList').subscribe((res)=>{
    this.company=res
  })
}
experience
getExperience(d){

    
  let date_1 = new Date();
let date_2 = new Date(d);

const days = (date_1, date_2) =>{
    let difference = date_1.getTime() - date_2.getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    return TotalDays;
}


this.addEmployeeForm.get('Experience').setValue(days(date_1, date_2))
this.experience = days(date_1, date_2)
this.getFormatedStringFromDays(this.experience)


}

getFormatedStringFromDays(numberOfDays) {
  var years = Math.floor(numberOfDays / 365);
  var months = Math.floor(numberOfDays % 365 / 30);
  var days = Math.floor(numberOfDays % 365 % 30);
this.empexperience = years + " Years "+  months + " months " + days +" days"
}




 getEmpList(event){
 
    console.log(event)
    
    this.array.push(event)
    console.log(this.array)
    let form=this.addEmployeeForm.value
    // console.log(form)
    if(this.array.length >=2){
  
    let url='employees/search?employeeName='+`${form.ReportingManager}`
    this.srvModuleService.get(url).subscribe((res)=>{
      this.employee1=res.data
      // console.log(this.employee1)
    })
  }
  }



displayEmp(data,name,last){
  console.log(data,name,last)
  this.selected=data +" "+ name +" "+ last; 

 }


 getEmpList1(event){
 
  console.log(event)
  
  this.array.push(event)
  console.log(this.array)
  let form=this.addEmployeeForm.value
  // console.log(form)
  if(this.array.length >=2){

  let url='employees/search?employeeName='+`${form.ReportingManager2}`
  this.srvModuleService.get(url).subscribe((res)=>{
    this.employee2=res.data
    // console.log(this.employee1)
  })
}
}



displayEmp1(data,name,last){
console.log(data,name,last)
this.selected1=data +" "+ name +" "+ last; 

}


}