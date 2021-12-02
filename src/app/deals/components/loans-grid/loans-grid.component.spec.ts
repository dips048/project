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

  it('should call dateComparator method LoansGridComponent', () => {
    spyOn(component, 'dateComparator').and.callThrough();

    component.dateComparator(new Date(2021,11,2), '2/12/2021');
    expect(component.dateComparator).toHaveBeenCalledWith(new Date(2021,11,2), '2/12/2021');
    expect(component.dateComparator(new Date(2021,11,2), '2/12/2021')).toEqual(0);

    component.dateComparator(new Date(2021,11,2), '2/12/2022');
    expect(component.dateComparator).toHaveBeenCalledWith(new Date(2021,11,2), '2/12/2022');
    expect(component.dateComparator(new Date(2021,11,2), '2/12/2022')).toEqual(1);

    component.dateComparator(new Date(2021,11,2), '2/11/2020');
    expect(component.dateComparator).toHaveBeenCalledWith(new Date(2021,11,2), '2/11/2020');
    expect(component.dateComparator(new Date(2021,11,2), '2/11/2020')).toEqual(-1);

    component.dateComparator(new Date(2021,11,2), undefined);
    expect(component.dateComparator).toHaveBeenCalledWith(new Date(2021,11,2), undefined);
    expect(component.dateComparator(new Date(2021,11,2), undefined)).toEqual(-1);

  });
});
