import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2';
import { AllModulesService } from '../../all-modules.service';

@Component({
  selector: 'app-salary-policy',
  templateUrl: './salary-policy.component.html',
  styleUrls: ['./salary-policy.component.css']
})
export class SalaryPolicyComponent implements OnInit {
  tableData: any;
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  loader = true
  dtOptions: any = {};
  branch: any;
  categories: any;
  stateList: any;
  grade: any;
  tableData_display: any=[];
  constructor(
    public _service:AllModulesService,
    public router:Router
    ) { }

  ngOnInit(): void {
    this.getBranch();
    this.getCategories();
    this.getGrade();
    this.getState();
    this.getTableData();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'print', 
        ]
    };
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
  // department(){
  //   this._service.get('getAllDepartment').subscribe((res)=>{
  //     this.departments=res
  //   })
  // }
  getState(){

    this._service.get('state/getStateList')
    .subscribe((res)=>{
    
    // console.log(res )
    this.stateList = res
    
    })
    
    }
    getGrade(){
      this._service.get('getgetCodeByType?type=grade').subscribe((res)=>{
        this.grade = res
      })
    }


getTableData(){
  this._service.get('getAllSalaryPolicyMaster').subscribe((res)=>{
    console.log(res)
    res.forEach(element => {
      let state=element.state 
      let branch=element.branch 
      let category=element.category
      let grade=element.grade
      let result=this.stateList.filter((stat:any)=>
      (stat.stateId=state))

      let resultBranch=this.branch.filter((bran:any)=>
      (bran.id=branch))

      let resultCateg=this.categories.filter((cate:any)=>
      (cate.categoryId=category))

      let resultGrade=this.grade.filter((gra:any)=>
      (gra.lookupMasterId=grade))

      this.tableData_display.push({"salaryPolicyId":element.salaryPolicyId,"state":result[0].stateName,"branch":resultBranch[0].branchName,"category":resultCateg[0].categoryName,"grade":resultGrade[0].name,"days":element.days,"effectiveDate":element.effectiveDate})
    });
    this.tableData = this.tableData_display;
    this.loader = false
  },(error)=>{
    
    this.loader = false
    console.log(error)
    alert("Something Went Wrong")
})
}
salaryPolicy(type){
  this.router.navigate(['/layout/masters/salaryPolicyForm/'+type])
}
delete(id){
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      this._service.delete(id, 'deleteSalaryPolicyMaster').subscribe((res)=>{
        console.log(res)
        if(res.respose == 'Success'){
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        this.getTableData();
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
  
    
  })
}
}
