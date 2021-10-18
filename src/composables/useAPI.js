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
    getInstitutions,
  };
};
