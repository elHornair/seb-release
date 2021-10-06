import { createRouter, createWebHistory } from "vue-router";

import Institutions from "@/views/Institutions.vue";
import About from "@/views/About.vue";

const routes = [
  { path: "/", name: "institutions", component: Institutions },
  { path: "/about", name: "about", component: About },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export const getDisplayNameByRouteName = (routeName) =>
  ({
    institutions: "Institutions",
    about: "About",
  }[routeName] || "");

export default router;
