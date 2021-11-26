import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ViewLoansComponent } from './view-loans.component';
import { DealsHttpService } from '../../services';
import { LoansGridComponent } from '../../components/loans-grid/loans-grid.component';
import { LoanDueDateGridComponent } from '../../components/loan-due-date-grid/loan-due-date-grid.component';
import { PropertyLoanGridComponent } from '../../components/property-loan-grid/property-loan-grid.component';
import { PropertyLoansModel } from '../../models';
import { of } from 'rxjs';

describe('ViewLoansComponent', () => {
  let component: ViewLoansComponent;
  let fixture: ComponentFixture<ViewLoansComponent>;
  let service: DealsHttpService;
  const value = { Loanid: {filter: 1, filterType: "number", type: "equals"}}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewLoansComponent, LoansGridComponent, LoanDueDateGridComponent, PropertyLoanGridComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [DealsHttpService]
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
    const expectedValues: PropertyLoansModel = {Loanid:1,LoanAmount:81297,IntrestRate:"0.7051",LeaseIndicator:false,NoteDate:"12/2/2020",DueDate:"3/20/2021",name:"Quire",city:"Kallífytos",yearBuilt:1988}
    const spy = spyOn(service,'getPropertyLoans').and.returnValue(of([expectedValues]));
    component.ngOnInit();
    component.propertyLoans$.subscribe(loans => {
      expect(loans).toEqual([expectedValues]);
      done();
    });
    expect(spy.calls.count()).toBe(1);
  });

  it('should call `setFilterValue` of loanGrid and loanDueDateGrid on `propertyFilterChange`', () => {

    const loanGridSpy = spyOn(component.loanGrid, 'setFilterValue');
    const loanDueDateGridSpy = spyOn(component.loanDueDateGrid, 'setFilterValue');

    component.propertyFilterChange(value)
    // fixture.detectChanges();
    expect(loanGridSpy).toHaveBeenCalledWith(value);
    expect(loanDueDateGridSpy).toHaveBeenCalledWith(value);
  });

  // it('should call `setFilterValue` of propertyGrid and loanDueDateGrid on `loanFilterChange`', () => {
  //   const propertyGridGridSpy = spyOn(component.propertyGrid, 'setFilterValue');
  //   const loanGridSpy = spyOn(component.loanGrid, 'setFilterValue');
  //   const loanDueDateGridSpy = spyOn(component.loanDueDateGrid, 'setFilterValue');

  //   component.loanFilterChange(value)
  //   fixture.detectChanges();
  //   expect(propertyGridGridSpy).toHaveBeenCalledWith(value);
  //   expect(loanDueDateGridSpy).toHaveBeenCalledWith(value);
  // });

  // it('should call `setFilterValue` of propertyGrid and loanGrid on `loanDueDateFilterChange`', () => {
  //   const value = { Loanid: {filter: 1, filterType: "number", type: "equals"}}

  //   const propertyGridGridSpy = spyOn(component.propertyGrid, 'setFilterValue');
  //   const loanGridSpy = spyOn(component.loanGrid, 'setFilterValue');

  //   component.loanDueDateFilterChange(value)
  //   fixture.detectChanges();
  //   expect(propertyGridGridSpy).toHaveBeenCalledWith(value);
  //   expect(loanGridSpy).toHaveBeenCalledWith(value);
  // });

  it('should call `setFilterValue` of loanGrid and loanDueDateGrid on `resetFilters`', () => {
    const propertyGridGridSpy = spyOn(component.propertyGrid, 'setFilterValue');
    const loanGridSpy = spyOn(component.loanGrid, 'setFilterValue');
    const loanDueDateGridSpy = spyOn(component.loanDueDateGrid, 'setFilterValue');

    component.resetFilters()
    fixture.detectChanges();
    expect(propertyGridGridSpy).toHaveBeenCalledWith(null);
    expect(loanGridSpy).toHaveBeenCalledWith(null);
    expect(loanDueDateGridSpy).toHaveBeenCalledWith(null);
  });

});
