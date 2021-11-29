import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DealsRoutingModule } from './deals-routing.module';
import { containers } from './containers';
import { components } from './components';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    ...components,
    ...containers,
  ],
  imports: [
    CommonModule,
    DealsRoutingModule,
    AgGridModule,
    HttpClientModule,
    MatProgressSpinnerModule
  ]
})
export class DealsModule { }
