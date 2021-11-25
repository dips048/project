import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanDueDateGridComponent } from './loan-due-date-grid.component';

describe('LoanDueDateGridComponent', () => {
  let component: LoanDueDateGridComponent;
  let fixture: ComponentFixture<LoanDueDateGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanDueDateGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanDueDateGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
