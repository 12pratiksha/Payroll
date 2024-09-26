import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequirementApprovedComponent } from './requirement-approved/requirement-approved.component';
import { CandidatesListComponent } from './candidates-list/candidates-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewRequirementComponent } from './new-requirement/new-requirement.component';
import { RecruitmentComponent } from './recruitment.component';
import { ReplacementComponent } from './replacement/replacement.component';
import { ScheduleInterviewComponent } from './schedule-interview/schedule-interview.component';
import { AddRemarkComponent } from './add-remark/add-remark.component';
import { ConsultantRegisterComponent } from './consultant-register/consultant-register.component';
import { SelectedCandidatesComponent } from './selected-candidates/selected-candidates.component';
import { OfferComponent } from './offer/offer.component';
import { ComposeEmailComponent } from './compose-email/compose-email.component';
import { ResignationFormComponent } from './resignation-form/resignation-form.component';
import { ResignationAcceptanceComponent } from './resignation-acceptance/resignation-acceptance.component';
import { AssetsListComponent } from './assets-list/assets-list.component';
import { NewRecruitmentFormComponent } from './new-recruitment-form/new-recruitment-form.component';
import { ListForApproverComponent } from './list-for-approver/list-for-approver.component';
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
import { OfferHistoryComponent } from './offer-history/offer-history.component';
// import { PendingDetailsComponent } from './pending-details/pending-details.component';


const routes: Routes = [
  {
    path: '',
    component: RecruitmentComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path:'evalutionform',
        component:EvalutionformComponent
      },
      {
        path: 'managejobs',
        component: NewRequirementComponent
      },
      {
        path: 'scheduleInterview',
        component: ScheduleCandidateComponent
      },
      {
        path: 'agencyList',
        component: AgencyListComponent
      },
      {
        path: 'recruitmentForm/:id/:type',
        component: NewRecruitmentFormComponent
      },
      
      {
        path: 'approversList',
        component: ListForApproverComponent
      },
      {
        path: 'approved-list',
        component: RequirementApprovedComponent
      },
      {
        path: 'replacements',
        component: ReplacementComponent
      },
      {
        path: 'candidate',
        component: CandidatesListComponent
      },
      {
        path: 'scheduled',
        component: ScheduleInterviewComponent
      },
      {
        path: 'remarks',
        component: AddRemarkComponent
      },
      {
        path: 'consultant-register',
        component: ConsultantRegisterComponent
      },
      {
        path: 'selected',
        component: SelectedCandidatesComponent
      },
      {
        path: 'offer',
        component: OfferComponent
      },
      {
        path: 'compose',
        component: ComposeEmailComponent
      },
      {
        path:'CreateTemplate',
        component:CreateTemplateComponent
      },
      {
        path: 'resignation',
        component: ResignationFormComponent
      },
      {
        path: 'resignationList',
        component: ResignationAcceptanceComponent
      },
      {
        path: 'assetsList',
        component: AssetsListComponent
      },
      {
        path:'createLetterComponent',
        component: CreateLetterComponent
      },
      {
        path:'hrEvolutionFormComponent',
        component:HrEvolutionFormComponent
      },
      {
        path:'incomeTaxDeclarationFormComponent',
        component:IncomeTaxDeclarationFormComponent
    },
    {
      path:'candidateAppointment',
      component:CandidateAppointmentComponent
  },
  {
    path:'candidateOfferReject',
    component:CandidateOfferRejectComponent
},
{
  path:'enterNewCandidate',
  component:EnterNewCandidateComponent
},
{
  path:'offerHistoryComponent',
  component:OfferHistoryComponent
}

      
    ]
    }
  ]

@NgModule({
  imports: [RouterModule.forChild(routes)], 
  exports: [RouterModule]
})
export class RecruitmentRoutingModule { }
