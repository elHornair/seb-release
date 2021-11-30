import { computed, readonly, ref } from "vue";
import { focusElement } from "@/utils/focus";

const basicShortcut = "Ctrl+Shift+";
const skipLinkData = [
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

const focusElementBySelector = (selector: string) => {
  const element: HTMLElement | null = document.querySelector(selector);

  if (element !== null) {
    focusElement(element);
  }
};

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.ctrlKey && e.shiftKey) {
    // .keyCode instead of .key is used, because we want e.g. "a" and "A" to behave the same
    // in the near future, this can be replaced by .code, but as of 2021, browser support is not good enough yet
    // (see https://caniuse.com/?search=KeyboardEvent.code for updates)
    const relevantSkipLink = skipLinkData.find(
      (skipLinkItem) => skipLinkItem.keyCode === e.keyCode
    );

    if (relevantSkipLink) {
      focusElementBySelector(relevantSkipLink.selector);
    }
  }
};

const activateSkipLinks = () => {
  window.addEventListener("keydown", handleKeyDown);
};

const deActivateSkipLinks = () => {
  window.removeEventListener("keydown", handleKeyDown);
};

export const useSkipLinks = () => {
  return {
    activateSkipLinks,
    deActivateSkipLinks,
    focusElementBySelector,
    skipLinkData: readonly(skipLinkData),
  };
};
