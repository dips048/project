import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ViewLoansComponent } from './view-loans.component';
import { DealsHttpService } from '../../services';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { PropertyLoanGridComponent } from '../../components/property-loan-grid/property-loan-grid.component';
import { LoanDueDateGridComponent } from '../../components/loan-due-date-grid/loan-due-date-grid.component';
import { LoansGridComponent } from '../../components/loans-grid/loans-grid.component';
import { MockComponents } from 'ng-mocks';

describe('ViewLoansComponent', () => {
  let component: ViewLoansComponent;
  let fixture: ComponentFixture<ViewLoansComponent>;
  let service: DealsHttpService;
  const filterValue = { Loanid: {filter: 1, filterType: "number", type: "equals"}}
  const expectedValue = {Loanid:1,LoanAmount:81297,IntrestRate:"0.7051",LeaseIndicator:false,NoteDate:"12/2/2020",DueDate:"3/20/2021",name:"Quire",city:"KallÃ­fytos",yearBuilt:1988}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewLoansComponent, MockComponents(PropertyLoanGridComponent, LoanDueDateGridComponent, LoansGridComponent) ],
      imports: [ HttpClientTestingModule ],
      providers: [DealsHttpService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(ViewLoansComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(DealsHttpService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return expected values', (done: DoneFn) => {
    const spy = spyOn(service,'getPropertyLoans').and.returnValue(of([expectedValue]));
    component.ngOnInit();
    component.propertyLoans$.subscribe(loans => {
      expect(loans).toEqual([expectedValue]);
      done();
    });
    expect(spy.calls.count()).toBe(1);
  });

  describe('filter function callls', () => {
    let propertyLoanGridComponent: PropertyLoanGridComponent;
    let loansGridComponent: LoansGridComponent;
    let loanDueDateGridComponent: LoanDueDateGridComponent;

    beforeEach(async () =>  {
      spyOn(service,'getPropertyLoans').and.returnValue(of([expectedValue]));
      component.ngOnInit();
      component.propertyLoans$.subscribe();
      fixture.detectChanges();
      propertyLoanGridComponent = fixture.debugElement.query(By.directive(PropertyLoanGridComponent)).componentInstance;
      loansGridComponent = fixture.debugElement.query(By.directive(LoansGridComponent)).componentInstance;
      loanDueDateGridComponent = fixture.debugElement.query(By.directive(LoanDueDateGridComponent)).componentInstance;

    });

    it('should renders an independent PropertyLoanGridComponent', () => {
      spyOn(component,'propertyFilterChange').and.callThrough();
      spyOn(loansGridComponent, 'setFilterValue');
      spyOn(loanDueDateGridComponent, 'setFilterValue');

      expect(propertyLoanGridComponent).toBeTruthy();
      propertyLoanGridComponent.filterChange.emit(filterValue);

      expect(component.propertyFilterChange).toHaveBeenCalledWith(filterValue);
      expect(loansGridComponent.setFilterValue).toHaveBeenCalledWith(filterValue);
      expect(loanDueDateGridComponent.setFilterValue).toHaveBeenCalledWith(filterValue);
    });

    it('should renders an independent LoanDueDateGridComponent', () => {
      spyOn(component,'loanDueDateFilterChange').and.callThrough();
      spyOn(propertyLoanGridComponent, 'setFilterValue');
      spyOn(loansGridComponent, 'setFilterValue');

      expect(loanDueDateGridComponent).toBeTruthy();
      loanDueDateGridComponent.filterChange.emit(filterValue);

      expect(component.loanDueDateFilterChange).toHaveBeenCalledWith(filterValue);
      expect(loansGridComponent.setFilterValue).toHaveBeenCalledWith(filterValue);
      expect(propertyLoanGridComponent.setFilterValue).toHaveBeenCalledWith(filterValue);
    });

    it('should renders an independent LoansGridComponent', () => {
      spyOn(component,'loanFilterChange').and.callThrough();
      spyOn(propertyLoanGridComponent, 'setFilterValue');
      spyOn(loanDueDateGridComponent, 'setFilterValue');

      expect(loansGridComponent).toBeTruthy();
      loansGridComponent.filterChange.emit(filterValue);

      expect(component.loanFilterChange).toHaveBeenCalledWith(filterValue);
      expect(loanDueDateGridComponent.setFilterValue).toHaveBeenCalledWith(filterValue);
      expect(propertyLoanGridComponent.setFilterValue).toHaveBeenCalledWith(filterValue);
    });

    it('should call setfilterValue on `Clear Filter` button', () => {
      spyOn(component, 'resetFilters').and.callThrough();
      spyOn(propertyLoanGridComponent, 'setFilterValue');
      spyOn(loansGridComponent, 'setFilterValue');
      spyOn(loanDueDateGridComponent, 'setFilterValue');

      const button = fixture.debugElement.nativeElement.querySelector(['button']);
      button.dispatchEvent(new Event('click'));

      expect(component.resetFilters).toHaveBeenCalledWith();
      expect(propertyLoanGridComponent.setFilterValue).toHaveBeenCalledWith(null);
      expect(loansGridComponent.setFilterValue).toHaveBeenCalledWith(null);
      expect(loanDueDateGridComponent.setFilterValue).toHaveBeenCalledWith(null);
    });
  });

});

