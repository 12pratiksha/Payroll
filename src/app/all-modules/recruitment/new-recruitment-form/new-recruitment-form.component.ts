import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { AllModulesService } from '../../all-modules.service';
import { DataTableDirective } from 'angular-datatables/src/angular-datatables.directive';

@Component({
  selector: 'app-new-recruitment-form',
  templateUrl: './new-recruitment-form.component.html',
  styleUrls: ['./new-recruitment-form.component.css']
})
export class NewRecruitmentFormComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  
  jobForm: FormGroup
  department: any;
  designation: any;
  approver: any;
  branch: any;
  editId: string;
  type: any;
  tableData: any=[];
  employees: any;
  
  dtOptions: { pagingType: string; pageLength: number; processing: boolean; dom: string; buttons: string[]; };
  todayDate: Date;
  constructor(   private _service: AllModulesService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private _activatedroute: ActivatedRoute,
    private _fb: FormBuilder) { }

  ngOnInit(): void {
   this.todayDate= new Date();
    const routeParam = this._activatedroute.snapshot.params;
    this.editId = routeParam.id;
    console.log(this.editId)
    this.type = routeParam.type;
    this.getDesignation()
    this.getDepartment()
    this.getApprover()
    this.getBranch()
    //this.getEmp()
    //this.getTableData()
     this.jobForm = this._fb.group({
       requestDate: ['',Validators.required],
       newRequest: new FormArray([])  
     })
console.log(this.jobForm) 
//  if(this.editId != 'add'){
//   this.edit(id)
//  }

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
 
  //  hideContainer(){
  //    const currentRoute = this.router.url;
 
  //    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  //        this.router.navigate([currentRoute]); 
  //    }); 
  //    this.container = true
  //  }
 
  //  showContainer(){
  //   this.router.navigate(['layout/recruitment/managejobs']); 
  //  }

  hideContainer(){
    this.router.navigate(['layout/recruitment/managejobs']); 
  }
 
   createRequest(): FormGroup {  
     return this.formBuilder.group({ 
      type:['',],
      candidate:['',], 
      replacement:['',],
       department:['',],
       approver:['',],
       noOfVacancy:['',Validators.required],
       jobDescription:['',Validators.required],
      designation:['', ],
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
    console.log() 
     this.newRequest = this.jobForm.get('newRequest') as FormArray;  
     console.log(this.jobForm)
     this.quantities().push(this.createRequest());  
   console.log(this.newRequest)
    }  
 
 
 
   remove(i:number) {
  console.log(this.newRequest)
     this.quantities().removeAt(i);
   }

   getEmp(){
    let url="employee_master/getActiveemployees"
    this._service.get(url).subscribe((res)=>{
      console.log(res)
      this.employees=res
    })

   }
   add(i,type){

   let  url
 if(type == 'add'){
 url = "AddNewRequirementMaster"
 }
 else{
  //updateNewRequirement?newRequirementId=422586&requirementId=422587
 url = 'updateNewRequirement/'+this.editId
 }
     
     let form = this.jobForm.value
     console.log(this.jobForm)
  if(this.jobForm.status=='VALID'){
   
   let data = {
     requestDate:form.requestDate,
     requirement:this.jobForm.value.newRequest,
    //  [
    //   {
    //       department:form.department,
    //       designation:form.designation,
    //       approver:form.approver,
    //       noOfVacancy:form.vacancy,
    //       jobDescription: form.jobDescription,
    //       expectedJoiningDate: form.expectedJoiningDate,
    //       requiredExp: form.reqExperience,
    //       ageGroupFrom: form.ageFrom,
    //       toAgeGroup: form.ageTo,
    //       location:form.location,
    //       skills: form.skill,
    //       requiredGender:form.gender,
    //       otherRequirements:form.other,
    //       passport:form.passport,
    //       requirement:this.newRequest
    //   },
    // ]
    //  status:this.type == 'n'? 'pending': 'approved',
  //  requirementDetais: form.newRequest
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
   this.router.navigate(['layout/recruitment/managejobs'])
  //  const currentRoute = this.router.url;
 
  //  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  //      this.router.navigate([currentRoute]);
  //  }); 
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
  
 
 getDepartment(){
   this._service.get("getAllDepartment").subscribe((res)=>{
     this.department = res
   })
 }
 getDesignation(){
   this._service.get("getAllDesignationMaster").subscribe((res)=>{
     this.designation = res
   })
 }
 getApprover(){
   this._service.get("employee_master/getActiveemployees").subscribe((res)=>{
     this.approver = res
    
   })
 }
 getBranch(){
   this._service.get("branch/getBranchList").subscribe((res)=>{
     this.branch = res
   })
 }
//  getTableData(){
//   let type=localStorage.get('type')
//   if(type=='Admin')
//   {
//     this._service.get("getAllNewRequirementList").subscribe((res)=>{
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

//  delete(id){
   
//    Swal.fire({
//      title: 'Are you sure?',
//      text: "You won't be able to revert this!",
//      icon: 'warning',
//      showCancelButton: true,
//      confirmButtonColor: '#3085d6',
//      cancelButtonColor: '#d33',
//      confirmButtonText: 'Yes, delete it!'
//    }).then((result) => {
//      if (result.isConfirmed) {
//        Swal.fire({
//          title: 'Loading...',
//          allowEscapeKey: false,
//          allowOutsideClick: false,
//          showConfirmButton: false,
//          didOpen: () => {
//            Swal.showLoading()
//          }
//        })
//        this._service.delete(id, 'RMS/deleteRequirement').subscribe((res)=>{
//          if(res.respose=="Success"){
//            Swal.fire({
       
//              icon: 'success',
//              title: 'Employee Deleted Successfully',
//              showConfirmButton: false,
//              timer: 1500,
//              didOpen: () => {
//                Swal.hideLoading()
//              }
//            })
//            const currentRoute = this.router.url;
   
//            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
//                this.router.navigate([currentRoute]); 
//            }); 
//          }
//          else{
//            Swal.fire({
//              icon: 'error',
//              title: 'Oops...',
//              text: 'Something went wrong',
//              didOpen: () => {
//                Swal.hideLoading()
//              }
//            })
//          }
//        })
//      }
//    })
 
//  }
 quantities() : FormArray {
   return this.jobForm.get('newRequest') as FormArray;  
 }
 edit(id){
  console.log()
 console.log(id)
 let redId=id;
 this._service.get('getByNewRequirementId/'+redId).subscribe((res)=>{
   var datePipe = new DatePipe('en-US');
 
  console.log(res)
   let reqDate = datePipe.transform(res.requestDate, 'yyyy-MM-dd');
 this.jobForm.get('requestDate').setValue(reqDate)
 
 res.requirementDetais.forEach(element => {
   let jDate = datePipe.transform(element.expectedJoiningDate, 'dd-MM-YYYY');
   
 this.quantities().push(this._fb.group({

  //  department: element.department,
  //  approver: element.approver,
  //  noOfVacancy: element.vacancy,
  //  jobDescription:element.jobDescription,
  //  designation:element.designation,
  //  expectedJoiningDate:jDate,
  //  requiredExp:element.reqExperience,
  //  requiredGender:element.gender,
  //  otherRequirements:element.other,
  //  passport:element.passport,
  //  ageGroupFrom: element.ageFrom,
  //  toAgeGroup:element.ageTo,
  //  location:element.location,
  //  skills:element.skill,
  //  type: element.type,
  //  Replacement:element.replacement,
  //  candidate: element.candidate
 }))
 });
 })
 }
 onSelectionChange($event){
  console.log(this.jobForm.value.newRequest)
  let values=[];
  values=this.jobForm.value.newRequest;
  values.forEach((element)=>{
    console.log(element.candidate)
    
  })

 }
 }
 