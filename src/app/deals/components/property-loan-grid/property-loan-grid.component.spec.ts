import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyLoanGridComponent } from './property-loan-grid.component';

describe('PropertyLoanGridComponent', () => {
  let component: PropertyLoanGridComponent;
  let fixture: ComponentFixture<PropertyLoanGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyLoanGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyLoanGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
