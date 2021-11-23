import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { Loan } from '../../models';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableComponent implements OnInit {

  @Input() rowData: Array<Loan> | null;
  @Input() columnDefs: ColDef[];

  constructor() { }

  ngOnInit(): void {}

  filterChange(value: any){
    console.log('value', value);
  }

}
