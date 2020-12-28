import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        task: [],
        message: []
    },

    mutations: {
        SET_TASK: function(state, task) {
            state.task = task
        },
        SET_MESSAGE: function(state, message) {
            state.message = message
        }
    },

    actions: {
        async GET_TASK({ commit }) {
            const rawResponse = await fetch('http://localhost:3000/tasks')
            const content = await rawResponse.json();
            commit("SET_TASK", content)
        },

        async SAVE_TASK({ commit }, object) {
            const rawResponse = await fetch('http://localhost:3000/save', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 'task': object })
            });
            const content = await rawResponse.json();
            commit("SET_MESSAGE", content)
        },

        async DELETE_TASK({ commit }, obj) {
            const id = obj['id']
            const raw = await fetch(`http://localhost:3000/delete/${id}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 'id': id })
            });
            const content = await raw.json();
            commit("SET_MESSAGE", content)
        }
    }
})