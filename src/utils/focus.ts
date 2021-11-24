export const focusElement = (target: HTMLElement, timeout: number = 1000) => {
  if (target.getAttribute("tabindex") == null) {
    target.setAttribute("tabindex", "-1");
    setTimeout(() => target.removeAttribute("tabindex"), timeout);
  }

  target.focus();
};
