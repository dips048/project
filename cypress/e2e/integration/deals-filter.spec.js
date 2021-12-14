import FilterPage from "./page-object/filter-page"

describe('Ag grid filters', () => {
  const filter = new FilterPage();
  beforeEach(() => {
    filter.navigate();
  })

  describe('property loan grid', () => {
    it('should apply filter on other grids if apply filter on the property loan grid', () => {
      filter.addFilterToGrid('propertyLoanGrid', 'Loanid', '1');

      filter.checkFilter('loansGrid', 'Loanid', '1');
      filter.checkFilter('loanDueDateGrid', 'Loanid', '1');
      filter.checkFilter('propertyLoanGrid', 'Loanid', '1');

      filter.clearFilters();
    })

    it.only('should select rows and after apply filter should change the selected rows by filter', () => {
      filter.selectRowsRange('propertyLoanGrid', 0, 10);
      filter.addFilterToGrid('propertyLoanGrid', 'Loanid', '1');
      filter.checkRowSelectedAfterFilter('propertyLoanGrid', 'Loanid', '1');
    })
  })

  describe('loans grid', () => {
    it('should apply filter on other grids if apply filter on the loans grid', () => {
      filter.addFilterToGrid('loansGrid', 'Loanid', '1');

      filter.checkFilter('loansGrid', 'Loanid', '1');
      filter.checkFilter('loanDueDateGrid', 'Loanid', '1');
      filter.checkFilter('propertyLoanGrid', 'Loanid', '1');

      filter.clearFilters();
    })

    it('should select rows and after apply filter should change the selected rows by filter', () => {
      filter.selectRowsRange('propertyLoanGrid', 0, 10);
      filter.addFilterToGrid('propertyLoanGrid', 'Loanid', '1');
      filter.checkRowSelectedAfterFilter('propertyLoanGrid', 'Loanid', '1');
    })
  })

  describe('loan due date grid', () => {
    it('should apply filter on other grids if apply filter on the loanDueDateGrid', () => {
      filter.addFilterToGrid('loanDueDateGrid', 'Loanid', '1');

      filter.checkFilter('loansGrid', 'Loanid', '1');
      filter.checkFilter('loanDueDateGrid', 'Loanid', '1');
      filter.checkFilter('propertyLoanGrid', 'Loanid', '1');

      filter.clearFilters();
    })
  })
})

// cy.get(`[data-cy=propertyLoanGrid] .ag-center-cols-container .ag-row`).its('length').then((val)=>{
//   cy.get(`[data-cy=loansGrid] .ag-center-cols-container .ag-row`).its('length').should('eq',val)
//   cy.get(`[data-cy=propertyLoanGrid] .ag-center-cols-container .ag-row`).its('length').should('eq',val)
// })
