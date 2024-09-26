import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HumanResourcesComponent } from './human-resources.component';
import { AllAssetsComponent } from './all-assets/all-assets.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';

import { MatTableModule } from '@angular/material/table';
import { NgxBootstrapMultiselectModule } from 'ngx-bootstrap-multiselect';

import { FormsModule } from '@angular/forms';

import {MatTreeModule} from '@angular/material/tree';



import { MatPaginatorModule } from '@angular/material/paginator';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatSliderModule } from '@angular/material/slider';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { NgSelectModule } from '@ng-select/ng-select';
import { ComposeEmailComponent } from './compose-email/compose-email.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


const routes: Routes = [
  { path: '',
  component: HumanResourcesComponent,
  children: [
    {
      path: 'allAssets',
      component: AllAssetsComponent
    },
    {
      path: 'composeEmail',
      component: ComposeEmailComponent
    },
  
  ]
  }
  
];


@NgModule({
  declarations: [AllAssetsComponent, HumanResourcesComponent, ComposeEmailComponent],
  imports: [
    CommonModule,  RouterModule.forChild(routes), MatSelectModule, MatCheckboxModule, MatFormFieldModule, ReactiveFormsModule,
    BsDatepickerModule.forRoot(), MatTableModule,  NgxBootstrapMultiselectModule,
     FormsModule, MatTreeModule, DataTablesModule, MatPaginatorModule, MatAutocompleteModule, MatSliderModule, MatInputModule,
    MatButtonModule, NgSelectModule, CKEditorModule, MatIconModule
  ],
  providers: [DatePipe]
})
export class HumanResourcesModule { }
