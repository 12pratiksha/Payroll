import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { AllModulesService } from '../../all-modules.service';
import {SelectionModel} from '@angular/cdk/collections';
import { style } from '@angular/animations';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

declare var pdfMake: any;
@Component({
  selector: 'app-salary-slip',
  templateUrl: './salary-slip.component.html',
  styleUrls: ['./salary-slip.component.css']
})
export class SalarySlipComponent implements OnInit {
  text = "kjdfd jhflksdjhk fkdjf hflkh lkh jdkfj "
  payrollForm:FormGroup
  tableData: any;
  tableLen: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  stateData: any;
 
  datas = []
  dtTrigger: Subject<any> = new Subject();
  dtOptions: any = {};
  branch: any;
  categories: any;
  departments: any;
  employees;
  employee=[];
  type: number;
  subDepartments: any;
  designations: any;
  grade: any;
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
  salary = [ 
    {value:1, key: 'Processed'}, {value:0, key:'Unprocessed'}]
  shiftTable: any;
  usertype: string;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  displayedColumns: string[] = ['select', 'id', 'employeeId','name', 'days', 'present', 'leave', 'holiday', 'absent', 'processed', 'addition', 'deduction', 'netSalary', 'status'];
  dataSource = new MatTableDataSource();
  selection = new SelectionModel(true, []);

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  
  constructor(private srvModuleService: AllModulesService,private http: HttpClient,public _fb:FormBuilder, public _service:AllModulesService, public router:Router) { }

  ngOnInit(): void {
    this.usertype=localStorage.getItem('type')
this.datas = []
this.datas =   [
  {name:"fdkfhf",code:'1222',doj:'dkjf',pan:'ddkfj',designation:'ffds',pf:'fkjdf',department:"fdfdf", months:'df',branch:"fdfdf",payable:'fdfdf',uan:'dfdf',lwp:'fdf€',salary:"fdf",compay:'fdf',address:'dsdd'},
  {name:"fdkfhf",code:'1222',doj:'dkjf',pan:'ddkfj',designation:'ffds',pf:'fkjdf',department:"fdfdf", months:'df',branch:"fdfdf",payable:'fdfdf',uan:'dfdf',lwp:'fdf€',salary:"fdf",compay:'fdf',address:'dsdd'}
]
        this.getAllShifts();
        this.dtOptions = {
          order: 1,
          dom: 'Brtip',
          paging: false,
          bSort: false,
          searching: false,
          retrieve: true,
          bInfo : false,
          
        };

this.payrollForm=this._fb.group({
 
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
this.getCompany();
this.getState();
this.getBranchList();
this.getCategories();
this.getDepartment();
this.getAllEmployee();

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

    processThisSalary(){

    }
  getEmployee(){
  

    let flag=0;
   
    let pf=this.payrollForm.value 

    if(this.usertype!='Admin'){
      if(pf.searchBy==""){
        flag=1;
        Swal.fire({
          icon: 'warning',
          title: 'Please Select Valid Employee',
          showConfirmButton: false,
          timer: 1500
        })


      }
      
          }

if(flag==0){
    console.log(pf)
let url = "getSalarySlips?usertype="+this.usertype+"&year="+pf.year+"&month="+pf.month+"&state="+pf.state+"&category="+pf.category+"&subCategory="+"&status="+pf.status+"&employeeId="+pf.searchBy+"&department="+pf.department+"&subDepartment="+pf.subDepartment+"&branch="+pf.branch+"&grade="+pf.grade+"&designation="+pf.designation

this._service.get(url).subscribe((data) => {
  
      if(data.data.length==0){
        this.tableData=[];
        this.dataSource = new MatTableDataSource();
        Swal.fire({
          icon: 'warning',
          title: 'There is no records are available',
          showConfirmButton: false,
          timer: 1500
        })
      }
      else{
      this.tableData = data.data
      console.log(data)
      
      this.tableLen = data.length
      
      this.dataSource = new MatTableDataSource<any>(this.tableData);
      console.log(this.dataSource);
  
       this.dataSource.paginator = this.paginator;
        
      }
    });
  }
  
  }
  search(){
  
      
 if (this.payrollForm.status=='VALID'){
  
     this.getEmployee();
    
//   let form=this.payrollForm.value
//   var datePipe = new DatePipe('en-US');
// let fromDate = datePipe.transform(form.fromDate, 'yyyy-MM-dd');
// let toDate = datePipe.transform(form.toDate, 'yyyy-MM-dd');

// console.log(form.searchBy)
// //  let url = "getBulkAttendenceList?fromDate="+`${fromDate}`+"&toDate="+`${toDate}`+"&state="+`${form.state}`+"&subCategory&status="+`${form.status}`+"&employeeNo&category"+`${form.category}`+"&department"
// // let url = "getPayrollListses?year="+`${fromDate}`+"&month="+`${toDate}`+"&state="+`${form.state}`+"&subCategory&status="+`${form.status}`+"&employeeNo="+`${form.id}`+"&category="+`${form.category}`+"&department="+`${form.department}`+"&branch="+`${form.branch}`
// let url = "getPayrollListses?year="+`${form.year}`+"&month="+`${form.month}`+"&state="+`${form.state}`+"&category="+`${form.category}`+"&subCategory&status="+`${form.status}`+"&employeeId="+`${form.searchBy}`+"&department="+`${form.department}`+"&subDepartment="+`${form.subDepartment}`+"&branch="+`${form.branch}`
// this._service.get(url).subscribe((data)=>{
// this.tableData = data.data
// this.tableLen = data.length
// this.dataSource = new MatTableDataSource<any>(this.tableData);

// this.dataSource.paginator = this.paginator;
// })
//  }
//  else{
//   this.payrollForm.markAllAsTouched();
//   Swal.fire({
//     icon: 'error',
//     title: 'Oops...',
//     text: 'Something went wrong!',
    
//   })
 }
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

  attendanceExtraction(){
 Swal.fire({
    title: 'Are you sure?',
    text: "You Want To Process The Attendance For Selected Employees! (Attendance Extraction Process)",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, Process it!'
  }).then((result) => {
    if (result.isConfirmed) {
      // Swal.fire(
      //   'Deleted!',
      //   'Your file has been deleted.',
      //   'success'
      // )
    }
  })
  }

  processSalary(){
  
    let form=this.payrollForm.value
    var datePipe = new DatePipe('en-US');
 
    
    Swal.fire({
      title: 'Are you sure?',
      text: "You Want To Process The Salary For Selected Employees! (Attendance Process)",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Process it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // Swal.fire(
        //   'Deleted!',
        //   'Your file has been deleted.',
        //   'success'
        // )
        let employee = [];
        let id = this.selection.selected
        console.log(id)
        id.forEach((employees)=>{
          employee.push({employeeId:employees.employeeId,month:form.month,year:form.year})
         
         })
         let  type =  "ProcessPayRollList"
         this._service.add(employee, type).subscribe((res)=>{

          Swal.fire({
            icon: 'success',
            title: 'Salary Processed Successfully',
            showConfirmButton: false,
            timer: 1500
          })

           
         })
      
      }
    
    })
  }
  reset(){
    this.payrollForm.reset();
  }
  userType:any;
  async getAllEmployee(){
    
    this.userType=localStorage.getItem('type')
  if(this.usertype=='Admin' || usertype=='Super Admin'){
  
    this._service.get('employee_master/getemployees').subscribe((res)=>{
      this.employees=res
    
    })
  }else{
    // this.employees=[];
    //   let myemp=[];
    //   let id = localStorage.getItem('empid')
    //   let url = "getemployeesListByThere-RM1-RM2-Self?employeeId=" + id;
    //   this._service.get(url).subscribe((res) => {
    //     console.log(res);
    //     // console.log(">>>>>"+res.employeeId);
    //     res.forEach(element => {
    //       console.log(element);
    //       this.employees.push({ "employeeId": element.employeeId, "employeeCode": element.employeeCode, "firstName": element.firstName, "lastName": element.lastName });
    //       console.log(">>>>>" + this.employees[0].employeeId);
    //     });
    //   });
    this.employees=[];
        let myemp=[];
        let id = localStorage.getItem('empid')
        let url = "employee_master/getemployee/" + id;
        await this._service.get(url).subscribe((res) => {
          console.log(res);
          console.log(">>>>>"+res.employeeId); 

          this.employees.push({"employeeId":res.employeeId,"employeeCode":res.employeeCode,"firstName":res.firstName,"lastName":res.lastName});
         console.log(">>>>>"+this.employees[0].employeeId); 

        });
  
    }
  }




  async showPdf() {
    let docDefinition = {
      content: [
        {
          text: 'INAMDAR MULTISPECIALITYHOSPITAL',
          fontSize: 8,
          style: 'header'
        },
        {
          text: 'Pune',
          fontSize: 5,
          style: 'header'
        },
       
        // {
        //   image: await this.getBase64ImageFromURL(
        //     "/assets/img/logo.jpeg"
        //   ),
        //   fit: [50, 50],
        //   style:'logo'

        // },
        {
          text: 'SALARYSLIP FOR THEMONTHOF JANUARY- 2022, FEBRUARY- 2022, MARCH- 2022, APRIL- 2022, MAY- 2022, JUNE- 2022, JULY - 2022, AUGUST- 2022, SEPTEMBER - 2022, OCTOBER - 2022, NOVEMBER - 2022, DECEMBER - 2022',
          fontSize: 7,
          style: 'header'
        },
        {
          style: "tableExample",
          table: {
            body: [
              [
                {
                  border: [false, false, false, false],
                  text: ''
                },
                {
                  text: '',
                  border:[false, false, false, false],
                },
                {
                  text: 'Earning',
                  order:[false, false, false, false],
                },
                {
                  text: 'Actual',
                  order:[false, false, false, false],
                },
                {
                  text: 'Payable',
                  order:[false, false, false, false],
                },
              ],
              [
                {
                  fillColor: '#dddddd',
                  text: 'border:\nundefined'
                },
                {
                  fillColor: '#eeeeee',
                  text: 'border:\nundefined'
                },
                {
                  border: [true, true, false, false],
                  fillColor: '#dddddd',
                  text: 'border:\n[true, true, false, false]'
                },
              ]
            ]
          }
        }
      ],
      styles: {
        header:{
          fontSize: 22,
          bold: true,
          alignment: 'center'
        },
       headerbottom: {
          fontSize: 10 ,
          italics: true,
          alignment: 'center'
        },
        logo: {
          alignment: 'flex'
        },
      }
    };

    pdfMake.createPdf(docDefinition).open();
  }

  getBase64ImageFromURL(url) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");

      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        var dataURL = canvas.toDataURL("image/png");

        resolve(dataURL);
      };

      img.onerror = error => {
        reject(error);
      };

      img.src = url;
    });
  }


// slip(){
//   this.router.navigate(['/layout/reports/generatesalarySlip'])
// }
loginData:any;
result:any;
path=environment.apiEndpoint;
address:any;
getCompany(){
  this.loginData=localStorage.getItem('LoginData');
  let headers = new HttpHeaders({ "Authorization": this.loginData});
  console.log(this.loginData)
  console.log(headers)
  console.log(this.path)
  this.srvModuleService.get('getAllCompanyInformationList').subscribe((res)=>{

     let result=res;
     this.result=result[0].backImageName+""+result[0].logoImageName;
   //  this.backgroundImg = this.sanitizer.bypassSecurityTrustStyle('url(' + this.result + ')');
this.address=result[0].address;
    console.log(this.result);
     //this.loader = false
     
  },(error)=>{
    
    
    console.log(error)
    alert("Something Went Wrong")
  });

}


getReport(){
console.log(this.payrollForm.value);
 if (this.payrollForm.valid){

  let form = this.payrollForm.value




  let salarySlipData = {
    year: form.year,
    month:form.month,
    state:form.state,
    category:form.category,
    branch:form.branch,
    subCategory:form.branch,
    employeeId:form.searchBy,
    status:form.status,
    department:form.department,
    subDepartment:form.subDepartment,
    grade:form.grade,
    designation:form.designation,
    fullName:"",
    image:this.result
  }


console.log(this.selection.selected)

 // localStorage.setItem('salarySlipData', JSON.stringify(this.dataSource))
  this.router.navigate(['/layout/reports/generatesalarySlip'],{queryParams:{Data:this.selection.selected,image:this.result,address:this.address} })
 }
else{
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Something went wrong!',

  })
  this.payrollForm.markAllAsTouched()
}
}
}

