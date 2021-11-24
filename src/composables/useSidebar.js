import { ref, watch } from "vue";
import { useScrollLock } from "@/composables/useScrollLock";

const isOpen = ref(false);
const setIsOpen = (val) => (isOpen.value = val);
const toggleIsOpen = () => (isOpen.value = !isOpen.value);
const closeSidebar = () => (isOpen.value = false);

const scrollLock = useScrollLock();

const keydownHandler = (e) => {
  if (e.key === "Escape") {
    closeSidebar();
  }
};

watch(isOpen, (value) => {
  if (value) {
    window.addEventListener("keydown", keydownHandler);
    scrollLock.enable();
  } else {
    window.removeEventListener("keydown", keydownHandler);
    scrollLock.disable();
  }
});

export const useSidebar = () => {
  return {
    isOpen,
    setIsOpen,
    toggleIsOpen,
    closeSidebar,
  };
};
