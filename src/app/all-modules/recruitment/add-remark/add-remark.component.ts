import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-remark',
  templateUrl: './add-remark.component.html',
  styleUrls: ['./add-remark.component.css']
})
export class AddRemarkComponent implements OnInit {
  remarkForm: FormGroup
  constructor(
    public router: Router,
    public fb: FormBuilder,
  ) { }

  ngOnInit(): void {

this.remarkForm = this.fb.group({

})
  

  }
  hideContainer(){
    const currentRoute = this.router.url;

    this.router.navigateByUrl('/layout/recruitment/candidate')
  }
}
