import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import store from "@/store";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/login",
    name: "Auth",
    meta: { login: false },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Auth.vue"),
  },
  {
    path: "/dayPage",
    name: "UserAccount",
    meta: { login: true },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/UserData.vue"),
  },
  {
    path: "*",
    name: "DayPage",
    meta: { login: true },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/DayPage.vue"),
  },
];

const router = new VueRouter({
  // mode: "history",
  mode: "hash",

  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const isLogin = store.getters.isLogin;
  if ("login" in to.meta) {
    if (to.meta.login && !isLogin) {
      next({ path: "/login" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
