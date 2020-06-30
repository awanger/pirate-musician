<template>
  <footer class="footer" v-bind:class="{ correct: isCorrect, incorrect: isIncorrect }">
    <div class="container">
      <img id="settings" src="@/assets/icons/cog-solid.svg" alt="Speaker icon here">
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

  #settings {
    width: 40px;
    height: 40px;
    cursor: pointer;
    transition: transform .8s ease-in-out;
    &:hover{
      transform: rotate(270deg);
    }
  }

  // .footer {
  //   border-top: 2px solid #D6E1E5;
  //   position: absolute;
  //   left: 0px;
  //   bottom: 0px;
  //   width: 100%;
  //   height: 20vh;
  //   &.correct {
  //     background-color: $edward-teach;
  //   }

  //   .container {
  //     display: flex;
  //     align-items: center; // vertically center
  //     justify-content: space-between; // float the gear to the left and the action button to the right
  //     height: 100%;
  //   }
  // }
  
</style>