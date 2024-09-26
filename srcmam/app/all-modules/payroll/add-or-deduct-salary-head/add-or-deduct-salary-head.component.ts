import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators  } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { AllModulesService } from '../../all-modules.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { IMultiSelectOption } from 'ngx-bootstrap-multiselect';

@Component({
  selector: 'app-add-or-deduct-salary-head',
  templateUrl: './add-or-deduct-salary-head.component.html',
  styleUrls: ['./add-or-deduct-salary-head.component.css']
})
export class AddOrDeductSalaryHeadComponent implements OnInit {
  addOrdeductForm:FormGroup
  showMyContainer:boolean=false;
 
  isDisabled:boolean=false;
  year = ["2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025"]
  months = [  { id: 'january', name: 'January' },
  { id: 'february', name: 'February' },
  { id: 'march', name: 'March ' },
  { id: 'april', name: 'April' },
  { id: 'may', name: 'May' },
  { id: 'june', name: 'June' },
  { id: 'july', name: 'July' },
  { id: 'august', name: 'August' },
  { id: 'september', name: 'September' },
  { id: 'october', name: 'October' },
  { id: 'november', name: 'November' },
  { id: 'december', name: 'December' },
]
  dtOptions: { pagingType: string; pageLength: number; processing: boolean; dom: string; buttons: string[]; };
  data: any=[];
  editId: any;
  employee: IMultiSelectOption[];
  salaryHead: any;



  constructor(public fb:FormBuilder,public service:AllModulesService,public router:Router,public datePipe:DatePipe) { }

  ngOnInit(): void {
    this.addOrdeductForm=this.fb.group({
      "employee":['',Validators.required],
      "addOrDeduct":['',Validators.required],
      "element":['',Validators.required],
      "amount":['',Validators.required],
      "month":[''],
      "year":['',Validators.required],
      "lockDate":[''],
      "expiryDate":[''],
      "repeat":[''],
      
    
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

   
    this.getEmployee()
    this.getAll()
    this.getSalaryHaed()
  }
  
  getSalaryHaed(){
    this.service.get('getgetCodeByType?type=Salary Heads').subscribe((res)=>{
    this.salaryHead = res
    })
  }

  getEmployee(){
    let employee=[];
    let url="employee_master/getemployees"
    this.service.get(url).subscribe((res)=>{
      this.employee=res
      // res.forEach(element => {
         
      //   let emp={id:element.employeeCode, name:element.firstName}
      //   employee.push(emp)
       
      //   this.employee = employee
        
      // });
    })
  }

  showContainer(){
    this.showMyContainer=true
    
    }
    hideContainer(){
     
    this.showMyContainer=false
    this.cancel()
    
    }

  submit(){
    let form=this.addOrdeductForm.value
    console.log(this.addOrdeductForm)
    let url='insertManualAdditionDeductionSalaryHeads'

    let data={
      "headName":form.element,
      "additionDeduction": form.addOrDeduct,
      "headAmount": form.amount,
      "month": form.month,
      "year": form.year,
      "lockDate":form.lockDate,
      "repeatPerMonth":form.repeat,
      "expiredate":form.expiryDate,
      "employeeIds":form.employee
    }
    console.log(this.addOrdeductForm.status)
    if(this.addOrdeductForm.status=='VALID'){
    this.service.add(data,url).subscribe((res)=>{
    console.log(res)
    if(res.respose=='Success')
    {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: res.message,
       
      })
      
      this.addOrdeductForm.reset();
      this.hideContainer();
     
    }
    else if(res.respose=='Already')
    {
      Swal.fire({
        icon: 'warning',
        title: 'Oops',
        text: res.message,
       
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
  }
}

cancel(){
  const currentRoute = this.router.url;

  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]); 
  }); 
}


edit(id){
  this.editId=id
  this.showMyContainer=true
  let url='getManualAdditionDeductionSalaryHeads/'+id
  this.service.get(url).subscribe((res)=>{
    console.log(res)
    let exp=this.datePipe.transform(res.expiredate,'YYYY-MM-dd')
    let lock=this.datePipe.transform(res.lockDate,'YYYY-MM-dd')
this.addOrdeductForm.get('employee').setValue(res.employeeId)
this.addOrdeductForm.get('addOrDeduct').setValue(res.additionDeduction)
this.addOrdeductForm.get('element').setValue(res.headName)
this.addOrdeductForm.get('amount').setValue(res.headAmount)
this.addOrdeductForm.get('year').setValue(res.year)
this.addOrdeductForm.get('month').setValue(res.month)
this.addOrdeductForm.get('expiryDate').setValue(exp)
this.addOrdeductForm.get('lockDate').setValue(lock)
this.addOrdeductForm.get('repeat').setValue(res.repeatPerMonth)
})
} 
getAll(){
  let url='getAllManualAdditionDeductionSalaryHeadsList'
  this.service.get(url).subscribe((res)=>{
    this.data=res
  })
}
delete(id){
  Swal.fire({
    title:"Are you really want delete..?",
    showCancelButton:true,
    confirmButtonColor: '#3085d6',
     cancelButtonColor: '#d33',
     confirmButtonText: 'Yes'
  }).then(result=>{
    console.log(result);
    if(result.isConfirmed==true)
    {
  let url='deleteManualAdditionDeductionSalaryHeads/'+id
  this.service.get(url).subscribe((res)=>{
    if(res.respose=='Success')
    {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: res.message,
       
      })
      
      this.getAll();
     
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
this.getAll();
}
    
  })
}
update(id){
 let form=this.addOrdeductForm.value
let url='updateManualAdditionDeductionSalaryHeads/'+id
let data={
  "headName":form.element,
  "additionDeduction": form.addOrDeduct,
  "headAmount": form.amount,
  "month": form.month,
  "year": form.year,
  "lockDate":form.lockDate,
  "repeatPerMonth":form.repeat,
  "expiredate":form.expiryDate,
  "employeeId":form.employee
}
console.log(data)
if(this.addOrdeductForm.status=='VALID'){
this.service.add( data,url).subscribe((res)=>{
  if(res.respose=='Success')
  {
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: res.message,
     
    })
    
    this.showMyContainer=false
  }
  else if(res.respose=='Already')
  {
    Swal.fire({
      icon: 'warning',
      title: 'Oops',
      text: res.message,
     
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
}
}
check(event){
  console.log(event.target.checked)
}
}
  
