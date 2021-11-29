describe('The Home Page successfully loads', () => {

  beforeEach(() => {
    cy.visit('/')
  });

  it('filters for loanid in property grid', () => {
    cy.get('.ag-icon-menu')
      .first()
      .click()

    cy.get('.ag-filter-filter').first()
      .type('1')

    cy.get('app-loans-grid').agGridColumnFilterTextMenu({
      searchCriteria:[{
        columnName: "Loan Amount",
        filterValue: 81297,
        operator:"Equals"
      },
      {
        columnName: "Intrest Rate",
        filterValue: "0.7051",
        operator:"Equals"
        }
      ],
      hasApplyButton: true
    })

    // cy.get('.ag-center-cols-container .ag-row')
    //   .find(`[col-id="Loanid"]`)
    //   .then(cells => {
    //     cells.each((_, cell) => {
    //       expect(cell).to.have.text(1);
    //     });
    //   })
  // });

  });

})

