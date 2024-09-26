import { MonthlyAttendanceComponent } from './../../attendance/monthly-attendance/monthly-attendance.component';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { AllModulesService } from '../../all-modules.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as xlsx from 'xlsx'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-type-wise-salary-register-report',
  templateUrl: './employee-type-wise-salary-register-report.component.html',
  styleUrls: ['./employee-type-wise-salary-register-report.component.css']
})
export class EmployeeTypeWiseSalaryRegisterReportComponent implements OnInit {
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
  year: any;
  month1: any;
  companyName: string;
  address: string;
  imageName: string;
  usertype: string;
  branchName: any;
  branchId: any;
  constructor( private fb:FormBuilder, public _service:AllModulesService,private http: HttpClient) { }

  ngOnInit():void{
    this.branchId=localStorage.getItem('branchId')
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
      status:'',
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

    this.getAllShifts();
    this.getState();
    this.getBranchList();
    this.getCategories();
    this.getDepartment();
    this.getAllEmployee();
    this.getCompanyDetails();
    this._service.get('subDepartment/getSubDepartments').subscribe((res)=>{
      this.subDepartments=res
    })
    this._service.get('getAllDesignationMaster').subscribe((data) => {
      this.designations = data.data;
      
    });
    this._service.get('getgetCodeByType?type=grade').subscribe((res)=>{
      this.grade = res
    })
   
  }
  getAllShifts(){

    this._service.get('shifts/getAllShift').subscribe((res)=>{
    
    this.shiftTable = res
    },(error)=>{
      console.log(error)
      alert("Something Went Wrong")
    })
    
    }
    getState(){
      this._service.get( "state/getStateList").subscribe((data) => {
      this.stateData = data;
      });
    }
    getBranchList(){
      this._service.get('branch/getBranchList').subscribe((res)=>{
      this.branch = res
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

    getAllEmployee(){
      this._service.get("employee_master/getemployees").subscribe((data) => {
      this.employeeslist = data;
      });
    }

    exportToExcel(){
     const ws: xlsx.WorkSheet =  xlsx.utils.table_to_sheet(this.epltable.nativeElement);
     const wb: xlsx.WorkBook = xlsx.utils.book_new();
     xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
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
    this.companyName=localStorage.getItem('companyName')
    this.address=localStorage.getItem('address')
    let pf=this.payrollForm.value 
    this.month1=pf.month
    this.year=pf.year
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
    this.usertype=localStorage.getItem('type');
    let url = "getSalarySlips?usertype="+this.usertype+"&year="+pf.year+"&month="+pf.month+"&state="+pf.state+"&category="+pf.category+"&subCategory="+"&status="+pf.status+"&employeeId="+pf.searchBy+"&department="+pf.department+"&subDepartment="+pf.subDepartment+"&branch="+pf.branch+"&grade="+pf.grade+"&designation="+pf.designation
    //let url ='getPayrollListesByMonthAndYear?month='+`${d.month}`+'&year='+`${d.year}`
    this._service.get(url).subscribe((data) => {
      if(data.length==0){
        Swal.fire({
          icon: 'warning',
          title: 'There is no records are available',
          showConfirmButton: false,
          timer: 1500
        })
      }
      else{
     // console.log(data)
      this.employees = data.data;
      this.tableLen = data.data.length
      this.employees.forEach(element=>{
        this.allowance.push(element.allowances)
      })
     // console.log(this.allowance)
      this.allowance.forEach(element1 => {
         this.allowance1.push(element1)
         for(let i=0;i<element1.length;i++){
         if(this.allelemnets.find(e => e.elementName == element1[i].elementName)){
         }
         else{
            if(element1[i].additionDeduction.indexOf("Addition")>-1){
            this.allelemnets.push({elementName:element1[i].elementName ,elementtype:element1[i].additionDeduction });
            this.displayedColumns.push(element1[i].elementName);
            }
          }
        }
        for(let j=0;j<element1.length;j++){
          if(this.allelemnets1.find(e => e.elementName == element1[j].elementName)){
          }
          else{
            if(element1[j].additionDeduction.indexOf("Deduction")>-1){
            this.allelemnets1.push({elementName:element1[j].elementName ,elementtype:element1[j].additionDeduction });
            this.displayedColumns.push(element1[j].elementName);
            }
          }
        }
       });
       this.displayedColumns.push("NET SALARY")
      }
    })
  }
    
  getCompanyDetails(){
    let url="getAllCompanyInformationList"
    this._service.get(url).subscribe((res)=>{
    console.log(res)
    this.imageName=res[0].backImageName+""+res[0].logoImageName
    console.log(this.imageName)
    })
  }


 onChange(event){
  console.log(event.target.value)
  let id=event.target.value
  let url='getAllDepartmentBybranchId/'+id
  this._service.get(url).subscribe((res)=>{
  this.departments=res
  })
}
}