<template>
  <header class="header">
    <div class="inner">
      <menu-button />
      <div aria-hidden="true">{{ routeName }}</div>
    </div>
  </header>
</template>

<script>
import MenuButton from "./MenuButton.vue";
import { getDisplayNameByRouteName } from "../../router";

export default {
  name: "Header",
  components: { MenuButton },
  computed: {
    routeName() {
      return getDisplayNameByRouteName(this.$route.name);
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  @apply top-0;
  @apply sticky;
  @apply h-12;
  @apply bg-white;
  @apply z-10;

  @screen md {
    @apply hidden;
  }

  .inner {
    @apply container;
    @apply mx-auto;
    @apply px-2;
    @apply flex;
    @apply items-center;

    @screen sm {
      @apply px-0;
    }
  }
}
</style>
