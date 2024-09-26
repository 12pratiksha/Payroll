import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { AllModulesService } from '../../all-modules.service';
import { CKEditor5, CKEditorComponent, ChangeEvent } from '@ckeditor/ckeditor5-angular';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.css']
})
export class CreateTemplateComponent implements OnInit {
  @ViewChild( 'editor' ) editorComponent: CKEditorComponent;
  public Editor = ClassicEditor;
  tempForm:FormGroup;

 private editor: CKEditor5.Editor;
  text: string;
  variables: any;
  firstName: any;
  lastName: any;
  gender: any;
  city: any;
  dateOfBirth: any;
  availability: any;
  experience: any;
  skills: any;
  qualification: any;
  Phone: any;
  middleName: any;
  state: any;
  email: any;
  age: any;
  applicationDate: any;
  constructor(public fb:FormBuilder,public service:AllModulesService,public router:Router) { }

  ngOnInit(): void {
    this.tempForm=this.fb.group({
      templateName:['',Validators.required],
      type:['',Validators.required],
      template:['',Validators.required],
      variable:[''],
      template1:['',Validators.required]
    })
  }
  public onChange( { editor }: ChangeEvent ) {
    const data = editor.getData();

    console.log( data );
}

public onChange1({ editor }: ChangeEvent ){
  const data = editor.getData();

  console.log( data ); 
}
submit(){
  let form=this.tempForm.value
  let url="InsertTemplates"
  let content= form.template;
  content = content.replaceAll('{#var}','XVARX');
  let data1={
    "templateName":form.templateName,
    "type":form.type,
    "content":form.template,
    "samplecontent":form.template1,
    "variables":[
        {"Variable":"V1"},
         {"Variable":"V2"}
    ]
}
console.log(data1)
if(this.tempForm.status=='VALID'){
  this.service.add(data1, url).subscribe(res=>{
    console.log(res)
    if(res.respose=='Success'){
      Swal.fire({
        icon:'success',
        title:'Success',
        text:'Your work has been saved!'
      })
      const currentRoute = this.router.url;

      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([currentRoute]); // navigate to same route
      }); 
    }
    else{
      Swal.fire({
        icon:'error',
        title:'Error',
        text:'Something went wrong'
      })

    }
  })

}
else{
  Swal.fire({
    icon:'error',
    title:'Error',
    text:'Something went wrong'
  })

}
}
getVariable($event){
  console.log($event)
  let url='getAutoAddFieldList'
  this.service.get(url).subscribe(res=>{
    this.variables=res
    console.log(res[0].lastName)
    
  })
}
}
