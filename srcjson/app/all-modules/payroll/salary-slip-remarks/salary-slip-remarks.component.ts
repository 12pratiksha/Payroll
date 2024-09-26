import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { AllModulesService } from '../../all-modules.service';

@Component({
  selector: 'app-salary-slip-remarks',
  templateUrl: './salary-slip-remarks.component.html',
  styleUrls: ['./salary-slip-remarks.component.css']
})
export class SalarySlipRemarksComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  dtOptions: any = {};
  constructor(
    public _service: AllModulesService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'print'
        ]
    };
  }
  salaryDue(type){
    this.router.navigate(['layout/payroll/salarySlipRemarksForm/'+type])
  }
}
