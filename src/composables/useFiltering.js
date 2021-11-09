import { computed, reactive, readonly } from "vue";

export const useFiltering = () => {
  const fields = {
    // Apart from "fields", useInstitutionFiltering() is already generalised
    // It's ready to be turned into a factory (that gets "fields" as a parameter)
    // That factory could then be used to create a filtering for another entity
    name: {
      label: "Name",
    },
    urlSuffix: {
      label: "URL Suffix",
    },
    active: {
      label: "Status",
      valueFormatter: (value) =>
        value === true ? "Active" : value === false ? "Inactive" : "All",
    },
  };

  const fieldNames = Object.keys(fields);
  const initialState = fieldNames.reduce((reducedFields, fieldName) => {
    return Object.assign(reducedFields, {
      [fieldName]: null,
    });
  }, {});

  const state = reactive(Object.assign({}, initialState));

  const apiParam = computed(() =>
    Object.keys(state)
      .filter((fieldKey) => state[fieldKey] !== null)
      .reduce(
        (paramObj, fieldKey) =>
          Object.assign(paramObj, {
            [fieldKey]: state[fieldKey],
          }),
        {}
      )
  );

  const setFilters = (filters) => {
    Object.assign(state, initialState, filters);
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
