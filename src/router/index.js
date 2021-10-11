import { createRouter, createWebHistory } from "vue-router";
import { useAuth } from "@/composables/useAuth";

import Institution from "@/views/Institution.vue";
import Login from "@/views/Login.vue";
import Dummy from "@/views/Dummy.vue";

const routes = [
  { path: "/", name: "institution", component: Institution },
  { path: "/logout", name: "logout", component: Dummy },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: { layout: "full" },
  },
  { path: "/user-account", name: "user-account", component: Dummy },
  { path: "/user-logs", name: "user-logs", component: Dummy },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

const { isAuthenticated, invalidateUser } = useAuth();

router.beforeEach(async (to) => {
  if (to.name !== "login" && !isAuthenticated.value) {
    return "login";
  }

  if (to.name === "login" && isAuthenticated.value) {
    return "institution";
  }

  if (to.name === "logout") {
    invalidateUser();
    return "login";
  }
});

export const getDisplayNameByRouteName = (routeName) =>
  ({
    institution: "Institution",
    "user-account": "User Account",
    "user-logs": "User Logs",
    logout: "Logout",
  }[routeName] || "");

export default router;
