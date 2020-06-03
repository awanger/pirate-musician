<template>
  <div id='interval-trainer'>
    <play-button v-on:click.native="send('CLICK');" />
    <action-button/>
    <div v-if="currentState.matches('displayQuestion')">
      hi freak bitches
    </div>
    <div>
      <h1 class="question">What interval do you hear?</h1>
      <div class="multiple-choice-grid">
        <button class="btn btn-answer">Unison</button>
        <button class="btn btn-answer">m2</button>
        <button class="btn btn-answer">M2</button>
        <button class="btn btn-answer">m3</button>
        <button class="btn btn-answer">M3</button>
        <button class="btn btn-answer">P4</button>
        <button class="btn btn-answer">Tritone</button>
        <button class="btn btn-answer">P5</button>
        <button class="btn btn-answer">m6</button>
        <button class="btn btn-answer">M6</button>
        <button class="btn btn-answer">m7</button>
        <button class="btn btn-answer">M7</button>
        <button class="btn btn-answer">P8</button>
      </div>
    </div>
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
      console.log(state.value);
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
    send(event) {
      this.quizService.send(event);
    }
  }

}
</script>


<style lang="scss" scoped>
  #interval-trainer {
    padding-top: 100px;
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
