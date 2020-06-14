<template>
  <button v-bind:data-interval="intervalName" class="btn btn-answer" v-bind:class="{ selected: isSelected }">{{ intervalName }}</button>
</template>



<script>
import { getters } from '@/store/store.js';


export default {
  name: "AnswerButton",
  data() {
    return {
    }
  },
  props: {
    intervalName: String
  },
  computed: {
    getCurrentState() {
      return getters.state;
    },
    isSelected() {
      return this.intervalName === this.getCurrentState().context.selectedAnswer;
    }
  }

}
</script>



<style lang="scss" scoped>
  
</style>