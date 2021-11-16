import Router from "vue-router";
import Vue from "vue";

Vue.use(Router);

let router = new Router({
  mode: "history",
  routes: [
    {
      path: "/:slug",
      name: "printer",
      component: require("@/components/pages/Printer").default,
      meta: {
        guest: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    let token = localStorage.getItem("token");
    if (!token || token === "null")
      next({
        path: process.env.VUE_APP_AUTH_URL,
        params: { nextUrl: to.fullPath },
      });
    else next();
  } else {
    next();
  }
});

export default router;
