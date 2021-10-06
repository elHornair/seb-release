import { createApp } from "vue";
import { createHead } from "@vueuse/head";
import App from "./App.vue";
import "./assets/css/main.scss";
import router from "./router";

createApp(App).use(router).use(createHead()).mount("#app");
