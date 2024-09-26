import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AllModulesService } from '../../all-modules.service';
import { DatePickerInnerComponent } from 'ngx-bootstrap/datepicker';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-meetingreports',
  templateUrl: './meetingreports.component.html',
  styleUrls: ['./meetingreports.component.css']
})
export class MeetingreportsComponent implements OnInit {
  filterMeeting:FormGroup;
  dtOptions: { pagingType: string; pageLength: number; processing: boolean; dom: string; buttons: string[]; };
  tableData: any;
  showMore:boolean=true;
  visibleItemsCount: number=4;
  showMyContainer:boolean=false;
  viewData: any;
  feedbackData: any;
  constructor(public fb:FormBuilder,public service:AllModulesService, public datePipe:DatePipe) { }

  ngOnInit(): void {
    this.filterMeeting=this.fb.group({
      fdate:['',Validators.required],
      tdate:['',Validators.required],
      status:['',Validators.required]
    })

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'Bfrtip',
      buttons: [
            'copy', 'csv', 'excel', 'print'
        ]

    };
  }
  search(){
    let form=this.filterMeeting.value
    console.log(form)
    let fdate=this.datePipe.transform(form.fdate,'yyyy-MM-dd')
    let tdate=this.datePipe.transform(form.tdate,'yyyy-MM-dd')
    if(this.filterMeeting.status=='VALID'){
    let url='findALLCreateMeetingByDateAndStatus?fromDate='+fdate+'&toDate='+tdate+'&status='+form.status
    this.service.get(url).subscribe((res)=>{
      this.tableData=res
      
    })
  }
  else{
    Swal.fire({
      icon:'warning',
      title:'warning..',
      text:'Something went wrong!'
    })
  }
  }
  toggleVisibility(i,item): void {
    // console.log(item)
    this.showMore = !this.showMore;
    if (this.showMore) {
      // alert(11111)
      this.visibleItemsCount = 4; // Display first 10 items
    } else {
      // alert(2222)
      this.visibleItemsCount = item.length; // Display all items
    }
  }

  view(item){
  console.log(item)
  this.viewData=item
  this.showMyContainer=true;
  let url='getByMeetingId?mettingId='+item.createMeetingId
  this.service.get(url).subscribe((res)=>{
  this.feedbackData=res.data
  

  })
 } 



}
