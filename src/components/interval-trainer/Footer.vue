<template>
  <footer class="footer" v-bind:class="{ correct: isCorrect, incorrect: isIncorrect }">
    <div class="container">
      <img v-on:click="send('CLICK', $event)" id="settings" src="@/assets/icons/cog-solid.svg" alt="Speaker icon here">
      <router-link v-if="getCurrentState().matches('complete')" to="/" class="exit">
        <div class="btn-container" v-on:click.native="send('CLICK', $event)">
          <action-button/>
        </div>
      </router-link>
      <div v-else class="btn-container" v-on:click="send('CLICK', $event)">
        <action-button/>
      </div>
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

  #settings {
    width: 40px;
    height: 40px;
    cursor: pointer;
    transition: transform .8s ease-in-out;
    &:hover{
      transform: rotate(270deg);
    }
  }  
</style>