import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AllModulesService } from '../../all-modules.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  listChildChanged = [];
  arr
  @Input() formData: FormGroup;
  editId: any;
  constructor(
    public service: AllModulesService,
    public router:Router, public _activatedroute:ActivatedRoute,
  ) { }

  ngOnInit(): void {
     this.getArrayList()
    const routeParam = this._activatedroute.snapshot.params;
  
    this.editId = routeParam.id;
    if(this.editId != 'add'){
      this.edit()
    }

  }

  

  checkMinusSquare(item) {
   // console.log(item)
    const count = item.childs.filter(x => x.checked == true).length;
    if (count > 0 && count < item.childs.length) {
      return true;
    } else if (count == 0) {
      return false;
    }
  }
  checkMinusSquares(item) {
    //console.log(item)
    const count = item.childs.filter(x => x.checked == true).length;
    if (count > 0 && count < item.childs.length) {
      return true;
    } else if (count == 0) {
      return false;
    }
  }

  checkParent(group_i, i) {
    this.arr[group_i].items[i].checked = !this.arr[group_i].items[i].checked;
console.log(this.arr[group_i].items[i])
    if (this.arr[group_i].items[i].checked) {
      this.arr[group_i].items[i].childs.map(x => (x.checked = true));
      console.log(this.arr[group_i].items[i].childs)
    } else {
      this.arr[group_i].items[i].childs.map(x => (x.checked = false));
    }
    this.arr[group_i].items[i].childs.forEach(x => {
      if (this.listChildChanged.findIndex(el => el.id == x.submenu1Id) == -1) {
        this.listChildChanged.push(x);
        console.log(this.listChildChanged)
      }
    });

    if(this.arr[group_i].items[i].childs.length > 0){
      for(let j = 0; j < this.arr[group_i].items[i].childs.length; j++){
       for(let k = 0; k < this.arr[group_i].items[i].childs[j].childs.length; k++){
        this.arr[group_i].items[i].childs[j].childs[k].checked = !this.arr[group_i].items[i].childs[j].childs[k].checked;
       }

      }
    }
  }
  checkParents(group_i, i,j) {
    this.arr[group_i].items[i].childs[j].checked = !this.arr[group_i].items[i].childs[j].checked;
    
    if (this.arr[group_i].items[i].childs[j].checked) {
      this.arr[group_i].items[i].childs[j].childs.map(x => (x.checked = true));
      console.log( this.arr[group_i].items[i].childs[j].childs)
    } else {
      this.arr[group_i].items[i].childs[j].childs.map(x => (x.checked = false));
    }

    
    this.arr[group_i].items[i].childs.forEach(x => {
      if (this.listChildChanged.findIndex(el => el.id == x.submenu1Id) == -1) {
        this.listChildChanged.push(x);
      }
    });
    console.log(this.listChildChanged)
  }

  checkChild(group_i, parent_i, i) {
    this.arr[group_i].items[parent_i].childs[i].checked = !this.arr[group_i]
      .items[parent_i].childs[i].checked;
    const count = this.arr[group_i].items[parent_i].childs.filter(
      el => el.checked == true
    ).length;
  
    if (count == this.arr[group_i].items[parent_i].childs.length) {
      console.log(this.arr[group_i].items[parent_i].childs)
       this.arr[group_i].items[parent_i].checked = true;
    } else {
      this.arr[group_i].items[parent_i].checked = true;
    }
    
    if (this.listChildChanged.findIndex(el => el.id == this.arr[group_i].items[parent_i].childs[i].submenu1Id) == -1) {
      
      this.listChildChanged.push(this.arr[group_i].items[parent_i].childs[i]);
     
      console.log(this.arr[group_i].items[parent_i].childs[i])
      
    }


  for(let j = 0; j < this.arr[group_i].items[parent_i].childs[i].childs.length; j++){
    this.arr[group_i].items[parent_i].childs[i].childs[j].checked = !this.arr[group_i]
      .items[parent_i].childs[i].childs[j].checked;
  }
  console.log(this.listChildChanged)
  }
 
  checkChilds(group_i, parent_i, i, j) {
    this.arr[group_i].items[parent_i].childs[i].childs[j].checked = !this.arr[group_i]
      .items[parent_i].childs[i].childs[j].checked;
    const count = this.arr[group_i].items[parent_i].childs[i].childs.filter(
      el => el.checked == true
    ).length;
    if (count == this.arr[group_i].items[parent_i].childs[i].childs.length) {
      this.arr[group_i].items[parent_i].childs[i].checked = false;
      console.log( this.arr[group_i].items[parent_i].childs[i])
    } else {
      this.arr[group_i].items[parent_i].childs[i].checked = true;
    }

   

  }



  edit(){
    this.service.get("getAllMainMenu").subscribe((res)=>{
      this.arr = res
      console.log(res)
      
    this.service.get("getRoleMaster/"+this.editId).subscribe((res)=>{
      let arrList = res.assignMenu
  
      for(let i = 0; i < this.arr?.length; i ++){
          for(let j = 0; j < this.arr[i].items.length; j++){
  
            if(this.ifPresent(this.arr[i]?.items[j]?.submenuId, arrList)){
              this.arr[i].items[j].checked = true
              console.log( this.arr[i].items[j])
            }
            for(let k = 0; k < this.arr[i]?.items[j]?.childs.length; k++){
              if(this.ifPresent(this.arr[i]?.items[j]?.childs[k]?.submenu1Id, arrList)){
                this.arr[i].items[j].childs[k].checked = true
                console.log(this.arr[i].items[j].childs[k] )
              }
              
              for(let l = 0; l < this.arr[i].items[j].childs[k].childs.length; l++)
              {
               
                if(this.ifPresent(this.arr[i]?.items[j]?.childs[k]?.childs[l]?.submenu2Id, arrList)){
                  this.arr[i].items[j].childs[k].childs[l].checked = true
                
                  
                }
              }
            }
          }
        }
      })
    })
  }
  

ifPresent(id, array){

  for(let i = 0; i < array.length; i++ ){
    if(array[i].menuId == id){

return true
    }
  }
}

  getListChildChanged(arr) {

let checkedList = []
for(let i = 0; i < arr.length; i++){

for(let j = 0; j < arr[i].items.length; j++)
{

if(arr[i].items[j].checked){
  console.log(arr[i].items[j])
  checkedList.push({menuId:arr[i].items[j].submenuId})
}

for(let k = 0; k < arr[i].items[j].childs.length; k ++)
{
  if(arr[i].items[j].childs[k].checked){
    console.log(arr[i].items[j].childs[k])
    checkedList.push({menuId:arr[i].items[j].childs[k].submenu1Id})
  }

for(let l = 0; l < arr[i].items[j].childs[k].childs.length; l++){
  if(arr[i].items[j].childs[k].childs[l].checked){
    console.log(arr[i].items[j].childs[k].childs[l])
    checkedList.push({menuId:arr[i].items[j].childs[k].childs[l].submenu2Id})
  }
}

}
}

}


if(this.formData.valid){
  let url = 'updateRoleMaster/'+this.editId

  let form = this.formData.value
  let data =  {
      companyName: form.name,
        
        roleType: form.roleType,
        
          roleName: form.roleName,
        
        roleDescription: form.roleDescription,
        status: form.status,
        assignMenu:checkedList
  
      }
  
  
  
  this.service.add(data, url).subscribe((res)=>{
    if (res.respose == 'Success'){
      Swal.fire({
       
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })
      // this.router.navigate(['layout/masters/roleMaster'])
    }
    else{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      timer: 1500
    })
  }
  
  })
}

else{
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Something went wrong!',
    timer: 1500
  })
}
}
getArrayList(){
 
  this.service.get("getAllMainMenu").subscribe((res)=>{
    this.arr = res


  });
  


}
}



