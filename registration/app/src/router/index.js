import Router from "vue-router";
import Vue from "vue";

Vue.use(Router);

let router = new Router({
  mode: "history",
  routes: [
    {
      path: "/:slug",
      name: "register",
      component: require("@/components/pages/Register").default,
      meta: {
        guest: true,
      },
    },
  ],
});

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

export default router;
