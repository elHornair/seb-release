<template>
  <layout ref="layout" />
</template>

<script>
import { computed, nextTick } from "vue";
import { useHead } from "@vueuse/head";
import Layout from "./components/layout/Layout.vue";
import { useSidebar } from "./composables/useSidebar";
import { focusElement } from "./utils/focus";
import { getDisplayNameByRouteName } from "./router";
import { useRoute } from "vue-router";

export default {
  name: "App",

  components: {
    Layout,
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
      const focusTarget = this.$refs.layout.$refs.focusTarget;
      if (focusTarget) {
        focusElement(focusTarget, 300);
      }
    },
  },
};
</script>
