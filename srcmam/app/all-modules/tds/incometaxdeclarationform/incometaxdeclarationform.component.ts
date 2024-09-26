import { Event } from '@angular/router';
import { DatePipe } from '@angular/common';
import { data } from 'jquery';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AllModulesService } from '../../all-modules.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { error } from 'console';

@Component({
  selector: 'app-incometaxdeclarationform',
  templateUrl: './incometaxdeclarationform.component.html',
  styleUrls: ['./incometaxdeclarationform.component.css']
})
export class IncometaxdeclarationformComponent implements OnInit {
  type = new FormControl('')
  showMyContainer: boolean = false;
  incomeTax: FormGroup
  details: any;
  company: any;
  userType: string;
  employees: any;
  tableData: any;
  dtOptions: { pagingType: string; pageLength: number; processing: boolean; dom: string; buttons: string[]; };
  tableData2: any;
  editData: any;
  documents: any = [];
  year = [ "2021-2022", "2022-2023", "2023-2024", "2024-2025", "2025-2026","2026-2027","2027-2028","2028-2029","2029-2030"]
  status: any;
  houseRent1: any;
  houseRent2: any;
  homeLoan1: any;
  propertyDetails1: any=[];
  c80investments1: any=[];
  d80investments1: any=[];
  deduction241: any;
  documentsForHl: any=[];
  documentsForPD: any=[];
  documentsFor80c: any=[];
  documentsFor80d: any;
  documentsForOIS: any[];
  documentsFor80ccc: any[];
  documentsFor80cc1b: any[];
  documentsFor80ccd: any[];
  documentsForU24: any[];
  otherIncomeSource1: any[];
  baseUrl: any;
  // folderName: any;
  docNameForhR: any=[];
  doc: any;
  docNameForhL: any=[];
  docNameForoI: any=[];
  docNameForoSIncome: any=[];
  docNameForlOPD: any=[];
  docNameFordUC: any=[];
  docNameForCCC: any=[];
  docNameForCCC1b: any=[];
  docNameForCCD: any=[];
  docNameFordU24: any=[];
  doc80c: any=[];
  dHR: any=[];
  dHL: any=[];
  dU24: any;
  dCCC: any;
  dCCC1b: any;
  dCCD: any;
  docName: any=[];
  docName1: any=[];
  docNameForPD: any=[];
  docNameFor80d: any=[];
  docNameForOIS: any=[];
  docNameFord24: any=[];
  docNameForhR1: any=[];
  docNameForhL1: any=[];
  docNameForlOPD1: any=[];
  docNameForoI1: any=[];
  docNameFordUC1: any=[];
  docNameFordU241: any=[];
  docNameForoSIncome1: any=[];
  dPD: any;
  dOi: any;
  d80d: any;
  dU241: any;
  dIncome: any;
  tableDataArray: any=[];
  finalstatus: boolean;
  
  // dtOptions: { pagingType: string; pageLength: number; processing: boolean; dom: string; buttons: string[]; };
  constructor(public fb: FormBuilder, public service: AllModulesService, public router: Router, public datePipe: DatePipe) { }

  ngOnInit(): void {

    this.baseUrl=localStorage.getItem('baseUrl')
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'Bfrtip',
      buttons: [
        'copy', 'csv', 'excel', 'print',
      ]
    };



    this.incomeTax = this.fb.group({
      oldCheck:[''],
      newCheck:[''],
      companyName: [''],
      employeeId: [''],
      employeeName: [''],
      year:[''],
      panOfemployee: [''],
      houseRentCheckbox: [''],
      homeLoanCheckbox: [''],


      propertyDetailsCheckbox: [''],
      houseRent: this.fb.array([]),
      propertyDetails: this.fb.array([]),
      c80investmentsCheckbox: [''],
      d80investmentsCheckbox: [''],
      c80investments: this.fb.array([]),
      d80investments: this.fb.array([]),
      otherSourceCheckbox: [''],
      otherIncomeSource: this.fb.array([]),


      deduction80CCCCCheckbox: [''],
      annuityPensionPlan: [''],
      appDeclareAmount: [''],
      deduction80CCCC1bCheckbox: [''],
      employeeContribution: [''],
      ecDeclareAmount: [''],
      deduction80CCDCheckbox: [''],
      notifiedPensionScheme: [''],
      npsDeclareAmount: [''],
      deduction24Checkbox: [''],
      deduction24: this.fb.array([]),
      homeLoan: this.fb.array([]),
      tDeductionUS80CCCidoc:this.fb.array([]),
      deductionUS80CC1bdoc:this.fb.array([]),
      deductionUS80CCDdoc:this.fb.array([])



    })
    this.userType = localStorage.getItem('type')
    console.log(this.userType)
    this.getCompany();

    // this.getAllSave();
    this.getDetails();
    this.getAll();
    this.dU24=this.incomeTax.value.deduction24
    console.log(this.dU24)
    console.log(this.createRequest1())
  }

  showContainer() {
    this.showMyContainer = true

  }
  hideContainer() {

    this.showMyContainer = false
    this.cancel()

  }

  cancel() {
    const currentRoute = this.router.url;

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]);
    });
  }



  createRequest(): FormGroup {
    return this.fb.group({
      formDate: [''],
      toDate: [''],
      amount: [''],
      address: [''],
      metroOrNonMetro: [''],
      cityName: [''],
      pancard:[''],
      // tdshrddoc:['']
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



  remove(i: number) {
    console.log(this.houseRent)
    this.quantities().removeAt(i);
  }

  quantities(): FormArray {
    return this.incomeTax.get('houseRent') as FormArray;
  }
  //--------------------------Let Out Property Details------------------------------ 
  createRequest1(): FormGroup {
    return this.fb.group({
      annualRentRecive: [''],
      municipalTaxesPaid: [''],
      netAnnualValue: [''],
      standarDeduction30OnNetAnnualValue: [''],
      repayingHomeLoanForThisPorperty: [''],
      netIncomeORLossOnHouseProperty: [''],
      repayingprinciplePaidOnHomeLoan: [''],
      repayinginterestPaidOnHomeLoan: [''],
      repayingnameOfTheLander: [''],
      repayinglanderPAN: [''],
      // tdslopddoc:['']

    })
  }


  quantities1(): FormArray {
    return this.incomeTax.get('propertyDetails') as FormArray;
  }



  propertyDetails: FormArray
  addRequest1(): void {
    this.propertyDetails = this.incomeTax.get('propertyDetails') as FormArray;
    this.quantities1().push(this.createRequest1());
    console.log(this.quantities1())
  }
  remove1(i: number) {

    this.quantities1().removeAt(i);
  }

  //  createRequestForRepay():FormGroup{
  //   return this.fb.group({

  //   })
  //  }
  // -----------------------------C80investmentsCheckbox-----------------------
  createRequest2(): FormGroup {
    return this.fb.group({
      c80particulars: [''],
      c80declaredAmount: [''],
      // tdsc80doc:['']
    })
  }

  quantities2(): FormArray {
    return this.incomeTax.get('c80investments') as FormArray;
  }

  c80investments: FormArray
  addRequest2(): void {
    this.c80investments = this.incomeTax.get('c80investments') as FormArray;
    this.quantities2().push(this.createRequest2());
  }

  remove2(i: number) {

    this.quantities2().removeAt(i);
  }

  // ----------------------d80investmentsCheckbox-------------------

  createRequest3(): FormGroup {
    return this.fb.group({
      particulars: [''],
      declareAmount: [''],
      // deductionUnderchapter:['']

    })
  }

  quantities3(): FormArray {
    return this.incomeTax.get('d80investments') as FormArray;
  }

  d80investments: FormArray
  addRequest3(): void {
    this.d80investments = this.incomeTax.get('d80investments') as FormArray;
    this.quantities3().push(this.createRequest3());
  }

  remove3(i: number) {

    this.quantities3().removeAt(i);
  }

  // --------------------------------deduction u/s 24----------------------------
  createRequest4(): FormGroup {
    return this.fb.group({
      particulars: ['',Validators.required],
      declareAmount: ['',Validators.required],
      deductionUS24doc:['']
    })
  }

  quantities4(): FormArray {
    return this.incomeTax.get('deduction24') as FormArray;
  }
  deduction24: FormArray
  addRequest4(): void {
    this.deduction24 = this.incomeTax.get('deduction24') as FormArray;
    this.quantities4().push(this.createRequest4())
  }

  remove4(i: number) {

    this.quantities4().removeAt(i);
  }
  //--------------------------------HomeLoan-------------------------------------
  createRequest5(): FormGroup {
    return this.fb.group({
      principlePaidOnHomeLoan: [''],
      interestPaidOnHomeLoan: [''],
      nameOfTheLander: [''],
      landerPAN: [''],
      // tdsHomeLoandoc:['']
    })
  }

  quantities5(): FormArray {
    return this.incomeTax.get('homeLoan') as FormArray;
  }
  homeLoan: FormArray
  addRequest5(): void {
    this.homeLoan = this.incomeTax.get('homeLoan') as FormArray;
    this.quantities5().push(this.createRequest5())
  }

  remove5(i: number) {

    this.quantities5().removeAt(i);
  }
  //----------------------------------otherIncomeSource---------------------
  createRequestForOther(): FormGroup {
    return this.fb.group({
      incomeFromOtherSources: [''],
      interestEarnedFromSavingsDeposit: [''],
      interestEarnedFromFixedDeposits: [''],
      // tdsosoidoc:['']
    })
  }
  otherIncomeSource: FormArray
  addOtherSourceIncome(): void {
    this.otherIncomeSource = this.incomeTax.get('otherIncomeSource') as FormArray;
    this.otherIncomeSourceQuantities().push(this.createRequestForOther())
  }

  otherIncomeSourceQuantities(): FormArray {
    return this.incomeTax.get('otherIncomeSource') as FormArray;
  }

  removeOtherSourceIncome(i: number) {
    this.otherIncomeSourceQuantities().removeAt(i)

  }



  // ----------------------------------------------------------------------------

  getCompany() {
    this.service.get('getAllCompanyInformationList').subscribe((res) => {
      this.company = res
    })
  }
  getDetails() {
    console.log(this.userType)
    if (this.userType != 'Admin') {
      let id = localStorage.getItem('empid')
      let url = "employee_master/getemployee/" + id
      this.service.get(url).subscribe((res) => {
        // console.log(res)
        this.details = res

        let compRes = this.company.filter((com: any) =>
          (com.companyInformationId == res.company))
        this.incomeTax.get('companyName').setValue(compRes[0].companyName)
        this.incomeTax.get('employeeName').setValue(res.payeeName)
        this.incomeTax.get('panOfemployee').setValue(res.panNo)
      })
    }
    else {

      this.service.get('getAllCompanyInformationList').subscribe((res) => {
        this.company = res
      })
      this.service.get("employee_master/getemployees").subscribe((data) => {
        this.employees = data;


      });
    }


  }

  save() {
    let url = 'InsertIncomeTaxDeclarationForm'
    console.log(this.incomeTax.value)
    let form = this.incomeTax.value
    let hR = this.incomeTax.value.houseRent
    console.log(hR)
    this.houseRent1=[];
    hR.forEach(element => {

      console.log(element.fromDate)
        const parsedDate1 = new Date(element.formDate);
console.log(parsedDate1)
        const dateArray1 = [
        parsedDate1.getFullYear(),  
        parsedDate1.getMonth() + 1, 
        parsedDate1.getDate()      
        ];
        console.log(dateArray1)
        const parsedDate2 = new Date(element.toDate);

        const dateArray2 = [
        parsedDate2.getFullYear(),  
        parsedDate2.getMonth() + 1, 
        parsedDate2.getDate()      
        ];
        console.log(parsedDate2)
        
        this.houseRent1.push({

        "formDate": dateArray1,
        "toDate": dateArray2,
        "amount": element.amount,
        "address": element.address,
        "metroOrNonMetro": element.metroOrNonMetro,
        "cityName": element.cityName,
        "pancard":element.pancard,
        "tdshrddoc": this.documents
      })

    });

this.homeLoan1=[];
    let hL=this.incomeTax.value.homeLoan
    hL.forEach(element => {
this.homeLoan1.push({
  "principlePaidOnHomeLoan":element.principlePaidOnHomeLoan,
  "interestPaidOnHomeLoan":element.interestPaidOnHomeLoan,
  "nameOfTheLander":element.nameOfTheLander,
  "landerPAN":element.landerPAN,
  "tdsHomeLoandoc":[]

})


      
    });
    this.propertyDetails1=[];
    let lOPD=this.incomeTax.value.propertyDetails
    lOPD.forEach(element => {
      this.propertyDetails1.push({
      "annualRentRecive": element.annualRentRecive,
      "municipalTaxesPaid": element.municipalTaxesPaid,
      "netAnnualValue": element.netAnnualValue,
      "standarDeduction30OnNetAnnualValue": element.standarDeduction30OnNetAnnualValue,
      "repayingHomeLoanForThisPorperty": element.repayingHomeLoanForThisPorperty,
      "netIncomeORLossOnHouseProperty": element.netIncomeORLossOnHouseProperty,
      "repayingprinciplePaidOnHomeLoan":element.repayingprinciplePaidOnHomeLoan,
      "repayinginterestPaidOnHomeLoan":element.repayinginterestPaidOnHomeLoan,
      "repayingnameOfTheLander": element.repayingnameOfTheLander,
      "repayinglanderPAN": element.repayinglanderPAN, 
      "tdslopddoc":[]
      })
      
    });
    this.c80investments1=[];
    let c80=this.incomeTax.value.c80investments
    c80.forEach(element => {
      this.c80investments1.push({
        "c80particulars": element.c80particulars,
        "c80declaredAmount":element.c80declaredAmount,
        "tdsc80doc":[]

      })
      
    });
    this.d80investments1=[]; 
    let d80=this.incomeTax.value.d80investments
    d80.forEach(element => {
      this.d80investments1.push({
        "particulars": element.particulars,
        "declareAmount":element.declareAmount ,
        "deductionUnderchapter":[]
      })
      
    });
    this.deduction241=[];
    let d24=this.incomeTax.value.deduction24
    d24.forEach(element => {
      this.deduction241.push({
        "particulars": element.particulars,
      "declareAmount":element.declareAmount,
      "deductionUS24doc":[]
        
      })
      
    });
    this.otherIncomeSource1=[];
    let OSIncome=this.incomeTax.value.otherIncomeSource
    OSIncome.forEach(element => {
      this.otherIncomeSource1.push({
      "incomeFromOtherSources": element.incomeFromOtherSources,
          "interestEarnedFromSavingsDeposit": element.interestEarnedFromSavingsDeposit,
          "interestEarnedFromFixedDeposits": element.interestEarnedFromFixedDeposits,
          "tdsosoidoc":[] 
      })
      
    });
let c1:any;
let c2:any;
let c3:any;
let c4:any;
let c5:any;
let c6:any;
let c7:any;
let c8:any;
let c9:any;
let c10:any;

    if(form.houseRentCheckbox==true){
       c1=1;
    }
    else{
      c1=0
    }

    if(form.homeLoanCheckbox==true){
      c2=1;
   }
   else{
     c2=0
   }
   if(form.c80investmentsCheckbox==true){
    c3=1
   }
   else{
    c3=0
   }
   if(form.propertyDetailsCheckbox==true){
    c4=1
   }
   else{
    c4=0
   }
   if(form.d80investmentsCheckbox==true){
    c5=1
   }
   else{
    c5=0
   }
   if(form.otherSourceCheckbox==true){
    c6=1
   }
   else{
    c6=0
   }
   if(form.deduction80CCCCCheckbox==true){
    c7=1
   }
   else{
    c7=0
   }
   if(form.deduction80CCCC1bCheckbox==true){
    c8=1
   }
   else{
    c8=0
   }
   if(form.deduction80CCDCheckbox==true){
    c9=1
   }else{
    c9=0
   }
   if(form.deduction24Checkbox==true){
    c10=1
   }else{
    c10=0
   }
    
    console.log(this.type)
    let data = {
      "newOld":this.type.value,
      "companyName": form.companyName,
      "employeeId": form.employeeId,
      "status1": 0,
      "year":form.year,
      "employeeName": form.employeeName,
      "panOfemployee": form.panOfemployee,
      "houseRentDetails": this.houseRent1,
      "houseRentDetailsAdded": c1,
      "homeLoanDetails1Added": c2,
      "c80InvestmentsAdded": c3,
      "letOutPropertyDetailsAdded":c4 ,
      "deductionUnderchapterAdded":c5 ,
      "otherSourcesofIncomeAdded": c6,
      "deductionUS80CCCAdded": c7,
      "deductionUS80CC1bAdded":c8 ,
      "deductionUS80CCDAdded":c9 ,
      "deductionUS24Added": c10,
      "homeLoan": this.homeLoan1,
      
      "letOutPropertyDetails": this.propertyDetails1,
      "c80Investments": this.c80investments1,
      "otherSourcesofIncome": this.otherIncomeSource1,
      //   {

      //     "incomeFromOtherSources": form.incomeFromOtherSources,
      //     "interestEarnedFromSavingsDeposit": form.interestEarnedFromSavingsDeposit,
      //     "interestEarnedFromFixedDeposits": form.interestEarnedFromFixedDeposits,
      //     "tdsosoidoc":[]
          
      //   }
      // ],
      "deductionUnderchapter": this.d80investments1,
      "deductionUS80CCC": [
        {

          "annuityPensionPlan": form.annuityPensionPlan,
          "declareAmount": form.appDeclareAmount,
          "tDeductionUS80CCCidoc":[]
          

        }
      ],
      "deductionUS80CC1b": [
        {

          "employeeContribution": form.employeeContribution,
          "declareAmount": form.ecDeclareAmount,
          "deductionUS80CC1bdoc":[]
          

        }
      ],
      "deductionUS80CCD": [
        {

          "notifiedPensionScheme": form.notifiedPensionScheme,
          "declareAmount": form.npsDeclareAmount,
          "deductionUS80CCDdoc":[]
          
        }
      ],
      "deductionUS24": this.deduction241
    }
    console.log(data)
    this.service.add(data, url).subscribe((res) => {
      console.log(res)
      if (res.respose == 'Success') {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: res.message,

        })
      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',

        })
      }
    })
  }

  submit() {
    let url = 'InsertIncomeTaxDeclarationForm' 
    console.log(this.incomeTax.value)
    let form = this.incomeTax.value
   
    let hR = this.incomeTax.value.houseRent
    this.houseRent1=[];
    
    hR.forEach(element => {
      console.log(element.formDate+"   "+element.toDate)
        const parsedDate1 = new Date(element.formDate);
        console.log(parsedDate1)
        const dateArray1 = [
        parsedDate1.getFullYear(),  
        parsedDate1.getMonth()+1, 
        parsedDate1.getDate()      
        ];
        console.log(dateArray1)
       
        const date2=new Date(element.toDate);
        console.log(date2)

        const dateArray2=[
          date2.getFullYear(),
          date2.getMonth()+1,
          date2.getDate()

        ];

        this.houseRent1.push({

        "formDate": dateArray1,
        "toDate": dateArray2,
        "amount": element.amount,
        "address": element.address,
        "metroOrNonMetro": element.metroOrNonMetro,
        "cityName": element.cityName,
        "pancard":element.pancard,
        "tdshrddoc": this.documents
      })

    });

this.homeLoan1=[];
    let hL=this.incomeTax.value.homeLoan
    hL.forEach(element => {
this.homeLoan1.push({
  "principlePaidOnHomeLoan":element.principlePaidOnHomeLoan,
  "interestPaidOnHomeLoan":element.interestPaidOnHomeLoan,
  "nameOfTheLander":element.nameOfTheLander,
  "landerPAN":element.landerPAN,
  "tdsHomeLoandoc":[]

})


      
    });
    this.propertyDetails1=[];
    let lOPD=this.incomeTax.value.propertyDetails
    lOPD.forEach(element => {
      this.propertyDetails1.push({
      "annualRentRecive": element.annualRentRecive,
      "municipalTaxesPaid": element.municipalTaxesPaid,
      "netAnnualValue": element.netAnnualValue,
      "standarDeduction30OnNetAnnualValue": element.standarDeduction30OnNetAnnualValue,
      "repayingHomeLoanForThisPorperty": element.repayingHomeLoanForThisPorperty,
      "netIncomeORLossOnHouseProperty": element.netIncomeORLossOnHouseProperty,
      "repayingprinciplePaidOnHomeLoan":element.repayingprinciplePaidOnHomeLoan,
      "repayinginterestPaidOnHomeLoan":element.repayinginterestPaidOnHomeLoan,
      "repayingnameOfTheLander": element.repayingnameOfTheLander,
      "repayinglanderPAN": element.repayinglanderPAN, 
      "tdslopddoc":[]
      })
      
    });
    this.c80investments1=[];
    let c80=this.incomeTax.value.c80investments
    c80.forEach(element => {
      this.c80investments1.push({
        "c80particulars": element.c80particulars,
        "c80declaredAmount":element.c80declaredAmount,
      "tdsc80doc":[]

      })
      
    });
    this.d80investments1=[];
    let d80=this.incomeTax.value.d80investments
    d80.forEach(element => {
      this.d80investments1.push({
        "particulars": element.particulars,
        "declareAmount":element.declareAmount ,
        "deductionUnderchapter":[]
      })
      
    });
    this.deduction241=[];
    let d24=this.incomeTax.value.deduction24
    d24.forEach(element => {
      this.deduction241.push({
        "particulars": element.particulars,
      "declareAmount":element.declareAmount,
      "deductionUS24doc":[]
        
      })
      
    });
    this.otherIncomeSource1=[];
    let OSIncome=this.incomeTax.value.otherIncomeSource
    OSIncome.forEach(element => {
      this.otherIncomeSource1.push({
      "incomeFromOtherSources": element.incomeFromOtherSources,
          "interestEarnedFromSavingsDeposit": element.interestEarnedFromSavingsDeposit,
          "interestEarnedFromFixedDeposits": element.interestEarnedFromFixedDeposits,
          "tdsosoidoc":[] 
      })
      
    });

    let c1:any;
let c2:any;
let c3:any;
let c4:any;
let c5:any;
let c6:any;
let c7:any;
let c8:any;
let c9:any;
let c10:any;

    if(form.houseRentCheckbox==true){
       c1=1;
    }
    else{
      c1=0
    }

    if(form.homeLoanCheckbox==true){
      c2=1;
   }
   else{
     c2=0
   }
   if(form.c80investmentsCheckbox==true){
    c3=1
   }
   else{
    c3=0
   }
   if(form.propertyDetailsCheckbox==true){
    c4=1
   }
   else{
    c4=0
   }
   if(form.d80investmentsCheckbox==true){
    c5=1
   }
   else{
    c5=0
   }
   if(form.otherSourceCheckbox==true){
    c6=1
   }
   else{
    c6=0
   }
   if(form.deduction80CCCCCheckbo==true){
    c7=1
   }
   else{
    c7=0
   }
   if(form.deduction80CCCC1bCheckbox==true){
    c8=1
   }
   else{
    c8=0
   }
   if(form.deduction80CCDCheckbox==true){
    c9=1
   }else{
    c9=0
   }
   if(form.deduction24Checkbox==true){
    c10=1
   }else{
    c10=0
   }
    
    
    let data = {
      "newOld":this.type.value,
      "companyName": form.companyName,
      "employeeId": form.employeeId,
      "status1": 1,
      "year":form.year,
      "employeeName": form.employeeName,
      "panOfemployee": form.panOfemployee,
      "houseRentDetails": this.houseRent1,
      "houseRentDetailsAdded": c1,
      "homeLoanDetails1Added": c2,
      "c80InvestmentsAdded": c3,
      "letOutPropertyDetailsAdded": c4,
      "deductionUnderchapterAdded": c5,
      "otherSourcesofIncomeAdded": c6,
      "deductionUS80CCCAdded": c7,
      "deductionUS80CC1bAdded": c8,
      "deductionUS80CCDAdded": c9,
      "deductionUS24Added": c10,
      "homeLoan": this.homeLoan1,
      
      "letOutPropertyDetails": this.propertyDetails1,
      "c80Investments": this.c80investments1,
      "otherSourcesofIncome":this.otherIncomeSource1,
      //   {

      //     "incomeFromOtherSources": form.incomeFromOtherSources,
      //     "interestEarnedFromSavingsDeposit": form.interestEarnedFromSavingsDeposit,
      //     "interestEarnedFromFixedDeposits": form.interestEarnedFromFixedDeposits,
      //     "tdsosoidoc":[]
          
      //   }
      // ],
      "deductionUnderchapter": this.d80investments1,
      "deductionUS80CCC": [
        {

          "annuityPensionPlan": form.annuityPensionPlan,
          "declareAmount": form.appDeclareAmount,
          "tDeductionUS80CCCidoc":[]
          

        }
      ],
      "deductionUS80CC1b": [
        {

          "employeeContribution": form.employeeContribution,
          "declareAmount": form.ecDeclareAmount,
          "tDeductionUS80CCCidoc":[]
          

        }
      ],
      "deductionUS80CCD": [
        {

          "notifiedPensionScheme": form.notifiedPensionScheme,
          "declareAmount": form.npsDeclareAmount,
          "deductionUS80CCDdoc":[]
          
        }
      ],
      "deductionUS24": this.deduction241
    }
    console.log(data)
    this.service.add(data, url).subscribe((res) => {
      console.log(res)
      if (res.respose == 'Success') {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: res.message,

        })
        const currentRoute = this.router.url;

        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([currentRoute]);
        }); 
      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',

        })
      }
    })
  }

  getAll() {
    let url = 'getAllIncomeTaxDeclarationForm'
    this.service.get(url).subscribe((res) => {
      console.log(res)
     res.forEach(element => {
      // if(element.c80InvestmentsAdded==2 && element.deductionUS24Added==2 && element.deductionUS80CC1bAdded==2 && element.deductionUS80CCCAdded==2 && element.deductionUS80CCDAdded==2 && element.deductionUnderchapterAdded==2 && element.homeLoanDetails1Added==2 && element.houseRentDetailsAdded==2 && element.letOutPropertyDetailsAdded==2 && element.otherSourcesofIncomeAdded==2){
      //   this.finalstatus==true
      //}
      // else{
      //   this.finalstatus==false 
      //}
    })
    this.tableData=res
      
    })
  }

  uploadMultipleDocuments(event,i) {
    this
    console.log(event.target.files)
    this.documents=[];
    for ( let i = 0; i <= event.target.files.length; i++) {
      console.log(event.target.files[i])
      const file = event.target.files[i];
      const formData = new FormData();
      formData.append('file', file);
      this.service.uploadFile(formData, "uploadTdsDoc").subscribe((res) => {
    
        
        this.documents.push({'docName': res.data.docName})
        console.log(this.documents);
      })
      
      


    }
    this.docName[i]=this.documents
      console.log(this.docName[i])



  }
  uploadMultipleDocuments1(event,i){
    for (let i = 0; i <= event.target.files.length; i++) {
      console.log(event.target.files[i])

      const file = event.target.files[i];


      const formData = new FormData();
      formData.append('file', file);
      console.log(file)
      this.service.uploadFile(formData, "uploadTdsDoc").subscribe((res) => {
        console.log(res)
        this.documentsForHl.push({'docName': res.data.docName})
      })
      console.log(this.documentsForHl)


    } 
    this.docName1[i]=this.documentsForHl
  }
  uploadMultipleDocumentsForPD(event,i){
    this.documentsForPD=[];
    for (let i = 0; i <= event.target.files.length; i++) {
      console.log(event.target.files[i])

      const file = event.target.files[i];


      const formData = new FormData();
      formData.append('file', file);
      console.log(file)
      this.service.uploadFile(formData, "uploadTdsDoc").subscribe((res) => {
        console.log(res)
        this.documentsForPD.push({'docName': res.data.docName})
      })
      console.log(this.documentsForPD)


    }
    this.docNameForPD[i]=this.documentsForPD 
  }
  uploadMultipleDocumentsFor80c(event,i){
    this.documentsFor80c=[];
    for (let i = 0; i <= event.target.files.length; i++) {
      console.log(event.target.files[i])

      const file = event.target.files[i];


      const formData = new FormData();
      formData.append('file', file);
      console.log(file)
      this.service.uploadFile(formData, "uploadTdsDoc").subscribe((res) => {
        console.log(res)
        this.documentsFor80c.push({'docName': res.data.docName})
      })
     
      console.log(this.documentsFor80c)


    } 
    this.doc80c[i]=this.documentsFor80c
  }
  uploadMultipleDocumentsFord80(event,i){
    this.documentsFor80d=[];
    for (let i = 0; i <= event.target.files.length; i++) {
      console.log(event.target.files[i])

      const file = event.target.files[i];


      const formData = new FormData();
      formData.append('file', file);
      console.log(file)
      this.service.uploadFile(formData, "uploadTdsDoc").subscribe((res) => {
        console.log(res)
        this.documentsFor80d.push({'docName': res.data.docName})
      })
      console.log(this.documentsFor80d)


    }
    this.docNameFor80d[i]=this.documentsFor80d

  }
  uploadMultipleDocumentsForOIS(event,i){
    this.documentsForOIS=[];
    for (let i = 0; i <= event.target.files.length; i++) {
      console.log(event.target.files[i])

      const file = event.target.files[i];


      const formData = new FormData();
      formData.append('file', file);
      console.log(file)
      this.service.uploadFile(formData, "uploadTdsDoc").subscribe((res) => {
        console.log(res)
        this.documentsForOIS.push({'docName': res.data.docName})
      })
      console.log(this.documentsForOIS)


    }
     this.docNameForOIS[i]=this.documentsForOIS
  }
  uploadMultipleDocumentsFor80ccc(event){
    this.documentsFor80ccc=[];
    for (let i = 0; i <= event.target.files.length; i++) {
      console.log(event.target.files[i])

      const file = event.target.files[i];


      const formData = new FormData();
      formData.append('file', file);
      console.log(file)
      this.service.uploadFile(formData, "uploadTdsDoc").subscribe((res) => {
        console.log(res)
        this.documentsFor80ccc.push({'docName': res.data.docName})
      })
      console.log(this.documentsFor80ccc)


    }
  }
  uploadMultipleDocumentsFor80cc1b(event){
    this.documentsFor80cc1b=[];
    for (let i = 0; i <= event.target.files.length; i++) {
      console.log(event.target.files[i])

      const file = event.target.files[i];


      const formData = new FormData();
      formData.append('file', file);
      console.log(file)
      this.service.uploadFile(formData, "uploadTdsDoc").subscribe((res) => {
        console.log(res)
        this.documentsFor80cc1b.push({'docName': res.data.docName})
      })
      console.log(this.documentsFor80cc1b)


    }
  } 
  uploadMultipleDocumentsFor80ccd(event){
    this.documentsFor80ccd=[];
    for (let i = 0; i <= event.target.files.length; i++) {
      console.log(event.target.files[i])

      const file = event.target.files[i];


      const formData = new FormData();
      formData.append('file', file);
      console.log(file)
      this.service.uploadFile(formData, "uploadTdsDoc").subscribe((res) => {
        console.log(res)
        this.documentsFor80ccd.push({'docName': res.data.docName})
      })
      console.log(this.documentsFor80ccd)


    }
  }
  uploadMultipleDocumentsForU24(event,i){
    this.documentsForU24=[];
    for (let i = 0; i <= event.target.files.length; i++) {
      console.log(event.target.files[i])

      const file = event.target.files[i];


      const formData = new FormData();
      formData.append('file', file);
      console.log(file)
      this.service.uploadFile(formData, "uploadTdsDoc").subscribe((res) => {
        console.log(res)
        this.documentsForU24.push({'docName': res.data.docName})
      })
      console.log(this.documentsForU24)


    }
    this.docNameFord24[i]=this.documentsForU24
  }
  

  edit(item) {
    this.editData = item
    this.status=item.status1
    console.log(item)
    let url = "getIncomeTaxDeclarationFormById/" + `${item.incomeTaxdeclarationform3Id}`
    this.service.get(url).subscribe((res) => {
      console.log(res)
      let form = res.data
      this.doc=this.baseUrl+res.data.docurl
      console.log(form.newOld)
      this.type.setValue(form.newOld) 
      this.incomeTax.get('companyName').setValue(form.companyName)
      this.incomeTax.get('employeeName').setValue(form.employeeName)
      this.incomeTax.get('panOfemployee').setValue(form.panOfemployee)
      this.incomeTax.get('year').setValue(form.year)
      this.incomeTax.get('houseRentCheckbox').setValue(form.houseRentDetailsAdded)
      this.incomeTax.get('homeLoanCheckbox').setValue(form.homeLoanDetails1Added)
      this.incomeTax.get('c80investmentsCheckbox').setValue(form.c80InvestmentsAdded)
      this.incomeTax.get('propertyDetailsCheckbox').setValue(form.letOutPropertyDetailsAdded)
      this.incomeTax.get('d80investmentsCheckbox').setValue(form.deductionUnderchapterAdded)
      this.incomeTax.get('otherSourceCheckbox').setValue(form.otherSourcesofIncomeAdded)
      this.incomeTax.get('deduction80CCCCCheckbox').setValue(form.deductionUS80CCCAdded)
      this.incomeTax.get('deduction80CCCC1bCheckbox').setValue(form.deductionUS80CC1bAdded)
      this.incomeTax.get('deduction80CCDCheckbox').setValue(form.deductionUS80CCDAdded)
      this.incomeTax.get('deduction24Checkbox').setValue(form.deductionUS24Added)
      let hR = res.data.houseRentDetails
      
      for(let i=0;i<=hR?.length-1;i++){
        this.docNameForhR=[];
        
        let d1 = hR[i].tdshrddoc
        console.log(d1.length)
       for(let i=0; i<=d1?.length-1; i++){
          console.log([i])
          this.docNameForhR.push({'docName': d1[i].docName}) 
       }
        this.docNameForhR1[i]=this.docNameForhR
        console.log([i]+this.docNameForhR1[i])

        let toDate=this.datePipe.transform(hR[i].toDate,'dd-MM-yyyy');
        

        let fromDate = this.datePipe.transform(hR[i].formDate,'dd-MM-yyyy');
       
        console.log(toDate)
        console.log(fromDate)
        this.quantities().push(this.fb.group({

          formDate: fromDate,
          toDate: toDate,
          amount: hR[i].amount,
          address: hR[i].address,
          metroOrNonMetro: hR[i].metroOrNonMetro,
          cityName: hR[i].cityName,
          pancard:hR[i].pancard,
          
          

        }))
      }



      let hL = res.data.homeLoan
      for(let i=0;i<=hL?.length-1;i++){
        this.docNameForhL=[];
        let d2=hL[i].tdsHomeLoandoc
        for(let i=0; i<=d2?.length-1; i++){
          this.docNameForhL.push({'docName':d2[i].docName})
        }
        this.docNameForhL1[i]=this.docNameForhL
        
        this.quantities5().push(this.fb.group({
          principlePaidOnHomeLoan: hL[i].principlePaidOnHomeLoan,
          interestPaidOnHomeLoan: hL[i].interestPaidOnHomeLoan,
          nameOfTheLander: hL[i].nameOfTheLander,
          landerPAN: hL[i].landerPAN,
        }))
      }

      let lOPD = res.data.letOutPropertyDetails
      for(let i=0;i<=lOPD?.length-1;i++){
        this.docNameForlOPD=[];
        let d3=lOPD[i].tdslopddoc
        for(let i=0; i<=d3?.length-1; i++){
          this.docNameForlOPD.push({'docName':d3[i].docName})
        }
        this.docNameForlOPD1[i]=this.docNameForlOPD
        
        console.log(lOPD[i])
        this.quantities1().push(this.fb.group({
          annualRentRecive: lOPD[i].annualRentRecive,
          municipalTaxesPaid: lOPD[i].municipalTaxesPaid,
          netAnnualValue: lOPD[i].netAnnualValue,
          standarDeduction30OnNetAnnualValue: lOPD[i].standarDeduction30OnNetAnnualValue,
          repayingHomeLoanForThisPorperty: lOPD[i].repayingHomeLoanForThisPorperty,
          netIncomeORLossOnHouseProperty: lOPD[i].netIncomeORLossOnHouseProperty,
          repayingprinciplePaidOnHomeLoan: lOPD[i].repayingprinciplePaidOnHomeLoan,
          repayinginterestPaidOnHomeLoan: lOPD[i].repayinginterestPaidOnHomeLoan,
          repayingnameOfTheLander: lOPD[i].repayingnameOfTheLander,
          repayinglanderPAN: lOPD[i].repayinglanderPAN,
        }))

      }
      let oI = res.data.c80Investments
      for(let i=0;i<=oI?.length-1;i++){
        this.docNameForoI=[];
        let d4=oI[i].tdsc80doc
        for(let i=0; i<=d4?.length-1; i++){
          this.docNameForoI.push({'docName':d4[i].docName})
        }
        this.docNameForoI1[i]=this.docNameForoI
       
        this.quantities2().push(this.fb.group({
          c80particulars: oI[i].c80particulars,
          c80declaredAmount: oI[i].c80declaredAmount
        }))

      }
      let dUC = res.data.deductionUnderchapter
      for(let i=0;i<=dUC?.length-1;i++){
        console.log(dUC[i])
        this.docNameFordUC=[];
        let d5=dUC[i].deductionUnderchapterdoc
        for(let i=0;i<=d5?.length-1;i++){
          this.docNameFordUC.push({'docName':d5[i].docName})
        }
        this.docNameFordUC1[i]=this.docNameFordUC
        console.log(this.docNameFordUC1)
        
        this.quantities3().push(this.fb.group({
          particulars: dUC[i].particulars,
          declareAmount: dUC[i].declareAmount

        }))

      }

      let CCC = res.data.deductionUS80CCC
      CCC.forEach(element => {
        let d6=element.tdeductionUS80CCCidoc
        d6.forEach(element => {
          this.docNameForCCC.push({'docName':element.docName})
          
        });
       
        this.incomeTax.get('annuityPensionPlan').setValue(element.annuityPensionPlan)
        this.incomeTax.get('appDeclareAmount').setValue(element.declareAmount)
        // this.incomeTax.get('interestEarnFromFixed').setValue(element.interestEarnedFromSavingsDeposit)


      });

      let CCC1b = res.data.deductionUS80CC1b
      CCC1b.forEach(element => {
        let d7=element.deductionUS80CC1bdoc
        d7.forEach(element => {
          this.docNameForCCC1b.push({'docName':element.docName})
        });
        
        this.incomeTax.get('employeeContribution').setValue(element.employeeContribution)
        this.incomeTax.get('ecDeclareAmount').setValue(element.declareAmount)
        // this.incomeTax.get('interestEarnFromFixed').setValue(element.interestEarnedFromSavingsDeposit)


      });

      let CCD = res.data.deductionUS80CCD
      CCD.forEach(element => {
        let d8=element.deductionUS80CCDdoc
        d8.forEach(element => {
          this.docNameForCCD.push({'docName':element.docName})
        });
       
        this.incomeTax.get('notifiedPensionScheme').setValue(element.notifiedPensionScheme)
        this.incomeTax.get('npsDeclareAmount').setValue(element.declareAmount)
        // this.incomeTax.get('interestEarnFromFixed').setValue(element.interestEarnedFromSavingsDeposit)


      });


      let dU24 = res.data.deductionUS24
      for(let i=0;i<=dU24?.length-1;i++){
        this.docNameFordU24=[];
        let d9=dU24[i].deductionUS24doc
        for(let i=0;i<=d9?.length-1;i++){
          this.docNameFordU24.push({'docName':d9[i].docName})
        }
        this.docNameFordU241[i]=this.docNameFordU24
       
        this.quantities4().push(this.fb.group({
          particulars: dU24[i].particulars,
          declareAmount: dU24[i].declareAmount
        }))

      }

      let oSIncome = res.data.otherSourcesofIncome
      for(let i=0;i<=oSIncome?.length-1;i++){
        this.docNameForoSIncome=[];
        let d10=oSIncome[i].tdsosoidoc
        for(let i=0;i<=d10?.length-1;i++){
          this.docNameForoSIncome.push({'docName':d10[i].docName})
        }
        this.docNameForoSIncome1[i]=this.docNameForoSIncome
       
        console.log(oSIncome[i])
        this.otherIncomeSourceQuantities().push(this.fb.group({
          incomeFromOtherSources: oSIncome[i].incomeFromOtherSources,
          interestEarnedFromSavingsDeposit: oSIncome[i].interestEarnedFromSavingsDeposit,
          interestEarnedFromFixedDeposits: oSIncome[i].interestEarnedFromFixedDeposits,
        }))
      
        

      }


    })
    this.showContainer();
  }
  delete(id) {
    Swal.fire({
      title: 'Do you really want to delete ?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
    let url = 'DeleteIncomeTaxDeclarationFormById/' + id
    this.service.get(url).subscribe((res) => {
      if (res.respose == 'Success') {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: "IncomeTax Details Deleted Successfully!"

        })
        const currentRoute = this.router.url;

        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([currentRoute]);
        });
      }
      else {
        this.getDetails();
      }
    })
  }
  else{
    Swal.fire({
      icon:'error',
      title:'Error',
      text:'Something went wrong'
    })
  }
})
  }

  // getAllSave() {
  //   let url = 'getAllSaveIncomeTaxDeclarationForm'
  //   this.service.get(url).subscribe((res) => {
  //     console.log(res)
  //     this.tableData2 = res
  //   })
  // }

  update() {
   
    let url = 'UpdateIncomeTaxDeclarationForm/' + this.editData.incomeTaxdeclarationform3Id
    console.log(this.incomeTax)
    let form = this.incomeTax.value
    
    let hR = this.incomeTax.value.houseRent
    let url1 = "getIncomeTaxDeclarationFormById/" + `${this.editData.incomeTaxdeclarationform3Id}`
    this.service.get(url1).subscribe((res)=>{
    this.houseRent1=[];
    this.dHR=[];
  for(let i=0;i<=hR?.length-1;i++){
    if(this.docName[i]?.length!=0 && this.docNameForhR1[i]?.length==0){
      // alert(111)
      this.dHR=this.docName[i]
    }
    else if(this.docName[i]?.length==0 && this.docNameForhR1[i]?.length!=0){
      this.dHR=this.docNameForhR1[i]
    }
    else if(this.docName[i]?.length!=0 && this.docNameForhR1[i]?.length!=0){
    this.dHR=this.docNameForhR1[i]
      
     
      // alert(22)
      console.log(this.docName[i])
      console.log(this.docNameForhR1[i])

    }
    else {
      // alert(33)
      this.dHR=this.docNameForhR1[i]
    }

    
    console.log(hR[i])

        const parsedDate1 = new Date(hR[i].formDate);
    console.log(parsedDate1)
    const dateArray1 = [
    parsedDate1.getFullYear(),  
    parsedDate1.getMonth() + 1, 
    parsedDate1.getDate()      
    ];
    console.log(hR[i].formDate)
    console.log(hR[i].toDate)

const parsedDate2 = new Date(hR[i].toDate);
console.log(parsedDate2)



const dateArray2 = [
parsedDate2.getFullYear(),  
parsedDate2.getMonth() + 1, 
parsedDate2.getDate()      
];
console.log(dateArray2)

this.houseRent1.push({

    "formDate": dateArray1,
    "toDate": dateArray2,
    "amount": hR[i].amount,
    "address": hR[i].address,
    "metroOrNonMetro": hR[i].metroOrNonMetro,
    "cityName": hR[i].cityName,
    "pancard":hR[i].pancard,
    "tdshrddoc": this.dHR
  })


  }
     
     this.homeLoan1=[]; 
     this.dHL=[];
  let hL=this.incomeTax.value.homeLoan
  for(let i=0;i<=hL?.length-1;i++) {
    if(this.docName1[i]?.length!=0 && this.docNameForhL1[i]?.length==0){
      this.dHL=this.docName1[i]
    }
    else if(this.docName1[i]?.length==0 && this.docNameForhL1[i]?.length!=0){
      this.dHL=this.docNameForhL1[i]

    }
    else if(this.docName1[i]?.length!=0 && this.docNameForhL1[i]?.length!=0)
    {
      this.dHL=this.docNameForhL1[i] 
    }
    else{
      this.dHL=this.docNameForhL1[i]
    }

    this.homeLoan1.push({
  "principlePaidOnHomeLoan":hL[i].principlePaidOnHomeLoan,
  "interestPaidOnHomeLoan":hL[i].interestPaidOnHomeLoan,
  "nameOfTheLander":hL[i].nameOfTheLander,
  "landerPAN":hL[i].landerPAN,
  "tdsHomeLoandoc":this.dHL

}) 
  }
//   if (this.docNameForhL?.length!=0 || this.documentsForHl?.length==0){
//     this.homeLoan1=[];
//     let hL=this.incomeTax.value.homeLoan
//     console.log(this.documentsForHl)
//     this.dHL=this.docNameForhL
//     hL.forEach(element => {
    
//     this.homeLoan1.push({
//   "principlePaidOnHomeLoan":element.principlePaidOnHomeLoan,
//   "interestPaidOnHomeLoan":element.interestPaidOnHomeLoan,
//   "nameOfTheLander":element.nameOfTheLander,
//   "landerPAN":element.landerPAN,
//   "tdsHomeLoandoc":this.dHL

// })
// });

//   }else if(this.docNameForhL?.length!=0 || this.documentsForHl?.length!=0){
   
//     let hL=this.incomeTax.value.homeLoan
//     console.log(this.documentsForHl)
   
//     for(let i=0;i<=this.docName1.length;i++){
//       this.homeLoan1=[];
//       this.dHL=this.docName1[i]
//       console.log(this.dHL)
//     hL.forEach(element => {
    
// this.homeLoan1.push({
//   "principlePaidOnHomeLoan":element.principlePaidOnHomeLoan,
//   "interestPaidOnHomeLoan":element.interestPaidOnHomeLoan,
//   "nameOfTheLander":element.nameOfTheLander,
//   "landerPAN":element.landerPAN,
//   "tdsHomeLoandoc":this.dHL

// })


      
//     });
//   }

//   }
//   else{
//     this.homeLoan1=[];
//     let hL=this.incomeTax.value.homeLoan
//     this.dHL=this.docNameForhL
//     hL.forEach(element => {
//     this.homeLoan1.push({
//   "principlePaidOnHomeLoan":element.principlePaidOnHomeLoan,
//   "interestPaidOnHomeLoan":element.interestPaidOnHomeLoan,
//   "nameOfTheLander":element.nameOfTheLander,
//   "landerPAN":element.landerPAN,
//   "tdsHomeLoandoc":this.dHL

// })
//     })

//   }
this.dPD=[];
this.propertyDetails1=[];
let lOPD=this.incomeTax.value.propertyDetails
for(let i=0;i<=lOPD?.length-1;i++) {
  if(this.docNameForPD[i]?.length!=0 && this.docNameForlOPD1[i]?.length==0){
    this.dPD=this.docNameForPD[i]
  }
  else if(this.docNameForPD[i]?.length==0 && this.docNameForlOPD1[i]?.length!=0){
    this.dPD=this.docNameForlOPD1[i]
  }
  else if(this.docNameForPD[i]?.length!=0 && this.docNameForlOPD1[i]?.length!=0){
    this.dPD=this.docNameForlOPD1[i] 
  }
  else{
    this.dPD=this.docNameForlOPD1[i]  
  }
      this.propertyDetails1.push({
      "annualRentRecive": lOPD[i].annualRentRecive,
      "municipalTaxesPaid": lOPD[i].municipalTaxesPaid,
      "netAnnualValue": lOPD[i].netAnnualValue,
      "standarDeduction30OnNetAnnualValue": lOPD[i].standarDeduction30OnNetAnnualValue,
      "repayingHomeLoanForThisPorperty": lOPD[i].repayingHomeLoanForThisPorperty,
      "netIncomeORLossOnHouseProperty": lOPD[i].netIncomeORLossOnHouseProperty,
      "repayingprinciplePaidOnHomeLoan":lOPD[i].repayingprinciplePaidOnHomeLoan,
      "repayinginterestPaidOnHomeLoan":lOPD[i].repayinginterestPaidOnHomeLoan,
      "repayingnameOfTheLander": lOPD[i].repayingnameOfTheLander,
      "repayinglanderPAN": lOPD[i].repayinglanderPAN, 
    "tdslopddoc":this.dPD
      })

}

  
  // if(this.docNameForlOPD?.length!=0 || this.documentsForPD?.length==0){
  //   let dPD=this.docNameForlOPD
  //   this.propertyDetails1=[];
  //   let lOPD=this.incomeTax.value.propertyDetails
  //   lOPD.forEach(element => {
  //     this.propertyDetails1.push({
  //     "annualRentRecive": element.annualRentRecive,
  //     "municipalTaxesPaid": element.municipalTaxesPaid,
  //     "netAnnualValue": element.netAnnualValue,
  //     "standarDeduction30OnNetAnnualValue": element.standarDeduction30OnNetAnnualValue,
  //     "repayingHomeLoanForThisPorperty": element.repayingHomeLoanForThisPorperty,
  //     "netIncomeORLossOnHouseProperty": element.netIncomeORLossOnHouseProperty,
  //     "repayingprinciplePaidOnHomeLoan":element.repayingprinciplePaidOnHomeLoan,
  //     "repayinginterestPaidOnHomeLoan":element.repayinginterestPaidOnHomeLoan,
  //     "repayingnameOfTheLander": element.repayingnameOfTheLander,
  //     "repayinglanderPAN": element.repayinglanderPAN, 
  //   "tdslopddoc":dPD
  //     })
      
  //   });
  // }
  // else if(this.docNameForlOPD?.length!=0 || this.documentsForPD?.length!=0){
  //   for(let i=0; i<=this.docNameForPD.length;i++){
  //     console.log(i)
  //     this.propertyDetails1=[];
  //   let dPD=this.docNameForPD[i]
  //   console.log(dPD)
    
  //   let lOPD=this.incomeTax.value.propertyDetails
  //   lOPD.forEach(element => {
  //     this.propertyDetails1.push({
  //     "annualRentRecive": element.annualRentRecive,
  //     "municipalTaxesPaid": element.municipalTaxesPaid,
  //     "netAnnualValue": element.netAnnualValue,
  //     "standarDeduction30OnNetAnnualValue": element.standarDeduction30OnNetAnnualValue,
  //     "repayingHomeLoanForThisPorperty": element.repayingHomeLoanForThisPorperty,
  //     "netIncomeORLossOnHouseProperty": element.netIncomeORLossOnHouseProperty,
  //     "repayingprinciplePaidOnHomeLoan":element.repayingprinciplePaidOnHomeLoan,
  //     "repayinginterestPaidOnHomeLoan":element.repayinginterestPaidOnHomeLoan,
  //     "repayingnameOfTheLander": element.repayingnameOfTheLander,
  //     "repayinglanderPAN": element.repayinglanderPAN, 
  //     "tdslopddoc":dPD
  //     })
      
  //   });
  // }
  // }
  // else{
  //   let dPD=this.docNameForlOPD
  //   this.propertyDetails1=[];
  //   let lOPD=this.incomeTax.value.propertyDetails
  //   lOPD.forEach(element => {
  //     this.propertyDetails1.push({
  //     "annualRentRecive": element.annualRentRecive,
  //     "municipalTaxesPaid": element.municipalTaxesPaid,
  //     "netAnnualValue": element.netAnnualValue,
  //     "standarDeduction30OnNetAnnualValue": element.standarDeduction30OnNetAnnualValue,
  //     "repayingHomeLoanForThisPorperty": element.repayingHomeLoanForThisPorperty,
  //     "netIncomeORLossOnHouseProperty": element.netIncomeORLossOnHouseProperty,
  //     "repayingprinciplePaidOnHomeLoan":element.repayingprinciplePaidOnHomeLoan,
  //     "repayinginterestPaidOnHomeLoan":element.repayinginterestPaidOnHomeLoan,
  //     "repayingnameOfTheLander": element.repayingnameOfTheLander,
  //     "repayinglanderPAN": element.repayinglanderPAN, 
  //     "tdslopddoc":dPD
  //     })
      
  //   }); 
  // }
  this.dOi=[];
  this.c80investments1=[];
    let c80=this.incomeTax.value.c80investments
    for(let i=0;i<=c80?.length-1;i++) {
      if(this.doc80c[i]?.length!=0 && this.docNameForoI1[i]?.length==0){
        this.dOi=this.doc80c[i]
      }
      else if(this.doc80c[i]?.length==0 && this.docNameForoI1[i]?.length!=0){
        this.dOi=this.docNameForoI1[i]
      }
      else if(this.doc80c[i]?.length==0 && this.docNameForoI1[i]?.length!=0){
        this.dOi=this.docNameForoI1[i] 

      }
      else{
        this.dOi=this.docNameForoI1[i]
      }
      this.c80investments1.push({
        "c80particulars": c80[i].c80particulars,
      "c80declaredAmount":c80[i].c80declaredAmount,
      "tdsc80doc":this.dOi

      })
    }
      

  // if(this.docNameForoI?.length!=0 || this.documentsFor80c?.length==0){
  //   this.c80investments1=[];
  //   let c80=this.incomeTax.value.c80investments
  //   let dOi=this.docNameForoI
  //   c80.forEach(element => {
  //     this.c80investments1.push({
  //       "c80particulars": element.c80particulars,
  //     "c80declaredAmount":element.c80declaredAmount,
  //     "tdsc80doc":dOi

  //     })
      
  //   });
  // }
  // else if(this.docNameForoI?.length!=0 || this.documentsFor80c?.length!=0){
  //   // alert("new")
    
  //   let c80=this.incomeTax.value.c80investments
  //   for(let i=0;i<=this.doc80c.length;i++){
  //     this.c80investments1=[];
  //   let dOi=this.doc80c[i]
  //   c80.forEach(element => {
  //     this.c80investments1.push({
  //       "c80particulars": element.c80particulars,
  //     "c80declaredAmount":element.c80declaredAmount,
  //     "tdsc80doc":dOi

  //     })
      
  //   }); 
  // }
  // }
  // else{
  //   this.c80investments1=[];
  //   let c80=this.incomeTax.value.c80investments
  //   let dOi=this.docNameForoI
  //   c80.forEach(element => {
  //     this.c80investments1.push({
  //       "c80particulars": element.c80particulars,
  //     "c80declaredAmount":element.c80declaredAmount,
  //     "tdsc80doc":dOi

  //     })
      
  //   }); 
  // }
  this.d80investments1=[];
  this.d80d=[];
    let d80=this.incomeTax.value.d80investments
  for(let i=0;i<=d80?.length-1;i++){
if(this.docNameFor80d[i]?.length!=0 && this.docNameFordUC1[i]?.length==0){
  alert(i)
  console.log(this.docNameFor80d[i])
this.d80d=this.docNameFor80d[i]
}
else if(this.docNameFor80d[i]?.length==0 && this.docNameFordUC1[i]?.length!=0){
  alert(2)
  this.d80d=this.docNameFordUC1[i]
}
else if(this.docNameFor80d[i]?.length!=0 && this.docNameFordUC1[i]?.length!=0){
  alert(3)
  this.d80d=this.docNameFordUC1[i]
}
else{
  this.d80d=this.docNameFordUC1[i]
}
    this.d80investments1.push({
              "particulars": d80[i].particulars,
              "declareAmount":d80[i].declareAmount ,
              "deductionUnderchapterdoc":this.d80d
            })
  } 
// if(this.docNameFordUC?.length!=0 || this.documentsFor80d==0){
//     this.d80investments1=[];
//     let d80d=this.docNameFordUC
//     let d80=this.incomeTax.value.d80investments
//     d80.forEach(element => {
//       this.d80investments1.push({
//         "particulars": element.particulars,
//         "declareAmount":element.declareAmount ,
//         "deductionUnderchapterdoc":d80d
//       })
      
//     });
//   }
//   else if(this.docNameFordUC?.length!=0 || this.documentsFor80d!=0){
    
//     for(let i=0;i<=this.docNameFor80d.length;i++){
//     let d80d=this.docNameFor80d[i]
//     this.d80investments1=[];
//     let d80=this.incomeTax.value.d80investments
//     d80.forEach(element => {
//       this.d80investments1.push({
//         "particulars": element.particulars,
//         "declareAmount":element.declareAmount ,
//         "deductionUnderchapterdoc":d80d
//       })
      
//     });
//   }
//   }
//   else{
//     this.d80investments1=[];
//     let d80d=this.docNameFordUC
//     let d80=this.incomeTax.value.d80investments
//     d80.forEach(element => {
//       this.d80investments1.push({
//         "particulars": element.particulars,
//         "declareAmount":element.declareAmount ,
//         "deductionUnderchapterdoc":d80d
//       })
      
//     });
//   }
this.deduction241=[];
  this.dU241=[];
    let d24=this.incomeTax.value.deduction24
    for(let i=0;i<=d24?.length-1;i++){
      if(this.docNameFord24[i]?.length!=0 && this.docNameFordU241[i]==0){
        alert(1)
        this.dU241=this.docNameFord24[i]
      }
      else if(this.docNameFord24[i]?.length==0 && this.docNameFordU241[i]!=0){
        alert(2)
        this.dU241=this.docNameFordU241[i]
      }
      else if(this.docNameFord24[i]?.length!=0 && this.docNameFordU241[i]!=0){
        alert(3)
        this.dU241=this.docNameFordU241[i]
      }
      else{
        this.dU241=this.docNameFordU241[i]
      }

      this.deduction241.push({
              "particulars": d24[i].particulars,
            "declareAmount":d24[i].declareAmount,
            "deductionUS24doc":this.dU241
              
            }) 

    }



  // if(this.docNameFordU24?.length!=0 || this.documentsForU24?.length==0){
  //   this.deduction241=[];
  // let dU24=this.docNameFordU24
  //   let d24=this.incomeTax.value.deduction24
  //   d24.forEach(element => {
  //     this.deduction241.push({
  //       "particulars": element.particulars,
  //     "declareAmount":element.declareAmount,
  //     "deductionUS24doc":dU24
        
  //     })
      
  //   });
  // }
  // else if(this.docNameFordU24?.length!=0 || this.documentsForU24?.length!=0){
  //   for(let i=0; i<=this.docNameFord24.length;i++){
  //   this.deduction241=[];
  // let dU24=this.docNameFord24[i]
  //   let d24=this.incomeTax.value.deduction24
  //   d24.forEach(element => {
  //     this.deduction241.push({
  //       "particulars": element.particulars,
  //     "declareAmount":element.declareAmount,
  //     "deductionUS24doc":dU24
        
  //     })
      
  //   });
  // }
  // }
  // else{
  //   this.deduction241=[];
  //   let dU24=this.docNameFordU24
  //     let d24=this.incomeTax.value.deduction24
  //     d24.forEach(element => {
  //       this.deduction241.push({
  //         "particulars": element.particulars,
  //       "declareAmount":element.declareAmount,
  //       "deductionUS24doc":dU24
          
  //       })
        
  //     });
  // }

  this.otherIncomeSource1=[];
  this.dIncome=[];
    let OSIncome=this.incomeTax.value.otherIncomeSource
    for(let i=0;i<=OSIncome?.length-1;i++){
      if(this.docNameForOIS[i]?.length!=0 && this.docNameForoSIncome1[i]==0){
        this.dIncome=this.docNameForOIS[i]
      }
      else if(this.docNameForOIS[i]?.length==0 && this.docNameForoSIncome1[i]!=0){
        this.dIncome=this.docNameForoSIncome1[i]
      }
      else if(this.docNameForOIS[i]?.length!=0 && this.docNameForoSIncome1[i]!=0){
        this.dIncome=this.docNameForoSIncome1[i] 
      }
      else{
        this.dIncome=this.docNameForoSIncome1[i] 
      }
   
      this.otherIncomeSource1.push({
      "incomeFromOtherSources": OSIncome[i].incomeFromOtherSources,
          "interestEarnedFromSavingsDeposit": OSIncome[i].interestEarnedFromSavingsDeposit,
          "interestEarnedFromFixedDeposits": OSIncome[i].interestEarnedFromFixedDeposits,
          "tdsosoidoc": this.dIncome
      })
    }


  // if(this.docNameForoSIncome?.length!=0 || this.documentsForOIS?.length==0 ){
  //   this.otherIncomeSource1=[];
  //   let dIncome=this.docNameForoSIncome
  //   let OSIncome=this.incomeTax.value.otherIncomeSource
  //   OSIncome.forEach(element => {
  //     this.otherIncomeSource1.push({
  //     "incomeFromOtherSources": element.incomeFromOtherSources,
  //         "interestEarnedFromSavingsDeposit": element.interestEarnedFromSavingsDeposit,
  //         "interestEarnedFromFixedDeposits": element.interestEarnedFromFixedDeposits,
  //         "tdsosoidoc": dIncome
  //     })
      
  //   });
  // }
  //   else if(this.docNameForoSIncome?.length!=0 || this.documentsForOIS?.length!=0 ){

  //   for(let i=0; i<=this.docNameForOIS.length;i++){
  //   this.otherIncomeSource1=[];
  //   let dIncome=this.docNameForOIS[i]
  //   let OSIncome=this.incomeTax.value.otherIncomeSource
  //   OSIncome.forEach(element => {
  //     this.otherIncomeSource1.push({
  //     "incomeFromOtherSources": element.incomeFromOtherSources,
  //         "interestEarnedFromSavingsDeposit": element.interestEarnedFromSavingsDeposit,
  //         "interestEarnedFromFixedDeposits": element.interestEarnedFromFixedDeposits,
  //         "tdsosoidoc": dIncome
  //     })
      
  //   });
  // }
  // }
  // else{
  //   this.otherIncomeSource1=[];
  //   let dIncome=this.docNameForoSIncome
  //   let OSIncome=this.incomeTax.value.otherIncomeSource
  //   OSIncome.forEach(element => {
  //     this.otherIncomeSource1.push({
  //     "incomeFromOtherSources": element.incomeFromOtherSources,
  //         "interestEarnedFromSavingsDeposit": element.interestEarnedFromSavingsDeposit,
  //         "interestEarnedFromFixedDeposits": element.interestEarnedFromFixedDeposits,
  //         "tdsosoidoc": dIncome
  //     })
      
  //   }); 
  // }

  if(this.docNameForCCC?.length!=0 || this.documentsFor80ccc?.length==0){
    this.dCCC=this.docNameForCCC
  }
  else if(this.docNameForCCC?.length!=0 || this.documentsFor80ccc?.length!=0){
    this.dCCC=this.documentsFor80ccc

  }
  else{
    this.dCCC=this.docNameForCCC 
  }

  if(this.docNameForCCC1b?.length!=0 || this.documentsFor80cc1b?.length==0){
    this.dCCC1b=this.docNameForCCC1b
  }
  else if(this.docNameForCCC1b?.length!=0 || this.documentsFor80cc1b?.length!=0){
    this.dCCC1b=this.documentsFor80cc1b

  }
  else{
    this.dCCC1b=this.docNameForCCC1b 
  }

  if(this.docNameForCCD?.length!=0 || this.documentsFor80ccd?.length==0){
    this.dCCD=this.docNameForCCD
  }
  else if(this.docNameForCCD?.length!=0 || this.documentsFor80ccd?.length!=0){
    this.dCCD=this.documentsFor80ccd

  }
  else{
    this.dCCD=this.docNameForCCD 
  }
  let c1:any;
  let c2:any;
  let c3:any;
  let c4:any;
  let c5:any;
  let c6:any;
  let c7:any;
  let c8:any;
  let c9:any;
  let c10:any;
  
      if(form.houseRentCheckbox==true){
         c1=1;
      }
      else{
        c1=0
      }
  
      if(form.homeLoanCheckbox==true){
        c2=1;
     }
     else{
       c2=0
     }
     if(form.c80investmentsCheckbox==true){
      c3=1
     }
     else{
      c3=0
     }
     if(form.propertyDetailsCheckbox==true){
      c4=1
     }
     else{
      c4=0
     }
     if(form.d80investmentsCheckbox==true){
      c5=1
     }
     else{
      c5=0
     }
     if(form.otherSourceCheckbox==true){
      c6=1
     }
     else{
      c6=0
     }
     if(form.deduction80CCCCCheckbox==true){
      c7=1
     }
     else{
      c7=0
     }
     if(form.deduction80CCCC1bCheckbox==true){
      c8=1
     }
     else{
      c8=0
     }
     if(form.deduction80CCDCheckbox==true){
      c9=1
     }else{
      c9=0
     }
     if(form.deduction24Checkbox==true){
      c10=1
     }else{
      c10=0
     } 
    console.log(this.type)
    let data = {
      "newOld":this.type.value,
      "companyName": form.companyName,
      "employeeId": form.employeeId,
      "status1": 1,
      "year":form.year,
      "employeeName": form.employeeName,
      "panOfemployee": form.panOfemployee,
      "houseRentDetails": this.houseRent1,
      "houseRentDetailsAdded": c1,
      "homeLoanDetails1Added": c2,
      "c80InvestmentsAdded":c3,
      "letOutPropertyDetailsAdded":c4 ,
      "deductionUnderchapterAdded": c5,
      "otherSourcesofIncomeAdded": c6,
      "deductionUS80CCCAdded": c7,
      "deductionUS80CC1bAdded": c8,
      "deductionUS80CCDAdded": c9,
      "deductionUS24Added": c10,
      "homeLoan": this.homeLoan1,
      
      "letOutPropertyDetails": this.propertyDetails1,
      "c80Investments": this.c80investments1,
      "otherSourcesofIncome": this.otherIncomeSource1,
      //   {

      //     "incomeFromOtherSources": form.incomeFromOtherSources,
      //     "interestEarnedFromSavingsDeposit": form.interestEarnedFromSavingsDeposit,
      //     "interestEarnedFromFixedDeposits": form.interestEarnedFromFixedDeposits,
      //     "tdsosoidoc":this.documentsForOIS
          
      //   }
      // ],
      "deductionUnderchapter": this.d80investments1,
      "deductionUS80CCC": [
        {

          "annuityPensionPlan": form.annuityPensionPlan,
          "declareAmount": form.appDeclareAmount,
          "tdeductionUS80CCCidoc":this.dCCC
          

        }
      ],
      "deductionUS80CC1b": [
        {

          "employeeContribution": form.employeeContribution,
          "declareAmount": form.ecDeclareAmount,
          "deductionUS80CC1bdoc":this.dCCC1b
          

        }
      ],
      "deductionUS80CCD": [
        {

          "notifiedPensionScheme": form.notifiedPensionScheme,
          "declareAmount": form.npsDeclareAmount,
          "deductionUS80CCDdoc":this.dCCD
          
        }
      ],
      "deductionUS24": this.deduction241
    }
    console.log(data)
    this.service.add(data, url).subscribe((res) => {
      console.log(res)
      if (res.respose == 'Success') {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: res.message,

        })
        const currentRoute = this.router.url;

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]);
    });
      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',

        })
      }
    })
  })
  }

  getDetailsByYear(){
    let url='getIncomeTaxDeclarationRepositoryByYear?year=2024'
  }
  removedocuments(index){
    this.documents.splice(index,1);
  }

  removedocNameForhR(index){
    this.docNameForhR.splice(index,1);

  }
  removedocumentsForPD(index){
    this.documentsForPD.splice(index,1);
  }
  removedocNameForlOPD(index){
    this.docNameForlOPD.splice(index,1); 
  }
  removedocumentsFor80c(index){
    this.documentsFor80c.splice(index,1); 
  }
  removedocNameForoI(index){
    this.docNameForoI.splice(index,1);  
  }
  removedocumentsFor80d(index){
    this.documentsFor80d.splice(index,1);   
  }
  removedocNameFordUC(index){
    this.docNameFordUC.splice(index,1); 
  }
  removedocumentsForOIS(index){
    this.documentsForOIS.splice(index,1);  
  }
  removedocNameForoSIncome(index){
    this.docNameForoSIncome.splice(index,1); 
  }
  removedocumentsFor80ccc(index){
    this.documentsFor80ccc.splice(index,1); 
  }
  removedocNameForCCC(index){
    this.docNameForCCC.splice(index,1); 
  }
  removedocumentsFor80cc1b(index){
    this.documentsFor80cc1b.splice(index,1);  
  }
  removedocNameForCCC1b(index){
    this.docNameForCCC1b.splice(index,1);   
  }
  removedocumentsFor80ccd(index){
    this.documentsFor80ccd.splice(index,1); 
  }
  removedocNameForCCD(index){
    this.docNameForCCD.splice(index,1);  
  }
  removedocumentsForHl(index){
    this.documentsForHl.splice(index,1);   
  }
  removedocNameForhL(index){
    this.docNameForhL.splice(index,1);  
  }
  removedocumentsForU24(index){
    this.documentsForU24.splice(index,1); 
  }
  removedocNameFordU24(index){
    console.log(index)
    this.docNameFordU24.splice(index,1); 
  }

}
