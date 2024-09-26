import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IMultiSelectOption } from 'ngx-bootstrap-multiselect';
import Swal from 'sweetalert2';
import { AllModulesService } from '../../all-modules.service';
 
@Component({
  selector: 'app-reimbersment-expense-form',
  templateUrl: './reimbersment-expense-form.component.html',
  styleUrls: ['./reimbersment-expense-form.component.css']
})
export class ReimbersmentExpenseFormComponent implements OnInit {
  branch: any;
  binding:false;
  categories: any;
  departments: any;
  stateList: any;
  // gradeArrray = [];
  cityList: any;
  reimberseExpenseForm: FormGroup
  editId: any;
  datePipe = new DatePipe('en-US');
  myDate = new Date();
  myOptions: IMultiSelectOption[];
  // grade: any;
  constructor(
    public _service:AllModulesService,
    public _fb : FormBuilder,
    public _activatedroute: ActivatedRoute,
    public router: Router,
    
  ) { }

  ngOnInit(): void {
    const routeParam = this._activatedroute.snapshot.params;
    this.editId = routeParam.id;
    this.myOptions = [
      { name: 'G1', id: 'G1',  },
      { name: 'G2', id: 'G2' },
      
    ];
    this.getBranch();
    this.getState();
    this.getCategories();
    this.department();
    // this.getGrade();
    this.getCity();
    this.edit();
 this.reimberseExpenseForm = this._fb.group({
  state:['',Validators.required],
  branch:['',Validators.required],
  department:['',Validators.required],
  // grade:['',Validators.required],
  city:['',Validators.required],
  name:['',Validators.required],
  effectiveDate:['',Validators.required],
  limited:'',
  description:'',
  status:'',
  perPersonLimit:''
 })

  }

  getBranch(){

    this._service.get('branch/getBranchList')
    .subscribe((res)=>{
    
    this.branch = res
    
    })
    
    }
  getCategories(){
    this._service.get('categories/getCategories').subscribe((res)=>{
      this.categories=res
    })
  }
  department(){
    this._service.get('getAllDepartment').subscribe((res)=>{
      this.departments=res
    })
  }
  getState(){

    this._service.get('state/getStateList')
    .subscribe((res)=>{
    
    // console.log(res )
    this.stateList = res
    
    })
    
    }
    // getGrade(){
    //   this._service.get('getgetCodeByType?type=grade').subscribe((res)=>{
    //     this.grade = res
    //   })
    // }
    getCity(){
      this._service.get('city/getCityList').subscribe((res)=>{
  
        this.cityList = res
    })
  }
  showTable(){
    this.router.navigate(['/layout/payroll/ReimbExpenseMaster'])
  }
  cancel(){
    this.router.navigate(['/layout/payroll/ReimbExpenseMaster'])
  }
  submit(){
    let forms = this.reimberseExpenseForm.value
    
   
    let effectiveDate = this.datePipe.transform(forms.effectiveDate, 'yyyy-MM-dd');
   let date = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    if(this.reimberseExpenseForm.status=="VALID"){
    //   forms.grade.forEach(element => {
    // console.log(element)
    //   this.gradeArrray.push({grade:element})
       
    //   });
      let data = {
        effectiveDate: effectiveDate,
        branch: forms.branch,
        state: forms.state,
        department: forms.department,
        city: forms.city,
        expenseName: forms.name,
        description: forms.description,
        limited: forms.limited,
        status: forms.status,
        perPersonLimit: forms.perPersonLimit,
        createDate: date,
        // reimbusementGrade: this.gradeArrray
      }
      this._service.add(data, 'addReimbusementExpenseMaster').subscribe((res)=>{
        console.log(res)
        if(res.respose=="Success"){
          Swal.fire({
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigate(["/layout/payroll/ReimbExpenseMaster"])
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
      this.reimberseExpenseForm.markAllAsTouched();
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        
      })
    }
  }
  onChange(s) {
    // console.log(this.optionsModel);
}
edit(){
  console.log(this.editId)
  if (this.editId=='add'){
return;
  }
  else{
this._service.get('getReimbusementExpenseMaster/'+this.editId).subscribe((res)=>{
  console.log(res)
let effectiveDate = this.datePipe.transform(res.effectiveDate, 'dd-MM-yyyy');

  this.reimberseExpenseForm.get('branch').setValue(res.branch)
  this.reimberseExpenseForm.get('city').setValue(res.city)
  this.reimberseExpenseForm.get('department').setValue(res.department)
  this.reimberseExpenseForm.get('name').setValue(res.expenseName)
  this.reimberseExpenseForm.get('limited').setValue(res.limited)
  this.reimberseExpenseForm.get('perPersonLimit').setValue(res.perPersonLimit)
  this.reimberseExpenseForm.get('state').setValue(res.state)
  this.reimberseExpenseForm.get('status').setValue(res.status)
  this.reimberseExpenseForm.get('effectiveDate').setValue(effectiveDate)
  this.reimberseExpenseForm.get('description').setValue(res.description)
  let grade = [];
// res.reimbusementGrade.forEach(element => {
//   console.log(element.grade)

// grade.push(element.grade)

 
// });
// this.reimberseExpenseForm.get('grade').setValue(grade)
})
  }
}
update(){
  let forms = this.reimberseExpenseForm.value
    
   
  let effectiveDate = this.datePipe.transform(forms.effectiveDate, 'yyyy-MM-dd');
 let date = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
  if(this.reimberseExpenseForm.status=="VALID"){
  //   forms.grade.forEach(element => {
  // console.log(element)
  //   this.gradeArrray.push({grade:element})
     
  //   });
    let data = {
      effectiveDate: effectiveDate,
      branch: forms.branch,
      state: forms.state,
      department: forms.department,
      city: forms.city,
      expenseName: forms.name,
      description: forms.description,
      limited: forms.limited,
      status: forms.status,
      perPersonLimit: forms.perPersonLimit,
      createDate: date,
      // reimbusementGrade: this.gradeArrray
    }
    this._service.add(data, 'updateReimbusementExpenseMaster/'+this.editId).subscribe((res)=>{
      console.log(res)
      if(res.respose=="Success"){
        Swal.fire({
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(["/layout/payroll/ReimbExpenseMaster"])
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
    this.reimberseExpenseForm.markAllAsTouched();
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      
    })
  }
}
}