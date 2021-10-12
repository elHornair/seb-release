import { ref, watch } from "vue";
import axios from "axios";

const PRIVILEGES_KEY = "PRIVILEGES";

const availablePrivileges = {
  CONFIGURATION_VALUE: "CONFIGURATION_VALUE",
  CONFIGURATION_ATTRIBUTE: "CONFIGURATION_ATTRIBUTE",
  ORIENTATION: "ORIENTATION",
  USER: "USER",
  CERTIFICATE: "CERTIFICATE",
  LMS_SETUP: "LMS_SETUP",
  USER_ACTIVITY_LOG: "USER_ACTIVITY_LOG",
  CLIENT_EVENT: "CLIENT_EVENT",
  CONFIGURATION: "CONFIGURATION",
  CLIENT_CONNECTION: "CLIENT_CONNECTION",
  EXAM: "EXAM",
  CONFIGURATION_NODE: "CONFIGURATION_NODE",
  INSTITUTION: "INSTITUTION",
  SEB_CLIENT_CONFIGURATION: "SEB_CLIENT_CONFIGURATION",
};

const availableActions = {
  NONE: "NONE",
  READ: "READ",
  MODIFY: "MODIFY",
  WRITE: "WRITE",
};

const actionsMap = {
  WRITE: ["WRITE", "MODIFY", "READ"], // "WRITE" means user can "WRITE", "MODIFY" and "READ"
  MODIFY: ["MODIFY", "READ"], // ...
  READ: ["READ"],
  NONE: [],
};

const privileges = ref(null);
const accessToCurrentRouteGranted = ref(true);

watch(privileges, (newValue) => {
  if (newValue === null) {
    window.localStorage.removeItem(PRIVILEGES_KEY);
  } else {
    window.localStorage.setItem(PRIVILEGES_KEY, JSON.stringify(newValue));
  }
});

const grantAccessToCurrentRoute = () => {
  accessToCurrentRouteGranted.value = true;
};

const denyAccessToCurrentRoute = () => {
  accessToCurrentRouteGranted.value = false;
};

const fetchAndStorePrivileges = async (authToken) => {
  try {
    const responses = await Promise.all([
      axios({
        method: "GET",
        url: "/admin-api/v1/useraccount/me",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }),
      axios({
        method: "GET",
        url: "/admin-api/v1/info/privileges",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }),
    ]);

    const userRoles = responses[0].data.userRoles;
    const privilegeMap = responses[1].data;

    // prepare privileges
    const userPrivileges = {};
    Object.values(availablePrivileges).forEach((privilege) => {
      userPrivileges[privilege] = {
        basePrivilege: [],
        institutionalPrivilege: [],
        ownershipPrivilege: [],
      };
    });

    // map privileges
    userRoles.forEach((userRole) => {
      privilegeMap
        .filter((privilege) => {
          return privilege.roleTypeKey.userRole === userRole;
        })
        .forEach((privilege) => {
          if (isKnownPrivilege(privilege.roleTypeKey.entityType)) {
            userPrivileges[privilege.roleTypeKey.entityType].basePrivilege = [
              ...new Set([
                ...userPrivileges[privilege.roleTypeKey.entityType]
                  .basePrivilege,
                ...actionsMap[privilege.basePrivilege],
              ]),
            ];
            userPrivileges[
              privilege.roleTypeKey.entityType
            ].institutionalPrivilege = [
              ...new Set([
                ...userPrivileges[privilege.roleTypeKey.entityType]
                  .institutionalPrivilege,
                ...actionsMap[privilege.institutionalPrivilege],
              ]),
            ];
            userPrivileges[
              privilege.roleTypeKey.entityType
            ].ownershipPrivilege = [
              ...new Set([
                ...userPrivileges[privilege.roleTypeKey.entityType]
                  .ownershipPrivilege,
                ...actionsMap[privilege.ownershipPrivilege],
              ]),
            ];
          }
        });
    });

    // store privileges
    privileges.value = userPrivileges;
  } catch (error) {
    console.error(error);
    throw new Error("Error while generating privileges");
  }
};

const isKnownPrivilege = (privilege) =>
  Object.values(availablePrivileges).includes(privilege);

const isKnownAction = (action) =>
  Object.values(availableActions).includes(action);

const hasPrivilege = (realm, privilege, action) => {
  if (!(isKnownPrivilege(privilege) && isKnownAction(action))) {
    return false;
  }

  if (privileges.value === null) {
    return false;
  }

  return privileges.value[privilege][realm].includes(action);
};

const hasBasePrivilege = (privilege, action) => {
  return hasPrivilege("basePrivilege", privilege, action);
};

const hasInstitutionalPrivilege = (privilege, action) => {
  // TODO: here we should probably also check that the user belongs to the correct institution
  return hasPrivilege("institutionalPrivilege", privilege, action);
};

const hasOwnershipPrivilege = (privilege, action) => {
  // TODO: here we should probably also check that the user owns the respective resource
  console.error("hasOwnershipPrivilege is not implemented yet.");
  return hasPrivilege("ownershipPrivilege", privilege, action);
};

const removeAllPrivileges = () => {
  privileges.value = null;
};

const getPersistedPrivilegesData = () => {
  const persistedPrivileges = window.localStorage.getItem(PRIVILEGES_KEY);

  if (persistedPrivileges) {
    return JSON.parse(persistedPrivileges);
  }

  return null;
};

privileges.value = getPersistedPrivilegesData();

export const useAccessControl = () => {
  return {
    fetchAndStorePrivileges,
    accessToCurrentRouteGranted,
    grantAccessToCurrentRoute,
    denyAccessToCurrentRoute,
    availablePrivileges,
    availableActions,
    hasBasePrivilege,
    hasInstitutionalPrivilege,
    hasOwnershipPrivilege,
    removeAllPrivileges,
  };
};
