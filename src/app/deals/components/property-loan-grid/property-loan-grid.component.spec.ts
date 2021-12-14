import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { GridApi, RowNode } from 'ag-grid-community';

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

  it('should set selectedRows value  onSelectionChanged call', () => {
    const selectedRows = [ {Loanid: 2, LoanAmount: 14200, IntrestRate: 0.5737, LeaseIndicator: true, NoteDate: "4/21/2021", DueDate: "1/28/2021", Properties: null, PaymentTerms: [ { IndexTermType: "hub" }, { IndexTermType: "capability" } ], name: "Mynte", city: "Častolovice", yearBuilt: 1995 } ];
    const selectRowsSpy = spyOn(component.myGrid.api, 'getSelectedRows').and.returnValue(selectedRows);
    component.onSelectionChanged();
    expect(selectRowsSpy).toHaveBeenCalled;
    expect(component.selectedRows).toEqual(1);
  });

  it('should call `setFilterModel` on `setFilterValue`', () => {
    const setFilterModelSpy = spyOn(component.myGrid.api, 'setFilterModel');

    const value = { Loanid: {filter: 1, filterType: "number", type: "equals"}}
    component.setFilterValue(value);

    expect(setFilterModelSpy).toHaveBeenCalledWith(value);
  });

  it('should call dateComparator method of PropertyLoanGridComponent', () => {
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

  describe('filterchange', () => {
    const filterValue: any = { Loanid: {filter: 1, filterType: "number", type: "equals"}}

    beforeEach(() => {
      component.rowData = [
        {Loanid: 1, LoanAmount: 14200, IntrestRate: '0.5737', LeaseIndicator: true, NoteDate: "4/21/2021", DueDate: "1/28/2021", name: "Mynte", city: "Častolovice", yearBuilt: 1995 },
        {Loanid: 2, LoanAmount: 14200, IntrestRate: '0.5737', LeaseIndicator: true, NoteDate: "4/21/2021", DueDate: "1/28/2021", name: "Mynte", city: "Častolovice", yearBuilt: 1995 },
        {Loanid: 3, LoanAmount: 14200, IntrestRate: '0.5737', LeaseIndicator: true, NoteDate: "4/21/2021", DueDate: "1/28/2021", name: "Mynte", city: "Častolovice", yearBuilt: 1995 },
        {Loanid: 4, LoanAmount: 14200, IntrestRate: '0.5737', LeaseIndicator: true, NoteDate: "4/21/2021", DueDate: "1/28/2021", name: "Mynte", city: "Častolovice", yearBuilt: 1995 }
      ];
    })

    it('should emit filter value on filter change', () => {
      const emitSpy = spyOn(component.filterChange, 'emit');

      component.setFilterValue(filterValue);

      const nativeElement = fixture.debugElement.nativeElement;
      const grid = nativeElement.querySelector(['ag-grid-angular']);
      grid.dispatchEvent(new Event('filterChanged'));

      expect(emitSpy).toHaveBeenCalledWith(filterValue);
    });

    it('should call the OnSelctionchange method', () => {
      const selectionChangeSpy = spyOn(component, 'onSelectionChanged');

      const nativeElement = fixture.debugElement.nativeElement;
      const grid = nativeElement.querySelector(['ag-grid-angular']);
      grid.dispatchEvent(new Event('filterChanged'));

      expect(selectionChangeSpy).toHaveBeenCalled();
    })

    it('should call the forEachNodeAfterFilter anf forEachNode method', () => {

      spyOn(component.myGrid.api, 'forEachNodeAfterFilter').and.callThrough();
      spyOn(component.myGrid.api, 'forEachNode').and.callThrough();

      fixture.detectChanges();

      component.myGrid.api.selectAll();
      component.setFilterValue(filterValue);

      const nativeElement = fixture.debugElement.nativeElement;
      const grid = nativeElement.querySelector(['ag-grid-angular']);
      grid.dispatchEvent(new Event('filterChanged'));

      expect(component.myGrid.api.forEachNodeAfterFilter).toHaveBeenCalled();
      expect(component.myGrid.api.forEachNode).toHaveBeenCalled();
    })
  });
});
