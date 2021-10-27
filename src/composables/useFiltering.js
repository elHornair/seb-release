import { computed, reactive, readonly } from "vue";

const initialState = {
  name: null,
  urlSuffix: null,
  active: null,
};

const state = reactive(initialState);

const apiParam = computed(() => {
  const cleanApiParam = {};

  if (state.name) {
    cleanApiParam.name = state.name;
  }
  if (state.urlSuffix) {
    cleanApiParam.urlSuffix = state.urlSuffix;
  }
  if (state.active === true || state.active === false) {
    cleanApiParam.active = state.active;
  }

  return cleanApiParam;
});

const setFilters = (filters) => {
  Object.assign(state, {
    name: filters.name ? filters.name : null,
    urlSuffix: filters.urlSuffix ? filters.urlSuffix : null,
    active:
      filters.active === true || filters.active === false
        ? filters.active
        : null,
  });
};

const removeFilter = (field) => {
  if (!["name", "urlSuffix", "active"].includes(field)) {
    throw new Error(`Unknown field "${field}"`);
  }

  Object.assign(state, {
    [field]: null,
  });
};

const removeAllFilters = () => {
  Object.assign(state, initialState);
};

export const useFiltering = () => {
  return {
    filteringState: readonly(state),
    filteringApiParam: readonly(apiParam),
    setFilters,
    removeFilter,
    removeAllFilters,
  };
};
