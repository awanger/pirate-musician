describe('Interval Trainer Tests', () => {
  before(() => {
    // check if the import worked correctly
    cy.visit('/') // change URL to match your dev URL
    cy.title().should('contain', 'Pirate Musician')
  })

  it('interval trainer successfully loads', () => {
    cy.get('#nav > a:nth-child(2)').click() // click link to interval trainer
    cy.title().should('contain', 'Interval Trainer')
    cy.get('#settings').should('be.visible')
  })

  it('clicking speaker button should play a sound', ()=> {
    cy.get('.btn-play').click()
  })

  it('spamming the play button', ()=> {
    const NUM_CLICKS = 50;
    // const playBtn = cy.get('.btn-play')
    for(var i = 0; i < NUM_CLICKS; i++) {
      cy.get('.btn-play').click()
    }
  })

  it('checking an answer enables action button', ()=> {
    cy.get('.btn-action').should('be.disabled') // the check button should be disabled before selecting any answer
    cy.get('.btn-answer').eq(0).click().should('have.class', 'selected')
    cy.get('.btn-action').should('not.be.disabled')
  })

  // it('getting correct answer should take you to the correct state', ()=> {
  //   var answerButtons = cy.get('.btn-answer')
  //   // answer buttons should be disabled so the user can't just click around like a madman
  //   // cy.get('.btn-action').should('not.be.disabled')
  //   // cy.get('.footer').should('have.class', 'correct')

  //   // footer should tell the user 'good job' in a patronizing manner
    
    
  // })

  // it('getting incorrect answer should take you to the incorrect state', ()=> {
  //   var answerButtons = cy.get('.btn-answer')
  //   // answer buttons should be disabled so the user can't just click around like a madman
  //   // cy.get('.btn-action').should('not.be.disabled')
  //   // cy.get('.btn-action').should('have.class', 'incorrect')
  //   // cy.get('.footer').should('have.class', 'incorrect')
  //   // footer should have a reprimanding comment (jk but it should tell the user they wrong)
  //   // play button should not be disabled
  
  // })



})