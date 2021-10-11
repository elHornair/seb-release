<template>
  <div class="layout">
    <SkipLinks />
    <Header />
    <Sidebar />

    <main id="main-content" class="layout_maincontent">
      <div v-if="accessToCurrentRouteGranted">
        <h1 ref="focusTarget" class="layout_mainheading">
          {{ routeDisplayName }}
        </h1>
        <router-view />
      </div>
      <div v-else>
        <h1 ref="focusTarget" class="layout_mainheading">Access denied</h1>
      </div>
    </main>
  </div>
</template>

<script>
import Header from "../header/Header.vue";
import Sidebar from "./Sidebar.vue";
import { getDisplayNameByRouteName } from "../../router";
import SkipLinks from "../SkipLinks.vue";
import { useAccessControl } from "@/composables/useAccessControl";

export default {
  name: "Layout",
  components: { Sidebar, Header, SkipLinks },
  setup() {
    const { accessToCurrentRouteGranted } = useAccessControl();

    return {
      accessToCurrentRouteGranted,
    };
  },
  computed: {
    routeDisplayName() {
      return getDisplayNameByRouteName(this.$route.name);
    },
  },
};
</script>

<style lang="scss" scoped>
.layout {
  @apply max-w-screen-lg;
  @apply md:flex;

  .layout_maincontent {
    @apply container;
    @apply mx-auto;
    @apply md:ml-64;
  }

  .layout_mainheading {
    @apply absolute;
    @apply top-0;
    @apply w-full;
    @apply text-lg;
    @apply sr-only;

    @screen md {
      @apply not-sr-only;

      @apply sticky;
      @apply top-0;
      @apply flex;
      @apply items-center;
      @apply bg-white;
      @apply h-12;
      @apply px-6;
      @apply z-10;
    }
  }
}
</style>
