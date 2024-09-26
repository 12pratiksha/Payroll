import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AllModulesService } from '../../all-modules.service';
import Swal from 'sweetalert2';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-ptreport',
  templateUrl: './ptreport.component.html',
  styleUrls: ['./ptreport.component.css']
})
export class PtreportComponent implements OnInit {
  filterForm:FormGroup;
  array: any=[];
  employee1: any;
  selected:any;
  employees: any;
  tableData: any;
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
  errorMessage: any;
  imageName: any;
  dtOptions: { pagingType: string; pageLength: number; processing: boolean; dom: string; buttons: string[]; };
  branchId: string;
  userType: string;
  companyName: string;
  address: string;
  month: any;
  Year: any;
  constructor(public fb:FormBuilder,public service:AllModulesService) { }

  ngOnInit(): void {
    this.branchId=localStorage.getItem('branchId')
    this.userType=localStorage.getItem('type')
    this.companyName=localStorage.getItem('companyName')
    this.address=localStorage.getItem('address')
    this.filterForm=this.fb.group({
      employeeId:[''],
      month:['',Validators.required],
      year:['',Validators.required],
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
    this.getEmployee();
    this.getCompanyDetails();
  }
  
  getEmployee(){
    let url='employee_master/getemployees'
    this.service.get(url).subscribe((res)=>{
      this.employees=res
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

    getCompanyDetails(){
      let url="getAllCompanyInformationList"
      this.service.get(url).subscribe((res)=>{
        console.log(res)
       
          this.imageName=res[0].backImageName+""+res[0].logoImageName
        
        console.log(this.imageName)
      })
    }

    
  search(){
   
    let form=this.filterForm.value
    this.month=form.month
    this.Year=form.year
    let url='';
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
      if(this.filterForm.value.employeeId){
        let emp=this.filterForm.value.employeeId.split(" ");
        let emply=this.employees.filter((emply)=>
        (emply.employeeCode == emp[0]))
        console.log(emply)
        let params = new HttpParams();
        params = params.append('year', form.year);
        params = params.append('month', form.month);
        params=params.append('employeeId',emply[0].employeeId)

        url='getPTReports?employeeId='+emply[0].employeeId+'&month='+form.month+'&year='+form.year

      }
      else{
        let params = new HttpParams();
        params = params.append('year', form.year);
        params = params.append('month', form.month);
        params=params.append('employeeId',0)

        url='getPTReports?employeeId='+0+'&month='+form.month+'&year='+form.year
      }
      this.service.get(url).subscribe(res=>{
      this.tableData=res
      if(res)
        {
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

}
