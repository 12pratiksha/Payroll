import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'ngx-bootstrap-multiselect';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { AllModulesService } from '../../all-modules.service';

@Component({
  selector: 'app-sub-department-shiftallocation',
  templateUrl: './sub-department-shiftallocation.component.html',
  styleUrls: ['./sub-department-shiftallocation.component.css']
})
export class SubDepartmentShiftallocationComponent implements OnInit {

  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();
  public dtElement: DataTableDirective;
  dtOptions: any = {};
  showMyContainer:boolean=false;
  SubDivForm: FormGroup
  branch:IMultiSelectOption[];
  state:IMultiSelectOption[] = [];
  department:IMultiSelectOption[];
  subDepartment:IMultiSelectOption[];
  shift:IMultiSelectOption[];
  loginData: string;
  tableData;
  editId: any;
  loading: IMultiSelectOption[] 
  update: boolean = false;
  mySettings: IMultiSelectSettings = {
    enableSearch: true,
    checkedStyle: 'fontawesome',
    buttonClasses: 'form-control',
    dynamicTitleMaxItems: 3,
    displayAllSelectedText: true
};
  myTexts: IMultiSelectTexts = {
    checkAll: 'Select all',
    uncheckAll: 'Unselect all',
    checked: 'item selected',
    checkedPlural: 'items selected',
    searchPlaceholder: 'Find',
    searchEmptyResult: 'Nothing found...',
    searchNoRenderText: 'Type in search box to see results...',
    defaultTitle: 'Select',
    allSelected: 'All selected',
  };
  tableData_display: any=[];
  subDept: any;
  state1: any=[];
  subd: any;
  branches: any;
  s1: IMultiSelectOption[];
  shifts: any=[];
  dept: any=[];
  constructor(  
    public _service: AllModulesService,
    public _fb: FormBuilder,
    private router: Router,
    private http: HttpClient
    ) { }

  ngOnInit(): void {
    this.loading = [{id:'loading...', name:'loading...'}]
    this.getBranch();
    this.getState();
    this.getDepartment();
    
    
    
    this.SubDivForm = this._fb.group({
      state: ["", Validators.required],
      branch: ["", Validators.required],
      department: ["", Validators.required],
      subDepartment: ["", Validators.required],
      shift: ["", Validators.required],
      status:''
    })

    this.loginData = localStorage.getItem('LoginData');
    let headers = new HttpHeaders({ "Authorization": this.loginData});
   
    const that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'print', 
        ]
    };
    // console.log({headers:headers})
    //    that.http
       
    //       .get(environment.apiEndpoint+'getAllSubDepartmentWiseBranchShiftMaster', {headers:headers})
    //       .subscribe(resp => {
    //         that.tableData = resp;
    //         this.dtTrigger.next();
    //         this.tableData_display.push({})
           
    //         let result =this.departments.filter((dept: any) =>
    //         (dept.departmentId==department) )

    //       });
      
      
    
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


  
  showContainer(){
    this.showMyContainer=true; 
  }
  hideContainer(){
    const currentRoute = this.router.url;

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentRoute]); // navigate to same route
    }); 
  }
  getBranch(){
    this._service.get('branch/getBranchList').subscribe((res)=>{
    let branch = []
    res.forEach(element => {
    let branches={id:element.id, name:element.branchName}
    branch.push(branches)
    this.branch=branch
    });
    })
  }
  getState(){
    this._service.get("state/getStateList").subscribe((res)=>{
    let state = []
    res.forEach(element => {
    let states={id:element.stateId, name:element.stateName}
    state.push(states)
    this.state=state
    });
    })
  }
  getDepartment(){
    this._service.get("getAllDepartment").subscribe((res)=>{
    let department = []
    res.forEach(element => {
    let departments={id:element.departmentId, name:element.departmentName}
    department.push(departments)
    this.department=department
    });
    this.getSubDepartment();
    })
  }
  getSubDepartment(){
    this._service.get("subDepartment/getSubDepartments").subscribe((res)=>{
    let subDepartment = []
    res.forEach(element => {
    let subDepartments={id:element.subDepartmentId, name:element.subDepartmentName}
    subDepartment.push(subDepartments)
    this.subDepartment=subDepartment
    });
    this.getShifts();
    })
  }
  getShifts(){
    this._service.get("shifts/getAllShift").subscribe((res)=>{
    let shift = []
    if(res){
    res.forEach(element => {
    let shifts={id:element.shiftId, name:element.shiftName}
    shift.push(shifts)
    this.shift=shift
    });
    }
    this.getAll();
    })
  }
          
  getAll(){
    let url='getAllSubDepartmentWiseBranchShiftMaster'
    this._service.get(url).subscribe((res)=>{
    res.forEach(element => {
    let departments=element.departments
    let Estate=element.states
    let branch=element.branchs
    let subdepartment=element.subdepartments
    this.dept=[];
    departments.forEach(element => {
    let deptResult=this.department.filter((dept1:any)=>
    (dept1.id == element.department))
    let d1=deptResult[0]
    this.dept.push(d1)
    });
    let newDept=this.dept
    this.state1=[];
    Estate.forEach(element1 => {  
    console.log(element1)
    let stateResult =this.state.filter((stat: any) =>
    (stat.id == element1.state) )
    let st1=stateResult[0]
    this.state1.push(st1)
    });
    let newStates=this.state1
    this.subDept=[];
    subdepartment.forEach(element => {
          let subDeptResult =this.subDepartment.filter((subdept: any) =>
          (subdept.id == element.subdepartment) )
          let s1=subDeptResult[0]
          this.subDept.push(s1)
        });
        this.subd=this.subDept
        let Eshift=element.shifts;
          this.shifts=[];
          console.log(element.shifts)
          Eshift.forEach(element1 => {
            if(element1){
          let shiftResult =this.shift.filter((shift1: any) => (shift1.id==element1.shift) )
          console.log(shiftResult);
          if(shiftResult.length>0){
          let sh1=shiftResult[0]
          this.shifts.push(sh1)
}
            }
        });
        let sh=this.shifts

          // console.log(branch)
          this.branches=[];
          branch.forEach(element => {
            
          let branchResult =this.branch.filter((branc: any) =>
          (branc.id==element.branch) )
          let b1=branchResult[0]
          this.branches.push(b1)
        
        });
        let bran=this.branches
        

  this.tableData_display.push({"subDepartmentWiseBranchShiftId":element.subDepartmentWiseBranchShiftId,"subdepartments":this.subd,"branchs":bran,"states":newStates,"shifts":this.shifts,"departments":newDept,"status":element.status,})

});

this.tableData=this.tableData_display;
console.log(this.tableData)
})
}


submit(type){
           
            let url

 if (type == 'add'){
url = 'addSubDepartmentWiseBranchShiftMaster'
 }
 else{
  url = 'updateSubDepartmentWiseBranchShiftMaster/'+ this.editId
 }

          let form = this.SubDivForm.value
console.log(form)
if(this.SubDivForm.valid){
let state = []
  form.state.forEach(element => {
    state.push({state:element})
  });
let branch = []
  form.branch.forEach(element => {
    branch.push({branch:element})
  });

  let department = []
  form.department.forEach(element => {
    department.push({department:element})
  });

  let subdepartment = []
  form.subDepartment.forEach(element => {
    subdepartment.push({subdepartment:element})
  });

let shift = []
form.shift.forEach(element => {
  shift.push({shift:element})
});

  let data = {
    states: state,
    branchs: branch,
    departments: department,
    subdepartments: subdepartment,
    shifts: shift,
    status : form.status
  }


  
 this._service.add(data, url).subscribe((res)=>{
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
  text: 'Something went wrong!',

})
this.SubDivForm.markAllAsTouched()

}



}

edit(id){
this.editId = id
this.showMyContainer =true
this.update = true
this._service.get("getSubDepartmentWiseBranchShiftMaster/"+this.editId).subscribe((res)=>{
  let state = []
  let branch = []
  let department = []
  let subdepartment = []
  let shift = []
res.states.forEach(element => {
  state.push(element.state)
  
});
res.branchs.forEach(element => {
  branch.push(element.branch)
  
});
res.departments.forEach(element => {
  department.push(element.department)
  
});
res.subdepartments.forEach(element => {
  subdepartment.push(element.subdepartment)
  
});
console.log(subdepartment)
res.shifts.forEach(element => {
  shift.push(element.shift)
  
});
this.SubDivForm.get('state').setValue(state)
this.SubDivForm.get('branch').setValue(branch)
this.SubDivForm.get('department').setValue(department)
this.SubDivForm.get('subDepartment').setValue(subdepartment)
this.SubDivForm.get('shift').setValue(shift)
this.SubDivForm.get('status').setValue(res.status)
})
}
delete(id){
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
   
    if (result.isConfirmed) {

      this._service.delete(id,'deleteSubDepartmentWiseBranchShiftMaster').subscribe((res)=>{
        if(res.respose == 'Success'){
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          const currentRoute = this.router.url;

          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate([currentRoute]); // navigate to same route
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

  })

}

cancel(){
  const currentRoute = this.router.url;

  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]); // navigate to same route
  }); 
}
          
ngOnDestroy(): void {
 
            this.dtTrigger.unsubscribe();
          }

}
