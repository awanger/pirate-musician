<template>
  <div id="interval-trainer">
    <div>{{ currentState.value }}</div>
    <div>{{ currentState.context }}</div>
    <div id='question-display'>
      <play-button />
      <div>
        <h1 class="question">What interval do you hear?</h1>
        <div class="multiple-choice-grid">
          <button data-interval="unison" class="btn btn-answer" v-on:click="send('CLICK', $event);">Unison</button>
          <button data-interval="m2" class="btn btn-answer" v-on:click="send('CLICK', $event);">m2</button>
          <button data-interval="M2" class="btn btn-answer" v-on:click="send('CLICK', $event);">M2</button>
          <button data-interval="m3" class="btn btn-answer" v-on:click="send('CLICK', $event);">m3</button>
          <button data-interval="M3" class="btn btn-answer" v-on:click="send('CLICK', $event);">M3</button>
          <button data-interval="P4" class="btn btn-answer" v-on:click="send('CLICK', $event);">P4</button>
          <button data-interval="Tritone" class="btn btn-answer" v-on:click="send('CLICK', $event);">Tritone</button>
          <button data-interval="P5" class="btn btn-answer" v-on:click="send('CLICK', $event);">P5</button>
          <button data-interval="m6" class="btn btn-answer" v-on:click="send('CLICK', $event);">m6</button>
          <button data-interval="M6" class="btn btn-answer" v-on:click="send('CLICK', $event);">M6</button>
          <button data-interval="m7" class="btn btn-answer" v-on:click="send('CLICK', $event);">m7</button>
          <button data-interval="M7" class="btn btn-answer" v-on:click="send('CLICK', $event);">M7</button>
          <button data-interval="Octave" class="btn btn-answer" v-on:click="send('CLICK', $event);">Octave</button>
        </div>
      </div>
    </div>
    <footer class="footer">
      <div class="container">
      <p>My gear icon goes here</p>
      <action-button v-on:click.native="send('CLICK', $event)" v-bind:intervalTrainerState="currentState"/>
      </div>
    </footer>
  </div>
</template>

<script>
import PlayButton from "@/components/interval-trainer/PlayButton";
import ActionButton from "@/components/interval-trainer/ActionButton";

import { interpret } from 'xstate';
import quizMachine from "@/machine";

export default {
  components: { PlayButton, ActionButton },
  created() {
    this.quizService.onTransition(state=> {
      this.currentState = state;
    }).start();
  },
  data() {
    return {
      // Interpret the machine and store in data
      quizService: interpret(quizMachine),
      currentState: quizMachine.initialState
    }
  },
  methods: {
    send(event, nativeEvent) {
      const eventObj = {
        type: event,
        selectedButton: nativeEvent
      }
      console.log(nativeEvent.target.dataset.interval);
      this.quizService.send(eventObj);
      // console.log('-------Event-----------')
      // console.log(event);
      // console.log('-------nativeEvent-----------')
      // console.log(nativeEvent);
    }
  }
}
</script>


<style lang="scss" scoped>
  #question-display {
    margin-top: 240px; // probably need to write additional media queries
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 38px;
  }

  .footer {
    border-top: 2px solid #D6E1E5;
    position: absolute;
    left: 0px;
    bottom: 0px;
    width: 100%;
    height: 20vh;

    .container {
      display: flex;
      align-items: center; // vertically center
      justify-content: space-between; // float the gear to the left and the action button to the right
      height: 100%;
    }
  }

  .multiple-choice-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 20px;
  }

</style>
