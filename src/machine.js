import { Machine, assign } from 'xstate';
import questions from '@/store/questions';


const quizMachine = Machine({
  id: 'quiz',
  context: {
    currentQuestionIndex: 0,
    totalNumQuestions: questions.length,
    currentQuestion: null,
  },
  initial: 'display',
  states: {
    newQuestion: {
      on: { '': [
            { target: 'complete', cond: 'quizCompleted'},
            { target: 'display' }
        ] }
    },
    display: {
      entry: ['loadQuestion', 'resetSelectedAnswer'],
      initial: 'displayQuestion',
      states: {
        displayQuestion: {
          on: { CLICK: [{ target: 'displayAnswer', cond: 'fromToggleButton'}, 
                        { target: 'isPlayingQuestion', cond: 'fromPlayButton'}]
          },
        },
        isPlayingQuestion: {
          on: { CLICK: [{ target: 'displayAnswer', cond: 'fromToggleButton' }, 
                        { target: 'displayQuestion', cond: 'fromPlayButton' }] }
        },
        displayAnswer: {
          on: { CLICK: [{ target: 'displayQuestion', cond: 'fromToggleButton'}, 
                        { target: 'isPlayingAnswer', cond: 'fromPlayButton'}]
          }
        },
        isPlayingAnswer: {
          on: { CLICK: [{ target: 'displayQuestion', cond: 'fromToggleButton' }, 
                        { target: 'displayAnswer', cond: 'fromPlayButton' }] }
        }
      },
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
      console.log(event.selectedButton);
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
    previousStateIsdisplay: (ctx, e, { state }) =>  { 
      return state.history.matches('display');
    },
    previousStateIsChecked: (ctx, e, { state }) =>  { 
      return state.history.matches('checked');
    }
  }
});

export default quizMachine