import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import VueRouter from 'vue-router'
import Routers from './router'
import axios from 'axios'
import store from './store'

Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.config.devtools = true;


const RouterConfig = {
    mode: 'history',
    routes: Routers
}
const router = new VueRouter(RouterConfig)


Vue.prototype.$axios = axios

axios.defaults.withCredentials = true
axios.interceptors.response.use(
    response => {
        return response;
    },
    err => {
        if (err.response && err.response.status == 401) {
            store.commit('LOG_OUT');
            router.replace({
                path: '/login',
                query: {redirect: router.currentRoute.fullPath}
            })
        }
        return Promise.reject(err)
    }
)

axios.interceptors.request.use(
    config => {
        if (store.state.isLogin) {
            config.headers.Authorization = `token ${store.state.isLogin}`;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
)

router.beforeEach((to, from, next) =>  {
    if(to.meta.requireAuth) {
        // if (localStorage.getItem('JWT')){
        //     var title = to.meta.title ? to.meta.title + ' - Zuker' : 'Zuker';
        //     window.document.title = title;
        //     next();
        // }else{
        //     next({
        //         path: '/login',
        //         query: {redirect: to.fullPath}
        //     })
        // }
        if (store.state.isLogin) {
            var title = to.meta.title ? to.meta.title + ' - Zuker' : 'Zuker';
            window.document.title = title;
            next();
        } else {
            next({
                path: '/login',
                query: {redirect: to.fullPath}
            })
        }
    } else {
        var title = to.meta.title ? to.meta.title + ' - Zuker' : 'Zuker';
        window.document.title = title;
        next();
    }
})

store.commit('LOG_CHECK')

new Vue({
    el: '#app',
    store,
    router: router,
    render: h => h(App)
})
