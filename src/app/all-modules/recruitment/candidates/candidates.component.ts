import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { AllModulesService } from "../../all-modules.service";
import {FormBuilder,FormGroup,FormControl,Validators,FormArray} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";
import { DatePipe } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css']
})
export class CandidatesComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe("en-US");
  container : boolean = false;
  scheduleContainer : boolean = false 
  candidatesForm: FormGroup
  scheduleForm: FormGroup
  constructor(
    private _service: AllModulesService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private _fb: FormBuilder
  ) {}

  ngOnInit() {
   
    // this.candidatesForm = this._fb.group({
    //   name: '',
    //   city:'',
    //   state:'',
    //   dob:'',
    //   email:'',
    //   phone:'',
    //   gender:'',
    //   requiredExp:'',
    //   skills:'',
    //   position:'',
    // })
  
    this.scheduleForm = this._fb.group({
      rounds:'',
      details:new FormArray([])
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
    this.container = false
  }

  showContainer(){
   this.container = true
  
  }

  schedule(){
    this.scheduleContainer = true
    this.container = true
  }
 
  create(): FormGroup {  
    return this.formBuilder.group({  
      interviewer: '',  
       date:'',
       time:'',
       remark:''
    });  
  } 

details : FormArray
  addItem(e): void {  
    this.details = this.scheduleForm.get('details') as FormArray;  
    while (this.details.length !== 0) {
      this.details.removeAt(0)
    }

    
    for (let i = 0; i < e; i ++){
      this.details.push(this.create());
    }
  }  

remove(i){
  this.details.removeAt(i)
  this.scheduleForm.get('rounds').setValue(this.details.length)
}

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }


}
