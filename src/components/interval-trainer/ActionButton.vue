<template>
  <button class="btn btn-action" v-bind:disabled="intervalTrainerState.matches('displayQuestion')">
    <div v-if="intervalTrainerState.matches('checked') || intervalTrainerState.matches('displayQuestion') ">
      Check
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

export default {
  name: "ActionButton",
  data() {
    return {
      // isDisabled: !this.intervalTrainerState.matches('checked')
    }
  },
  methods: {

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