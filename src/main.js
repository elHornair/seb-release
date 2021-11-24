import "@/assets/css/main.scss";
import { createApp } from "vue";
import { createHead } from "@vueuse/head";
import router from "@/router";
import App from "@/App.vue";

createApp(App).use(router).use(createHead()).mount("#app");
