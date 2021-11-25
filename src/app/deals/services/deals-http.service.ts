import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { flattenDeep } from 'lodash-es';
import { map, Observable } from 'rxjs';
import { DealsModel, PropertyLoansModel } from '../models';

@Injectable({
  providedIn: 'root'
})
export class DealsHttpService {

  constructor(
    private httpClient: HttpClient
  ) { }

  /**
   * gets all the deals data from `deals.json` file
   * @returns returns the flatern array of `PropertyLoanModel`
   */
  getPropertyLoans(): Observable<Array<PropertyLoansModel>> {
    return this.httpClient.get<Array<DealsModel>>("assets/deals.json").pipe(
      map(deals => deals.map(deal => deal.Loans)),
      map(Loans => flattenDeep(Loans)),
      map(loans => loans.map((loan) => loan.Properties.map(property => ({...loan,...property, Properties: null})))),
      map(properties => flattenDeep(properties)),
    );
  }
}
