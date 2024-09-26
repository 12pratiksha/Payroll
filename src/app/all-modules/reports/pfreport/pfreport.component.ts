import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AllModulesService } from '../../all-modules.service';
import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pfreport',
  templateUrl: './pfreport.component.html',
  styleUrls: ['./pfreport.component.css']
})
export class PfreportComponent implements OnInit {
  filterForm:FormGroup
  dtOptions: { pagingType: string; pageLength: number; processing: boolean; dom: string; buttons: string[]; };
  employees: any;
  state: any;
  category: any;
  department: any;
  branch: any;
  imageName: any;
  array: any=[];
  employee1: any;
  selected: any;
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
  tableData: any;
  errorMessage: any;
  companyName: any;
  address: any;
  month: any;
  Year: any;
  pfNo: any;
  selectedno: string;
  userType: string;
  allowance: any=[];
  allelemnets: any=[];
  allowance1: any=[];
  displayedColumns: any=[];
  branchName: any;
  branchId: any;
  totalBasicPlusDA: number = 0;
  totalPF: number = 0;
  totalA: number = 0;
  totalB: number = 0;
  totalAplusB: number = 0;
  totalBasicPay: number = 0;
  totalGradePay: number = 0;
  totalBasic: number = 0;
  totalDA: number = 0;
  columnTotals={};
  displayedColumns1=[];
  allelemnets1: any=[];
  constructor(public fb:FormBuilder,public service:AllModulesService,public datePipe:DatePipe) { }

  ngOnInit(): void {
    this.branchId=localStorage.getItem('branchId')
    this.userType=localStorage.getItem('type')
    this.companyName=localStorage.getItem('companyName')
    this.address=localStorage.getItem('address')
    this.filterForm=this.fb.group({
      employeeId:[''],
      month:['',Validators.required],
      year:['',Validators.required],
      pfno:['']
    })
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10000,
      processing: true,
      dom: 'Bfrtip',
      buttons: [
            'copy', 'csv', 'excel', 'print'
        ]
    };
    this.getCategory();
    this.getDepartment();
    this.getEmployee();
    this.getState();
    this.getBranch();
    this.getCompanyDetails();
    
  }

getEmployee(){
  let url='employee_master/getemployees'
  this.service.get(url).subscribe((res)=>{
    this.employees=res
  })
}
getState(){
  let url='state/getStateList'
  this.service.get(url).subscribe((res)=>{
    this.state=res
  })
}
getCategory(){
  let url='categories/getCategories'
  this.service.get(url).subscribe((res)=>{
    this.category=res
  })
}
getDepartment(){
  let url='getAllDepartment'
  this.service.get(url).subscribe((res)=>{
    this.department=res
  })
}
getBranch(){
  
  let url='branch/getBranchList'
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

getCompanyDetails(){
  let url="getAllCompanyInformationList"
  this.service.get(url).subscribe((res)=>{
    console.log(res)
   
      this.imageName=res[0].backImageName+""+res[0].logoImageName
    
    console.log(this.imageName)
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
  // let url='employees/search?employeeName='+`${form.employeeId}`
  this.service.get(url).subscribe((res)=>{
    this.employee1=res.data
  })
}
}



displayEmp(data,name,last){
console.log(data,name,last)
this.selected=[data] +" "+ name +" "+ last; 

}

search(){
  let form=this.filterForm.value
  let url='';
  this.month=form.month
  this.Year=form.year
  if(this.filterForm.status=='VALID'){
    Swal.fire({
      title: 'Loading...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading()
      }
    });
    if(this.filterForm.value.employeeId && form.pfno){
      let emp=this.filterForm.value.employeeId.split(" ");
     let emply=this.employees.filter((emply)=>
     (emply.employeeCode == emp[0]))
     console.log(emply)
     let params = new HttpParams();
    params = params.append('year', form.year);
    params = params.append('month', form.month);
    params=params.append('employeeId',emply[0].employeeId)
   url='getPFReports?employeeId='+emply[0].employeeId+'&month='+form.month+'&year='+form.year+'&EPFNo='+form.pfno
}
else if(this.filterForm.value.employeeId){
  let emp=this.filterForm.value.employeeId.split(" ");
  let emply=this.employees.filter((emply)=>
  (emply.employeeCode == emp[0]))
  console.log(emply)
  let params = new HttpParams();
 params = params.append('year', form.year);
 params = params.append('month', form.month);
 params=params.append('employeeId',emply[0].employeeId)
url='getPFReports?employeeId='+emply[0].employeeId+'&month='+form.month+'&year='+form.year+'&EPFNo='
}
else if(form.pfno){
url='getPFReports?employeeId='+0+'&month='+form.month+'&year='+form.year+'&EPFNo='+form.pfno
}

else{
  let params = new HttpParams();
  params = params.append('year', form.year);
  params = params.append('month', form.month);
  params=params.append('employeeId','')
   url='getPFReports?employeeId='+0+'&month='+form.month+'&year='+form.year+'&EPFNo='
}
this.service.get(url).subscribe((res)=>{
  this.tableData=res
  let pf=0
  let bpd=0
  // this.allelemnets=[];
    this.tableData.forEach(element=>{
      console.log(element)
      this.allowance.push(element.allowances)
      
    })
    this.allowance.forEach(element1 => {
       this.allowance1.push(element1)
       
      for(let i=0;i<element1.length;i++){
        if(this.allelemnets.find(e => e.elementName == element1[i].elementName)){
        }else{
         
          if(element1[i].additionDeduction.indexOf("Addition")>-1){
            if(element1[i].elementName=='Basic Pay' || element1[i].elementName=='Grade Pay' ||
              element1[i].elementName=='Total Basic' || element1[i].elementName=='Dearness Allowance'){
                 this.allelemnets.push({elementName:element1[i].elementName ,elementtype:element1[i].additionDeduction,elementAmount:element1[i].actualelementAmount });
                 this.displayedColumns.push(element1[i].elementName,);
                }
          } 
          console.log(this.allelemnets)
          this.getTotal();
        }
      }
  })
  if(res)
    {
      this.calculateTotals();
          Swal.fire({
              icon: 'success',
              title:'Success',
              showConfirmButton: false,
              timer: 1500,
              didOpen: () => {
                Swal.hideLoading()
              }
            });

    }
    else {
          this.errorMessage=res.message
          Swal.fire({
            icon: 'error',
            title: 'There is an error',
            showConfirmButton: false,
            timer: 1500,
            didOpen: () => {
              Swal.hideLoading()
            }
          });
        
         }
})
  }
  else{
    Swal.fire({
      icon: 'error',
      title:'Error',
      text: 'Something went wrong!',
      showConfirmButton: false,
      timer: 1500,
      didOpen: () => {
        Swal.hideLoading()
      }
    });
  }

}
calculateTotals() {
  this.totalBasicPlusDA = this.getColumnTotal('basicPlusDA');
  this.totalPF = this.getColumnTotal('pf');
  this.totalA = this.getColumnTotal('a');
  this.totalB = this.getColumnTotal('b');
  this.totalAplusB = this.getColumnTotal('aplusb');
  

}


getColumnTotal(column: keyof typeof this.tableData[0]): number {
  return this.tableData.reduce((sum, item) =>
    sum + item[column], 0);
}

getTotal(){
  this.allelemnets.forEach(item => {
  this.allelemnets1.push({
    elementName: item.elementName,
    elementtype: item.additionDeduction,
    elementAmount: item.actualelementAmount
  });
});

// Define displayed columns (those you want to sum)
this.displayedColumns = [...new Set(this.allelemnets.map(item => item.elementName))];

// Calculate totals after data initialization
this.calculateColumnTotals();
}

calculateColumnTotals() {
// Initialize columnTotals as an empty object
this.columnTotals = {};

// Calculate total for each column name in displayedColumns
this.displayedColumns.forEach(name => {
  this.columnTotals[name] = this.getColumnTotal1(name);
});

console.log(this.columnTotals); // Debugging output
}

getColumnTotal1(elementName: string): number {
// Check if allelemnets is defined and has items
if (!this.allelemnets || this.allelemnets.length === 0) {
  return 0;
}

// Calculate sum of elementAmount for the specified elementName
return this.allelemnets
  // .filter(item => item.elementName === elementName)
  .reduce((sum, item) => sum + (item.elementAmount || 0), 0);
}





getPfNo(event){
  this.array.push(event)
  let form=this.filterForm.value
  if(this.array.length >=2){
    let data=form.pfno.toUpperCase()
    let url='search/epfno?epfNo='+`${data}`
    this.service.get(url).subscribe((res)=>{
    this.pfNo=res
    console.log(this.pfNo)
  })
}
}

displayEpfno(data){
  console.log(data)
this.selectedno=data; 

}
}
