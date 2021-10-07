import { createRouter, createWebHistory } from "vue-router";

import Institution from "@/views/Institution.vue";
import Dummy from "@/views/Dummy.vue";

const routes = [
  { path: "/", name: "institution", component: Institution },
  { path: "/user-account", name: "user-account", component: Dummy },
  { path: "/user-logs", name: "user-logs", component: Dummy },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export const getDisplayNameByRouteName = (routeName) =>
  ({
    institution: "Institution",
    "user-account": "User Account",
    "user-logs": "User Logs",
  }[routeName] || "");

export default router;
