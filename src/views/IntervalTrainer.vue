<template>
  <div id="interval-trainer">
    <!-- <div>current state: {{ getCurrentState().value }}</div> -->
    <!-- <div>{{ getCurrentState().context }}</div> -->
    <settings-modal v-if="getCurrentState().matches('modal')"></settings-modal>
    <progress-bar></progress-bar>
    <div v-if="getCurrentState().matches('complete')" class='completion-screen'>
      <div class="dialog-box">
        <h1>You made it! 🎉🎉</h1>
        <p>Would you like to play again with the same questions?</p>
        <button class="btn btn-dialog" id="restart"
        v-on:click="send('CLICK', $event)">Yes, please!</button>
        <!-- <button class="btn">No, get me out of here!</button> -->
      </div>
    </div>
    <div v-else id='question-display'>
      <play-button v-on:click.native="play"/>
      <div>
        <h1 class="question">Please fill in the missing note</h1>
        <div class="music-render" id="boo"></div>
      </div>
    </div>
    
    <Footer></Footer>
  </div>
</template>

<script>
import ProgressBar from "@/components/interval-trainer/ProgressBar";
import PlayButton from "@/components/interval-trainer/PlayButton";
// import AnswerButton from "@/components/interval-trainer/AnswerButton";
import SettingsModal from "@/components/interval-trainer/SettingsModal";
import Footer from "@/components/interval-trainer/Footer";
import { getters, mutations } from '@/store/store.js';
import { player } from "@/plugins/magenta";

import Vex from 'vexflow';
const VF = Vex.Flow;

export default {
  components: { ProgressBar, PlayButton, SettingsModal, Footer },
  created() {
    getters.quizService.onTransition(state=> {
      this.setState(state);
      if(this.getCurrentState().matches('displayQuestion')) {
        this.play();
      }
    }).start();
  },
  computed: {
    getCurrentState() {
      return getters.state;
    }
  },
  data() {
    return {
      ctx: null
    }
  },
  mounted() {

    let renderer = new VF.Renderer(document.getElementById("boo"), VF.Renderer.Backends.SVG);
    renderer.resize(500, 250);

    this.ctx = renderer.getContext();

        // Create a stave at position 10, 40 of width 400 on the canvas.
    let stave = new VF.Stave(10, 40, 400);

    // Add a clef and time signature.
    stave.addClef("treble").addTimeSignature("4/4");

    // Connect it to the rendering context and draw!
    stave.setContext(this.ctx).draw();

  var notes = [
    // A quarter-note C.
    new VF.StaveNote({clef: "treble", keys: ["c/4"], duration: "q" }),

    // A quarter-note D.
    new VF.StaveNote({clef: "treble", keys: ["d/4"], duration: "q" }),

    // A quarter-note rest. Note that the key (b/4) specifies the vertical
    // position of the rest.
    new VF.StaveNote({clef: "treble", keys: ["b/4"], duration: "qr" }),

    // A C-Major chord.
    new VF.StaveNote({clef: "treble", keys: ["c/4", "e/4", "g/4"], duration: "q" })
  ];

  // Create a voice in 4/4 and add the notes from above
  var voice = new VF.Voice({num_beats: 4,  beat_value: 4});
  voice.addTickables(notes);

  // Format and justify the notes to 400 pixels.
  var formatter = new VF.Formatter().joinVoices([voice]).format([voice], 400);
  console.log(formatter); // a little hack to bypass eslint unused variable error
  // Render voice
  voice.draw(this.ctx, stave);
  },
  methods: {
    send(event, nativeEvent) {
      const eventObj = {
        type: event,
        selectedButton: nativeEvent
      }
      // console.log(nativeEvent.target.dataset.interval);
      getters.quizService.send(eventObj);
    },
    setState: mutations.setState,
    play() {
      var currentQuestion = this.getCurrentState().context.currentQuestion; // not a fan that the current question is pulled every time play button is hit
      if(player.isPlaying()) {
        player.stop();
      }
      player.start(currentQuestion);
    }
  }
}
</script>


<style lang="scss" scoped>
  #interval-trainer {
    padding-top: 40px;
    height: 56vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: visible;
  }

  #question-display {
    // margin-top: 240px; // probably need to write additional media queries
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 38px;
  }
</style>
