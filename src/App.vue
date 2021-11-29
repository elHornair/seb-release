<template>
  <component :is="layout"></component>
</template>

<script lang="ts">
import { computed, nextTick } from "vue";
import { useRoute } from "vue-router";
import { useHead } from "@vueuse/head";
import { getDisplayNameByRouteName } from "@/router";
import { focusElement } from "@/utils/focus";
import { useSidebar } from "@/composables/useSidebar";
import LayoutMain from "@/components/layout/LayoutMain.vue";
import LayoutEmpty from "@/components/layout/LayoutEmpty.vue";

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
      title: computed(() => {
        const basicTitle = "SEB Server Web-Client";

        if (route.name) {
          return `${basicTitle} - ${getDisplayNameByRouteName(
            route.name.toString()
          )}`;
        }

        return basicTitle;
      }),
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
