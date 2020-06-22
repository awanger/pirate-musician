<template>
  <button class="btn btn-action" v-bind:class="{ incorrect: isIncorrect }" v-bind:disabled="getCurrentState().matches('displayQuestion')">
    <div v-if="getCurrentState().matches('checked') || getCurrentState().matches('displayQuestion') ">
      Check
    </div>
    <div v-if="getCurrentState().matches('correct')">
      Continue
    </div>
    <div v-if="getCurrentState().matches('incorrect')">
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
    },
    isIncorrect() {
      return this.getCurrentState().matches('incorrect');
    }
  },
  data() {
    return {
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