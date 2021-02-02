import { Machine, assign } from 'xstate';
import questions from '@/store/questions';


const quizMachine = Machine({
  id: 'quiz',
  context: {
    currentQuestionIndex: 0,
    totalNumQuestions: questions.length,
    currentQuestion: null,
    selectedAnswer: null
  },
  initial: 'displayQuestion',
  states: {
    newQuestion: {
      entry: ['resetSelectedAnswer'],
      on: { '': [
            { target: 'complete', cond: 'quizCompleted'},
            { target: 'displayQuestion' }
        ] }
    },
    displayQuestion: {
      entry: ['loadQuestion', 'resetSelectedAnswer'],
      on: { CLICK: [
              {
                target: 'modal',
                cond: 'fromSettingsButton'
              },
              {
                target: 'showAnswer',
                cond: 'fromToggleButton'
              }
            ]
      }
    },
    showAnswer: {
      // entry: ['loadQuestion', 'resetSelectedAnswer'],
      on: { CLICK: [
              {
                target: 'modal',
                cond: 'fromSettingsButton'
              },
              {
                target: 'displayQuestion',
                cond: 'fromToggleButton'
              }
            ]
      }
    },
    checked: {
      on: {
        CLICK: [
          { 
            target: 'evaluate', 
            cond: 'fromActionButton' // if the click event is from the action button, then evaluate the answer
          },
          {
            target: 'modal',
            cond: 'fromSettingsButton'
          },
          { 
            target: 'checked',
            actions: assign({ selectedAnswer: (context, event) => context.selectedAnswer = event.selectedButton.target.dataset.interval })
          }
        ]
      }
    },
    modal: {
      on: {
        CLICK: [
          {
            target: 'checked',
            cond: 'fromCloseButton'
          },
          {
            target: 'displayQuestion',
            cond: 'fromCloseButton'
          }
        ]
      }
    },
    evaluate: {
      on: {
        '': [
          { target: 'correct', cond: 'isCorrect' },
          { target: 'incorrect' }
        ]
      }
    },
    correct: {
      entry: ['incrementQuestionIndex'],
      on: { CLICK: { target:'newQuestion', cond: 'fromActionButton' } }
    },
    incorrect: {
      on: { CLICK: { target:'displayQuestion', cond: 'fromActionButton' } }
    },
    complete: {
      entry: ['resetSelectedAnswer'],
      type: 'final'
    }
  }
},
{
  actions: {
    loadQuestion: assign({ currentQuestion: context => questions[context.currentQuestionIndex] }),
    incrementQuestionIndex: assign( { currentQuestionIndex: context => context.currentQuestionIndex + 1 }),
    resetSelectedAnswer: assign( { selectedAnswer: context => context.selectedAnswer = null })
  },
  guards: {
    isCorrect: (context) => {
      return context.selectedAnswer === context.currentQuestion.correctAnswer;
    },
    fromActionButton: (_, event) => {
      console.log('from the action button');
      // console.log(event.selectedButton.target.classList);
      return event.selectedButton.target.classList.contains('btn-action');
    },
    fromSettingsButton: (_, event) => {
      console.log('from the settings button');
      // console.log(event.selectedButton.target.id);
      return event.selectedButton.target.id==='settings';
    },
    fromToggleButton: (_, event) => {
      console.log('from the toggle button');
      return event.selectedButton.target.classList.contains('btn-show');
    },
    fromCloseButton: (_, event) => {
      console.log(event.selectedButton.target.id);
      return event.selectedButton.target.id==='close';
    },
    quizCompleted: (context) => { return context.currentQuestionIndex === context.totalNumQuestions; },
    previousStateIsDisplayQuestion: (ctx, e, { state }) =>  { 
      return state.history.matches('displayQuestion');
    },
    previousStateIsChecked: (ctx, e, { state }) =>  { 
      return state.history.matches('checked');
    }
  }
});

export default quizMachine