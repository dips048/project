describe('loans grid filter test', () => {

  beforeEach(() => {
    cy.visit('/')
  });

  it('filters for loanid in loans grid', () => {
    cy.get('[data-cy=loansGrid]')

    cy.get('[data-cy=loansGrid] .ag-icon-menu')
      .first()
      .click()

    cy.get('[data-cy=loansGrid] .ag-filter-filter').first()
      .type('1')

    cy.get('[data-cy=loansGrid] [ref=applyFilterButton]').click()

    cy.get('button').contains('Clear filters').click()
  });

  it('filters for loanid in loan due date grid', () => {
    cy.get('[data-cy=loanDueDateGrid]')

    cy.get('[data-cy=loanDueDateGrid] .ag-icon-menu')
      .first()
      .click()

    cy.get('[data-cy=loanDueDateGrid] .ag-filter-filter').first()
      .type('1')

    cy.get('[data-cy=loanDueDateGrid] [ref=applyFilterButton]').click()

    cy.get('button').contains('Clear filters').click()
  });


  it('filters for loanid in property grid', () => {
    cy.get('[data-cy=propertyLoanGrid]')

    cy.get('[data-cy=propertyLoanGrid] .ag-icon-menu')
      .first()
      .click()

    cy.get('[data-cy=propertyLoanGrid] .ag-filter-filter').first()
      .type('1')

    cy.get('[data-cy=propertyLoanGrid] [ref=applyFilterButton]').click()

    cy.get('button').contains('Clear filters').click()
  });

})



