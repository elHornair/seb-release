<template>
  <main id="main-content" aria-label="Main Content">
    <h1 class="layout__mainheading">
      {{ routeDisplayName }}
    </h1>
    <div class="grid grid-cols-12 sm:gap-6">
      <div class="primary-content">
        <slot name="main"></slot>
      </div>
      <aside
        id="secondary-content"
        class="secondary-content"
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
<style lang="scss" scoped>
.primary-content {
  @apply col-span-12;
  @apply order-2;

  @apply xl:col-span-9;
  @apply xl:order-1;
}

.secondary-content {
  @apply sticky;
  @apply col-span-12;
  @apply order-1;
  @apply top-12; // this is the height of the header
  @apply z-10;

  @apply sm:relative;
  @apply sm:top-auto;
  @apply sm:z-0;

  @apply xl:col-span-3;
  @apply xl:order-2;
}
</style>
