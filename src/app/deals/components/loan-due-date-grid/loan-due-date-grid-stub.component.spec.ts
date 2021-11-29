import { Component } from "@angular/core";
import { LoanDueDateGridComponent } from "./loan-due-date-grid.component";

@Component({
  selector: 'app-loan-due-date-grid',
  template: '',
  providers: [
    {
      provide: LoanDueDateGridComponent,
      useClass: LoanDueDateGridStubComponent
    }
  ]
})
export class LoanDueDateGridStubComponent {
  setFilterValue() {}
}
