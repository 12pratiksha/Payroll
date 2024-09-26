import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { AllModulesService } from '../../all-modules.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

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



  

  constructor(public fb:FormBuilder,public service:AllModulesService,private datePipe: DatePipe) { }

  
  
  ngOnInit(): void {
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
  this.companyName=localStorage.getItem('companyName')
  this.address=localStorage.getItem('address')
  let form=this.filterForm.value
  let fromd=this.datePipe.transform(form.fromDate, "yyyy-MM-dd")
  let tod=this.datePipe.transform(form.toDate, "yyyy-MM-dd")
  this.fromd=this.datePipe.transform(form.fromDate, "dd/MM/yyyy")
  this.tod=this.datePipe.transform(form.fromDate, "dd/MM/yyyy")
  if(this.filterForm.status=='VALID'){
  let url='BiometricAttendanceDetailsRepor?fromDate='+fromd+'&toDate='+tod+'&state='+form.state+'&category='+form.category+'&status='+form.status+'&employeeId='+form.employeeId+'&department='+form.department+'&branch='+form.branch
  this.service.get(url).subscribe((res)=>{
    this.data=res

  })
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
    
    // res.forEach(element => {
      this.imageName=res[0].backImageName+""+res[0].logoImageName
      // result[0].backImageName+""+result[0].logoImageName;
    // });
    
    console.log(this.imageName)
  })
}
}
