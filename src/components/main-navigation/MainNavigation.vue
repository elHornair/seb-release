<template>
  <!-- https://www.w3.org/TR/wai-aria-practices/#menu -->
  <nav
    id="main-navigation"
    ref="root"
    aria-label="Main"
    class="z-20 relative"
    :aria-hidden="isAriaHidden"
  >
    <button
      ref="closeButtonRef"
      class="flex items-center mx-0 mt-2 px-6 md:hidden"
      type="button"
      @click="setIsOpen(false)"
    >
      Close Navigation
    </button>
    <ul class="mt-10">
      <li class="mb-4">
        <main-navigation-header
          ><span>SEB Server Administration</span></main-navigation-header
        >
        <ul>
          <main-navigation-item route="institution" />
          <main-navigation-item route="user-account" />
          <main-navigation-item route="user-logs" />
        </ul>
      </li>
    </ul>

    <ul class="mt-10">
      <li>
        <main-navigation-header
          ><span>Miscellaneous</span></main-navigation-header
        >
        <ul>
          <main-navigation-item-external href="https://www.safeexambrowser.org/"
            >Documentation</main-navigation-item-external
          >
          <main-navigation-item route="logout" />
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script>
import MainNavigationHeader from "./MainNavigationHeader.vue";
import MainNavigationItem from "./MainNavigationItem.vue";
import MainNavigationItemExternal from "./MainNavigationItemExternal.vue";
import { useSidebar } from "../../composables/useSidebar";
import { ref } from "vue";

export default {
  name: "MainNavigation",

  components: {
    MainNavigationItem,
    MainNavigationHeader,
    MainNavigationItemExternal,
  },
  props: {
    isAriaHidden: {
      type: Boolean,
      required: true,
    },
  },
  setup() {
    const { setIsOpen } = useSidebar();
    const closeButtonRef = ref();
    return { setIsOpen, closeButtonRef };
  },
};
</script>
