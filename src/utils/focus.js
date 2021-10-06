export const focusElement = (target, timeout = 1000) => {
  if (target.getAttribute("tabindex") == null) {
    target.setAttribute("tabindex", "-1");
    setTimeout(() => target.removeAttribute("tabindex"), timeout);
  }

  target.focus();
};
