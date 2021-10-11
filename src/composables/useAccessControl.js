import { ref } from "vue";

const isAccessGranted = ref(true);

const grantAccess = () => {
  isAccessGranted.value = true;
};

const denyAccess = () => {
  isAccessGranted.value = false;
};

export const useAccessControl = () => {
  return {
    isAccessGranted,
    grantAccess,
    denyAccess,
  };
};
