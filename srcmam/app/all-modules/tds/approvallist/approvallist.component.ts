import { Component, OnInit } from '@angular/core';
import { AllModulesService } from '../../all-modules.service';
import { HttpParams } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-approvallist',
  templateUrl: './approvallist.component.html',
  styleUrls: ['./approvallist.component.css']
})
export class ApprovallistComponent implements OnInit {
  dtOptions: { pagingType: string; pageLength: number; processing: boolean; dom: string; buttons: string[]; };
  tableDataArray: any=[];
  tableData: any;

  constructor(public service:AllModulesService,public router:Router) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'Bfrtip',
      buttons: [
            'copy', 'csv', 'excel', 'print'
        ]

    };
    this.getAll();
  }

  getAll() {
    let url = 'getAllIncomeTaxDeclarationForm'
    this.service.get(url).subscribe((res) => {
      console.log(res)
      
      res.forEach(element => {
      console.log(element.c80InvestmentsAdded)
      let detailName:any;
      let declaredAmount:any;
      let id:any;
      let type:any;
      if(element.status1==true){
        if(element.c80InvestmentsAdded==1){
      let c80Investments=element.c80Investments
      
      c80Investments.forEach(element1 => {
      console.log(element1)
      detailName="C80 Investments";
      declaredAmount=element1.c80declaredAmount
      id=element1.c80InvestmentsId
      type='c80InvestmentsAdded'
      this.tableDataArray.push({'companyName':element.companyName,'year':element.year,'employeeName':element.employeeName,'incomeTaxdeclarationform3Id':element.incomeTaxdeclarationform3Id,'detailsName':detailName,'declaredAmount':declaredAmount,'id':id,'type':type,'status1':element.status1})
    });
  }
      if(element.deductionUS24Added==1){
    let deductionUS24=element.deductionUS24
    deductionUS24.forEach(element1 => {
    console.log(element)
    detailName="Deduction U/S 24";
    declaredAmount=element1.declareAmount
    id=element1.deductionUS24Id
    type='deductionUS24Added'
    this.tableDataArray.push({'companyName':element.companyName,'year':element.year,'employeeName':element.employeeName,'incomeTaxdeclarationform3Id':element.incomeTaxdeclarationform3Id,'detailsName':detailName,'declaredAmount':declaredAmount,'id':id,'type':type,'status1':element.status1}) 
    })
  }
  if(element.deductionUS80CC1bAdded==1){
    let deductionUS80CC1b=element.deductionUS80CC1b
    deductionUS80CC1b.forEach(element1 => {
      detailName="Deduction U/S 80CC1b";
      declaredAmount=element1.declareAmount
      id=element1.deductionUS80CC1bId
     type='deductionUS80CC1bAdded' 
      this.tableDataArray.push({'companyName':element.companyName,'year':element.year,'employeeName':element.employeeName,'incomeTaxdeclarationform3Id':element.incomeTaxdeclarationform3Id,'detailsName':detailName,'declaredAmount':declaredAmount,'id':id,'type':type,'status1':element.status1})  
    });
  }
  if(element.deductionUS80CCCAdded==1){
    let deductionUS80CCC=element.deductionUS80CCC
    deductionUS80CCC.forEach(element1 => {
      detailName="Deduction U/S 80CCC";
      declaredAmount=element1.declareAmount
      id=element1.deductionUS80CCCId
      type='deductionUS80CCCAdded'
      this.tableDataArray.push({'companyName':element.companyName,'year':element.year,'employeeName':element.employeeName,'incomeTaxdeclarationform3Id':element.incomeTaxdeclarationform3Id,'detailsName':detailName,'declaredAmount':declaredAmount,'id':id,'type':type,'status1':element.status1})   
      
    });
  }
  if(element.deductionUS80CCDAdded==1){
  let deductionUS80CCD=element.deductionUS80CCD
  deductionUS80CCD.forEach(element1=> {
    detailName="Deduction U/S 80CCD";
    declaredAmount=element1.declareAmount
    id=element1.deductionUS80CCDId
    type='deductionUS80CCDAdded'
    this.tableDataArray.push({'companyName':element.companyName,'year':element.year,'employeeName':element.employeeName,'incomeTaxdeclarationform3Id':element.incomeTaxdeclarationform3Id,'detailsName':detailName,'declaredAmount':declaredAmount,'id':id,'type':type,'status1':element.status1})   
     
  });
  }
  if(element.deductionUnderchapterAdded==1){
    let deductionUnderchapter=element.deductionUnderchapter
    deductionUnderchapter.forEach(element1 => {
      detailName="Deduction Under Chapter";
      declaredAmount=element1.declareAmount
      id=element1.deductionUnderchapterId
      type='deductionUnderchapterAdded'
      this.tableDataArray.push({'companyName':element.companyName,'year':element.year,'employeeName':element.employeeName,'incomeTaxdeclarationform3Id':element.incomeTaxdeclarationform3Id,'detailsName':detailName,'declaredAmount':declaredAmount,'id':id,'type':type,'status1':element.status1})   
        
    });
  }
  if(element.homeLoanDetails1Added==1){
    let homeLoan=element.homeLoan
    homeLoan.forEach(element1 => {
      detailName="Home Loan";
      declaredAmount=element1.maxmiumLimit
      id=element1.homeLoan1Id
      type='homeLoanDetails1Added'
      this.tableDataArray.push({'companyName':element.companyName,'year':element.year,'employeeName':element.employeeName,'incomeTaxdeclarationform3Id':element.incomeTaxdeclarationform3Id,'detailsName':detailName,'declaredAmount':declaredAmount,'id':id,'type':type,'status1':element.status1})   
         
    });
  }
  if(element.houseRentDetailsAdded==1){
    let houseRentDetails=element.houseRentDetails
    houseRentDetails.forEach(element1 => {
      detailName="House Rent";
      declaredAmount=element1.amount
      id=element1.houseRentDetailId
      type='houseRentDetailsAdded'
      this.tableDataArray.push({'companyName':element.companyName,'year':element.year,'employeeName':element.employeeName,'incomeTaxdeclarationform3Id':element.incomeTaxdeclarationform3Id,'detailsName':detailName,'declaredAmount':declaredAmount,'id':id,'type':type,'status1':element.status1})   
          
    });
  }
  if(element.letOutPropertyDetailsAdded==1){
    let letOutPropertyDetails=element.letOutPropertyDetails
    letOutPropertyDetails.forEach(element1 => {
      detailName="Let Out Property ";
      declaredAmount=element1.maxmiumLimit
      id=element1.letOutPropertyDetailId
      type='letOutPropertyDetailsAdded'
      this.tableDataArray.push({'companyName':element.companyName,'year':element.year,'employeeName':element.employeeName,'incomeTaxdeclarationform3Id':element.incomeTaxdeclarationform3Id,'detailsName':detailName,'declaredAmount':declaredAmount,'id':id,'type':type,'status1':element.status1})   
           
    });
  }
  if(element.otherSourcesofIncomeAdded==1){
    let otherSourcesofIncome=element.otherSourcesofIncome
    otherSourcesofIncome.forEach(element1 => {
      detailName="Other Source of Income ";
      declaredAmount=element1.maxmiumLimit
      id=element1.otherSourcesofIncomeId
      type='otherSourcesofIncomeAdded'
      this.tableDataArray.push({'companyName':element.companyName,'year':element.year,'employeeName':element.employeeName,'incomeTaxdeclarationform3Id':element.incomeTaxdeclarationform3Id,'detailsName':detailName,'declaredAmount':declaredAmount,'id':id,'type':type,'status1':element.status1})   
            
    });
  }

  

}  
    
       
      
});
    

      this.tableData =this.tableDataArray
      console.log(this.tableData)
    })
  }
  approve(item){
    // console.log(item)
    Swal.fire({
      title:"Are you really want to approve?",
      showCancelButton:true,
      confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Yes'
    }).then(result=>{
      console.log(result);
      if(result.isConfirmed==true)
      {
    let params = new HttpParams();

    params = params.append('TDSId', item.incomeTaxdeclarationform3Id);
    params = params.append('documentId',item.id);
    params = params.append('type',item.type);

    
    let url='TDSDocumentApproval'
    this.service.add(params,url).subscribe((res)=>{
      if(res.respose=='Success')
            {
              Swal.fire({
                icon: 'success',
               title:'Success',
               text:'Approved Successfully'
              })
              this.getAll();
              const currentRoute = this.router.url;

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]);
    });
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
        this.getAll();
      }

    })

  }

}
