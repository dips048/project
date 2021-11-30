import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ViewLoansComponent } from './view-loans.component';
import { DealsHttpService } from '../../services';
import { PropertyLoansModel } from '../../models';
import { of } from 'rxjs';

describe('ViewLoansComponent', () => {
  let component: ViewLoansComponent;
  let fixture: ComponentFixture<ViewLoansComponent>;
  let service: DealsHttpService;
  const value = { Loanid: {filter: 1, filterType: "number", type: "equals"}}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewLoansComponent ],
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

  it('should call `propertyFilterChange`', () => {
    const propertyloanGridSpy = spyOn(component, 'propertyFilterChange');
    component.propertyFilterChange(value)
    expect(propertyloanGridSpy).toHaveBeenCalledWith(value);
  });

  it('should call `loanFilterChange`', () => {
    const loanGridSpy = spyOn(component, 'loanFilterChange');
    component.loanFilterChange(value)
    expect(loanGridSpy).toHaveBeenCalledWith(value);
  });

  it('should call `loanDueDateFilterChange`', () => {
    const loanDueDateGridSpy = spyOn(component, 'loanDueDateFilterChange');
    component.loanDueDateFilterChange(value)
    expect(loanDueDateGridSpy).toHaveBeenCalledWith(value);
  });

  it('should call `resetFilters`', () => {
    const propertyGridGridSpy = spyOn(component, 'resetFilters');
    component.resetFilters()
    expect(propertyGridGridSpy).toHaveBeenCalled();
  });

});
