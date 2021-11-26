import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';

import { PropertyLoanGridComponent } from './property-loan-grid.component';

describe('PropertyLoanGridComponent', () => {
  let component: PropertyLoanGridComponent;
  let fixture: ComponentFixture<PropertyLoanGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        AgGridModule.withComponents([])
      ],
      declarations: [ PropertyLoanGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyLoanGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('grid API is available after `detectChanges`', () => {
    fixture.detectChanges();
    expect(component.myGrid.gridOptions.api).toBeTruthy();
  });

  it('should emit on filterChange', () => {
    const emitSpy = spyOn(component.filterChange, 'emit');

    const nativeElement = fixture.debugElement.nativeElement;
    const grid = nativeElement.querySelector(['ag-grid-angular']);
    grid.dispatchEvent(new Event('filterChanged'));

    expect(emitSpy).toHaveBeenCalled();
  });

  it('should call `setFilterModel` on `setFilterValue`', () => {
    const setFilterModelSpy = spyOn(component.myGrid.api, 'setFilterModel');

    const value = { Loanid: {filter: 1, filterType: "number", type: "equals"}}
    component.setFilterValue(value);

    expect(setFilterModelSpy).toHaveBeenCalledWith(value);
  });
});
