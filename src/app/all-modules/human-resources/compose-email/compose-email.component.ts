import { Component, OnInit, ViewChild } from '@angular/core';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor5 } from '@ckeditor/ckeditor5-angular';
import { FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-compose-email',
  templateUrl: './compose-email.component.html',
  styleUrls: ['./compose-email.component.css']
})
export class ComposeEmailComponent implements OnInit {
  @ViewChild( 'editor' ) editorComponent: CKEditorComponent;
  public Editor = ClassicEditor;
  subject;
  template;
  data = ''
  text: any;
  hide = true;
  private editor: CKEditor5.Editor;
  public onReady( editor ) {
    this.editor = editor;
    editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
    );
   
}
  constructor( ) { }

  ngOnInit(): void {
    this.subject = new FormControl  ('',[Validators.required]);
    this.template = new FormControl  ('',[Validators.required]);
    console.log(this.template)
  }

  public onBlur(event) {
   
 
    this.text = this.editor.getData();
   
  }
  getTemplate(){
    console.log(this.text)
    console.log(this.template.value)
    this.template.reset()
  }
}
