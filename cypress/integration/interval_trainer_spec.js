
describe('Interval Trainer', () => {
  before(() => {
    // check if the import worked correctly
    cy.visit('/') // change URL to match your dev URL
  })

  it('interval trainer successfully loads', () => {
    cy.get('#nav > a:nth-child(2)').click() // click link to interval trainer
    // sound should play upon loading the page
    cy.get('#settings').should('be.visible')
    cy.get('.btn-play').should('be.visible')
  })

  it('clicking speaker button should play a sound', ()=> {
    cy.get('.btn-play').click().should('be.disabled')
  })

  it('checking an answer enables action button', ()=> {
    cy.get('.btn-action').should('be.disabled') // the check button should be disabled before selecting any answer
    cy.get('.btn-answer').eq(0).click({ force: true }).should('have.class', 'selected')
    cy.get('.btn-action').should('not.be.disabled')
  })

  it('getting correct answer should take you to the correct state', ()=> {
    var answerButtons = cy.get('.btn-answer')
    // answer buttons should be disabled so the user can't just click around like a madman
    // action button should say continue
    // footer should have the success class
    // footer should tell the user 'good job' in a patronizing manner
    // play button should not be disabled    
    
    
  })

  it('getting incorrect answer should take you to the incorrect state', ()=> {
    var answerButtons = cy.get('.btn-answer')
    // answer buttons should be disabled so the user can't just click around like a madman
    // action button should say continue
    // footer should have the success class
    // footer should have a reprimanding comment (jk but it should tell the user they wrong BRUH)
    // play button should not be disabled
    

  })



})