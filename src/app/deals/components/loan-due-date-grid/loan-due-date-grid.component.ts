import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-loan-due-date-grid',
  templateUrl: './loan-due-date-grid.component.html',
  styleUrls: ['./loan-due-date-grid.component.css']
})
export class LoanDueDateGridComponent implements OnInit {

  @ViewChild('myGrid') myGrid: AgGridAngular;

  @Input() rowData: Array<any> | null;
  @Output() filterChange = new EventEmitter();

  columnDefs: ColDef[] = [
    { field: 'Loanid', filter: 'agNumberColumnFilter' },
    { field: 'LoanAmount', filter: 'agNumberColumnFilter', hide: true },
    { field: 'IntrestRate', filter: 'agNumberColumnFilter', hide: true },
    { field: 'DueDate',
      filter: 'agDateColumnFilter',
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
