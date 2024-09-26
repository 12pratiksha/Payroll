import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { AllModulesService } from "../../all-modules.service";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  FormArray,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";
import { DatePipe } from "@angular/common";
import { Router } from "@angular/router";
import { IMultiSelectOption } from 'ngx-bootstrap-multiselect';
import Swal from "sweetalert2";

@Component({
  selector: 'app-candidates-list',
  templateUrl: './candidates-list.component.html',
  styleUrls: ['./candidates-list.component.css']
})
export class CandidatesListComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  
  public dtElement: DataTableDirective;
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe("en-US");
  container : boolean = false;
  scheduleContainer : boolean = false 
  candidatesForm: FormGroup
  scheduleForm: FormGroup
  
  myOptions: IMultiSelectOption[];
  candList: any=[];
  employees: any;
  data: any=[];
  candidateId: any;
  details: any;
  tableData: any;
  designation: any;
  tableData1: any;
  baseurl: string;
  newArray: any=[];
  dtOptions: { pagingType: string; pageLength: number; processing: boolean; dom: string; buttons: string[]; };
  date: Date;
  constructor(
    private _service: AllModulesService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private _fb: FormBuilder
  ) {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'print', 
        ]
    };

  }

  async ngOnInit() {
    this.date= new Date();
    this.baseurl=localStorage.getItem('baseurl')

    await this.getDesignation();

    this.myOptions = [];
    this.scheduleForm = this._fb.group({
      rounds:'',
      candidateId:'',
      // date:'',
      // time:'',
      fArray: this.formBuilder.array([]) , 
     
    })

    
    //this.list();
    this.getEmp()

    //this.scheduleForm.get("rounds")

 
  }
  async getDesignation(){
    await this._service.get("getAllDesignationMaster").subscribe(async (res)=>{
      this.designation = res
      await this.list()
      
    })
  }
  hideContainer(){
    const currentRoute = this.router.url;

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentRoute]); 
    }); 
    this.container = false
  }

  showContainer(){
   this.container = true
  
  }
  requirement_id:any;
  schedule(item){
    console.log(item.requirement_id)
    this.requirement_id=item.requirement_id;
    let url='getByApplicantCandiateListId/'+item.applicant_candiate_list_id
    this._service.get(url).subscribe((res)=>{
      //this.details=res

      this.tableData1 = res
      console.log(this.tableData1)
      this.details=[];
      this.tableData1.forEach(async element => {
        let desg=element.designation;


          if( isNaN(desg)){
           }else{
            
            let result3 =this.designation.filter((design: any) =>
            (design.designationMasterId==desg) )
          desg = result3[0].name;
           }
         
        this.details.push({"requirement_id":element.requirement_id,"availability":element.availability,"state":element.state,"city":element.city,"phone":element.phone, "applicant_candiate_list_id":element.applicant_candiate_list_id,"first_name":element.first_name,"last_name":element.last_name, "description":element.description,"skills":element.skills,"experience":element.experience,"designation":desg,"department_name":element.department_name,"cv_name":element.cv_name,"qualification":element.description})
      

     
      
        
      });




    })
this.candidateId=item.applicant_candiate_list_id
    this.scheduleContainer = true
    this.container = true

  }

  
  newFarray(): FormGroup{
    return this.formBuilder.group({
      type:['',Validators.required],
      round:['',Validators.required],
      onDate:['',Validators.required],
      atTime:['',Validators.required],
      interview:[null,Validators.required]
      // remarkfromHr: '',
      // otherDetails: ''

    })
    console.log(this.newFarray)
    }
    // create(): FormGroup{
    // return this.formBuilder.group({
    //   rounds:'',
    // })
    // }

    fArray() : FormArray {
      return this.scheduleForm.get('fArray') as FormArray
      console.log(this.fArray)
      }

      
  
      
  addItem(e): void {  
console.log(e)
    this.fArray().clear()
  
    for (let i = 0; i < e; i ++){
      this.fArray().push(this.newFarray())
      
    }

  }

  // insideArray(farrayindex:number) : FormArray{
  //  // return this.details().at(farrayindex).get("interviewers") as FormArray
  //   }
    
    // newArray(): FormGroup{
    //   return this.formBuilder.group({
    //     empId:'',
    //     remarkfromHr: '',
    //     otherDetails: ''
    //   })
    // }
//   create(): FormGroup {  
//     return this.formBuilder.group({  
//        rounds:'',
       
//     });  
//   } 

// details : FormArray
//   addItem(e): void {  
//     this.details = this.scheduleForm.get('details') as FormArray;  
//     console.log(this.details)
//     while (this.details.length !== 0) {
//       this.details.removeAt(0)
//     }
    
//     for (let i = 0; i < e.length; i ++){
//       this.details.push(this.formBuilder.group({  
//         empid: e[i],  
//          date:'',
//          time:'',
//          type:'',
//       // interviewers:this.fb.array([])
//         // remarkfromHr:'',
//         // otherDetails:''
//       })  );
   
//       console.log(this.details)
//     }
    
//   }  

  getEmp(){
   let url1='getAllActiveEmployees'
    let employees=[]
    let url="employee_master/getemployees"
    this._service.get(url1).subscribe((res)=>{
       
        this.employees = res
        

    })

   }
  remark(){
    this.router.navigate(['/layout/recruitment/remarks'])
  }

remove(i){
 // this.details.removeAt(i)
  this.scheduleForm.get('rounds').setValue(this.fArray.length)
}

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  onChange(e){
    console.log(e)
  }
  list(){
    this.candList=[];
    let url="getAllApplicantCandiateListList"
    this._service.get(url).subscribe(res=>{

      this.tableData = res
    
      this.tableData.forEach(async element => {
        let desg=element.designation;


          if( isNaN(desg)){
           }else{
            
            let result3 =this.designation.filter((design: any) =>
            (design.designationMasterId==desg) )
          desg = result3[0].name;
           }
         
        this.candList.push({"requirement_id":element.requirement_id,"applicant_candiate_list_id":element.applicant_candiate_list_id,"first_name":element.first_name,"last_name":element.last_name, "description":element.description,"skills":element.skills,"experience":element.experience,"designation":desg,"department_name":element.department_name,"cvName":element.cv_name})
      

     
      
        
      });
      
    });

      
  }
  // download(cvName){
  //   let url="EditCv"
  //   const formData = new FormData();
  //   formData.append('imageName', cvName);
  //   this._service.add(formData,url).subscribe(res=>{
  //   console.log(res)
  //   })  
  // }


  open(cvName) {
    
        // let file = new window.Blob([cvName], {type: 'application/pdf'});
        // let fileURL = window.URL.createObjectURL(file);
        window.open(cvName, '_blank');
      
   
  }

  // open(cvName)
  // {
  //   let url=cvName
  //   window.open('url');

  // }

//   submit(){
//     console.log(this.requirement_id)
//     let form=this.scheduleForm.value
//     console.log(this.scheduleForm)
//      if(this.scheduleForm.status=='VALID'){
//     console.log(form)
//     let url='AddNoOfRounds'
//     //let url="AddScheduleInterviewForRound"
//     let data={
    
//     "scheduleInterviewForRound":form.fArray,
//     "applicantCandiateId":this.candidateId,
//       "roundNo":form.rounds,
//     "recruitmentid":this.requirement_id
    
//   }
//   console.log(data)
//     this._service.add(data,url).subscribe(res=>{
//       console.log(res)
//       if(res.respose=='Success')
//       {
//         Swal.fire({
//           icon: 'success',
//           title: 'Success',
//           text: 'Your work is successfully done',
         
//         })
//        this.router.navigate(['/layout/recruitment/candidate'])
//         this.list();
        
//       }
//       else{
//         Swal.fire({
//           icon: 'error',
//           title: 'Oops...',
//           text: 'Something went wrong!',
          
//         })
//       }
//     })
//     this.scheduleForm.reset();
//   }
//   else{
//     Swal.fire({
//       icon: 'error',
//       title: 'Oops...',
//       text: 'Something went wrong!',
      
//     })
//   }


// }

submit(){
  console.log(this.requirement_id)
  let form=this.scheduleForm.value
  console.log(this.scheduleForm)
   if(this.scheduleForm.status=='VALID'){
  console.log(form)
  let url='AddNoOfRounds'
  // let url="AddScheduleInterviewForRound"
  // form.fArray.forEach(element => {
    let Ary=form.fArray
    console.log(Ary)
    for(let i=0; i<=Ary.length-1;i++){
      console.log(Ary)
   this.newArray.push({
    "type":Ary[i].type,
    "round":Ary[i].round,
    "onDate":Ary[i].onDate,
    "atTime":Ary[i].atTime,
    "interview": Ary[i].interview, 
    "roundNo":i+1

   })
    
  }
  console.log(this.newArray)
  let data={
  
  "scheduleInterviewForRound":this.newArray,
  "applicantCandiateId":this.candidateId,
    "roundOfNo":form.rounds,
  "recruitmentid":this.requirement_id
  
}
console.log(data)
  this._service.add(data,url).subscribe(res=>{
    console.log(res)
    if(res.respose=='Success')
    {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Your work is successfully done',
       
      })
    this.hideContainer(); 
      
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        
      })
    }
  })
  this.scheduleForm.reset();
}
else{
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Something went wrong!',
    
  })
}


}

  cancel(item){
console.log(item)
Swal.fire({
  title:"Do you really want to Cancel This Candidate?",
  showCancelButton:true,
  confirmButtonColor: '#3085d6',
   cancelButtonColor: '#d33',
   confirmButtonText: 'Yes'
}).then(result=>{
  console.log(result);
  if(result.isConfirmed==true)
  {


    let data={
      "requirementId":item.requirement_id,
      "applicantCandiateListId":item.applicant_candiate_list_id,
      "status":3, //Cancel Before Interview Scheduled
       "remark":"Canceled Before Interview Scheduled",
      
      }
      
          let url='UpdateApplicantCandiateByRequirementId?requirementId='+item.requirement_id+'&applicantCandiateListId='+item.applicant_candiate_list_id+'&status=2&remark=Canceled Before Interview Scheduled';
          this._service.add(data,url).subscribe((res)=>{
            if(res.respose=='Success')
            {
              Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Candidate Cancelled Successfully',
               
              })
             this.list();
              
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
  });




  }
  
}
