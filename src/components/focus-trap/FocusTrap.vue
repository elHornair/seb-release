<template>
  <div ref="containerRef" :class="{ 'h-full': isFullHeight }">
    <div
      :tabindex="tabCatcherTabIndex"
      aria-hidden="true"
      @focus="onFirstFocus"
    />
    <div ref="contentWrapperRef" :class="{ 'h-full': isFullHeight }">
      <slot />
    </div>
    <div
      :tabindex="tabCatcherTabIndex"
      aria-hidden="true"
      @focus="onLastFocus"
    />
  </div>
</template>

<script>
import { computed, onBeforeUnmount, onMounted, ref, toRefs, watch } from "vue";
import { join } from "rambdax";

const focusableElementsSelector = join(",", [
  "a[href]",
  "button:not(disabled)",
  '[tabindex]:not([tabindex="-1"])',
]);

const tagNameIgnoreList = ["SCRIPT", "NOSCRIPT", "STYLE"];
const focusTrapAttribute = "data-ft-ctl";
const focusTrapAttributeForRole = "data-ft-ctl-role";

export default {
  name: "FocusTrap",
  props: {
    isEnabled: {
      type: Boolean,
      default: false,
    },
    isFullHeight: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const { isEnabled } = toRefs(props);
    const containerRef = ref();
    const contentWrapperRef = ref();
    const tabCatcherTabIndex = computed(() => (isEnabled.value ? 0 : -1));

    let focusableElements = null;
    let hiddenElements = [];

    const onFirstFocus = () => {
      if (
        isEnabled.value &&
        focusableElements &&
        focusableElements.length > 0
      ) {
        const el = focusableElements.item(focusableElements.length - 1);
        el.focus();
      }
    };
    const onLastFocus = () => {
      if (
        isEnabled.value &&
        focusableElements &&
        focusableElements.length > 0
      ) {
        const el = focusableElements.item(0);
        el.focus();
      }
    };

    const getElementsToHide = (containerElement) => {
      // TODO: potential bug: this should not return elements, that already have aria-hidden="true" set. Otherwise the attribute will be removed after the focus trap is disabled leading to a different state than before
      const elements = [];
      const visitNode = (node) => {
        for (let sibling of node.parentNode.children) {
          if (
            !sibling.contains(containerElement) &&
            !tagNameIgnoreList.includes(sibling.tagName)
          ) {
            elements.push(sibling);
          }
          if (node.parentNode !== document.body) {
            visitNode(node.parentNode);
          }
        }
      };
      visitNode(containerElement);
      return elements;
    };

    const addAriaHiddenOnElements = (elements, value) =>
      elements.map((element) => {
        element.setAttribute("aria-hidden", value);
        element.setAttribute(focusTrapAttribute, true);
      });

    const removeAriaHiddenOnElements = (elements) =>
      elements.map((element) => {
        if (element.hasAttribute(focusTrapAttribute)) {
          element.removeAttribute(focusTrapAttribute);
          element.removeAttribute("aria-hidden");
        }
      });

    const disableRelevantParentElements = (containerElement) => {
      Array.from(document.querySelectorAll("[role], main, table, caption"))
        .filter((element) => element.contains(containerElement))
        .map((element) => {
          const originalRole = element.getAttribute("role") || "null";
          element.setAttribute(focusTrapAttributeForRole, originalRole);
          element.setAttribute("role", "presentation");
        });
    };

    const enableRelevantParentElements = () => {
      Array.from(
        document.querySelectorAll(`[${focusTrapAttributeForRole}]`)
      ).map((element) => {
        const originalRole = element.getAttribute(focusTrapAttributeForRole);

        if (originalRole === "null") {
          element.removeAttribute("presentation");
        } else {
          element.setAttribute("role", originalRole);
        }

        element.removeAttribute(focusTrapAttributeForRole);
      });
    };

    const enableTrap = () => {
      hiddenElements = getElementsToHide(containerRef.value);
      addAriaHiddenOnElements(hiddenElements, true);
      disableRelevantParentElements(containerRef.value);
    };
    const disableTrap = () => {
      removeAriaHiddenOnElements(hiddenElements);
      hiddenElements = [];
      enableRelevantParentElements();
    };

    watch(isEnabled, (enabled) => (enabled ? enableTrap() : disableTrap()));

    onMounted(() => {
      focusableElements = contentWrapperRef.value.querySelectorAll(
        focusableElementsSelector
      );
      if (isEnabled.value) {
        enableTrap();
      }
    });

    onBeforeUnmount(() => {
      disableTrap();
    });

    return {
      containerRef,
      contentWrapperRef,
      tabCatcherTabIndex,
      onFirstFocus,
      onLastFocus,
    };
  },
};
</script>
