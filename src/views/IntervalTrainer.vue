<template>
  <div id='interval-trainer'>
    <div class="btn btn-speaker">Speaker Icon Here</div>
    <div>
      <h1 class="question">What interval do you hear?</h1>
      <div class="multiple-choice-grid">
        <button class="btn btn-answer">Unison</button>
        <button class="btn btn-answer">m2</button>
        <button class="btn btn-answer">M2</button>
        <button class="btn btn-answer">m3</button>
        <button class="btn btn-answer">M3</button>
        <button class="btn btn-answer">m2</button>
        <button class="btn btn-answer">M2</button>
        <button class="btn btn-answer">m3</button>
        <button class="btn btn-answer">M3</button>
        <button class="btn btn-answer">m2</button>
        <button class="btn btn-answer">M2</button>
        <button class="btn btn-answer">m3</button>
        <button class="btn btn-answer">M3</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>


<style lang="scss" scoped>
  #interval-trainer {
    padding-top: 100px;

    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 38px;
  }

  .multiple-choice-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 20px;
  }

</style>
