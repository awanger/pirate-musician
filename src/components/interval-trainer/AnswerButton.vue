<template>
  <button v-bind:data-interval="intervalName" class="btn btn-answer" v-bind:class="{ selected: isSelected }">{{ intervalName }}</button>
</template>



<script>
export default {
  name: "AnswerButton",
  data() {
    return {
    }
  },
  props: {
    intervalTrainerState: Object,
    intervalName: String
  },
  watch: {
    intervalTrainerState: (state)=> {
      console.log('current intervaltrainerstate:', state);
      // console.log(this.intervalTrainerState);
    }
  },
  computed: {
    isSelected() {
      return this.intervalName === this.intervalTrainerState.context.selectedAnswer;
    }
  }

}
</script>



<style lang="scss" scoped>
  
</style>