import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store/index'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        beforeEnter: (to, from, next) => {
            // console.log(JSON.parse(JSON.stringify(store.state.user)));
            // console.log(!store.getters.CHECK_CLIENTE_STATE.length)
            if (!store.state.user.length) {
                next('/login')
            }
            next();
        },
        name: 'Home',
        component: () =>
            import ('./views/Home')
    },
    {
        path: '/login',
        name: "Login",
        component: () =>
            import ('./views/Login')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router