import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AllModulesService } from '../../all-modules.service';
import Swal from 'sweetalert2';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-list-for-approver',
  templateUrl: './list-for-approver.component.html',
  styleUrls: ['./list-for-approver.component.css']
})
export class ListForApproverComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtTrigger: Subject<any> = new Subject();
  tableData_display: any=[];
  department: any;
  designation: any;
  approver: any;
  dtOptions: { pagingType: string; pageLength: number; processing: boolean; dom: string; buttons: string[]; };
  constructor(
    public router: Router,
    public _service: AllModulesService,
  ) { }

  async ngOnInit(): Promise<void> {

    this.getApprover()
    this.getDepartment()
    this.getDesignation()
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
  
  async getDepartment(){
    await this._service.get("getAllDepartment").subscribe((res)=>{
      this.department = res
     
    })
    
  }
  async getDesignation(){
    await this._service.get("getAllDesignationMaster").subscribe(async (res)=>{
      this.designation = res
      this.getTableData()

    })
  }

  async getApprover(){
    await this._service.get("employee_master/getemployees").subscribe((res)=>{
      this.approver = res
      
    })
  }
    
  showContainer(id,type){
    this.router.navigate(['layout/recruitment/recruitmentForm/'+id+'/'+type]); 
   }
   tableData
   mytype
getTableData(){
  let type=localStorage.getItem('type')
  this.mytype=type;
  if(this.mytype!="Admin"){
  let empid=localStorage.getItem('empid')
  let url='getAllNONApprovalJobRequirementList?empId='+empid
  this.tableData_display=[]
  this._service.get(url).subscribe((res)=>{
    console.log(res)
    if(res){
    res.forEach(element => {
      let desg=element.designation;
        if( isNaN(desg)){
         }else{
          let result3 =this.designation.filter((design: any) =>
          (design.designationMasterId==desg) )
          desg = result3[0].name;
         }
         this.tableData_display.push({"requirement_id":element.requirement_id,"request_date":element.request_date,"department":element.department_name,"expected_joining_date":element.expected_joining_date,"designation":desg,"no_of_vacancy":element.no_of_vacancy,"approver":element.first_name+" "+element.last_name})
   
    });
    } 
  })
} else{
  let empid=-9999
  let url='getAllNONApprovalJobRequirementList?empId='+empid
  this.tableData_display=[]
  this._service.get(url).subscribe((res)=>{
    if(res){
    console.log(res)
    res.forEach(element => {
      let desg=element.designation;
        if( isNaN(desg)){
         }else{
          let result3 =this.designation.filter((design: any) =>
          (design.designationMasterId==desg) )
             desg = result3[0].name;
         }
        this.tableData_display.push({"requirement_id":element.requirement_id,"request_date":element.request_date,"department":element.department_name,"expected_joining_date":element.expected_joining_date,"designation":desg,"no_of_vacancy":element.no_of_vacancy,"approver":element.first_name+" "+element.last_name})
    });
    }
  })
}
}


// let params = new HttpParams();

// params = params.append('year', form.year);
// params = params.append('month', form.month);
// params = params.append('employeeNo', form.employee);
// // console.log(data)

// let url ='JobRequirementApprovalAPI?status='+`${true}`+'&requirementId='+`${i.requirement_id}`

approve(id){
  Swal.fire({
    title:"Are you really wants to approve..?",
    //  html: `<textarea id="login" class="swal2-input" placeholder="Reason" tabIndex="" >`,
    showCancelButton:true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes'
  }).then(result=>{
    console.log(result);
    if(result.isConfirmed==true)
    {
  let params = new HttpParams();
   params = params.append('status', 1);
 params = params.append('requirementId', id);
  let url='JobRequirementApprovalAPI?status='+1+'&requirementId='+id
  
  this._service.add(params,url).subscribe((res)=>{
    console.log(res)
    if(res.respose=='Success')
    {
      Swal.fire({
        icon: 'success',
       // title: '',
        text: 'Job requirement has been Approved',
       
      })
      //this.leaveApplicationForm.markAllAsTouched();
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
  else if(result.isConfirmed==false)
  {
    this.getTableData();
  }
  })
}
reject(id){
  Swal.fire({
    title:"Are you really wants to reject..?",
    input: 'text',
    // inputValue: this.inputAdd,
    showCancelButton:true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes'
  }).then(result=>{
    console.log(result);
    if(result.isConfirmed==true)
    {
  let params = new HttpParams();
   params = params.append('status', 2);
 params = params.append('requirementId', id);
  let url='JobRequirementApprovalAPI?status='+2+'&requirementId='+id+'&reasonforrejection='+result.value
  this._service.add(params,url).subscribe((res)=>{

    if(res.respose=='Success')
      {
        Swal.fire({
          icon: 'success',
          title:'Success',
          text: 'Job requirement has been Reject',
         
        })
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
    else if(result.isConfirmed==false)
    {
      this.getTableData();
    }
    })
  }

}
