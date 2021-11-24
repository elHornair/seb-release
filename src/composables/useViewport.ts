import { ref } from "vue";

export const DESKTOP = "768px";

const addMatchMediaListener = (breakpoint: string, callback: any) => {
  const mqList = window.matchMedia(`(min-width: ${breakpoint})`);
  mqList.addEventListener("change", callback);
  callback(mqList);
};

const addDesktopMediaListener = (callback: Function) =>
  addMatchMediaListener(DESKTOP, (e: any) => callback(e.matches));

const isDesktop = ref(false);

export const useViewport = () => {
  const isDesktopListener = (matches: any) => (isDesktop.value = matches);
  addDesktopMediaListener(isDesktopListener);

  return { isDesktop };
};
