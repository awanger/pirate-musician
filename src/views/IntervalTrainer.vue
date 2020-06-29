<template>
  <div id="interval-trainer">
    <!-- <div>current state: {{ getCurrentState().value }}</div>
    <div>{{ getCurrentState().context }}</div> -->
    <progress-bar></progress-bar>
    <div id='question-display'>
      <play-button v-on:click.native="play"/>
      <div>
        <h1 class="question">What interval do you hear?</h1>
        <div class="multiple-choice-grid">
          <answer-button :intervalName=" 'Unison' "  
                         v-on:click.native="send('CLICK', $event)"></answer-button>
          <answer-button :intervalName=" 'm2' "
                         v-on:click.native="send('CLICK', $event)"></answer-button>
          <answer-button :intervalName=" 'M2' "
                         v-on:click.native="send('CLICK', $event)"></answer-button>
          <answer-button :intervalName=" 'm3' "
                         v-on:click.native="send('CLICK', $event)"></answer-button>
          <answer-button :intervalName=" 'M3' "
                         v-on:click.native="send('CLICK', $event)"></answer-button>
          <answer-button :intervalName=" 'P4' "
                         v-on:click.native="send('CLICK', $event)"></answer-button>
          <answer-button :intervalName=" 'Tritone' "
                         v-on:click.native="send('CLICK', $event)"></answer-button>
          <answer-button :intervalName=" 'P5' "  
                         v-on:click.native="send('CLICK', $event)"></answer-button>
          <answer-button :intervalName=" 'm6' "  
                         v-on:click.native="send('CLICK', $event)"></answer-button>
          <answer-button :intervalName=" 'M6' "  
                         v-on:click.native="send('CLICK', $event)"></answer-button>
          <answer-button :intervalName=" 'm7' "  
                         v-on:click.native="send('CLICK', $event)"></answer-button>
          <answer-button :intervalName=" 'M7' "
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
import Footer from "@/components/interval-trainer/Footer";

import { getters, mutations } from '@/store/store.js';
import { player } from "@/plugins/magenta";

export default {
  components: { ProgressBar, PlayButton, AnswerButton, Footer },
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
    margin-top: 40px;
  }

  #question-display {
    margin-top: 240px; // probably need to write additional media queries
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 38px;
  }

  .multiple-choice-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 20px;
  }

</style>
