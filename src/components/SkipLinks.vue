<template>
  <ul class="skiplinks_list">
    <li
      v-for="skipLink in skipLinks"
      :key="'skiplink_' + skipLink.selector"
      class="skiplinks_item hidden md:block"
    >
      <a
        :href="skipLink.selector"
        class="skiplinks_link"
        @click.prevent="focusElementBySelector(skipLink.selector)"
        >{{ skipLink.label }}</a
      >
    </li>
  </ul>
</template>

<script>
import { focusElement } from "@/utils/focus";
import { onBeforeUnmount, onMounted } from "vue";

export default {
  setup() {
    const basicShortcut = "Ctrl+Shift+";
    const skipLinks = [
      {
        label: `Go to main navigation (${basicShortcut}n)`,
        selector: "#main-navigation",
        keyCode: 78, // => n / N
      },
      {
        label: `Go to main content (${basicShortcut}m)`,
        selector: "#main-content",
        keyCode: 77, // => m / M
      },
      {
        label: `Go to table actions (${basicShortcut}a)`,
        selector: "#secondary-content",
        keyCode: 65, // => a / A
      },
    ];

    const focusElementBySelector = (selector) => {
      focusElement(document.querySelector(selector));
    };

    const keydownHandler = (e) => {
      if (e.ctrlKey && e.shiftKey) {
        // keyCode instead of key name is used, because we want e.g. "a" and "A" to behave the same
        const relevantSkipLink = skipLinks.find(
          (skipLink) => skipLink.keyCode === e.keyCode
        );

        if (relevantSkipLink) {
          console.log("keydown");
          console.log(relevantSkipLink);
          focusElementBySelector(relevantSkipLink.selector);
        }
      }
    };

    onMounted(() => {
      window.addEventListener("keydown", keydownHandler);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("keydown", keydownHandler);
    });

    return {
      focusElementBySelector,
      keydownHandler,
      skipLinks,
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
