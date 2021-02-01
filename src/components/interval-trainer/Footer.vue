<template>
  <footer class="footer" v-bind:class="{ correct: isCorrect, incorrect: isIncorrect }">
    <div class="container">
      <router-link v-if="getCurrentState().matches('complete')"
                   to="/" class="exit">
        <action-button v-on:click.native="send('CLICK', $event)"/>
      </router-link>
      <action-button v-else v-on:click.native="send('CLICK', $event)"/>
    </div>
  </footer>
</template>



<script>
import ActionButton from "@/components/interval-trainer/ActionButton";
import { getters, mutations, actions } from '@/store/store.js';

export default {
  name: "Footer",
  components: {
    ActionButton
  },
  computed: {
    getCurrentState() {
      return getters.state;
    },
    isCorrect() {
      return this.getCurrentState().matches('correct');
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
    },
  }
}
</script>


<style lang="scss" scoped>


</style>