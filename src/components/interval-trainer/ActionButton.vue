<template>
  <button class="btn btn-action" disabled>
    <div v-if="intervalTrainerState.matches('checked')">
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
    text: "Check",
    style: "",
  },
  initial: 'disabled',
  states: {
    disabled: {
      on: { CLICK: 'checked' }
    },
    checked: {
      on: {}
    },
    correct: {
      on: {}
    },
    wrong: {
      on: {}
    }
  }
});


export default {
  name: "ActionButton",
  created() {
    this.actionBtnService.onTransition( state => {
      this.currentState = state;
      this.context = state.context;
    })
    .start();
  },
  data() {
    return {
      actionBtnService: interpret(actionBtnMachine),
      currentState: actionBtnMachine.initialState,
      context: actionBtnMachine.context
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