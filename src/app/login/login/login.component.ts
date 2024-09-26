import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { AllModulesService } from 'src/app/all-modules/all-modules.service';
import { WebStorage } from "src/app/core/storage/web.storage";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public CustomControler;
  public subscription: Subscription;
  public Toggledata=true;
  form = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  disabled: boolean = true;

  get f() {
    return this.form.controls;
  }

  constructor(private storage: WebStorage, public _service:AllModulesService) {

    this.subscription = this.storage.Loginvalue.subscribe((data) => {
      if(data != 0){
        this.disabled = true
        this.CustomControler = data;
        
      }
     
    });
  }

  ngOnInit() {
    // this.storage.Checkuser();
  }

  submit() { 
    if(this.form.valid){
      this.disabled = false
      this.storage.Login(this.form.value);
    }
    else{
      this.form.markAllAsTouched()
    }
    
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  iconLogle(){
    this.Toggledata = !this.Toggledata
  }
}