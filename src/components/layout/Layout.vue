<template>
  <div class="layout">
    <SkipLinks />
    <Header />
    <Sidebar />

    <main id="main-content" class="layout_maincontent">
      <h1 ref="focusTarget" class="layout_mainheading">
        {{ routeDisplayName }}
      </h1>
      <router-view />
    </main>
  </div>
</template>

<script>
import Header from "../header/Header.vue";
import Sidebar from "./Sidebar.vue";
import { getDisplayNameByRouteName } from "../../router";
import SkipLinks from "../SkipLinks.vue";

export default {
  name: "Layout",
  components: { Sidebar, Header, SkipLinks },
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
