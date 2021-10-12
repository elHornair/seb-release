import axios from "axios";
import qs from "qs";
import { computed, readonly, ref, watch } from "vue";

const LOCALSTORAGE_KEY = "AUTH";

const authData = ref(null);

const isAuthenticated = computed(() => authData.value !== null);

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

watch(authData, (newValue) => {
  if (newValue === null) {
    window.localStorage.removeItem(LOCALSTORAGE_KEY);
  } else {
    window.localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(newValue));
  }
});

const isKnownPrivilege = (privilege) =>
  Object.values(availablePrivileges).includes(privilege);

const isKnownAction = (action) =>
  Object.values(availableActions).includes(action);

const hasPrivilege = (realm, privilege, action) => {
  if (!(isKnownPrivilege(privilege) && isKnownAction(action))) {
    return false;
  }

  if (!isAuthenticated.value || authData.value.privileges === null) {
    return false;
  }

  return authData.value.privileges[privilege][realm].includes(action);
};

const getPersistedAuthData = () => {
  const persistedAuth = JSON.parse(
    window.localStorage.getItem(LOCALSTORAGE_KEY)
  );

  if (
    persistedAuth &&
    persistedAuth.token &&
    persistedAuth.expiration &&
    persistedAuth.privileges
  ) {
    const expirationDate = new Date(persistedAuth.expiration);

    if (new Date() < expirationDate) {
      return persistedAuth;
    }
  }

  return null;
};

const invalidateUser = () => {
  authData.value = null;
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

    // TODO: the response also has a "refresh_token" => This can be used in a later improvement to automatically refresh the auth token
    authData.value = {
      token: response.data["access_token"],
      expiration: expirationDateTime,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Login failed");
  }
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
    authData.value = {
      // TODO: that feels dirty. maybe use reactive()
      ...authData.value,
      privileges: userPrivileges,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Error while generating privileges");
  }
};

const authenticateUser = async (username, password) => {
  await fetchAndStoreAuthToken(username, password);
  await fetchAndStorePrivileges(authData.value.token);
};

authData.value = getPersistedAuthData();

export const useAuth = () => {
  return {
    isAuthenticated: readonly(isAuthenticated),
    availablePrivileges: readonly(availablePrivileges),
    availableActions: readonly(availableActions),
    authenticateUser,
    invalidateUser,
    hasPrivilege,
  };
};
