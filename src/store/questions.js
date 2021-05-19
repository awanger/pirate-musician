

class Note {
  constructor(pitch, startStep, endStep) {
    this.pitch = pitch;
    this.quantizedStartStep = startStep;
    this.quantizedEndStep = endStep;
    this.velocity = 115;
  }
  getPitch() {
    return this.pitch;
  }
}

class Interval {
  constructor(firstNote, secondNote) {
    this.firstNote = firstNote;
    this.secondNote = secondNote;
  }

  getFirstNote() {
    return this.firstNote;
  }

  getSecondNote() {
    return this.secondNote;
  }
}

class Question {
  constructor(notes, correctAnswer, tempo=60) {
    this.notes = notes;
    this.correctAnswer = correctAnswer;
    this.quantizationInfo = {stepsPerQuarter: 1};
    this.tempos = [{time:0, qpm: tempo}];
  }

  // helper function
  static getRandomInteger(_min, _max) {
    var min = Math.floor(_min);
    var max = Math.floor(_max);
    return Math.floor(Math.random()*(max - min) + min)
  }

  static intervalToPitch(intervalName) {
    var intervalDict = {
      "Unison":0,
      "m2":1,
      "M2":2,
      "m3":3,
      "M3":4,
      "P4":5,
      "Tritone":6,
      "P5":7,
      "m6":8,
      "M6":9,
      "m7":10,
      "M7":11,
      "Octave":12 
    }
    return intervalDict[intervalName];
  }

  static pitchNumberToInterval(pitchNumber) {
    var pitchDict = {
      0:"Unison",
      1:"m2",
      2:"M2",
      3:"m3",
      4:"M3",
      5:"P4",
      6:"Tritone",
      7:"P5",
      8:"m6",
      9:"M6",
      10:"m7",
      11:"M7",
      12:"Octave" 
    }
    return pitchDict[pitchNumber];
  }


  static generateRandomInterval(isAscending=true) {

    const LOWEST_PITCH = 48;
    const HIGHEST_PITCH = 76;

    var referencePitch = this.getRandomInteger(LOWEST_PITCH, HIGHEST_PITCH); // pitch number I think?
    var secondPitch = referencePitch; // why are these the same?

    var randomPitch = this.getRandomInteger(0, 12); // pitch range
    var randomIntervalName = this.pitchNumberToInterval(randomPitch);
    // console.log(randomIntervalName);

    if(isAscending) {
      secondPitch += this.intervalToPitch(randomIntervalName);
    } else {
      secondPitch -= this.intervalToPitch(randomIntervalName);
    }

    var firstNote = new Note(referencePitch, 0, 1);
    var secondNote = new Note(secondPitch,1,2);

    var interval = new Interval(firstNote, secondNote);
    return interval
  }

  static pitchToIntervalName(interval) {
    var firstPitch = interval.getFirstNote().getPitch();
    var secondPitch = interval.getSecondNote().getPitch();
    var difference = Math.abs(firstPitch-secondPitch);
    return this.pitchNumberToInterval(difference);
  } 
}

/*

function generateQuestions(str[] intervalsSelected, int playbackTempo, int numOfQuestions, str intervalDirection, str playbackStyle) {

}

*/

let questions = []
let NUM_OF_QUESTIONS = 4;

for(var i=0; i<NUM_OF_QUESTIONS; i++) {
  let randomInterval = Question.generateRandomInterval(false);
  // console.log(randomInterval);

  let correctAnswer = Question.pitchToIntervalName(randomInterval);
  // console.log(randomInterval)
  let question = new Question([randomInterval.getFirstNote(), randomInterval.getSecondNote()], correctAnswer, 60); // keep it like this for now
  questions.push(question);
}

// console.log(questions);
export default questions;