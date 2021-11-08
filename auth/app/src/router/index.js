import Router from 'vue-router'
import Vue from 'vue'

Vue.use(Router)

let router = new Router({
    mode:'history',
    routes: [{
            path: '/',
            name: 'auth',
            component: require('@/components/pages/Login').default,
            meta: {
                guest: true
            }
        },
        {
            path: '/me',
            name: 'user',
            component: require('@/components/pages/User').default,
            meta: {
                guest: false
            }
        },
        {
            path: '/change-password',
            name: 'change-password',
            component: require('@/components/pages/ChangePassword').default,
            meta: {
                guest: false
            }
        },
        {
            path: '/change-profile',
            name: 'change-profile',
            component: require('@/components/pages/ChangeProfile').default,
            meta: {
                guest: false
            }
        },
    ]
})

// router.beforeEach((to, from, next) => {
//     if (to.matched.some(record => record.meta.requiresAuth)) {
//         let token = localStorage.getItem('token')
//         if (!token || token === 'null') next({ path: '/', params: { nextUrl: to.fullPath } })
//         else next()
//     } else if (to.matched.some(record => record.meta.guest)) {
//         let token = localStorage.getItem('token')
//         if (!token || token === 'null') next()
//         else next({ name: 'dashboard' })
//     } else {
//         next()
//     }
// })

export default router