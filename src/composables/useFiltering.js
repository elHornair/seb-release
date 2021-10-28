import { computed, reactive, readonly } from "vue";

const fields = {
  name: {
    label: "Name",
  },
  urlSuffix: {
    label: "URL Suffix",
  },
  active: {
    label: "Status",
    valueFormatter: (value) => (value === true ? "Active" : "Inactive"),
  },
};

const fieldNames = Object.keys(fields);
const initialState = fieldNames.reduce((reducedFields, fieldName) => {
  return Object.assign(reducedFields, {
    [fieldName]: null,
  });
}, {});

const state = reactive(Object.assign({}, initialState));

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
  if (!fieldNames.includes(field)) {
    throw new Error(`Unknown field "${field}"`);
  }

  Object.assign(state, {
    [field]: null,
  });
};

const removeAllFilters = () => {
  Object.assign(state, initialState);
};

const getFieldLabel = (field) => {
  if (!fieldNames.includes(field)) {
    throw new Error(`Unknown field "${field}"`);
  }

  return fields[field].label;
};

const getFieldValue = (field, rawValue) => {
  if (!fieldNames.includes(field)) {
    throw new Error(`Unknown field "${field}"`);
  }

  if (fields[field].valueFormatter) {
    return fields[field].valueFormatter(rawValue);
  }

  return rawValue;
};

export const useFiltering = () => {
  return {
    filteringState: readonly(state),
    filteringApiParam: readonly(apiParam),
    setFilters,
    removeFilter,
    removeAllFilters,
    getFieldLabel,
    getFieldValue,
  };
};
