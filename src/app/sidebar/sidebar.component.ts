import { Component, OnInit } from "@angular/core";
import { Router, Event, NavigationEnd } from "@angular/router";
import { AllModulesService } from "../all-modules/all-modules.service";
//import { AllModulesService } from "../all-modules/all-modules.component";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit {
  urlComplete = {
    mainUrl: "",
    subUrl: "",
    childUrl: "",
  };

  sidebarMenus = {
    default: true,
    chat: false,
    settings: false,
  };

  members = {};
  groups = {};
  type: any;
  empid: any;
  eid: any;
  roleid:any[];
  Loginvalue: any;
  roleid1: any[];
  menu: any[];
  usertype: string;


  constructor(
    private router: Router,
    private allModulesService: AllModulesService,
    public _service:AllModulesService
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        $(".main-wrapper").removeClass('slide-nav');
        $(".sidebar-overlay").removeClass('opened');
        const url = event.url.split("/");
        this.urlComplete.mainUrl = url[2];
        this.urlComplete.subUrl = url[3];
        this.urlComplete.childUrl = url[4];
        if (url[2] === "") {
          this.urlComplete.mainUrl = "dashboard";
          this.urlComplete.subUrl = "admin";
        }

        if (url[3] === "chat" || url[3] === "calls") {
          this.sidebarMenus.chat = true;
          this.sidebarMenus.default = false;
        } else {
          this.sidebarMenus.chat = false;
          this.sidebarMenus.default = true;
        }
      }
    });

    this.groups = { ...this.allModulesService.groups };
    this.members = { ...this.allModulesService.members };
    
  }

  ngOnInit() {
    // Slide up and down of menus
    // this.type=localStorage.getItem('Type')
    // let url = "getfindByRoleType?roleType="+`type`
    // this.allModulesService.get(url).subscribe((res)=>{
    //   //this.roles =  res
    //   console.log(res)
    
    // })
    
    this.getAllMenu();
    this.type = localStorage.type


    $(document).on("click", ".sub-menu a", function (e) {
      e.stopImmediatePropagation();
      if ($(this).parent().hasClass("submenu")) {
        e.preventDefault();
      }
      if (!$(this).hasClass("subdrop")) {
        $("ul", $(this).parents("ul:first")).slideUp(350);
        $("a", $(this).parents("ul:first")).removeClass("subdrop");
        $(this).next("ul").slideDown(350);
        $(this).addClass("subdrop");
      } else if ($(this).hasClass("subdrop")) {
        $(this).removeClass("subdrop");
        $(this).next("ul").slideUp(350);
      }
    });
  }

  setActive(member) {
    this.allModulesService.members.active = member;
  }
  route(){
    if (localStorage.type == 'Admin' || localStorage.type=='Super Admin'){
    this.router.navigate(['layout/dashboard/admin'])
  }
  else{
    this.router.navigate(['layout/dashboard/employee'])
  }

  
}
 getAllMenu()
{
  this.usertype=localStorage.getItem('type');
    console.log(this.usertype);


  let empid=JSON.parse(localStorage.getItem('loginData'))
  this.eid=empid.employeeid;
//   console.log(this.eid);
// let url="getRoleAssignByEmpId?empId="+this.eid
// this.allModulesService.get(url).subscribe(res=>{
//   console.log(res )
// })
if(this.usertype!='Admin' && this.usertype!='Super Admin'){
this.allModulesService.get( "getRoleAssignByEmpId?empId="+this.eid).subscribe(async (res)=>{
  if(res){
   this.roleid=res.roleMasterId;
   console.log(this.roleid);
   this.allModulesService.get("getRoleMaster/"+this.roleid).subscribe((resrole)=>{
    console.log(resrole)
    // this.roleid=resrole.assignMenu
    this.roleid1=[];
    resrole.assignMenu.forEach(element => {
      this.roleid1.push(element.menuId)
    });
 
   
    this.menu=this.roleid1
    console.log(this.menu);
    
    localStorage.setItem('menu',JSON.stringify(resrole.assignMenu));
    
    // this.router.navigate(['layout/dashboard']);
       //this.Loginvalue.next(0);

   },(error)=>{
    console.log(error)
           alert("Something Went Wrong")
   })
  }
}
  

)}
    
    }
   

    

    }
  

  
