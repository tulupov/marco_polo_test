import Vue from "vue";
import Router from "vue-router";
import Config from "./config"
import { STATE_KEY } from "./main"

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/products",
      name: "products",
      component: () => import("./components/ProductList")
    },
    {
      path: "/add",
      name: "add",
      component: () => import("./components/AddProduct")
    },
    {
      path: '/edit',
      name: 'edit',
      component: () => import("./components/AddProduct"),
      props: true,
    },
    {
      path: "/login_oauth",
      name: "login_oauth",
      beforeEnter() {
        const state = Math.random().toString(36);
        localStorage.setItem(STATE_KEY, state);
        location.href = `http://localhost:3000/login?client_id=${Config.client_id()}&client_secret=${Config.client_secret()}&response_type=code&redirect_uri=${encodeURI(Config.callback())}&grant_type=write&state=${state}`
      }
    },
    {
      path: "/callback",
      name: "callback",
      component: () => import("./components/LoginCallback")
    }
  ]
});
