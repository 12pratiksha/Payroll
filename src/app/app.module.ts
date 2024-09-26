import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { ToastrModule } from 'ngx-toastr';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxBootstrapMultiselectModule } from 'ngx-bootstrap-multiselect';
import { HttpClientModule } from '@angular/common/http';
import { FullCalendarModule } from '@fullcalendar/angular';
import {MatTableModule} from '@angular/material/table';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MatTreeModule } from '@angular/material/tree';
import {MatButtonModule} from '@angular/material/button';


//import { AngularEditorModule } from '@kolkov/angular-editor';
//import {jsPDF} from "jspdf";



// import { FooterComponent } from './footer/footer.component';
FullCalendarModule.registerPlugins([interactionPlugin, dayGridPlugin]);


@NgModule({
  declarations: [
    AppComponent,

    
  ],
  imports: [
    
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    DataTablesModule,
    BsDatepickerModule,
    FormsModule,
    NgxBootstrapMultiselectModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSelectModule,  
    MatTreeModule,
    MatButtonModule,
    
    TooltipModule.forRoot(),
    ToastrModule.forRoot(
      {
        timeOut: 1500,
        positionClass: 'toast-bottom-right',
        preventDuplicates: true,
      }
    ),
    FullCalendarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
