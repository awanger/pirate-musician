<template>
  <button class="btn btn-action disabled">
    <div v-if="intervalTrainerState.matches('checkAnswer')">
      checkMate man
    </div>
  </button>
</template>


<script>
import { Machine, interpret } from 'xstate';

// create Action Button machine
const actionBtnMachine = Machine({
  id: 'actionButton',
  context: {
    text: "",
    style: "",
  },
  initial: 'disabled',
  states: {
    disabled: {
      on: { CLICK: 'checked' }
    },
    checked: {
      on: { CLICK: 'checkAnswer' }
    },
    correct: {
      on: {}
    },
    wrong: {
      on: { CLICK: 'loading' }
    }
  }
});


export default {
  name: "ActionButton",
  created() {
    this.actionBtnService.start();
  },
  data() {
    return {
      actionBtnService: interpret(actionBtnMachine),
      currentState: actionBtnMachine.initialState
    }
  },
  methods: {
    send(event) {
      this.actionBtnService.send(event);
    }
  },
  props: {
    intervalTrainerState: Object // need to translate the information intervalTrainer is sending to something the ActionButton will understand
  }
}
</script>



<style lang="scss" scoped>
  
</style>