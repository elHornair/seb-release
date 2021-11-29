import axios from "axios";
import qs from "qs";
import { useAuth } from "@/composables/useAuth";

const { authToken } = useAuth();

const API_PREFIX = "/admin-api/v1/";

const assureValidId = (id: number) => {
  if (!Number.isInteger(id) || id < 0) {
    throw new Error("Invalid ID");
  }
};

const createInstitution = (name: string, urlSuffix: string = "") => {
  const payload = {
    name,
    urlSuffix,
  };

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

const readInstitution = (id: number) => {
  assureValidId(id);

  return axios({
    method: "GET",
    url: `${API_PREFIX}institution/${id}`,
    headers: {
      Authorization: `Bearer ${authToken.value}`,
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    data: qs.stringify({}), // this is needed, because if there is no payload, the API will throw an error
  }).then((response) => {
    return response.data;
  });
};

const updateInstitution = (
  id: number,
  name: string,
  urlSuffix: string = ""
) => {
  const payload = {
    id,
    name,
    urlSuffix,
  };

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

const getInstitutionDependencies = (id: number): Promise<string[]> => {
  assureValidId(id);

  return axios({
    method: "GET",
    url: `${API_PREFIX}institution/${id}/dependency`,
    headers: {
      Authorization: `Bearer ${authToken.value}`,
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    params: {
      bulkActionType: "DEACTIVATE",
    },
    data: JSON.stringify({}),
  }).then((response) => {
    return response.data;
  });
};

const activateInstitution = (id: number) => {
  assureValidId(id);

  return axios({
    method: "POST",
    url: `${API_PREFIX}institution/${id}/active`,
    headers: {
      Authorization: `Bearer ${authToken.value}`,
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    data: JSON.stringify({}),
  }).then((response) => {
    return response.data;
  });
};

const deactivateInstitution = (id: number) => {
  assureValidId(id);

  return axios({
    method: "POST",
    url: `${API_PREFIX}institution/${id}/inactive`,
    headers: {
      Authorization: `Bearer ${authToken.value}`,
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    data: JSON.stringify({}),
  }).then((response) => {
    return response.data;
  });
};

const readInstitutions = (
  params: { sort?: string; pageIndex?: number; itemsPerPage?: number },
  filterCriteria: { [key: string]: string | boolean } = {}
) => {
  const cleanParams: {
    sort?: string;
    page_number?: number;
    page_size?: number;
  } = {};

  if (params.sort) {
    cleanParams.sort = params.sort;
  }

  if (params.pageIndex) {
    cleanParams.page_number = params.pageIndex;
  }

  if (params.itemsPerPage) {
    cleanParams.page_size = params.itemsPerPage;
  }

  // make sure filter param keys are lower case (API doesn't accept camel case for these but will silently ignore them)
  const cleanFilterCriteria = Object.keys(filterCriteria)
    .map((key) => {
      return { [key.toLowerCase()]: filterCriteria[key] };
    })
    .reduce((prev, curr) => Object.assign(prev, curr), {});

  Object.assign(cleanParams, cleanFilterCriteria);

  return axios({
    method: "GET",
    url: `${API_PREFIX}institution`,
    headers: {
      Authorization: `Bearer ${authToken.value}`,
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    params: cleanParams,
    data: qs.stringify({}),
  }).then((response) => {
    return response.data;
  });
};

export const useInstitutionAPI = () => {
  return {
    createInstitution,
    readInstitution,
    updateInstitution,
    getInstitutionDependencies,
    activateInstitution,
    deactivateInstitution,
    readInstitutions,
  };
};
