import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { TrfComponent } from './component/trf/trf.component';
import { PrivateComponent } from './private.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AgGridModule } from 'ag-grid-angular';
import { CreateTrfComponent } from './component/trf/componets/create-trf/create-trf.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewtrfComponent } from './component/trf/componets/viewtrf/viewtrf.component';
import { TrfActionComponent } from './component/trf/componets/trf-action/trf-action.component';
import { TrainerComponent } from './component/trainer/trainer.component';
import { TrainingComponent } from './component/training/training.component';
import { TrainingsummaryComponent } from './component/trainingsummary/trainingsummary.component';

@NgModule({
  declarations: [
    PrivateComponent,
    TrfComponent,
    DashboardComponent,
    CreateTrfComponent,
    ViewtrfComponent,
    TrfActionComponent,
    TrainerComponent,
    TrainingComponent,
    TrainingsummaryComponent
  ],
  imports: [
    CommonModule,
    AgGridModule,
    PrivateRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [PrivateComponent]
})
export class PrivateModule { }
