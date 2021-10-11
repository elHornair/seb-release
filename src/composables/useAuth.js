import { computed, ref, watch } from "vue";
import axios from "axios";
import qs from "qs";

const AUTH_TOKEN_KEY = "AUTH_TOKEN";
const AUTH_TOKEN_EXPIRATION_KEY = "AUTH_TOKEN_EXPIRATION";
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

const authToken = ref(null);
const authTokenExpiration = ref(null);
const privileges = ref(null);

const isAuthenticated = computed(() => authToken.value !== null);

watch(authToken, (newValue) => {
  if (newValue === null) {
    window.localStorage.removeItem(AUTH_TOKEN_KEY);
  } else {
    window.localStorage.setItem(AUTH_TOKEN_KEY, newValue);
  }
});

watch(authTokenExpiration, (newValue) => {
  if (newValue === null) {
    window.localStorage.removeItem(AUTH_TOKEN_EXPIRATION_KEY);
  } else {
    window.localStorage.setItem(AUTH_TOKEN_EXPIRATION_KEY, newValue);
  }
});

watch(privileges, (newValue) => {
  if (newValue === null) {
    window.localStorage.removeItem(PRIVILEGES_KEY);
  } else {
    window.localStorage.setItem(PRIVILEGES_KEY, JSON.stringify(newValue));
  }
});

const getPersistedAuthData = () => {
  const persistedAuthTokenExpiration = window.localStorage.getItem(
    AUTH_TOKEN_EXPIRATION_KEY
  );

  if (persistedAuthTokenExpiration) {
    const expirationDate = new Date(persistedAuthTokenExpiration);

    if (new Date() < expirationDate) {
      const persistedAuthToken = window.localStorage.getItem(AUTH_TOKEN_KEY);
      const persistedPrivileges = window.localStorage.getItem(PRIVILEGES_KEY);

      if (persistedAuthToken && persistedPrivileges) {
        return {
          authToken: persistedAuthToken,
          authTokenExpiration: persistedAuthTokenExpiration,
          privileges: JSON.parse(persistedPrivileges),
        };
      }
    }
  }

  return {
    authToken: null,
    authTokenExpiration: null,
    privileges: null,
  };
};

const invalidateUser = () => {
  authToken.value = null;
  authTokenExpiration.value = null;
  privileges.value = null;
};

const fetchAndStoreAuthToken = async (username, password) => {
  try {
    const response = await axios({
      method: "POST",
      url: "/oauth/token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      data: qs.stringify({
        grant_type: "password",
        username: username,
        password: password,
      }),
    });

    const expirationDateTime = new Date();
    expirationDateTime.setSeconds(
      expirationDateTime.getSeconds() + response.data["expires_in"]
    );
    authTokenExpiration.value = expirationDateTime;

    // TODO: the response also has a "refresh_token" => This can be used in a later improvement to automatically refresh the auth token
    authToken.value = response.data["access_token"];
  } catch (error) {
    console.error(error);
    throw new Error("Login failed");
  }
};

const fetchAndStorePrivileges = async () => {
  try {
    const responses = await Promise.all([
      axios({
        method: "GET",
        url: "/admin-api/v1/useraccount/me",
        headers: {
          Authorization: `Bearer ${authToken.value}`,
        },
      }),
      axios({
        method: "GET",
        url: "/admin-api/v1/info/privileges",
        headers: {
          Authorization: `Bearer ${authToken.value}`,
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

const hasBasePrivilege = (privilege, action) => {
  if (!(isKnownPrivilege(privilege) && isKnownAction(action))) {
    return false;
  }

  return privileges.value[privilege].basePrivilege.includes(action);
};

const hasInstitutionalPrivilege = () => {
  console.error("hasInstitutionalPrivilege is not implemented yet.");
};

const hasOwnershipPrivilege = () => {
  console.error("hasOwnershipPrivilege is not implemented yet.");
};

const authenticateUser = async (username, password) => {
  await fetchAndStoreAuthToken(username, password);
  await fetchAndStorePrivileges();
};

const persistedAuthData = getPersistedAuthData();
authToken.value = persistedAuthData.authToken;
authTokenExpiration.value = persistedAuthData.authTokenExpiration;
privileges.value = persistedAuthData.privileges;

export const useAuth = () => {
  return {
    isAuthenticated,
    availablePrivileges,
    availableActions,
    authenticateUser,
    invalidateUser,
    hasBasePrivilege,
    hasInstitutionalPrivilege,
    hasOwnershipPrivilege,
  };
};
