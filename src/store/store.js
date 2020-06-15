import Vue from 'vue';
import { interpret } from 'xstate';
import quizMachine from "@/machine";


const state = Vue.observable({ // this is the magic
  currentState: Object,
  quizService: interpret(quizMachine)
});

export const getters = {
  state: () => state.currentState,
  quizService: state.quizService // why isn't this a function as well
}

export const mutations = {
  setState: (val) => state.currentState = val
}

export const actions = {

}