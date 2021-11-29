import { Component } from "@angular/core";
import { PropertyLoanGridComponent } from "./property-loan-grid.component";

@Component({
  selector: 'app-property-loan-grid',
  template: '',
  providers: [
    {
      provide: PropertyLoanGridComponent,
      useClass: PropertyLoanGridStubComponent
    }
  ]
})
export class PropertyLoanGridStubComponent {
  setFilterValue() {}
}
