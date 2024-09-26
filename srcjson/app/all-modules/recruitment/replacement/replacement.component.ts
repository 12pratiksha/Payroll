import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";
import { DatePipe } from "@angular/common";
import { Router } from "@angular/router";
import { AllModulesService } from "src/app/all-modules/all-modules.service";
@Component({
  selector: 'app-replacement',
  templateUrl: './replacement.component.html',
  styleUrls: ['./replacement.component.css']
})
export class ReplacementComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe("en-US");
  container : boolean = true;
  jobForm: FormGroup
  constructor(
    private _service: AllModulesService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private _fb: FormBuilder
  ) {}

  ngOnInit() {
   
    this.jobForm = this._fb.group({
      requestDate: '',
      department:'',
      against:'',
      hod:'',
      vacancy:'',
      jobDescription:'',
      expectedDoj:'',
      requiredExp:'',
      gender:'',
      requirement:'',
      passport:'',
      to: '',
      from:'',
      recruiter:''
    })
  
    this.dtOptions = {
      pageLength: 10,
      dom: "lrtip",
    };
  }

  hideContainer(){
    const currentRoute = this.router.url;

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentRoute]); 
    }); 
    this.container = true
  }

  showContainer(){
   this.container = false
  }

 
 
 

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }


}

