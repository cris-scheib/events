import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import axios from "axios";

require("./assets/css/custom.css");

let token = localStorage.getItem("token");
if (!token || token == null || token == "null") {
  axios.get(process.env.VUE_APP_API_URL + "/api/auth/get-token").then((res) => {
    localStorage.setItem("token", res.data.token);
    instanceApi(res.data.token);
    instanceBoot();
  });
} else {
  instanceApi(token);
  instanceBoot();
}

function instanceApi(token = null) {
  const api = axios.create({
    baseURL:process.env.VUE_APP_API_URL,
  });
  const apiAuth = axios.create({
    baseURL:process.env.VUE_APP_API_URL,
  });
  apiAuth.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  api.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        localStorage.clear();
        router.replace({ path: "/" });
      } else {
        return Promise.reject(error.response.data);
      }
    }
  );
  Vue.api = Vue.prototype.$api = api;
  Vue.apiAuth = Vue.prototype.$apiAuth = apiAuth;
}

function instanceBoot() {
  Vue.config.productionTip = false;
  Vue.use(BootstrapVue);
  Vue.use(IconsPlugin);

  new Vue({
    router,
    render: (h) => h(App),
  }).$mount("#app");
}
