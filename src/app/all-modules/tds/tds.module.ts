import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MatTableModule } from '@angular/material/table';
import { NgxBootstrapMultiselectModule } from 'ngx-bootstrap-multiselect';
import { FullCalendarModule } from '@fullcalendar/angular';
import { FormsModule } from '@angular/forms';
import {MatTreeModule} from '@angular/material/tree';
import { DataTablesModule } from 'angular-datatables';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatSliderModule } from '@angular/material/slider';
import {MatInputModule} from '@angular/material/input';
import { SearchPipePipe } from '../search-pipe.pipe';
import {MatButtonModule} from '@angular/material/button';
import { NgSelectModule } from '@ng-select/ng-select';
import { AngularDualListBoxModule } from 'angular-dual-listbox';
import { NgxMaskModule } from 'ngx-mask';
import { SharingModule } from 'src/app/sharing/sharing.module';
import { TdsComponent } from './tds.component';
import { ApprovallistComponent } from './approvallist/approvallist.component';
import { IncometaxdeclarationformComponent } from './incometaxdeclarationform/incometaxdeclarationform.component';
const routes: Routes = [
  { path: '',
  component: TdsComponent,
  children: [
    {
        path:'ApprovalList',
        component:ApprovallistComponent
    },
    {
        path:'incomeTaxDeclarationForm',
        component:IncometaxdeclarationformComponent
    }
    
  
   
  ]
  }
]
@NgModule({
  declarations: [ ApprovallistComponent,IncometaxdeclarationformComponent ],
  imports: [
    CommonModule,  RouterModule.forChild(routes), MatSelectModule, MatCheckboxModule, MatFormFieldModule, ReactiveFormsModule,
    BsDatepickerModule.forRoot(), MatTableModule,  NgxBootstrapMultiselectModule,
    FullCalendarModule, FormsModule, MatTreeModule, DataTablesModule, MatPaginatorModule, MatAutocompleteModule, MatSliderModule, MatInputModule,
    MatButtonModule, NgSelectModule, CommonModule, AngularDualListBoxModule,
    SharingModule,
    NgxMaskModule.forRoot({
      showMaskTyped : false,
     
    }) 


  ]
})
export class TdsModule { }
