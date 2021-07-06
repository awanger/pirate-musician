<template>
<div>
  <input v-model="userInput" type="text">
  <span style="display:none;">{{ assignUserInput }}</span>
</div>
</template>


<script>
import { getters, mutations, actions } from '@/store/store.js';

export default {
  name: "CommandBox",
  computed: {
    assignUserInput() { // probably should make this a watch property
      this.getCurrentState().context.userInput = this.userInput; // set global userinput to the local userInput value
      // console.log(this.getCurrentState().context.userInput); // global user input variable
      // assign the global userInput variable to this one
      return this.userInput.split('').reverse().join('');
    },
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
  data() {
    return {
      userInput: ''
    }
  },
  mounted() {

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
  input {
    border: 3px solid #5E696D; // I wonder if there's a way to gain access to the variable
    border-radius: 3px;
    grid-column: 1/3;
    grid-row: 2/3;
    width: 80px;
    &:focus {
      outline: none !important;
      border: 3px solid #02BAF2;
      // box-shadow: 0 0 10px #02BAF2;
    }
  }
</style>