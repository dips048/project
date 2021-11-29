import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { PropertyLoansModel } from '../../models';

@Component({
  selector: 'app-loans-grid',
  templateUrl: './loans-grid.component.html',
  styleUrls: ['./loans-grid.component.css']
})
export class LoansGridComponent implements OnInit {

  @ViewChild('myGrid') myGrid: AgGridAngular;

  @Input() rowData: Array<PropertyLoansModel>;
  @Output() filterChange = new EventEmitter();

  columnDefs = [
    { field: 'Loanid', filter: 'agNumberColumnFilter',
      filterParams: {
        buttons: ['apply', 'cancel'],
        closeOnApply: true,
      },
    },
    { field: 'LoanAmount', filter: 'agNumberColumnFilter',
      filterParams: {
        buttons: ['apply', 'cancel'],
        closeOnApply: true,
      },
    },
    { field: 'IntrestRate', filter: 'agNumberColumnFilter',
        filterParams: {
          buttons: ['apply', 'cancel'],
          closeOnApply: true,
      },
    },
    { field: 'DueDate',
      filter: 'agDateColumnFilter',
      hide: true,
      filterParams: {
        comparator: (filterLocalDateAtMidnight: Date, cellValue: any) =>  {
          const dateAsString = cellValue;
          if (dateAsString == null) return -1;
          const dateParts = dateAsString.split('/');
          const cellDate = new Date(
            Number(dateParts[2]),
            Number(dateParts[1]) - 1,
            Number(dateParts[0])
          );
          if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
            return 0;
          }
          if (cellDate < filterLocalDateAtMidnight) {
            return -1;
          }
          if (cellDate > filterLocalDateAtMidnight) {
            return 1;
          }
        }
      }
    },
    {
      field: 'NoteDate',
      filter: 'agDateColumnFilter',
      hide: true ,
      filterParams: {
        comparator: (filterLocalDateAtMidnight: Date, cellValue: any) =>  {
          const dateAsString = cellValue;
          if (dateAsString == null) return -1;
          const dateParts = dateAsString.split('/');
          const cellDate = new Date(
            Number(dateParts[2]),
            Number(dateParts[1]) - 1,
            Number(dateParts[0])
          );
          if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
            return 0;
          }
          if (cellDate < filterLocalDateAtMidnight) {
            return -1;
          }
          if (cellDate > filterLocalDateAtMidnight) {
            return 1;
          }
        }
      }
    },
    { field: 'name', filter: 'agTextColumnFilter', hide: true },
    { field: 'city', filter: 'agTextColumnFilter', hide: true },
    { field: 'yearBuilt', filter: 'agNumberColumnFilter', hide: true },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * set the filter value of a grid
   * @param value
   */
  setFilterValue(value: any) {
    this.myGrid.api.setFilterModel(value);
  }

}
