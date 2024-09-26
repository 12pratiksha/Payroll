import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { CalendarOptions } from '@fullcalendar/angular';
// import 'fullcalendar';
import {
  ChartComponent,
  ApexChart,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexFill
} from "ng-apexcharts";
import { AllModulesService } from '../../all-modules.service';
// import { DatePipe } from '@angular/common';

export type radialBarChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
};
@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})

export class EmployeeDashboardComponent implements OnInit {
	Events: any[] = [];
	// calendarOptions: CalendarOptions = {
	//   headerToolbar: {
	// 	left: 'prev,next today',
	// 	center: 'title',
	// 	right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
	//   },
	//   initialView: 'dayGridMonth',
	//   weekends: true,
	//   editable: true,
	//   selectable: true,
	//   selectMirror: true,
	//   dayMaxEvents: true}
  @ViewChild("radialBarChart") radialBarchart: ChartComponent;
  public radialBarChartOptions: Partial<radialBarChartOptions>;
  searchForm:FormGroup
  suggestionForm:FormGroup
	datesToHighlight: any;
	birthdate: any;
	holiday: any;
	leaves: any=[];
	balanceLeaves: any[];
	punch1: any;
	empId: string;
	birth: string;
	date: void;
	data: any;
	branch: any;
	branchName: any;
  constructor(public _fb:FormBuilder, private httpClient: HttpClient, public _service: AllModulesService) { 

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
	this.getBranch();
	this.punch();
	this.details();
	this.getBirthday();
	this.getHoliday();
	this.getVissionMission();
  }

ngOnInit() {
this.birth=localStorage.getItem("Birth")
this.searchForm = this._fb.group({
	employee:['',Validators.required],
	year:['',Validators.required],
	month:['',Validators.required],
})
this.suggestionForm = this._fb.group({
	title:'',
	description:''
})
}

  names:any=[];
getBirthday(){
  this.empId=localStorage.getItem("empid")
  this._service.getDetails({}, 'admindashboard/getbirthdayvalues').subscribe((res)=>{
  this.birthdate = res.data
  this.birthdate.forEach(element => {
  this.names.push(element.employeeId)
  console.log(this.names)
  });
  })
}
getBranch(){
	let branchId=localStorage.getItem('branchId')
	this._service.get( 'branch/getBranchList').subscribe((res)=>{
	this.branch = res
	let result=this.branch.filter((bran:any)=>
	bran.id==branchId)
	this.branchName=result[0].branchName
	console.log(this.branchName)
    })
}
getHoliday(){
    this._service.getDetails({}, 'admindashboard/getHolidayValues').subscribe((res)=>{
    this.holiday = res.data
    console.log(this.holiday.length)
    })
}


details(){
	let empid=localStorage.getItem('empid')
	console.log(empid)
let url="getempId/"+empid

this._service.get(url).subscribe((res)=>{
	
	this.leaves=res
	console.log(this.leaves);
	this.balanceLeaves=[];
	
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
//http://localhost:5555/getLatusAttendancePunch/46255
punch(){
	let empid=localStorage.getItem('empid')
	console.log(empid)
    let url="getLatusAttendancePunch/"+empid
    this._service.get(url).subscribe((res)=>{
	this.punch1=res.data;
	console.log(this.punch1)
	if(this.punch1.length!=0){
	this.date=this.punch1[0].date
	}
    })
}

	// this.fArray().clear()
	// this.leaveApplicationForm.controls.leave.reset()
	// this.leaveApplicationForm.controls.reason.reset()
	//   if(this.leaveApplicationForm.controls.employee.status=="VALID"){
	//   let url = "getempId/"+`${this.leaveApplicationForm.value.employee}`
	//  this._service.get(url).subscribe((res)=>{
	
	
	//   if(res.length < 1){
	// 	Swal.fire({
	// 	  icon: 'error',
	// 	  title: 'Oops...',
	// 	  text: 'No leaves',
		  
	// 	})
	// 	this.leaveBalance = ""
	//   }
	//   else{
	// 	this.leaveBalance = res
	  
	//   }
	//  })
	
	//   }
	//   else {
	// 	Swal.fire({
	// 	  icon: 'error',
	// 	  title: 'Oops...',
	// 	  text: 'Select Employee before Trying',
		  
	// 	})
	// 	this.leaveBalance=false
	//   }
	// }


	

}
