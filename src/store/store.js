import Vue from 'vue';

const state = Vue.observable({ // this is the magic
    currentState: Object
});

export const getters = {
    state: () => state.currentState
}

export const mutations = {
  setState: (val) => state.currentState = val
}

export const actions = {

}