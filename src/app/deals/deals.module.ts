import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DealsRoutingModule } from './deals-routing.module';
import { containers } from './containers';
import { components } from './components';
import { AgGridModule } from 'ag-grid-angular';


@NgModule({
  declarations: [
    ...components,
    ...containers,
  ],
  imports: [
    CommonModule,
    DealsRoutingModule,
    AgGridModule,
  ]
})
export class DealsModule { }
