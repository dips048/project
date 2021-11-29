import { Component } from "@angular/core";
import { LoansGridComponent } from "./loans-grid.component";

@Component({
  selector: 'app-loans-grid',
  template: '',
  providers: [
    {
      provide: LoansGridComponent,
      useClass: LoansGridStubComponent
    }
  ]
})
export class LoansGridStubComponent {
  setFilterValue() {}
}
