<template>
  <button v-on:click="send('CLICK', $event)" class="btn btn-action" v-bind:disabled="getCurrentState().matches('displayQuestion')">
    <div v-if="getCurrentState().matches('checked') || getCurrentState().matches('displayQuestion') ">
      Check
    </div>
    <div v-if="getCurrentState().matches('correct')">
      Continue
    </div>
    <div v-if="getCurrentState().matches('wrong')">
      Try Again
    </div>
  </button>
</template>


<script>
import { getters, mutations, actions } from '@/store/store.js';

export default {
  name: "ActionButton",
  computed: {
    getCurrentState() {
      return getters.state;
    }
  },
  data() {
    return {
      // isDisabled: !this.getCurrentState().matches('checked')
    }
  },
  methods: {
    ...mutations,
    ...actions,
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
  
</style>