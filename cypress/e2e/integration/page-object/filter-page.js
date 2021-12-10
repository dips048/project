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
  }

  checkFilter(grid, colId, value){
    cy.get(`[data-cy=${grid}] .ag-center-cols-container .ag-row`)
    .then(rows => {
      rows.each((index) =>
        cy.get(`[data-cy=${grid}] [row-index="${index}"] [col-id="${colId}"] .ag-cell-value`)
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

  selectRows(grid, rows) {
    cy.get(`[data-cy=${grid}] .ag-center-cols-container .ag-row .ag-checkbox-input`)
      .then((checkBoxes) => {
        checkBoxes.each((index) =>{
          if(index <= rows-1) {
            cy.get(`[data-cy=${grid}] [row-index="${index}"] .ag-checkbox-input`)
            .click()
          }
        })
      })
    cy.get('span')
      .contains('selected rows').should('have.text',`selected rows: ${rows}`);
  }

  checkRowNotSelected(grid){
    cy.get(`[data-cy=${grid}] .ag-9center-cols-container .ag-row`)
      .should('not.to.have.class', 'ag-row-selected')
  }

  checkRowSelectedWithValue(grid, colId, value){
    cy.get(`[data-cy=${grid}] .ag-center-cols-container .ag-row-selected`)
    .then(rows => {
      rows.each((index) =>
        cy.get(`[data-cy=${grid}] [row-index="${index}"] [col-id="${colId}"] .ag-cell-value`)
        .then(cell => {
          expect(cell).to.have.text(`${value}`);
        })
      )
    })
  }

  checkRowWithFilter(grid, colId, value) {
    this.selectRows(grid, 3)
    this.addFilterToGrid(grid, colId, value);
    this.checkRowSelectedWithValue(grid, colId, value);
  }
}
export default FilterPage
