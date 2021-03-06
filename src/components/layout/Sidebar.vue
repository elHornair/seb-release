<template>
  <div id="sidebar" class="sidebar" :class="{ 'sidebar--is-open': isOpen }">
    <div class="sidebar_inner" :class="{ 'sidebar_inner--is-open': isOpen }">
      <img class="sidebar_logo" src="/img/logo.svg" alt="Logo ETH Zürich" />
      <span class="sidebar_title">SEB-Server</span>
      <hr class="sidebar_divider" />

      <FocusTrap :is-enabled="!isDesktop && isOpen">
        <main-navigation
          ref="mainNavigationRef"
          :is-aria-hidden="!isDesktop && !isOpen"
        />
      </FocusTrap>
    </div>

    <div
      class="sidebar_backdrop"
      :class="{ 'sidebar_backdrop--is-open': isOpen }"
      @click="closeSidebar"
    />
  </div>
</template>

<script>
import { nextTick, ref, watch } from "vue";
import { useSidebar } from "@/composables/useSidebar";
import { useViewport } from "@/composables/useViewport";
import MainNavigation from "@/components/main-navigation/MainNavigation.vue";
import FocusTrap from "@/components/focus-trap/FocusTrap.vue";

export default {
  name: "Sidebar",
  components: { MainNavigation, FocusTrap },

  setup() {
    const mainNavigationRef = ref();
    const { isOpen, closeSidebar } = useSidebar();
    const { isDesktop } = useViewport();

    let lastElementWithFocus;

    watch(isOpen, (open) => {
      const closeButton = mainNavigationRef.value.closeButtonRef;
      nextTick(() => {
        if (open && closeButton) {
          lastElementWithFocus = document.activeElement;
          window.setTimeout(() => closeButton.focus(), 350);
        } else {
          lastElementWithFocus.focus();
        }
      });
    });

    return {
      isOpen,
      closeSidebar,
      isDesktop,
      mainNavigationRef,
    };
  },
};
</script>

<style lang="scss">
.sidebar {
  @apply fixed;
  @apply invisible;
  @apply opacity-0;
  @apply inset-y-0;
  @apply z-20;
  transition: visibility 150ms, opacity 150ms;

  @screen md {
    @apply fixed;
    @apply flex;
    @apply visible;
    @apply opacity-100;
    @apply left-0;
  }

  &--is-open {
    @apply visible;
    @apply opacity-100;
    @apply left-0;
  }

  &_inner {
    @apply fixed;
    @apply transform;
    @apply transition-transform;
    @apply -translate-x-full;
    @apply ease-in;
    @apply bg-white;
    @apply z-20;
    @apply inset-y-0;
    @apply w-64;
    @apply overflow-y-auto;
    @apply border-r-2;
    @apply border-gray-200;

    &--is-open {
      @apply translate-x-0;
      @apply ease-out;
    }

    @screen md {
      @apply relative;
      @apply translate-x-0;
      @apply transform-none;
    }
  }
}
.sidebar {
  &_logo {
    @apply w-48;
    @apply py-2;
    @apply pl-6;
  }

  &_title {
    @apply pl-6;
    @apply font-normal;
    @apply text-lg;
  }

  &_divider {
    @apply mx-6;
    @apply my-6;
  }

  &_backdrop {
    @apply fixed;
    @apply z-10;
    @apply inset-0;
    @apply bg-black;
    @apply opacity-50;
    @apply transition-opacity;
    @apply hidden;

    &--is-open {
      @apply block;
    }

    @screen md {
      @apply hidden;
    }
  }
}
</style>
