import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { LoansGridComponent } from '../../components/loans-grid/loans-grid.component';
import { PropertyLoanGridComponent } from '../../components/property-loan-grid/property-loan-grid.component';
import { PropertyLoansModel } from '../../models';
import { DealsHttpService } from '../../services';

@Component({
  selector: 'app-view-loans',
  templateUrl: './view-loans.component.html',
  styleUrls: ['./view-loans.component.css']
})
export class ViewLoansComponent implements OnInit {
  [x: string]: any;

  @ViewChild('propertyGrid') propertyGrid: PropertyLoanGridComponent;
  @ViewChild('loanGrid') loanGrid: LoansGridComponent;
  @ViewChild('loanDueDateGrid') loanDueDateGrid: LoansGridComponent;

  propertyLoans$: Observable<PropertyLoansModel[]>;

  constructor(
    private dealsHttpService: DealsHttpService
  ) { }

  ngOnInit(): void {
    this.propertyLoans$ = this.dealsHttpService.getPropertyLoans();
  }

  /**
   * If the filter changes in `propertyLoanGrid` then this method will call @method setFilterValue
   * of grid for seting the filter to `loanGrid` and loan `loanDueDateGrid`
   */
  propertyFilterChange(value: Record<string, Record<string, any>>) {
    console.log('value', value);
    this.loanGrid.setFilterValue(value);
    this.loanDueDateGrid.setFilterValue(value);
  }

  /**
   * If the filter changes in `loanGrid` then this method will call @method setFilterValue
   * of grid for seting the filter to `propertyLoanGrid` and `loanDueDateGrid`
   */
  laonFilterChange(value: any) {
    this.loanGrid.setFilterValue(value);
    this.loanDueDateGrid.setFilterValue(value);
  }

  /**
   * If the filter changes in `loanDueDateGrid` then this method will call @method setFilterValue
   * of grid for seting the filter to `propertyLoanGrid` and `loanGrid`
   */
   loanDueDateFilterChange(value: any) {
    this.loanGrid.setFilterValue(value);
    this.loanDueDateGrid.setFilterValue(value);
  }

  /**
   * clears the filters in `propertyLoanGrid`, `loanGrid` and `loanDueDateGrid` grids
   */
  resetFilters() {
    this.propertyGrid.setFilterValue(null);
    this.loanGrid.setFilterValue(null);
    this.loanDueDateGrid.setFilterValue(null);
  }

}
