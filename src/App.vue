<template>
  <component :is="layout"></component>
</template>

<script>
import { computed, nextTick } from "vue";
import { useHead } from "@vueuse/head";
import LayoutMain from "./components/layout/LayoutMain.vue";
import LayoutEmpty from "@/components/layout/LayoutEmpty";
import { useSidebar } from "./composables/useSidebar";
import { focusElement } from "./utils/focus";
import { getDisplayNameByRouteName } from "./router";
import { useRoute } from "vue-router";

export default {
  name: "App",

  components: {
    LayoutMain,
    LayoutEmpty,
  },

  setup() {
    const { isOpen, closeSidebar } = useSidebar();
    const route = useRoute();
    useHead({
      title: computed(
        () => `SEB Server Web-Client - ${getDisplayNameByRouteName(route.name)}`
      ),
    });

    return {
      isOpen,
      closeSidebar,
    };
  },

  data: () => ({
    ignoreRouteChange: true,
  }),

  computed: {
    layout() {
      return `layout-${
        this.$route.meta.layout ? this.$route.meta.layout : "main"
      }`;
    },
  },

  watch: {
    $route: function () {
      // ignore the initial route change when focusing main content
      if (!this.ignoreRouteChange) {
        nextTick(() => {
          this.focusMainContent();
          this.closeSidebar();
        });
      } else {
        this.ignoreRouteChange = false;
      }
    },
  },

  methods: {
    focusMainContent() {
      const focusTarget = document.getElementById("main-content");

      if (focusTarget) {
        focusElement(focusTarget, 300);
      }
    },
  },
};
</script>
