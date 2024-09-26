import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MastersComponent } from './masters.component';
import { ShiftPolicyComponent } from './shift-policy/shift-policy.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { LateDeparturePlanComponent } from './late-departure-plan/late-departure-plan.component';
import { LateDeductionPlanComponent } from './late-deduction-plan/late-deduction-plan.component';
import { LateDeductionHistoryComponent } from './late-deduction-history/late-deduction-history.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AngularDualListBoxModule } from 'angular-dual-listbox';
import { EarlyDeparturePlanListComponent } from './early-departure-plan-list/early-departure-plan-list.component';
import { EarlyDeparturePlanAssignComponent } from './early-departure-plan-assign/early-departure-plan-assign.component';
import { EarlyDeparturePlanHistoryComponent } from './early-departure-plan-history/early-departure-plan-history.component';
import {MatTableModule} from '@angular/material/table';
import { OtAdjustmentSetupComponent } from './ot-adjustment-setup/ot-adjustment-setup.component';
import { OtAdjustmentAssignComponent } from './ot-adjustment-assign/ot-adjustment-assign.component';
import { OtAdjustmentHistoryComponent } from './ot-adjustment-history/ot-adjustment-history.component'; 
import {MatCheckboxModule} from '@angular/material/checkbox';
import { LeaveAllocationComponent } from './leave-allocation/leave-allocation.component';
import { NgxBootstrapMultiselectModule } from 'ngx-bootstrap-multiselect';
import { ShiftImportComponent } from './shift-import/shift-import.component';
import { ImportDropdownListComponent } from '../attendance/import-dropdown-list/import-dropdown-list.component';
import { DropdownListComponent } from '../attendance/dropdown-list/dropdown-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Test1Component } from './test1/test1.component';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { NgSelectModule } from '@ng-select/ng-select';
import { OthersComponent } from './others/others.component';
import { WorkFlowComponent } from './work-flow/work-flow.component';
import { WorkFlowFormComponent } from './work-flow-form/work-flow-form.component';
import { TransferAquisitionComponent } from './transfer-aquisition/transfer-aquisition.component';
import { RoleMasterComponent } from './role-master/role-master.component';
import { RoleMasterFormComponent } from './role-master-form/role-master-form.component';
import { AssignRoleComponent } from './assign-role/assign-role.component';
import { AssignRoleExcelComponent } from './assign-role-excel/assign-role-excel.component';
import { SetupConfigComponent } from './setup-config/setup-config.component';
import { PayElementComponent } from './pay-element/pay-element.component';
import { PayElementFormComponent } from './pay-element-form/pay-element-form.component';
import { SalaryPolicyComponent } from './salary-policy/salary-policy.component';
import { SalaryPolicyFormComponent } from './salary-policy-form/salary-policy-form.component';
import { SalaryFormulasComponent } from './salary-formulas/salary-formulas.component';
import { SalaryFormulasFormComponent } from './salary-formulas-form/salary-formulas-form.component';
import { ImportPayElementComponent } from './import-pay-element/import-pay-element.component';
import { OffDayComponent } from './off-day/off-day.component';
import {MatInputModule} from '@angular/material/input';
import { HolidaysComponent } from './holidays/holidays.component';
import {MatTreeModule} from '@angular/material/tree';
import { ProvidentFundComponent } from './provident-fund/provident-fund.component';
import { ProvidentFundTableComponent } from './provident-fund-table/provident-fund-table.component';
import { EsicTableComponent } from './esic-table/esic-table.component';
import { EsicComponent } from './esic/esic.component';
import { ProfessionalTaxComponent } from './professional-tax/professional-tax.component';
import { ProfessionalTaxTableComponent } from './professional-tax-table/professional-tax-table.component';
import { SalaryCalendarManualComponent } from './salary-calendar-manual/salary-calendar-manual.component';
import { TimeOfficePolicyComponent } from './time-office-policy/time-office-policy.component';
import { TimeOfficePolicyListComponent } from './time-office-policy-list/time-office-policy-list.component';
import { SpecialWorkingDayComponent } from './special-working-day/special-working-day.component';
import { SpecialWorkingDayListComponent } from './special-working-day-list/special-working-day-list.component';
import { SpecialWorkingDayUpdateComponent } from './special-working-day-update/special-working-day-update.component';
import { SpecialnonWorkingDayUpdateComponent } from './specialnon-working-day-update/specialnon-working-day-update.component';
import { SpecialNonWorkingDayComponent } from './special-non-working-day/special-non-working-day.component';
import { AttendanceLockListComponent } from './attendance-lock-list/attendance-lock-list.component';
import { SubDepartmentShiftallocationComponent } from './sub-department-shiftallocation/sub-department-shiftallocation.component';
import { AttendanceunlockListComponent } from './attendanceunlock-list/attendanceunlock-list.component';
import { LookupMasterComponent } from './lookup-master/lookup-master.component';


import {A11yModule} from '@angular/cdk/a11y';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import { LeaveAllocationUpdateComponent } from './leave-allocation-update/leave-allocation-update.component';
import { RolesComponent } from './roles/roles.component';
import { PolicySettingComponent } from './policy-setting/policy-setting.component';

const routes: Routes = [
  { path: '',
  component: MastersComponent,
  children: [ 
    {
      path: 'shift',
      component: ShiftPolicyComponent
    },
    {
      path: 'lateDeparturePlan',
      component: LateDeparturePlanComponent
    },
    {
      path: 'lateDeductionPlan',
      component: LateDeductionPlanComponent
    },
    {
      path: 'lateDeductionHistory',
      component: LateDeductionHistoryComponent
    },
    {
      path: 'earlyDeparturePlanList',
      component: EarlyDeparturePlanListComponent
    },
    {
      path: 'earlyDeparturePlanAssign',
      component: EarlyDeparturePlanAssignComponent
    },
    {
      path: 'earlyDeparturePlanHistory',
      component: EarlyDeparturePlanHistoryComponent
    },
    {
      path: 'otAdjustmentSetup',
      component: OtAdjustmentSetupComponent
    },
    {
      path: 'otAdjustmentAssign',
      component: OtAdjustmentAssignComponent
    },
    {
      path: 'otAdjustmentHistory',
      component: OtAdjustmentHistoryComponent
    },
    {
      path: 'leaveAllocation',
      component: LeaveAllocationComponent
    },
    {
      path: 'leaveAllocationUpdate/:id',
      component: LeaveAllocationUpdateComponent
    },
    {
      path: 'shiftImport',
      component: ShiftImportComponent
    },
   
    {
      path: 'importDropdownEntries',
      component: ImportDropdownListComponent
    },
    {
      path: 'dropdownEntries',
      component: LookupMasterComponent
    },
    {
      path: 'test1',
      component: Test1Component
    },
    {
      path: 'workFlow',
      component: WorkFlowComponent
    },
    {
      path: 'workFlowForm/:id',
      component: WorkFlowFormComponent
    },
    {
      path: 'requisition',
      component: TransferAquisitionComponent
    },
    {
      path: 'roleMaster',
      component: RoleMasterComponent
    },
    {
      path: 'roleMasterForm/:id',
      component: RoleMasterFormComponent
    },
    {
      path: 'assignRole',
      component: AssignRoleComponent
    },
    {
      path: 'importRoleAssign',
      component: AssignRoleExcelComponent
    },
    {
      path: 'setupConfiguration',
      component: SetupConfigComponent
    },
    {
      path: 'payElementMaster',
      component: PayElementComponent
    },
    {
      path: 'payElementMasterForm/:id',
      component: PayElementFormComponent
    },
    {
      path: 'salaryPolicy',
      component: SalaryPolicyComponent
    },
    {
      path: 'salaryPolicyForm/:id',
      component: SalaryPolicyFormComponent
    },
    {
      path: 'salaryFormulas',
      component: SalaryFormulasComponent
    },
    {
      path: 'salaryFormulasForm/:id',
      component: SalaryFormulasFormComponent
    },
    {
      path: 'importPayElement',
      component: ImportPayElementComponent
    },
    {
      path: 'offDay',
      component: OffDayComponent
    },
    {
      path: 'holidays',
      component: HolidaysComponent
    },
    {
      path: 'ProvidentFund/:id',
      component: ProvidentFundComponent
    },
    {
      path: 'ProvidentFund',
      component: ProvidentFundTableComponent
    },
    {
      path: 'esic',
      component: EsicTableComponent
    },
    {
      path: 'esic/:id',
      component: EsicComponent
    },
    {
      path: 'pt',
      component: ProfessionalTaxTableComponent
    },
    {
      path: 'pt/:id',
      component: ProfessionalTaxComponent
    },
    {
      path: 'salaryCalenderManual',
      component: SalaryCalendarManualComponent
    },
    {
      path: 'officeTimePolicy',
      component: TimeOfficePolicyComponent
    },
    {
      path: 'officeTimePolicyList',
      component: TimeOfficePolicyListComponent
    },
    {
      path: 'specialWorkingDayy',
      component: SpecialWorkingDayComponent
    },
    {
      path: 'specialWorkingDayUpdate/:id',
      component: SpecialWorkingDayUpdateComponent
    },
    {
      path: 'specialWorkingDaylist',
      component: SpecialWorkingDayListComponent
    },
    {
      path: 'specialNonWorkingDay',
      component: SpecialNonWorkingDayComponent
    },
    {
      path: 'attendanceLockList',
      component: AttendanceLockListComponent
    },
    {
      path: 'subDepShiftAllocation',
      component: SubDepartmentShiftallocationComponent
    },
    {
      path: 'attendanceLockUnlock',
      component: AttendanceunlockListComponent
    },
    {
      path: 'policySetting',
      component: PolicySettingComponent
    },
  ]
  }
  
];

@NgModule({
  declarations: [
    ShiftPolicyComponent,
    LateDeparturePlanComponent,
    LateDeductionPlanComponent,
    LateDeductionHistoryComponent,
    EarlyDeparturePlanListComponent,
    EarlyDeparturePlanAssignComponent,
    EarlyDeparturePlanHistoryComponent,
    OtAdjustmentSetupComponent,
    OtAdjustmentAssignComponent,
    OtAdjustmentHistoryComponent,
    DropdownListComponent,
    ImportDropdownListComponent,
    Test1Component,
    OthersComponent,
    WorkFlowComponent,
    WorkFlowFormComponent, 
    TransferAquisitionComponent,
    RoleMasterComponent,
    RoleMasterFormComponent,
    AssignRoleComponent,
    AssignRoleExcelComponent,
    SetupConfigComponent,
    PayElementComponent,
    PayElementFormComponent,
    SalaryPolicyComponent,
    SalaryPolicyFormComponent,
    SalaryFormulasComponent,
    SalaryFormulasFormComponent,
    ImportPayElementComponent,
    ShiftImportComponent,
    OffDayComponent,
    HolidaysComponent,
    ProvidentFundComponent,
    ProvidentFundTableComponent,
    EsicTableComponent,
    EsicComponent,
    ProfessionalTaxComponent,
    ProfessionalTaxTableComponent,
    SalaryCalendarManualComponent,
    TimeOfficePolicyComponent,
    TimeOfficePolicyListComponent,
    SpecialWorkingDayComponent,
    SpecialWorkingDayListComponent,
    SpecialWorkingDayUpdateComponent,
    SpecialnonWorkingDayUpdateComponent,
    SpecialNonWorkingDayComponent,
    AttendanceLockListComponent,
    SubDepartmentShiftallocationComponent,
    AttendanceunlockListComponent,
    LookupMasterComponent,
    LeaveAllocationUpdateComponent,
    LeaveAllocationComponent,
    RolesComponent,
    PolicySettingComponent

  ],
  imports: [
    CommonModule, 
    RouterModule.forChild(routes),
    ReactiveFormsModule, DataTablesModule, BsDatepickerModule.forRoot(),AngularDualListBoxModule, MatTableModule, MatCheckboxModule, FormsModule,
    NgxBootstrapMultiselectModule, MatPaginatorModule, MatButtonModule, MatSelectModule, NgSelectModule, MatInputModule, MatTreeModule, 

    A11yModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    PortalModule,
    ScrollingModule,
  ]
  
    
})
export class MastersModule { }
