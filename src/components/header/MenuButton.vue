<template>
  <!-- s. https://www.w3.org/TR/wai-aria-practices/#menubutton for more on menu buttons -->
  <button
    type="button"
    aria-controls="sidebar"
    :aria-label="(isOpen ? 'Close' : 'Open') + ' Navigation'"
    :aria-expanded="isOpen"
    class="float-right pr-4 py-3 md:hidden"
    @click="toggleIsOpen"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
        clip-rule="evenodd"
      />
    </svg>
  </button>
</template>

<script>
import { useSidebar } from "../../composables/useSidebar";
export default {
  name: "MenuButton",
  setup() {
    const { isOpen, toggleIsOpen } = useSidebar();
    return {
      isOpen,
      toggleIsOpen,
    };
  },
};
</script>
