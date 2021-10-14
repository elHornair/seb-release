<template>
  <main id="main-content">
    <h1 class="layout__mainheading">
      {{ routeDisplayName }}
    </h1>
    <slot></slot>
  </main>
</template>

<script>
import { getDisplayNameByRouteName } from "@/router";

export default {
  name: "ViewBasic",
  computed: {
    routeDisplayName() {
      return getDisplayNameByRouteName(this.$route.name);
    },
  },
};
</script>
