import { ref } from "vue";

export const DESKTOP = "768px";

const addMatchMediaListener = (breakpoint, callback) => {
  const mqList = window.matchMedia(`(min-width: ${breakpoint})`);
  mqList.addEventListener("change", callback);
  callback(mqList);
};

const addDesktopMediaListener = (callback) =>
  addMatchMediaListener(DESKTOP, (e) => callback(e.matches));

const isDesktop = ref(false);

export const useViewport = () => {
  const isDesktopListener = (matches) => (isDesktop.value = matches);
  addDesktopMediaListener(isDesktopListener);

  return { isDesktop };
};
