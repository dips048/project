import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';

import { LoansGridComponent } from './loans-grid.component';

describe('LoansGridComponent', () => {
  let component: LoansGridComponent;
  let fixture: ComponentFixture<LoansGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        AgGridModule.withComponents([])
      ],
      declarations: [ LoansGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoansGridComponent);
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
    const button = nativeElement.querySelector(['ag-grid-angular']);
    button.dispatchEvent(new Event('filterChanged'));

    expect(emitSpy).toHaveBeenCalled();
  });

  it('should call `setFilterModel` on `setFilterValue`', () => {
    const setFilterModelSpy = spyOn(component.myGrid.api, 'setFilterModel');

    const value = { Loanid: {filter: 1, filterType: "number", type: "equals"}}
    component.setFilterValue(value);

    expect(setFilterModelSpy).toHaveBeenCalledWith(value);
  });
});
