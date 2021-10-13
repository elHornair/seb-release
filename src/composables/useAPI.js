import axios from "axios";
import qs from "qs";
import { useAuth } from "@/composables/useAuth";
import { ref } from "vue";

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
  const institutionData = ref({});

  axios({
    method: "GET",
    url: `${API_PREFIX}institution`,
    headers: {
      Authorization: `Bearer ${authToken.value}`,
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    params: params,
    data: qs.stringify(filterCriteria),
  }).then((response) => {
    institutionData.value = response.data;
  });

  return institutionData;
};

export const useAPI = () => {
  return {
    getInstitutions,
  };
};
