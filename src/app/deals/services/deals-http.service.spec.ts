import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DealsHttpService } from './deals-http.service';
import { HttpClient } from '@angular/common/http';
import { PropertyLoansModel } from '../models';

import { of } from 'rxjs';

describe('DealsHttpService', () => {
  let service: DealsHttpService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  const expectedValue: PropertyLoansModel = {Loanid:1,LoanAmount:81297,IntrestRate:"0.7051",LeaseIndicator:false,NoteDate:"12/2/2020",DueDate:"3/20/2021",name:"Quire",city:"Kallífytos",yearBuilt:1988}

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
    const value = [{Loans: [{Loanid:1,LoanAmount:81297,IntrestRate:"0.7051",LeaseIndicator:false,NoteDate:"12/2/2020",DueDate:"3/20/2021",Properties:null,name:"Quire",city:"KallÃ­fytos",yearBuilt:1988}]}];

    const spy = httpClientSpy.get.and.returnValue(of(value));
    service.getPropertyLoans().subscribe(loans => {
      expect(loans[0]).toEqual(expectedValue);
    });
    expect(spy.calls.count()).toBe(1);
  }));

});


