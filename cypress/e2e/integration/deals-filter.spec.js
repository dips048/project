import FilterPage from "./page-object/filter-page"

describe('Ag grid filters', () => {
  const filter = new FilterPage();
  beforeEach(() => {
    filter.navigate();
  })

  it('filters for loanid in loans grid', () => {
    filter.addFilterToGrid('loansGrid', 'Loanid', '1');

    filter.checkFilter('loansGrid', 'Loanid', '1');
    filter.checkFilter('loanDueDateGrid', 'Loanid', '1');
    filter.checkFilter('propertyLoanGrid', 'Loanid', '1');

    filter.clearFilters();
  })

  it('filters for loanid in loan due date grid', () => {
    filter.addFilterToGrid('loanDueDateGrid', 'Loanid', '1');

    filter.checkFilter('loanDueDateGrid', 'Loanid', '1');
    filter.checkFilter('loansGrid', 'Loanid', '1');
    filter.checkFilter('propertyLoanGrid', 'Loanid', '1');

    filter.clearFilters();
  });

  it('filters for loanid in property grid', () => {
    filter.addFilterToGrid('propertyLoanGrid', 'city', 'Wudui');

    filter.checkFilter('propertyLoanGrid', 'city', 'Wudui');

    filter.clearFilters();
  });

})

// cy.get(`[data-cy=propertyLoanGrid] .ag-center-cols-container .ag-row`).its('length').then((val)=>{
//   cy.get(`[data-cy=loansGrid] .ag-center-cols-container .ag-row`).its('length').should('eq',val)
//   cy.get(`[data-cy=propertyLoanGrid] .ag-center-cols-container .ag-row`).its('length').should('eq',val)
// })
