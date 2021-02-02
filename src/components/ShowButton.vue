<template>
    <button class="btn btn-show" v-on:click="send('CLICK', $event)" v-if="!getCurrentState().matches('showAnswer')">
        Show Answer
    </button>
    <button class="btn btn-show" v-on:click="send('CLICK', $event)" v-else>
        Hide Answer
    </button>
</template>


<script>
import { getters, mutations, actions } from '@/store/store.js';

export default {
  name: "ShowButton",
  computed: {
    getCurrentState() {
      return getters.state;
    },
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