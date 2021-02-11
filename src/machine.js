import { Machine, assign } from 'xstate';
import questions from '@/store/questions';


const quizMachine = Machine({
  id: 'quiz',
  context: {
    currentQuestionIndex: 0,
    totalNumQuestions: questions.length,
    currentQuestion: null,
  },
  initial: 'displayQuestion',
  states: {
    newQuestion: {
      on: { '': [
            { target: 'complete', cond: 'quizCompleted'},
            { target: 'displayQuestion' }
        ] }
    },
    displayQuestion: {
      entry: ['loadQuestion', 'resetSelectedAnswer'],
      on: { CLICK: [
              {
                target: 'showAnswer',
                cond: 'fromToggleButton'
              },
              {
                target: 'isPlaying',
                cond: 'fromPlayButton'
              }
            ]
      }
    },
    showAnswer: {
      // entry: ['loadQuestion', 'resetSelectedAnswer'],
      on: { CLICK: [
              {
                target: 'displayQuestion',
                cond: 'fromToggleButton'
              }
            ]
      }
    },
    isPlaying: {
      
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
    fromPlayButton: (_, event) => {
      console.log('from the play button');
      return event.selectedButton.target.id==='play-button';
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