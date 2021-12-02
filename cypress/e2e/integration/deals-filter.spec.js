function addFilterToGrid(grid, colId, value) {
  cy.get(`[data-cy=${grid}`)
  cy.get(`[data-cy=${grid}] [col-id="${colId}"] .ag-icon-menu`)
  .click()
  cy.get(`[data-cy=${grid}] .ag-filter-filter`)
  .first()
  .clear()
  .type(value)
  cy.get('button').contains('Apply').click()
}

function applyMultipleValueFilterToGrid(grid, colId, value1, condition, value2) {
  cy.get(`[data-cy=${grid}`)
  cy.get(`[data-cy=${grid}] [col-id="${colId}"] .ag-icon-menu`)
  .click()
  cy.get(`[data-cy=${grid}] .ag-filter-filter`)
  .first()
  .clear()
  .type(value1)
  cy.get('.ag-filter-condition-operator').contains(condition).click()
  cy.get(`[data-cy=${grid}] [res="eCondition2Body"] .ag-filter-filter`)
  .clear()
  .type(value2)
  cy.get('button').contains('Apply').click()
}

describe('Ag grid filters', () => {

  beforeEach(() => {
    cy.visit('/')
  });

  it('filters for loanid in loans grid', () => {
    addFilterToGrid('loansGrid', 'Loanid', '1');
    addFilterToGrid('loansGrid', 'Loanid', '2');
    addFilterToGrid('propertyLoanGrid', 'city', 'Wudui');
    cy.get('button').contains('Clear filters').click()
  })

  it('filters for loanid in loan due date grid', () => {
    addFilterToGrid('loanDueDateGrid', 'Loanid', '1');
    cy.get('button').contains('Clear filters').click()
  });

  it.only('filters for loanid in property grid', () => {
    addFilterToGrid('propertyLoanGrid', 'city', 'Wudui');
    // applyMultipleValueFilterToGrid('propertyLoanGrid', 'city', 'Wudui', 'OR', 'Quva');
    cy.get('button').contains('Clear filters').click()
  });

})



