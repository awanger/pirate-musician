<template>
  <button class="btn btn-action" v-bind:disabled="intervalTrainerState.matches('displayQuestion')">
    <div v-if="getCurrentState.matches('checked') || intervalTrainerState.matches('displayQuestion') ">
      Check
      {{ getCurrentState() }}
    </div>
    <div v-if="intervalTrainerState.matches('correct')">
      Continue
    </div>
    <div v-if="intervalTrainerState.matches('wrong')">
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
    }
  },
  data() {
    return {
      // isDisabled: !this.intervalTrainerState.matches('checked')
    }
  },
  methods: {
    ...mutations,
    ...actions
  },
  props: {
    intervalTrainerState: Object
  },
  watch: {
    intervalTrainerState: (state)=> {
      console.log('current intervaltrainerstate:', state);
      // console.log(this.intervalTrainerState);
    }
  },

}
</script>



<style lang="scss" scoped>
  
</style>