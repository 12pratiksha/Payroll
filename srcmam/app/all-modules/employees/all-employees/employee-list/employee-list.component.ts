import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { AllModulesService } from "src/app/all-modules/all-modules.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { DatePipe } from "@angular/common";
import { Subject } from "rxjs";

import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from "@angular/router";
import Swal from 'sweetalert2'
import { DataTableDirective } from "angular-datatables";


declare const $: any;
@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html",
  styleUrls: ["./employee-list.component.css"],
})
export class EmployeeListComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;

  @ViewChild('myInput')
  myInputVariable: ElementRef;
  dtOptions: any = {};
  date: any;
  public lstEmployee: any;
  public url: any = "employeelist";
  public tempId: any;
  public editId: any;
  customPatterns = {
    V: { pattern: new RegExp("-?") },
    "0": { pattern: new RegExp("[0-9]") },
  };
  path = environment.apiEndpoint + "empimages/";
  result: any;

  loginData: any;


  public addEmployeeForm: FormGroup;
  public editEmployeeForm: FormGroup;
  showMyContainer: boolean = false;


  public pipe = new DatePipe("en-US");
  public rows = [];
  public srch = [];
  public statusValue;
  public dtTrigger: Subject<any> = new Subject();
  public DateJoin;
  stateList: any;
  branchList: any;
  employeeID: any;
  editEmployeeform: any;
  deleteEmployeeid: any;
  selectedId: any;
  designations: any;
  departments: any;
  categories: any;
  religion: any;
  grade: any;
  contractorData: any;
  errorMsg: any;
  profilePhoto: any;
  image: string;
  host: string;
  loader = true


  employee_display: any = [];
  image1: any;
  tempArray: any;
  //dtOptions: { pagingType: string; pageLength: number; processing: boolean; dom: string; buttons: string[]; };


  constructor(
    private srvModuleService: AllModulesService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    public HttpClient: HttpClient,
    private router: Router,
  ) { }

  ngOnInit() {
    this.host = window.location.origin;
    setTimeout(() => {
      this.loader = false;
    }, 10000);
    
    this.path = environment.apiEndpoint + "empimages/";
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'Bfrtip',
      buttons: [
        'copy', 'csv', 'excel', 'print',
      ]
    };
    
    // for floating label
    this.loginData = localStorage.getItem('LoginData');


    $(".floating")
      .on("focus blur", function (e) {
        $(this)
          .parents(".form-focus")
          .toggleClass("focused", e.type === "focus" || this.value.length > 0);
      })
      .trigger("blur");
    // add employee form validation
    this.addEmployeeForm = this.formBuilder.group({
      employeeCode: ['', Validators.required],
      FirstName: ["", Validators.required],
      MiddleName: ["",],
      LastName: ["", Validators.required],
      Email: ["", Validators.required],
      DOJ: ["", Validators.required],
      EmployeeID: ["",],
      Gender: ['', Validators.required],
      Experience: ['',],
      DOB: ['', Validators.required],
      State: ['',],
      Branch: ['', Validators.required],
      Category: ['', Validators.required],
      Department: ['', Validators.required],
      Designation: ['', Validators.required],
      Grade: ['', Validators.required],
      ReportingManager: ['', Validators.required],
      empstatus: ['', Validators.required],
      subCategory: ['',],
      subDepartment: ['',],
      probation: ['',],
      bloodGroup: ['', Validators.required],
      religion: ['',],
      panno: ['', Validators.required],
      personalEmail: ['',],
      address: ['',],
      ReportingManager2: ['',],
      ReportingManager3: ['',],
      contractor: ['',],
      fingerprint: ['']
    });
    this.department();
    this.designation();
    this.getState();
    this.getBranch();
    this.getCategories();
    this.getReligion();
    this.getGrade();
    this.contractor();
    this.getCategories();
    this.loadEmployee();
    //this.getImageName();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }
  // manually rendering Data table

  rerender(): void {
    $("#datatable").DataTable().clear();
    this.dtElement.dtInstance.then((dtInstance) => {
      dtInstance.destroy();
    });
    this.lstEmployee = [];
    // this.loadEmployee();
    // this.getImageName();
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }

  // Get Employee  Api Call
  async loadEmployee() {
    this.employee_display = [];
    //this.HttpClient.get(this.path+"company/getCompanyList", {headers:headers}).subscribe(data=>{
    this.srvModuleService.get("employee_master/getemployees").subscribe((data) => {
      // JSON.parse(data)

      //this.lstEmployee = data;

      this.loader = false
      data.forEach(element => {
        let department = element.department
        let designatiom = element.designation
        let image = element.imageName
       
        let result =this.departments.filter((dept: any) =>
        (dept.departmentId==department) )
        console.log(result)
        let resultdesg =this.designations.filter((desg: any) =>
        (desg.designationMasterId==designatiom) )
        // console.log(resultdesg)
        let dept="";
        if(result.length>0){
           dept = result[0].departmentName;
        }
 

        this.employee_display.push({ "employeeId": element.employeeId, "firstName": element.firstName, "middleName": element.middleName, "lastName": element.lastName, "employeeCode": element.employeeCode, "department": dept, "designation": resultdesg[0].name, imageName: image, "status": element.status })


      });
      this.lstEmployee  = this.employee_display;
      //this.selectedId = data[0].employeeId;

    }, (error) => {

      this.loader = false
      console.log(error)
      alert("Something Went Wrong")
    });
  }

  // Add employee  Modal Api Call
  addEmployee() {
    let DateJoin = this.pipe.transform(
      this.addEmployeeForm.value.JoinDate,
      "dd-MM-yyyy"
    );
    let obj = {
      firstname: this.addEmployeeForm.value.FirstName,
      lastname: this.addEmployeeForm.value.LastName,
      username: this.addEmployeeForm.value.UserName,
      email: this.addEmployeeForm.value.Email,
      password: this.addEmployeeForm.value.Password,
      confirmpassword: this.addEmployeeForm.value.ConfirmPassword,
      employeeId: this.addEmployeeForm.value.EmployeeID,
      joindate: DateJoin,
      phone: this.addEmployeeForm.value.PhoneNumber,
      company: this.addEmployeeForm.value.CompanyName,
      department: this.addEmployeeForm.value.DepartmentName,
      designation: this.addEmployeeForm.value.Designation,
      mobile: "9944996335",
      role: "Web developer",
    };
    this.srvModuleService.add(obj, this.url).subscribe((data) => {
      $("#datatable").DataTable().clear();
      this.dtElement.dtInstance.then((dtInstance) => {
        dtInstance.destroy();
      });
      this.dtTrigger.next();
    });
    this.loadEmployee();
    $("#add_employee").modal("hide");
    this.addEmployeeForm.reset();
    this.toastr.success("Employeee added sucessfully...!", "Success");
  }

  // to know the date picker changes
  from(data) {
    this.DateJoin = this.pipe.transform(data, "dd-MM-yyyy");
  }

  // edit modal api call
  // editEmployee() {
  //   let obj = {
  //     firstname: this.editEmployeeForm.value.FirstName,
  //     lastname: this.editEmployeeForm.value.LastName,
  //     username: this.editEmployeeForm.value.UserName,
  //     email: this.editEmployeeForm.value.Email,
  //     password: this.editEmployeeForm.value.Password,
  //     confirmpassword: this.editEmployeeForm.value.ConfirmPassword,
  //     employeeId: this.editEmployeeForm.value.EmployeeID,
  //     joindate: this.editEmployeeForm.value.JoinDate,
  //     phone: this.editEmployeeForm.value.PhoneNumber,
  //     company: this.editEmployeeForm.value.CompanyName,
  //     department: this.editEmployeeForm.value.DepartmentName,
  //     designation: this.editEmployeeForm.value.Designation,
  //     mobile: "9944996335",
  //     role: "Web developer",
  //     id: this.editId,
  //   };
  //   this.srvModuleService.update(obj, this.url).subscribe((data1) => {
  //     $("#datatable").DataTable().clear();
  //     this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
  //       dtInstance.destroy();
  //     });
  //     this.dtTrigger.next();
  //   });
  //   this.loadEmployee();
  //   $("#edit_employee").modal("hide");
  //   this.toastr.success("Employeee Updated sucessfully...!", "Success");
  // }

  // To Get The employee Edit Id And Set Values To Edit Modal Form
  edit(value) {
    this.editId = value;
    const index = this.lstEmployee.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.lstEmployee[index];
    this.editEmployeeForm.setValue({
      FirstName: toSetValues.firstname,
      LastName: toSetValues.lastname,
      UserName: toSetValues.username,
      Email: toSetValues.email,

      Password: toSetValues.password,
      ConfirmPassword: toSetValues.confirmpassword,
      EmployeeID: toSetValues.employeeId,
      JoinDate: toSetValues.joindate,
      PhoneNumber: toSetValues.phone,
      CompanyName: toSetValues.company,
      DepartmentName: toSetValues.department,
      Designation: toSetValues.designation,
    });
  }

  // delete employee data api call
  deleteEmployee(id) {


    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {

      if (result.isConfirmed) {
        Swal.fire({
          title: 'Loading...',
          allowEscapeKey: false,
          allowOutsideClick: false,
          showConfirmButton: false,
          didOpen: () => {
            Swal.showLoading()
          }
        })
        this.srvModuleService.delete(id, 'employee_master/delete_employee').subscribe((res) => {



          if (res.respose == "Success") {
            Swal.fire({

              icon: 'success',
              title: 'Employee Deleted Successfully',
              showConfirmButton: false,
              timer: 1500,
              didOpen: () => {
                Swal.hideLoading()
              }
            })
            const currentRoute = this.router.url;

            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate([currentRoute]);
            });
          }
          else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong',
              didOpen: () => {
                Swal.hideLoading()
              }
            })
          }
        })
      }
    })
  }

  //search by Id
  searchId(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.employeeId.toLowerCase().indexOf(val) !== -1 || !val;
    });
    console.log(temp)
    this.rows.push(...temp);
  }

  //search by name
  searchName(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.firstname.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  //search by purchase
  searchByDesignation(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.designation.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  //getting the status value
  getStatus(data) {
    this.statusValue = data;

  }


  // getImageName(){
  //   console.log(this.imageName)
  //   let url="Editlogo?imageName="+this.imageName
  //   console.log(url)
  //   let params = new HttpParams();
  //   params = params.append('imageName', this.imageName);
  //   this.srvModuleService.add(params,url).subscribe(res=>{
  //     console.log(res)
  //   })

  // }


  addEmployes() {

    if (this.addEmployeeForm.status == "VALID") {
      {

        let joinDate = this.pipe.transform(
          this.addEmployeeForm.value.DOJ,
          "yyyy-MM-dd"
        );
        console.log(joinDate)
        let birthDate = this.pipe.transform(
          this.addEmployeeForm.value.DOB,
          "yyyy-MM-dd"
        );
        console.log(birthDate)
        // console.log(this.addEmployeeForm)
        let employeeDetails = this.addEmployeeForm.value

        var datePipe = new DatePipe('en-US');
        let dateOfJoining = datePipe.transform(this.addEmployeeForm.value.DOJ, 'yyyy-MM-dd');
        let dateOfBirth = datePipe.transform(this.addEmployeeForm.value.DOB, 'yyyy-MM-dd');

        let data = {
          employeeCode: employeeDetails.employeeCode,
          firstName: employeeDetails.FirstName,
          middleName: employeeDetails.MiddleName,
          lastName: employeeDetails.LastName,
          gender: employeeDetails.Gender,
          experience: employeeDetails.Experience,
          companyEmailId: employeeDetails.Email,
          state: employeeDetails.State,
          branch: employeeDetails.Branch,
          category: employeeDetails.Category,
          subCategory: employeeDetails.subCategory,
          department: employeeDetails.Department,
          subDepartment: employeeDetails.subDepartment,
          subDepartment1: "",
          subDepartment2: "",
          subDepartment3: "",
          panNo: employeeDetails.panno,
          designation: employeeDetails.Designation,
          grade: employeeDetails.Grade,
          reportingManager: employeeDetails.ReportingManager,
          reportingManager2: employeeDetails.ReportingManager2,
          reportingManager3: employeeDetails.ReportingManager3,
          bloodGroup: employeeDetails.bloodGroup,
          probation: employeeDetails.probation,
          status: employeeDetails.empstatus,
          contractor: employeeDetails.contractor,
          address: employeeDetails.address,
          dateOfJoining: dateOfJoining,
          dateOfBirth: dateOfBirth,
          imageName: this.profilePhoto,
          personalEmailId: employeeDetails.personalEmail,
          religion: employeeDetails.religion,
          fingerprint: employeeDetails.fingerprint,

          // dateOfJoining: '',
          // dateOfBirth: "",
          uploadDate: ""
        }

        console.log(data)

        this.srvModuleService.add(data, 'employee_master/employee').subscribe((res) => {

          if (res.respose == "Success") {
            Swal.fire({

              icon: 'success',
              title: 'Employee Added Successfully',
              showConfirmButton: false,
              timer: 1500
            })
            this.loadEmployee();
            this.showMyContainer = false
            this.loadEmployee();
          }
          if (res.respose == "Already") {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Employee Code Already Exists',

            })
          }

        })

      }
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',

      })
      this.addEmployeeForm.markAllAsTouched()
    }
  }




  // stateDropdown    


  getState() {

    this.srvModuleService.get('state/getStateList')
      .subscribe((res) => {

        // console.log(res )
        this.stateList = res

      })

  }

  // get Branch Dropdown

  getBranch() {

    this.srvModuleService.get('branch/getBranchList')
      .subscribe((res) => {

        this.branchList = res

      })

  }

  // upload image


  handleUpload(event) {

    const file = event.target.files[0];
    if (file.type == "image/jpeg") {
      const formData = new FormData();
      formData.append('file', file);
      this.srvModuleService.uploadFile(formData, "employee_master/uploadlogo").subscribe((res) => {
        this.profilePhoto = res.data[0].firstName
      })
    }
    // console.log(file.type)

    // const reader = new FileReader();
    // reader.readAsDataURL(file);
    // reader.onload = () => {
    //     console.log(reader.result);
    // };
    else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Invalid file type',

      })
      this.myInputVariable.nativeElement.value = "";
    }
  }


  editEmployee(id) {
    this.employeeID = id
    if (id == 'add') {
      this.router.navigate(['/layout/employees/employeeForm'])
    }
    else {
      this.router.navigate(['/layout/employees/employeeForm/' + id])
    }
    //   if(id){
    //     this.showMyContainer = true
    //   }
    //   let url = "employee_master/getemployee/"+`${this.employeeID}`

    // this.srvModuleService.get(url).subscribe((res)=>{

    // this.editEmployeeform = res
    // var datePipe = new DatePipe('en-US');
    // let dateOfJoining = datePipe.transform(this.editEmployeeform.dateOfJoining,'yyyy-MM-dd');
    // let dateOfBirth = datePipe.transform(this.editEmployeeform.dateOfBirth,'yyyy-MM-dd');
    // this.addEmployeeForm.get('employeeCode').setValue(this.editEmployeeform.employeeCode)
    // this.addEmployeeForm.get('FirstName').setValue(this.editEmployeeform.firstName)
    // this.addEmployeeForm.get('LastName').setValue(this.editEmployeeform.lastName)
    // this.addEmployeeForm.get('MiddleName').setValue(this.editEmployeeform.middleName)
    // this.addEmployeeForm.get('Email').setValue(this.editEmployeeform.companyEmailId)
    // this.addEmployeeForm.get('DOJ').setValue(dateOfJoining)
    // this.addEmployeeForm.get('EmployeeID').setValue(this.editEmployeeform.employeeId)
    // this.addEmployeeForm.get('Gender').setValue(this.editEmployeeform.gender)
    // this.addEmployeeForm.get('Experience').setValue(this.editEmployeeform.experience)
    // this.addEmployeeForm.get('DOB').setValue(dateOfBirth)
    // this.addEmployeeForm.get('State').setValue(this.editEmployeeform.state)
    // this.addEmployeeForm.get('Branch').setValue(this.editEmployeeform.branch)
    // this.addEmployeeForm.get('Category').setValue(this.editEmployeeform.category)
    // this.addEmployeeForm.get('Department').setValue(this.editEmployeeform.department)
    // this.addEmployeeForm.get('Designation').setValue(this.editEmployeeform.designation)
    // this.addEmployeeForm.get('Grade').setValue(this.editEmployeeform.grade)
    // this.addEmployeeForm.get('ReportingManager').setValue(this.editEmployeeform.reportingManager)
    // this.addEmployeeForm.get('empstatus').setValue(this.editEmployeeform.status)
    // this.addEmployeeForm.get('subCategory').setValue(this.editEmployeeform.subCategory)
    // this.addEmployeeForm.get('subDepartment').setValue(this.editEmployeeform.subDepartment)
    // this.addEmployeeForm.get('probation').setValue(this.editEmployeeform.probation)
    // this.addEmployeeForm.get('ReportingManager2').setValue(this.editEmployeeform.reportingManager2)
    // this.addEmployeeForm.get('panno').setValue(this.editEmployeeform.panNo)
    // this.addEmployeeForm.get('bloodGroup').setValue(this.editEmployeeform.bloodGroup)
    // this.addEmployeeForm.get('contractor').setValue(this.editEmployeeform.contractor)
    // this.addEmployeeForm.get('address').setValue(this.editEmployeeform.address)
    // this.addEmployeeForm.get('religion').setValue(this.editEmployeeform.religion)
    // this.addEmployeeForm.get('personalEmail').setValue(this.editEmployeeform.personalEmailId)
    // })
    // this.loadEmployee();

  }

  updateEmployee() {

    // console.log(this.addEmployeeForm.value)
    if (this.addEmployeeForm.status == "VALID") {
      let employeeDetails = this.addEmployeeForm.value
      var datePipe = new DatePipe('en-US');
      let dateOfJoining = datePipe.transform(this.addEmployeeForm.value.DOJ, 'yyyy-MM-dd');
      let dateOfBirth = datePipe.transform(this.addEmployeeForm.value.DOB, 'yyyy-MM-dd');
      let data = {
        contractor: employeeDetails.contractor,
        employeeCode: employeeDetails.employeeCode,
        firstName: employeeDetails.FirstName,
        middleName: employeeDetails.MiddleName,
        lastName: employeeDetails.LastName,
        gender: employeeDetails.Gender,
        experience: employeeDetails.Experience,
        companyEmailId: employeeDetails.Email,
        state: employeeDetails.State,
        branch: employeeDetails.Branch,
        category: employeeDetails.Category,
        subCategory: employeeDetails.subCategory,
        department: employeeDetails.Department,
        subDepartment: employeeDetails.subDepartment,
        subDepartment1: "",
        subDepartment2: "",
        subDepartment3: "",
        panNo: employeeDetails.panno,
        designation: employeeDetails.Designation,
        grade: employeeDetails.Grade,
        reportingManager: employeeDetails.ReportingManager,
        reportingManager2: employeeDetails.ReportingManager2,
        reportingManager3: employeeDetails.ReportingManager3,
        bloodGroup: employeeDetails.bloodGroup,
        probation: employeeDetails.probation,
        address: employeeDetails.address,
        status: employeeDetails.empstatus,
        dateOfJoining: dateOfJoining,
        dateOfBirth: dateOfBirth,
        imageName: this.profilePhoto,
        uploadDate: "",
        personalEmailId: employeeDetails.personalEmail,
        religion: employeeDetails.religion,
        fingerprint: employeeDetails.fingerprint,
        //rfidCardNo:employeeDetails.fingerprint
      }

      console.log(this.employeeID)

      let url = "employee_master/update_employee/" + `${this.employeeID}`

      this.srvModuleService.update(data, url).subscribe((res) => {

        console.log(res)
        if (res.respose == "Success") {
          Swal.fire({
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          })

          this.loadEmployee();
          this.showMyContainer = false
          this.loadEmployee();
        }
        else if (res.respose == "Already") {
          alert("Employee Code already exists")
        }
        else {
          alert("something went wrong! try again later")
        }

      })

    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',

      })
      this.addEmployeeForm.markAllAsTouched()
    }

    this.loadEmployee();

  }


  editEmployeeID(id) {

    this.router.navigate(['/layout/employees/addEmployee' + id])


  }

  cancel() {

    this.employeeID = undefined
    this.showMyContainer = false
    this.addEmployeeForm.reset();
  }

  employeeProfileDetails(id) {

    this.selectedId = id
    this.router.navigateByUrl(
      '/layout/employees/employeeprofile/' + this.selectedId
    );

    console.log(this.selectedId)

  }
  getCategories() {
    this.srvModuleService.get('categories/getCategories').subscribe((res) => {
      this.categories = res
    })
  }
  department() {
    this.srvModuleService.get('getAllDepartment').subscribe((res) => {
      this.departments = res
    })
  }
  designation() {
    this.srvModuleService.get('getAllDesignationMaster').subscribe((res) => {
      this.designations = res
      
    })
  }
  getReligion() {
    this.srvModuleService.get('getgetCodeByType?type=religion').subscribe((res) => {
      this.religion = res
    })
  }
  getGrade() {
    this.srvModuleService.get('getgetCodeByType?type=grade').subscribe((res) => {
      this.grade = res
    })
  }
  contractor() {
    this.srvModuleService.get('getgetCodeByType?type=contractor').subscribe((res) => {
      this.contractorData = res
    })
  }
  showContainer() {
    // this.showMyContainer = true;
    this.router.navigate(['/layout/employees/employeeForm/' + "add"])
  }

}
