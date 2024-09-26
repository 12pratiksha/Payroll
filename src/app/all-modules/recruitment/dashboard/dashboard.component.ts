import { Subscriber } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AllModulesComponent } from '../../all-modules.component';
import { AllModulesService } from '../../all-modules.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  offer: any;
  applied: any;
  tableData: any;
  tableData_display: any[];
  Desingation: any;

  constructor(public service:AllModulesService) { }

  ngOnInit(): void {
    this.getDesignation();
    this.getAppliedCount();
    this.getTotalOffer();
    this.getTableData();
   this.getAllOfferCandidate();
  }

  getAppliedCount(){
    let url='getTotalApplicantCandiateApplied'
    this.service.get(url).subscribe((res)=>{
    this.applied=res.data
    })
  }

  getTotalOffer(){
    let url='getTotalOfferApplicate'
    this.service.get(url).subscribe((res)=>{
    this.offer=res.data
    })
  }

  async getDesignation(){
    let url='getAllDesignationMaster'
    await this.service.get(url).subscribe((res)=>{
    this.Desingation=res
    this.getTableData();
    })
  }

  getTableData(){
    this.tableData_display=[];
    this.service.get("getAllApprovalJobRequirementList").subscribe((res)=>{
      console.log(res)
      if(res){
      res.forEach(element => {
        let desg=element.designation;
          if( isNaN(desg)){
           }else{
            let result3 =this.Desingation.filter((design: any) =>
            (design.designationMasterId==desg) )
          desg = result3[0].name;
           }
          this.tableData_display.push({"requirement_id":element.requirement_id,"request_date":element.request_date,"department":element.department_name,"expected_joining_date":element.expected_joining_date,"designation":desg,"no_of_vacancy":element.no_of_vacancy,"approver":element.first_name+" "+element.last_name,'no_of_pending_vacancy':element.no_of_pending_vacancy})
      })
      }
    })
  }

  getAllOfferCandidate(){
    let url='getAllCandiateOfferHistroy'
    this.service.get(url).subscribe((res)=>{
    this.tableData=res
    })
  }

}
