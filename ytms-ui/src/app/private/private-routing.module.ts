import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrfComponent } from './component/trf/trf.component';
import { PrivateComponent } from './private.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { CreateTrfComponent } from './component/trf/componets/create-trf/create-trf.component';
import { ViewtrfComponent } from './component/trf/componets/viewtrf/viewtrf.component';
import { TrainerComponent } from './component/trainer/trainer.component';
import { TrainingComponent } from './component/training/training.component';
import { TrainingsummaryComponent } from './component/trainingsummary/trainingsummary.component';

const routes: Routes = [
  {
    path: '',
    component: PrivateComponent,
    children: [
      { path: '', redirectTo: 'trf', pathMatch: 'full' },
      { path: 'trf', component: TrfComponent },
      { path: 'trf/create', component: CreateTrfComponent },
      { path: 'trf/view', component: ViewtrfComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'trainer', component: TrainerComponent },
      { path: 'training', component: TrainingComponent },
      { path: 'summary', component: TrainingsummaryComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
