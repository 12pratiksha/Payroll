import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IMultiSelectOption } from 'ngx-bootstrap-multiselect';
import Swal from 'sweetalert2';
import { AllModulesService } from '../../all-modules.service';

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.css']
})
export class HolidaysComponent implements OnInit {
  offDayTable: any;
  showMyContainer: boolean = false;
  states: any;
  holidayForm:FormGroup;
  branch: any;
  tableData: any;
  update: any = false;
  dtOptions: any = {};
  editId: any;
  department: IMultiSelectOption[];
  category: IMultiSelectOption[];
 
  
  departmentName: any=[];
  departmentList: any=[];
  categoryList: any=[];
  stateName: any;
  branchName: any;
  holiday_display: any=[];
  categoryA: any;
  departmentA: any;
  department1: any[];
  constructor(
    public _service: AllModulesService,
    public _fb: FormBuilder,
    private router: Router
  ) { }

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
    
    this.getState();
    this.holidayForm = this._fb.group({
      state:['', Validators.required],
      branch:['', Validators.required],
      department:['', Validators.required],
      category:['', Validators.required],
      holidayName:['', Validators.required],
      effectiveDate:['', Validators.required],
      type:['', Validators.required],
      continue:['', ],
      status:['', ],
    })
    this.getCategory();
    this.getBranchList();
    this.getDepartment();
    this.get();

  }
  getState(){
    this._service.get("state/getStateList").subscribe((res)=>{
this.states = res;
// console.log(this.states)
    })
  }
  get(){
    this._service.get('getAllHolidayMaster').subscribe((res)=>{
      // this.tableData = res
      if(res){
      res.forEach(element => {

        let state=element.state
        let branch=element.branch
        let departments=element.departments
        let categorys=element.categorys

        let stateResult=this.states.filter((stat:any)=>
        (stat.stateId==state))
        console.log(stateResult)

        let branchResult=this.branch.filter((bran:any)=>
        (bran.id==branch))
        this.categoryA=[];
        categorys.forEach(element => {
        let cateResult=this.category.filter((cate:any)=>
        (cate.id==element.category))
        this.categoryA.push(cateResult[0])
      });
      let category=this.categoryA


      this.departmentA=[];
      departments.forEach(element => {
      console.log(element)
      let deptResult=this.department.filter((dept:any)=>
      (dept.id==element.department))
      this.departmentA.push(deptResult[0])
        
      });
      let department1=this.departmentA
      console.log(department1)
      this.holiday_display.push({"holidayId":element.holidayId,"state":stateResult[0].stateName,"branch":this.branchName,"departments":department1,"categorys":category,"holidayName":element.holidayName,"type":element.type,"date":element.date,"continueEveryYear":element.continueEveryYear,"status":element.status})
      })
      }
      this.tableData=this.holiday_display
      console.log(this.tableData)
    })
  }

  // getDepartment(){
  //   this._service.get('getAllDepartment').subscribe((res)=>{
  //     this.departments = res

  //     });
 
  // }




  showContainer(){
    this.showMyContainer=true; 
  
  }
  hideContainer(){
    this.showMyContainer=false;
    this.cancel();
  }
  getBranchList(){

   
        this._service.get('branch/getBranchList')
        .subscribe((res)=>{
        this.branch = res
        })
        
          }
        

          getCategory(){
           let category = []
           this._service.get('categories/getCategories').subscribe((res)=>{
           
             res.forEach(element => {
                  
               let categories={id:element.categoryId, name:element.categoryName}
               category.push(categories)
               this.category = category
              
             
               
             });
           })
         }
        
         getDepartment(){
          let department = []
          this._service.get('getAllDepartment').subscribe((res)=>{
          
            res.forEach(element => {
              let departments={id:element.departmentId, name:element.departmentName}
              department.push(departments)
              this.department = department
              });
          })
        }
        // getDept(){
        //   let department1=[];
        //   let url='getAllDepartmentBybranchId?branch='+this.holidayForm.value.branch
        //   this._service.get('getAllDepartment').subscribe((res)=>{
        //     res.forEach(element => {
        //       let departments={id:element.departmentId, name:element.departmentName}
        //       department1.push(departments)
        //       this.department1 = department1
        //       });
        //   })
        // }
      

          submit(){
            // console.log(this.holidayForm.value)
           let form = this.holidayForm.value;
            if (this.holidayForm.status=='VALID'){
              // console.log(this.holidayForm)
              var datePipe = new DatePipe('en-US');
              let effectiveDate = form.effectiveDate
              effectiveDate = datePipe.transform(effectiveDate,'yyyy-MM-dd')


              let departments = []
             
              form.department.forEach(element => {
                let departments1={department:element}
                departments.push(departments1)
              });
              let categorys = []
              form.category.forEach(element => {
                let categories={category:element}
                categorys.push(categories)

              });
              let data = {
                state: form.state,
                branch: form.branch,
                departments:departments,
                categorys:categorys,
                holidayName: form.holidayName,
                type: form.type,
                date: effectiveDate,
                continueEveryYear: form.continue,
                status: form.status
              }
              this._service.add(data, 'addHolidayMaster').subscribe((res)=>{
                if(res.respose=="Success"){
                  Swal.fire({
                
                    icon: 'success',
                    title: 'Data Added Successfully',
                    showConfirmButton: false,
                    timer: 1500
                  })
                
                  const currentRoute = this.router.url;

                  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                      this.router.navigate([currentRoute]); // navigate to same route
                  }); 
                }
                else if(res.respose=="Already"){
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Data Code Already Exists',
                   
                  })
                }
                else if(res.respose == "Fail"){
                  Swal.fire({
                    icon: 'warning',
                    title: 'Oops...',
                    text: res.message,
                
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
                this.holidayForm.markAllAsTouched();
              
      }    
          }
          updateForm(){
       
              // this._service.add(data, 'updateHolidayMaster/'+this.editId).subscribe((res)=>{
                let form = this.holidayForm.value;
            if (this.holidayForm.status=='VALID'){
              // console.log(this.holidayForm)
              var datePipe = new DatePipe('en-US');
              let effectiveDate = form.effectiveDate
              effectiveDate = datePipe.transform(effectiveDate,'yyyy-MM-dd')


              let departments = []
              let categorys = []
              form.department.forEach(element => {
                let value={department:element}
                departments.push(value)
              });
              form.category.forEach(element => {
                let value={category:element}
                categorys.push(value)
              });
              let data = {
                state: form.state,
                branch: form.branch,
                departments: departments,
                categorys: categorys,
                holidayName: form.holidayName,
                type: form.type,
                date: effectiveDate,
                continueEveryYear: form.continue,
                status: form.status
              }
              this._service.add(data, 'updateHolidayMaster/'+this.editId).subscribe((res)=>{
                if(res.respose=="Success"){
                  Swal.fire({
                
                    icon: 'success',
                    title: 'Data Added Successfully',
                    showConfirmButton: false,
                    timer: 1500
                  })
                
                  const currentRoute = this.router.url;

                  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                      this.router.navigate([currentRoute]); // navigate to same route
                  }); 
                }
                if(res.respose=="Already"){
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Data Code Already Exists',
                   
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
                this.holidayForm.markAllAsTouched();
              
      }    
          }

          edit(id){
            this.update = true;
            this.editId = id
            this.showMyContainer = true
            this._service.get('getHolidayMaster/'+id).subscribe((res)=>{
              var datePipe = new DatePipe('en-US');
              let effectiveDate = res.date
              effectiveDate = datePipe.transform(effectiveDate,'yyyy-MM-dd')
              console.log(this.holidayForm.get('branch').setValue(res.branch))
              this.holidayForm.get('branch').setValue(res.branch)
              this.holidayForm.get('state').setValue(res.state)
              this.holidayForm.get('department').setValue(res.department)
              this.holidayForm.get('category').setValue(res.category)
              this.holidayForm.get('holidayName').setValue(res.holidayName)
              this.holidayForm.get('type').setValue(res.type)
              this.holidayForm.get('continue').setValue(res.continueEveryYear)
              this.holidayForm.get('status').setValue(res.status)
              this.holidayForm.get('effectiveDate').setValue(effectiveDate)
              
             
              let category:any = []
              let department:any = []

     
  //   category.push(res.category)

  // this.holidayForm.get('category').setValue(category)
  res.categorys.forEach(element => {
    category.push(element.category)
    console.log(category)
  });
  this.holidayForm.get('category').setValue(category)
     
  res.departments.forEach(element => {
    department.push(element.department)
    console.log(department)
  });
 

  this.holidayForm.get('department').setValue(department)


 })
}
          cancel(){
            this.update = false;
            this.showMyContainer=false;
            this.holidayForm.reset();
            this.editId = '';
            this.get();
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
      this._service.get('deleteHolidayMaster/'+id).subscribe((res)=>{
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

}
