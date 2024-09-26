import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AllModulesService } from '../../all-modules.service';

@Component({
  selector: 'app-leave-allocation-update',
  templateUrl: './leave-allocation-update.component.html',
  styleUrls: ['./leave-allocation-update.component.css']
})
export class LeaveAllocationUpdateComponent implements OnInit {
  leaveAllocationForm: FormGroup;
  states: any;
  visibleRrowIndex: number = null;
  creditingType:any;
  myOptions;
  categorie;
  branch;
  leaveEncash;
  optionsModel: number[];
  branchModel: number[];
  categoriehModel: number[];
  leaveEncashModel: number[];
  update:boolean=false;
loader = true
  months=[
    {id:1, name: 'January'},
    {id:2, name: 'February'},
    {id:3, name: 'March'},
    {id:4, name: 'April'},
    {id:5, name: 'May'},
    {id:6, name: 'June'},
    {id:7, name: 'July'},
    {id:8, name: 'August'},
    {id:9, name: 'September'},
    {id:10, name: 'October'},
    {id:11, name: 'November'},
    {id:12, name: 'December'},
    
  ]
  quarterMonths=[
    {name: 'January'},
    {name: 'April'},
    {name: 'July'},
    {name: 'October'},
  ]

  yearlyMonths=[
    {name: 'January'},
    {name: 'July'},
  ]
  checked: boolean=false;
  allocationTable: any;
  grade;
  cType: any;
  branchUpdate=[];
  leaveEncashUpdate=[];
  creditType: any;
  editId: any;
  response: any;
  leave: any;
  category = [];
  gradeUpdate = [];
  submitLoader: boolean = false;
  constructor(public _fb: FormBuilder, public _service:AllModulesService, public router:Router, public _activatedroute:ActivatedRoute) { }

  ngOnInit(): void {
    this.getCategories();
    this.getBranchList();
    this.getLeave();
    this.getGrade()
    this.getPayelement();
    this.getState();
 
    const routeParam = this._activatedroute.snapshot.params;
    this.editId = routeParam.id;
    this.edit();
this.leaveAllocationForm = this._fb.group({
state:['',Validators.required],
branch:['',Validators.required],
grade:['',Validators.required],
category:['',Validators.required],
leave:['', Validators.required],
leaveDescription:['', Validators.required],
totalLeave:['', Validators.required],
creditingType:['', Validators.required],
effectiveDate:['', Validators.required],
carryForward:['',],
maxLeaves:['', Validators.required],
minLeaves:['', Validators.required],
maxBalanceEncash:['', ],
maxBalCarryForward:['', ],
probation:'',
encashable:'',
isPaid:'',
leaveLaps:'',
leaveCredit:'',
leaveEncash:['',],
manualLeaveEncash:'',
status:'',
leaves:'',
expiteOn:'',
selectMonth:'',
leaveCreditMonths:'',
leaveLapsMonths:'',
percentage:""
})

  }
  getGrade(){


    this._service.get('getgetCodeByType?type='+'grade')
    .subscribe((res)=>{
      this.grade=res

  
    })
    
      }
  getLeave(){
    this._service.get('getgetCodeByType?type=Leave Code').subscribe((res)=>{
      this.leave = res
    })
  }
  getState(){
    this._service.get("state/getStateList").subscribe((res)=>{
this.states = res
    })
  }

  getBranchList(){

let branch:any=[]
    this._service.get('branch/getBranchList')
    .subscribe((res)=>{
    
      this.branch=res
  
    })
    
      }


     
  getPayelement(){


    this._service.get('getAllPayElementMaster')
    .subscribe((res)=>{
      this.leaveEncash = res 
  
    })
    
      }

    
      getCategories(){

        this._service.get('categories/getCategories').subscribe((res)=>{
          this.categorie = res

         
        })
      
      }

      creditChange(e){
        // this.leaveAllocationForm.get('leaves').setValue('')
        // this.leaveAllocationForm.get('expiteOn').setValue('')
      }

      onChange(event){
     
      this.checked=event.target.checked
   
      }
      edit(){
    
    let url = 'getLeaveAllocation/'+this.editId
    this._service.get(url).subscribe((res)=>{
      this.response = res
     
      
      var datePipe = new DatePipe('en-US');
      let date = res.effectiveDate
      date = datePipe.transform(date,'yyyy-MM-dd')
      let expiteon =res.expiteOn
      expiteon  = datePipe.transform(expiteon,'yyyy-MM-dd')
      this.leaveAllocationForm.get('expiteOn').setValue(expiteon)
      this.leaveAllocationForm.get('leaves').setValue(res.noOfLeave)
      this.leaveAllocationForm.get('leave').setValue(res.leave)
      this.leaveAllocationForm.get('grade').setValue(res.grade)
      this.leaveAllocationForm.get('state').setValue(res.state)
      this.leaveAllocationForm.get('leave').setValue(res.leaveCode)
      this.leaveAllocationForm.get('leaveDescription').setValue(res.leaveDescription)
      this.leaveAllocationForm.get('totalLeave').setValue(res.totalLeave)
      this.leaveAllocationForm.get('creditingType').setValue(res.creditingType)
      this.leaveAllocationForm.get('effectiveDate').setValue(date)
      this.leaveAllocationForm.get('branch').setValue(res.branchName)
      this.leaveAllocationForm.get('carryForward').setValue(res.carryForwardable)
      this.leaveAllocationForm.get('minLeaves').setValue(res.minimumLeaveDays)
      this.leaveAllocationForm.get('maxLeaves').setValue(res.maximumLeaveDays)
      this.leaveAllocationForm.get('maxBalanceEncash').setValue(res.maxBalanceEncashable)
      this.leaveAllocationForm.get('maxBalCarryForward').setValue(res.maxBalanceCarryForward)
      this.leaveAllocationForm.get('probation').setValue(res.applicableInProbation)
      this.leaveAllocationForm.get('encashable').setValue(res.leaveEncashable)
      this.leaveAllocationForm.get('isPaid').setValue(res.paid)
      this.leaveAllocationForm.get('leaveLaps').setValue(res.leaveLapsDurationInMonth)
      this.leaveAllocationForm.get('leaveCredit').setValue(res.leaveCreditAfterJoiningInMonth)
      this.leaveAllocationForm.get('leaveEncash').setValue(res.leaveAllocationleaveEncashOn)
      this.leaveAllocationForm.get('manualLeaveEncash').setValue(res.leaveEncashmentManualb)
      this.leaveAllocationForm.get('selectMonth').setValue(res.isLeaveEncashmentManuals)
      this.leaveAllocationForm.get('status').setValue(res.status)
      this.leaveAllocationForm.get('category').setValue(res.category)
      this.leaveAllocationForm.get('leaveCreditMonths').setValue(res.leaveCreditAfterJoiningInMonths)
      this.leaveAllocationForm.get('percentage').setValue(res.percentage)
      this.leaveAllocationForm.get('leaveLapsMonths').setValue(res.leaveLapsMonths)
    
    
      
    
      
    })
      }
      updateLeaveAllocation(){

        if (this.leaveAllocationForm.status == 'VALID'){
          this.submitLoader= true
          let form =this.leaveAllocationForm.value;
      var datePipe = new DatePipe('en-US');
      let effectiveDate = form.effectiveDate
      console.log(effectiveDate)
      effectiveDate = datePipe.transform(effectiveDate,'yyyy-MM-dd')
      let expiteOn1 = form.expiteOn
      expiteOn1 = datePipe.transform(expiteOn1,'yyyy-MM-dd')
                

      let data = {
        state: form.state,
        branchName: form.branch,
        grade:form.grade,
        category: form.category,
        leaveAllocationleaveEncashOn: form.leaveEncash,
        creditingType: '',
        month:'',
        noOfLeave:'',
        expiteOn:'',
        totalLeave: form.totalLeave,
        leaveCode: form.leave,
        leaveDescription: form.leaveDescription,
        effectiveDate: effectiveDate,
        carryForwardable: form.carryForward,
        maximumLeaveDays: form.maxLeaves,
        minimumLeaveDays: form.minLeaves,
        applicableInProbation: form.probation,
        leaveEncashable: form.encashable,
        maxBalanceEncashable: form.maxBalanceEncash,
        maxBalanceCarryForward: form.maxBalCarryForward,
        leaveCreditAfterJoiningInMonth: form.leaveCredit,
        leaveLapsDurationInMonth: form.leaveLaps,
        paid: form.isPaid,
        leaveEncashment:form.manualLeaveEncash,
        status: form.status,
        isLeaveEncashmentManuals: form.selectMonth,
        isLeaveEncashmentManualb: form.manualLeaveEncash,
        percentage: form.percentage,
        leaveLapsMonths: form.leaveLapsMonths
      } 


      
      let url = 'updateLeaveAllocation/'+`${this.editId}`
      
      this._service.add(data, url).subscribe((res)=>{
        this.submitLoader= false
        if(res.respose == "Success"){
          Swal.fire({
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          })
              this.router.navigate(["layout/masters/leaveAllocation"]); 

         
        }
        else if(res.respose == "Alread"){
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
      this.leaveAllocationForm.markAllAsTouched();
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
         
        })
      }
      
      
      
      
      }
}
