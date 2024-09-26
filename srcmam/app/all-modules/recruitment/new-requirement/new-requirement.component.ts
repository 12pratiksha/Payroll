import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { AllModulesService } from "../../all-modules.service";
import { FormBuilder,FormGroup, FormControl, Validators,FormArray,} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";
import { DatePipe } from "@angular/common";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { HttpParams } from "@angular/common/http";

declare const $: any;
@Component({
  selector: 'app-new-requirement',
  templateUrl: './new-requirement.component.html',
  styleUrls: ['./new-requirement.component.css']
})
export class NewRequirementComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
 
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe("en-US");
  container : boolean = true;
  approved: boolean = false
  jobForm: FormGroup
  department: any;
  designation: any;
  approver: any;
  branch: any;
  customPatterns = {
    V: { pattern: new RegExp("-?") },
    "0": { pattern: new RegExp("[0-9]") },
  };
  editId: any;
  agencyList: any=[];
  item: any=[];
  tableData_display: any=[];
  newArray: any=[];
  designationlist: Promise<void>;
  dtOptions: { pagingType: string; pageLength: number; processing: boolean; dom: string; buttons: string[]; };
  editData: any;
  date: number[];
  desig: number;
  employees: any;
  constructor(
    private _service: AllModulesService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private _fb: FormBuilder
  ) {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'print', 
        ]
    };
     
  }

  async ngOnInit() {
    await this.getDesignation();
    
    
    await this.getApprover()

    await this.getDepartment()
     
   this.getBranch()
   this.getEmp();
     this.getAgencyList()
    this.jobForm = this._fb.group({
      requestDate: ['',Validators.required],
      newRequest: new FormArray([])
      
    })
    
  
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'print', 
        ]
    };


  }

  hideContainer(){
    const currentRoute = this.router.url;

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentRoute]); 
    }); 
    this.container = true
  }

  // showContainer(){
  //  this.container = false
  // }
   
  showContainer(id, type){
    this.router.navigate(['layout/recruitment/recruitmentForm/'+id+'/'+type]); 
   }

  createRequest(): FormGroup {  
    return this.formBuilder.group({ 
      type:[''], 
      department:['',],
      replacement:[''],
      candidate:[''],
       approver:['',],
       noOfVacancy:['',Validators.required],
       jobDescription:['',Validators.required],
       designation:['',],
       expectedJoiningDate:['',Validators.required],
       requiredExp:['',Validators.required],
       requiredGender:['',],
       otherRequirements:['',Validators.required],
       passport:['',],
       ageGroupFrom: ['',Validators.required],
       toAgeGroup:['',Validators.required],
       location:['',Validators.required],
       skills:['',Validators.required],
    });  
  }   
  newRequest: FormArray
  addRequest(): void {  
    this.newRequest = this.jobForm.get('newRequest') as FormArray;  
    this.quantities().push(this.createRequest());  
    console.log(this.newRequest)
  }  



  remove(i:number) {
   
   console.log(i)
   this.quantities().removeAt(i);
    
      
    
  }

  update(){
   
 let url = 'updateNewRequirement/'+this.item.requirement_id
let formdata=this.jobForm.value.newRequest
console.log(this.jobForm)
formdata.forEach(element => {
  console.log(this.editData.expectedJoiningDate)
  var datePipe = new DatePipe('en-US');
  let jDate = datePipe.transform(this.editData.expectedJoiningDate, 'dd-MM-yyyy');
  if (element.expectedJoiningDate==jDate){
  console.log(element.expectedJoiningDate)
 
  let date=element.expectedJoiningDate
  var expDate=date.split("-");
  console.log(expDate)
  let expDate1:any;
  expDate1=[expDate[1],expDate[0],expDate[2]]
  console.log(expDate1)
  
  var datePipe = new DatePipe('en-US');
  const parsedDate1 =new Date(expDate1);
  console.log(parsedDate1)

   let dateArray1 = [
  parsedDate1.getFullYear(),
 
  parsedDate1.getMonth()+1,
  parsedDate1.getDate(),
  ];
  console.log(dateArray1)
  this.date=dateArray1
  }
  else{
    console.log(element.expectedJoiningDate)
    var datePipe = new DatePipe('en-US');
  const parsedDate1 =new Date(element.expectedJoiningDate);
  console.log(parsedDate1)

   let dateArray2 = [
  parsedDate1.getFullYear(),
 
  parsedDate1.getMonth()+1,
  parsedDate1.getDate(),
  ];
  this.date=dateArray2 
  console.log(this.date)
  }

 let newRequest1 = {
             type:element.type,
             ageGroupFrom:element.ageGroupFrom,
             approver:element.approver ,
             candidate:element.candidate,
             replacement:element.replacement,
             department:element.department,
             designation:element.designation,
             expectedJoiningDate:this.date,
             jobDescription:element.jobDescription,
             location:element.location,
             noOfVacancy:element.noOfVacancy,
             otherRequirements:element.otherRequirements,
             passport:element.passport,
             requiredExp:element.requiredExp,
             requiredGender:element.requiredGender,
             skills:element.skills, 
             toAgeGroup:element.toAgeGroup
  
 }
 this.newArray.push(newRequest1)
  
});
 let form = this.jobForm.value
 console.log(form)
 if(this.jobForm.status=='VALID'){

  let data = {
 requestDate:form.requestDate,
 requirement:this.newArray,

}
console.log(data)

  this._service.add(data, url).subscribe((res)=>{
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
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
  
    })
    this.jobForm.markAllAsTouched()
   }
}


add(){
  
  let  url

url = "AddNewRequirementMaster"
// }
// else{
//   //'updateNewRequirement?newRequirementId='+this.tableDatanew_requirement_id+'&this.tableDatarequirementId='+requirement_id
//  url = 'updateNewRequirement?newRequirementId='+this.item.new_requirement_id+'&requirementId='+this.item.requirement_id

    let form = this.jobForm.value
    console.log(form)
 if(this.jobForm.valid){
 
  let data = {
    requestDate:form.requestDate,
    requirement: this.jobForm.value.newRequest,
   
    // status:"pending",
    // requirementDetais: form.newRequest
  }
this._service.add(data, url).subscribe((res)=>{
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
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Something went wrong!',

  })
  this.jobForm.markAllAsTouched()
 }
}

getEmp(){
  let url="employee_master/getemployees"
  this._service.get(url).subscribe((res)=>{
    console.log(res)
    this.employees=res
  })

 }


  async getDepartment(){
  await this._service.get("getAllDepartment").subscribe((res)=>{
    this.department = res
     
  })
  
}
async getDesignation(){
  await this._service.get("getAllDesignationMaster").subscribe(async (res)=>{
    this.designation = res
    await this.getTableData()
    
  })
}
  async getApprover(){
  await this._service.get("employee_master/getemployees").subscribe((res)=>{
    this.approver = res
    
   
    
  })
}
getBranch(){
  this._service.get("branch/getBranchList").subscribe((res)=>{
    this.branch = res
  })
}
tableData:any;
// getTableData(){
//   let type=localStorage.get('type')
//   if(type=='Admin')
//   {
//     this._service.get("getAllPendingNewRequirementList").subscribe((res)=>{
//       this.tableData = res
//       console.log(res)
//       res.array.forEach(element => {
//         this.tableData.push(element.requirement[0])
        
//       });
//       console.log(this.tableData)
//     })
//   }
//   else{
//   this._service.get("getAllNewRequirementList").subscribe((res)=>{
//     this.tableData = res
//     console.log(res)
//     res.array.forEach(element => {
//       this.tableData.push(element.requirement[0])
      
//     });
//     console.log(this.tableData)
//   })
// }
// }




mytype:any;
getTableData(){
  this.tableData=[];
  let type=localStorage.getItem('type')
  this.mytype=type;
  this.tableData_display=[]
  if(type=='Admin')
  
  {
    this._service.get("getAllPendingNewRequirementList").subscribe((res)=>{

      this.tableData = res
    
      this.tableData.forEach(async element => {
        let desg=element.designation;


          if( isNaN(desg)){
           }else{
            
            let result3 =this.designation.filter((design: any) =>
            (design.designationMasterId==desg) )
          desg = result3[0].name;
           }
          
        this.tableData_display.push({"requirement_id":element.requirement_id,"new_requirement_id":element.new_requirement_id, "request_date":element.request_date,"department":element.department_name,"expected_joining_date":element.expected_joining_date,"designation":desg,"no_of_vacancy":element.no_of_vacancy,"approver":element.first_name+" "+element.last_name,"status":element.status})
      

     
      
        
      });
    })
  }
  else{
  let empid=localStorage.getItem('empid')
  this._service.get("getAllNONApprovalJobRequirementList?empId="+empid).subscribe( (res)=>{
    this.tableData = res
    this.tableData.forEach( element => {
      let desg=element.designation;


        if( isNaN(desg)){
         }else{
          console.log(this.designation)
          let result3 =this.designation.filter((design: any) =>
          (design.designationMasterId==desg) )
        desg = result3[0].name;
         }
        
      this.tableData_display.push({"requirement_id":element.requirement_id,"new_requirement_id":element.new_requirement_id, "request_date":element.request_date,"department":element.department_name,"expected_joining_date":element.expected_joining_date,"designation":desg,"no_of_vacancy":element.no_of_vacancy,"approver":element.first_name+" "+element.last_name,"status":element.status})
    

   
    
      
    });
    
  })
}
}

ngOnDestroy(): void {
  this.dtTrigger.unsubscribe();
}
delete(id){
  
  Swal.fire({
    title: 'Are you sure?',
   // text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: 'Loading...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading()
        }
      })
      let url="deleteNewRequirement/"+id
  this._service.get(url).subscribe((res)=>{
      // this._service.delete(id, 'deleteRequirement').subscribe((res)=>{
        if(res.respose=="Success"){
          Swal.fire({
      
            icon: 'success',
            title: 'Job Requirement Deleted Successfully',
            showConfirmButton: false,
            timer: 1500,
            didOpen: () => {
              Swal.hideLoading()
            }
          })
        // window.location.reload();

          const currentRoute = this.router.url;
  
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate([currentRoute]); 
          }); 
          
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong',
            didOpen: () => {
              Swal.hideLoading()
            }
          })
        }
      })
    }
  })

}
quantities() : FormArray {
  return this.jobForm.get('newRequest') as FormArray;  
}

edit(item){
  this.item=item
  console.log(item.new_requirement_id)
  this.container = false
  this.editId = item.new_requirement_id
  var datePipe = new DatePipe('en-US');
  this._service.get('getByNewRequirementId/'+this.editId).subscribe((res)=>{
    console.log(res)
  let reqDate = datePipe.transform(res.requestDate, 'yyyy-MM-dd');
  this.jobForm.get('requestDate').setValue(reqDate)

  res.requirement.forEach(element => {
  // console.log(element)
  let jDate = datePipe.transform(element.expectedJoiningDate, 'dd-MM-yyyy');

  let id=element.approver
  let url = "employee_master/getemployee/"+`${id}`
  this._service.get(url).subscribe((res)=>{
  console.log(res)
  this.editData=element
  let approver=res.firstName+" "+res.lastName
  let code=res.employeeCode
  console.log(element.location)
  if(element.type=="Existing"){
  this.desig = Number(element.designation); 
  }
  else{
this.desig=element.designation
  }
  console.log(this.desig)
  console.log(element.designation)
  this.quantities().push(this._fb.group({
  department: element.department,
  approver: element.approver,
  noOfVacancy: element.noOfVacancy,
  jobDescription:element.jobDescription,
  designation:this.desig,
  expectedJoiningDate:jDate,
  requiredExp:element.requiredExp,
  requiredGender:element.requiredGender,
  otherRequirements:element.otherRequirements,
  passport:element.passport,
  ageGroupFrom: element.ageGroupFrom,
  toAgeGroup:element.toAgeGroup,
  location:element.location,
  skills:element.skills,
  type:element.type,
  candidate:element.candidate,
  replacement:element.replacement

}))
})
});
})
}

approve(id){
  Swal.fire({
    title: 'Are you sure?',
    // text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, approve it!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: 'Loading...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading()
        }
      })
  this.approved=true
  console.log(this.approved)
  console.log(id)
  

  let params = new HttpParams();

  params = params.append('status', this.approved);
  params = params.append('requirementId', id);

  let url='JobRequirementApprovalAPI?status='+`${this.approved}`+'&requirementId='+`${id}`
  this._service.add(params,url).subscribe(res=>{
  console.log(res)
  if(res.respose=="Success"){
    Swal.fire({

      icon: 'success',
      title: 'Requirement Approved',
      showConfirmButton: false,
      timer: 1500,
      didOpen: () => {
        Swal.hideLoading()
      }
    })
    this.getTableData();
    const currentRoute = this.router.url;

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate([currentRoute]); 
    }); 
  }
  else{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong',
      didOpen: () => {
        Swal.hideLoading()
      }
    })
  }
})
}
})

}
getAgencyList()
{
  let url='getAgencyMasterList'
  this._service.get(url).subscribe(res=>{
    this.agencyList=res
  
  })
}
onChange($event){
  console.log($event)
  console.log(this.jobForm)

}
}
