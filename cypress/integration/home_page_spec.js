describe('Basic Test', () => {
  it('successfully loads', () => {
    cy.visit('/') // change URL to match your dev URL
    cy.get('#nav > a:nth-child(2)').click() // click link to interval trainer
    cy.get('.btn-action').should('be.disabled') // the check button should be disabled before selecting any answer
    cy.get('.btn-answer').eq(4).click()
    cy.get('.btn-action').should('not.be.disabled') // the check button should be disabled before selecting any answer
  })
})