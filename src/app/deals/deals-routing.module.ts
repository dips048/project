import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewLoansComponent } from './containers/view-loans/view-loans.component';

const routes: Routes = [{ path: '', component: ViewLoansComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DealsRoutingModule { }
