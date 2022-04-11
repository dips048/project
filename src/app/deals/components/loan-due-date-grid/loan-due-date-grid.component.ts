import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { GridOptions, RowNode } from 'ag-grid-community';
import { PropertyLoansModel } from '../../models';

@Component({
  selector: 'app-loan-due-date-grid',
  templateUrl: './loan-due-date-grid.component.html',
  styleUrls: ['./loan-due-date-grid.component.css']
})
export class LoanDueDateGridComponent implements OnInit {

  @ViewChild('myGrid') myGrid: AgGridAngular;

  @Input() rowData: Array<PropertyLoansModel>;
  @Output() filterChange = new EventEmitter();

  gridOptions: GridOptions = {
    columnDefs: [
      { field: 'Loanid', filter: 'agNumberColumnFilter',
        filterParams: {
          buttons: ['apply', 'cancel'],
          closeOnApply: true,
        },
        checkboxSelection: true
      },
      { field: 'LoanAmount', filter: 'agNumberColumnFilter', hide: true },
      { field: 'IntrestRate', filter: 'agNumberColumnFilter', hide: true },
      { field: 'DueDate',
        filter: 'agDateColumnFilter',
        filterParams: {
          buttons: ['apply', 'cancel'],
          closeOnApply: true,
          comparator: (filterLocalDateAtMidnight: Date, cellValue: any) => this.dateComparator(filterLocalDateAtMidnight,cellValue)
        }
      },
      {
        field: 'NoteDate',
        filter: 'agDateColumnFilter',
        filterParams: {
          buttons: ['apply', 'cancel'],
          closeOnApply: true,
          comparator: (filterLocalDateAtMidnight: Date, cellValue: any) => this.dateComparator(filterLocalDateAtMidnight,cellValue)
        }
      },
      { field: 'name', filter: 'agTextColumnFilter', hide: true },
      { field: 'city', filter: 'agTextColumnFilter', hide: true },
      { field: 'yearBuilt', filter: 'agNumberColumnFilter', hide: true },
    ],
    defaultColDef: {
      editable: true,
    },
    rowSelection: 'multiple',
    rowMultiSelectWithClick: true,
    onSelectionChanged: () => this.onSelectionChanged(),
  };

  selectedRows = 0;

  constructor() { }

  ngOnInit(): void {

  }

  onSelectionChanged() {
    const selectedRows = this.myGrid.api.getSelectedRows();
    this.selectedRows = selectedRows.length;
  }

  onFilterChanged() {
    this.filterChange.emit(this.myGrid.api.getFilterModel());
    this.setSelectedNodesAfterFilter();
    this.onSelectionChanged();
  }

  setSelectedNodesAfterFilter() {
    let nodes: RowNode[] = [];
    this.myGrid.api.forEachNodeAfterFilter(node => {
      if(node.isSelected()) { nodes.push(node);} return
    });
    this.myGrid.api.forEachNode(node => nodes.includes(node) ? node.setSelected(true) : node.setSelected(false));
  }

  /**
   * set the filter value of a grid
   * @param value
   */
  setFilterValue(value: any) {
    this.myGrid.api.setFilterModel(value);
  }

  /**
   * checks `filterLocalDateAtMidnight` and `cellValue` date and return 0,1,1 and undifined accordingly
   *
   * @param filterLocalDateAtMidnight
   * @param cellValue
   */
  dateComparator(filterLocalDateAtMidnight: Date, cellValue: any) {
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
