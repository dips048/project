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

  selectRowsRange(grid, startFrom, end) {
    cy.get(`[data-cy=${grid}] .ag-center-cols-container .ag-row .ag-checkbox-input`)
      .then((checkBoxes) => {
        checkBoxes.each((index) =>{
          if(index <= end-1 && index >= startFrom-1) {
            cy.get(`[data-cy=${grid}] [row-index="${index}"] .ag-checkbox-input`)
            .click()
          }
        })
      })
  }

  // checkRowNotSelected(grid){
  //   cy.get(`[data-cy=${grid}] .ag-center-cols-container .ag-row`)
  //     .should('not.to.have.class', 'ag-row-selected')
  // }

  checkRowSelectedAfterFilter(grid, colId, value){
    cy.get(`[data-cy=${grid}] .ag-center-cols-container .ag-row-selected`)
      .then(rows => {
        rows.each((index) => {
          console.log(index);
          return cy.get(`[data-cy=${grid}] [row-index="${index}"] [col-id="${colId}"] .ag-cell-value`)
            .then(cell => {
              expect(cell).to.have.text(`${value}`);
            })
        })
      })
    cy.get(`[data-cy=${grid}] .ag-center-cols-container .ag-row-selected`).its('length').then((val) => {
      cy.get('span')
        .contains('selected rows').should('have.text',`selected rows: ${val}`);
    })
  }

  // selectAllRows(grid){
  //   cy.get(`[data-cy=${grid}] [col-id="Loanid"] [aria-label="Press Space to toggle all rows selection (unchecked)"]`)
  //     .click();
  // }

  // deselectAll(grid){
  //   cy.get(`[data-cy=${grid}] [col-id="Loanid"] .ag-header-select-all .ag-checkbox-input`)
  //     .click();
  //   cy.get(`[data-cy=${grid}] [col-id="Loanid"] [aria-label="Press Space to toggle all rows selection (checked)"]`)
  //   .click();
  // }

}
export default FilterPage
