import { Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor5 } from '@ckeditor/ckeditor5-angular';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AllModulesService } from '../../all-modules.service';

@Component({
  selector: 'app-compose-email',
  templateUrl: './compose-email.component.html',
  styleUrls: ['./compose-email.component.css']
})
export class ComposeEmailComponent implements OnInit {
  mailForm:FormGroup;
  @ViewChild( 'editor' ) editorComponent: CKEditorComponent;
  public Editor = ClassicEditor;
  subject;
  template;
  data = ''
  text: any;
  private editor: CKEditor5.Editor;
  public onReady( editor ) {
    this.editor = editor;
    editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
    );
   
}
  constructor(public fb:FormBuilder,public service:AllModulesService) { }

  ngOnInit(): void {
    this.mailForm=this.fb.group({
      to:['',Validators.required],
      cc:['',Validators.required],
      bcc:['',Validators.required],
      subject:['',Validators.required],
      template:['',Validators.required]
    })
    

  }
  

  public onBlur(event) {
    this.text = this.editor.getData();
   
  }
  submit(){
    console.log(this.mailForm)
    let form=this.mailForm.value
   console.log(this.editor)
   var to=form.to.split(' ').map(value => value.trim());
   var cc=form.cc.split(' ').map(value => value.trim());
   var bcc=form.bcc.split(' ').map(value => value.trim());
   console.log(to)
   let data={
    "mailTo": to,
    "mailCc": cc,
    "mailBcc": bcc,
    "mailSubject": form.subject,
    "mailContent": form.template,
    "attachments":["C:\\Users\\Sindans\\Pictures\\payment_sc1.png","C:\\Users\\Sindans\\Pictures\\process1.jpg"]
    
   }

   let url='sendEmail'
   this.service.add(data,url).subscribe((res)=>{
   console.log(res)
   })
  
  }


}
