import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AllModulesService } from '../../all-modules.service';
@Component({
  selector: 'app-coff-approval',
  templateUrl: './coff-approval.component.html',
  styleUrls: ['./coff-approval.component.css']
})
export class CoffApprovalComponent implements OnInit {
  tableData: any;
  applicationListForm:FormGroup
  @ViewChild(DataTableDirective)
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  datatableElement: DataTableDirective;
  empId: string;
  constructor(public fb : FormBuilder,public _service:AllModulesService) { }

  ngOnInit(): void {
  
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
    
    };
    this.applicationListForm = this.fb.group({
       fromDate:'',
       toDate:''
    })
    

  }

}
