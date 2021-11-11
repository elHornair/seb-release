<template>
  <teleport to="body">
    <div class="fixed z-30 inset-0 overflow-y-auto bg-black bg-opacity-50">
      <div class="relative flex items-center justify-center h-full text-center">
        <button
          class="absolute w-full h-full"
          aria-hidden="true"
          type="button"
          @click="onClose"
        ></button>
        <div
          class="
            modal_container
            relative
            bg-white
            rounded
            text-left
            overflow-hidden
            shadow
            w-full
            p-2
          "
        >
          <FocusTrap :is-enabled="true" :is-full-height="true">
            <div class="h-full flex flex-col">
              <div class="flex justify-between items-center mb-4 h-20">
                <slot name="header" />
                <button
                  ref="closeButtonRef"
                  class="m-2 hover:text-primary-800"
                  type="button"
                  :aria-label="closeButtonLabel"
                  @click="onClose"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div class="h-full flex-grow">
                <slot name="body" />
              </div>
            </div>
          </FocusTrap>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import { onBeforeUnmount, onMounted, ref } from "vue";
import FocusTrap from "../focus-trap/FocusTrap.vue";
import { useScrollLock } from "@/composables/useScrollLock";

export default {
  name: "Modal",
  components: { FocusTrap },
  props: {
    closeButtonLabel: {
      type: String,
      required: false,
      default: "Close",
    },
    onClose: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const scrollLock = useScrollLock();
    let lastElementWithFocus = null;
    const closeButtonRef = ref();

    const keydownHandler = (e) => {
      if (e.key === "Escape") {
        props.onClose(e);
      }
    };

    onMounted(() => {
      lastElementWithFocus = document.activeElement;
      window.addEventListener("keydown", keydownHandler);
      setTimeout(() => closeButtonRef.value.focus(), 50);
      scrollLock.enable();
    });

    onBeforeUnmount(() => {
      scrollLock.disable();
      window.removeEventListener("keydown", keydownHandler);
      if (lastElementWithFocus) {
        lastElementWithFocus.focus();
      }
    });

    return {
      closeButtonRef,
    };
  },
};
</script>

<style lang="scss" scoped>
.modal {
  &_container {
    height: 100%;
    @screen md {
      @apply w-1/2;
      min-height: 50vh;
      max-height: 85vh;
    }
  }
  &_body {
    @apply h-full;
    @apply flex-grow;
  }
}
</style>
