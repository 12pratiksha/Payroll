import { data } from 'jquery';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AllModulesService } from '../../all-modules.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DomSanitizer,SafeStyle  } from '@angular/platform-browser';
import { setDate } from 'date-fns';

//import {jsPDF} from "jspdf";
//import "jspdf-autotable";
// import * as jspdf from 'jspdf';
// import html2canvas from 'html2canvas';

@Component({
  selector: 'app-generate-slip',
  templateUrl: './generate-slip.component.html',
  styleUrls: ['./generate-slip.component.css']
})
export class GenerateSlipComponent implements OnInit {
  tableData: any;
  tableLen: any;
  dataSource: any;
  paginator: any;
  sd: any=[];
  companyName: string;
  address: string;
  loginData: string | string[];
  HttpClient: any;
  result: any;
  loader: boolean;
  public backgroundImg: SafeStyle;
  path=environment.apiEndpoint;
  netsalary:any;
  departments: any;
  designations: any;
  dataSource1: any=[];
  depart: any;
  desig: any;
  dataSource2: any;
  constructor(private sanitizer: DomSanitizer,private srvModuleService: AllModulesService,private http: HttpClient,public _service:AllModulesService,public router:Router) {
    // console.log(this.router.getCurrentNavigation()?.extras.queryParams);
    //this.getCompany();
    //this.sd=[];
this.designations=[];
this.departments =[];

    
    let param=this.router.getCurrentNavigation()?.extras.queryParams;
    if(param){
    this.dataSource=(param);
    
    this.getinfo();

    }
  
   }
  async getDesignation(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.srvModuleService.get('getAllDesignationMaster').subscribe((res) => {
          this.designations = res
          console.log(this.designations);
          this.getDepartment(); 
        })
        
          resolve();
      }, 500);
  });

     

  }
  async getDepartment(): Promise<void> {

    return new Promise((resolve) => {
      setTimeout(() => {
        this.srvModuleService.get('getAllDepartment').subscribe((res) => {
          this.departments = res
          console.log(this.departments);
          this.getData();
        })

        
        

          resolve();
      }, 500);
  });

  }


  async getinfo() : Promise<void>{
    await this.getDesignation();
    
      
  
  }


  getData() {
    
  console.log(this.dataSource);
  for(let i=0;i<this.dataSource.Data.length;i++){
    // console.log(i)
  this.sd=this.dataSource.Data[i]
  // console.log(this.sd);
  if(this.sd.logoimage==null || (this.sd.branch==null ||  this.sd.branch=="0" )){
    console.log("--------------------------")
    this.backgroundImg=this.dataSource.image;
    this.companyName=localStorage.getItem('companyName')
    this.address=localStorage.getItem('address')
  }
  else{
    console.log("--------------------------gggg")
    this.backgroundImg=this.sd.logoimage
    this.companyName=this.sd.branch
    this.address=''
  }
let id=this.sd.department
let DesignId=this.sd.designation
console.log(id+"   "+DesignId)

  
    let result =this.departments.filter((dept: any) =>
    (dept.departmentId==id) )
    //  console.log(result)

    let resultdesgn=this.designations.filter((des:any)=>
    (des.designationMasterId==DesignId))
    // console.log(resultdesgn)
  
this.dataSource1.push({"aadhaarCardNo":this.sd.aadhaarCardNo,"absent":this.sd.absent,"actualnetSalary":this.sd.actualnetSalary,"actualpf":this.sd.actualpf,"addition":this.sd.addition,"allowances":this.sd.allowances,"attendances":this.sd.attendances,"dateOfJoining":this.sd.dateOfJoining,"days":this.sd.days,"deduction":this.sd.deduction,"department":result[0].departmentName,"designation":resultdesgn[0].name,"eaccountNo":this.sd.eaccountNo,"employeeCode":this.sd.employeeCode,"employeeId":this.sd.employeeId,"employeeName":this.sd.employeeName,"epfno":this.sd.epfno,"esic":this.sd.esic,"firstName":this.sd.firstName,"holidayOff":this.sd.holidayOff,"lastName":this.sd.lastName,"leaves":this.sd.leaves,"middleName":this.sd.middleName,"month":this.sd.month,"monthlyTotalAttendances":this.sd.monthlyTotalAttendances,"netSalary":this.sd.netSalary,"paidDays":this.sd.paidDays,"panNo":this.sd.panNo,"payrollListId":this.sd.payrollListId,"pf":this.sd.pf,"processed":this.sd.processed,"prsent":this.sd.prsent,"pt":this.sd.pt,"status":this.sd.status,"totalDays":this.sd.totalDays,"uan":this.sd.uan,"year":this.sd.year})
// console.log(this.dataSource1);
  if(i==0){
this.netsalary=this.dataSource.Data[i].netSalary;
this.netsalary=Math.round(this.netsalary);
// console.log(this.netsalary);
  
  }

}
this.dataSource2=this.dataSource1
  }



  ngOnInit(): void {
    
//this.backgroundImg='http://localhost:5555/cmpimages/610Trishul-Logo(1).png'
console.log(this.backgroundImg)
 
  }
  downloadAsPDF(sectionToPrint){
    // const printContents = document.getElementById(sectionToPrint).innerHTML;
    // const originalContents = document.body.innerHTML;
    // document.body.innerHTML = printContents;
    // window.focus();
    // window.print()
   
    
    // window.close();
    // document.body.innerHTML = originalContents;

    let printContents, popupWin;
    printContents = document.getElementById(sectionToPrint).innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
          img {
            -webkit-print-color-adjust: exact;
            print-color-adjust:exact;
        }
          td{
          border-right: 1px solid;
          border-top: 1px solid;
          border-left: 1px solid;
          border-bottom: 1px solid;
          padding-left:5px;
          align-content: flex-start;

        }
        th{
          border-right: 1px solid;
          border-top: 1px solid;
          border-left: 1px solid;
          border-bottom: 1px solid;
          padding-left:5px;
          align-content: flex-start;

        }

        table{
          border-collapse: collapse;
        }
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );

    popupWin.document.close();

  }


  
  a = [
    '',
    'One ',
    'Two ',
    'Three ',
    'Four ',
    'Five ',
    'Six ',
    'Seven ',
    'Eight ',
    'Nine ',
    'Ten ',
    'Eleven ',
    'Twelve ',
    'Thirteen ',
    'Fourteen ',
    'Fifteen ',
    'Sixteen ',
    'Seventeen ',
    'Eighteen ',
    'Nineteen '];

  b = [
    '',
    '',
    'Twenty',
    'Thirty',
    'Forty',
    'Fifty',
    'Sixty',
    'Seventy',
    'Eighty',
    'Ninety'];

    
  transform(value: any, args?: any): any {
    if (value) {
      let num: any = Number(value);
      if (num) {
        if ((num = num.toString()).length > 9)  { return 'We are not the Iron Bank, you can lower down the stakes :)'; }
        const n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
        if (!n) {return ''; }
        let str = '';
        str += (Number(n[1]) !== 0) ? (this.a[Number(n[1])] || this.b[n[1][0]] + ' ' + this.a[n[1][1]]) + 'Crore ' : '';
        str += (Number(n[2]) !== 0) ? (this.a[Number(n[2])] || this.b[n[2][0]] + ' ' + this.a[n[2][1]]) + 'Lakh ' : '';
        str += (Number(n[3]) !== 0) ? (this.a[Number(n[3])] || this.b[n[3][0]] + ' ' + this.a[n[3][1]]) + 'Thousand ' : '';
        str += (Number(n[4]) !== 0) ? (this.a[Number(n[4])] || this.b[n[4][0]] + ' ' + this.a[n[4][1]]) + 'Hundred ' : '';
        str += (Number(n[5]) !== 0) ? ((str !== '') ? 'and ' : '') +
        (this.a[Number(n[5])] || this.b[n[5][0]] + ' ' +
        this.a[n[5][1]]) + 'Rupees' : '';
        return str;
      } else {
        return '';
      }
    } else {
      return '';
    }
  }
  
}
