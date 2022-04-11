import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CellValueChangedEvent, GridOptions, NewValueParams, RowNode } from 'ag-grid-community';
import { PropertyLoansModel } from '../../models';

@Component({
  selector: 'app-property-loan-grid',
  templateUrl: './property-loan-grid.component.html',
  styleUrls: ['./property-loan-grid.component.css']
})
export class PropertyLoanGridComponent implements OnInit {

  @ViewChild('myGrid') myGrid: AgGridAngular;

  @Input() rowData: Array<PropertyLoansModel>;
  @Output() filterChange = new EventEmitter();
  @Output() cellValuechanged = new EventEmitter<PropertyLoansModel>();

  gridOptions: GridOptions = {
    columnDefs: [
      { field: 'Loanid', filter: 'agNumberColumnFilter',
        filterParams: {
          buttons: ['apply', 'cancel'],
          closeOnApply: true,
          newRowsAction: 'keep'
        },
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true
      },
      { field: 'LoanAmount', filter: 'agNumberColumnFilter',hide: true  },
      { field: 'IntrestRate', filter: 'agNumberColumnFilter', hide: true },
      { field: 'DueDate',
        filter: 'agDateColumnFilter',
        hide: true,
        filterParams: {
          comparator: (filterLocalDateAtMidnight: Date, cellValue: any) => this.dateComparator(filterLocalDateAtMidnight,cellValue)
        }
      },
      {
        field: 'NoteDate',
        filter: 'agDateColumnFilter',
        hide: true,
        filterParams: {
          comparator: (filterLocalDateAtMidnight: Date, cellValue: any) => this.dateComparator(filterLocalDateAtMidnight,cellValue)
        }
      },
      {
        headerName: 'Property Details',

        children: [
          { field: 'name', filter: 'agTextColumnFilter', columnGroupShow: 'oepn',
            filterParams: {
              buttons: ['apply', 'cancel'],
              closeOnApply: true,
            },
          },
          { field: 'city', filter: 'agTextColumnFilter', columnGroupShow: 'closed',
            filterParams: {
              buttons: ['apply', 'cancel'],
              closeOnApply: true,
            },
          },
          { field: 'yearBuilt', filter: 'agNumberColumnFilter', columnGroupShow: 'closed',
            filterParams: {
              buttons: ['apply', 'cancel'],
              closeOnApply: true,
            },
          },

        ]
      }
    ],
    defaultColDef: {
      editable: true,
      onCellValueChanged: (e) => this.cellvalueChanged(e),
      // cellEditingStarted: (e: any) => console.log('cellEditingStarted', e),
    },
    rowSelection: 'multiple',
    rowMultiSelectWithClick: true,
    onSelectionChanged: () => this.onSelectionChanged(),
    onRowEditingStarted: (e) => console.log('rowEditStarted', e),
    onRowEditingStopped: (e) => console.log('rowEditingStopped', e),
  };

  selectedRowsLen = 0;

  constructor() { }

  ngOnInit(): void {

  }

  cellvalueChanged(event: NewValueParams) {
    console.log('cellvalueChanged', event);
    this.cellValuechanged.emit(event.node.data);
  }

  onSelectionChanged() {
    const selectedRows = this.myGrid.api.getSelectedRows();
    this.selectedRowsLen = selectedRows.length;
  }

  onFilterChanged() {
    this.filterChange.emit(this.myGrid.api.getFilterModel());
    this.setSelectedNodesAfterFilter();
    this.onSelectionChanged();
  }

  setSelectedNodesAfterFilter() {
    let nodes: RowNode[] = [];
    this.myGrid.api.forEachNodeAfterFilter(node => {
      if(node.isSelected()) { nodes.push(node);}
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
