import Router from "vue-router";
import Vue from "vue";

Vue.use(Router);

let router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "events",
      component: require("@/components/pages/Events").default,
      meta: {
        guest: true,
      },
    },
    {
      path: "/my-events",
      name: "my-events",
      component: require("@/components/pages/MyEvents").default,
      meta: {
        guest: false,
      },
    },
    {
      path: "/my-certificates",
      name: "my-certificates",
      component: require("@/components/pages/MyCertificates").default,
      meta: {
        guest: false,
      },
    },
    {
      path: "/:slug",
      name: "event",
      component: require("@/components/pages/Event").default,
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
      next({ path: process.env.VUE_APP_AUTH_URL, params: { nextUrl: to.fullPath } });
    else next();
  } else {
    next();
  }
});

export default router;
