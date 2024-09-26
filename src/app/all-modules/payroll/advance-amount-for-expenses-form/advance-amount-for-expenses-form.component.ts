import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AllModulesService } from '../../all-modules.service';

@Component({
  selector: 'app-advance-amount-for-expenses-form',
  templateUrl: './advance-amount-for-expenses-form.component.html',
  styleUrls: ['./advance-amount-for-expenses-form.component.css']
})
export class AdvanceAmountForExpensesFormComponent implements OnInit {
  advanceAmountForm:FormGroup;
  branch: any;
  categories: any;
  departments: any;
  stateList: any;
  gradeArrray = [];
  cityList: any;
  editId: any;
  datePipe = new DatePipe('en-US');
  myDate = new Date();
  employees: any;
  constructor(
    public _service:AllModulesService,
    public _fb : FormBuilder,
    public _activatedroute: ActivatedRoute,
    public router: Router,
  ) { }

  ngOnInit(): void {
    const routeParam = this._activatedroute.snapshot.params;
    this.editId = routeParam.id;
    this.getBranch();
    this.getState();
    this.getCategories();
    this.department();
    this.getCity();
    this.loadEmployee();
  this.advanceAmountForm = this._fb.group({
    empId:['',Validators.required],
    companions:'',
    fromDate:['',Validators.required],
    toDate:['',Validators.required],
    amount:['',Validators.required],
    destination:['',Validators.required],
    purposeOfVisit:[''],
    description:['',Validators.required],
    status:''
  })
  }
  showTable(){
this.router.navigate(['/layout/payroll/advanceAmountExpenses'])
  }
  loadEmployee() {
    
    this._service.get("employee_master/getemployees").subscribe((data) => {
        this.employees = data;
    });

    }

    cancel(){
      
    }

  submit(){
    let forms = this.advanceAmountForm.value
    
   
    let fromDate = this.datePipe.transform(forms.fromDate, 'yyyy-MM-dd');
    let toDate = this.datePipe.transform(forms.toDate, 'yyyy-MM-dd');
  
    if(this.advanceAmountForm.status=="VALID"){
    
      let data = {
        destination:forms.destination,

        description: forms.description,
        
        purposeofVisit:forms.purposeOfVisit,
          
          status:forms.status,
        
          
          employeeId:forms.empId,
          
          travelCompanions: forms.companions,
          
          amount: forms.amount,
          
          fromDate:fromDate,
          
          toDate:toDate
          
        
      }
      this._service.add(data, 'addAdvanceAmountForExpensesMaster').subscribe((res)=>{
        console.log(res)
        if(res.respose=="Success"){
          Swal.fire({
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigate(["/layout/payroll/advanceAmountExpenses"])
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
      this.advanceAmountForm.markAllAsTouched();
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        
      })
    }
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

  getCity(){
    this._service.get('city/getCityList').subscribe((res)=>{

      this.cityList = res
  })
}
}
