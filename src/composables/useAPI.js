import axios from "axios";
import qs from "qs";
import { useAuth } from "@/composables/useAuth";

const { authToken } = useAuth();

const API_PREFIX = "/admin-api/v1/";

const createInstitution = (name, urlSuffix = null, active = false) => {
  const payload = {
    name,
    active, // TODO: "active" is not respected by the BE at this point -> figure out why (maybe because it wants this manipulated only through the dedicated API endpoint?)
  };

  if (urlSuffix) {
    payload.urlSuffix = urlSuffix;
  }

  return axios({
    method: "POST",
    url: `${API_PREFIX}institution`,
    headers: {
      Authorization: `Bearer ${authToken.value}`,
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    data: qs.stringify(payload),
  }).then((response) => {
    return response.data;
  });
};

const readInstitution = (id) => {
  if (!Number.isInteger(id) || id < 0) {
    throw new Error("Invalid ID");
  }

  return axios({
    method: "GET",
    url: `${API_PREFIX}institution/${id}`,
    headers: {
      Authorization: `Bearer ${authToken.value}`,
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8", // TODO: could this be JSON too? (see update action)
    },
    data: qs.stringify({}), // this is needed, because if there is no payload, the API will throw an error
  }).then((response) => {
    return response.data;
  });
};

const updateInstitution = (id, name, urlSuffix = "", active) => {
  const payload = {
    id,
    name,
    urlSuffix,
  };

  if (active === true || active === false) {
    payload.active = active; // TODO: this doesnt have any effect
  }

  return axios({
    method: "PUT",
    url: `${API_PREFIX}institution`,
    headers: {
      Authorization: `Bearer ${authToken.value}`,
      "Content-Type": "application/json",
    },
    data: JSON.stringify(payload),
  }).then((response) => {
    return response.data;
  });
};

const getInstitutions = (params = {}, filterCriteria = {}) => {
  // params:
  // {
  //   page_number: 1,
  //   page_size: 2,
  //   sort: "name",
  //   institutionId: "3",
  // }
  //
  // filterCriteria:
  // {
  //   name: 'Insti',
  //   urlSuffix: 'eth',
  //   active: true,
  // }
  const cleanParams = {};

  if (params.sort) {
    cleanParams.sort = params.sort;
  }

  return axios({
    method: "GET",
    url: `${API_PREFIX}institution`,
    headers: {
      Authorization: `Bearer ${authToken.value}`,
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    params: cleanParams,
    data: qs.stringify(filterCriteria),
  }).then((response) => {
    return response.data;
  });
};

export const useAPI = () => {
  return {
    createInstitution,
    readInstitution,
    updateInstitution,
    getInstitutions,
  };
};
