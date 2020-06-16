import { Machine, assign } from 'xstate';

// conditional guard
// const isCorrect = ({ age }) => age >= 18;
// const isWrong = ({ age }) => age < 18;  
const quizCompleted = ({questionsRemaining}) => questionsRemaining === 0;
const fromActionButton = (context, event) => {
  console.log(context)
  console.log(event.selectedButton.target.parentNode.className)
  return event.selectedButton.target.parentNode.className === 'btn btn-action';
}
  
// create Interval Trainer machine
const quizMachine = Machine({
  id: 'quiz',
  context: {
    currentQuestionIndex: 0,
    selectedAnswer: null,
    questions: [],
    count: 0
  },
  initial: 'loading',
  states: {
    loading: {
      on: { '': [
            { target: 'complete', cond: quizCompleted},
            { target: 'displayQuestion' }
        ] }
    },
    displayQuestion: {
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
      on: { CLICK: 'loading' }
    },
    wrong: {
      on: { CLICK: 'displayQuestion' }
    },
    complete: {
      type: 'final'
    }
  }
});

export default quizMachine