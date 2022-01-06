import { Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular';
import { PropertyLoanGridComponent } from 'src/app/deals/components/property-loan-grid/property-loan-grid.component';
import { QaGlobalsService } from '../services';
import { CcsfGridDirective } from './ccsf-grid.directive';

// @Component({
//   template: `
//     <ag-grid-angular id="loanDueDateGrid" [ccsfGrid]="'loanDueDateGrid'" data-cy="loanDueDateGrid" #myGrid (filterChanged)="onFilterChanged()"
//         style="width: 600px; height: 500px;"
//         class="ag-theme-alpine"
//         [rowData]="rowData"
//         [gridOptions]="gridOptions">
//     </ag-grid-angular>
//   `
// })
// export class TestComponent { }

describe('CcsfGridDirective', () => {
  let component: PropertyLoanGridComponent;
  let fixture: ComponentFixture<PropertyLoanGridComponent>;;
  let service: QaGlobalsService;
  let directive: CcsfGridDirective;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ CcsfGridDirective, PropertyLoanGridComponent ],
      providers: [QaGlobalsService],
      imports: [
        AgGridModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .createComponent(PropertyLoanGridComponent);
  });

  beforeEach(() => {
    component = fixture.componentInstance;
    service = TestBed.inject(QaGlobalsService);
    fixture.detectChanges();
    directive = new CcsfGridDirective(component.myGrid, service);
  })

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should create an instance of directive', () => {
    const dir = fixture.debugElement.query(By.directive(CcsfGridDirective));
    expect(dir).toBeTruthy();
    console.log(dir, window['QaGlobalsService']);
  })
});



