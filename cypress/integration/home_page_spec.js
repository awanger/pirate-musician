describe('Basic Test', () => {
  it('successfully loads', () => {
    cy.visit('/') // change URL to match your dev URL
    cy.get('#nav > a:nth-child(2)').click() // click link to interval trainer
    cy.get('#settings').should('be.visible')
    cy.get('.btn-play').should('be.visible')

  })

  it('checking an answer enables action button', ()=> {
    cy.get('.btn-action').should('be.disabled') // the check button should be disabled before selecting any answer
    cy.get('.btn-answer').eq(4).click()
    cy.get('.btn-answer').eq(4).should('have.class', 'selected')
    cy.get('.btn-action').should('not.be.disabled').click()
  })
})