import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2';
import { AllModulesService } from '../../all-modules.service';

@Component({
  selector: 'app-policy-setting',
  templateUrl: './policy-setting.component.html',
  styleUrls: ['./policy-setting.component.css']
})
export class PolicySettingComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  dtOptions: any = {};
  showMyContainer: boolean = false
  branch: any[] = [{id:'', name:''}];
  state: any[];
  grade: any[]= [{id:'', name:''}];
  category:any[]= [{id:'', name:''}];
  policyForm:FormGroup
  shortLeavesDays:any=[
    {id:'',name:'Monday'},
    {id:'',name:'Tuesday'},
    {id:'',name:'Wednesday'},
    {id:'',name:'Thursday'},
    {id:'',name:'Friday'},
    {id:'',name:'Saturday'},
    {id:'',name:'Sunday'}

   ]
  
  constructor(
    public _service : AllModulesService,
    public router : Router,
    public fb : FormBuilder,

  ) { }

  ngOnInit(): void { 
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'print', 
        ]
    };

    this.getBranch()
    this.getCategory()
    this.getGrade()
    this.getState()
    this.getTableData()
    this.getShortLeave()
    
    this.policyForm = this.fb.group({
      state:["",Validators.required],
      grade:["",Validators.required],
      branch:["",Validators.required],
      category:["",Validators.required],
      generalPolicy:["",Validators.required],
      shortleavemaxmiumeApplicate:["",Validators.required],
      howManyTimeToApplyshortleave:["",Validators.required],
      shortLeavesDays:["",Validators.required],
      // probation:["",Validators.required],
      probation:["",],
      status:'true',
      cOffNonWorking:'',
      coffAmount:'',
      otAsCoff:'',
      offDayWorkingHours:'',
      otWorkingHours:'',
      holidayWorkingHours:'',
      coffApproval:'',
      otApproval:'',
      coffValidMonth:'',
      coffValidMonths:'',
      otWorkingHoursFd:'',
      otWorkingHoursHd:'',
      holidayWorkingHoursHd:'',
      holidayWorkingHoursFd:'',
      offDayWorkingHoursHd:'',
      offDayWorkingHoursFd:'',
      encashable:''
    })
  }
  showContainer(){
    this.showMyContainer=true; 
  }
  hideContainer(){
    const currentRoute = this.router.url;

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentRoute]); // navigate to same route
    }); 
  }
          getBranch(){

   
        this._service.get('branch/getBranchList')
        .subscribe((res)=>{
         
          let branch = []
          res.forEach(element => {
           
            let branches={id:element.branchName, name:element.branchName}
            branch.push(branches)
          
          this.branch=branch

          });
      
        })
        
          }
          getState(){
            this._service.get("state/getStateList").subscribe((res)=>{
             this.state = res
            })
          }
          getCategory(){
            let category = []
            this._service.get('categories/getCategories').subscribe((res)=>{
            
              res.forEach(element => {
                   
                let categories={id:element.categoryName, name:element.categoryName}
                category.push(categories)
                this.category = category
               
              
                
              });
            })
          }
          getGrade(){
           let grade = []
           this._service.get('getgetCodeByType?type=grade').subscribe((res)=>{
             this.grade = res
             console.log(res)
             res.forEach(element => {
                  
               let grades={id:element.name, name:element.name}
              if(element.name){ grade.push(grades)
               this.grade = grade
              }
             
               
             });
           })
         
}      
getShortLeave(){
let shortLeavesDay=[]
  this.shortLeavesDays.forEach(element =>{
    let shortleaveday={id:element.name, name:element.name}
    if(element.name){ shortLeavesDay.push(shortleaveday)
      this.shortLeavesDays = shortLeavesDay
     }
  })
  console.log(shortLeavesDay)
}    

        
submit(){
  let form = this.policyForm.value
  
  let  url
 if(this.editId){
  url  = "updateGeneralPolicy/" + this.editId
 }
 else{
  url = "addGeneralPolicyMaster"
 }

  let grade = []
  form.grade?.forEach(element => {
    let value = {'grade':element}
   
      grade.push(value)
  });
  console.log(grade)
  let branch = []
  form.branch?.forEach(element => {
    let value = {'branch':element}
    branch.push(value)
  });
  let category = []
  form.category?.forEach(element => {
    let value = {'category':element}
    category.push(value)
  });
  let shortLeavesDay=[]
  form.shortLeavesDays?.forEach(element =>{
    let value={'day': element,}
    shortLeavesDay.push(value)
    console.log(shortLeavesDay)
  })
  
  let data = 
    {
      state: form.state,
      branchs: branch,
      grades: grade,
      categorys:category,
      generalPolicyName: form.generalPolicy,
      probationPeriod: form.probation,
      coffOnNonWorkingDay: form.cOffNonWorking,
      overTimeAsCoff: form.otAsCoff,
      offDayWorkingHours: form.offDayWorkingHours,
      offDayWorkingHoursFullDay: form.offDayWorkingHoursFd,
      offDayWorkingHoursHalfDay: form.offDayWorkingHoursHd,
      overtimeWorkingHoursForWorkingDays: form.otWorkingHours,
      overtimeWorkingHoursForWorkingDaysFullDay: form.otWorkingHoursFd,
      overtimeWorkingHoursForWorkingDaysHalfDay: form.otWorkingHoursHd,
      holidayWorkingHours: form.holidayWorkingHours,
      holidayWorkingHoursFullDay: form.holidayWorkingHoursFd,
      holidayWorkingHoursHalfDay: form.holidayWorkingHoursHd,
      coffApproval: form.coffApproval,
      overtimeApproval:form.otApproval,
      coffValidMonth:form.coffValidMonth,
      coffValidMonthValue: form.coffValidMonths,
      status: form.status,
      shortleavemaxmiumeApplicate:form.shortleavemaxmiumeApplicate,
      howManyTimeToApplyshortleave:form.howManyTimeToApplyshortleave,
      shortLeaveDays:shortLeavesDay


  
  }
if(this.policyForm.valid){
this._service.add(data, url).subscribe((res)=>{
  if(res.respose=="Success"){
    Swal.fire({
  
      icon: 'success',
      title: 'Data Added Successfully',
      showConfirmButton: false,
      timer: 1500
    })
    const currentRoute = this.router.url;

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentRoute]); // navigate to same route
    }); 
  }
else  if(res.respose=="Already "){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Data Code Already Exists',
     
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
  this.policyForm.markAllAsTouched()
}
}

nonworking(type){
if(type == 'main'){

  this.policyForm.get('offDayWorkingHours').setValue(false)
  this.policyForm.get('holidayWorkingHours').setValue(false)
}
else if(type == 'sub1'){
  this.policyForm.controls.holidayWorkingHoursFd.reset()
  this.policyForm.controls.holidayWorkingHoursHd.reset()
}
else{
  this.policyForm.controls.offDayWorkingHoursHd.reset()
  this.policyForm.controls.offDayWorkingHoursFd.reset()
}

}
cOff(type){
  if(type == 'main'){
    this.policyForm.get('otWorkingHours').setValue(false)
  }
  this.policyForm.controls.otWorkingHoursHd.reset()
  this.policyForm.controls.otWorkingHoursFd.reset()
}
months(){
  this.policyForm.controls.coffValidMonths.reset()
}
tableData
getTableData(){
  this._service.get('getAllGeneralPolicyMaster').subscribe((res)=>{
   this.tableData = res

   this.tableData.forEach(element => {
    let sate=element.state

    

    
   });
  
  })
}
editId
update : boolean = false
edit(id){
  this.editId = id
  this.update = true
  this.showMyContainer = true

  this._service.get('getGeneralPolicyById/'+id).subscribe((res)=>{
    console.log(res)
  this.policyForm.get('state').setValue(res.state)
  this.policyForm.get('status').setValue(res.status)

  this.policyForm.get('generalPolicy').setValue(res.generalPolicyName)
  this.policyForm.get('probation').setValue(res.probationPeriod)
  this.policyForm.get('cOffNonWorking').setValue(res.coffOnNonWorkingDay)
  this.policyForm.get('otAsCoff').setValue(res.overTimeAsCoff)
  this.policyForm.get('offDayWorkingHours').setValue(res.offDayWorkingHours)
  this.policyForm.get('otWorkingHours').setValue(res.overtimeWorkingHoursForWorkingDays)
  this.policyForm.get('holidayWorkingHours').setValue(res.holidayWorkingHours)
  this.policyForm.get('coffApproval').setValue(res.coffApproval)
  this.policyForm.get('otApproval').setValue(res.overtimeApproval)
  this.policyForm.get('coffValidMonth').setValue(res.coffValidMonth)
  this.policyForm.get('coffValidMonths').setValue(res.coffValidMonthValue)


  this.policyForm.get('offDayWorkingHoursFd').setValue(res.offDayWorkingHoursFullDay)
  this.policyForm.get('offDayWorkingHoursHd').setValue(res.offDayWorkingHoursHalfDay)
  this.policyForm.get('holidayWorkingHoursFd').setValue(res.holidayWorkingHoursFullDay)
  this.policyForm.get('holidayWorkingHoursHd').setValue(res.holidayWorkingHoursHalfDay)
  this.policyForm.get('otWorkingHoursFd').setValue(res.overtimeWorkingHoursForWorkingDaysFullDay)
  this.policyForm.get('otWorkingHoursHd').setValue(res.overtimeWorkingHoursForWorkingDaysHalfDay)
  this.policyForm.get('shortleavemaxmiumeApplicate').setValue(res.shortleavemaxmiumeApplicate)
  this.policyForm.get('howManyTimeToApplyshortleave').setValue(res.howManyTimeToApplyshortleave)
  
  let branch :any= []
  let grade :any= []
  let category:any = []
  
  res.branchs.forEach(element => {
    branch.push(element.branch)
    console.log(branch)
  });
  res.categorys.forEach(element => {
    category.push(element.category)
    console.log(category)
  });
  res.grades.forEach(element => {
    grade.push(element.grade)
  });


  this.policyForm.get('category').setValue(category)
  this.policyForm.get('branch').setValue(branch)
  this.policyForm.get('grade').setValue(grade)
  let day:any=[]
  // res.shortLeaveDays.forEach(element=>{
  //   shortL.push(element.day)
  // });
  // console.log(shortL)
  res.shortLeaveDays.forEach(element => {
    day.push(element.day)
    console.log(branch)
  });
  this.policyForm.get('shortLeavesDays').setValue(day)
  })

}
delete(id){
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
      Swal.fire({
        title: 'Loading...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading()
        }
      })

      this._service.delete(id,'deleteGeneralPolicy').subscribe((res)=>{
       
        if(res.respose=="Success"){
          Swal.fire({
      
            icon: 'success',
            title: 'Employee Deleted Successfully',
            showConfirmButton: false,
            timer: 1500,
            didOpen: () => {
              Swal.hideLoading()
            }
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
        }
