import { ref } from "vue";

const accessToCurrentRouteGranted = ref(true);

const grantAccessToCurrentRoute = () => {
  accessToCurrentRouteGranted.value = true;
};

const denyAccessToCurrentRoute = () => {
  accessToCurrentRouteGranted.value = false;
};

export const useAccessControl = () => {
  return {
    accessToCurrentRouteGranted,
    grantAccessToCurrentRoute,
    denyAccessToCurrentRoute,
  };
};
