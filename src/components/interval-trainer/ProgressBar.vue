<template>
  <div class="bar">
    <span id="fill"></span>
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



<style lang="scss" scoped>
  
</style>