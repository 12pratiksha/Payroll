import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { AllModulesService } from '../../all-modules.service';

@Component({
  selector: 'app-income-tax-declaration-form',
  templateUrl: './income-tax-declaration-form.component.html',
  styleUrls: ['./income-tax-declaration-form.component.css']
})
export class IncomeTaxDeclarationFormComponent implements OnInit {
incomeTax:FormGroup
  constructor(public fb:FormBuilder,public service:AllModulesService) { }

  ngOnInit(): void {
this.incomeTax=this.fb.group({
  companyName:[''],
  employeeId:[''],
  employeeName:[''],
  panOfemployee:[''],
  houseRentCheckbox:[''],
  homeLoanCheckbox:[''],
  principalPaid:[''],
  interestPaid:[''],
  lender:[''],
  lenderPan:[''],
  propertyDetailsCheckbox:[''],

  houseRent:this.fb.array([]),
  propertyDetails:this.fb.array([]),
  c80investmentsCheckbox:[''],
  d80investmentsCheckbox:[''],
  c80investments:this.fb.array([]),
  d80investments:this.fb.array([]),
  otherSourceCheckbox:[''],
  incomeFromOther:[''],
  interestEarnFromSaving:[''],
  interestEarnFromFixed:[''],
  deduction80CCCCCheckbox:[''],
  annuityPensionPlan:[''],
  appDeclareAmount:[''],
  deduction80CCCC1bCheckbox:[''],
  employeeContribution:[''],
  ecDeclareAmount:[''],
  deduction80CCDCheckbox:[''],
  notifiedPensionScheme:[''],
  npsDeclareAmount:[''],
  deduction24Checkbox:[''],
  deduction24:this.fb.array([]),
  
})
console.log(this.incomeTax)
  }
  

     
    


createRequest(): FormGroup {  
  return this.fb.group({ 
    fromDate:[''],
    toDate:[''],
    amount:[''],
    address:[''],
    metroOrNonMetro:[''],
    cityName:['']
  })
}

houseRent: FormArray
   addRequest(): void { 
    console.log() 
     this.houseRent = this.incomeTax.get('houseRent') as FormArray;  
     console.log(this.incomeTax)
     this.quantities().push(this.createRequest());  
   console.log(this.houseRent)
    }  
 
 
 
   remove(i:number) {
  console.log(this.houseRent)
     this.quantities().removeAt(i);
   }

   quantities() : FormArray {
    return this.incomeTax.get('houseRent') as FormArray;  
  }
//--------------------------Let Out Property Details------------------------------ 
  createRequest1(): FormGroup {  
    return this.fb.group({ 
      annualRentRecive:[''],
      municipalTaxesPaid:[''],
      netAnnualValue:[''],
      standarDeduction30OnNetAnnualValue:[''],
      repayingHomeLoanForThisPorperty:[''],
      netIncomeORLossOnHouseProperty:['']

    })
  }
  quantities1() : FormArray {
    return this.incomeTax.get('propertyDetails') as FormArray;  
  }

  propertyDetails:FormArray
addRequest1():void{
  this.propertyDetails=this.incomeTax.get('propertyDetails') as FormArray;
  this.quantities1().push(this.createRequest1());
}
remove1(i:number) {
  
     this.quantities1().removeAt(i);
   }
// -----------------------------C80investmentsCheckbox-----------------------
createRequest2():FormGroup{
  return this.fb.group({
    c80particulars:[''],
    c80declaredAmount:['']
  })
}

quantities2():FormArray{
  return this.incomeTax.get('c80investments') as FormArray;
}

c80investments:FormArray
addRequest2():void{
  this.c80investments=this.incomeTax.get('c80investments') as FormArray;
  this.quantities2().push(this.createRequest2());
}

remove2(i:number) {
  
  this.quantities2().removeAt(i);
}

// ----------------------d80investmentsCheckbox-------------------

createRequest3():FormGroup{
  return this.fb.group({
    particulars:[''],
    c80declaredAmount:['']
  })
}

quantities3():FormArray{
  return this.incomeTax.get('d80investments') as FormArray;
}

d80investments:FormArray
addRequest3():void{
  this.d80investments=this.incomeTax.get('d80investments') as FormArray;
  this.quantities3().push(this.createRequest3());
}

remove3(i:number) {
  
  this.quantities3().removeAt(i);
}

// --------------------------------deduction u/s 24----------------------------
createRequest4():FormGroup{
return this.fb.group({
  d24particulars:[''],
  d24declaredAmount:['']
})
}

quantities4():FormArray{
  return this.incomeTax.get('deduction24') as FormArray;
}
deduction24:FormArray
addRequest4():void{
this.deduction24=this.incomeTax.get('deduction24') as FormArray;
this.quantities4().push(this.createRequest4())
}

remove4(i:number) {
  
  this.quantities4().removeAt(i);
}


// ----------------------------------------------------------------------------

search(){
  let url='InsertIncomeTaxDeclarationForm'
  console.log(this.incomeTax.value)
  let form=this.incomeTax.value
  let data={
    "companyName": form.companyName,
    "employeeId": form.employeeId,
    "employeeName": form.employeeName,
    "panOfemployee": form.panOfemployee,
    "houseRentDetails": form.houseRent,
    "homeLoan": {
        "principlePaidOnHomeLoan": form.principalPaid,
        "interestPaidOnHomeLoan": form.interestPaid,
        "nameOfTheLander":form.lender,
        "landerPAN": form.lenderPan,
        "tdshldoc": [
            {
                "docName": "D1"
            },
            {
                "docName": " D2"
            }
        ]
    },
    "letOutPropertyDetails": form.propertyDetails,
    "c80Investments": form.c80investments,
    "d80Investments": form.d80investments,
    "otherInvestments": [
        {
           
                    "oiparticulars": "particulars",
                    "oimaxmumLimit": "0.0",
                    "oideclaredAmount": "0.0 ",
                    "tdsoidoc": [
                        {
                            "docName": "D1"
                        },
                        {
                            "docName": " D2"
                        }
                    ]
                
        }
    ],
    "otherSourcesofIncome": [
        {
           
                    "osoiparticulars": "particulars",
                    "osoimaxmumLimit": "0.0",
                    "osoideclaredAmount": "0.0 ",
                    "tdsosoidoc": [
                        {
                            "docName": "D1"
                        },
                        {
                            "docName": " D2"
                        }
                    ]
                
        }
    ]
  }
  console.log(data)
  this.service.add(data,url).subscribe((res)=>{
    console.log(res)
  })
}
}