import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AllModulesService } from 'src/app/all-modules/all-modules.service';

@Injectable({
  providedIn: 'root',
})
export class WebStorage {
  path=environment.apiEndpoint;
  public Loginvalue = new BehaviorSubject<any>(0);
  public Createaccountvalue = new BehaviorSubject<any>(0);
  public Forgotpasswordvalue = new BehaviorSubject<any>(0);
  constructor(private router: Router,public HttpClient :HttpClient, public _service: AllModulesService) {}

  /**
   * Create account Function call from Registerpage
   * @param uservalue from user form value
   */
  public Createaccount(uservalue: any): void {
    let Rawdata = localStorage.getItem('Loginusers');
    let Pdata: any = [];
    Pdata = JSON.parse(Rawdata);
    const Eresult: any = Pdata.find(({ email }) => email === uservalue.email);
      if (Eresult) {

        this.Createaccountvalue.next('This email are already exist');
      } else {
        
      
        Pdata.push(uservalue);
        const jsonData = JSON.stringify(Pdata);
        localStorage.setItem('Loginusers', jsonData);

        this.Login(uservalue);
      }
  }

  /**
   * Login Functionality call from Login
   * @param uservalue from login page
   */
  public Login(uservalue: any): void {
    let returndata={message:'',status:''}
    this._service.getMenuData().subscribe((res)=>{
    this.path = res.baseURL;
    console.log(this.path)
    this._service.log( this.path+"authenticate", uservalue).subscribe((res)=>{
    console.log(res)
    if(res.respose == "Success"){
      console.log(uservalue.username)
      localStorage.setItem('inactivity', "false")
      localStorage.setItem('User', uservalue.username);
      localStorage.setItem('empid',res.data[0].employeeid);
      localStorage.setItem('LoginData', "Bearer "+res.data[0].token);
      this.Loginvalue.next('Login success');
      localStorage.setItem('type', res.data[0].type)
      localStorage.setItem('footer', res.data[0].footer)
      localStorage.setItem('rpStatus', res.data[0].rmstatus);
      localStorage.setItem('companyName', res.data[0].companyName);
      localStorage.setItem('address', res.data[0].address);
      localStorage.setItem('Birth', res.data[0].birthdayflag);
      localStorage.setItem('loginData',JSON.stringify( res.data[0]))
      localStorage.setItem('baseurl',res.data[0].baseUrl);
      if(res.data[0].type == "Admin" ){
        localStorage.setItem('branchStatus',res.data[1].branch);
        localStorage.setItem('branchId',res.data[1].branchId);
        this.router.navigate(['/layout/dashboard/admin']);
        this.Loginvalue.next(0);
      }
      else if(res.data[0].type == "Super Admin"){
        this.router.navigate(['/layout/dashboard/admin']);
        this.Loginvalue.next(0);
      }
      else{
        localStorage.setItem('branchStatus',res.data[1].branch);
        localStorage.setItem('branchId',res.data[1].branchId);
        this.router.navigate(['layout/dashboard/employee']);
        this.Loginvalue.next(0);
      }
    }
   },
   error =>
   {
   if(error){
    returndata.message='Incorrect Username or Password'
    returndata.status='password'
    this.Loginvalue.next(returndata);

   }   })
  })
    // if (uservalue.username) {
    //   if (uservalue.username=="4455" && uservalue.password=="Ram123") {
    //    
     
    //     this.Loginvalue.next('Login success');
    //     this.router.navigate(['/layout/dashboard/admin']);
    //     this.Loginvalue.next(0)1

    //   }
    //    else {
    //     returndata.message='Incorrect password'
    //     returndata.status='password'
    //     this.Loginvalue.next(returndata);
    //   }
    // } else {
    //   returndata.message='Username is  not valid'
    //   returndata.status='email'
    //   this.Loginvalue.next(returndata);
    // }
  
  }
  /**
   * Create Token function for authendication
   * @param uservalue recived from login function
   */
  //  resultArray:any
  // public Createtoken(uservalue) {

  //   this.HttpClient.post(this.path+"authenticate",uservalue).subscribe(data=>{
  //    this.resultArray=data;
  //   //  console.log(">>>"+this.resultArray.token);
  
       
        
  //    });


   
  // }

  /**
   * Two Storage are used
   */
  public Deleteuser() {
    localStorage.removeItem('Loginusers');
    localStorage.removeItem('LoginData');
  }

  /**
   * called from Login page init statement
   */
  // public Checkuser(): void {
  //   let users = localStorage.getItem('Loginusers');
  //   if (users === null) {
  //     let password = [
  //       {
  //         email: '1',
  //         password: '12021',
  //       },
  //     ];
  //     const jsonData = JSON.stringify(password);
  //     localStorage.setItem('Loginusers', jsonData);
  //   }
  // }

  /**
   * Forgot password function
   * @param uservalue email object recived from Forgot password
   */
  public Forgotpassword(uservalue): void {
    let Rawdata = localStorage.getItem('Loginusers');
    let Pdata: any = [];
    Pdata = JSON.parse(Rawdata);
    const Eresult = Pdata.find(({ email }) => email === uservalue.email);
    if (Eresult) {1
      this.Forgotpasswordvalue.next(Eresult);
    } else {
      this.Forgotpasswordvalue.next('Email Not Valid');
    }
  }
}
