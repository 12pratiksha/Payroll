import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  FormArray,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";
import { DatePipe } from "@angular/common";
import { Router } from "@angular/router";
import { AllModulesService } from "src/app/all-modules/all-modules.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-consultant-register',
  templateUrl: './consultant-register.component.html',
  styleUrls: ['./consultant-register.component.css']
})
export class ConsultantRegisterComponent implements OnInit {
  
    @ViewChild(DataTableDirective, { static: false })
    public dtElement: DataTableDirective;
    public dtOptions: DataTables.Settings = {};
    public dtTrigger: Subject<any> = new Subject();
    public pipe = new DatePipe("en-US");
    container : boolean = true;
    jobForm: FormGroup
  regId: any;
    constructor(
      private _service: AllModulesService,
      private formBuilder: FormBuilder,
      private toastr: ToastrService,
      private router: Router,
      private _fb: FormBuilder
    ) {}
  
    ngOnInit() {
      this.consultantList();
      this.jobForm = this._fb.group({
        consultantRegister:'',
        requestDate: '',
        newRequest: new FormArray([])  
      })
    
      this.dtOptions = {
        pageLength: 10,
        dom: "lrtip",
      };
  
  this.addRequest();
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
  
    createRequest(): FormGroup {  
      return this.formBuilder.group({  
        requesterName:['',],
        designation:['',],
        noOfVacancy:['',],
        qualification:['',],
        requiredExp:['',]
      });  
    }   
    newRequest: FormArray
    addRequest(): void {  
      this.newRequest = this.jobForm.get('newRequest') as FormArray;  
      this.newRequest.push(this.createRequest());  
    }  
  
    ngOnDestroy(): void {
      this.dtTrigger.unsubscribe();
    }
  
    remove(i:number) {
      this.newRequest.removeAt(i);
    }
    add(){
      console.log(this.jobForm)
      let url="AddConsultantRegisterMaster"
      let data={
        consultantRegister: this.jobForm.value.consultancy,
        requestDate: this.jobForm.value.requestDate,
        consultantRequirement: this.jobForm.value.newRequest
      }
    
    this._service.add(data,url).subscribe(res=>{
      console.log(res)
      if(res.respose == "Success"){
        Swal.fire({
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        })
        const currentRoute = this.router.url;
      
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([currentRoute]);
        }); 
      }
      else if(res.respose == "Already"){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Record Already Exists!',
      
        })
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
    quantities() : FormArray {
   return this.jobForm.get('newRequest') as FormArray;  
 }
    edit(item){
     this.showContainer();
      var datePipe = new DatePipe('en-US');
      let url="getByConsultantRegisterId/"+item.consultantRegisterId
      this._service.get(url).subscribe(res=>{
        
        let reqDate = datePipe.transform(res.requestDate, 'yyyy-MM-dd');
        this.jobForm.get('requestDate').setValue(reqDate)
        this.jobForm.get('consultantRegister').setValue(res.consultantRegister)
        res.consultantRequirement.forEach(element=>{

          this.quantities().push(this._fb.group({
            requesterName:element.requesterName,
            designation:element.designation,
            noOfVacancy:element.noOfVacancy,
            qualification:element.qualification,
            requiredExp:element.requiredExp
        }))
        })
     

      })
    }
    tableData:any=[];
consultantList(){
  let url="getAllConsultantRegisterList"
  this._service.get(url).subscribe(res=>{
    console.log(res)
    this.regId=res
    console.log(this.regId)
    res.forEach(element=>{
      
    
      this.tableData.push(element.consultantRequirement[0])
    })
   
    console.log(this.tableData)
  })
}
delete(item)
{
  console.log(item)
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
      Swal.fire({
        title: 'Loading...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading()
        }
      })
  let url="deleteConsultantRequirement/"+item.consultantRequirementId
  this._service.get(url).subscribe(res=>{
    if(res.respose=="Success"){
      Swal.fire({
  
        icon: 'success',
        title: 'Employee Deleted Successfully',
        showConfirmButton: false,
        timer: 1500,
        didOpen: () => {
          Swal.hideLoading()
        }
      })
     this.consultantList();
      const currentRoute = this.router.url;

      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([currentRoute]); 
      }); 
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
  })
}
  }
  