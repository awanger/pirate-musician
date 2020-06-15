import { getters } from '../../src/store/store.js'

describe('Basic Test', () => {
  const quizContext = getters.quizService.machine.context
  function getRandomInteger(min=0, max) {
    return Math.random() * (max - min) + min;
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

  it('checking an answer enables action button', ()=> {
    cy.get('.btn-action').should('be.disabled') // the check button should be disabled before selecting any answer
    cy.get('.btn-answer').eq(0).click().should('have.class', 'selected')
    cy.get('.btn-action').should('not.be.disabled')
  })

  it('checking another answer should remain in checked state', ()=> {
    var answerButtons = cy.get('.btn-answer')
    answerButtons.eq(5).click().should('have.class','selected')

  })

  it('getting correct answer should take you to correct state', ()=> {
    var answerButtons = cy.get('.btn-answer')
    
  })

  it('getting incorrect answer should take you to correct state', ()=> {
    var answerButtons = cy.get('.btn-answer')
    
  })

})