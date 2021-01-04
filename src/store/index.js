import Vue from 'vue'
import Vuex from 'vuex'
// import router from '../router'


Vue.use(Vuex)

const state = {
    task: [],
    message: [],
    user: [],
};


const mutations = {
    SET_TASK: function(state, task) {
        state.task = task
    },
    SET_MESSAGE: function(state, message) {
        state.message = message
    },
    SET_USER: function(state, user) {
        state.user = user
    }
};

const actions = {
    async GET_USER({ commit }, obj) {
        try {
            const raw = await fetch("http://localhost:3000/login", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: obj['username'], password: obj['password'] })
            });
            const content = await raw.json();
            if (Object.prototype.hasOwnProperty.call(content, 'user_ob')) {
                const obj = { id: content.user_ob._id, username: content.user_ob.username }
                commit("SET_USER", obj);
            }

            if (Object.prototype.hasOwnProperty.call(content, 'message')) {
                commit("SET_USER", content.message);
            }

        } catch (err) {
            console.log(`GET_USER ${err}`)
        }
    },

    async GET_TASK({ commit }) {
        const rawResponse = await fetch('http://localhost:3000/tasks')
        const content = await rawResponse.json();
        commit("SET_TASK", content)
    },

    async SAVE_TASK({ commit, dispatch }, object) {
        try {
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
            dispatch("GET_TASK")
        } catch (error) {
            console.log(error);
        }

    },

    async DELETE_TASK({ commit, dispatch }, obj) {
        try {
            const id = obj['id']
            const raw = await fetch(`http://localhost:3000/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 'id': id })
            });
            const content = await raw.json();
            commit("SET_MESSAGE", content)
            dispatch("GET_TASK")
        } catch (error) {
            console.log(`DELETE_TASK ${error}`)
        }
    },

    async UPDATE_TASK({ commit, dispatch }, obj) {
        try {
            const id = obj['id']
            const raw = await fetch(`http://localhost:3000/edit/${id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 'task': obj['task'] })
            });
            const content = await raw.json();
            commit("SET_MESSAGE", content)
            dispatch("GET_TASK")
        } catch (error) {
            console.log(`UPDATED_TASK ${error}`)
        }
    }
};

export default new Vuex.Store({
    state,
    mutations,
    actions
})