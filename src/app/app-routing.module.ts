import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { JobsListingComponent } from './components/jobs-listing/jobs-listing.component';
import { SettingsComponent } from './components/settings/settings.component';

const routes: Routes = [{path: '', redirectTo: '/jobs-list', pathMatch: 'full'},
{path: 'dashboard', component: DashboardComponent},
{path: 'jobs-list', component: JobsListingComponent},
{path: 'settings', component: SettingsComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
