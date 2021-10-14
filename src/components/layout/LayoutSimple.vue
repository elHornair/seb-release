<template>
  <div class="layout">
    <SkipLinks />
    <Header />
    <Sidebar />

    <div id="main-content" class="layout__content">
      <h1 ref="focusTarget" class="layout__mainheading">
        {{ routeDisplayName }}
      </h1>
      <router-view v-if="accessToCurrentRouteGranted" />
      <main v-else>
        <alert
          title="Error 403 – Access denied"
          message="You don't have the required permissions to access this page."
        ></alert>
      </main>
    </div>
  </div>
</template>

<script>
import Header from "../header/Header.vue";
import Sidebar from "./Sidebar.vue";
import { getDisplayNameByRouteName } from "../../router";
import SkipLinks from "../SkipLinks.vue";
import { useAccessControl } from "@/composables/useAccessControl";
import Alert from "@/components/misc/Alert";

export default {
  name: "LayoutSimple",
  components: { Alert, Sidebar, Header, SkipLinks },
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

  .layout__content {
    @apply container;
    @apply mx-auto;
    @apply md:ml-64;
    @apply md:pl-6;
  }

  .layout__mainheading {
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
      @apply z-10;
    }
  }
}
</style>
