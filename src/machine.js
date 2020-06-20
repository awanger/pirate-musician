import { Machine, assign } from 'xstate';
import questions from '@/store/questions';

// conditional guards
// const isCorrect = ({ age }) => age >= 18;
// const isWrong = ({ age }) => age < 18;  
const quizCompleted = ({questionsRemaining}) => questionsRemaining === 0;
const fromActionButton = (_, event) => {
  return event.selectedButton.target.parentNode.className === 'btn btn-action';
}
const isCorrect = (context) => {
  return context.selectedAnswer === context.currentQuestion.correctAnswer;
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
      entry: ['nextQuestion', 'resetSelectedAnswer'],
      on: { '': [
            { target: 'complete', cond: quizCompleted},
            { target: 'displayQuestion' }
        ] }
    },
    displayQuestion: {
      entry: ['loadQuestion', 'resetSelectedAnswer'],
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
          { target: 'correct', cond: isCorrect },
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
    loadQuestion: assign({ currentQuestion: context => questions[context.currentQuestionIndex] }),
    nextQuestion: assign( { currentQuestionIndex: context => context.currentQuestionIndex + 1 }),
    resetSelectedAnswer: assign( { selectedAnswer: context => context.selectedAnswer = null })
  }
});

export default quizMachine