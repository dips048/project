import { Directive, Input, OnDestroy } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, Column, ColumnApi, GridApi, IFilterComp } from 'ag-grid-community';
import { Subscription } from 'rxjs';
import { ICcsfCol, IQaGrid, QaGlobalsService } from '../services';

@Directive({
  selector: '[ccsfGrid]'
})
export class CcsfGridDirective implements IQaGrid, OnDestroy {

  @Input() ccsfGrid: string;

  gridApi: GridApi;
  columnApi: ColumnApi;
  subcription: Subscription | null = null;

  constructor(
    private gridComponent: AgGridAngular,
    private qaGlobals: QaGlobalsService,
  ) {
    if (this.subcription == null) {
      this.subcription = new Subscription();
      this.subcription.add(
        this.gridComponent.gridReady.subscribe(params => {
          this.gridApi = params.api;
          this.columnApi = params.columnApi;
          console.log('gridReady - api', this.gridApi);
          console.log('gridReady - api', this.columnApi);

          this.qaGlobals.addGrid(this.ccsfGrid, this);
        })
      )
    }
  }

  getFilterApi(key: string | Column): IFilterComp {
    throw new Error('Method not implemented.');
  };

  // getFilterApi(key: string | Column): IFilterComp {
  //   return this.gridApi.getFilterApi(key);
  // };

  getRowCount(): number {
    return this.gridApi.getDisplayedRowCount();
  };

  getColumnCount(): number {
    return this.columnApi.getAllColumns().length;
  };

  getColumns(): ICcsfCol[] {
    const cols = this.columnApi.getAllColumns();
    const ccsfCols: ICcsfCol[] = [];
    cols.forEach(col => {
      const ccsfcol: ICcsfCol = { colId: col.getColId(), colHeadr: col.getColDef().headerName };
      ccsfCols.push(ccsfcol);
    });
    return ccsfCols;
  };

  getAllTableData(): string {
    throw new Error('Method not implemented.');
  };

  setColumn(columnName: string): ColDef {
    return this.gridApi.getColumnDef(columnName);
  };

  getGrid(): AgGridAngular {
    return this.gridComponent;
  };

  ngOnDestroy(): void {
    this.qaGlobals.removeGrid(this.ccsfGrid);
    this.subcription.closed = true;
  }

}
