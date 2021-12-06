class FilterPage {

  navigate() {
    cy.visit('http://localhost:4200');
  }

  addFilterToGrid(grid, colId, value) {
    cy.get(`[data-cy=${grid}] [col-id="${colId}"] .ag-icon-menu`)
      .click();
    cy.get(`[data-cy=${grid}] .ag-filter-filter`)
      .first()
      .clear()
      .type(value);
    cy.get('button')
      .contains('Apply')
      .click()
    return this
  }

  checkFilter(grid, colId, value){
    cy.get(`[data-cy=${grid}] .ag-center-cols-container .ag-row`)
    .then(rows => {
      rows.each((index) =>
        cy.get(`[data-cy=${grid}] [row-index="${index}"] [col-id="${colId}"] `)
        .then(cell => {
          expect(cell).to.have.text(`${value}`);
        })
      )
    })
  }

  clearFilters() {
    cy.get('button')
      .contains('Clear filters')
      .click()
  }
}
export default FilterPage
