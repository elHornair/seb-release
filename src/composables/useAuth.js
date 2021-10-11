import { computed, ref, watch } from "vue";
import axios from "axios";
import qs from "qs";

const AUTH_TOKEN_KEY = "AUTH_TOKEN";
const AUTH_TOKEN_EXPIRATION_KEY = "AUTH_TOKEN_EXPIRATION";

const authToken = ref(null);
const authTokenExpiration = ref(null);
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

const getPersistedAuthData = () => {
  const persistedAuthTokenExpiration = window.localStorage.getItem(
    AUTH_TOKEN_EXPIRATION_KEY
  );

  if (persistedAuthTokenExpiration) {
    const expirationDate = new Date(persistedAuthTokenExpiration);

    if (new Date() < expirationDate) {
      const persistedAuthToken = window.localStorage.getItem(AUTH_TOKEN_KEY);

      if (persistedAuthToken) {
        return {
          authToken: persistedAuthToken,
          authTokenExpiration: persistedAuthTokenExpiration,
        };
      }
    }
  }

  return {
    authToken: null,
    authTokenExpiration: null,
  };
};

const clearAuthData = () => {
  authToken.value = null;
  authTokenExpiration.value = null;
};

const fetchAuthToken = async (username, password) => {
  try {
    const response = await axios({
      method: "post",
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

const persistedAuthData = getPersistedAuthData();
authToken.value = persistedAuthData.authToken;
authTokenExpiration.value = persistedAuthData.authTokenExpiration;

export const useAuth = () => {
  return {
    isAuthenticated,
    fetchAuthToken,
    clearAuthData,
  };
};
