import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AllModulesService } from '../../all-modules.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-markpresentabsent',
  templateUrl: './markpresentabsent.component.html',
  styleUrls: ['./markpresentabsent.component.css']
})
export class MarkpresentabsentComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  selectedType:any;
  selectedOnType:any;
  tableData: any;
  Data: any=[];
  markForm: FormGroup
  dtTrigger: Subject<any> = new Subject();
  datatableElement: DataTableDirective;
  dtOptions: any = {};

  

  displayedColumns: string[] = ['Employee Name', 'Employee code', 'Branch Name', 'Department Name', 'Sub-Department Name'];
  dataSource = new MatTableDataSource();
  selection = new SelectionModel(true, []);
  departments: any;
  branchList: any;
  employee_display: any=[];
  subDepartment: any;

  constructor(public fb: FormBuilder, public _service: AllModulesService, public router: Router,  private http: HttpClient) { 
   
  }

  ngOnInit(): void {
    this.getBranch();
    this.department();
    this.getSubDept();
    this.getEmployeeDetails();
    this.dtOptions = {
      select: {
        info: true,
        style: 'multiple'
      },
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      
    };
    this.markForm = this.fb.group({
    
      fromDate:['',Validators.required],
      toDate:['',Validators.required],
      //attendance:['',]
    })
  }
  ngAfterViewInit(): void {
    this.dtTrigger.subscribe(() => {
      this.datatableElement.dtInstance.then((dtInstance) => {
        dtInstance.columns().every(function () {
          const that = this;
          $('input', this.footer()).on('keyup change', function () {
            if (that.search() !== this['value']) {
              that
                .search(this['value'])
                .draw();
            }
          });
        });
      });
    });
  }
  department() {
    this._service.get('getAllDepartment').subscribe((res) => {
      this.departments = res
    })
  }
  
  getBranch(){
  
    this._service.get('branch/getBranchList')
    .subscribe((res)=>{
    
    this.branchList = res
    
    })
    
    }
    getSubDept(){
      this._service.get('subDepartment/getSubDepartments').subscribe((res)=>{
        this.subDepartment=res
      })
    }
  selected=[];
  public selectRow(index: number, row:any) {
  
   
    if(this.selected.includes(row.employeeId)){
      let index = this.selected.indexOf(row.employeeId)
      this.selected.splice(index, 1);
      console.log(this.selected)
    }
    else{
      this.selected.push(row.employeeId)
      console.log(this.selected)
    }
   
   
  }


  // selected=[];
  // public selectRow(index:number, row:any) {
  // console.log(row)
   
  //   if(this.selected.includes(row.employeeId)){
  //     let index = this.selected.indexOf(row.employeeId)
  //     this.selected.splice(index,1);
      
  //   }
  //   else{
  //     this.selected.push(row.employeeId)
  //   }
   
   
  // }

getEmployeeDetails(){
 this._service.get("employee_master/getemployees").subscribe(data=>{
   data.forEach(element => {
   let department=element.department
   let branch=element.branch
   let subDept=element.subDepartment
   console.log(subDept)
   let result =this.departments.filter((dept: any) =>
         (dept.departmentId==department) )
         let resultBranch =this.branchList.filter((brch: any) =>
         (brch.id==branch) )
         let resultSubDept=this.subDepartment.filter((sub:any)=>
         (sub.subDepartmentId==subDept))

   this.employee_display.push({"employeeId":element.employeeId,"employeeCode":element.employeeCode,"firstName":element.firstName,"lastName":element.lastName,"branch":resultBranch[0].branchName,"department":result[0].departmentName,"status":element.status})
     console.log(this.employee_display)
   })
   
  this.tableData = this.employee_display
  this.dataSource = new MatTableDataSource<any>(data);
  this.dataSource.paginator = this.paginator;
  //this.loader = false
  
  this.Data=this.employee_display
        this.dtTrigger.next();

 })
 
}
dbtn:boolean = false;
dbtn1:boolean = false;
dbtn2:boolean = false;
present(row,type)
{
 console.log(type);
 if(type == 1){
this.dbtn1 = true;
this.dbtn2 = true;
 }
 
  if(this.markForm.valid && this.selected.length != 0){
    Swal.fire({
      title:"Are you really wants to mark as present..?",
      showCancelButton:true,
      confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Yes'
    }).then(result=>{
      console.log(result);
      if(result.isConfirmed==true)
      {
    //let select=this.selected
  
    console.log(this.selected)
  let form = this.markForm.value
  var datePipe = new DatePipe('en-US');
    
    let fromDate = datePipe.transform(form.fromDate,'yyyy-MM-dd');
    let toDate = datePipe.transform(form.toDate,'yyyy-MM-dd');
  let data={
    attendance:"Present",
    employeeIds:this.selected,
    fromdate:fromDate,
    todate:toDate

  }
  this._service.add(data,"AddManualAttendenceByDate").subscribe(res=>{
  console.log(res)
  if(res.respose=='Success'){
    Swal.fire({
      icon: 'success',
      title:'Success',
      text:'Your work has been successfully done'

    })
    const currentRoute = this.router.url;

        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([currentRoute]); // navigate to same route
        }); 
   
  }
  else if(res.respose=='Already')
  {
    Swal.fire({
      icon: 'warning',
      title:'Warning',
      text:res.respose
 
  })

  }
  else{
    Swal.fire({
      icon: 'error',
      title:'Oops',
      text:res.respose
 
  }) 
  }
    
  })
}

else if(result.isConfirmed==false)
      {
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
   
  
 


absent(row,type)
{
  if(type == 2){
    this.dbtn = true;
    this.dbtn2 = true;
     }
  if(this.markForm.valid && this.selected.length != 0){
  Swal.fire({
  title:"Are you really wants to mark as absent..?",
  showCancelButton:true,
  confirmButtonColor: '#3085d6',
   cancelButtonColor: '#d33',
   confirmButtonText: 'Yes'
}).then(result=>{
  console.log(result);
  if(result.isConfirmed==true)
  {
  //let select=this.selected
  console.log(this.selected)
  let form = this.markForm.value
  var datePipe = new DatePipe('en-US');
    
    let fromDate = datePipe.transform(form.fromDate,'yyyy-MM-dd');
    let toDate = datePipe.transform(form.toDate,'yyyy-MM-dd');
  let data={
    attendance:"Absent",
    employeeIds:this.selected,
    fromdate:fromDate,
    todate:toDate

  }
  this._service.add(data,"AddManualAttendenceByDate").subscribe(res=>{
    console.log(res)
    if(res.respose=='Success'){
      Swal.fire({
        icon: 'success',
        title:'Success',
        text:'Your work has been successfully done'
  
      })
      const currentRoute = this.router.url;

        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([currentRoute]); // navigate to same route
        }); 
    }
    else if(res.respose=='Already')
    {
      Swal.fire({
        icon: 'warning',
        title:'Warning',
        text:res.respose
   
    })
  
    }
    else{
      Swal.fire({
        icon: 'error',
        title:'Oops',
        text:res.respose
   
    }) 
    }
  })
}
else if(result.isConfirmed==false)
      {
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


halfDay(row,type)
{
  if(type == 3){
    this.dbtn1 = true;
    this.dbtn = true;
     }
  if(this.markForm.valid && this.selected.length != 0){
  Swal.fire({
    title:"Are you really wants to mark as halfday..?",
    showCancelButton:true,
    confirmButtonColor: '#3085d6',
     cancelButtonColor: '#d33',
     confirmButtonText: 'Yes'
  }).then(result=>{
    console.log(result);
    if(result.isConfirmed==true)
    {
  //let select=this.selected
  console.log(this.selected)
  let form = this.markForm.value
  var datePipe = new DatePipe('en-US');
    
    let fromDate = datePipe.transform(form.fromDate,'yyyy-MM-dd');
    let toDate = datePipe.transform(form.toDate,'yyyy-MM-dd');
  let data={
    attendance:"Half Day",
    employeeIds:this.selected,
    fromdate:fromDate,
    todate:toDate

  }
  this._service.add(data,"AddManualAttendenceByDate").subscribe(res=>{
    console.log(res)
    if(res.respose=='Success'){
      Swal.fire({
        icon: 'success',
        title:'Success',
        text:'Your work has been successfully done'
  
      })
      const currentRoute = this.router.url;

        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([currentRoute]); // navigate to same route
        }); 
    }
    else if(res.respose=='Already')
    {
      Swal.fire({
        icon: 'warning',
        title:'Warning',
        text:res.respose
   
    })
  
    }
    else{
      Swal.fire({
        icon: 'error',
        title:'Oops',
        text:res.respose
   
    }) 
    }
  })
}
else if(result.isConfirmed==false)
      {
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
}
