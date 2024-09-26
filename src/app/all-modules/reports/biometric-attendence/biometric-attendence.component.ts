import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { AllModulesService } from '../../all-modules.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { BsDaterangepickerDirective } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-biometric-attendence',
  templateUrl: './biometric-attendence.component.html',
  styleUrls: ['./biometric-attendence.component.css']
})
export class BiometricAttendenceComponent implements OnInit {
  filterForm:FormGroup
  branch: any;
  state: any;
  category: any;
  department: any;
  employees: any;
  data: any;
  dtOptions: { pagingType: string; pageLength: number; processing: boolean; dom: string; buttons: string[]; };
  companyName: string;
  address: string;
  fromd: string;
  tod: string;
  imageName: string;
  array: any=[];
  employee1: any;
  selected: string;
  branchName: any;
  branchId: any;

  constructor(public fb:FormBuilder,public service:AllModulesService,private datePipe: DatePipe) { }
  
  ngOnInit(): void {
    this.branchId=localStorage.getItem('branchId')
    this.filterForm=this.fb.group({
      employeeId:[''],
      fromDate:['',Validators.required],
      toDate:['',Validators.required],
      state:['',],
      category:[''],
      subCategory:[''],
      department:[''],
      branch:[''],
      status:['']
    })

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'Bfrtip',
      buttons: [
            'copy', 'csv', 'excel', 'print'
        ]
    };
    this.getBranch();
    this.getCategories();
    this.getDepartment();
    this.getState();
    this.getEmployee();
    this.getCompanyDetails();
  }
getBranch(){
  let url="branch/getBranchList"
  this.service.get(url).subscribe((res)=>{
  this.branch=res
  if(this.branchId!=0){
  let result=this.branch.filter((bran:any)=>
  bran.id==this.branchId)
  if(result.length!=0){
  this.branchName=result[0].branchName
  console.log(this.branchName)
  }
  }
  })

}

getState(){
  let url='state/getStateList'
  this.service.get(url).subscribe((res)=>{
  this.state=res
  })
}
getCategories(){
  this.service.get('categories/getCategories').subscribe((res)=>{
  this.category=res
  })
}

getDepartment(){
  let url='getAllDepartment'
  this.service.get(url).subscribe(res=>{
  this.department=res
  })
}

getEmployee(){
  this.service.get('employee_master/getemployees').subscribe((res)=>{
  this.employees=res
  })
}
search(){
  let branchStatus=localStorage.getItem('branchStatus')
  let branchId=localStorage.getItem('branchId')
  this.companyName=localStorage.getItem('companyName')
  this.address=localStorage.getItem('address')
  let form=this.filterForm.value
  let fromd=this.datePipe.transform(form.fromDate, "yyyy-MM-dd")
  let tod=this.datePipe.transform(form.toDate, "yyyy-MM-dd")
  this.fromd=this.datePipe.transform(form.fromDate, "dd/MM/yyyy")
  this.tod=this.datePipe.transform(form.fromDate, "dd/MM/yyyy")
  console.log(this.filterForm)
  if(this.filterForm.status=='VALID'){
    if(form.employeeId && branchStatus==='true' && form.branch==''){
       let emp=this.filterForm.value.employeeId.split(" ");
       let emply=this.employees.filter((emply)=>
       (emply.employeeCode == emp[0]))
       console.log(emply)
       let url='BiometricAttendanceDetailsRepor?fromDate='+fromd+'&toDate='+tod+'&state='+form.state+'&category='+form.category+'&status='+form.status+'&employeeId='+emply[0].employeeId+'&department='+form.department+'&branch='+branchId
       this.service.get(url).subscribe((res)=>{
       this.data=res
       })
    }
    else if(form.employeeId && branchStatus==='true' &&  this.filterForm.get('branch')?.value != ''){
       let emp=this.filterForm.value.employeeId.split(" ");
       let emply=this.employees.filter((emply)=>
       (emply.employeeCode == emp[0]))
       console.log(emply)
       let url='BiometricAttendanceDetailsRepor?fromDate='+fromd+'&toDate='+tod+'&state='+form.state+'&category='+form.category+'&status='+form.status+'&employeeId='+emply[0].employeeId+'&department='+form.department+'&branch='+form.branch
       this.service.get(url).subscribe((res)=>{
       this.data=res
       })
    }
    else if(form.employeeId && branchStatus==='false' ){
       let emp=this.filterForm.value.employeeId.split(" ");
       let emply=this.employees.filter((emply)=>
       (emply.employeeCode == emp[0]))
       console.log(emply)
       let url='BiometricAttendanceDetailsRepor?fromDate='+fromd+'&toDate='+tod+'&state='+form.state+'&category='+form.category+'&status='+form.status+'&employeeId='+emply[0].employeeId+'&department='+form.department+'&branch='+form.branch
       this.service.get(url).subscribe((res)=>{
       this.data=res
       })
    }
    else if(form.employeeId==undefined && branchStatus=='true' && form.branch!='' ){
       let url='BiometricAttendanceDetailsRepor?fromDate='+fromd+'&toDate='+tod+'&state='+form.state+'&category='+form.category+'&status='+form.status+'&employeeId='+''+'&department='+form.department+'&branch='+form.branch
       this.service.get(url).subscribe((res)=>{
       this.data=res
      })
    }
    else if(form.employeeId==undefined && branchStatus=='true' && form.branch=='' ){
       let url='BiometricAttendanceDetailsRepor?fromDate='+fromd+'&toDate='+tod+'&state='+form.state+'&category='+form.category+'&status='+form.status+'&employeeId='+''+'&department='+form.department+'&branch='+branchId
       this.service.get(url).subscribe((res)=>{
       this.data=res
      })
    }
    else{
       let url='BiometricAttendanceDetailsRepor?fromDate='+fromd+'&toDate='+tod+'&state='+form.state+'&category='+form.category+'&status='+form.status+'&employeeId='+''+'&department='+form.department+'&branch='+form.branch
       this.service.get(url).subscribe((res)=>{
       this.data=res
      })
    }
  }
  else{
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: "Something went wrong",
    })
  }
}
getCompanyDetails(){
  let url="getAllCompanyInformationList"
  this.service.get(url).subscribe((res)=>{
    console.log(res)
    this.imageName=res[0].backImageName+""+res[0].logoImageName
    console.log(this.imageName)
  })
}

onChange(event){
  console.log(event.target.value)
  let id=event.target.value
  let url='getAllDepartmentBybranchId/'+id
  this.service.get(url).subscribe((res)=>{
  this.department=res
  })
}
getEmpList(event){
  console.log(event)
  this.array.push(event)
  console.log(this.array)
  let form=this.filterForm.value
  if(this.array.length >=2){
    let data=form.employeeId.toLowerCase()
    let url='employees/search?employeeName='+`${data}`
    this.service.get(url).subscribe((res)=>{
    this.employee1=res.data
    })
  }
}

displayEmp(data,name,last){
console.log(data,name,last)
this.selected=[data] +" "+ name +" "+ last; 

}
}
