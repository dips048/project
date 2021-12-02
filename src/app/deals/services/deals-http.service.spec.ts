import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DealsHttpService } from './deals-http.service';
import { DealsModel } from '../models';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('DealsHttpService test', () => {
  let service: DealsHttpService;
  let httpTestingController: HttpTestingController;
  const value: DealsModel[] = [{Loans: [{Loanid:1,LoanAmount:81297,IntrestRate:"0.7051",LeaseIndicator:false,NoteDate:"12/2/2020",DueDate:"3/20/2021",Properties:[{name:"Quire",city:"KallÃ­fytos",yearBuilt:1988}],PaymentTerms:[] }] }];
  const expectedValue = {Loanid:1,LoanAmount:81297,IntrestRate:"0.7051",LeaseIndicator:false,NoteDate:"12/2/2020",DueDate:"3/20/2021",Properties:null,name:"Quire",city:"KallÃ­fytos",yearBuilt:1988,PaymentTerms:[]}

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [DealsHttpService]
    });
    service = TestBed.inject(DealsHttpService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call correct URL', (() => {
    service.getPropertyLoans().subscribe(loans => {
      expect(loans[0]).toEqual(expectedValue);
    });
    const req = httpTestingController.expectOne("assets/deals.json");
    req.flush(value)
    expect(req.request.method).toBe('GET');
    httpTestingController.verify();
  }));

});

describe('DealsHttpService', () => {
  let service: DealsHttpService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  const value: DealsModel[] = [{Loans: [{Loanid:1,LoanAmount:81297,IntrestRate:"0.7051",LeaseIndicator:false,NoteDate:"12/2/2020",DueDate:"3/20/2021",Properties:[{name:"Quire",city:"KallÃ­fytos",yearBuilt:1988}],PaymentTerms:[] }] }];
  const expectedValue = {Loanid:1,LoanAmount:81297,IntrestRate:"0.7051",LeaseIndicator:false,NoteDate:"12/2/2020",DueDate:"3/20/2021",Properties:null,name:"Quire",city:"KallÃ­fytos",yearBuilt:1988,PaymentTerms:[]}

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [DealsHttpService, { provide: HttpClient, useValue: spy }]
    });
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    service = TestBed.inject(DealsHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected values from service (HttpClient called once)', (() => {
    const spy = httpClientSpy.get.and.returnValue(of(value));
    service.getPropertyLoans().subscribe(loans => {
      expect(loans[0]).toEqual(expectedValue);
    });
    expect(spy.calls.count()).toBe(1);
  }));

});


