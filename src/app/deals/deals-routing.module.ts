import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DealsListComponent } from './containers/deals-list/deals-list.component';

const routes: Routes = [{ path: '', component: DealsListComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DealsRoutingModule { }
