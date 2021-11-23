import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { flatten, flattenDeep } from 'lodash-es';
import { map, Observable } from 'rxjs';
import { DealsModel, Loan } from '../models';

@Injectable({
  providedIn: 'root'
})
export class DealsHttpService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getDeals(): Observable<Array<Loan>> {
    return this.httpClient.get<Array<DealsModel>>("assets/deals.json").pipe(
      map(deals => deals.map(deal => deal.Loans)),
      map(deals => flattenDeep(deals))
    );
  }
}
