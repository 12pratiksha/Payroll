import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AllModulesService } from '../../all-modules.service';
import { DatePipe } from "@angular/common";
import { error } from 'console';


@Component({
  selector: 'app-e-coff-application',
  templateUrl: './e-coff-application.component.html',
  styleUrls: ['./e-coff-application.component.css']
})
export class ECoffApplicationComponent implements OnInit {
  employees
  //generatedDate = [{id:'', name:''}]
  
  coffForm: FormGroup
  disabled: boolean=false;
  ecoffDetials: any=[];
  coff: any=[];
  empId: any;
  eCoffbalanceId: any;


  constructor(private datePipe: DatePipe,
    public _service: AllModulesService,
    public fb: FormBuilder,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getAllEmployee();
  
  //   this.coffForm = this.fb.group({
  //     employeeId:['',Validators.required],
  //       balance: ['',Validators.required],
  //       fromDate:['',Validators.required],
  //       toDate: ['',Validators.required],
  //       otHours:[''],
  //       scoff: ['',Validators.required],
  //       reasonForCoff: ['',Validators.required],
  //       leavedate:['',Validators.required],
  //       type:[''],
  //       type2:[''],
  //       fistorsecondhalf:[''],
  //       fromTime:[''],
  //       toTime:[''],
  //       encash:['']
    
  // })
  this.coffForm = this.fb.group({
    employeeId:['',Validators.required],

  fArray: this.fb.array([]) 
})


  console.log(this.coffForm)
  }
 
  fArray() : FormArray {
    return this.coffForm.get('fArray') as FormArray
    }

    newFarray(): FormGroup{
      return this.fb.group({
            employeeId:[''],
        balance: [''],
        fromDate:[''],
        toDate: [''],
        otHours:[''],
        scoff: ['',Validators.required],
        reasonForCoff: [''],
        leavedate:[''],
        type:[''],
        type2:[''],
        fistorsecondhalf:[''],
        fromTime:[''],
        toTime:[''],
        encash:[''],
        EcoffHoursForOT:['']
      })
      }
      
      

  getAllEmployee(){
    this._service.get("employee_master/getemployees").subscribe((data) => {
      this.employees = data;
     // console.log(this.employees)
      
      
    });
  }

  newform:any;
  details(){
    
    
    this._service.get('getCoffByempId/'+ this.coffForm.value.employeeId).subscribe((res)=>{
      //console.log(res)
      console.log(res.length);
      if(res?.length==0)
      {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No Data found',
          
        })
       // this.disabled = true
      }
      else
      {
        this.coff = res;
        this.fArray().clear()
        for ( let i = 0; i < res.length; i ++){

          console.log(res[i])
let myform ={
  
  employeeId:[res[i].employeeId,],
        balance: [res[i].mainbalance],
        fromDate:[this.datePipe.transform(res[i].fromdate, 'yyyy-MM-dd')],
        toDate: [this.datePipe.transform(res[i].todate, 'yyyy-MM-dd')],
        otHours:[res[i].EcoffHoursForOT],
        scoff: ['',Validators.required],
        reasonForCoff: [''],
        leavedate:[''],
        type:[res[i].type],
        type2:[res[i].halfOrFullDay],
        fistorsecondhalf:[''],
        fromTime:[''],
        toTime:[''],
        encash:[''],
        EcoffHoursForOT:[res[i].EcoffHoursForOT],
        leaveid:[res[i].leaveBalanceId]

}
this.newform = this.fb.group(myform);
          this.fArray().push(this.newform)
          console.log(this.newform)
        }
    }
  })
}


  submit(){
    let form = this.coffForm.value
    console.log(form)
   
    let data = {
      employeeId: form.employeeId,
     
      ecoffDetials:
       this.ecoffDetials
      
    
      // coffCode: "COL",
     
      // fromDate: form.fromDate,
      // toDate:form.toDate,
      // // status: "",

      // reasonForCoff: form.reason,
      // leavedate:form.leavedate
    }
    // console.log(this.ecoffDetials.scoff)

    this._service.add(data, "insertECoffApplication").subscribe((res)=>{
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
    else  if(res.respose=="Already"){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Data Code Already Exists',
         
        })
      }
      else if(res.respose=="Fail"){
        Swal.fire({
          icon: 'error',
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
    mychange(event,quantity){
      console.log(event)
      // console.log(quantity.value.fromTime, quantity.value.toTime)
        if(event==true){
          let leavedate=this.datePipe.transform(quantity.value.leavedate, 'yyyy-MM-dd')
          // console.log(leavedate)
      // if(quantity.value.type=='leave' && quantity.value.halfOrFullDay=='HalfDay'){
        
      this.ecoffDetials.push({
      "balance": quantity.value.balance,
      "fromDate": quantity.value.fromDate,
      "toDate": quantity.value.toDate,
      "scoff": "true",
      "encashableHours":quantity.value.EcoffHoursForOT,
      "reasonForCoff": quantity.value.reasonForCoff,
      "leavedate":leavedate,
      "ecoffbalanceId":quantity.value.leaveid,
      "type":quantity.value.type,
      "halfOrFullDay":quantity.value.type2, 
      "firstHalfOrSecondHalf":quantity.value.fistorsecondhalf,
      "fromtime":quantity.value.fromTime,
      "totime":quantity.value.toTime,
      "encashable":quantity.value.encash,
      "leaveId":quantity.value.leaveid
    });
  }
  else if(event==false)
  {

    let indexx = this.ecoffDetials.indexOf(this.ecoffDetials);
    this.ecoffDetials.splice(indexx, 1);  
    
  }
  console.log(this.ecoffDetials)
  

    }
    encash(event)
    {
      console.log(event)

    }
   // mychange(event,selecteditem,reason,leaveDate,fistorsecondhalf,fromTime,toTime,encash){
//       console.log(event,selecteditem)
//       //console.log(selecteditem.leaveBalanceId)
//     //  console.log(selecteditem.leaveBalanceId+">>>>"+event.target+">>>"+reason+"<<<<"+leaveDate)
     
//     if(event==true){
//       if(selecteditem.type=='leave' && selecteditem.halfOrFullDay=='HalfDay'){
        
//       this.ecoffDetials.push({
//         "balance": selecteditem.mainbalance,
//       "fromDate": selecteditem.fromdate,
//       "toDate": selecteditem.todate,
//       "scoff": "true",
//       "encashableHours":selecteditem.ecoffHoursForOT,
//       "reasonForCoff": reason,
//       "leavedate": leaveDate,
//       "ecoffbalanceId":selecteditem.leaveBalanceId,
//       "type":selecteditem.type,
//       "halfOrFullDay":selecteditem.halfOrFullDay,
//       "firstHalfOrSecondHalf":fistorsecondhalf,
//       "fromtime":'',
//       "totime":'',
//       "encashable":encash,
//       "leaveId":selecteditem.leaveBalanceId
//     });
//   }
  
//   else if( selecteditem.type=='leave')
//   {
   
//     console.log(selecteditem.length)
//     this.ecoffDetials.push({
//       "balance": selecteditem.mainbalance,
//     "fromDate": selecteditem.fromdate,
//     "toDate": selecteditem.todate,
//     "scoff": "true",
//     "encashableHours":selecteditem.ecoffHoursForOT,
//     "reasonForCoff": reason,
//     "leavedate": leaveDate,
//     "ecoffbalanceId":selecteditem.leaveBalanceId,
//     "type":selecteditem.type,
//     "halfOrFullDay":selecteditem.halfOrFullDay,
//     "firstHalfOrSecondHalf":'',
//     "fromtime":'',
//     "totime":'',
//     "encashable":encash,
//     "leaveId":selecteditem.leaveBalanceId
//   });

//   }
//   else {
   
//     this.ecoffDetials.push( {
//       "balance": selecteditem.mainbalance,
//     "fromDate": selecteditem.fromdate,
//     "toDate": selecteditem.todate,
//     "scoff": "true",
//     "encashableHours":selecteditem.ecoffHoursForOT,
//     "reasonForCoff": reason,
//     "leavedate": leaveDate,
//     "ecoffbalanceId":selecteditem.leaveBalanceId,
//     "type":selecteditem.type,
//     "halfOrFullDay":'',
//     "firstHalfOrSecondHalf":'',
//     "fromtime":fromTime,
//     "totime":toTime,
//     "encashable":encash,
//     "leaveId":selecteditem.leaveBalanceId
//   });
// }
//     }
  
//     console.log(this.ecoffDetials)
    
  
// }
    
   
    
  
  
//   coff:any;

//   details(){
    
//     this._service.get('getCoffByempId/'+ this.coffForm.value.employee).subscribe((res)=>{
//       console.log(res)
//       if(res?.length==0)
//       {
//         Swal.fire({
//           icon: 'error',
//           title: 'Oops...',
//           text: 'No Data found',
          
//         })
//         this.disabled = false;
     
//       }
//       else
//       {
//         this.coffForm = res;
//         this.disabled = true
//     }
//   })
// }
//   cancel(){
    
//   }
// }





// import { Component, OnInit } from '@angular/core';
// import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import Swal from 'sweetalert2';
// import { AllModulesService } from '../../all-modules.service';
// import { DatePipe } from "@angular/common";


// @Component({
//   selector: 'app-e-coff-application',
//   templateUrl: './e-coff-application.component.html',
//   styleUrls: ['./e-coff-application.component.css']
// })
// export class ECoffApplicationComponent implements OnInit {
//   employees
//   //generatedDate = [{id:'', name:''}]
  
//   coffForm: FormGroup
//   item1data: any=[];
//   ecoffDetials: any=[];

//   constructor(private datePipe: DatePipe,
//     public _service: AllModulesService,
//     public fb: FormBuilder,
//     public router: Router
//   ) { }

//   ngOnInit(): void {

  // this.coffForm = this.fb.group({
  //   employeeId:['',Validators.required],
  //   ecoffDetials:[[{
  //     "balance": ['',Validators.required],
  //     "fromDate":['',Validators.required],
  //     "toDate": ['',Validators.required],
  //     "scoff": ['',Validators.required],
  //     "reasonForCoff": ['',Validators.required],
  //     "leavedate":['',Validators.required],

  // }],Validators.required],



    
//   })

//   this.getAllEmployee();
//   }


//   getAllEmployee(){
//     this._service.get("employee_master/getemployees").subscribe((data) => {
//       this.employees = data;
      
      
//     });
//   }
  
// change(event,selecteditem,reason,leaveDate){
 
//   console.log(selecteditem.leaveBalanceId+">>>>"+event.target.checked+">>>"+reason+"<<<<"+leaveDate)
//   if(event.target.checked==true){


//   this.ecoffDetials.push( {"balance": selecteditem.mainbalance,
//   "fromDate": selecteditem.mainbalance,
//   "toDate": selecteditem.todate,
//   "scoff": "true",
//   "reasonForCoff": reason,
//   "leavedate": leaveDate});

  

// }
// }

//   submit(){
   
//     let form = this.coffForm.value
//     console.log(this.coff)
//     console.log( this.item1data);
    
//     // let generatedDate = []
//     // form.generatedDate?.forEach(element => {
//     //   let value = {'date':element}
//     //   generatedDate.push(value)
//     // });
//     let data = {
//       // employeeId: form.employee,
//       // coffCode: "COL",
//       // balance:this.coff.floatbalance,
//       // generatedDates: this.coff.generatedDate,
//       // expireDate:this.coff.expireDate,
//       //status: "",
//       reason:form.reason,
//       leaveDate:form.leaveDate,
//       selectedData:this.item1data
//       //reasonForCoff: form.reason
//     }

//     this._service.add(data, "insertECoffApplication").subscribe((res)=>{
//       console.log(res)
//       if(res.respose=="Success"){
//         Swal.fire({
      
//           icon: 'success',
//           title: 'Data Added Successfully',
//           showConfirmButton: false,
//           timer: 1500
//         })
//         const currentRoute = this.router.url;
    
//         this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
//             this.router.navigate([currentRoute]); // navigate to same route
//         }); 
//       }
//     else  if(res.respose=="Already"){
//         Swal.fire({
//           icon: 'error',
//           title: 'Oops...',
//           text: 'Data Code Already Exists',
         
//         })
//       }
//       else{
//         Swal.fire({
//           icon: 'error',
//           title: 'Oops...',
//           text: 'Something went wrong!',
          
//         })
//       }
//     })

//   }
//   coff:any;


  // details(){
    
    
  //   this._service.get('getCoffByempId/'+ this.coffForm.value.employee).subscribe((res)=>{
  //     console.log(res)
  //     if(res?.length==0)
  //     {
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Oops...',
  //         text: 'No Data found',
          
  //       })
  //      // this.disabled = true
  //     }
  //     else
  //     {
  //       this.coffForm = res;
  //   }
  // })
     
    

  //      res.data.forEach(element => {
        
 
  //     let mydate= this.datePipe.transform(element.date, "dd/MM/yyyy");
  //     console.log();
  //     this.coffForm.patchValue({generatedDate:mydate});
  //       this.generatedDate.push({id:mydate, name:mydate})
  //      });
      
      
  // disabled: boolean = true

  // valid(){
  //   if(this.coffForm.value.employee){
  //     this.disabled = false
  //   }
// }
//   cancel(){
    
//   }
  }
