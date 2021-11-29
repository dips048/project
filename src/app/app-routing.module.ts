import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'deals',
    loadChildren: () => import('./deals/deals.module').then(m => m.DealsModule)
  },
  {
    path: '',
    redirectTo: 'deals',
    pathMatch: 'full',
  },
  {
    path: '**', redirectTo: 'deals'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
