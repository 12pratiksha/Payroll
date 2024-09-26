import { data } from 'jquery';
import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { AllModulesService } from '../../all-modules.service';
import {SelectionModel} from '@angular/cdk/collections';
import { style } from '@angular/animations';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as xlsx from 'xlsx';
@Component({
  selector: 'app-monthlyattendence11',
  templateUrl: './monthlyattendence11.component.html',
  styleUrls: ['./monthlyattendence11.component.css']
})
export class Monthlyattendence11Component implements OnInit {
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  earlyHistory: any;
  loader = true
  displayedColumns:any;
  dataSource = new MatTableDataSource();

  dtOptions: { pagingType: string; pageLength: number; processing: boolean; dom: string; };
  form:FormGroup
  month = [ "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December" ];
  years = [ 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030]
  columnsDataObj1:any;
  employees: any=[];
  td: any=[];
  info: any;
  allowance: any=[];
  allowance1: any=[];
  allowanceData1:any=[];
  branch: any;
  categories: any;
  departments: any;
  employee=[];
  type: number;
  subDepartments: any;
  designations: any;
  grade: any;
  shiftTable: any;
  stateData: any;
  payrollForm:FormGroup
  employeeslist:any;
  employee_display: any=[];
  array: any=[];
  employee1: any;
  selected: any;
  usedLeave: any=[];
  leaves: any=[];
  constructor( private fb:FormBuilder, public _service:AllModulesService,private http: HttpClient) { }

  ngOnInit():void{
    this.getAllShifts();
this.getState();
this.getBranchList();
this.getCategories();
this.getDepartment();

this.getAllEmployee();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
     
      processing: true,
      dom: 'Bfrtip',
     
    //     buttons: [
    // 'copy', 'csv', 'excel', 'print'
    //   ]
      
    }
    this.payrollForm=this.fb.group({
 
      state:'',
      branch:'',
      category:'',
      department:'',
      subDepartment:'',
      designation:'',
      searchBy:'',
      grade:'', 
      status:'1',
      id:'',
      name:'',
      year:['',Validators.required],
      month:['',Validators.required],
    })
    var date = new Date();
    let year = new Date().getFullYear();
    let month = new Date().getMonth();
    this.form = this.fb.group({
    year: [date.getFullYear(), Validators.required],
    month:[this.month[month],Validators.required]
    });

   


this._service.get('subDepartment/getSubDepartments').subscribe((res)=>{
  this.subDepartments=res
    })
    this._service.get('getAllDesignationMaster').subscribe((data) => {
      this.designations = data;
      
    });
    this._service.get('getgetCodeByType?type=grade').subscribe((res)=>{
      this.grade = res
    })
   
  }
  getAllShifts(){

    this._service.get('shifts/getAllShift').subscribe((res)=>{
    
    this.shiftTable = res
    },(error)=>{
      alert("Something Went Wrong")
    })
    
    }
    getState(){

      this._service.get( "state/getStateList").subscribe((data) => {
        this.stateData = data;
        // console.log(data);
      });
  
    }
    getBranchList(){
  
  
      this._service.get('branch/getBranchList')
      .subscribe((res)=>{
      
      
      this.branch = res
      // console.log(this.branch)
      
      })
      
    }
  
    getCategories(){
  
      this._service.get('categories/getCategories').subscribe((res)=>{
        this.categories=res
      })
      
    }
    getDepartment(){
      this._service.get('getAllDepartment').subscribe((res)=>{
      this.departments = res
      })
    }
    // getAllEmployee(){
    //   this._service.get("employee_master/getemployees").subscribe((data) => {
    //     this.employeeslist = data;
        
        
    //   });
    // }

    userType:any;
  
  async getAllEmployee(){
    
    this.userType=localStorage.getItem('type')
  if(this.userType=='Admin' || this.userType=='Super Admin'){
    this._service.get('employee_master/getemployees').subscribe((res)=>{
      this.employeeslist=res
    })
  }else{
    this.employees=[];
        this.employeeslist=[];
        let id = localStorage.getItem('empid')
        let url = "employee_master/getemployee/" + id;
        await this._service.get(url).subscribe((res) => {
         if(res){
          this.employeeslist.push({"employeeId":res.employeeId,"employeeCode":res.employeeCode,"firstName":res.firstName,"lastName":res.lastName});
         }
        });
  
    }
  }
  exportToExcel(){
    // const arr = [
    //  [{RevisedSumInsured:'', RepairType: '',IndictiveRenewalPremium:'',CustCode:''}],
    // ];
   
   // const sheetName = ["sheet1"];
     const ws: xlsx.WorkSheet =  xlsx.utils.table_to_sheet(this.epltable.nativeElement);
     const wb: xlsx.WorkBook = xlsx.utils.book_new();
     xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    //  for (var i = 0; i < sheetName.length; i++) {
    //    const ws: xlsx.WorkSheet = xlsx.utils.json_to_sheet(arr[i]);
    //    xlsx.utils.book_append_sheet(wb, ws, sheetName[i]);
    //  }
     // ws['!cols'][11] = { hidden: false};
     
     xlsx.writeFile(wb, 'salarySheet.xlsx');
   }
   downloadAsPDF(sectionToPrint){
    const printContents = document.getElementById(sectionToPrint).innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print()
    document.body.innerHTML = originalContents;
  }
  test(){
    
   this.getEmployees();
  
  }
  arrylen:any;
  maxval:any;
  mycol:any;
  myindex:any;
  allelemnets:any;
  allelemnets1:any;
  tableLen:any;
  getEmployees(){
    let branchStatus=localStorage.getItem('branchStatus')
    let branchId=localStorage.getItem('branchId')
    console.log("branchStatus==========>"+branchStatus)
    let pf=this.payrollForm.value 
    console.log(pf)
    this.arrylen=[];
    this.myindex=0;
    this.mycol=[];
    let d=this.payrollForm.value
    let data={
      month:d.month,
      year: d.year,
    }
    let params = new HttpParams();

    params = params.append('year', d.year);
    params = params.append('month', d.month);

    this.allelemnets=[];
    this.allelemnets1=[];
    this.displayedColumns=['Employee Code','Name','EPF NO','DEPARTMENT','DESIGNATION'];

    let flag=0;
    this.userType=localStorage.getItem('type')
  if(this.userType!='Admin'){
    if(pf.searchBy==""){
      flag=1;
      Swal.fire({
        icon: 'warning',
        title: 'Please Select Employee Code',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  if(pf.year=="" || pf.month==""){
    flag=1;
    Swal.fire({
      icon: 'warning',
      title: 'Please Select Valid Month and Year',
      showConfirmButton: false,
      timer: 1500
    })

  }
   if(flag==0)
   {
    Swal.fire({
      title: 'Loading...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading()
      }
    });
    let url
if(this.userType=='Admin'){
  console.log(this.payrollForm)
  if(this.payrollForm.value.searchBy && branchStatus=='true' && pf.branch==""){
  let emp=this.payrollForm.value.searchBy.split(" ");
  let emply=this.employeeslist.filter((emply)=>
  (emply.employeeCode == emp[0]))
  console.log(emply)
  url = "getSalarySlips?usertype="+this.userType+"&year="+pf.year+"&month="+pf.month+"&state="+pf.state+"&category="+pf.category+"&subCategory="+"&status="+pf.status+"&employeeId="+emply[0].employeeId+"&department="+pf.department+"&subDepartment="+pf.subDepartment+"&branch="+branchId+"&grade="+pf.grade+"&designation="+pf.designation
}
else if(this.payrollForm.value.searchBy && branchStatus=='true' && pf.branch!=""){
  let emp=this.payrollForm.value.searchBy.split(" ");
  let emply=this.employeeslist.filter((emply)=>
  (emply.employeeCode == emp[0]))
  console.log(emply)
  url = "getSalarySlips?usertype="+this.userType+"&year="+pf.year+"&month="+pf.month+"&state="+pf.state+"&category="+pf.category+"&subCategory="+"&status="+pf.status+"&employeeId="+emply[0].employeeId+"&department="+pf.department+"&subDepartment="+pf.subDepartment+"&branch="+pf.branch+"&grade="+pf.grade+"&designation="+pf.designation
}
else if(this.payrollForm.value.searchBy && branchStatus==undefined && pf.branch!=""){
  let emp=this.payrollForm.value.searchBy.split(" ");
  let emply=this.employeeslist.filter((emply)=>
  (emply.employeeCode == emp[0]))
  console.log(emply)
  url = "getSalarySlips?usertype="+this.userType+"&year="+pf.year+"&month="+pf.month+"&state="+pf.state+"&category="+pf.category+"&subCategory="+"&status="+pf.status+"&employeeId="+emply[0].employeeId+"&department="+pf.department+"&subDepartment="+pf.subDepartment+"&branch="+pf.branch+"&grade="+pf.grade+"&designation="+pf.designation
}
else if(this.payrollForm.value.searchBy && branchStatus==undefined && pf.branch==""){
  let emp=this.payrollForm.value.searchBy.split(" ");
  let emply=this.employeeslist.filter((emply)=>
  (emply.employeeCode == emp[0]))
  console.log(emply)
  url = "getSalarySlips?usertype="+this.userType+"&year="+pf.year+"&month="+pf.month+"&state="+pf.state+"&category="+pf.category+"&subCategory="+"&status="+pf.status+"&employeeId="+emply[0].employeeId+"&department="+pf.department+"&subDepartment="+pf.subDepartment+"&branch="+branchId+"&grade="+pf.grade+"&designation="+pf.designation
}
else{
  url = "getSalarySlips?usertype="+this.userType+"&year="+pf.year+"&month="+pf.month+"&state="+pf.state+"&category="+pf.category+"&subCategory="+"&status="+pf.status+"&employeeId="+''+"&department="+pf.department+"&subDepartment="+pf.subDepartment+"&branch="+pf.branch+"&grade="+pf.grade+"&designation="+pf.designation
}
}
else{
  if(branchStatus=='true' && pf.branch==""){
     url = "getSalarySlips?usertype="+this.userType+"&year="+pf.year+"&month="+pf.month+"&state="+pf.state+"&category="+pf.category+"&subCategory="+"&status="+pf.status+"&employeeId="+''+"&department="+pf.department+"&subDepartment="+pf.subDepartment+"&branch="+branchId+"&grade="+pf.grade+"&designation="+pf.designation
  }
  else if(branchStatus=='true' && pf.branch!=""){
    url = "getSalarySlips?usertype="+this.userType+"&year="+pf.year+"&month="+pf.month+"&state="+pf.state+"&category="+pf.category+"&subCategory="+"&status="+pf.status+"&employeeId="+''+"&department="+pf.department+"&subDepartment="+pf.subDepartment+"&branch="+pf.branch+"&grade="+pf.grade+"&designation="+pf.designation
 }
 else {
  url = "getSalarySlips?usertype="+this.userType+"&year="+pf.year+"&month="+pf.month+"&state="+pf.state+"&category="+pf.category+"&subCategory="+"&status="+pf.status+"&employeeId="+pf.searchBy+"&department="+pf.department+"&subDepartment="+pf.subDepartment+"&branch="+pf.branch+"&grade="+pf.grade+"&designation="+pf.designation
 }
   }

    this._service.get(url).subscribe((data) => {
      if(data.length==0){
        Swal.fire({
          icon: 'warning',
          title: 'There is no records are available',
          showConfirmButton: false,
          timer: 1500,
          didOpen: () => {
            Swal.hideLoading()
          }
        })
      }
      else{

        Swal.fire({
          icon: 'success',
          title: '',
          showConfirmButton: false,
          timer: 1500,
          didOpen: () => {
            Swal.hideLoading()
          }
        })

        let resp=data.data
        this.employee_display=[];
        resp.forEach(element => {
          console.log(element)
          let department=element.department
          let designatiom=element.designation
          let branch=element.branch

          let result2 =this.branch.filter((dept: any) =>
            (dept.id==branch) )
            console.log(result2);
            let bran="";
            if(result2.length>0){
              bran=result2[0].branchName;
            }

            let result1 =this.departments.filter((dept: any) =>
            (dept.departmentId==department) )

            console.log(result1);
            let dep="";
            if(result1.length>0){
              dep=result1[0].departmentName;
            }
          
            let resultdesg =this.designations.filter((desg: any) =>
            (desg.designationMasterId==designatiom) )
            this.employee_display.push({"employeeCode":element.employeeCode,"epfno":element.epfno,"uan":element.uan,"panNo":element.panNo,"eaccountNo":element.eaccountNo,"firstName":element.firstName,"middleName":element.middleName,"lastName":element.lastName,"department":dep,"designation":resultdesg[0].name,"days":element.days,"prsent":element.prsent,"allowances":element.allowances,"pf":element.pf,"pt":element.pt,"deduction":element.deduction,"addition":element.addition,"netSalary":element.netSalary,"ifscCode":element.ifscCode,"usedLeave":element.leaveGetCurrentMonth,'branch':bran})
        });

      this.employees = this.employee_display
      this.tableLen = this.employee_display.length
      this.employees.forEach(element=>{
        console.log(element)
        this.allowance.push(element.allowances)
        this.usedLeave.push(element.usedLeave)
      })
      this.allelemnets=[];
      this.allelemnets1=[];
      this.leaves=[];
      
      this.allowance.forEach(element1 => {
         this.allowance1.push(element1)
       
        for(let i=0;i<element1.length;i++){
          if(this.allelemnets.find(e => e.elementName == element1[i].elementName)){
          }else{
           
            if(element1[i].additionDeduction.indexOf("Addition")>-1){

            this.allelemnets.push({elementName:element1[i].elementName ,elementtype:element1[i].additionDeduction });
            this.displayedColumns.push(element1[i].elementName);
            }
            //console.log(this.allelemnets)
          }
        }
        
       
        for(let j=0;j<element1.length;j++){
          if(this.allelemnets1.find(e => e.elementName == element1[j].elementName)){
          }else{
         
            if(element1[j].additionDeduction.indexOf("Deduction")>-1){
              console.log(element1[j].elementName)
            this.allelemnets1.push({elementName:element1[j].elementName ,elementtype:element1[j].additionDeduction });
            this.displayedColumns.push(element1[j].elementName);
            }
            console.log(this.allelemnets1)
          }
        }


        
        

        console.log(this.allelemnets1 );
       });
       this.usedLeave.forEach(element2=>{
        console.log(element2);
        for(let k=0;k<element2.length;k++){
          if(this.leaves.find(e => e.leaveType == element2[k].leaveType)){
          }else{
           
            // if(element2[k].additionDeduction.indexOf("Addition")>-1){

            this.leaves.push({leaveType:element2[k].leaveType ,mainbalance:element2[k].mainbalance });
            this.displayedColumns.push(element2[k].leaveType);
            // }
            //console.log(this.allelemnets)
          }
        }
       })

       this.displayedColumns.push("NET SALARY")
      }
    
  })
  }
   
  }
    

  getEmpList(event){
    console.log(event)
    this.array.push(event)
    console.log(this.array)
    let form=this.payrollForm.value
    if(this.array.length >=2){
      let data=form.searchBy.toLowerCase()
      let url='employees/search?employeeName='+`${data}`
      this._service.get(url).subscribe((res)=>{
      this.employee1=res.data
    })
  }
  }
  
  
  displayEmp(data,name,last){
  console.log(data,name,last)
  this.selected=[data] +" "+ name +" "+ last; 
  }
   
} 
