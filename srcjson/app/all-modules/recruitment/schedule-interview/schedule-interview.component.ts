import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { AllModulesService } from "../../all-modules.service";

@Component({
  selector: 'app-schedule-interview',
  templateUrl: './schedule-interview.component.html',
  styleUrls: ['./schedule-interview.component.css']
})
export class ScheduleInterviewComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: true })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  public lstFees: any[];
  public url: any = "scheduletiming";

  constructor(
    private srvModuleService: AllModulesService,
    public router: Router
    ) { }

  ngOnInit() {
  	     this.loadFees();
    // for data table configuration
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };
  }
        // Get Fees List  Api Call
  loadFees() {
    this.srvModuleService.get(this.url).subscribe((data) => {
      this.lstFees = data;
      this.dtTrigger.next();
    });
  }


remark(){
  this.router.navigate(['/layout/recruitment/remarks'])
}


  // destroy data table when leaving
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
