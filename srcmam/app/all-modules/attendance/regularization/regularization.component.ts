import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { thBeLocale } from 'ngx-bootstrap/chronos';
import { AllModulesService } from 'src/app/all-modules/all-modules.service';
import Swal from 'sweetalert2';
import * as xlsx from 'xlsx';
@Component({
  selector: 'app-regularization',
  templateUrl: './regularization.component.html',
  styleUrls: ['./regularization.component.css']
})
export class RegularizationComponent implements OnInit {
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  showMyContainer:boolean = false;
  regularizationForm: FormGroup
  departureDetails: any;
  datePipe = new DatePipe('en-US');
  editPlanId: null;
  employees: any;
  category = ["Was on Duty / Official Tour", "Was on Training", "Will be on Duty / Official Tour", "Will be on training", "Official Tour","Mispunch"]
  regularizationList: any;
  dtOptions: { pagingType: string; pageLength: number; processing: boolean; dom: string; buttons: string[]; };
  userType: string;
  rpStatus: string;
  tableData: any;
  branchList: any;
  departments: any;
  employee_display: any=[];
  employee_display1: any=[];
  inputAdd:string;
  constructor(public _fb:FormBuilder,public _service:AllModulesService) { }
  ngOnInit(): void {
this.userType=localStorage.getItem('type')
this.rpStatus=localStorage.getItem('rpStatus')

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'Bfrtip',
      buttons: [
            'copy', 'csv', 'excel', 'print'
        ]
   }
   this.department();
   this.getBranch();
   this.getNotApprovalList();
    this.getAllEmployee();
    this.getRegularizationList();
    this.regularizationForm = this._fb.group({
      employee:['',Validators.required],
      category:['',Validators.required],
      fromDate:'',
      toDate:'',
      description:'',

    })
    
      }
    
      getAllEmployee(){
        this._service.get("employee_master/getemployees").subscribe((data) => {
          this.employees = data;
          
          
        });
      }

      

       

submit(){

  if(this.regularizationForm.status == "VALID"){
    let form = this.regularizationForm.value
    let fromDate = this.datePipe.transform(form.fromDate, 'yyyy-MM-dd');
    let toDate = this.datePipe.transform(form.toDate, 'yyyy-MM-dd');
    console.log(this.regularizationForm.value.quantities)
     let data = {
      employeeId: form.employee,
      regularisationCategory: form.category,
      fromDate:fromDate,
      toDate: toDate,
      description:form.description,
      // status:"false"
     }
     console.log(data)
     this._service.add(data,'addRegularizationRequestsMaster').subscribe((res)=>{
       console.log(res)
     })
     this.getRegularizationList();
     this.cancelForm()
     this.showMyContainer=false
     this.regularizationForm.reset();
     this.getRegularizationList();
   }
   else{
    this.regularizationForm.markAllAsTouched();
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      
    })
    return
   }
  }


  cancelForm(){
   
    this.showMyContainer=false;
    this.regularizationForm.reset()
    this.editPlanId = null
  }


  department() {
    this._service.get('getAllDepartment').subscribe((res) => {
      this.departments = res
    })
  }
  
  getBranch(){
  
    this._service.get('branch/getBranchList')
    .subscribe((res)=>{
    
    this.branchList = res
    
    })
    
    }

  getRegularizationList(){

this._service.get('getAllRegularizationRequestsMaster').subscribe((res)=>{
  console.log(res)
  res.forEach(element => {
  let department=element.department
   let branch=element.branch
   let result =this.departments.filter((dept: any) =>
         (dept.departmentId==department) )
         let resultBranch =this.branchList.filter((brch: any) =>
         (brch.id==branch) )

         this.employee_display.push({"employeeId":element.employeeId,"employeeCode":element.employeeCode,"firstName":element.firstName,"lastName":element.lastName,"branch":resultBranch[0].branchName,"department":result[0].departmentName,"status":element.status,"fromDate":element.fromDate,"toDate":element.toDate,"description":element.description,"regularisation_category":element.regularisation_category})
 
})
this.regularizationList = this.employee_display
console.log(this.regularizationList)

});

  }
  editPlan(id){
    this.editPlanId = id
    console.log(id)
    this.showMyContainer=true;

    let url = 'earlyDepartureMaster/getEarlyDepature/'+`${id}`
this._service.get(url).subscribe((res)=>{
  // console.log(res)


  this.regularizationForm.get('planName').setValue(res.planName)
  this.regularizationForm.get('exemptDays').setValue(res.earlyExemptDays)
  this.regularizationForm.get('everyEarlyDays').setValue(res.everyEarlyDays)
  this.regularizationForm.get('status').setValue(res.status)
  res.earlyDepartureDetails.forEach(element => {
    console.log(element)

});
})

  }
  updateDepartureForm(){
   
  }

  delete(id){


  }

  getNotApprovalList(){
    let empid=localStorage.getItem('empid')
    let url='getNotApprovalRegularizationRequestsMasterList?empid='+empid
    this._service.get(url).subscribe((res)=>{
    this.tableData=res.data
//       data.forEach(element => {
//         let department=element.department
//          let branch=element.branch
//          let result =this.departments.filter((dept: any) =>
//                (dept.departmentId==department) )
//                let resultBranch =this.branchList.filter((brch: any) =>
//                (brch.id==branch) )
      
//                this.employee_display1.push({"employeeId":element.employeeId,"employeeCode":element.employeeCode,"firstName":element.firstName,"lastName":element.lastName,"branch":resultBranch[0].branchName,"department":result[0].departmentName,"status":element.status,"fromDate":element.fromDate,"toDate":element.toDate,"description":element.description,"regularisationCategory":element.regularisationCategory})
       
//       })
// this.tableData=this.employee_display1
    })
  }

  approve(status,empid){
    console.log(status)
    console.log(empid)
      if(status==1){
        Swal.fire({
          title:"Are you really want to approve regularization..?",
          showCancelButton:true,
          confirmButtonColor: '#3085d6',
           cancelButtonColor: '#d33',
           confirmButtonText: 'Yes'
        }).then(result=>{
          console.log(result);
          if(result.isConfirmed==true)
          {
            let id = localStorage.getItem('empid')
            let url="ApproveoutRegularizationRequestsMasterByManagersAndHRs?status="+status+"&manageempId="+id+"&regularizationRequestId="+empid.regularizationRequestsId
            this._service.get(url).subscribe(res=>{
            console.log(res)
            if(res.respose=='Success')
                {
                  Swal.fire({
                    icon: 'success',
                   // title: '',
                    text: 'Regularization has been Approved',
                   
                  })
                  this.regularizationForm.markAllAsTouched();
                  this.getRegularizationList();
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
          else if(result.isConfirmed==false){
            let empid=localStorage.getItem('empid')
            let url='getNotApprovalRegularizationRequestsMasterList?empid='+empid
            this._service.get(url).subscribe((res)=>{
              this.tableData=res.data
            }) 
          }
       
    })
        
        }
      
          
          else if(status==2){
            Swal.fire({
              title:"Are you really want reject Regularization..?",
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
                let id = localStorage.getItem('empid')
                let url="ApproveoutRegularizationRequestsMasterByManagersAndHRs?status="+status+"&reasonforrejection="+result.value +"&manageempId="+id+"&regularizationRequestId="+empid.regularizationRequestsId
                this._service.get(url).subscribe(res=>{
                console.log(res)
                if(res.respose=='Success')
                {
                  Swal.fire({
                    icon: 'success',
                   // title: '',
                    text: 'Regularization has been Rejected',
                   
                  })
                  this.regularizationForm.markAllAsTouched();
                  this.getRegularizationList();
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
              else if(result.isConfirmed==false){
                let empid=localStorage.getItem('empid')
                let url='getNotApprovalRegularizationRequestsMasterList?empid='+empid
                this._service.get(url).subscribe((res)=>{
                  this.tableData=res.data
                }) 
              }
             
    })
          }
    }
}
