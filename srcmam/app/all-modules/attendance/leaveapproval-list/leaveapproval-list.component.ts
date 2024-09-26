import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AllModulesService } from '../../all-modules.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-leaveapproval-list',
  templateUrl: './leaveapproval-list.component.html',
  styleUrls: ['./leaveapproval-list.component.css']
})
export class LeaveapprovalListComponent implements OnInit {
  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  message: string;
  loginData: string;
  employee: any;
  someClickHandler(info: any): void {
    this.message = info.id + ' - ' + info.firstName;
  }
  constructor(public http: HttpClient, public service: AllModulesService, public router: Router) { }

  ngOnInit(): void {
    this.loginData = localStorage.getItem('LoginData');
    let headers = new HttpHeaders({ "Authorization": this.loginData});
    const that = this;
    this.dtOptions = {
      select: {
        info: true,
        style: 'multiple'
      },
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        $('td', row).off('click');
        $('td', row).on('click', () => {
          self.someClickHandler(row);
        });
        return row;
      }
    };
       that.http
          .get(environment.apiEndpoint+'LeaveApplication/getAllLeaveApplication', {headers:headers})
          .subscribe(resp => {
            that.employee = resp;
            this.dtTrigger.next();
           
          });
      
      

  }
  ngAfterViewInit(): void {
    this.dtTrigger.subscribe(() => {
      this.datatableElement.dtInstance.then((dtInstance) => {
        dtInstance.columns().every(function () {
          const that = this;
          $('input', this.footer()).on('keyup change', function () {
            if (that.search() !== this['value']) {
              that
                .search(this['value'])
                .draw();
            }
          });
        });
      });
    });
  }

  selected=[];
public selectRow(index: number, row:any) {

 
  if(this.selected.includes(row.leave_application_id)){
    let index = this.selected.indexOf(row.leave_application_id)
    this.selected.splice(index, 1);
  }
  else{
    this.selected.push(row.leave_application_id)
  }
 
 
}
approveSeleted(id){
  let url = "ApprovalLeaveApplications?status="+id
  console.log(this.selected)
  if(this.selected.length > 0){

this.service.add(this.selected, url).subscribe((res)=>{
  if(res.respose == "Success"){
    Swal.fire({
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    })
    const currentRoute = this.router.url;

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentRoute]); // navigate to same route
    }); 
  }
  else if(res.respose == "Already"){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Record Already Exists!',
  
    })
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
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'No Leaves Selected',
  
    })
  }
  
}
  
ngOnDestroy(): void {
  this.dtTrigger.unsubscribe();
}
}
