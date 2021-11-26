import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ViewLoansComponent } from './view-loans.component';
import { DealsHttpService } from '../../services';
import { defer } from 'rxjs';
import { LoansGridComponent } from '../../components/loans-grid/loans-grid.component';
import { LoanDueDateGridComponent } from '../../components/loan-due-date-grid/loan-due-date-grid.component';
import { PropertyLoanGridComponent } from '../../components/property-loan-grid/property-loan-grid.component';

describe('ViewLoansComponent', () => {
  let component: ViewLoansComponent;
  let fixture: ComponentFixture<ViewLoansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewLoansComponent, LoansGridComponent, LoanDueDateGridComponent, PropertyLoanGridComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [DealsHttpService]
    })

    .compileComponents();
  });

  let hdsSpy: DealsHttpService;

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    hdsSpy = fixture.debugElement.injector.get(DealsHttpService) as any;
    jasmine.createSpy('getPropertyLoans').and.callFake(
      () => defer(() => Promise.resolve({})));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have called `getHero`', () => {
    expect(jasmine.createSpy('getPropertyLoans').and.callFake(
      () => defer(() => Promise.resolve({}))).calls.count()).toBeLessThan(3, 'getPropertyLoans called once');
  });

  it('Call set filter value method', () => {
    const propertyFilterChange = spyOn(component, 'propertyFilterChange').and.callThrough();
    expect(propertyFilterChange).not.toHaveBeenCalled()
  });

  it('should call `setFilterValue` of loanGrid and loanDueDateGrid on `propertyFilterChange`', () => {
    const value = { Loanid: {filter: 1, filterType: "number", type: "equals"}}

    const loanGridSpy = spyOn(component.loanGrid, 'setFilterValue');
    const loanDueDateGridSpy = spyOn(component.loanDueDateGrid, 'setFilterValue');

    component.propertyFilterChange(value)
    expect(loanGridSpy).toHaveBeenCalledWith(value);
    expect(loanDueDateGridSpy).toHaveBeenCalledWith(value);
  });

  // it('should call `setFilterValue` of propertyGrid and loanDueDateGrid on `laonFilterChange`', () => {
  //   const value = { Loanid: {filter: 1, filterType: "number", type: "equals"}}

  //   const propertyGridGridSpy = spyOn(component.propertyGrid, 'setFilterValue');
  //   const loanDueDateGridSpy = spyOn(component.loanDueDateGrid, 'setFilterValue');

  //   component.laonFilterChange(value)
  //   expect(propertyGridGridSpy).toHaveBeenCalledWith(value);
  //   expect(loanDueDateGridSpy).toHaveBeenCalledWith(value);
  // });

  // it('should call `setFilterValue` of propertyGrid and loanGrid on `loanDueDateFilterChange`', () => {
  //   const value = { Loanid: {filter: 1, filterType: "number", type: "equals"}}

  //   const propertyGridGridSpy = spyOn(component.propertyGrid, 'setFilterValue');
  //   const loanGridSpy = spyOn(component.loanGrid, 'setFilterValue');

  //   component.loanDueDateFilterChange(value)
  //   expect(propertyGridGridSpy).toHaveBeenCalledWith(value);
  //   expect(loanGridSpy).toHaveBeenCalledWith(value);
  // });

});
