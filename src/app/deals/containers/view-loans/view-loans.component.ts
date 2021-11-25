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
   * If the filter changes in loan grid or property loan grid then this method will call @method setFilterValue
   * of grid for seting the filter to both grids
   * @param value
   */
  filterChange(value: any){
    this.propertyGrid.setFilterValue(value);
    this.loanGrid.setFilterValue(value);
    this.loanDueDateGrid.setFilterValue(value);
  }

}
