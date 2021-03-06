import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import store from "@/store/index";

import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Logout from "@/views/Logout.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/task-editor",
    name: "Task Editor",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/TaskEditor.vue"),
  },
  {
    path: "/create-invoice",
    name: "Create Invoice",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/CreateInvoice.vue"),
  },
  {
    path: "/view-invoices",
    name: "View Invoices",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ViewInvoices.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout,
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  // If unauthorized
  if (!store.state.authorized) {
    if (to.name == "Login" || to.name == "Register") {
      next();
    } else {
      next({ name: "Login" });
    }
  } else {
    next();
  }
});

export default router;
