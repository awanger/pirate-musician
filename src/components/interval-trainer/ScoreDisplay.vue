<template>
  <div class="modal" v-bind:class="{ open: isOpen }" >
    <div class="modal-box">
      <img v-on:click="send('CLICK', $event)" id="close" src="@/assets/icons/times-solid.svg" alt="&times">
      <div class="modal-container">
        <div class="modal-header">
          <h1>Settings</h1>
        </div>
        <ul class="tabs">
          <li>Current Settings</li>
          <li>Your Saved Settings</li>
          <li>About</li>
        </ul>
        <div class="section">
          <div class="section-title">Difficulty Level</div>
          <div class="setting-label">Current Level: Ling Ling </div>
          <div class="slider">
            <div class="fill"></div>
          </div>
        </div>
        <div class="section">
          <div class="section-title">Custom Settings</div>
          <div class="setting-label">Intervals Tested</div>
          <div class="multiple-choice-grid">
            <button>Hi</button>
            <button>Hi</button>
            <button>Hi</button>
            <button>Hi</button>
            <button>Hi</button>
            <button>Hi</button>
          </div>
          <div class="setting-label">Playback Tempo</div>
          <div class="setting-label">Num of questions per session</div>
          <div class="setting-label">Interval Direction</div>
          <div class="setting-label">Playback Style</div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { getters, mutations, actions } from '@/store/store.js';

export default {
  data() {
    return {
      isOpen: false
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
  #close {
    cursor: pointer;
  }

</style>