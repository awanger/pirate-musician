<template>
  <div class="music-render">
    <div id="boo"></div>
    <command-box v-on:keydown.native="parse()"></command-box>
  </div>
</template>


<script>
import { getters, mutations, actions } from '@/store/store.js';
import CommandBox from "@/components/interval-trainer/CommandBox";
import Vex from 'vexflow';
const VF = Vex.Flow;



export default {
  name: "ActionButton",
  components: { CommandBox },
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
      // userInput: ''
    }
  },
  mounted() {
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
    parse() {
      var input = this.getCurrentState().context.userInput;
      // console.log('current user input: ' + input);
      this.redraw();
      return input;
    },
    redraw() {
      let oldBoo = document.getElementById("boo");
      let newBoo = document.createElement("div");
      let musicRenderer = document.querySelector('.music-render');

      newBoo.id = "boo";
      oldBoo.remove();
      
      musicRenderer.prepend(newBoo);
      this.drawCanvas();
      console.log('redrew the canvas');
    },
    drawCanvas() {
      let renderer = new VF.Renderer(document.getElementById("boo"), VF.Renderer.Backends.SVG);
      let currentQuestion = this.getCurrentState().context.currentQuestion;
      let noteName = currentQuestion.notes[0].getNoteName();

      renderer.resize(625, 100);
      let context = renderer.getContext();

    // measure 1
      var staveMeasure1 = new VF.Stave(10, 0, 300);
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

    // measure 2 - juxtaposing second measure next to first measure
    var staveMeasure2 = new VF.Stave(
      staveMeasure1.width + staveMeasure1.x,
      0,
      275
    );
    staveMeasure2.setContext(context).draw();

    console.log('canvas drawn successfully');
    }
  }
}
</script>



<style lang="scss" scoped>
  .music-render {
    border: 1px solid black;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
  }

  #boo {
    grid-column: 1/2;
    grid-row: 1/2;
    border: 1px solid red;
  }
  
</style>