import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IMultiSelectOption } from 'ngx-bootstrap-multiselect';
import { AllModulesService } from 'src/app/all-modules/all-modules.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-salary-calendar-manual',
  templateUrl: './salary-calendar-manual.component.html',
  styleUrls: ['./salary-calendar-manual.component.css']
})
export class SalaryCalendarManualComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  showMyContainer:boolean = false;
  salaryForm: FormGroup
  departureDetails: any; 
  datePipe = new DatePipe('en-US');
  editPlanId: null;
  employees: any;
  index:any;
  year = ["2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025"]
  months =  ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  regularizationList: any;
  salaryCalender: any=[];
  branch:IMultiSelectOption[];
  state:IMultiSelectOption[];
  grade: IMultiSelectOption[];
  categories: any;
  loader = true
  grade1: any=[];
  salaryCalender_display: any=[];
  state1: any=[];
  branch1: any=[];
  stateDataArr:any=[];
  categories1: any=[];
  stateA: any=[];
  categoryA: any=[];
  branchA: any=[];
  gradeA: any=[];
  res: any;
  states1: any[];
  grades1: any[];
 
  constructor(public _fb:FormBuilder,public _service:AllModulesService,public router:Router) { }
  ngOnInit(): void {
    this.dtOptions = {
      // ... skipped ...
      dom: 'lrtip',
      processing: true
   }
   
    
    this.salaryForm = this._fb.group({
      state:['',Validators.required],
      branch:['',Validators.required],
      category:['',Validators.required],
      grade:['',Validators.required],
      fromDate:['',Validators.required],
      toDate:['',Validators.required],
      name:['',Validators.required],
      amount:['',Validators.required],
      month:['',Validators.required],
      year:['',Validators.required],
    })
    this.getAllEmployee();
    this.getBranch();
    this.getState();
    this.getCategories();
    this.department();
    this.getGrade();
    this.getSalaryCalender();
   
  }


  getBranch(){

   
    this._service.get('branch/getBranchList')
    .subscribe((res)=>{
     
      let branch = []

      res.forEach(element => {
       
        let branches={id:element.id, name:element.branchName}
        branch.push(branches)
      
      this.branch=branch

      });
  
    })
    
      }
      getState(){
        this._service.get("state/getStateList").subscribe((res)=>{
     let state = []
      res.forEach(element => {
       
        let states={id:element.stateId, name:element.stateName}
        state.push(states)
        this.states1=state
      this.state=state
      
      

      });
  
        })
      }


  categorie:IMultiSelectOption[];
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



  // getCategories(){
  //   this._service.get('categories/getCategories').subscribe((res)=>{
  //     this.categories=res
  //   })
  // }
  department(){
    this._service.get('getAllDepartment').subscribe((res)=>{
      this.department=res
    })
  }
  // getState(){

  //   this._service.get('state/getStateList')
  //   .subscribe((res)=>{

  //   this.stateList = res
    
  //   })
     
  //   }
    getGrade(){
  
      let grade=[]
     
      this._service.get('getgetCodeByType?type=grade').subscribe((res)=>{
        
        
        res.forEach(element => {
         
          let grades={id:element.lookupMasterId, name:element.name}
          grade.push(grades)
         this.grades1=grade
          this.grade = grade
          
        });
       
      })
    }

    
    
      getAllEmployee(){
        this._service.get("employee_master/getemployees").subscribe((data) => {
          this.employees = data;
          
          
        });
      }

      
submit(){

  if(this.salaryForm.status == "VALID"){
    let form = this.salaryForm.value
    let fromDate = this.datePipe.transform(form.fromDate, 'yyyy-MM-dd');
    let toDate = this.datePipe.transform(form.toDate, 'yyyy-MM-dd');
    console.log(this.salaryForm.value.quantities)
    
    let grade = []
    form.grade?.forEach(element => {
      let value = {'grades':element}
     
        grade.push(value)
    });
    let category = []
  form.category?.forEach(element => {
    let value = {'category':element}
    category.push(value)
  });
  let state = []
  form.state?.forEach(element => {
    let value = {'state':element}
    state.push(value)
  });
  let branch = []
  form.branch?.forEach(element => {
    let value = {'branchName':element}
    branch.push(value)
  });
 
     let data = {
    
    year: form.year,
    month: form.month,
    states: state,
    branchs: branch,
    categorys: category,
    grades: grade,
    fullPresentAllowanceName: form.name,
    amount: form.amount,
    toDate: toDate,
    fromDate: fromDate
     }
     console.log(data)
     this._service.add(data,'addSalaryCalenderManualMaster').subscribe((res)=>{
     if (res.respose == "Success"){
      Swal.fire({
        
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
       
      })
      this.cancelForm()
      this.showMyContainer=false
      this.salaryForm.reset();
      const currentRoute = this.router.url;

      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([currentRoute]); // navigate to same route
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
    
   
     
   }
   else{
    this.salaryForm.markAllAsTouched();
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
    this.salaryForm.reset()
    this.editPlanId = null
  }
 getSalaryCalender(){
 
   this._service.get('getAllSalaryCalenderManualMaster').subscribe((res)=>{
    if(res){
      res.forEach(element => {
    this.res=element
    let states=element.states
    let branch=element.branchs 
    let category=element.categorys
    let grade=element.grades

    
    this.stateA=[];
    states.forEach(element1 => {
      console.log(element1)
      let stateRes=this.state.filter((sta:any )=> 
      (sta.id == element1.state))
      this.stateA.push(stateRes[0])
    })
    let st1=this.stateA
    this.gradeA=[];
grade.forEach(element => {
  let gradeRes=this.grade.filter((gra:any)=>
  (gra.id == element.grades))
this.gradeA.push(gradeRes[0])

})
let gr1=this.gradeA


this.branchA=[];
branch.forEach(element => {
     
let branchResult =this.branch.filter((branc: any) =>
(branc.id==element.branchName) )
this.branchA.push(branchResult[0])

});
let bran=this.branchA
this.categoryA=[];
category.forEach(element => {
  console.log(element)
  let cateResult=this.categorie.filter((cate:any)=>
  (cate.id==element.category))
  this.categoryA.push(cateResult[0])
  
});
let categ=this.categoryA




  
    
this.salaryCalender_display.push({"states":st1,"branchs":bran,"categories":categ,"grades":gr1,"month":element.month,"year":element.year,"fromDate":element.fromDate,"toDate":element.toDate,"salaryCalenderId":element.salaryCalenderId})
console.log(this.salaryCalender_display)

   
      })
    }
    this.salaryCalender=this.salaryCalender_display
    console.log(this.salaryCalender)
    this.loader = false
    }, 
    (error)=>{
     this.loader = false
     console.log(error)
     alert("Something Went Wrong")
   })
  }



  editShiftPolicy(id){
    this.editPlanId = id
    console.log(id)
    this.showMyContainer=true;

    let url = 'getSalaryCalenderManualMaster/'+`${id}`
this._service.get(url).subscribe((res)=>{
 console.log(res)
 let state=[];
 let branch=[];
 let category=[];
 let grade=[];
 res.states.forEach(element => {
  state.push(element.state)
  
});
res.branchs.forEach(element => {
  branch.push(element.branchName)
  
});
 res.grades.forEach(element => {
  grade.push(element.grades)
 });

 res.categorys.forEach(element => {
  category.push(element.category)
 });
  var datePipe = new DatePipe('en-US');
let  fromDate = datePipe.transform(res.fromDate,'dd-MM-yyyy')
let  toDate = datePipe.transform(res.toDate,'dd-MM-yyyy')

  this.salaryForm.get('year').setValue(res.year)
  this.salaryForm.get('month').setValue(res.month)
  this.salaryForm.get('state').setValue(state)
  this.salaryForm.get('branch').setValue(branch)
  this.salaryForm.get('category').setValue(category)
  this.salaryForm.get('grade').setValue(grade)
  this.salaryForm.get('name').setValue(res.fullPresentAllowanceName)
  this.salaryForm.get('amount').setValue(res.amount)
  this.salaryForm.get('fromDate').setValue(fromDate)
  this.salaryForm.get('toDate').setValue(toDate)

})

  }
  updateForm(){
    if(this.salaryForm.status == "VALID"){
      let form = this.salaryForm.value
      let fromDate = this.datePipe.transform(form.fromDate, 'yyyy-MM-dd');
      let toDate = this.datePipe.transform(form.toDate, 'yyyy-MM-dd');
      console.log(this.salaryForm.value.quantities)
      let grade = []
    form.grade?.forEach(element => {
      let value = {'grades':element}
     
        grade.push(value)
    });
    let category = []
  form.category?.forEach(element => {
    let value = {'category':element}
    category.push(value)
  });
  let state = []
  form.state?.forEach(element => {
    let value = {'state':element}
    state.push(value)
  });
  let branch = []
  form.branch?.forEach(element => {
    let value = {'branchName':element}
    branch.push(value)
  });
 
     let data = {
    
    year: form.year,
    month: form.month,
    states: state,
    branchs: branch,
    categorys: category,
    grades: grade,
    fullPresentAllowanceName: form.name,
    amount: form.amount,
    toDate: toDate,
    fromDate: fromDate
     }
       console.log(data)
       this._service.add(data,'updateSalaryCalenderManualMaster/'+`${this.editPlanId}`).subscribe((res)=>{
       if (res.respose == "Success"){
        Swal.fire({
          
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
         
        })
        this.cancelForm()
        this.showMyContainer=false
        this.salaryForm.reset();
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
      this.salaryForm.markAllAsTouched();
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        
      })
      return
     }
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
let url = "deleteSalaryCalenderManualMaster"
this._service.delete(id, url).subscribe((res)=>{
  if (res.respose == "Success"){
     Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        const currentRoute = this.router.url;

        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([currentRoute]); // navigate to same route
        }); 
  }
  else{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong! Try again',
      
    })
  }
})
       
      }
    })

  }
  showContainer(){
    this.showMyContainer=true;
  }
  hideContainer(){
    this.showMyContainer=false;
  }
}
