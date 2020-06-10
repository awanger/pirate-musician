<template>
  <div id="interval-trainer">
    <div>current state: {{ currentState.value }}</div>
    <div>{{ context }}</div>
    <div id='question-display'>
      <play-button />
      <div>
        <h1 class="question">What interval do you hear?</h1>
        <div class="multiple-choice-grid">
          <answer-button :intervalName=" 'Unison' " 
                         :intervalTrainerState="currentState" 
                         v-on:click.native="send('CLICK', $event)"></answer-button>
          <answer-button :intervalName=" 'm2' " 
                         :intervalTrainerState="currentState" 
                         v-on:click.native="send('CLICK', $event)"></answer-button>
          <answer-button :intervalName=" 'M2' " 
                         :intervalTrainerState="currentState" 
                         v-on:click.native="send('CLICK', $event)"></answer-button>
          <answer-button :intervalName=" 'm3' " 
                         :intervalTrainerState="currentState" 
                         v-on:click.native="send('CLICK', $event)"></answer-button>
          <answer-button :intervalName=" 'M3' " 
                         :intervalTrainerState="currentState" 
                         v-on:click.native="send('CLICK', $event)"></answer-button>
          <answer-button :intervalName=" 'P4' " 
                         :intervalTrainerState="currentState" 
                         v-on:click.native="send('CLICK', $event)"></answer-button>
          <answer-button :intervalName=" 'Tritone' " 
                         :intervalTrainerState="currentState" 
                         v-on:click.native="send('CLICK', $event)"></answer-button>
          <answer-button :intervalName=" 'P5' " 
                         :intervalTrainerState="currentState" 
                         v-on:click.native="send('CLICK', $event)"></answer-button>
          <answer-button :intervalName=" 'm6' " 
                         :intervalTrainerState="currentState" 
                         v-on:click.native="send('CLICK', $event)"></answer-button>
          <answer-button :intervalName=" 'M6' " 
                         :intervalTrainerState="currentState" 
                         v-on:click.native="send('CLICK', $event)"></answer-button>
          <answer-button :intervalName=" 'm7' " 
                         :intervalTrainerState="currentState" 
                         v-on:click.native="send('CLICK', $event)"></answer-button>
          <answer-button :intervalName=" 'M7' " 
                         :intervalTrainerState="currentState" 
                         v-on:click.native="send('CLICK', $event)"></answer-button>
          <answer-button :intervalName=" 'Octave' " 
                         :intervalTrainerState="currentState" 
                         v-on:click.native="send('CLICK', $event)"></answer-button>
        </div>
      </div>
    </div>
    <footer class="footer">
      <div class="container">
      <p>My gear icon goes here</p>
      <action-button v-on:click.native="send('CLICK', $event)" :intervalTrainerState="currentState"/>
      </div>
    </footer>
  </div>
</template>

<script>
import PlayButton from "@/components/interval-trainer/PlayButton";
import ActionButton from "@/components/interval-trainer/ActionButton";
import AnswerButton from "@/components/interval-trainer/AnswerButton";


import { interpret } from 'xstate';
import quizMachine from "@/machine";

export default {
  components: { PlayButton, ActionButton, AnswerButton },
  created() {
    this.quizService.onTransition(state=> {
      this.currentState = state;
      this.context = state.context;
    }).start();
  },
  data() {
    return {
      quizService: interpret(quizMachine),
      currentState: quizMachine.initialState,
      context: quizMachine.context,
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
