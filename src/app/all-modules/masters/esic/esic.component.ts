import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AllModulesService } from '../../all-modules.service';

@Component({
  selector: 'app-esic',
  templateUrl: './esic.component.html',
  styleUrls: ['./esic.component.css']
})
export class EsicComponent implements OnInit {
  esicMasterForm:FormGroup;
  editId: any;
  states: any;
  constructor(
    public _fb: FormBuilder,
    public _service: AllModulesService,
    public _activatedroute: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit(): void {
    const routeParam = this._activatedroute.snapshot.params;
    this.editId = routeParam.id;
    this.esicMasterForm = this._fb.group({
      state:['',Validators.required],
      effectiveDate:['',Validators.required],
      employeeContribution:['',Validators.required],
      employerContribution:['',Validators.required],
      maxAmount:['',Validators.required],
      status:['',],
    })
      this.getState();
      this.edit();
     
    }
    getState(){
      this._service.get("state/getStateList").subscribe((res)=>{
    this.states = res
      })
    }
    submit(){
      if (this.esicMasterForm.valid){
        let form = this.esicMasterForm.value
        var datePipe = new DatePipe('en-US');
        let  date = datePipe.transform(form.effectiveDate,'yyyy-MM-dd');
       let data = {
        stateName: form.state,
        maxAmountLimit: form.maxAmount,
        employeeContributionInPercentage: form.employeeContribution,
        employerContributionInPercentage: form.employerContribution,
        status: form.status,
        effectiveDate:date
       }
       this._service.add(data, 'addESICMaster').subscribe((res)=>{
        if(res.respose=="Success"){
          Swal.fire({
        
            icon: 'success',
            title: 'Employee Added Successfully',
            showConfirmButton: false,
            timer: 1500
          })
        
           this.router.navigate(['/layout/masters/esic'])
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
              this.esicMasterForm.markAllAsTouched();
            }  
  
  
      }
      edit(){
        if (this.editId == 'add'){
          return;
        }
        else{
          this._service.get('getESICMaster/'+this.editId).subscribe((res)=>{
            var datePipe = new DatePipe('en-US');
            let  date = datePipe.transform(res.effectiveDate,'yyyy-MM-dd');
          this.esicMasterForm.get('state').setValue(res.stateName)
          this.esicMasterForm.get('status').setValue(res.status)
          this.esicMasterForm.get('employeeContribution').setValue(res.employeeContributionInPercentage)
          this.esicMasterForm.get('employerContribution').setValue(res.employerContributionInPercentage)
          this.esicMasterForm.get('maxAmount').setValue(res.maxAmountLimit)
          this.esicMasterForm.get('maxAmount').setValue(res.maxAmountLimit)
          this.esicMasterForm.get('effectiveDate').setValue(date);
          })
        }
      }
      cancel(){
        this.router.navigate(['/layout/masters/ProvidentFund'])
      }
      update(){
        if (this.esicMasterForm.valid){
          let form = this.esicMasterForm.value
          var datePipe = new DatePipe('en-US');
          let  date = datePipe.transform(form.effectiveDate,'yyyy-MM-dd');
          
         let data = {
          stateName: form.state,
          maxAmountLimit: form.maxAmount,
          employeeContributionInPercentage: form.employeeContribution,
          employerContributionInPercentage: form.employerContribution,
          status: form.status,
          effectiveDate: date
         }
         this._service.add(data, 'updateESICMaster/'+this.editId).subscribe((res)=>{
          if(res.respose=="Success"){
            Swal.fire({
          
              icon: 'success',
              title: 'Data Added Successfully',
              showConfirmButton: false,
              timer: 1500
            })
          
             this.router.navigate(['/layout/masters/esic'])
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
                this.esicMasterForm.markAllAsTouched();
              }  
    
      }
  
    
      }
    
  
  