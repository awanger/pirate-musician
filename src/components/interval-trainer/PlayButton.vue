<template>
  <button class="btn btn-play" v-bind:disabled="isPlaying">
    <img src="@/assets/icons/volume-up-solid.svg" alt="Speaker icon here">
  </button>
</template>

<script>
export default {
  name: "PlayButton",
  props: [
    'isPlaying'
  ]
}
</script>


<style lang="scss" scoped>
</style>