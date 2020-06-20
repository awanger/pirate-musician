import { Machine, assign } from 'xstate';
import questions from '@/store/questions';

// conditional guards
// const isCorrect = ({ age }) => age >= 18;
// const isWrong = ({ age }) => age < 18;  
const quizCompleted = ({questionsRemaining}) => questionsRemaining === 0;
const fromActionButton = (_, event) => {
  return event.selectedButton.target.parentNode.className === 'btn btn-action';
}
  
// create Interval Trainer machine
const quizMachine = Machine({
  id: 'quiz',
  context: {
    currentQuestionIndex: 0,
    currentQuestion: null,
    selectedAnswer: null
  },
  initial: 'displayQuestion',
  states: {
    newQuestion: {
      entry: ['nextQuestion'],
      on: { '': [
            { target: 'complete', cond: quizCompleted},
            { target: 'displayQuestion' }
        ] }
    },
    displayQuestion: {
      entry: ['loadQuestion'],
      on: { CLICK: { target: 'checked', 
                     actions: assign({ selectedAnswer: (context, event) => context.selectedAnswer = event.selectedButton.target.dataset.interval }), // assign selectedAnswer to the interval name
            }
      }
    },
    checked: {
      on: {
        CLICK: [
          { target: 'evaluate', 
            cond: fromActionButton // if the click event is from the action button, then evaluate the answer
          }, 
          { target: 'checked',
            actions: assign({ selectedAnswer: (context, event) => context.selectedAnswer = event.selectedButton.target.dataset.interval })
          }

        ]
      }
    },
    evaluate: {
      on: {
        '': [
          { target: 'correct' },
          { target: 'wrong' }
        ]
      }
    },
    correct: {
      on: { CLICK: 'newQuestion' }
    },
    wrong: {
      on: { CLICK: 'displayQuestion' }
    },
    complete: {
      type: 'final'
    }
  }
},
{
  actions: {
    nextQuestion: assign( { currentQuestionIndex: context => context.currentQuestionIndex + 1 }),
    loadQuestion: assign({ currentQuestion: context => questions[context.currentQuestionIndex] }),
  }
});

export default quizMachine