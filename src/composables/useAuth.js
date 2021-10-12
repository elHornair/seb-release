import axios from "axios";
import qs from "qs";
import { computed, ref, watch } from "vue";
import { useAccessControl } from "@/composables/useAccessControl";

const { fetchAndStorePrivileges, removeAllPrivileges } = useAccessControl();

const AUTH_KEY = "AUTH";

const authData = ref(null);

const isAuthenticated = computed(() => authData.value !== null);

watch(authData, (newValue) => {
  if (newValue === null) {
    window.localStorage.removeItem(AUTH_KEY);
  } else {
    window.localStorage.setItem(AUTH_KEY, JSON.stringify(newValue));
  }
});

const getPersistedAuthData = () => {
  const persistedAuth = JSON.parse(window.localStorage.getItem(AUTH_KEY));

  if (persistedAuth && persistedAuth.token && persistedAuth.expiration) {
    const expirationDate = new Date(persistedAuth.expiration);

    if (new Date() < expirationDate) {
      return persistedAuth;
    }
  }

  return null;
};

const invalidateUser = () => {
  authData.value = null;
  removeAllPrivileges();
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

const authenticateUser = async (username, password) => {
  await fetchAndStoreAuthToken(username, password);
  await fetchAndStorePrivileges(authData.value.token);
};

authData.value = getPersistedAuthData();

export const useAuth = () => {
  return {
    isAuthenticated,
    authenticateUser,
    invalidateUser,
  };
};
