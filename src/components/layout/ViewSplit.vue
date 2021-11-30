<template>
  <main id="main-content" aria-label="Main Content">
    <h1 class="layout__mainheading">
      {{ routeDisplayName }}
    </h1>
    <div class="grid grid-cols-12 sm:gap-6">
      <div class="col-span-12 xl:col-span-9 order-2 xl:order-1">
        <slot name="main"></slot>
      </div>
      <aside
        id="secondary-content"
        class="col-span-12 xl:col-span-3 order-1 xl:order-2"
        :aria-label="labelAside"
      >
        <slot name="aside"></slot>
      </aside>
    </div>
  </main>
</template>

<script>
import { getDisplayNameByRouteName } from "@/router";
export default {
  name: "ViewSplit",
  props: {
    labelAside: {
      type: String,
      required: true,
    },
  },
  computed: {
    routeDisplayName() {
      return getDisplayNameByRouteName(this.$route.name);
    },
  },
};
</script>
