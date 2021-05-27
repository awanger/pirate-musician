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
    <div v-else id='question-display' >
      <play-button v-on:click.native="play"/>
      <div>
        <h1 class="question">What interval do you hear, padawan?</h1>
        <div class="multiple-choice-grid">
          <answer-button :intervalName=" 'Unison' "  
                         v-on:click.native="send('CLICK', $event)"></answer-button>
          <answer-button :intervalName=" 'M2' "
                         v-on:click.native="send('CLICK', $event)"></answer-button>
          <answer-button :intervalName=" 'M3' "
                         v-on:click.native="send('CLICK', $event)"></answer-button>
          <answer-button :intervalName=" 'P5' "  
                         v-on:click.native="send('CLICK', $event)"></answer-button>
          <answer-button :intervalName=" 'Octave' "
                         v-on:click.native="send('CLICK', $event)"></answer-button>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import ProgressBar from "@/components/interval-trainer/ProgressBar";
import PlayButton from "@/components/interval-trainer/PlayButton";
import AnswerButton from "@/components/interval-trainer/AnswerButton";
import SettingsModal from "@/components/interval-trainer/SettingsModal";
import Footer from "@/components/interval-trainer/Footer";

import { getters, mutations } from '@/store/store.js';
import { player } from "@/plugins/magenta";

export default {
  components: { ProgressBar, PlayButton, AnswerButton, SettingsModal, Footer },
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
    }
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
