<template>
  <footer class="footer">
    <div class="container">
      <p>My gear icon goes here</p>
      <action-button v-on:click.native="send('CLICK', $event)" :intervalTrainerState="intervalTrainerState"/>
    </div>
  </footer>
</template>



<script>
import ActionButton from "@/components/interval-trainer/ActionButton";


export default {
  name: "Footer",
  components: {
    ActionButton
  },
  data() {
    return {
    }
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
  computed: {

  }

}
</script>



<style lang="scss" scoped>

  .footer {
    border-top: 2px solid #D6E1E5;
    position: absolute;
    left: 0px;
    bottom: 0px;
    width: 100%;
    height: 20vh;

    .container {
      display: flex;
      align-items: center; // vertically center
      justify-content: space-between; // float the gear to the left and the action button to the right
      height: 100%;
    }
  }
  
</style>