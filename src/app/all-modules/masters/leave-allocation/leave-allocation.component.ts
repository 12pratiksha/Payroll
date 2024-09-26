import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { IMultiSelectOption } from 'ngx-bootstrap-multiselect';
import Swal from 'sweetalert2';
import { AllModulesService } from '../../all-modules.service';

@Component({
  selector: 'app-leave-allocation',
  templateUrl: './leave-allocation.component.html',
  styleUrls: ['./leave-allocation.component.css']
})
export class LeaveAllocationComponent implements OnInit {
  leaveAllocationForm: FormGroup;
  submitLoader: boolean = false
  showMyContainer:boolean=false;
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  dtOptions: any = {};
  states: any;
  visibleRrowIndex: number = null;
  creditingType:any;
  myOptions: IMultiSelectOption[];
  categorie:IMultiSelectOption[];
  branch:IMultiSelectOption[];
  leaveEncash:IMultiSelectOption[];
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
    {id:1,name: 'January'},
    {id:4, name: 'April'},
    {id:7, name: 'July'},
    {id:10, name: 'October'},
  ]

  yearlyMonths=[
    {id:1,name: 'January'},
    {id:7,name: 'July'},
  ]
  checked: boolean=false;
  allocationTable: any;
  grade:IMultiSelectOption[];
  cType: any;
  branchUpdate=[];
  leaveEncashUpdate=[];
  creditType: any;
  editId: any;
  response: any;
  leave: any;
  category = [];
  gradeUpdate = [];
  allDetails: any=[];
  constructor(public _fb: FormBuilder, public _service:AllModulesService, public router:Router) { }

  ngOnInit(): void {
    this.getCategories();
    this.getBranchList();
    this.getLeave();
    this.getGrade()
    this.getPayelement()

    // this.leaveEncash = [
    //   { id: 'Basic', name: 'Basic' },
    //   { id: 'HRA', name: 'HRA' },
    //   { id: 'DA', name: 'DA' },
    //   { id: 'Variable Allowance', name: 'Variable Allowance' },
    //   { id: 'Education Allowance', name: 'Education Allowance' },
    //   { id: 'Performance Allowance', name: 'Performance Allowance' },
    //   { id: 'Mobile Allowance', name: 'Mobile Allowance' },
    //   { id: 'Medical Allowance', name: 'Medical Allowance' },
    //   { id: 'Departmental Allowance', name: 'Departmental Allowance' },
    //   { id: 'Food Allowance', name: 'Food Allowance' },
    //   { id: 'Conveyance Allowance', name: 'Conveyance Allowance' },
    // ]
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'print'
        ]
    };
this.getState();
this.get();
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
leaves1:'',
expiteOn1:'',
leaves2:'',
expiteOn2:'',
leaves3:'',
expiteOn3:'',
leaves4:'',
expiteOn4:'',
leaves5:'',
expiteOn5:'',
leaves6:'',
expiteOn6:'',
leaves7:'',
expiteOn7:'',
leaves8:'',
expiteOn8:'',
leaves9:'',
expiteOn9:'',
leaves10:'',
expiteOn10:'',
leaves11:'',
expiteOn11:'',
leaves12:'',
expiteOn12:'',
quarterLeaves1:'',
quarterExpiteOn1:'',
quarterLeaves2:'',
quarterExpiteOn2:'',
quarterLeaves3:'',
quarterExpiteOn3:'',
quarterLeaves4:'',
quarterExpiteOn4:'',
yearlyLeaves1:'',
yearlyExpiteOn1:'',
yearlyLeaves2:'',
yearlyExpiteOn2:'',
selectMonth:'',
leaveCreditMonths:'',
leaveLapsMonths:'',
percentage:""
})



  }


  getState(){
    this._service.get("state/getStateList").subscribe((res)=>{
this.states = res
    })
  }

  getBranchList(){

let branch=[]
    this._service.get('branch/getBranchList')
    .subscribe((res)=>{
    
      res.forEach(element => {
       
        let branches={id:element.id, name:element.branchName}
        branch.push(branches)
      
      this.branch=branch
      });
  
    })
    
      }


     
  getPayelement(){
let payElement:any=[]
    this._service.get('getAllPayElementMaster')
    .subscribe((res)=>{
    
      res.forEach(element => {
       
        let elements={id:element.pelementId, name:element.name}
        payElement.push(elements)
      
      this.leaveEncash = payElement 
      });
  
    })
    
      }
  getGrade(){

let grade:any=[]
    this._service.get('getgetCodeByType?type='+'grade')
    .subscribe((res)=>{
    
      res.forEach(element => {
       
        let grades={id:element.lookupMasterId, name:element.name}
        grade.push(grades)
      
      this.grade=grade
      });
  
    })
    
      }
    
      getCategories(){
          let categorie=[]
        this._service.get('categories/getCategories').subscribe((res)=>{
          
          
          res.forEach(element => {
           
            let categories={id:element.categoryId, name:element.categoryName}
            categorie.push(categories)
           
            this.categorie = categorie
            
          });
         
        })
      
      }

      onChange(event){
     
      this.checked=event.target.checked
   
      }


      submit(){
      

if (this.leaveAllocationForm.status == 'VALID'){
          this.submitLoader = true
          let form =this.leaveAllocationForm.value;
        
        
var datePipe = new DatePipe('en-US');
let effectiveDate = form.effectiveDate
effectiveDate = datePipe.transform(effectiveDate,'yyyy-MM-dd')
let expiteOn1 = form.expiteOn1
expiteOn1 = datePipe.transform(expiteOn1,'yyyy-MM-dd')
let expiteOn2 = form.expiteOn2
expiteOn2 = datePipe.transform(expiteOn2,'yyyy-MM-dd')
let expiteOn3 = form.expiteOn3
expiteOn3 = datePipe.transform(expiteOn3,'yyyy-MM-dd')
let expiteOn4 = form.expiteOn4
expiteOn4 = datePipe.transform(expiteOn4,'yyyy-MM-dd')
let expiteOn5 = form.expiteOn5
expiteOn5 = datePipe.transform(expiteOn5,'yyyy-MM-dd')
let expiteOn6 = form.expiteOn6
expiteOn6 = datePipe.transform(expiteOn6,'yyyy-MM-dd')
let expiteOn7 = form.expiteOn7
expiteOn7 = datePipe.transform(expiteOn7,'yyyy-MM-dd')
let expiteOn8 = form.expiteOn8
expiteOn8 = datePipe.transform(expiteOn8,'yyyy-MM-dd')
let expiteOn9 = form.expiteOn9
expiteOn9 = datePipe.transform(expiteOn9,'yyyy-MM-dd')
let expiteOn10 = form.expiteOn10
expiteOn10 = datePipe.transform(expiteOn10,'yyyy-MM-dd')
let expiteOn11 = form.expiteOn11
expiteOn11 = datePipe.transform(expiteOn11,'yyyy-MM-dd')
let expiteOn12 = form.expiteOn12
expiteOn12 = datePipe.transform(expiteOn12,'yyyy-MM-dd')
let quarterExpiteOn1 = form.quarterExpiteOn1
quarterExpiteOn1 = datePipe.transform(quarterExpiteOn1,'yyyy-MM-dd')
let quarterExpiteOn2 = form.quarterExpiteOn2
quarterExpiteOn2 = datePipe.transform(quarterExpiteOn2,'yyyy-MM-dd')
let quarterExpiteOn3 = form.quarterExpiteOn3
quarterExpiteOn3 = datePipe.transform(quarterExpiteOn3,'yyyy-MM-dd')
let quarterExpiteOn4 = form.quarterExpiteOn4
quarterExpiteOn4 = datePipe.transform(quarterExpiteOn4,'yyyy-MM-dd')
let yearlyExpiteOn1 = form.yearlyExpiteOn1
yearlyExpiteOn1 = datePipe.transform(yearlyExpiteOn1,'yyyy-MM-dd')
let yearlyExpiteOn2 = form.yearlyExpiteOn2
yearlyExpiteOn2 = datePipe.transform(yearlyExpiteOn2,'yyyy-MM-dd')

let leaveAllocation=[];

if(this.creditingType=='End of Month' || this.creditingType=='Start of Month'){

  leaveAllocation=[
                                  {month:"1",noOfLeave:form.leaves1,expiteOn: expiteOn1},
                                  {month:"2",noOfLeave:form.leaves2,expiteOn: expiteOn2},
                                  {month:"3",noOfLeave:form.leaves3,expiteOn: expiteOn3},
                                  {month:"4",noOfLeave:form.leaves4,expiteOn: expiteOn4},
                                  {month:"5",noOfLeave:form.leaves5,expiteOn: expiteOn5},
                                  {month:"6",noOfLeave:form.leaves6,expiteOn:expiteOn6},
                                  {month:"7",noOfLeave:form.leaves7,expiteOn:expiteOn7},
                                  {month:"8",noOfLeave:form.leaves8,expiteOn:expiteOn8},
                                  {month:"9",noOfLeave:form.leaves9,expiteOn:expiteOn9},
                                  {month:"10",noOfLeave:form.leaves10,expiteOn: expiteOn10},
                                  {  month:"11",noOfLeave:form.leaves11, expiteOn: expiteOn11 },
                                  { month:"12", noOfLeave:form.leaves12, expiteOn: expiteOn12 }, ]
}
if(this.creditingType=='Start of Quarter' || this.creditingType=='End of Quarter'){

  leaveAllocation=[
                                  {month:"1",noOfLeave:form.quarterLeaves1,expiteOn:quarterExpiteOn1},
                                  {month:"4",noOfLeave:form.quarterLeaves2,expiteOn: quarterExpiteOn2},
                                  {month:"7",noOfLeave:form.quarterLeaves3,expiteOn: quarterExpiteOn3},
                                  {month:"10",noOfLeave:form.quarterLeaves4,expiteOn:quarterExpiteOn4},
                                  ]
} 
if(this.creditingType=='Half Yearly'){

  leaveAllocation=[
                                  {month:"1",noOfLeave:form.yearlyLeaves1,expiteOn: yearlyExpiteOn1},
                                  {month:"7",noOfLeave:form.yearlyLeaves2,expiteOn: yearlyExpiteOn2},
                                  
                                  ]
} 
if(this.creditingType=='Start of Year' || this.creditingType=='Yearly Attendance Prorata' || this.creditingType=='One Time' || this.creditingType=='Monthly Attendance Prorata(yearly)' || this.creditingType=='Monthly Attendance Prorata'){

  leaveAllocation=[]
} 


let grade = []
let branch = []
let category=[]
let encash = []

form.grade.forEach(element => {
  let value={grade:element}
grade.push(value)
});

form.branch.forEach(element => {
  let value={branchName:element}
  branch.push(value)
});

form.category.forEach(element => {
  let value={category:element}
  category.push(value)
});

form.leaveEncash?.forEach(element => {
  let value={leaveAllocationleaveEncashOn:element}
  encash.push(value)
});


let data = {
  state: form.state,
  branchNames: branch,
  grades:grade,
  creditingType: this.creditingType,
  categorys: category,
  leaveCode: form.leave,
  leaveDescription: form.leaveDescription,
  totalLeave: form.totalLeave,
  leaveAllocationCreditingTypes: leaveAllocation,
  effectiveDate: effectiveDate,
  carryForwardable: form.carryForward,
  maximumLeaveDays: form.maxLeaves,
  minimumLeaveDays: form.maxLeaves,
  applicableInProbation: form.probation,
  leaveEncashable:form.encashable,
  maxBalanceEncashable: form.maxBalanceEncash,
  maxBalanceCarryForward: form.maxBalCarryForward,
  leaveCreditAfterJoiningInMonth: form.leaveCredit,
  leaveLapsDurationInMonth: form.leaveLaps,
  paid: form.isPaid,
  leaveAllocationleaveEncashOns: encash,
  leaveEncashment:form.manualLeaveEncash,
  status: form.status,
  isLeaveEncashmentManuals:form.selectMonth,
  leaveEncashmentManualb:form.encashable,
  leaveCreditMonths: form.leaveCreditMonths,
  percentage: form.percentage,
  leaveLapsMonths: form.leaveLapsMonths
}

// let data = {
//   state: form.state,
//   branchNames: form.branch,
//   grades:form.grade,
//   categorys: form.category,
//   leaveAllocationleaveEncashOns: form.leaveEncash,
//   leaveAllocationCreditingTypes: leaveAllocation,
//   totalLeave: form.totalLeave,
//   leaveCode: form.leave,
//   leaveDescription: form.leaveDescription,
//   effectiveDate: effectiveDate,
//   carryForwardable: form.carryForward,
//   maximumLeaveDays: form.maxLeaves,
//   minimumLeaveDays: form.minLeaves,
//   applicableInProbation: form.probation,
//   leaveEncashable: form.encashable,
//   maxBalanceEncashable: form.maxBalanceEncash,
//   maxBalanceCarryForward: form.maxBalCarryForward,
//   leaveCreditAfterJoiningInMonth: form.leaveCredit,
//   leaveLapsDurationInMonth: form.leaveLaps,
//   paid: form.isPaid,
//   leaveEncashment:form.manualLeaveEncash,
//   status: form.status,
//   isLeaveEncashmentManuals: form.selectMonth,
//   isLeaveEncashmentManualb: form.manualLeaveEncash,
//   percentage: form.percentage,
//   leaveLapsMonths: form.leaveLapsMonths,
//   creditingType: this.creditingType
// }

this._service.add(data, 'addLeaveAllocation').subscribe((res)=>{
  if(res.respose == "Success"){
    Swal.fire({
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    })
   this.cancel()

  }
  else if(res.respose == "Alread"){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Record Already Exists!',
  
    })
    this.submitLoader = false
   }
   else{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
  
    })
    this.submitLoader = false
   }
  })
  this.submitLoader = false

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

  get(){
    this._service.get('getAllLeaveAllocation').subscribe((res)=>{
      if(res){
      res.forEach(element => {
        let state=element.state 
        let result=this.states.filter((stat:any) =>
        (stat.stateId=state) )
         
          this.allDetails.push({"state":result[0].stateName,"leaveCode":element.leaveCode,"carryForwardable":element.carryForwardable,"leaveEncashable":element.leaveEncashable,"paid":element.paid,"status":element.status,"leaveAllocationMasterId":element.leaveAllocationMasterId})
        
      });
      }

      this.allocationTable = this.allDetails;
      this.loader = false;
      
    },(error)=>{
    
      this.loader = false
      console.log(error)
      alert("Something Went Wrong")
})
  }
  edit(id){
    this.update=true;
this.showMyContainer=true
this.editId = id
let url = 'getLeaveAllocation/'+`${id}`
this._service.get(url).subscribe((res)=>{
  this.response = res
  res.grades?.forEach(element => {
    let grade = element.grade
    this.gradeUpdate.push(grade)
 
  });

  res.categorys?.forEach(element => {
    let category = element.category
    this.category.push(category)
 
  });

  res.branchNames?.forEach(element => {
    let branch = element.branchName
    this.branchUpdate.push(branch)

  });
  res.leaveAllocationleaveEncashOns?.forEach(element => {
    let leaveEncash = element.leaveAllocationleaveEncashOn
    this.leaveEncashUpdate.push(leaveEncash)

  });
  

  
  var datePipe = new DatePipe('en-US');
  let date = res.effectiveDate
  date = datePipe.transform(date,'yyyy-MM-dd')
if( res.leaveAllocationCreditingType?.length < 1){

}
  if(res.creditingType=='Half Yearly'){

let yearlyDate1 = res.leaveAllocationCreditingTypes[0].expiteOn
yearlyDate1 = datePipe.transform(yearlyDate1,'yyyy-MM-dd')
let yearlyDate2 = res.leaveAllocationCreditingTypes[1].expiteOn
yearlyDate2 = datePipe.transform(yearlyDate2,'yyyy-MM-dd')
  
this.leaveAllocationForm.get('yearlyExpiteOn1').setValue(yearlyDate1)
this.leaveAllocationForm.get('yearlyExpiteOn2').setValue(yearlyDate2)
this.leaveAllocationForm.get('yearlyLeaves1').setValue(res.leaveAllocationCreditingTypes[0].noOfLeave)
this.leaveAllocationForm.get('yearlyLeaves2').setValue(res.leaveAllocationCreditingTypes[1].noOfLeave)



}
if(res.creditingType=='Start of Quarter' || res.creditingType=='End of Quarter'){
  let quarterDate1 = res.leaveAllocationCreditingTypes[0].expiteOn
  quarterDate1 = datePipe.transform(quarterDate1,'yyyy-MM-dd')
  let quarterDate2 = res.leaveAllocationCreditingTypes[1].expiteOn
  quarterDate2 = datePipe.transform(quarterDate2,'yyyy-MM-dd')
  let quarterDate3 = res.leaveAllocationCreditingTypes[2].expiteOn
  quarterDate3 = datePipe.transform(quarterDate3,'yyyy-MM-dd')
  let quarterDate4 = res.leaveAllocationCreditingTypes[3].expiteOn
  quarterDate4 = datePipe.transform(quarterDate4,'yyyy-MM-dd')

  this.leaveAllocationForm.get('quarterLeaves1').setValue(res.leaveAllocationCreditingTypes[0].noOfLeave)
  this.leaveAllocationForm.get('quarterLeaves2').setValue(res.leaveAllocationCreditingTypes[1].noOfLeave)
  this.leaveAllocationForm.get('quarterLeaves3').setValue(res.leaveAllocationCreditingTypes[2].noOfLeave)
  this.leaveAllocationForm.get('quarterLeaves4').setValue(res.leaveAllocationCreditingTypes[3].noOfLeave)
  this.leaveAllocationForm.get('quarterExpiteOn1').setValue(quarterDate1)
  this.leaveAllocationForm.get('quarterExpiteOn2').setValue(quarterDate2)
  this.leaveAllocationForm.get('quarterExpiteOn3').setValue(quarterDate3)
  this.leaveAllocationForm.get('quarterExpiteOn4').setValue(quarterDate4)

}

if(res.creditingType=='Start of Month' || res.creditingType=='End of Month')
{
let monthlyDate = res.leaveAllocationCreditingTypes[0].expiteOn
monthlyDate = datePipe.transform(monthlyDate,'yyyy-MM-dd')
let monthlyDate1 = res.leaveAllocationCreditingTypes[1].expiteOn
monthlyDate1 = datePipe.transform(monthlyDate1,'yyyy-MM-dd')
let monthlyDate2 = res.leaveAllocationCreditingTypes[2].expiteOn
monthlyDate2 = datePipe.transform(monthlyDate2,'yyyy-MM-dd')
let monthlyDate3 = res.leaveAllocationCreditingTypes[3].expiteOn
monthlyDate3 = datePipe.transform(monthlyDate3,'yyyy-MM-dd')
let monthlyDate4 = res.leaveAllocationCreditingTypes[4].expiteOn
monthlyDate4 = datePipe.transform(monthlyDate4,'yyyy-MM-dd')
let monthlyDate5 = res.leaveAllocationCreditingTypes[5].expiteOn
monthlyDate5 = datePipe.transform(monthlyDate5,'yyyy-MM-dd')
let monthlyDate6 = res.leaveAllocationCreditingTypes[6].expiteOn
monthlyDate6 = datePipe.transform(monthlyDate6,'yyyy-MM-dd')
let monthlyDate7 = res.leaveAllocationCreditingTypes[7].expiteOn
monthlyDate7 = datePipe.transform(monthlyDate7,'yyyy-MM-dd')
let monthlyDate8 = res.leaveAllocationCreditingTypes[8].expiteOn
monthlyDate8 = datePipe.transform(monthlyDate8,'yyyy-MM-dd')
let monthlyDate9 = res.leaveAllocationCreditingTypes[9].expiteOn
monthlyDate9 = datePipe.transform(monthlyDate9,'yyyy-MM-dd')
let monthlyDate10 = res.leaveAllocationCreditingTypes[10].expiteOn
monthlyDate10 = datePipe.transform(monthlyDate10,'yyyy-MM-dd')
let monthlyDate11 = res.leaveAllocationCreditingTypes[11].expiteOn
monthlyDate11 = datePipe.transform(monthlyDate11,'yyyy-MM-dd')



this.leaveAllocationForm.get('expiteOn1').setValue(monthlyDate)
  this.leaveAllocationForm.get('expiteOn2').setValue(monthlyDate1)
  this.leaveAllocationForm.get('expiteOn3').setValue(monthlyDate2)
  this.leaveAllocationForm.get('expiteOn4').setValue(monthlyDate3)
  this.leaveAllocationForm.get('expiteOn5').setValue(monthlyDate4)
  this.leaveAllocationForm.get('expiteOn6').setValue(monthlyDate5)
  this.leaveAllocationForm.get('expiteOn7').setValue(monthlyDate6)
  this.leaveAllocationForm.get('expiteOn8').setValue(monthlyDate7)
  this.leaveAllocationForm.get('expiteOn9').setValue(monthlyDate8)
  this.leaveAllocationForm.get('expiteOn10').setValue(monthlyDate9)
  this.leaveAllocationForm.get('expiteOn11').setValue(monthlyDate10)
  this.leaveAllocationForm.get('expiteOn12').setValue(monthlyDate11)
  this.leaveAllocationForm.get('leaves1').setValue(res.leaveAllocationCreditingTypes[0].noOfLeave)
  this.leaveAllocationForm.get('leaves2').setValue(res.leaveAllocationCreditingTypes[1].noOfLeave)
  this.leaveAllocationForm.get('leaves3').setValue(res.leaveAllocationCreditingTypes[2].noOfLeave)
  this.leaveAllocationForm.get('leaves4').setValue(res.leaveAllocationCreditingTypes[3].noOfLeave)
  this.leaveAllocationForm.get('leaves5').setValue(res.leaveAllocationCreditingTypes[4].noOfLeave)
  this.leaveAllocationForm.get('leaves6').setValue(res.leaveAllocationCreditingTypes[5].noOfLeave)
  this.leaveAllocationForm.get('leaves7').setValue(res.leaveAllocationCreditingTypes[6].noOfLeave)
  this.leaveAllocationForm.get('leaves8').setValue(res.leaveAllocationCreditingTypes[7].noOfLeave)
  this.leaveAllocationForm.get('leaves9').setValue(res.leaveAllocationCreditingTypes[8].noOfLeave)
  this.leaveAllocationForm.get('leaves10').setValue(res.leaveAllocationCreditingTypes[9].noOfLeave)
  this.leaveAllocationForm.get('leaves11').setValue(res.leaveAllocationCreditingTypes[10].noOfLeave)
  this.leaveAllocationForm.get('leaves12').setValue(res.leaveAllocationCreditingTypes[11].noOfLeave)


}

  this.leaveAllocationForm.get('grade').setValue(this.gradeUpdate)
  this.leaveAllocationForm.get('state').setValue(res.state)
  this.leaveAllocationForm.get('leave').setValue(res.leaveCode)
  this.leaveAllocationForm.get('leaveDescription').setValue(res.leaveDescription)
  this.leaveAllocationForm.get('totalLeave').setValue(res.totalLeave)
  this.leaveAllocationForm.get('effectiveDate').setValue(date)
  this.leaveAllocationForm.get('branch').setValue(this.branchUpdate)
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
  this.leaveAllocationForm.get('leaveEncash').setValue(this.leaveEncashUpdate)
  this.leaveAllocationForm.get('manualLeaveEncash').setValue(res.leaveEncashmentManualb)
  this.leaveAllocationForm.get('selectMonth').setValue(res.isLeaveEncashmentManuals)
  this.leaveAllocationForm.get('status').setValue(res.status)
  this.leaveAllocationForm.get('category').setValue(this.category)
  this.leaveAllocationForm.get('leaveCreditMonths').setValue(res.leaveCreditMonths)
  this.leaveAllocationForm.get('percentage').setValue(res.percentage)
  this.leaveAllocationForm.get('leaveLapsMonths').setValue(res.leaveLapsMonths)
  this.leaveAllocationForm.get('creditingType').setValue(res.creditingType)
  

  

  
})
  }
  // edit(id){

  //   this.router.navigate[("layout/masters/leaveAllocationUpdate/"+id)]
  // }
  cancel(){
    const currentRoute = this.router.url;

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentRoute]); 
    }); 
  }
delete(id){
  let url = 'deleteLeaveAllocation/'+`${id}`
 

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
      this._service.get(url).subscribe((res)=>{
      
      })
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  })
this.get();
}

updateLeaveAllocation(){

  if (this.leaveAllocationForm.status == 'VALID'){
    let form =this.leaveAllocationForm.value;
var datePipe = new DatePipe('en-US');
let effectiveDate = form.effectiveDate
effectiveDate = datePipe.transform(effectiveDate,'yyyy-MM-dd')
let expiteOn1 = form.expiteOn1
expiteOn1 = datePipe.transform(expiteOn1,'yyyy-MM-dd')
let expiteOn2 = form.expiteOn2
expiteOn2 = datePipe.transform(expiteOn2,'yyyy-MM-dd')
let expiteOn3 = form.expiteOn3
expiteOn3 = datePipe.transform(expiteOn3,'yyyy-MM-dd')
let expiteOn4 = form.expiteOn4
expiteOn4 = datePipe.transform(expiteOn4,'yyyy-MM-dd')
let expiteOn5 = form.expiteOn5
expiteOn5 = datePipe.transform(expiteOn5,'yyyy-MM-dd')
let expiteOn6 = form.expiteOn6
expiteOn6 = datePipe.transform(expiteOn6,'yyyy-MM-dd')
let expiteOn7 = form.expiteOn7
expiteOn7 = datePipe.transform(expiteOn7,'yyyy-MM-dd')
let expiteOn8 = form.expiteOn8
expiteOn8 = datePipe.transform(expiteOn8,'yyyy-MM-dd')
let expiteOn9 = form.expiteOn9
expiteOn9 = datePipe.transform(expiteOn9,'yyyy-MM-dd')
let expiteOn10 = form.expiteOn10
expiteOn10 = datePipe.transform(expiteOn10,'yyyy-MM-dd')
let expiteOn11 = form.expiteOn11
expiteOn11 = datePipe.transform(expiteOn11,'yyyy-MM-dd')
let expiteOn12 = form.expiteOn12
expiteOn12 = datePipe.transform(expiteOn12,'yyyy-MM-dd')
let quarterExpiteOn1 = form.quarterExpiteOn1
quarterExpiteOn1 = datePipe.transform(quarterExpiteOn1,'yyyy-MM-dd')
let quarterExpiteOn2 = form.quarterExpiteOn2
quarterExpiteOn2 = datePipe.transform(quarterExpiteOn2,'yyyy-MM-dd')
let quarterExpiteOn3 = form.quarterExpiteOn3
quarterExpiteOn3 = datePipe.transform(quarterExpiteOn3,'yyyy-MM-dd')
let quarterExpiteOn4 = form.quarterExpiteOn4
quarterExpiteOn4 = datePipe.transform(quarterExpiteOn4,'yyyy-MM-dd')
let yearlyExpiteOn1 = form.yearlyExpiteOn1
yearlyExpiteOn1 = datePipe.transform(yearlyExpiteOn1,'yyyy-MM-dd')
let yearlyExpiteOn2 = form.yearlyExpiteOn2
yearlyExpiteOn2 = datePipe.transform(yearlyExpiteOn2,'yyyy-MM-dd')

let leaveAllocation=[];

if(this.creditingType=='End of Month' || this.creditingType=='Start of Month'){

leaveAllocation=[
                            {creditingType:this.creditingType,month:"1",noOfLeave:form.leaves1,expiteOn: expiteOn1},
                            {creditingType:this.creditingType,month:"2",noOfLeave:form.leaves2,expiteOn: expiteOn2},
                            {creditingType:this.creditingType,month:"3",noOfLeave:form.leaves3,expiteOn: expiteOn3},
                            {creditingType:this.creditingType,month:"4",noOfLeave:form.leaves4,expiteOn: expiteOn4},
                            {creditingType:this.creditingType,month:"5",noOfLeave:form.leaves5,expiteOn: expiteOn5},
                            {creditingType:this.creditingType,month:"6",noOfLeave:form.leaves6,expiteOn:expiteOn6},
                            {creditingType:this.creditingType,month:"7",noOfLeave:form.leaves7,expiteOn:expiteOn7},
                            {creditingType:this.creditingType,month:"8",noOfLeave:form.leaves8,expiteOn:expiteOn8},
                            {creditingType:this.creditingType,month:"9",noOfLeave:form.leaves9,expiteOn:expiteOn9},
                            {creditingType:this.creditingType,month:"10",noOfLeave:form.leaves10,expiteOn: expiteOn10},
                            { creditingType:this.creditingType, month:"11",noOfLeave:form.leaves11, expiteOn: expiteOn11 },
                            {creditingType:this.creditingType, month:"12", noOfLeave:form.leaves12, expiteOn: expiteOn12 }, ]
}
if(this.creditingType=='Start of Quarter' || this.creditingType=='End of Quarter'){

leaveAllocation=[
                            {creditingType:this.creditingType,month:"1",noOfLeave:form.quarterLeaves1,expiteOn:quarterExpiteOn1},
                            {creditingType:this.creditingType,month:"4",noOfLeave:form.quarterLeaves2,expiteOn: quarterExpiteOn2},
                            {creditingType:this.creditingType,month:"7",noOfLeave:form.quarterLeaves3,expiteOn: quarterExpiteOn3},
                            {creditingType:this.creditingType,month:"10",noOfLeave:form.quarterLeaves4,expiteOn:quarterExpiteOn4},
                            ]
} 
if(this.creditingType=='Half Yearly'){

leaveAllocation=[
                            {creditingType:this.creditingType,month:"1",noOfLeave:form.yearlyLeaves1,expiteOn: yearlyExpiteOn1},
                            {creditingType:this.creditingType,month:"7",noOfLeave:form.yearlyLeaves2,expiteOn: yearlyExpiteOn2},
                            
                            ]
} 
if(this.creditingType=='Start of Year' || this.creditingType=='Yearly Attendance Prorata' || this.creditingType=='One Time' || this.creditingType=='Monthly Attendance Prorata(yearly)' || this.creditingType=='Monthly Attendance Prorata'){

  leaveAllocation=[{creditingType:this.creditingType, month:"",noOfLeave:"",expiteOn: ""}]
} 




let grade = []
let branch = []
let category=[]
let encash = []

form.grade.forEach(element => {
  let value={grade:element}
grade.push(value)
});

form.branch.forEach(element => {
  let value={branchName:element}
  branch.push(value)
});

form.category.forEach(element => {
  let value={category:element}
  category.push(value)
});

form.leaveEncash?.forEach(element => {
  let value={leaveAllocationleaveEncashOn:element}
  encash.push(value)
});


let data = {
  state: form.state,
  branchNames: branch,
  grades:grade,
  creditingType: this.creditingType,
  categorys: category,
  leaveCode: form.leave,
  leaveDescription: form.leaveDescription,
  totalLeave: form.totalLeave,
  leaveAllocationCreditingTypes: leaveAllocation,
  effectiveDate: effectiveDate,
  carryForwardable: form.carryForward,
  maximumLeaveDays: form.maxLeaves,
  minimumLeaveDays: form.maxLeaves,
  applicableInProbation: form.probation,
  leaveEncashable:form.encashable,
  maxBalanceEncashable: form.maxBalanceEncash,
  maxBalanceCarryForward: form.maxBalCarryForward,
  leaveCreditAfterJoiningInMonth: form.leaveCredit,
  leaveLapsDurationInMonth: form.leaveLaps,
  paid: form.isPaid,
  leaveAllocationleaveEncashOns: encash,
  leaveEncashment:form.manualLeaveEncash,
  status: form.status,
  isLeaveEncashmentManuals:form.selectMonth,
  leaveEncashmentManualb:form.encashable,
  leaveCreditMonths: form.leaveCreditMonths,
  percentage: form.percentage,
  leaveLapsMonths: form.leaveLapsMonths
}

let url = 'updateLeaveAllocation/'+`${this.editId}`

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
        this.router.navigate([currentRoute]); // navigate to same route
    }); 
   
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

getLeave(){
  this._service.get('getgetCodeByType?type=Leave Code').subscribe((res)=>{
    this.leave = res
  })
}
showContainer(){
  this.showMyContainer=true;
}
hideMyContainer(){
this.cancel()
}


}
