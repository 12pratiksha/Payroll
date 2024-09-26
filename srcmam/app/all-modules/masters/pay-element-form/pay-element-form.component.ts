import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AllModulesService } from '../../all-modules.service';

@Component({
  selector: 'app-pay-element-form',
  templateUrl: './pay-element-form.component.html',
  styleUrls: ['./pay-element-form.component.css']
})
export class PayElementFormComponent implements OnInit {
  payElementForm: FormGroup
  editId: any;
  constructor(
    public _fb:FormBuilder,
    public _activatedroute:ActivatedRoute,
    public router: Router,
    public _service: AllModulesService,
    ) { }

  ngOnInit(): void {
    const routeParam = this._activatedroute.snapshot.params;
    this.editId = routeParam.id;
    this.payElementForm = this._fb.group({
      name:['',Validators.required],
      condition:'',
      description:'',
      status:'',
    })
    if(this.editId != 'add'){
      this.edit();
    }
  }
  submit(){
  let form = this.payElementForm.value
  let data = {
    name:form.name,
    conduction:form.condition,
    lookupDescription:form.description,
    // "sysDefine":"Yes ",
    status: form.status

  }
  if(this.payElementForm.status=='VALID'){
this._service.add(data,'addPayElementMaster').subscribe((res)=>{
  if(res.respose == "Success"){
    Swal.fire({
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    })
    this.showTable();
  }
  else if(res.respose == "Already"){
    alert("Record already exists")
   }
   else{
    alert("something went wrong! try again later")
   }
})
  }
}
edit(){
  this._service.get('getPayElementMaster/'+this.editId).subscribe((res)=>{
    this.payElementForm.get('name').setValue(res.name)
    this.payElementForm.get('condition').setValue(res.conduction)
    this.payElementForm.get('description').setValue(res.lookupDescription)
    this.payElementForm.get('status').setValue(res.status)
  })
}
update(){
  let form = this.payElementForm.value
  let data = {
    name:form.name,
    conduction:form.condition,
    lookupDescription:form.description,
    // "sysDefine":"Yes ",
    status: form.status

  }
  if(this.payElementForm.status=='VALID'){
this._service.add(data,'updatePayElementMaster/'+this.editId).subscribe((res)=>{
  if(res.respose == "Success"){
    Swal.fire({
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    })
    const currentRoute = this.router.url;

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentRoute]); // navigate to same route
    }); 
  }
  else if(res.respose == "Already"){
    alert("Record already exists")
   }
   else{
    alert("something went wrong! try again later")
   }
})
  }
}
showTable(){
  this.router.navigate(['layout/masters/payElementMaster'])
}
cancel(){
  this.payElementForm.reset();
}
}
