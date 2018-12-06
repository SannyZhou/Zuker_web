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

Vue.prototype.$axios = axios

const RouterConfig = {
    mode: 'history',
    routes: Routers
}
const router = new VueRouter(RouterConfig)

router.beforeEach((to, from, next) =>  {
    var title = to.meta.title ? to.meta.title + ' - Zuker' : 'Zuker';
    window.document.title = title;
    next();
})


new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
})
