<template>
  <ul>
    <li
      v-for="skipLinkItem in skipLinkData"
      :key="'skiplink_' + skipLinkItem.selector"
      class="hidden md:block"
    >
      <a
        :href="skipLinkItem.selector"
        class="skip_link"
        @click.prevent="focusElementBySelector(skipLinkItem.selector)"
        >{{ skipLinkItem.label }}</a
      >
    </li>
  </ul>
</template>

<script>
import { useSkipLinks } from "@/composables/useSkipLinks";
import { onBeforeUnmount, onMounted } from "vue";

export default {
  setup() {
    const {
      activateSkipLinks,
      deActivateSkipLinks,
      focusElementBySelector,
      skipLinkData,
    } = useSkipLinks();

    onMounted(() => activateSkipLinks());
    onBeforeUnmount(() => deActivateSkipLinks());

    return {
      focusElementBySelector,
      skipLinkData,
    };
  },
};
</script>

<style lang="scss" scoped>
.skip_link {
  @apply sr-only;

  &:focus {
    @apply not-sr-only;
    @apply fixed;
    @apply top-0;
    @apply left-0;
    @apply z-50;
    @apply bg-white;
    @apply p-2;
    @apply m-1;
  }
}
</style>
