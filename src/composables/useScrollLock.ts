import { ref, watch } from "vue";

const isEnabled = ref(false);
const setIsEnabled = (val: boolean) => (isEnabled.value = val);
const enable = () => setIsEnabled(true);
const disable = () => setIsEnabled(false);

watch(isEnabled, (value) => {
  if (value) {
    document.body.classList.add("scroll-lock");
  } else {
    document.body.classList.remove("scroll-lock");
  }
});

export const useScrollLock = () => {
  return {
    enable,
    disable,
  };
};
