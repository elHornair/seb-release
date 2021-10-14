<template>
  <div>
    <main id="main-content">
      <h1 class="layout__mainheading">
        {{ routeDisplayName }}
      </h1>
      <slot name="main"></slot>
    </main>
    <aside>
      <slot name="aside"></slot>
    </aside>
  </div>
</template>

<script>
import { getDisplayNameByRouteName } from "@/router";

// TODO: put the <aside> really on the side on bigger screens. Also: should it be before or after the main content on small screens? In the DOM? visually?
export default {
  name: "ViewSplit",
  computed: {
    routeDisplayName() {
      return getDisplayNameByRouteName(this.$route.name);
    },
  },
};
</script>
