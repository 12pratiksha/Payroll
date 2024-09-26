import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
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
  constructor(public _fb:FormBuilder, public _service: AllModulesService) {
  
    this.radialBarChartOptions = {
      series: [70],
			chart: {
			height: 300,
			type: 'radialBar',
			dropShadow: {
				enabled: true,
				blur: 2,
				color: '#000',
				opacity: 0.25
			}
		},
		plotOptions: {
			radialBar: {
				hollow: {
				size: '60%',
				}
			},
		},
		fill: {
			opacity: 1.5,
			colors: ['#FF7849', '#FF7849'],
			type: 'gradient',
			gradient: {
				gradientToColors: ['#FF7849', '#FF7849'],
				shadeIntensity: 1,
				opacityFrom: 1,
				opacityTo: 2,
				stops: [0, 50, 100],
				inverseColors: false
			},
		},
		labels: ['Completed task'],
    };
    this.newTicketChartOptions = {
      series: [{
        name: 'series1',
        color: '#4a7feb',
        data: [31, 40, 28, 51, 42, 109, 100]
      }],
      chart: {
        type: 'area',
        toolbar: {
          show: false
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      xaxis: {
        labels: {
          show: false
        }
      },
      yaxis: {
        labels: {
          show: false
        }
      },
      grid: {
        show: false
      }
    };
    this.solvedTicketChartOptions = {
      series: [{
        name: 'series1',
        color: '#ff7849',
        data: [31, 40, 28, 51, 42, 109, 100]
      }],
      chart: {
        type: 'area',
        toolbar: {
          show: false
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      xaxis: {
        labels: {
          show: false
        }
      },
      yaxis: {
        labels: {
          show: false
        }
      },
      grid: {
        show: false
      }
    };
    this.openTicketChartOptions = {
      series: [{
        name: 'series1',
        color: '#ff0000',
        data: [31, 40, 28, 51, 42, 109, 100]
      }],
      chart: {
        type: 'area',
        toolbar: {
          show: false
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      xaxis: {
        labels: {
          show: false
        }
      },
      yaxis: {
        labels: {
          show: false
        }
      },
      grid: {
        show: false
      }
    };
    this.pendingTicketChartOptions = {
      series: [{
        name: 'series1',
        color: '#4fad4c',
        data: [31, 40, 28, 51, 42, 109, 100]
      }],
      chart: {
        type: 'area',
        toolbar: {
          show: false
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      xaxis: {
        labels: {
          show: false
        }
      },
      yaxis: {
        labels: {
          show: false
        }
      },
      grid: {
        show: false
      }
    };

   }

  ngOnInit() {
    this.getDashboardData()
    this.chartOptions = {
      xkey: "y",
      ykeys: ["a", "b"],
      labels: ["Total Income", "Total Outcome"],
      barColors: [this.barColors.a, this.barColors.b],
    };

    this.chartData = [
      { y: "2006", a: 100, b: 90 },
      { y: "2007", a: 75, b: 65 },
      { y: "2008", a: 50, b: 40 },
      { y: "2009", a: 75, b: 65 },
      { y: "2010", a: 50, b: 40 },
      { y: "2011", a: 75, b: 65 },
      { y: "2012", a: 100, b: 90 },
    ];

    this.lineOption = {
      xkey: "y",
      ykeys: ["a", "b"],
      labels: ["Total Sales", "Total Revenue"],
      resize: true,
      lineColors: [this.lineColors.a, this.lineColors.b],
    };

    this.lineData = [
      { y: '2006', a: 50, b: 90 },
      { y: '2007', a: 75,  b: 65 },
      { y: '2008', a: 50,  b: 40 },
      { y: '2009', a: 75,  b: 65 },
      { y: '2010', a: 50,  b: 40 },
      { y: '2011', a: 75,  b: 65 },
      { y: '2012', a: 100, b: 50 }
    ];

    this.searchForm = this._fb.group({
      branch:"",
      department:"",
    }) 

    let data = {}
  this._service.getDetails(data, 'admindashboard/getdashboardvalues?branch=&department=').subscribe((res)=>{
    if(res.respose == "Success")
   { this.dashboardData = res.data}
  })
    

   
    forkJoin(
      
      {
        requestOne:  this._service.get( 'branch/getBranchList'),
        requestTwo:  this._service.get( 'getAllDepartment'),
        requestThree:  this._service.getDetails(data, 'CountTotalInActiveEmployeeByBranchAndDepartmentWise?branch=&department='),
        requestFour:  this._service.getDetails(data, 'CountTotalEmployeeByBranchAndDepartmentWise?branch=&department='),
        requestFive:  this._service.getDetails(data, "CountTotalEmployee"),
        requestSix:  this._service.getDetails(data, 'CountTotalMaleEmployeeWise?branch='+'&department='),
        requestSeven:  this._service.getDetails(data, 'CountTotalFeMaleEmployeeWise?branch='+'&department='),
        requestEight:  this._service.getDetails(data, 'admindashboard/getdashboardvalues?branch=&department='),
        requestNine:  this._service.getDetails(data, 'admindashboard/getbirthdayvalues'),
        requestTen:  this._service.getDetails(data, 'admindashboard/getHolidayValues'),
        
      }).subscribe(({requestOne, requestTwo, requestThree, requestFour, requestFive, requestSix, requestSeven, requestEight, requestNine, requestTen})=>{
        this.branch = requestOne
        this.department = requestTwo
        this.activeEmployee = requestThree
        this.totalEmployee = requestFour
        this.totalEmployee = requestFive
        this.maleEmployee = requestSix
     this.femaleEmployee = requestSeven
    //  this.dashboardData = requestEight.data
     this.birthdate =  requestNine.data
     this.holiday =  requestTen.data
    
      })
    
     


  }

searchDashboardDetails(){
 let form = this.searchForm.value
 console.log(form)
 this.dashboardDataBranchWise()
 let data = {}
  forkJoin(
    {
    requestOne:  this._service.getDetails(data, 'CountTotalInActiveEmployeeByBranchAndDepartmentWise?branch='+`${form.branch}`+'&department='+`${form.department}`),
    requestTwo:  this._service.getDetails(data, 'CountTotalEmployeeByBranchAndDepartmentWise?branch='+`${form.branch}`+'&department='+`${form.department}`),
    requestThree:  this._service.getDetails(data, 'CountTotalMaleEmployeeWise?branch='+`${form.branch}`+'&department='+`${form.department}`),
    requestFour:  this._service.getDetails(data, 'CountTotalFeMaleEmployeeWise?branch='+`${form.branch}`+'&department='+`${form.department}`),
    requestFive:  this._service.getDetails(data, 'CountTotalAbsentEmployeeByBranchAndDepartmentWise?branch='+`${form.branch}`+'&department='+`${form.department}`),
    requestSix:  this._service.getDetails(data, 'CountTotalPrsentEmployeeByBranchAndDepartmentWise?branch='+`${form.branch}`+'&department='+`${form.department}`),
    requestSeven:  this._service.getDetails(data, 'CountTotalLateMarkEmployeeByBranchAndDepartmentWise?branch='+`${form.branch}`+'&department='+`${form.department}`),
    requestEight:  this._service.getDetails(data, 'admindashboard/getdashboardvalues?branch='+`${form.branch}`+'&department='+`${form.department}`),
    
    }).subscribe(({requestOne, requestTwo, requestThree, requestFour, requestFive, requestSix, requestSeven, requestEight})=>{
     this.activeEmployee = requestOne
     this.totalEmployee = requestTwo
     this.maleEmployee = requestThree
     this.femaleEmployee = requestFour
     this.absentEmployee = requestFive
     this.presentEmployee = requestSix
     this.lateEmployee = requestSeven
    //  this.dashboardData = requestEight.data
    })



}
getDashboardData(){
  let  data = {}
  this._service.getDetails(data, 'admindashboard/getdashboardvalues?branch=&department=').subscribe((res)=>{
     if(res.respose == "Success"){
    this.dashboardData= res.data
    
    this.absent = res.data.AbsentEmployees
    this.inactive = res.data.InactiveEmployees
    this.onhold = res.data.OnHoldEmployees
    this.total = res.data.TotalEmployees
    this.fnf = res.data.FNFEmployees
    this.deleted = res.data.DeletedEmployees
    this.block = res.data.BlockEmployees
    this.weekoff = res.data.WeekOffEmployees
    this.leave = res.data.OnLeaveEmployees
    this.present = res.data.PresentEmployees
    this.late = res.data.LateEmployees
     }
  })
  
}
dashboardDataBranchWise(){
  let form = this.searchForm.value
  let data = {}
 this._service.getDetails(data, 'admindashboard/getdashboardvalues?branch='+`${form.branch}`+'&department='+`${form.department}`).subscribe((res)=>{
 
  if(res.respose == "Success"){
    this.dashboardData= res.data
    
    this.absent = res.data.AbsentEmployees
    this.inactive = res.data.InactiveEmployees
    this.onhold = res.data.OnHoldEmployees
    this.total = res.data.TotalEmployees
    this.fnf = res.data.FNFEmployees
    this.deleted = res.data.DeletedEmployees
    this.block = res.data.BlockEmployees
    this.weekoff = res.data.WeekOffEmployees
    this.leave = res.data.OnLeaveEmployees
    this.present = res.data.PresentEmployees
    this.late = res.data.LateEmployees
     }
 })
}
}
