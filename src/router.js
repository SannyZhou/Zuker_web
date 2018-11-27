const Router = [
    {
        path: '/',
        meta: {
            title: 'Zuker'
        },
        component: (resolve) => require(['./views/index.vue'], resolve)
    }
]
export default Router;