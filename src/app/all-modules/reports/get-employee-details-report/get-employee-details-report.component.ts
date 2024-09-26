import { Component, OnInit } from '@angular/core';
import { AllModulesService } from '../../all-modules.service';

@Component({
  selector: 'app-get-employee-details-report',
  templateUrl: './get-employee-details-report.component.html',
  styleUrls: ['./get-employee-details-report.component.css']
})
export class GetEmployeeDetailsReportComponent implements OnInit {
  data: any;
  imageName: string;
  companyName: string;
  address: string;

  constructor(public service:AllModulesService,) { }

  ngOnInit(): void {
  }

  getEmployeeDetails(){
    this.companyName=localStorage.getItem('companyName')
    this.address=localStorage.getItem('address')
  
    let url='getEmployeeDetailsReport'
    this.service.get(url).subscribe((res)=>{
    this.data=res
    })
  }

  getCompanyDetails(){
    let url="getAllCompanyInformationList"
    this.service.get(url).subscribe((res)=>{
    console.log(res)
    this.imageName=res[0].backImageName+""+res[0].logoImageName
    console.log(this.imageName)
    })
  }
}
 