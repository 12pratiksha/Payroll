import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { format } from 'date-fns';
import { IMultiSelectOption } from 'ngx-bootstrap-multiselect';
import Swal from 'sweetalert2';
import { AllModulesService } from '../../all-modules.service';

@Component({
  selector: 'app-professional-tax',
  templateUrl: './professional-tax.component.html',
  styleUrls: ['./professional-tax.component.css']
})
export class ProfessionalTaxComponent implements OnInit {
  ptForm:FormGroup
  states: any;
  editId;
  selecteditems;
  selected;
  element: any;
  items = [  { id: 'january', name: 'January' },
                        { id: 'february', name: 'February' },
                        { id: 'march', name: 'March ' },
                        { id: 'april', name: 'April' },
                        { id: 'may', name: 'May' },
                        { id: 'june', name: 'June' },
                        { id: 'july', name: 'July' },
                        { id: 'august', name: 'August' },
                        { id: 'september', name: 'September' },
                        { id: 'october', name: 'October' },
                        { id: 'november', name: 'November' },
                        { id: 'december', name: 'December' },
                      ]
  ptDetails: { ptincomeFrom: any; ptincomeTo: any; ptamount: any; ptapplicableMonths: any[][]; };
  constructor(
    public _fb: FormBuilder,
    public _service: AllModulesService,
    public _activatedroute: ActivatedRoute,
    public router: Router,
    
    ) { }

  ngOnInit(): void {
    
  
    this.ptForm = this._fb.group({
      state:['',Validators.required],
      effectiveDate:['',Validators.required],
      gender:['',Validators.required],
      description:['',],
      status:['',],
      ptArray: this._fb.array([

      ])
    })
    
   
    this.getState();
    const routeParam = this._activatedroute.snapshot.params;
    this.editId = routeParam.id;
    if(this.editId != 'add'){
      this.edit();
    }
  }

  cancel(){
    const currentRoute = this.router.url;
  
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([currentRoute]); // navigate to same route
      }); 
  }

  addNewPtArray() {
    const add = this.ptForm.get('ptArray') as FormArray;
    add.push(this._fb.group({
      from:'',
      to:'',
      amount:'',
      months:'',
    }))
  }

  deleteNewPtArray(index: number) {
    const add = this.ptForm.get('ptArray') as FormArray;
    add.removeAt(index)
  }

  getState(){
    this._service.get("state/getStateList").subscribe((res)=>{
  this.states = res
    })
  }
  public pipe = new DatePipe("en-US");
  submit(){
    let details = [];

    let date = this.pipe.transform(
      this.ptForm.value.effectiveDate,
      "yyyy-MM-dd"
    );
 let arr = this.ptForm.value.ptArray
  
     for (let i = 0; i < arr.length; i++){

      let month = []
arr[i].months.forEach(element => {
month.push({months:element})
arr[i]['ptapplicableMonths'] = month 
});


this.ptDetails = {
  ptincomeFrom:arr[i].from,
  ptincomeTo:arr[i].to,
  ptamount:arr[i] .amount,
  ptapplicableMonths:month 

}

details.push(this.ptDetails)
     }


    let data =   {
      state: this.ptForm.value.state,
      gender: this.ptForm.value.gender,
      description: this.ptForm.value.description,
      status:this.ptForm.value.status,
      applicableDate: date,
      professionalTaxAddline: details
  }

this._service.add(data, "addProfessionalTaxMaster").subscribe((res)=>{
  //console.log(res)
  if(res.respose == "Success"){
    Swal.fire({
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    })
    this.router.navigate(['/layout/masters/pt'])
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
  form:any;
edit(){
  let url = "getProfessionalTaxMaster/"+this.editId
  if (this.editId){
   
    this._service.get(url).subscribe((res)=>{
      let date = this.pipe.transform(
        res.applicableDate,
        "yyyy-MM-dd"
      );
      this.ptForm.get('state').setValue(res.state)
      this.ptForm.get('gender').setValue(res.gender)
      this.ptForm.get('description').setValue(res.description)
      this.ptForm.get('status').setValue(res.status)
      this.ptForm.get('effectiveDate').setValue(date)

      let array =[];
       array = res.professionalTaxAddline.map(p => p.professionalTaxAddlineId)
      .filter((professionalTaxAddlineId, index, arr) => arr.indexOf(professionalTaxAddlineId) == index)
      .sort(); // sorting is optional
console.log(array);
for (let i = 0; i < array.length; i++){
  
 let month = []
 for (let j = 0; j < res.professionalTaxAddline.length; j++){
  

if(array[i]==res.professionalTaxAddline[j].professionalTaxAddlineId){
  this.form = res.professionalTaxAddline[j]
 res.professionalTaxAddline[j].ptapplicableMonths.forEach(element => {

  month.push(element.months)
});
}
 }

 const add = this.ptForm.get('ptArray') as FormArray;

 // console.log(month)
 add.push(this._fb.group({
   from: this.form.ptincomeFrom,
   to: this.form.ptincomeTo,
   amount:this.form.ptamount,
   months: [month],
 }))


}

    })
  }
}
update(){
  let details = [];

  let date = this.pipe.transform(
    this.ptForm.value.effectiveDate,
    "yyyy-MM-dd"
  );
let arr = this.ptForm.value.ptArray

   for (let i = 0; i < arr.length; i++){

    let month = []
arr[i].months.forEach(element => {
month.push({months:element})
arr[i]['ptapplicableMonths'] = month 
});


this.ptDetails = {
ptincomeFrom:arr[i].from,
ptincomeTo:arr[i].to,
ptamount:arr[i] .amount,
ptapplicableMonths:month 

}

details.push(this.ptDetails)
   }


  let data =   {
    state: this.ptForm.value.state,
    gender: this.ptForm.value.gender,
    description: this.ptForm.value.description,
    status:this.ptForm.value.status,
    applicableDate: date,
    professionalTaxAddline: details
}

this._service.add(data, "updateProfessionalTaxMaster/"+this.editId).subscribe((res)=>{
//console.log(res)
if(res.respose == "Success"){
  Swal.fire({
    icon: 'success',
    title: 'Your work has been saved',
    showConfirmButton: false,
    timer: 1500
  })
  this.router.navigate(['/layout/masters/pt'])
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
}