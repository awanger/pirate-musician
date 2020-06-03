import { Machine } from 'xstate';

// conditional guard
const isCorrect = ({ age }) => age >= 18;
const isWrong = ({ age }) => age < 18;  
const quizCompleted = ({questionsRemaining}) => questionsRemaining == 0;
  
// create Interval Trainer machine
const quizMachine = Machine({
  id: 'quiz',
  context: {
    currentQuestionIndex: 0,
    questions: []
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
      on: { CLICK: 'checkAnswer' }
    },
    checkAnswer: {
      on: {
        CLICK: [
          { target: 'correctAnswer', cond: isCorrect },
          { target: 'wrongAnswer', cond: isWrong }
        ]
      }
    },
    correctAnswer: {
      on: { CLICK: 'loading' }
    },
    wrongAnswer: {
      on: { CLICK: 'displayQuestion' }
    },
    complete: {
      type: 'final'
    }
  }
});

export default quizMachine