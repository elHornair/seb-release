import { readonly, ref } from "vue";
import { useAuth } from "@/composables/useAuth";

const { hasPrivilege, availablePrivileges, availableActions } = useAuth();

const accessToCurrentRouteGranted = ref(true);

const grantAccessToCurrentRoute = () => {
  accessToCurrentRouteGranted.value = true;
};

const denyAccessToCurrentRoute = () => {
  accessToCurrentRouteGranted.value = false;
};

const hasBasePrivilege = (privilege: string, action: string) => {
  return hasPrivilege("basePrivilege", privilege, action);
};

const hasInstitutionalPrivilege = (privilege: string, action: string) => {
  // TODO: here we should probably also check that the user belongs to the correct institution
  return hasPrivilege("institutionalPrivilege", privilege, action);
};

const hasOwnershipPrivilege = (privilege: string, action: string) => {
  // TODO: here we should probably also check that the user owns the respective resource
  console.error("hasOwnershipPrivilege is not implemented yet.");
  return hasPrivilege("ownershipPrivilege", privilege, action);
};

export const useAccessControl = () => {
  return {
    availablePrivileges: readonly(availablePrivileges),
    availableActions: readonly(availableActions),
    accessToCurrentRouteGranted: readonly(accessToCurrentRouteGranted),
    grantAccessToCurrentRoute,
    denyAccessToCurrentRoute,
    hasBasePrivilege,
    hasInstitutionalPrivilege,
    hasOwnershipPrivilege,
  };
};
