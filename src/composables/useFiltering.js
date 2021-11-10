import { computed, reactive, readonly } from "vue";

export const useFiltering = (fields) => {
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

  const activeFilters = computed(() => {
    return Object.keys(state)
      .filter((key) => state[key] !== null)
      .map((key) => {
        return { field: key, value: state[key] };
      });
  });

  const activeFiltersCount = computed(() => activeFilters.value.length);

  const hasActiveFilters = computed(() => activeFiltersCount.value > 0);

  const activeFiltersLabel = computed(
    () =>
      `${activeFiltersCount.value} filter${
        activeFiltersCount.value > 1 ? "s" : ""
      }`
  );

  return {
    filteringState: readonly(state),
    filteringApiParam: readonly(apiParam),
    setFilters,
    removeFilter,
    removeAllFilters,
    getFieldLabel,
    getFieldValue,
    activeFilters,
    hasActiveFilters,
    activeFiltersLabel,
  };
};
