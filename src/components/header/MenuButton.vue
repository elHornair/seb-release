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
    <MenuIcon class="h-5 w-5"></MenuIcon>
  </button>
</template>

<script>
import { MenuIcon } from "@heroicons/vue/solid";
import { useSidebar } from "../../composables/useSidebar";

export default {
  name: "MenuButton",
  components: { MenuIcon },
  setup() {
    const { isOpen, toggleIsOpen } = useSidebar();
    return {
      isOpen,
      toggleIsOpen,
    };
  },
};
</script>
