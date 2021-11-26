import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DealsHttpService } from './deals-http.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { PropertyLoansModel } from '../models';

import { defer } from 'rxjs';

describe('DealsHttpService', () => {
  let service: DealsHttpService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [DealsHttpService]
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = TestBed.inject(DealsHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('should return expected values (HttpClient called once)', (done: DoneFn) => {
  //   const expectedValues: PropertyLoansModel = {Loanid:1,LoanAmount:81297,IntrestRate:"0.7051",LeaseIndicator:false,NoteDate:"12/2/2020",DueDate:"3/20/2021",name:"Quire",city:"Kallífytos",yearBuilt:1988}

  //   httpClientSpy.get.and.returnValue(defer(() => Promise.resolve()));

  //   service.getPropertyLoans().subscribe(
  //     (loans) => {
  //       expect(loans[0]).toEqual(expectedValues);
  //       done();
  //     },
  //     // done.fail
  //   );
  //   expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  // });

  // it('should return an error when the server returns a 404', (done: DoneFn) => {
  //   const errorResponse = new HttpErrorResponse({
  //     error: 'test 404 error',
  //     status: 404, statusText: 'Not Found'
  //   });

  //   httpClientSpy.get.and.returnValue(defer(() => Promise.reject(errorResponse)));

  //   service.getPropertyLoans().subscribe(
  //     () => done.fail('expected an error, not value'),
  //     error  => {
  //       expect(error.message).toContain('test 404 error');
  //       done();
  //     }
  //   );
  // });

});


