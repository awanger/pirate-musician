<template>
  <div class="music-render" id="boo"></div>
</template>


<script>
import { getters, mutations, actions } from '@/store/store.js';
import Vex from 'vexflow';
const VF = Vex.Flow;

export default {
  name: "ActionButton",
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
  mounted() {
    let renderer = new VF.Renderer(document.getElementById("boo"), VF.Renderer.Backends.SVG);
    let currentQuestion = this.getCurrentState().context.currentQuestion;
    let noteName = currentQuestion.notes[0].getNoteName();
    console.log(`The note name is ${noteName}`);
    renderer.resize(400, 225);

    let context = renderer.getContext();

      // Create a stave at position 10, 40 of width 400 on the canvas.
    let stave = new VF.Stave(0, 0, 380);

    // Add a clef
    stave.addClef("treble");

    // Connect it to the rendering context and draw!
    stave.setContext(context).draw();
    var notes = [];
    var referenceNote;

    // need to account for other accidentals as well
    if(noteName.search("#") != -1) {
      referenceNote = new VF.StaveNote({clef: "treble", keys: [`${noteName}/4`], duration: "q" }).addAccidental(0, new VF.Accidental("#"))
    } else {
      referenceNote =  new VF.StaveNote({clef: "treble", keys: [`${noteName}/4`], duration: "q" });
    }

    notes.push(referenceNote);

    // Create a voice in 4/4 and add the notes from above
    var voice = new VF.Voice({num_beats: 1,  beat_value: 4});
    voice.addTickables(notes);

    // Format and justify the notes to 400 pixels.
    var formatter = new VF.Formatter().joinVoices([voice]).format([voice], 400);
    console.log(formatter); // a little hack to bypass eslint unused variable error
    // Render voice
    voice.draw(context, stave);
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
      getters.quizService.send(eventObj);
    }
  }
}
</script>



<style lang="scss" scoped>
  
</style>