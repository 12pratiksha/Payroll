import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AllModulesService } from '../../all-modules.service';
import { IMultiSelectOption } from 'ngx-bootstrap-multiselect';

@Component({
  selector: 'app-provident-fund',
  templateUrl: './provident-fund.component.html',
  styleUrls: ['./provident-fund.component.css']
})
export class ProvidentFundComponent implements OnInit {
  pfMasterForm:FormGroup
  states: any;
  editId;
  myOptions: IMultiSelectOption[];
  optionsModel
  deductionOn: any = [];
  constructor(
    public _fb: FormBuilder,
    public _service: AllModulesService,
    public _activatedroute: ActivatedRoute,
    public router: Router
    ) { }

  ngOnInit(): void {
    const routeParam = this._activatedroute.snapshot.params;
    this.editId = routeParam.id;
    this.pfMasterForm = this._fb.group({
      state:['',],
      effectiveDate:['',Validators.required],
      employeeContribution:['',Validators.required],
      employerContribution:['',Validators.required],
      gender:['',Validators.required],
      maxAmountApplicable:['',Validators.required],
      deductionOn:['',],
      status:['',],
    })
    this._service.get("state/getStateList").subscribe((res)=>{
      this.states = res
    })
    this.edit();
    this.getPayelement()
  }

  onChange(d){}
  submit(){
    if (this.pfMasterForm.valid){
      let form = this.pfMasterForm.value
      var datePipe = new DatePipe('en-US');
      let  date = datePipe.transform(form.effectiveDate,'yyyy-MM-dd');
      form.deductionOn.forEach(element => {
        console.log(element)
          this.deductionOn.push({deductiOn:element})
           
          });
     let data = {
      state:form.state,
      gender:form.gender,
      maxAmountApplicable:form.maxAmountApplicable,
	    employeeContributionInPercentage:form.employeeContribution,
      employerContributionInPercentage:form.employerContribution,
	    pfstatus: form.status,
      pfeffectiveDate: date,
      providentfunddeductionon:this.deductionOn
     }
     this._service.add(data, 'addProvidentFundMaster').subscribe((res)=>{
      if(res.respose=="Success"){
        Swal.fire({
      
          icon: 'success',
          title: 'Data Added Successfully',
          showConfirmButton: false,
          timer: 1500
        })
      this.router.navigate(['/layout/masters/ProvidentFund'])
         
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
          else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
              
            })
            this.pfMasterForm.markAllAsTouched();
          }  
 

    }

    getPayelement(){

      let payElement:any=[]
          this._service.get('getAllPayElementMaster')
          .subscribe((res)=>{
          
            res.forEach(element => {
             
              let elements={id:element.name, name:element.name}
              payElement.push(elements)
            
            this.myOptions = payElement 
            });
        
          })
          
            }

    updateGrade = [];
    edit(){
      if (this.editId == 'add'){
        return;
      }
      else{
        this._service.get('getProvidentFundMaster/'+this.editId).subscribe((res)=>{
          var datePipe = new DatePipe('en-US');
          let  date = datePipe.transform(res.pfeffectiveDate,'yyyy-MM-dd');
         this.pfMasterForm.get('employeeContribution').setValue(res.employeeContributionInPercentage)
         this.pfMasterForm.get('employerContribution').setValue(res.employerContributionInPercentage)
         this.pfMasterForm.get('gender').setValue(res.gender)
         this.pfMasterForm.get('maxAmountApplicable').setValue(res.maxAmountApplicable)
        //  this.pfMasterForm.get('deductionOn').setValue(res.state)
         this.pfMasterForm.get('status').setValue(res.pfstatus)
         this.pfMasterForm.get('effectiveDate').setValue(date)
         this.pfMasterForm.get('state').setValue(res.state)

         res.providentfunddeductionon.forEach(element => {
          
     
        this.updateGrade.push(element.deductiOn)
        
      
        });
console.log(this.updateGrade)
        this.pfMasterForm.get('deductionOn').setValue(this.updateGrade)
        })
      }
    }
    cancel(){
      this.router.navigate(['/layout/masters/ProvidentFund'])
    }
    update(){
      if (this.pfMasterForm.valid){
        let form = this.pfMasterForm.value
        var datePipe = new DatePipe('en-US');
        let  date = datePipe.transform(form.effectiveDate,'yyyy-MM-dd');
        form.deductionOn.forEach(element => {
          console.log(element)
            this.deductionOn.push({deductiOn:element})
             
            });
       let data = {
        state:form.state,
        gender:form.gender,
        maxAmountApplicable:form.maxAmountApplicable,
        employeeContributionInPercentage:form.employeeContribution,
        employerContributionInPercentage:form.employerContribution,
        pfstatus: form.status,
        pfeffectiveDate: date,
        providentfunddeductionon:this.deductionOn
       }
       this._service.add(data, 'updateProvidentFundMaster/'+this.editId).subscribe((res)=>{
        if(res.respose=="Success"){
          Swal.fire({
        
            icon: 'success',
            title: 'Data Added Successfully',
            showConfirmButton: false,
            timer: 1500
          })
        this.router.navigate(['/layout/masters/ProvidentFund'])
           
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
            else{
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                
              })
              this.pfMasterForm.markAllAsTouched();
            }  
  
    }
  }

