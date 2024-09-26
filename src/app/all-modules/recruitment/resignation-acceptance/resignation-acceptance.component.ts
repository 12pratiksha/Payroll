import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AllModulesService } from '../../all-modules.service';
import Swal from 'sweetalert2';
import { HttpParams } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-resignation-acceptance',
  templateUrl: './resignation-acceptance.component.html',
  styleUrls: ['./resignation-acceptance.component.css']
})
export class ResignationAcceptanceComponent implements OnInit {
  showMyContainer : boolean = false
  resigationForm: FormGroup
  tableData: any=[];
  dtOptions: { pagingType: string; pageLength: number; processing: boolean; dom: string; buttons: string[]; };
  empid: any;
  assetsList: any=[];
  status: any;
  id: any;
  editId: any;
  details: any;
  assets: string;
  constructor(
    public router: Router,
    public fb: FormBuilder,
    public service:AllModulesService
    ) { }



  ngOnInit(): void {
    this.resigationForm = this.fb.group({
      lastDate:['',Validators.required],
      exitConcern:['',Validators.required],
      docClearance:[''],
      remark:[''],
      other:[''],
      assets:[''],
    })
   

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'print', 
        ]
    };
    this.getAllResignation();
  }
  // check(item){
  //   console.log(item)
  //   this.showMyContainer = true
  //   this.empid=item.employee_id
  //   let url='getAssetAssignByEmpId?empId='+this.empid
  //   this.service.get(url).subscribe((res)=>{
  //     this.assetsList=res
      
  //   })

  //   }
    hideContainer(){
      const currentRoute = this.router.url;
    
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([currentRoute]); // navigate to same route
      }); 
    }
    // getAll(){
    //   let url="getResignationFormList"
    //   this.service.get(url).subscribe((res)=>{
    //   this.tableData=res
    //   })
    
    // }
    submit(){
        console.log(this.resigationForm)
        let form=this.resigationForm.value
        let data={
        "lastWorkingDay":form.lastDate,
        "exitInterviewConcern":form.exitConcern,
        "departmentClearanceDoc":form.docClearance,
        "remark":form.remark,
        "otherInfo":form.other,
      }
      if(this.resigationForm.status=='VALID'){
      let url="InsertResignationAcceptance"
      this.service.add(data,url).subscribe((res)=>{
        if(res.respose='Success'){
          Swal.fire({
            icon:'success',
            title:'Success',
            text:res.message
                })
                this.showMyContainer=false;
        }
        else if(res.respose=='Already'){
          Swal.fire({
            icon:'warning',
            title:'Oops',
            text:res.message
                })
        }
        else{
          Swal.fire({
            icon:'error',
            title:'error',
            text:'Something went wrong!'
                })

        }


      })
    }
    else{
      Swal.fire({
        icon:'error',
        title:'error',
        text:'Something went wrong!'
            })
    }
    }

  check1(event,item){
    console.log(event)
    this.status=event
    this.id=item.assetAssignId
  
  }

 update1(){
   let params = new HttpParams();
   if(this.status==true){
   params = params.append('status', 1);
   params = params.append('assetAssignId',this.id);
   // let url='UpdateResignationByResignationFormId?status='+`${1}`+'&resignationFormId=12882
   let url ='updateAssetAssignStatusById?status='+`${1}`+'&assetAssignId='+`${this.id}`
      this.service.add(params,url).subscribe((data) => {
        if(data.respose=='Success'){
          Swal.fire({
            icon:'success',
            title:'Success',
            text:"Resignation Acceptance Updated Successfully!"
          })
          this.getAllAssets();
        }
        else{
          Swal.fire({
            icon:'error',
            title:'Error',
            text:data.message
          }) 
        }
      })
    }
    else if(this.status==false){
      params = params.append('status', 0);
      params = params.append('assetAssignId',this.id);
      let url ='updateAssetAssignStatusById?status='+`${0}`+'&assetAssignId='+`${this.id}`
      this.service.add(params,url).subscribe((data)=>{
        if(data.respose=='Success'){
          Swal.fire({
            icon:'success',
            title:'Success',
            text:data.message
          })
        }
        else{
          Swal.fire({
            icon:'error',
            title:'Error',
            text:data.message
          }) 
        }
      }) 
    } 
    else{
      Swal.fire({
        icon:'error',
        title:'Error',
        text:'Something went wrong '
      })  
    }
 }

 getAllResignation(){
   let url="getResignationAcceptanceList"
   this.service.get(url).subscribe((res)=>{
   let data=[];
   if(res){
   res.forEach(element => {
   let url='getAssetAssignByEmpId?empId='+element.employee_id
   this.service.get(url).subscribe((res)=>{
    if(res){
      this.assets="yes"
    }
    else{
      this.assets="no"
    }
    data.push({
    "other_info": element.other_info,
    "employee_id": element.employee_id,
    "last_working_day": element.last_working_day,
    "firstName": element.firstName,
    "exit_interview_concern": element.exit_interview_concern,
    "middleName": element.middleName,
    "employee_code": element.employee_code,
    "department_clearance_doc": element.department_clearance_doc,
    "remark": element.remark,
    "lastName": element.lastName,
    "resignation_acceptance_id": element.resignation_acceptance_id,
    "assets":this.assets
  })
  })
   });
  }
  this.tableData=data
  })
 }

 edit(item){
    this.editId=item
    this.empid=item.employee_id
    let url2='getResignationApplicationListByEmployeeId?empid='+this.empid
    this.service.get(url2).subscribe((res)=>{
      this.details=res.data
    })
    let url1='getAssetAssignByEmpId?empId='+this.empid
    this.service.get(url1).subscribe((res)=>{
      this.assetsList=res
    })
    this.showMyContainer=true;
    let form=this.resigationForm.value
    let url="getResignationAcceptanceById/"+item.resignation_acceptance_id
    this.service.get(url).subscribe((res)=>{
    console.log(res)
    this.resigationForm.get('lastDate').setValue(res.lastWorkingDay)
    this.resigationForm.get('exitConcern').setValue(res.exitInterviewConcern)
    this.resigationForm.get('remark').setValue(res.remark)
    this.resigationForm.get('other').setValue(res.otherInfo)
    })
 }
 update(){
    let form=this.resigationForm.value
    console.log(form)
    let data={
    "lastWorkingDay":form.lastDate,
    "exitInterviewConcern":form.exitConcern,
    "departmentClearanceDoc":form.docClearance,
    "remark":form.remark,
    "otherInfo":form.other,
    "employeeId": this.editId.employee_id
  }
    let url="updateResignationAcceptance/"+this.editId.resignation_acceptance_id
    this.service.add(data,url).subscribe((res)=>{
    if(res.respose=='Success'){
            Swal.fire({
              icon:'success',
              title:'Success',
              text:"Resignation Acceptance Updated Successfully!"
              })
              this.showMyContainer=false
              this.getAllResignation();
            }
            else{
              Swal.fire({
                icon:'error',
                title:'Error',
                text:res.message
              }) 
            }
          })
}
 delete(item){
    Swal.fire({
      title: 'Are you really wants to delete?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: 'Loading...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading()
        }
      })
     let url="deleteResignationAcceptance/"+item.resignation_acceptance_id
     this.service.get(url).subscribe((res)=>{
     if (res.respose=='Success') {
     Swal.fire({
      icon:'success',
      title: 'Success',
      text: "Resignation Acceptance Deleted Successfully !",
      
      didOpen: () => {
        Swal.hideLoading()
      }
      })
      this.getAllResignation();
      }
      else{
      Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong',
      didOpen: () => {
        Swal.hideLoading()
      }
    })
      }
    })
    }
    else{
      this.getAllResignation
    }
    })
}

getAllAssets(){
  let url1='getAssetAssignByEmpId?empId='+this.empid
  this.service.get(url1).subscribe((res)=>{
  this.assetsList=res
  })
}


}
