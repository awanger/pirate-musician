describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('/') // change URL to match your dev URL
    cy.get('#nav').find('a') // check if there's a link to the Interval trainer
  })
})