import axios from "axios";
import qs from "qs";
import { useAuth } from "@/composables/useAuth";

const { authToken } = useAuth();

const API_PREFIX = "admin-api/v1/";

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
    getInstitutions,
  };
};
