import { getters } from '../../src/store/store.js'


describe('Basic Test', () => {
  let quizContext = getters.quizService.machine.context

  // console.log(getters.quizService)
  function getRandomInteger(max) {
    max = Math.floor(max);
    return Math.floor(Math.random() * max);
  }

  before(() => {
    // check if the import worked correctly
    expect(quizContext).to.be.a('object')
    cy.visit('/') // change URL to match your dev URL
  })

  it('successfully loads', () => {
    cy.get('#nav > a:nth-child(2)').click() // click link to interval trainer
    cy.get('#settings').should('be.visible')
    cy.get('.btn-play').should('be.visible')
    expect(quizContext.selectedAnswer).to.be.null
  })

  it('clicking speaker button should play a sound', ()=> {
    cy.get('.btn-play').click()
  })

  it('checking an answer enables action button', ()=> {
    cy.get('.btn-action').should('be.disabled') // the check button should be disabled before selecting any answer
    cy.get('.btn-answer').eq(0).click({ force: true }).should('have.class', 'selected')
    console.log(getters.state)
    // expect(getters.quizService.machine.context.selectedAnswer).to.be.eq('something')
    cy.get('.btn-action').should('not.be.disabled')
  })

  it('checking another answer should remain in checked state', ()=> {
    var answerButtons = cy.get('.btn-answer')
    // write a for loop that goes clicks through each answer button available.
    // expect(quizContext.currentState)
    // answerButtons.eq(5).click().should('have.class','selected')


  })

  it('getting correct answer should take you to the correct state', ()=> {
    var answerButtons = cy.get('.btn-answer')
    
  })

  it('getting incorrect answer should take you to the incorrect state', ()=> {
    var answerButtons = cy.get('.btn-answer')
    
  })



})