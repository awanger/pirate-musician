<template>
  <button class="btn btn-play" v-bind:class="{ 'btn-stop': getCurrentState().matches('isPlaying') }" id="play-button" v-on:click="send('CLICK', $event)">


    <img v-if="getCurrentState().matches('isPlaying')" src="@/assets/icons/stop-solid.svg" alt="stop icon here">
    <img v-else src="@/assets/icons/play-solid.svg" alt="play icon here">
  </button>
</template>

<script>
import { getters, mutations, actions } from '@/store/store.js';

export default {
  name: "PlayButton",
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

  // #play-button {
  //   max-width: 10%;
  // }
</style>