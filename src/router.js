const Router = [
    {
        path: '/login',
        meta: {
            title: 'Login'
        },
        component: (resolve) => require(['./views/login.vue'], resolve)
    },
    {
        path: '/',
        redirect: 'index',
        meta: {
            title: 'Zuker'
        },
        component: (resolve) => require(['./views/main.vue'], resolve),
        children: [
            {
                path: 'index',
                meta: {
                    title: 'index'
                },
                component: (resolve) => require(['./views/index.vue'], resolve)
            },
            {
                path: 'my',
                redirect: '/my/posts',
                component: (resolve) => require(['./views/user.vue'], resolve),
                children: [
                    {
                        path: 'posts',
                        meta: {
                            title: ''
                        },
                        component: (resolve) => require(['./views/posts.vue'], resolve),
                    },
                    {
                        path: 'messages',
                        meta: {
                            title: ''
                        },
                        component: (resolve) => require(['./views/messages.vue'], resolve)
                    }
                ]
            }
        ]
    }
]
export default Router;