<template>
  <ul class="skiplinks_list">
    <li class="skiplinks_item hidden md:block">
      <a
        href="#main-navigation"
        class="skiplinks_link"
        @click.prevent="linkClickHandler('#main-navigation')"
        >Go to main navigation</a
      >
    </li>
    <li class="skiplinks_item">
      <a
        href="#main-content"
        class="skiplinks_link"
        @click.prevent="linkClickHandler('#main-content')"
        >Go to main content</a
      >
    </li>
  </ul>
</template>

<script>
import { focusElement } from "@/utils/focus";

export default {
  setup() {
    const linkClickHandler = (selector) => {
      const targetElement = document.querySelector(selector);
      focusElement(targetElement);
    };

    return {
      linkClickHandler,
    };
  },
};
</script>

<style lang="scss" scoped>
.skiplinks {
  &_link {
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
}
</style>
