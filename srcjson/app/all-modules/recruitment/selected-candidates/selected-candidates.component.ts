import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { AllModulesService } from "../../all-modules.service";
@Component({
  selector: 'app-selected-candidates',
  templateUrl: './selected-candidates.component.html',
  styleUrls: ['./selected-candidates.component.css']
})
export class SelectedCandidatesComponent implements OnInit {
  public dtElement: DataTableDirective;
  public dtTrigger: Subject<any> = new Subject();
  public lstFees: any[];
  tableData: any=[];
  designation: any;
  baseurl: string;
  dtOptions: { pagingType: string; pageLength: number; processing: boolean; dom: string; buttons: string[]; };

  constructor(
    private _service: AllModulesService,
    public router: Router
    ) { this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'print', 
        ]
    }; }

  ngOnInit() {

    this.baseurl=localStorage.getItem('baseurl')
    
    this.getDesignation();
  }



  offer(item,status){
  this.router.navigate(['/layout/recruitment/offer'],{queryParams:{recno:item.roundId,scheduleId:item.scheduleId,candidateid:item.candidateid,status:status}});
  
}

join(item){
  console.log(item)
  // this.router.navigate(['/layout/recruitment/candidateAppointment'],{queryParams:{recno:item.roundId,scheduleId:item.scheduleId,candidateid:item.candidateid}});
  
  this.router.navigate(['/layout/employees/employeeForm/add'],{queryParams:{recno:item.roundId,scheduleId:item.scheduleId,candidateid:item.candidateid,requirementId:item.requirementId}});
  
}

rejectOffer(item){
  console.log(item)
  this.router.navigate(['/layout/recruitment/candidateOfferReject'],{queryParams:{recno:item.roundId,scheduleId:item.scheduleId,candidateid:item.candidateid,requirementId:item.requirementId}});
  
}
  // destroy data table when leaving
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  getTableData(){
    let url='getSelectedCandiateList'
    this._service.get(url).subscribe(res=>{
      console.log(res)
  res.forEach(element => {
       
  let status="";
  if(element.main_status==1){
    status="Selected";
  }else{
    status="Not Selected";
  }
  
  let desg=element.designation;
  
  
  if( isNaN(desg)){
   }else{
    
    let result3 =this.designation.filter((design: any) =>
    (design.designationMasterId==desg) )
  desg = result3[0].name;
   }
  
     
      
          
          // console.log(this.cand)
          this.tableData.push({"phone":element.phone,"email":element.email,"cvName":element.cv_name,"desg":desg,"department_name":element.department_name,"status":status,interviewname:element.fname+" "+element.lname,"roundId":element.round_id,"round":element.round,"type":element.type,"onDate":element.on_date,"atTime":element.at_time,"firstName":element.first_name,"lastName":element.last_name,"requirementId":element.recruitmentid,"scheduleId":element.schedule_interview_for_round_id,"candidateid":element.applicant_candiate_id,"round_status":element.round_status})
      //})
        });
        
      }); 
   
     
    console.log(this.tableData) 
    
  }

  async getDesignation(){
    await this._service.get("getAllDesignationMaster").subscribe(async (res)=>{
      this.designation = res
      this.getTableData()

    })
  }
  

}
