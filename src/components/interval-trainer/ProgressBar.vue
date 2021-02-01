<template>
  <div class="header">
    <div class="progress-bar">
      <div class="bar-container">
        <div class="numerical-indicator">
          {{ getCurrentState().context.currentQuestionIndex }}/{{ getCurrentState().context.totalNumQuestions }}
        </div>
        <!-- <div class="fill" v-bind:style="{ width: (getCurrentState().context.currentQuestionIndex / getCurrentState().context.totalNumQuestions)*100 + '%' }"></div> -->
        <div class="fill" style="width: 50%"></div>
      </div>
    </div>
    <img v-on:click="send('CLICK', $event)" id="settings" src="@/assets/icons/cog-solid.svg" alt="Speaker icon here">
  </div>
</template>


<script>
import { getters, mutations, actions } from '@/store/store.js';

export default {
  name: "ProgressBar",
  computed: {
    getCurrentState() {
      return getters.state;
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

