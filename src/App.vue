<template>
  <div id="app">
    <div class="container">
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/interval-trainer">Interval Trainer</router-link>
      </div>
    <router-view/>
    </div>
  </div>
</template>

<style lang="scss">
  // @import './../node_modules/bulma/css/bulma.css';
  @import '@/assets/scss/main.scss';
</style>
