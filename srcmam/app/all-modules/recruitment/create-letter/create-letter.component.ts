import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormGroup, Validators } from '@angular/forms';
import { AllModulesService } from '../../all-modules.service';
import { FormBuilder } from '@angular/forms';
import { CKEditor5, CKEditorComponent, ChangeEvent } from '@ckeditor/ckeditor5-angular';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-letter',
  templateUrl: './create-letter.component.html',
  styleUrls: ['./create-letter.component.css']
})
export class CreateLetterComponent implements OnInit {
  @ViewChild( 'editor' ) editorComponent: CKEditorComponent;
  public Editor = ClassicEditor;
  private editor: CKEditor5.Editor;
  showMyContainer:boolean=false;
  text: string;
  searchForm:FormGroup;
  // contentForm:FormGroup;
  template: any;
  employees: any=[];
  searchData: any=[];
  tableData: any=[];
  dtOptions: { pagingType: string; pageLength: number; processing: boolean; dom: string; buttons: string[]; };
  editData: any=[];
  editId: any;
  count: any;
  constructor(public service:AllModulesService,public fb:FormBuilder,public router:Router) { }

  ngOnInit(): void {
    this.searchForm=this.fb.group({
      employeeName:['',Validators.required],
      templateName:['',Validators.required],
      template:'',
      newRequest: new FormArray([])  


      
    })

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'print', 
        ]
    };

    // this.contentForm=this.fb.group({
    //   templte:'',
    // })
    this.getAll();
    this.getTemplateName();
    this.getEmployee();
    
  }
  public onChange( { editor }: ChangeEvent ) {
    const data = editor.getData();

    // console.log( data );
}

showContainer(){
  //this.searchForm.reset();
  this.router.navigate(['layout/recruitment/createLetterComponent'])
  this.showMyContainer=true
  
  }
  hideContainer(){
    this.router.navigate(['layout/recruitment/createLetterComponent']);  
  this.showMyContainer=false
  //this.cancel()
  
  }


createRequest(): FormGroup {  
  return this.fb.group({
    variable:'',
  })
}

// newRequest: FormArray
//    addRequest(): void { 
//     console.log() 
//      this.newRequest = this.searchForm.get('newRequest') as FormArray;  
//      console.log(this.searchForm)
//      this.quantities().push(this.createRequest());  
//      console.log(this.newRequest)
//     }  

    quantities() : FormArray {
      return this.searchForm.get('newRequest') as FormArray; 
    }


getTemplateName(){
  let url='getTemplatesList'
  this.service.get(url).subscribe((res)=>{
    this.template=res
  })
}
getEmployee(){
  let url='employee_master/getemployees'
  this.service.get(url).subscribe((res)=>{
    this.employees=res
  })
}
newRequest: FormArray
serach(){
  
  console.log(this.searchForm)
  let form=this.searchForm.value
  let url='getTemplatesById/'+form.templateName
  this.service.get(url).subscribe((res)=>{
    this.searchData=res
    console.log(res.variableCount)
    
    this.searchForm.get('template').setValue(res.content)
    this.count=res.variableCount


 console.log() 
  this.newRequest = this.searchForm.get('newRequest') as FormArray;  
  console.log(this.searchForm)
  for(let i=0;i<this.count;i++){
    this.quantities().push(this.createRequest());  
    console.log(this.newRequest)

  }
  
 

  
  })
}
assign(){
  let form=this.searchForm.value
  let data={
    "employeeId":form.employeeName,
    "content":form.template,
   "variables":this.searchForm.value.newRequest,
	"templateId":this.searchData.templateId
	
}
let url="InsertAssignTemplatesToEmployee"
this.service.add(data,url).subscribe((res)=>{
  if(res.respose=='Success')
  {
Swal.fire({
  icon:'success',
  title:'Success',
  text:res.message
})
this.showMyContainer=false;
this.getAll();
this.searchForm.reset();
  }
  else if(res.respose=='Already'){
    Swal.fire({
      icon:'warning',
      title:'Warning',
      text:res.message
    })

  }
  else{
    Swal.fire({
      icon:'error',
      title:'Oops',
      text:'Something went wrong!'
    })
  }

})
}

getAll(){
  let url="getAssignTemplatesToEmployeeList"
  this.service.get(url).subscribe((res)=>{
    this.tableData=res
  })
}
delete(item){
  Swal.fire({
    title:"Are you really wants to delete..?",
    showCancelButton:true,
    confirmButtonColor: '#3085d6',
     cancelButtonColor: '#d33',
     confirmButtonText: 'Yes'
  }).then(result=>{
    console.log(result);
    if(result.isConfirmed==true)
    {
  let url="deleteAssignTemplatesToEmployee/"+item.assignTemplatesToEmployeeId
  this.service.get(url).subscribe((res)=>{
    if(res.respose=='Success')
    {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: res.message,
       
      })
       

     
    }
    else 
    {
      Swal.fire({
        icon: 'warning',
        title: 'Oops',
        text: 'Something went wrong! ',
       
      })
    }
    
  })
}
else{
this.getAll();
}
  })
}

edit(item){
  this.showMyContainer=true;
this.editId=item 
  let url="getAssignTemplatesToEmployeeById/"+item.assign_templates_to_employee_id
  this.service.get(url).subscribe((res)=>{
    this.editData=res
    this.searchForm.get('templateName').setValue(res.templateId)
    this.searchForm.get('employeeName').setValue(res.employeeId)
    this.searchForm.get('template').setValue(res.content)
    console.log(res.variables)
    res.variables.forEach((element)=>{
      console.log(element)
      this.quantities().push(this.fb.group({
        variable:element.variable
      }))
    })
    
  })
  
}
update(item){
  console.log(item)
let form=this.searchForm.value
  let url='updateAssignTemplatesToEmployee/'+item.assign_templates_to_employee_id
  let data={
    "employeeId":form.employeeName,
    "content":form.template,
   "variables":this.searchForm.value.newRequest,
	"templateId":this.searchData.templateId
	
}
  this.service.add(data,url).subscribe((res)=>{
    if(res.respose=='Success'){
      Swal.fire({
        icon:'success',
        title:'Success',
        text:res.message

      })
      this.showMyContainer=false;
      this.getAll();
    }
    else{
      Swal.fire({
        icon:'error',
        title:'Success',
        text:'Something went wrong'
      })

    }
  })
}

cancel(){
  const currentRoute = this.router.url;

  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]); 
  }); 
}
}
