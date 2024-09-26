import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharingModule } from 'src/app/sharing/sharing.module';
import { PickListModule } from 'primeng/picklist';
import { EmployeesRoutingModule } from '../employees/employees-routing.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DataTablesModule } from 'angular-datatables';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatSelectModule } from '@angular/material/select';
import { RecruitmentComponent } from './recruitment.component';
import { RecruitmentRoutingModule } from './recruitment-routing.module';
import { NewRequirementComponent } from './new-requirement/new-requirement.component';
import { RequirementApprovedComponent } from './requirement-approved/requirement-approved.component';
import { ReplacementComponent } from './replacement/replacement.component';
import { CandidatesComponent } from './candidates/candidates.component';
import { CandidatesListComponent } from './candidates-list/candidates-list.component';
import { ScheduleInterviewComponent } from './schedule-interview/schedule-interview.component';
import { AddRemarkComponent } from './add-remark/add-remark.component';
import { NgxBootstrapMultiselectModule } from 'ngx-bootstrap-multiselect';
import { ConsultantRegisterComponent } from './consultant-register/consultant-register.component';
import { SelectedCandidatesComponent } from './selected-candidates/selected-candidates.component';
import { OfferComponent } from './offer/offer.component';
import { ComposeEmailComponent } from './compose-email/compose-email.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ResignationFormComponent } from './resignation-form/resignation-form.component';
import { ResignationAcceptanceComponent } from './resignation-acceptance/resignation-acceptance.component';
import { AssetsListComponent } from './assets-list/assets-list.component';
import {NgxMaskModule} from 'ngx-mask';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { ListForApproverComponent } from './list-for-approver/list-for-approver.component';
import { NewRecruitmentFormComponent } from './new-recruitment-form/new-recruitment-form.component';
import { AgencyListComponent } from './agency-list/agency-list.component';
import { ScheduleCandidateComponent } from './schedule-candidate/schedule-candidate.component';
import { CreateTemplateComponent } from './create-template/create-template.component';
import { EvalutionformComponent } from './evalutionform/evalutionform.component';
import { CreateLetterComponent } from './create-letter/create-letter.component';
import { HrEvolutionFormComponent } from './hr-evolution-form/hr-evolution-form.component';
import { IncomeTaxDeclarationFormComponent } from './income-tax-declaration-form/income-tax-declaration-form.component';
import { CandidateAppointmentComponent } from './candidate-appointment/candidate-appointment.component';
import { CandidateOfferRejectComponent } from './candidate-offer-reject/candidate-offer-reject.component';
import { EnterNewCandidateComponent } from './enter-new-candidate/enter-new-candidate.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { OfferHistoryComponent } from './offer-history/offer-history.component';
import { NotificationComponent } from './notification/notification.component';
// import { PendingDetailsComponent } from './pending-details/pending-details.component';

@NgModule({
  declarations: [IncomeTaxDeclarationFormComponent,RecruitmentComponent, DashboardComponent, NewRequirementComponent, RequirementApprovedComponent, ReplacementComponent, CandidatesComponent, CandidatesListComponent, ScheduleInterviewComponent, AddRemarkComponent, ConsultantRegisterComponent, SelectedCandidatesComponent, OfferComponent, ComposeEmailComponent, ResignationFormComponent, ResignationAcceptanceComponent, AssetsListComponent, ListForApproverComponent, NewRecruitmentFormComponent, AgencyListComponent, ScheduleCandidateComponent, CreateTemplateComponent, EvalutionformComponent, CreateLetterComponent, HrEvolutionFormComponent, CandidateAppointmentComponent, CandidateOfferRejectComponent, EnterNewCandidateComponent, OfferHistoryComponent, NotificationComponent,  ],
  imports: [
    CommonModule,
    FormsModule,
    SharingModule,
    ReactiveFormsModule,
    PickListModule,
    EmployeesRoutingModule, 
    BsDatepickerModule.forRoot(),
    DataTablesModule,
    NgMultiSelectDropDownModule,
    NgSelectModule,
    MatSelectModule,
    RecruitmentRoutingModule,
    NgxBootstrapMultiselectModule,
    CKEditorModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    NgxMaskModule.forRoot({
      showMaskTyped : false,
      // clearIfNotMatch : true
    }) 
  ]
})
export class RecruitmentModule { }
