<template>
  <div class="music-render">
    <div id="boo"></div>
    <!-- <command-box v-model="userInput"></command-box> -->
    <input v-on:keyup="parse()" 
           v-model="userInput" 
           type="text"
           placeholder="Type in a note name">
  </div>
</template>


<script>
import { getters, mutations, actions } from '@/store/store.js';
import Vex from 'vexflow';
const VF = Vex.Flow;



export default {
  name: "ActionButton",
  components: {},
  computed: {
    getCurrentState() {
      return getters.state;
    },
    isIncorrectOrCompleted() {
      return this.getCurrentState().matches('incorrect') || this.getCurrentState().matches('complete');
    },
    isEnabled() {
      return this.answerIsSelected() || this.getCurrentState().matches('complete');
    }
  },
  data() {
    return {
      userInput: ''
    }
  },
  mounted() {
    // var randomNote = new VF.StaveNote({clef: "treble", keys: ['A/5'], duration: "w" });
    this.drawCanvas();
  },
  methods: {
    ...mutations,
    ...actions,
    answerIsSelected() {
      return this.getCurrentState().context.selectedAnswer !== null;
    },
    send(event, nativeEvent) {
      const eventObj = {
        type: event,
        selectedButton: nativeEvent
      }
      // console.log(eventObj);
      getters.quizService.send(eventObj);
    },
    parseAndRedraw() {
      // pass the output of parse() to redraw()
    },
    parse() { // extract the note
      console.log("the input I will parse is: " + this.userInput);

      // parse the shit here and return a VexFlow note object
      var note = new VF.StaveNote({clef: "treble", keys: [`${this.userInput}/4`], duration: "w" });
      
      this.redraw(note);
    },
    redraw(secondNote) {
      let oldBoo = document.getElementById("boo");
      let newBoo = document.createElement("div");
      let musicRenderer = document.querySelector('.music-render');

      newBoo.id = "boo";
      oldBoo.remove();
      
      musicRenderer.prepend(newBoo);
      this.drawCanvas(secondNote);
      // console.log("the extracted note is: " + secondNote);
    },
    drawCanvas(secondNote) {
      let renderer = new VF.Renderer(document.getElementById("boo"), VF.Renderer.Backends.SVG);
      let currentQuestion = this.getCurrentState().context.currentQuestion;
      let noteName = currentQuestion.notes[0].getNoteName();

      renderer.resize(500, 100);
      let context = renderer.getContext();

    // measure 1
      var staveMeasure1 = new VF.Stave(10, 0, 240);
      var notesMeasure1 = [];
      var referenceNote;
      staveMeasure1.addClef("treble").addTimeSignature("4/4").setContext(context).draw();

      // need to account for other accidentals as well
      if(noteName.search("#") != -1) {
        referenceNote = new VF.StaveNote({clef: "treble", keys: [`${noteName}/4`], duration: "w" }).addAccidental(0, new VF.Accidental("#"))
      } else {
        referenceNote =  new VF.StaveNote({clef: "treble", keys: [`${noteName}/4`], duration: "w" });
      }
    notesMeasure1.push(referenceNote);

    // Helper function to justify and draw a 4/4 voice
    VF.Formatter.FormatAndDraw(context, staveMeasure1, notesMeasure1);

    
    var notesMeasure2 = [];
    // measure 2 - juxtaposing second measure next to first measure
    var staveMeasure2 = new VF.Stave(
      staveMeasure1.width + staveMeasure1.x,
      0,
      200
    );
    staveMeasure2.setContext(context).draw();

    notesMeasure2.push(secondNote);

    VF.Formatter.FormatAndDraw(context, staveMeasure2, notesMeasure2);


    console.log('canvas drawn successfully');
    }
  }
}
</script>



<style lang="scss" scoped>
  .music-render {
    display: grid;
    grid-template-columns: 250px 200px 200px; // 250px 
    grid-template-rows: repeat(2, 1fr);
  }

  #boo {
    grid-column: 1/3;
    grid-row: 1/2;
  }

  input {
    border: 3px solid #5E696D; // I wonder if there's a way to gain access to the variable
    border-radius: 3px;
    grid-column: 2/3;
    grid-row: 2/3;
    width: 200px;
    &:focus {
      outline: none !important;
      border: 3px solid #02BAF2;
      // box-shadow: 0 0 10px #02BAF2;
    }
  }
  
</style>