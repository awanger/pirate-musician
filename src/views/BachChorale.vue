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
        <button class="btn btn-dialog">Yes, please!</button>
        <!-- <button class="btn">No, get me out of here!</button> -->
      </div>
    </div>
    <div v-else id='question-display'>
      <div class="question">We've given you some notes as hints. Please fill in the rest of the melody.</div>
      <img id="music-score" src="@/assets/scores/bach_chorale.png" alt="Musical score goes here">
      <play-button id="play-button" v-on:click.native="play"/>
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
    // height: 100vh;
    // display: flex;
    // flex-direction: column;
    // justify-content: space-between;
    overflow: visible;
  }

  #question-display {
    // margin-top: 240px; // probably need to write additional media queries
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: repeat(2, 1fr);

  }

  .question {
    grid-column: 1/11;
    grid-row: 1;
  }

  #music-score {
    max-width: 100%;
    grid-column: 1/10;
    grid-row: 2;
  }

  #play-button {
    grid-column: 10/11;
    grid-row: 2;
  }


  
</style>
