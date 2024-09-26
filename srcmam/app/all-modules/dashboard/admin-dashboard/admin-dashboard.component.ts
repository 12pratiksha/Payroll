import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexLegend,
  ApexGrid,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexFill
} from "ng-apexcharts";
import { moment } from "ngx-bootstrap/chronos/test/chain";
import { forkJoin } from "rxjs";
import { AllModulesService } from "../../all-modules.service";
export type newTicketChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  grid: ApexGrid
  title: ApexTitleSubtitle;
  labels: string[];
  legend: ApexLegend;
  subtitle: ApexTitleSubtitle;
};
export type solvedTicketChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  grid: ApexGrid
  title: ApexTitleSubtitle;
  labels: string[];
  legend: ApexLegend;
  subtitle: ApexTitleSubtitle;
};
export type openTicketChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  grid: ApexGrid
  title: ApexTitleSubtitle;
  labels: string[];
  legend: ApexLegend;
  subtitle: ApexTitleSubtitle;
};
export type pendingTicketChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  grid: ApexGrid
  title: ApexTitleSubtitle;
  labels: string[];
  legend: ApexLegend;
  subtitle: ApexTitleSubtitle;
};
export type radialBarChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
};
@Component({
  selector: "app-admin-dashboard",
  templateUrl: "./admin-dashboard.component.html",
  styleUrls: ["./admin-dashboard.component.css"],
})
export class AdminDashboardComponent implements OnInit {
  searchForm: FormGroup
  @ViewChild("newTicketChart") chart: ChartComponent;
  public newTicketChartOptions: Partial<newTicketChartOptions>;
  @ViewChild("solvedTicketChart") solvedchart: ChartComponent;
  public solvedTicketChartOptions: Partial<solvedTicketChartOptions>;
  @ViewChild("openTicketChart") openchart: ChartComponent;
  public openTicketChartOptions: Partial<openTicketChartOptions>;
  @ViewChild("pendingTicketChart") pendingchart: ChartComponent;
  public pendingTicketChartOptions: Partial<pendingTicketChartOptions>;
  @ViewChild("radialBarChart") radialBarchart: ChartComponent;
  public radialBarChartOptions: Partial<radialBarChartOptions>;
  public chartData;
  public chartOptions;
  public lineData;
  public lineOption;
  public barColors = {
    a: "#ff9b44",
    b: "#fc6075",
  };
  public lineColors = {
    a: "#ff9b44",
    b: "#fc6075",
  };
  branch: any;
  department: any;
  activeEmployee: any;
  totalEmployee: any;
  maleEmployee: any;
  femaleEmployee: any;
  absentEmployee: any;
  presentEmployee: any;
  lateEmployee: any;
  dashboardData = [];
  birthdate: any;
  holiday: any;
  inactive = '';
  onhold = '';
  total = '';
  fnf = '';
  deleted = '';
  block = '';
  weekoff = '';
  leave = '';
  present = '';
  absent = '';
  late = '';
  active: any;
  activePer: number;
  inactivePer: number;
  absentPer: number;
  onholdPer: number;
  fnfPer: number;
  deletedPer: number;
  blockPer: number;
  weekoffPer: number;
  leavePer: number;
  presentPer: number;
  latePer: number;
  type: any;
  vission: any;
  mission: any;
  data: any=[];
  data1: any;
  constructor(public _fb:FormBuilder, public _service: AllModulesService, private router: Router,public _activatedroute: ActivatedRoute) {
  


   }

  ngOnInit() {

    this.dashboardDatas()
this.getBranch()
this.getDepartment()
this.getMale()
this.getFemale()
this.getBirthday()
this.getHoliday()
this.getVissionMission();
    this.searchForm = this._fb.group({
      branch:"",
      department:"",
    }) 



  }


  ngAfterViewInit() {
    (document.querySelector('.click') as HTMLElement).style.cursor = ' pointer';
}

  dashboardDatas(){
 
    let data = {}
   this._service.getDetails(data, 'admindashboard/getdashboardvalues?branch=&department=').subscribe((res)=>{
   
    if(res.respose == "Success"){
      this.dashboardData= res.data
     
      this.absent = res.data.AbsentEmployees
      this.inactive = res.data.InactiveEmployees
      this.active = res.data.ActiveEmployees
      this.onhold = res.data.OnHoldEmployees
      this.total = res.data.TotalEmployees
      this.fnf = res.data.FNFEmployees
      this.deleted = res.data.DeletedEmployees
      this.block = res.data.BlockEmployees
      this.weekoff = res.data.WeekOffEmployees
      this.leave = res.data.OnLeaveEmployees
      this.present = res.data.PresentEmployees
      this.late = res.data.LateEmployees

      let active = this.percentage(res.data.TotalEmployees, res.data.ActiveEmployees)
      this.activePer = Math.round(active)
      let inactive = this.percentage(res.data.TotalEmployees, res.data.InactiveEmployees)
      this.inactivePer = Math.round(inactive)
      let absent = this.percentage(res.data.TotalEmployees, res.data.AbsentEmployees)
      this.absentPer = Math.round(absent)
      let onhold = this.percentage(res.data.TotalEmployees, res.data.OnHoldEmployees)
      this.onholdPer = Math.round(onhold)
      let fnf = this.percentage(res.data.TotalEmployees, res.data.FNFEmployees)
      this.fnfPer = Math.round(fnf)
      let deleted = this.percentage(res.data.TotalEmployees, res.data.DeletedEmployees)
      this.deletedPer = Math.round(deleted)
      let block = this.percentage(res.data.TotalEmployees, res.data.BlockEmployees)
      this.blockPer = Math.round(block)
      let weekoff = this.percentage(res.data.TotalEmployees, res.data.WeekOffEmployees)
      this.weekoffPer = Math.round(weekoff)
      let leave = this.percentage(res.data.TotalEmployees, res.data.OnLeaveEmployees)
      this.leavePer = Math.round(leave)
      let present = this.percentage(res.data.TotalEmployees, res.data.PresentEmployees)
      this.presentPer = Math.round(present)
      let late = this.percentage(res.data.TotalEmployees, res.data.LateEmployees)
      this.latePer = Math.round(late)
       }
   })
  }

dashboardDataBranchWise(){
      this.getMal()
      this.getFemal()
      let form = this.searchForm.value
      let data = {}
      this._service.getDetails(data, 'admindashboard/getdashboardvalues?branch='+`${form.branch}`+'&department='+`${form.department}`).subscribe((res)=>{
 
  if(res.respose == "Success"){
      this.dashboardData= res.data
    
      this.absent = res.data.AbsentEmployees
      this.inactive = res.data.InactiveEmployees
      this.active = res.data.ActiveEmployees
      this.onhold = res.data.OnHoldEmployees
      this.total = res.data.TotalEmployees
      this.fnf = res.data.FNFEmployees
      this.deleted = res.data.DeletedEmployees
      this.block = res.data.BlockEmployees
      this.weekoff = res.data.WeekOffEmployees
      this.leave = res.data.OnLeaveEmployees
      this.present = res.data.PresentEmployees
      this.late = res.data.LateEmployees

      let active = this.percentage(res.data.TotalEmployees, res.data.ActiveEmployees)
      this.activePer = Math.round(active)
      let inactive = this.percentage(res.data.TotalEmployees, res.data.InactiveEmployees)
      this.inactivePer = Math.round(inactive)
      let absent = this.percentage(res.data.TotalEmployees, res.data.AbsentEmployees)
      this.absentPer = Math.round(absent)
      let onhold = this.percentage(res.data.TotalEmployees, res.data.OnHoldEmployees)
      this.onholdPer = Math.round(onhold)
      let fnf = this.percentage(res.data.TotalEmployees, res.data.FNFEmployees)
      this.fnfPer = Math.round(fnf)
      let deleted = this.percentage(res.data.TotalEmployees, res.data.DeletedEmployees)
      this.deletedPer = Math.round(deleted)
      let block = this.percentage(res.data.TotalEmployees, res.data.BlockEmployees)
      this.blockPer = Math.round(block)
      let weekoff = this.percentage(res.data.TotalEmployees, res.data.WeekOffEmployees)
      this.weekoffPer = Math.round(weekoff)
      let leave = this.percentage(res.data.TotalEmployees, res.data.OnLeaveEmployees)
      this.leavePer = Math.round(leave)
      let present = this.percentage(res.data.TotalEmployees, res.data.PresentEmployees)
      this.presentPer = Math.round(present)
      let late = this.percentage(res.data.TotalEmployees, res.data.LateEmployees)
      this.latePer = Math.round(late)

     }
 })
}



getBranch(){
      this._service.get( 'branch/getBranchList').subscribe((res)=>{
      this.branch = res
   })
}

getDepartment(){

      this._service.get( 'getAllDepartment').subscribe((res)=>{
      this.department = res 
 })
}
getMale (){
  
      this._service.getDetails({}, 'CountTotalMaleEmployeeWise?branch=&department=').subscribe((res)=>{
      this.maleEmployee = res
 })
}
getFemale(){
  
      this._service.getDetails({}, 'CountTotalFeMaleEmployeeWise?branch=&department=').subscribe((res)=>{
      this.femaleEmployee = res
   })
}
getMal (){
      let form = this.searchForm.value
      this._service.getDetails({}, 'CountTotalMaleEmployeeWise?branch='+`${form.branch}`+'&department='+`${form.department}`).subscribe((res)=>{
      this.maleEmployee = res
  
 })
}
getFemal(){
      let form = this.searchForm.value
      this._service.getDetails({}, 'CountTotalFeMaleEmployeeWise?branch='+`${form.branch}`+'&department='+`${form.department}`).subscribe((res)=>{
      this.femaleEmployee = res
   })
}
getBirthday(){

      this._service.getDetails({}, 'admindashboard/getbirthdayvalues').subscribe((res)=>{
      this.birthdate = res.data

   })
}
getHoliday(){

     this._service.getDetails({}, 'admindashboard/getHolidayValues').subscribe((res)=>{
     this.holiday = res.data
   })
}
getVissionMission(){
  let url="getAllCompanyInformationList"
  this._service.get(url).subscribe((res)=>{
    console.log(res)
    this.data=res
  //  for(let i=0; i<=this.data.length;i++){
  //   this.data
    

  })
}

cancel(){
     const currentRoute = this.router.url;

     this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
     this.router.navigate([currentRoute]); // navigate to same route
  }); 
}

percentage(t,p){
return  p*100/t
}

route(type){
this.router.navigate(["layout/dashboard/status/"+type])
}
}
