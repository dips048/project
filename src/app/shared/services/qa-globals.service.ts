import { Injectable } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, Column, IFilterComp } from 'ag-grid-community';

export interface ICcsfCol {
  colId: string;
  colHeadr: string;
}

export interface IQaGrid {
  getRowCount(): number;
  getColumnCount(): number;
  getColumns(): ICcsfCol[];
  getAllTableData(): string;
  setColumn(columnName: string): ColDef;
  getFilterApi(key: string | Column): IFilterComp;
  getGrid(): AgGridAngular;
}

@Injectable({
  providedIn: 'root'
})
export class QaGlobalsService {

  public grids: { [keyof: string]: IQaGrid } = {};
  public pendingRequestCount = 0;

  constructor() {
    window['QaGlobalsService'] = this;
  }

  addGrid(gridName: string, grid: IQaGrid) {
    this.grids[gridName] = grid;
  }

  removeGrid(gridName: string) {
    this.grids[gridName] = null;
    delete this.grids[gridName];
  }
}
