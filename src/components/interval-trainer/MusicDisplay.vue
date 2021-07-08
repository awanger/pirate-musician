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
    var array1 = ['E'];
    var array2 = ['B']
    this.drawCanvas(array1, array2);
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
    redraw() {
      let oldBoo = document.getElementById("boo");
      let newBoo = document.createElement("div");
      let musicRenderer = document.querySelector('.music-render');

      newBoo.id = "boo";
      oldBoo.remove();
      
      musicRenderer.prepend(newBoo);
      // this.drawCanvas(secondNote);
      // console.log("the extracted note is: " + secondNote);
    },
    drawMeasure(context, noteArray, x, y, width) {
      var staveMeasure = new VF.Stave(x, y, width);
      var notesMeasure = [];
      // staveMeasure.addClef("treble").addTimeSignature("4/4").setContext(context).draw();
      staveMeasure.setContext(context).draw();
      for(var i=0; i < noteArray.length; i++) {
        var noteName = noteArray[i];
        var note = new VF.StaveNote({clef: "treble", keys: [`${noteName}/4`], duration: "w" });
        notesMeasure.push(note);
      }
      VF.Formatter.FormatAndDraw(context, staveMeasure, notesMeasure);
    },
    // function drawCanvas(noteArray1, noteArray2)
    drawCanvas(noteArray1, noteArray2) {
      var renderer = new VF.Renderer(document.getElementById("boo"), VF.Renderer.Backends.SVG);
      // var currentQuestion = this.getCurrentState().context.currentQuestion;
      // var noteName = currentQuestion.notes[0].getNoteName();
      var noteArrays = [noteArray1, noteArray2];

      renderer.resize(500, 100);
      let context = renderer.getContext();
      var width = 220;

      for(var i=0; i < noteArrays.length; i++) {
        var x = width*i;
        var y = 0;
        this.drawMeasure(context, noteArrays[i], x, y, width);
      }
      // var staveMeasure1 = new VF.Stave(10, 0, 240);
      // var notesMeasure1 = [];
      // var referenceNote;
      // staveMeasure1.addClef("treble").addTimeSignature("4/4").setContext(context).draw(); // if first iteration
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